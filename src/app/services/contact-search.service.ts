import { Injectable } from '@angular/core';
import { ContactManagerService } from './contact-manager.service';
import { Contact } from '../contact';

@Injectable({
  providedIn: 'root'
})
export class ContactSearchService {

  constructor(
    private contactManagerService: ContactManagerService
  ) { }

public contact = new Contact();

public isContactSearchActive(): boolean {
  const notSearch = (!this.contact) ||
    (!this.contact.firstName) &&
    (!this.contact.lastName) &&
    (!this.contact.address) &&
    (!this.contact.phone);
  
  return !notSearch;
}

}