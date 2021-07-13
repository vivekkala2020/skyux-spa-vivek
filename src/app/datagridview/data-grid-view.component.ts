import {
  Component, OnInit
} from '@angular/core';
import { SkyAgGridService, SkyCellType } from '@skyux/ag-grid';
import { SkyModalCloseArgs, SkyModalService } from '@skyux/modals';
import {
  GridApi,
  GridOptions, GridReadyEvent
} from 'ag-grid-community';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { DataGridContextMenuComponent } from './data-grid-context-menu.component';
import { DataGridEditModalContext } from './data-grid-edit-modal-context';
import { DataGridEditModalComponent } from './data-grid-edit-modal.component';

@Component({
  selector: 'app-data-grid-view',
  templateUrl: './data-grid-view.component.html',
  styleUrls: ['./data-grid-view.component.scss']
})
export class DataGridViewComponent implements OnInit {
  public gridData: User[];

  public columnDefs = [
    {
      field: 'selected',
      type: SkyCellType.RowSelector
    },
    {
      colId: 'context',
      headerName: '',
      maxWidth: 50,
      sortable: false,
      cellRendererFramework: DataGridContextMenuComponent
    },
    {
      field: 'firstName',
      headerName: 'First Name'
    },
    {
      field: 'lastName',
      headerName: 'Last Name'
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
      type: SkyCellType.Number
    },
    {
      field: 'address.street',
      headerName: 'House No. & Street'
    },
    {
      field: 'address.pin',
      headerName: 'Pincode'
    },
    {
      field: 'address.state',
      headerName: 'State'
    }
  ];

  public data: User[] = undefined;
  public gridOptions: GridOptions;
  public gridApi: GridApi;
  public searchText: string;

  constructor(
    private agGridService: SkyAgGridService,
    private modalService: SkyModalService,
    private userService: UserService
  ) { }

  public ngOnInit(): void {
    this.gridOptions = {
      columnDefs: this.columnDefs,
      onGridReady: gridReadyEvent => this.onGridReady(gridReadyEvent)
    };
    this.gridOptions = this.agGridService.getGridOptions({ gridOptions: this.gridOptions });
    this.getAllUsers();
  }

  public openModal(): void {
    const context = new DataGridEditModalContext();
    context.gridData = this.gridData;

    const options = {
      providers: [{ provide: DataGridEditModalContext, useValue: context }],
      ariaDescribedBy: 'docs-edit-grid-modal-content',
      size: 'large'
    };

    const modalInstance = this.modalService.open(DataGridEditModalComponent, options);

    modalInstance.closed.subscribe((result: SkyModalCloseArgs) => {
      if (result.reason === 'cancel' || result.reason === 'close') {
        alert('Edits canceled!');
      } else {
        this.gridData = result.data;
        this.gridApi.refreshCells();
        alert('Saving data!');
      }
    });
  }
  public getAllUsers(): void {
    this.userService.getUser().subscribe(
      response => {
        console.log(response);
        this.data = response;
        this.gridData = this.data;
        return;
      },
      err => {
        console.log('Hello Error ' + err);
        return;
      }
    );
  }

  public onGridReady(gridReadyEvent: GridReadyEvent): void {
    this.gridApi = gridReadyEvent.api;

    this.gridApi.sizeColumnsToFit();
  }

  public searchApplied(searchText: string): void {
    this.searchText = searchText;
    this.gridApi.setQuickFilter(searchText);
  }

}
