import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import { Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers } from '@angular/http';
declare var $: any;
 
@Injectable()
export class HttpService extends Http {
  public pendingRequests = 0;
  public showLoading = false;
 
  constructor(backend: XHRBackend, defaultOptions: RequestOptions) {
    super(backend, defaultOptions);
  }
 
 request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
      return this.intercept(super.request(url, options));
  }
    intercept(observable: Observable<Response>): Observable<Response> {
  console.log("In the intercept routine..");
  this.pendingRequests++;
  return observable.catch((err: any, source:Observable<Response>) => {
      console.log("Caught error: ");
      return Observable.of(undefined);
    })
    .do((res: Response) => {
      console.log("Response: " + res);
    }, (err: any) => {
      console.log("Caught error: " + err);
    })
    .finally(() => {
      console.log("Finally.. delaying, though.")
      var timer = Observable.timer(1000);
      timer.subscribe(t => {
        this.turnOffModal();
      });
    });
  }
private turnOnModal() {
  if (!this.showLoading) {
      this.showLoading = true;
      $('body').spin("modal", "#FFFFFF", "rgba(51, 51, 51, 0.1)");
      console.log("Turned on modal");
  }
  this.showLoading = true;
}
 
private turnOffModal() {
  this.pendingRequests--;
  if (this.pendingRequests <= 0) {
    if (this.showLoading) {
      $('body').spin("modal", "#FFFFFF", "rgba(51, 51, 51, 0.1)");
    }
    this.showLoading = false;
  }
  console.log("Turned off modal");
}
}