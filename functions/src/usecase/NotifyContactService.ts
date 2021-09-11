import { ContactRepository } from '../contact/ContactRepository';
import { Sms } from '../contact/Sms';
import { VaccineGroup } from '../vaccinegroup/VaccineGroupRepository';

export class NotifyContactService {
  constructor(private contactRepository: ContactRepository, private sms: Sms) {}

  public async notifyContactsOfNewVaccineGroup(vaccineGroup: VaccineGroup): Promise<void> {
    const contacts = await this.contactRepository.findAll();
    const contactsToNotify = contacts.filter((contact) => this.isOldEnough(contact.birthYear, vaccineGroup.minAge));
    contactsToNotify.forEach((contact) => {
      const message = `Hey ${contact.name}! Vaccination is now open for people aged ${vaccineGroup.minAge} years and older. Quickly go to https://portal3.clicsante.ca/ to select an appointment.`;
      console.info(`Sending SMS to number ${contact.phoneNumber}: ${message}`);
      this.sms.send(contact.phoneNumber, message);
    });
  }

  private isOldEnough(birthYear: number, minAge: number): boolean {
    return new Date().getFullYear() - birthYear >= minAge;
  }
}
