import { Component, Input } from '@angular/core';
import { ModalDialogService } from '../modal-dialog.service';

@Component({
    selector: 'app-confirm-dialog',
    templateUrl: 'confirm-dialog.component.html',
    styleUrls: ['confirm-dialog.component.css']
})
// A component t render modal confirmation dialog with yes and no actions.
export class ConfirmDialogComponent {
    message: any;

    constructor(
        private modalDialogService: ModalDialogService
    ) { }

    ngOnInit() {
        // this function waits for a message from alert service, it gets
        // triggered when we call this from any other component
        this.modalDialogService.getMessage().subscribe(message => {
            this.message = message;
        });
    }
}

