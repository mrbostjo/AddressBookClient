import { Injectable} from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, tap, last } from 'rxjs/operators';

import { Contact } from './contact';

@Injectable({
  providedIn: 'root'
})
export class ContactManagerService {

  private url = 'http://localhost:51026/api/contacts';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  contacts: Contact[];

  public contactList = new Subject<Contact[]>();
  public contactUpdated = new Subject();

  constructor(
    private http: HttpClient
  ) { }

  getContacts(): Observable<Contact[]> {
    console.log('Getting contacs ');
    return this.http.get<Contact[]>(this.url)
    .pipe(
      catchError(this.handleError<Contact[]>('getContacs', []))
    );
  }

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
    return this.http.get<Contact>(url);
  }

  getContactyy(id: number): Observable<Contact> {
    console.log(`Getting contact id=${id}`);
    const url = `${this.url}/${id}`;
    return this.http.get<Contact>(url)
    .pipe(
      catchError(this.handleError<Contact>(`getContact id=${id}`))
    );
  }

  addContact(contact: Contact): Observable<any> {
    return this.http.post(this.url, contact, this.httpOptions).pipe(
      tap(_ => this.getContactsAsync()),
      catchError(this.handleError<any>('postContact'))
    );
  }

  updateContact(contact: Contact): Observable<any> {
    const url = `${this.url}/${contact.id}`;
    return this.http.put(url, contact, this.httpOptions).pipe(
      tap(_ => this.getContactsAsync()),
      catchError(this.handleError<any>('updateContact'))
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
      catchError(this.handleError<Contact>('deleteContact'));
    })
    if(result != null)
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
      catchError(this.handleError<Contact>('deleteContact'))
    );
  }

  searchContacts(firstName: string, lastName: string, phone: string): Observable<Contact[]> {
    // if (!firstName.trim()) {
    //   // if not search term, return empty hero array.
    //   return of([]);
    // }
    const searchUrl = `${this.url}/search`;
    const params = new  HttpParams()
      .set('firstName', firstName)
      .set('lastName', lastName)
      .set('phone', phone);

    console.log(params.toString());
    return this.http.get<Contact[]>(`${searchUrl}`, {params}).pipe(
      catchError(this.handleError<Contact[]>('searchContacts', []))
    );
  }

  searchContactsAsync(firstName: string, lastName: string, phone: string): Promise<Contact[]> {
      // if (!firstName.trim()) {
      //   // if not search term, return empty hero array.
      //   return of([]);
      // }
      const searchUrl = `${this.url}/search`;
      const params = new  HttpParams()
        .set('firstName', firstName)
        .set('lastName', lastName)
        .set('phone', phone);

      console.log(params.toString());
      const promise = this.http.get<Contact[]>(`${searchUrl}`, {params}).toPromise();
      promise.then((data) =>
        this.contactList.next(data)
      ).catch	((error) => {
        catchError(this.handleError<Contact>('searchContacts'));
      });
      return promise;
  }

 /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    console.log(`${operation} failed: ${error.message}`);
    //alert(`${operation} failed: ${error.message}`);
    
    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
}
