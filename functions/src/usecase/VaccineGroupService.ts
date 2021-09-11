import { ClicSanteService } from '../clicsante/ClicSanteService';
import { VaccineGroupRepository } from '../vaccinegroup/VaccineGroupRepository';

export class VaccineGroupService {
  constructor(private clicSanteService: ClicSanteService, private vaccineGroupRepository: VaccineGroupRepository) {}

  public async identifyVaccineGroup(): Promise<void> {
    const vaccineGroup = await this.clicSanteService.getVaccineGroup();
    console.info(`Vaccinating priority group of age ${vaccineGroup.minAge}`);
    await this.vaccineGroupRepository.save(vaccineGroup);
  }
}
