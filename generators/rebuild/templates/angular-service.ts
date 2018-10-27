import { Injectable } from '@angular/core'
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http'

import { Observable, of, throwError } from 'rxjs'
import { catchError, tap, map } from 'rxjs/operators'

import {<%= _s.classify(name) %>} from "./<%= name.toLowerCase() %>-model";

let token = localStorage.getItem('token') || ''
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: token })
}

@Injectable()
export class <%= _s.classify(name) %>Service {
  private endPoint = '/<%= baseName %>/<%= _s.classify(name) %>';

  constructor(private http : HttpClient) { }

  post(<%= name.toLowerCase() %> : <%= _s.classify(name) %>) {
    return this.http.put(`${this.endPoint}`, <%= name.toLowerCase() %>, httpOptions).pipe(map(this.extractData), catchError(this.handleError));
  }

  getById(id : number) {
    return this.http.get(`${this.endPoint}/${id}`, httpOptions).pipe(map(this.extractData), catchError(this.handleError));
  }

  put(<%= name.toLowerCase() %> : <%= _s.classify(name) %>) {
    return this.http.put(`${this.endPoint}/${<%= name.toLowerCase() %>.id} `, <%= name.toLowerCase() %>, httpOptions).pipe(map(this.extractData), catchError(this.handleError));
  }

  deleteById(id : number) {
    return this.http.delete(`${ this.endPoint } /${id}`, httpOptions).pipe(map(this.extractData), catchError(this.handleError));
}

getAll(page : number = 1, limit : number = 20, sort ? : string, order ? : string, q ? : string) {
  let params = new HttpParams();
  params.set('page', String(page));
  params.set('limit', String(limit));

  if (q && q !== '') {
    params.set('q', q);
  }
  if (sort && sort !== '' && allowColm(sort)) {
    params.set('sort', sort);
  }
  if (order && order !== '' && (order.toUpperCase() === 'ASC' || order.toUpperCase() === 'DESC')) {
    params.set('order', order)
  }

  return this.http.get(`${this.endPoint}`, {
    params,
    ...httpOptions
  }).pipe(map(this.extractData), catchError(this.handleError));
}

  private extractData(res : Response) {
  let body = res
  return body || {}
}

  private handleError(error : HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error.message)
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`)
  }
  // return an observable with a user-facing error message
  return throwError('Something bad happened; please try again later.')
}

  private allowColm(key : string) {
  const allow = [<% _.each(attrs, function(attr) { %>
    '<%= _s.underscored(attr.attrName) %>', <%}) %>];
  return (allow.indexOf(key) > -1);
}
}
