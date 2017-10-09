import { Component } from '@angular/core';
import { collections } from "./classes/collection_listing_gql";
import { ElementRef } from "@angular/core";
import { Apollo } from 'apollo-angular';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/take';
import gql from 'graphql-tag';
import 'rxjs/add/operator/toPromise';

const AllProductQuery = gql`{
  shop {
          products(first: 250){
        	edges{
        		node{
        			id
        			title
        			}
        		}
        }
       
    }
 }`;

@Component({
    selector: 'autocomplete',
    styleUrls: ['./app.component.scss'],
     host: {
        '(document:click)': 'handleClick($event)',
    },
    template: `<input type="text" class="searchTerm" [(ngModel)]="query " (keyup)="filter()" placeholder="What are you looking for?">
    <div class="suggestions" *ngIf="filteredList.length > 0" >
                <ul style="list-style: none;padding: 0;">
                    <li *ngFor="let item of filteredList;let index=index" (click)="selectItem(item.node.title,item.node.id)">
                        {{item.node.title}}
                    </li>
                </ul>
            </div>`
})

export class AutoComplete {
     title = 'app';
    public query = '';
    public filteredList = [];
    public elementRef;
 
  allPosts: any;
  public allProduct: any;
  allPostsSub: Subscription;
  constructor(
    private apollo: Apollo,
    myElement: ElementRef,
    private router: Router
  ) {
    this.elementRef = myElement;
  }

  ngOnInit() {
    this.allPostsSub = this.apollo.watchQuery({
      query: AllProductQuery
    }).subscribe(({data, loading}: any) => {
      this.allProduct = data.shop.products.edges;
      console.log(this.allProduct);
    });
  
  }
     //Auto Search
  filter() {
    if (this.query !== ""){
        this.filteredList = this.allProduct.filter(function(el){
            return el.node.title.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
        }.bind(this));
    }else{
        this.filteredList = [];
    }
}
 
selectItem(item,id){
    this.query = item;
    this.filteredList = [];
     let link = ['/Product', id];
    this.router.navigate(link);
    location.reload();
}
  handleClick(event){
   var clickedComponent = event.target;
   var inside = false;
   do {
       if (clickedComponent === this.elementRef.nativeElement) {
           inside = true;
       }
      clickedComponent = clickedComponent.parentNode;
   } while (clickedComponent);
    if(!inside){
        this.filteredList = [];
    }
}
}