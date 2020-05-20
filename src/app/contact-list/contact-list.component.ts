import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact';
import { ContactManagerService } from '../contact-manager.service';


@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  
  contacts: Contact[];
  selectedContact: Contact;
  
  constructor(private contactManagerService: ContactManagerService) { }

  ngOnInit(): void {
    this.getContacts();
    this.contactManagerService.contactList.asObservable().subscribe( contacts => this.contacts = contacts);
  }

  getContacts(): void {
    console.log('Requesting data');
    this.contactManagerService.getContacts()
      .subscribe(contacts => this.contacts = contacts);
  }

  select(contact: Contact): void {
    this.selectedContact = contact;
  }

  delete(contact: Contact): void {
    console.log(`Delete contact id ${contact.id} requested.`);
    this.contactManagerService.deleteContactAsync(contact);
  }

}
