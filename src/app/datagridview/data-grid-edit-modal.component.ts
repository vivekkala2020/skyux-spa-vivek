import {
  Component, OnInit
} from '@angular/core';
import { SkyAgGridService, SkyCellType } from '@skyux/ag-grid';
import { SkyModalInstance } from '@skyux/modals';
import { ColDef, GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { User } from '../models/user';
import { DataGridEditModalContext } from './data-grid-edit-modal-context';

@Component({
  selector: 'app-data-grid-edit-modal',
  templateUrl: './data-grid-edit-modal.component.html',
  styleUrls: ['./data-grid-edit-modal.component.scss']
})
export class DataGridEditModalComponent implements OnInit {
  public columnDefs: ColDef[];
  public gridApi: GridApi;
  public gridData: User[];
  public gridOptions: GridOptions;

  constructor(
    private agGridService: SkyAgGridService,
    public context: DataGridEditModalContext,
    public instance: SkyModalInstance
  ) { }

  public ngOnInit(): void {
    this.gridData = this.context.gridData;
    this.columnDefs = [
      {
        field: 'firstName',
        headerName: 'First Name',
        type: SkyCellType.Text,
        editable: true
      },
      {
        field: 'lastName',
        headerName: 'Last Name',
        editable: true
      },
      {
        field: 'email',
        headerName: 'Email'
      },
      {
        field: 'dob',
        headerName: 'Date of Birth',
        type: SkyCellType.Date,
        sort: 'asc'
      },
      {
        field: 'contactNumber',
        headerName: 'Mobile Number',
        type: SkyCellType.Number,
        editable: true
      },
      {
        field: 'address.street',
        headerName: 'House No. & Street',
        editable: true
      },
      {
        field: 'address.pin',
        headerName: 'Pincode',
        type: SkyCellType.Number,
        editable: true
      },
      {
        field: 'address.state',
        headerName: 'State',
        editable: true
      }
    ];

    this.gridOptions = {
      columnDefs: this.columnDefs,
      onGridReady: gridReadyEvent => this.onGridReady(gridReadyEvent)
    };
    this.gridOptions = this.agGridService.getEditableGridOptions({ gridOptions: this.gridOptions });
  }

  public onGridReady(gridReadyEvent: GridReadyEvent): void {
    this.gridApi = gridReadyEvent.api;

    this.gridApi.sizeColumnsToFit();
  }
}
