import { ClicSanteApi } from '../ClicSanteApi';
import { ClicSanteService } from '../ClicSanteService';

describe('Clic Sante Service Test', () => {
  it('When checking if vaccine is open for 30 yo and more, Then return vaccine group.', async () => {
    const service = new ClicSanteService(new ClicSanteApi());
    const vaccineGroup = await service.getVaccineGroup();
    expect(vaccineGroup).toEqual({ minAge: 35 });
  });
});
