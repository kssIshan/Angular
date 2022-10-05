import { Component ,OnInit, ViewChild} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent  implements OnInit{

  displayedColumns: string[] = ['itemCode','kitchen', 'itemName', 'category', 'subCategory', 'itemSize', 'costPrice', 'takeAwayPrice','dineInPrice', 'webPrice', 'serviceCharge','devices'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private dialog: MatDialog, private api : ApiService){

  }
  ngOnInit(): void {
    this.getAllItems();
  }
  title = 'greencoding-sample';
  openDialog() {
    this.dialog.open(DialogComponent, {
     width : "30%"
    }).afterClosed().subscribe(val=>{
      if(val ==='save'){
        this.getAllItems();
      }
    })
  }
  getAllItems(){
    this.api.getItems().subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort

      }, 
      error:(err)=>{
        alert("Error while fetching the Records!!")
      }
    })

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
