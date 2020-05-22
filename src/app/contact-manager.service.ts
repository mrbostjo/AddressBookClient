import { Injectable} from '@angular/core';
import { Observable, Subject, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { catchError, map, tap, last } from 'rxjs/operators';

import { Contact } from './contact';
import { ErrorManagerService } from './error-manager.service';

@Injectable({
  providedIn: 'root'
})

export class ContactManagerService {

    private url = 'http://localhost:5000/api/contacts';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  contacts: Contact[];

  public contactList = new Subject<Contact[]>();
  public DEFAULT_PAGE_SIZE = 6;
  public currentPage = 1;
  public pageSize = this.DEFAULT_PAGE_SIZE;
  public totalContactCount = new Subject<number>();


  constructor(
    private errorManager: ErrorManagerService,
    private http: HttpClient
  ) { }

  getContactCount(): Promise<number>
  {
    const url = `${this.url}/count`;
    console.log('Getting contact count ');
    const promise = this.http.get<number>(url).toPromise();
    promise.then(
      count => this.totalContactCount.next(count)
    );
    return promise;
  }

  getSearchContactCount(contact: Contact): Promise<number>
  {
    const searchUrl = `${this.url}/searchCount`;
    const params = new  HttpParams()
      .set('firstName', (contact.firstName) ? contact.firstName : '' )
      .set('lastName', (contact.lastName) ? contact.lastName : '')
      .set('address', (contact.address) ? contact.address : '')
      .set('phone', (contact.phone) ? contact.phone : '');

    console.log('Getting searched contact count ');
    const promise = this.http.get<number>(searchUrl, {params}).toPromise();
    promise.then(
      count => this.totalContactCount.next(count)
    );
    return promise;
  }

  getContact(id: number): Observable<Contact> {
    console.log(`Getting contact id=${id}`);
    const url = `${this.url}/${id}`;
    return this.http.get<Contact>(url).pipe(
      catchError(this.errorManager.handleErrorHttpResponse)
    );
  }

  addContact(contact: Contact): Observable<any> {
    return this.http.post(this.url, contact, this.httpOptions).pipe(
        catchError(this.errorManager.handleErrorHttpResponse)
    );
  }

  updateContact(contact: Contact): Observable<any> {
    const url = `${this.url}/${contact.id}`;
    return this.http.put(url, contact, this.httpOptions).pipe(
      catchError(this.errorManager.handleErrorHttpResponse)
    );
  }

  async getContactsAsync(): Promise<Contact[]> {
    return this.getContactsPagedAsync(this.currentPage, this.pageSize);
  }
  // Function for getting observable thorough promise
  async getContactsPagedAsync(selectedPage: number, pageSize: number): Promise<Contact[]> {
    console.log('Getting contacs ');
    const params = new  HttpParams()
      .set('page', selectedPage.toString())
      .set('pageSize', pageSize.toString());

    const promise = this.http.get<Contact[]>(this.url, {params}).toPromise();
    promise.then((data) => {
      this.contactList.next(data);
    });
    return promise;
  }

  async deleteContactAsync(contact: Contact | number): Promise<Contact> {
    const id = typeof contact === 'number' ? contact : contact.id;
    const url = `${this.url}/${id}`;
    let result: Contact;
    const promise = this.http.delete<Contact>(url, this.httpOptions).toPromise<Contact>();
    promise.then((data) => {
        this.getContactsPagedAsync(this.currentPage, this.pageSize);
        result = data; }
    ).catch	((error) => {
      catchError(this.errorManager.handleErrorNice<Contact>('deleteContact'));
    });
    if (result != null)
    {
      console.log(`result ${result.firstName} came.`)
      return result;
    }
  }

  searchContactsAsync(contact: Contact, page: number): Promise<Contact[]> {

    const searchUrl = `${this.url}/search`;
    const params = new  HttpParams()
      .set('firstName', (contact.firstName) ? contact.firstName : '' )
      .set('lastName', (contact.lastName) ? contact.lastName : '')
      .set('address', (contact.address) ? contact.address : '')
      .set('phone', (contact.phone) ? contact.phone : '')
      .set('page', page.toString())
      .set('pageSize', this.pageSize.toString());

    console.log(params.toString());
    const promise = this.http.get<Contact[]>(`${searchUrl}`, {params}).toPromise();
    promise.then((data) =>
      this.contactList.next(data)
    ).catch	((error) => {
      catchError(this.errorManager.handleErrorHttpResponse);
    });
    return promise;
}

}
