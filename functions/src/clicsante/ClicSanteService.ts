import { VaccineGroup } from '../vaccinegroup/VaccineGroupRepository';
import { ClicSanteApi } from './ClicSanteApi';

export class ClicSanteService {
  constructor(private clicSanteAPI: ClicSanteApi) {}

  public async getVaccineGroup(): Promise<VaccineGroup> {
    const texts = await this.clicSanteAPI.getTexts();
    const frenchText = texts.find((text) => text.lang === 'fr');
    const vaccineGroupText = frenchText.presentationText.match('Personnes âgées de (\\d+) ans et plus');
    if (vaccineGroupText) {
      const minAge = vaccineGroupText[0].match(/(\d+)/);
      if (minAge) {
        return { minAge: parseInt(minAge[0]) };
      }
    } else {
      console.error('No vaccine group text was extract from the ClicSante API response.');
    }
    throw new Error('No vaccine group was found. Fix this!');
  }
}
