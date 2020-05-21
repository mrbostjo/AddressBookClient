import { Component, OnInit, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Contact } from '../contact';
import { ContactManagerService } from '../contact-manager.service';
import { ModalDialogService } from '../modal-dialog.service';

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
    private modalDialogService: ModalDialogService,
    
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
          .subscribe(
            response => {
              this.contact = response;
            },
            err => {
              this.modalDialogService.alertThis('Cannot get contact!', err, null);
            });
      }
      else
      {
        this.contact = new Contact();
      }
  }

  update(): void {
    this.contactManagerService.updateContact(this.contact)
      .subscribe(response => {
        this.modalDialogService.alertThis('Contact updated!', this.contact.firstName, null);
        console.log(`Updating contact: ${this.contact.firstName}`);
      },
      err => {
        console.log(`Oops while adding contact: ${err}`);
        this.modalDialogService.alertThis('Cannot edit contact!', err, null);
      });
  }

  add(firstName: string, lastName: string, phone: string): void {
    const newContact = new Contact();
    newContact.firstName = firstName;
    newContact.lastName = lastName;
    newContact.phone = phone;

    this.contactManagerService.addContact(newContact)
      .subscribe(
      response => {
        this.contact = newContact;
        console.log(`added contact: ${newContact.firstName}`);
      },
      err => {
        console.log(`oops while adding contact: ${err}`);
        this.modalDialogService.alertThis('Cannot add contact!', err, null);
      });
  }

  goBack(): void {
    this.location.back();
  }

}
