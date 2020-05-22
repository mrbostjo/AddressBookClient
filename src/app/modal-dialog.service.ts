import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalDialogService {

  private subject = new Subject<any>();

    constructor() { }

    confirmThis(title: string, message: string, yesFn: () => void, noFn: () => void) {
        this.setConfirmation('confirm', title, message, yesFn, noFn);
    }
    alertThis(title: string, message: string, yesFn: () => void) {
        this.setConfirmation('alert', title, message, yesFn, null);
    }
    setConfirmation(dialogType: string, title: string, message: string, yesFn: () => void, noFn: () => void) {
        const that = this;
        this.subject.next({
            type: dialogType,
            head : title,
            text: message,
            yesFn: function () {
                that.subject.next(); // this will close the modal
                if (yesFn != null)
                {
                    yesFn();
                }
            },
            noFn: function () {
                that.subject.next(); // this will close the modal
                if (noFn != null)
                {
                    noFn();
                }
            }
        });
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}
