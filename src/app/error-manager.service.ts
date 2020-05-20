import { Injectable, ErrorHandler } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';

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
