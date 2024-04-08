import { Component, Input } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

/**
 * Represents a table component.
 */
@Component({
  selector: 'app-table',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  /**
   * The data to be displayed in the table.
   */
  @Input() data: any[] = [];

  /**
   * The columns of the table.
   */
  @Input() columns: string[] = [];

  /**
   * The filtered data to be displayed in the table.
   */
  tableData: any[] = [];

  /**
   * The keyword used for filtering the data.
   */
  filterKeyword: string = '';

  /**
   * The current column used for sorting the data.
   */
  currentColumn: string = '';

  /**
   * The number of items to display per page.
   */
  pageSize: number = 10;

  /**
   * The current page index.
   */
  pageIndex: number = 0;

  /**
   * Indicates whether the view is shown or hidden.
   */
  isShowView: boolean = false;

  /**
   * Indicates whether the data is sorted in ascending or descending order.
   */
  isOrderSorted: boolean = true;

  /**
   * Indicates whether the columns are shown or hidden.
   */
  isShowColumns: boolean = true;

  /**
   * The visibility of each column.
   */
  columnVisibility: boolean[] = [];

  /**
   * The index used for iteration.
   */
  i: number = 0;

  /**
   * The index of the row in edit mode.
   */
  editMode: number = -1;

  constructor() { }

  /**
   * Initializes the component.
   */
  ngOnInit(): void {
    this.columnVisibility = new Array(this.columns.length).fill(true);
    this.tableData = [...this.data];
  }

  /**
   * Toggles the visibility of a column.
   * @param index - The index of the column.
   */
  toggleColumn(index: number): void {
    this.columnVisibility[index] = !this.columnVisibility[index];
  }

  /**
   * Toggles the edit mode of a row.
   * @param index - The index of the row.
   */
  toggleEditMode(index: number): void {
    this.editMode = this.editMode === index ? -1 : index;
  }

  /**
   * Toggles the visibility of all columns.
   */
  toggleColumnsVisibility(): void {
    this.columnVisibility = this.columnVisibility.map(() => this.columnVisibility[0] = this.isShowColumns);
    this.isShowColumns = !this.isShowColumns;
  }

  /**
   * Filters the data based on the filter keyword.
   */
  filterData(): void {
    if (!this.filterKeyword) {
      this.tableData = [...this.data];
    } else {
      this.tableData = this.data.filter(row =>
        Object.values(row).some(val => val?.toString().toLowerCase().includes(this.filterKeyword.toLowerCase()))
      );
      this.pageIndex = 0;
    }
  }

  /**
   * Sorts the data based on the specified column.
   * @param column - The column to sort by.
   */
  sortData(column: string): void {
    if (this.currentColumn === column) {
      this.isOrderSorted = !this.isOrderSorted;
    } else {
      this.currentColumn = column;
      this.isOrderSorted = true;
    }

    this.tableData.sort((a, b) => {
      if (a[column] < b[column]) {
        return this.isOrderSorted ? -1 : 1;
      }
      if (a[column] > b[column]) {
        return this.isOrderSorted ? 1 : -1;
      }
      return 0;
    });
  }

  /**
   * Checks if the table data length is less than or equal to the page size.
   * @returns True if the table data length is less than or equal to the page size, false otherwise.
   */
  get isMaximumLength(): boolean {
    return this.tableData.length <= this.pageSize;
  }

  /**
   * Gets the paginated data based on the current page index and page size.
   * @returns The paginated data.
   */
  get paginatedData(): any[] {
    const start = this.pageIndex * this.pageSize;
    if (this.isMaximumLength) {
      return this.tableData;
    }
    return this.tableData.slice(start, start + this.pageSize);
  }

  /**
   * Capitalizes the first letter of a string.
   * @param str - The string to capitalize.
   * @returns The capitalized string.
   */
  capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  /**
   * Automatically resizes the height of a textarea element.
   * @param event - The resize event.
   */
  textAreaResizeAuto(event: any): void {
    event.target.style.height = 'auto';
    event.target.style.height = `${event.target.scrollHeight}px`;
  }

  /**
   * Moves to the next page.
   */
  nextPage(): void {
    const totalPages = Math.ceil(this.tableData.length / this.pageSize);
    if (this.pageIndex < totalPages - 1) {
      this.pageIndex++;
    }
  }

  /**
   * Moves to the previous page.
   */
  previousPage(): void {
    if (this.pageIndex > 0) {
      this.pageIndex--;
    }
  }
}

