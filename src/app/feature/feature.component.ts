import { Component } from '@angular/core';  
import { FormsModule } from '@angular/forms';
import { Headers, RequestOptions, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable'; 
import 'rxjs/add/operator/map'; 
import 'rxjs/add/operator/do';

@Component ({  
  styleUrls: ['./feature.component.scss'], 
   templateUrl: 'feature.component.html', 
})  
export   class   AppFeature  { 
   
     constructor(private _http: Http) { }
    public add(obj) {
    console.log(obj);
    //Add Post Call
        // let body = JSON.stringify( obj );
        // let headers = new Headers({ 'Content-Type': 'application/json' });
        // let options = new RequestOptions({ headers: headers });

        // return this._http.post('http://localhost:8080/**********', body, options)
        //        .map(res: Response)
        //        .do(
        //           data => {
                     
        //        })
        //        .toPromise()
        //        .catch("message");
    }

    
    
}