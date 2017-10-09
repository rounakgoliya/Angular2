import { Component,OnInit } from '@angular/core';  
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Headers, RequestOptions, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable'; 
import { Location } from '@angular/common';
import { ProductService } from '../services/products.service';
import { Product } from '../classes/products';
import { product } from "../classes/product_detail_gql";
import 'rxjs/add/operator/map'; 
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import { ContactSupplierForm } from "../contactSupplierForm";
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/take';
import gql from 'graphql-tag';
import 'rxjs/add/operator/toPromise';
import { Customer } from '../classes/customer';

const AllPostsQuery1 = gql`
  query ($id: ID!) {
  node(id:$id) {
    id
    ... on Product {
      title
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
`;
const CreateCheckOut = gql`
mutation
 checkoutCreate($input: CheckoutCreateInput! )
 { checkoutCreate(input:$input) {
  
    userErrors {
      field
      message
    }
    checkout {
      id
    }
  }
}`;
const CreateCheckOutLineItem = gql`
mutation
checkoutLineItemsAdd($lineItems: [CheckoutLineItemInput!]!, $checkoutId: ID!) {
  checkoutLineItemsAdd(lineItems: $lineItems, checkoutId: $checkoutId) {
    userErrors {
      field
      message
    }
    checkout {
      id
    }
  }
}`;
const AllPostsQuery = gql`
  query ($id: ID!) {
  node(id:$id) {
    id
    ... on Product {
      title
      images(first: 1){
        			edges{
        				node{
							src  
						}
        			  }
              }
      variants(first: 1){
        			edges{
        				node{
        					id
        					}
        				}
        			}
     
    }
  }
}
`;

@Component ({  
  styleUrls: ['./product.component.scss','../contactSupplier/contactSupplierForm.component.scss'], 
   templateUrl: 'product.component.html', 
   providers: [ProductService],
})  
export   class   AppProduct implements OnInit  { 
   
    hero: Product;
    product_detail: product.ProductDetail;
    model = new ContactSupplierForm( 12321,"PDP_Name","10","123123","","");
    product: Product;
showSuccess = false;
allPostsSub: Subscription;
showProduct = false;
customer = new Customer();
checkOutID: String;
public variant_id: String;
  constructor(
      private _http: Http,
    private productService: ProductService,
    private route: ActivatedRoute,
    private apollo: Apollo,
    private location: Location
  ) {}
  allPosts: any;
  
  public collection_id: number; 
     ngOnInit(): void {
      window.scrollTo(0, 0);
      this.route.params.subscribe((params: ParamMap) => {
        this.collection_id = params['id'];
        console.log(atob(this.collection_id+"").match(/(\d+)/g)[0]);
      });
      this.allPostsSub = this.apollo.watchQuery({
            query: AllPostsQuery1,
            variables:{
                id: this.collection_id,
            }
            }).subscribe(({data}: any) => {
            this.product_detail = data ;
            console.log(this.product_detail);
            });
  }

  goBack(): void {
    this.location.back();
  }
  public product_id: number;
    public contactSupplier(id) {
      this.showProduct = true;
      this.route.params.subscribe((params: ParamMap) => {
        this.product_id = id;
        console.log(atob(this.product_id+"").match(/(\d+)/g)[0]);
      });
       this.allPostsSub = this.apollo.watchQuery({
            query: AllPostsQuery,
            variables:{
                id: this.product_id,
            }
            }).subscribe(({data}: any) => {
            this.product_detail = data ;
            this.variant_id = data.node.variants.edges[0].node.id;
            });
    }
    public addCustomer(obj,e) {
  //console.log(obj);
   e.preventDefault();
  this.customer.firstName = obj.productName;
  this.customer.email = obj.email;
  this.customer.password = obj.quantity;
  this.customer.phone = obj.mobile;
   console.log(this.customer);
  

      //call a mutation to create Checkout
      this.apollo.mutate({
      mutation: CreateCheckOut,
      variables: {
          input: {email:this.customer.email,
                  note:this.customer.phone}
      },
    })
      .take(1)
      .subscribe({
        next: ({data}:any) => {
          this.checkOutID = data.checkoutCreate.checkout.id;
          console.log('got a new checkout', this.checkOutID);
          //call a mutation to create CheckoutLine Item
      this.apollo.mutate({
      mutation: CreateCheckOutLineItem,
      variables: {
          lineItems: [{quantity: parseInt(this.customer.password),
                  variantId:this.variant_id}],
          checkoutId: this.checkOutID
          
      },
    })
      .take(1)
      .subscribe({
        next: ({data}:any) => {
          console.log('got a new checkout Line Item', data);
          this.showSuccess = true;
        },
        error: (errors) => {
          console.log('there was an error sending the query', errors);
        }
      });
        },
        error: (errors) => {
          console.log('there was an error sending the query', errors);
        }
      });
    }

    
    
}