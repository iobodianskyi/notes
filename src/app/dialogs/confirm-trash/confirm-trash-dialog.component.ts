import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-trash-dialog',
  templateUrl: './confirm-trash-dialog.component.html',
  styleUrls: ['./confirm-trash-dialog.component.sass']
})
export class ConfirmTrashDialogComponent {

  constructor(private dialogRef: MatDialogRef<ConfirmTrashDialogComponent>) { }

  confirm(): void {
    this.dialogRef.close(true);
  }
}
