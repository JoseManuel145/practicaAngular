import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-colors-dialog',
  template: `
    <h1 mat-dialog-title>Colores Disponibles</h1>
    <div mat-dialog-content>
      <ul>
        @for (color of data.colors; track color) {
          <li>{{ color }}</li>
        }
      </ul>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="closeDialog()">Cerrar</button>
    </div>
  `
})
export class ColorsDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { colors: string[] },
    private dialogRef: MatDialogRef<ColorsDialogComponent>
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
