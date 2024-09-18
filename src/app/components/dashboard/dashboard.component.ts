import { Component, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ColorsDialogComponent } from '../dialog/dialog.component';

import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { Telefono } from '../../models/telefono';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: true,
  imports: [
    AsyncPipe,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatDialogModule
  ]
})
export class DashboardComponent {

  telefonoForm = new FormGroup({
    model: new FormControl('', { nonNullable: true }),  // Agregar { nonNullable: true } para evitar problemas con null
    color: new FormControl('', { nonNullable: true })  // Agregar { nonNullable: true } para evitar problemas con null
  });

  coloresArray: string[] = [];
  telefonosArray: Telefono[] = [];
  private contador: number = 1;

  constructor(public dialog: MatDialog) { }

  addColor() {
    const color = this.telefonoForm.get('color')?.value;
    if (color && !this.coloresArray.includes(color)) {
      this.coloresArray.push(color);
      this.telefonoForm.get('color')?.reset(); // Limpiar el campo de color después de agregarlo
    }
  }

  createTelefono() {
    const model = this.telefonoForm.get('model')?.value || '';
    const colores = [...this.coloresArray]; // Copiar el arreglo de colores

    if (model && colores.length > 0) {
      const telefono: Telefono = {
        id: this.contador++,
        model,
        colorsAvalaible: colores
      };
      this.telefonosArray.push(telefono);
      this.coloresArray = []; // Limpiar el arreglo de colores después de agregar el teléfono
      this.telefonoForm.reset(); // Limpiar el formulario
    }
  }

  deleteTelefono(id: number) {
    this.telefonosArray = this.telefonosArray.filter(telefono => telefono.id !== id);
  }

  openColorsDialog(colors: string[]) {
    this.dialog.open(ColorsDialogComponent, {
      data: { colors } 
    });
  }

  private breakpointObserver = inject(BreakpointObserver);
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Card 1', cols: 2, rows: 1 },
        { title: 'Card 2', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 2 },
        { title: 'Card 4', cols: 1, rows: 1 }
      ];
    })
  );
}
