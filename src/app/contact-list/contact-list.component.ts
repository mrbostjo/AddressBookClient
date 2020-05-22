import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact';
import { ContactManagerService } from '../services/contact-manager.service';
import { ModalDialogService } from '../services/modal-dialog.service';
import { ContactSearchService } from '../services/contact-search.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  contacts: Contact[];
  selectedContact: Contact;

  currentPage: number;
  pageSize: number;
  totalContacts: number;

  constructor(
    private contactManagerService: ContactManagerService,
    private modalDialogService: ModalDialogService,
    private contactSearchService: ContactSearchService
  ) { }

  ngOnInit(): void {
    this.contactManagerService.totalContactCount.asObservable().subscribe(count => this.totalContacts = count);
    this.contactManagerService.contactList.asObservable().subscribe( contacts => this.contacts = contacts);
    this.getContacts();
  }

  getTotalPages(): number {
    const count = (Math.ceil(this.totalContacts / this.contactManagerService.pageSize));
    console.log(`total pages: ${count}`);
    return count;
  }

  showNextPage(): boolean {
    return (this.contactManagerService.currentPage < this.getTotalPages());
  }

  showPreviousPage(): boolean  {
    return (this.contactManagerService.currentPage > 1);
  }

  getNextPage(): void {
    this.contactManagerService.currentPage++;
    if(this.contactManagerService.currentPage > this.getTotalPages())
    {
      this.contactManagerService.currentPage = this.getTotalPages();
    }
    this.getContacts();
  }

  getPreviousPage(): void {
    this.contactManagerService.currentPage--;
    if(this.contactManagerService.currentPage < 1)
    {
      this.contactManagerService.currentPage = 1;
    }
    this.getContacts();
  }

  getContacts(): void {
    console.log("getting all contacts.")
    //this.contactManagerService.getContactCount().subscribe( totalContacts => this.totalContacts = totalContacts );
    console.log(`issearch? ${this.contactSearchService.isContactSearchActive()}`)
    if (this.contactSearchService.isContactSearchActive())
    {
      this.contactManagerService.getSearchContactCount(this.contactSearchService.contact);
      this.contactManagerService.searchContactsAsync( this.contactSearchService.contact, this.contactManagerService.currentPage )
        .catch(err => {
        this.modalDialogService.alertThis('Cannot get contacts!', '', null);
      });
      console.log(`searching for contacts ${this.totalContacts}`);
    }
    else
    {
      this.contactManagerService.getContactCount();
      this.contactManagerService.getContactsAsync()
          .catch(err => {
          this.modalDialogService.alertThis('Cannot get contacts!', '', null);
      });
      console.log("getting all contacts.")
    }
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
