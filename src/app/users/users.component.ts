import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';

import { HeaderComponent } from '../header/header.component';
import { TableComponent } from '../table/table.component';


import { TableService } from '../table/table.service';
import { UserService } from './users.service';

/**
 * Represents the UsersComponent which displays a list of users.
 */
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    TableComponent,
    HeaderComponent,
    NgIf
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  /**
   * An array of users.
   */
  users: any[] = [];

  /**
   * An array of column names.
   */
  columns: string[] = [];

  /**
   * Indicates whether data is being fetched.
   */
  isFetchingData = false;

  constructor(private table: TableService, private userService: UserService, private route: ActivatedRoute) { }

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.route.url.subscribe(url => {
      this.fetchData();
    });
  }

  /**
   * Fetches the user data from the service.
   */
  fetchData() {
    this.isFetchingData = true;
    this.userService.listUsers().subscribe((data) => {
      this.users = data;
      this.columns = this.table.getColumns(this.users);
      this.isFetchingData = false;
    });
  }

}
