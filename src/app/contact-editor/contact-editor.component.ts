import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Contact } from '../contact';
import { ContactManagerService } from '../contact-manager.service';

@Component({
  selector: 'app-contact-editor',
  templateUrl: './contact-editor.component.html',
  styleUrls: ['./contact-editor.component.css']
})
export class ContactEditorComponent implements OnInit {
  @Input() contact: Contact;

  isEdit: boolean;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private contactManager: ContactManagerService
  ) {}

  ngOnInit(): void {
    this.getContact();
  }

  getContact(): void {
    const idTest = this.route.snapshot.paramMap.get('id');
    this.isEdit = (idTest != null) && (!Number.isNaN(+idTest));

    if (this.isEdit)
      {
        const id = +idTest;
        this.contactManager.getContact(id)
          .subscribe(contact => this.contact = contact);
      }
  }

  update(): void {
    this.contactManager.updateContact(this.contact)
      .subscribe();
  }

  add(firstName: string, lastName: string, phone: string): void {
    const newContact = new Contact();
    newContact.firstName = firstName;
    newContact.lastName = lastName;
    newContact.phone = phone;

    this.contactManager.addContact(newContact)
      .subscribe( contact => this.contact = newContact);
  }

  goBack(): void {
    this.location.back();
  }

}
