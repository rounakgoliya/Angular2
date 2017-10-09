import { Component , OnInit } from '@angular/core';  
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { QuickRequestForm } from "../quickRequestForm";
import { Headers, RequestOptions, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable'; 
import 'rxjs/add/operator/map'; 
import 'rxjs/add/operator/do';
import { CollectionService } from "../services/collections.service";
import { collections } from "../classes/collection_listing_gql";
import { Customer } from '../classes/customer';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/take';
import gql from 'graphql-tag';
import 'rxjs/add/operator/toPromise';

const AllPostsQuery = gql`
  query 
{
  shop {
    collections(first: 7) {
      edges {
        node {
          id
          title
          handle
          image{
			src         
          }
        }
      }
      pageInfo {
        hasNextPage
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
@Component ({  
  styleUrls: ['./home.component.scss'], 
   templateUrl: 'home.component.html',
   providers: [CollectionService], 
   
})  
export   class   AppHome implements OnInit { 
    //allPosts: string[];
    //allPosts = ["","","","","",""];
    clicked = false;
    clicked1 = false;
    clicked2 = false;
    showSuccess = false;
    collections: collections.CollectionListingResponse;
    model = new QuickRequestForm("","",null,"","");
    Images = [{url:"assets/images/hero.jpg"},{url:"assets/images/hero.jpg"},{url:"assets/images/hero.jpg"},{url:"assets/images/hero.jpg"}];
    ImagesMobile = [{url:"assets/images/hero_mobile.jpg"},{url:"assets/images/hero_mobile.jpg"}];
    units = [
       {id: 1, name: "Pieces"},
       {id: 2, name: "Sample"}
     ];
    requestTypes = [
        {id:1, name:"Request Price"},
        {id:2, name:"Request Sample"},
        {id:3, name:"Detailed Quotation"}
    ];
    
  allPostsSub: Subscription;
    constructor(private apollo: Apollo ,private collectionService: CollectionService) {
      
     }
    ngOnInit(): void{
      
        //this.getAllCollection();
        this.allPostsSub = this.apollo.watchQuery({
            query: AllPostsQuery
            }).subscribe(({data, loading}: any) => {
            this.collections = data.shop.collections.edges;
            console.log(this.collections);
            });
           
        
    }

    // getAllCollection(): void{ 
    //     var that = this;
    //     this.collectionService.getCollection().then(collections => this.collections = collections);
    // }


    customer = new Customer();
    checkOutID: String;
    variant_id = "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80NDg4OTAzMTU3MA==";
    public add(obj,e) {
      console.log("Hello");
      e.preventDefault();
       this.customer.email = obj.email;
       this.customer.phone = obj.requestType;
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
          lineItems: [{quantity: parseInt("0"),
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