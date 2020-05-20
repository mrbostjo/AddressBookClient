import { Component, OnInit, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';


import { Contact } from '../contact';
import { ContactManagerService } from '../contact-manager.service';

@Component({
  selector: 'app-contact-search',
  templateUrl: './contact-search.component.html',
  styleUrls: ['./contact-search.component.css']
})
export class ContactSearchComponent implements OnInit {
  @Output() contacts: Contact[];
  
  private searchFirstNames = new Subject<string>();
  private searchLastNames = new Subject<string>();

  constructor(private contactManagerService: ContactManagerService) { }

  ngOnInit(): void {
  }

  // Push a search term into the observable stream.
  searchFNames(firstName: string): void {
    this.searchFirstNames.next(firstName);
  }
  searchLNames(lastName: string): void {
    this.searchLastNames.next(lastName);
  }

  search(firstName: string, lastName: string, phone: string): void
  {
    this.contactManagerService.searchContactsAsync(firstName, lastName, phone);
  }

  

}
