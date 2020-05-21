import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact';
import { ContactManagerService } from '../contact-manager.service';
import { ModalDialogService } from '../modal-dialog.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  contacts: Contact[];
  selectedContact: Contact;

  constructor(
    private contactManagerService: ContactManagerService,
    private modalDialogService: ModalDialogService,
  ) { }

  ngOnInit(): void {
    this.contactManagerService.contactList.asObservable().subscribe( contacts => this.contacts = contacts);
    this.getContacts();
  }

  getContacts(): void {
    this.contactManagerService.getContactsAsync();
  }

  selectContact(contact: Contact): void {
    this.selectedContact = contact;
  }

  confirmDelete(contact: Contact)
  {
    this.modalDialogService.confirmThis(
      'Are you sure to delete?', `${contact.firstName} ${contact.lastName}`,
    () => this.deleteContact(contact), null );
  }
  
  deleteContact(contact: Contact): void {
    console.log(`Delete contact id ${contact.id} requested.`);
    this.contactManagerService.deleteContactAsync(contact);
  }


}
