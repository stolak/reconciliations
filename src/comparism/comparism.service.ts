import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ReconciliationSourceRepository } from './reconciliation-source.repository';
import { CreateReconciliationInput } from './inputs/create-reconciliation-input';
import { ReconciliationSource } from './reconciliation-source.schema';
import { DynamicVariable } from 'src/customized/types/dynamic-variable';
import axios from 'axios';

interface inputType {
  record1: string;
  record2: string;
}

@Injectable()
export class ComparismService {
  constructor(
    private reconciliationSourceRepository: ReconciliationSourceRepository,
  ) {}
  private readonly openAiApiUrl = 'https://api.openai.com/v1/chat/completions';

  private dynamicToString(dynamic: DynamicVariable[]): string {
    try {
      return dynamic.map((item) => `${item.name}: ${item.value}`).join(' ');
    } catch (error) {
      return null;
    }
  }

  async create(
    input: CreateReconciliationInput,
  ): Promise<ReconciliationSource> {
    try {
      return this.reconciliationSourceRepository.createWithBase({
        ...input,
        comparismDetails:
          this.dynamicToString(input.dynamicVariables) || input.description,
      });
    } catch (error) {
      throw new Error(`Error creating record: ${error.message}`);
    }
  }
  async compareRecords(record1: string, record2: string): Promise<string> {
    const prompt = `Compare the following two records and return "yes" if they refer to the same thing, even if the wording is different. If they do not refer to the same thing, return "no". Do not provide any explanations.\n\nRecord 1: ${record1}\nRecord 2: ${record2}`;
    this.reconciliationSourceRepository.createWithBase({
      description: prompt,
    });
    try {
      return this.compare(prompt, '');
    } catch (error) {
      throw new Error(`Error comparing records: ${error.message}`);
    }
  }

  async compareRecords2(record: inputType[]): Promise<string> {
    const result = record
      .map(
        (item, index) =>
          `${index + 1}. "${item.record1}" and "${item.record2}"`,
      )
      .join('\n');

    const prompt = `Compare the following records and return "yes" for each if they refer to the same thing, even if the wording is different. If they do not refer to the same thing, return "no". Keep the response short, in this format:
    1. No
    2. Yes
    3. Yes
  
  ${result}`;
    try {
      return this.compare(prompt, '');
    } catch (error) {
      throw new Error(`Error comparing records: ${error.message}`);
    }
  }

  async compareRecords3(
    record1: inputType[],
    record2: inputType[],
  ): Promise<string> {
    const result1 = record1
      .map((item, index) => `${index + 1}. "${item.record1}"`)
      .join('\n');

    const result2 = record2
      .map((item, index) => `${index + 1}. "${item.record2}"`)
      .join('\n');

    const prompt = `Compare the Items in  Record1 with Record2 and return number of the item in Record2 that matches individual items in Record1 if they refer to the same thing, even if the wording is different. If any of the item in Record1 does not refer to the same thing in Record2, return "0". Keep the response short, in this format:
    Record1 item 1. matches Record2 item 2
    Record1 item 2. matches Record2 item 0
    Record1 item 3. matches Record2 item 3
  
  \nRecord1: ${result1}
  \nRecord2: ${result2}`;

    try {
      return this.compare(prompt, '');
    } catch (error) {
      throw new Error(`Error comparing records: ${error.message}`);
    }
  }

  async compare(prompt: string, model: string): Promise<string> {
    const apiKey = process.env.OPENAI_API_KEY;

    console.log(prompt);

    try {
      const response = await axios.post(
        this.openAiApiUrl,
        {
          model: model || 'gpt-4', //model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content:
                'You are an AI that compares records for equality, even with different wording.',
            },
            { role: 'user', content: prompt },
          ],
          max_tokens: 100,
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        },
      );

      return response.data.choices[0].message.content.trim();
    } catch (error) {
      throw new Error(`Error comparing records: ${error.message}`);
    }
  }
}
