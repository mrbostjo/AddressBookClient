import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Contact } from '../contact';
import { ContactManagerService } from '../contact-manager.service';
import { ConfirmDialogService } from '../confirm-dialog.service';
import { last } from 'rxjs/operators';

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
    private contactManagerService: ContactManagerService,
    private confirmDialogService: ConfirmDialogService
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
        this.contactManagerService.getContact(id)
          .subscribe(contact => this.contact = contact);
      }
  }

  update(): void {
    this.contactManagerService.updateContact(this.contact)
      .subscribe();
  }

addContact(firstName: string, lastName: string, phone: string)
{
  console.log('test clicked!');
  this.confirmDialogService.confirmThis('Are you sure to add?',
    () => this.add(firstName, lastName, phone),
    function () {
    alert('No clicked');
  })
}

  add(firstName: string, lastName: string, phone: string): void {
    const newContact = new Contact();
    newContact.firstName = firstName;
    newContact.lastName = lastName;
    newContact.phone = phone;

    this.contactManagerService.addContact(newContact)
      .subscribe( contact => this.contact = newContact);
  }

  goBack(): void {
    this.location.back();
  }

}
