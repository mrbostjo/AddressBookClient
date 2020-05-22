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

  // private url = 'http://localhost:51026/api/contacts';
  private url = 'http://localhost:5000/api/contacts';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  contacts: Contact[];

  public contactList = new Subject<Contact[]>();

  constructor(
    private errorManager: ErrorManagerService,
    private http: HttpClient
  ) { }

  // Function for getting contact list through observable
  getContacts(): Observable<Contact[]> {
    console.log('Getting contacs ');
    return this.http.get<Contact[]>(this.url)
    .pipe(
      catchError(this.errorManager.handleErrorNice<Contact[]>('getContacs', []))
    );
  }

  // Function for getting observable thorough promise
  async getContactsAsync(): Promise<Contact[]> {
    console.log('Getting contacs ');
    const promise = this.http.get<Contact[]>(this.url).toPromise();
    promise.then((data) => {
      this.contactList.next(data);
    });
    return promise;
  }

  getContact(id: number): Observable<Contact> {
    console.log(`Getting contact id=${id}`);
    const url = `${this.url}/${id}`;
    return this.http.get<Contact>(url).pipe(
      catchError(this.errorManager.handleErrorHttpResponse)
    );
  }

  getContactyy(id: number): Observable<Contact> {
    console.log(`Getting contact id=${id}`);
    const url = `${this.url}/${id}`;
    return this.http.get<Contact>(url)
    .pipe(
      catchError(this.errorManager.handleErrorNice<Contact>(`getContact id=${id}`))
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

  async deleteContactAsync(contact: Contact | number): Promise<Contact> {
    const id = typeof contact === 'number' ? contact : contact.id;
    const url = `${this.url}/${id}`;
    let result: Contact;
    const promise = this.http.delete<Contact>(url, this.httpOptions).toPromise<Contact>();
    promise.then((data) => {
        this.getContactsAsync();
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

  deleteContact(contact: Contact | number): Observable<Contact> {
    const id = typeof contact === 'number' ? contact : contact.id;
    const url = `${this.url}/${id}`;

    return this.http.delete<Contact>(url, this.httpOptions).pipe(
      tap(_ => this.getContactsAsync()),
      catchError(this.errorManager.handleErrorHttpResponse)
    );
  }

  searchContacts(firstName: string, lastName: string, address: string, phone: string): Observable<Contact[]> {

    const searchUrl = `${this.url}/search`;
    const params = new  HttpParams()
      .set('firstName', firstName)
      .set('lastName', lastName)
      .set('address', address)
      .set('phone', phone);

    console.log(params.toString());
    return this.http.get<Contact[]>(`${searchUrl}`, {params}).pipe(
      catchError(this.errorManager.handleErrorHttpResponse)
    );
  }

  searchContactsAsync(firstName: string, lastName: string, address: string, phone: string): Promise<Contact[]> {

      const searchUrl = `${this.url}/search`;
      const params = new  HttpParams()
        .set('firstName', firstName)
        .set('lastName', lastName)
        .set('address', address)
        .set('phone', phone);

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
