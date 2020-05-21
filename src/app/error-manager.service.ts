import { Injectable, ErrorHandler } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class ErrorManagerService implements ErrorHandler {

  constructor() { }

  handleError(error) {
    console.error('An error occurred:', error.message);
    console.error(error);
    alert(error);
}

public handleErrorHttpResponse(error: HttpErrorResponse)
{
  console.log(`http status: ${error.status}`);
  let alertMsg;
  switch(error.status)
  {
    case 400:
      {
        alertMsg = 'Invalid data!';
        break;
      }
    case 404:
      {
        alertMsg = 'Contact not found!';
        break;
      }
    case 409:
      {
        alertMsg = 'Duplicate phone number!';
        break;
      }
      default:
        alertMsg = error.message;
  }
  return throwError(alertMsg);
}
 /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
public handleErrorNice<T>(operation = 'operation', result?: T) {
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
