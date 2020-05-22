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
    
    //alert(error);
    
}

public handleErrorHttpResponse(error: HttpErrorResponse)
{
  console.log(`http status: ${error.status}`);
  let alertMsg;
  switch (error.status)
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

public handleErrorNice<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {


    console.error(error); // log to console instead


    console.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

}
