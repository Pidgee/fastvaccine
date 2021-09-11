import { ClicSanteApi } from '../ClicSanteApi';

describe('Clic Sante API Test', () => {
  it('When getting texts, then return texts', async () => {
    const api = new ClicSanteApi();
    const texts = await api.getTexts();
    expect(texts.length).toEqual(2);
  });
});
