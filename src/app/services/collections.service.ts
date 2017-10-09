import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Collections } from "../mock-data/mock-collection";
import * as cl   from "../classes/collection_listing";
import { Collects } from "../classes/collects";
import { Collect } from "../mock-data/mock-collects";

@Injectable()
export class CollectionService {
    constructor(private http: Http) { }

    getCollection(): Promise<cl.collections.CollectionListingResponse> {
        return Promise.resolve(Collections);
    }
    getCollects(): Promise<Collects[]>{
      return Promise.resolve(Collect);
    }
    getCollectById(id:number): Promise<Collects[]>{
     return  this.getCollects()
               .then(Collects => Collects.filter(collect => (collect.collection_id == id)));
      
    }
    getCollections(): Promise<any[]>{
    return this.http.get('https://bigphi-biz.myshopify.com/admin/custom_collections.json')
               .toPromise()
               .then(response => response.json().data as any[])
               .catch(this.handleError);
       
    }
    getCollectionById(id:number): Promise<any>{
         const url = 'https://bigphi-biz.myshopify.com/admin/collection_listings/'+id+'.json';
  return this.http.get(url)
    .toPromise()
    .then(response => response.json().data as any)
    .catch(this.handleError);
    }
     private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); 
    return Promise.reject(error.message || error);
  }
}