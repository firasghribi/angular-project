import { Injectable } from '@angular/core';

/**
  * Retrieves the columns from the provided data array.
  * @param data - The array of data.
  * @returns An array containing the column names.
  */
@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor() { }

  getColumns(data: any[]) {
    if (data.length === 0 || null || undefined) {
      console.error('There is no data to get columns from, please provide a valid data array or check the data source')
      return [];
    }
    const columns = Object.keys(data[0]);
    return columns;
  }
}
