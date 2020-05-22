import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';


import { Contact } from '../contact';
import { ContactManagerService } from '../contact-manager.service';
import { ContactSearchService } from '../contact-search.service';

@Component({
  selector: 'app-contact-search',
  templateUrl: './contact-search.component.html',
  styleUrls: ['./contact-search.component.css']
})
export class ContactSearchComponent implements OnInit {
  @Input() contact: Contact;
  
  private searchChanged = new Subject<string>();
  

  constructor(
    private contactManagerService: ContactManagerService,
    private contactSearchService: ContactSearchService
    ) { }

  ngOnInit(): void {
    this.contact = new Contact();
  }

  public isSearchActive(): boolean {
    return this.contactSearchService.isContactSearchActive();
  }

  search(): void
  {
    this.contactSearchService.contact = this.contact;
    this.contactManagerService.getSearchContactCount(this.contact);
    this.contactManagerService.searchContactsAsync(this.contact, 1);
  }

  clear()
  {
    this.contact.firstName = '';
    this.contact.lastName = '';
    this.contact.address = '';
    this.contact.phone = '';
    this.search();
  }
}
