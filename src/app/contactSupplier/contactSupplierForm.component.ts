import { Component,OnInit } from '@angular/core';  
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Headers, RequestOptions, Http, Response } from '@angular/http';
import { ContactSupplierForm } from "../contactSupplierForm";
import { ProductService } from '../services/products.service';
import { Product } from '../classes/products';
import { Angulartics2Facebook } from "angulartics2";
import { Customer } from '../classes/customer';
import { product } from "../classes/product_detail_gql";

import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/take';
import gql from 'graphql-tag';
import 'rxjs/add/operator/toPromise';

const AddCustomerMutation = gql`
mutation 
  customerCreate ( $input: CustomerCreateInput! ) {
      customerCreate ( input: $input ) {
    userErrors {
      field
      message
    }
    customer {
      id
    }
  }
}`;
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
  styleUrls: ['./contactSupplierForm.component.scss'], 
   templateUrl: './contactSupplierForm.component.html', 
   providers: [ProductService,Angulartics2Facebook],
})

export class AppContactSupplier implements OnInit {
model = new ContactSupplierForm( 12321,"PDP_Name","10","123123","","");
constructor(private productService: ProductService ,private apollo: Apollo ,private route: ActivatedRoute ,private angulartics2facebook: Angulartics2Facebook){}
product: Product;
showSuccess = false;
allPostsSub: Subscription;
product_detail: product.ProductDetail;
customer = new Customer();
checkOutID: String;
public variant_id: String;
public addCustomer(obj,e) {
  //console.log(obj);
   e.preventDefault();
  this.customer.firstName = obj.productName;
  this.customer.email = obj.email;
  this.customer.password = obj.quantity;
  this.customer.phone = obj.mobile;
   console.log(this.customer);
  //Call the mutation called addCustomer
    // this.apollo.mutate({
    //   mutation: AddCustomerMutation,
    //   variables: {
    //       input: this.customer
    //   },
    // })
    //   .take(1)
    //   .subscribe({
    //     next: ({data}) => {
    //       console.log('got a new user', data);
    //     },
    //     error: (errors) => {
    //       console.log('there was an error sending the query', errors);
    //     }
    //   });


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
    public product_id: number;
ngOnInit(): void{
      window.scrollTo(0, 0);
      this.route.params.subscribe((params: ParamMap) => {
        this.product_id = params['id'];
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

}