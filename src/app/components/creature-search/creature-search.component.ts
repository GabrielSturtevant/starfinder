import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Creatures} from '../../data/creatures';
import {ICreatureListResultItem} from '../../newInterfaces/creatureListAPI';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-creature-search',
  templateUrl: './creature-search.component.html',
  styleUrls: ['./creature-search.component.css']
})
export class CreatureSearchComponent implements OnInit, AfterViewInit {

  variable: Array<ICreatureListResultItem> = Creatures;

  headers = ['title', 'cr', 'xp', 'hp'];
  headerOptions = Object.keys(this.variable[0]);

  dataSource!: MatTableDataSource<ICreatureListResultItem>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<ICreatureListResultItem>(this.variable);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    console.log();
  }
}
