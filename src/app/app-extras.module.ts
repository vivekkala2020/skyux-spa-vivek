import {
  NgModule
} from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import {
  AppSkyModule
} from './app-sky.module';
import { DataGridContextMenuComponent } from './datagridview/data-grid-context-menu.component';
import { DataGridEditModalComponent } from './datagridview/data-grid-edit-modal.component';

@NgModule({
  imports: [
    AgGridModule.withComponents([])
  ],
  exports: [
    AppSkyModule,
    AgGridModule
  ],
  entryComponents: [
    DataGridContextMenuComponent,
    DataGridEditModalComponent
  ]
})
export class AppExtrasModule { }
