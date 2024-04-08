import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';

import { TableComponent } from '../table/table.component';
import { HeaderComponent } from '../header/header.component';

import { TableService } from '../table/table.service';
import { ProductService } from './products.service';


/**
 * Represents the ProductsComponent.
 */
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    TableComponent,
    HeaderComponent,
    NgIf
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  /**
   * An array of products.
   */
  products: any[] = [];

  /**
   * An array of column names.
   */
  columns: string[] = [];

  /**
   * Indicates whether data is being fetched.
   */
  isFetchingData = false;

  constructor(private table: TableService, private productService: ProductService, private route: ActivatedRoute) { }

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.route.url.subscribe(url => {
      this.fetchData();
    });
  }

  /**
   * Fetches data from the product service.
   */
  fetchData() {
    this.isFetchingData = true;
    this.productService.listProduct().subscribe((data) => {
      this.products = data;
      this.columns = this.table.getColumns(this.products);
      this.isFetchingData = false;
    });
  }
}
