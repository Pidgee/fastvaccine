import axios, { AxiosInstance } from 'axios';

export type CSTextResponse = {
  presentationText: string;
  lang: string;
};

export type CSTextResponses = CSTextResponse[];

export class ClicSanteApi {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: 'https://api3.clicsante.ca/v3/',
      headers: { 'x-trimoz-role': 'public', product: 'clicsante' },
      auth: {
        username: 'public@trimoz.com',
        password: '12345678!',
      },
    });
  }

  // Establishment is Levis Centre des Congres but should be the same across the province
  public async getTexts(): Promise<CSTextResponses> {
    const response = await this.instance.get('/establishments/60066/texts');
    return response.data;
  }
}
