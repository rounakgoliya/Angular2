import { Component , OnInit } from '@angular/core';  
import { FormsModule } from '@angular/forms';
import { QuickRequestForm } from "../quickRequestForm";
import { Headers, RequestOptions, Http, Response } from '@angular/http';
import { ActivatedRoute, ParamMap , Params } from '@angular/router';
import { Observable } from 'rxjs/Observable'; 
import { ProductService } from '../services/products.service';
import { Product } from '../classes/products';
import { products } from "../classes/products_listing_gql";
import { Collects } from "../classes/collects";
import { CollectionService } from "../services/collections.service";
import 'rxjs/add/operator/map'; 
import 'rxjs/add/operator/do';

import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/take';
import gql from 'graphql-tag';
import 'rxjs/add/operator/toPromise';

const AllPostsQuery = gql`
  query ($id: ID!) 
{
  node(id:$id) {
    id
    ... on Collection {
      title
      image{
			src         
          }
       products(first: 15){
        	edges{
        		node{
        			id
        			description
        			productType   
        			tags   
        			vendor   
        			images(first: 1){
        			edges{
        				node{
							src  
						}
        			  }
        			}
        		}
        	}
          }
    }
  }
}
`;

@Component ({  
  styleUrls: ['./gallery.component.scss'], 
   templateUrl: 'gallery.component.html', 
   providers: [ProductService,CollectionService],
})  
export   class   AppGallery implements OnInit  { 
    
    public products: Product[];
    public collect: Collects[];
    public collection_id: number; 
    ngOnInit(): void {
        this.route.params.subscribe((params: Params) => {
        this.collection_id = params['id'];
        console.log(atob(this.collection_id+"").match(/(\d+)/g)[0]);
      });
        this.getProducts(this.collection_id);
        this.getCollects();
    }
    productListing : products.ProductListingResponse;
     allPosts: any;
  allPostsSub: Subscription;
    getProducts(collectid): void{
        //this.prodService.getProducts().then(products => this.products = products);
        this.allPostsSub = this.apollo.watchQuery({
            query: AllPostsQuery,
            variables:{
                id: collectid,
            }
            }).subscribe(({data}: any) => {
            this.productListing = data.node.products.edges;
            console.log(this.productListing);
            });
    }
    getCollects(): void{
        var that = this;
        this.collectService.getCollectById(396042578).then(collect => this.collect = collect);
         setTimeout(function() {
    //console.log(that.collect);
  }, 5000);
        
    }
    MinOrder =[{id: 1, name: "10"}];
    SupplierLocation =[{id: 1, name: "Banglore"}];
    SortBy = [
       {id: 1, name: "A-Z"},
       {id: 2, name: "Z-A"},
       {id: 3, name: "Price Low to High"},
       {id: 4, name: "Price High to Low"}
     ];
    SortByValue = this.SortBy[0];
    SupplierLocationValue =this.SupplierLocation[0];
    MinOrderValue = this.MinOrder[0];
    options = [
    {name:'OptionA', value:'1', checked:false},
    {name:'OptionB', value:'2', checked:false},
    {name:'OptionC', value:'3', checked:false}
  ]
    public selectedOptions() { 
    this.options
              .filter(opt => opt.checked)
              .map(opt => opt.value);
              console.log(this.options);

  }
     
     constructor(private apollo: Apollo,private _http: Http,private prodService: ProductService,private collectService: CollectionService, private route: ActivatedRoute,) { }
     

    
    
}