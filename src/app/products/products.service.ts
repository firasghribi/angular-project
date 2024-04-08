import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../environment/environment'

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    constructor(private http: HttpClient) { }

    /**
     * Retrieves a list of products from the backend API.
     * @returns An Observable that emits the list of products.
     */
    listProduct(): Observable<any> {
        const url = environment.backend.products.apiUrl + 'products';
        const data = {};
        return this.http.get<any>(url, data).pipe(
            tap(_ => console.log(`fetched products`)),
            catchError(this.handleError<any>(`List products`))
        );
    }

    /**
     * Handles HTTP operations that failed.
     * Allows the application to continue running.
     * @param operation - The name of the operation that failed.
     * @param result - An optional value to return as the observable result.
     * @returns A function that handles the error and returns an empty result.
     */
    private handleError<T>(operation = 'operation', result?: T): any {
        return (error: any): Observable<T> => {
            console.error(error); // log to console instead
            console.log(`${operation} failed: ${error.message}`);
            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}
