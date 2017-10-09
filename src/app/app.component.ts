import { Component } from '@angular/core';
import { collections } from "./classes/collection_listing_gql";
import { ElementRef } from "@angular/core";
import { Apollo } from 'apollo-angular';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/take';
import gql from 'graphql-tag';
import 'rxjs/add/operator/toPromise';
import { ContactSupplierForm } from "./contactSupplierForm";
import { Customer } from './classes/customer';

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
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
   showDialog = false;
  title = 'app';
    public query = '';
    public filteredList = [];
    public elementRef;
  model = new ContactSupplierForm( 12321,"","","","","");
  customer = new Customer();
  public addCustomer(obj) {
    if(document.forms['registerForm'].checkValidity()){
      this.customer.firstName = obj.productName;
      this.customer.email = obj.email;
      this.customer.password = obj.units;
      this.customer.phone = "+1"+obj.mobile;
      //Call the mutation called addCustomer
    this.apollo.mutate({
      mutation: AddCustomerMutation,
      variables: {
          input: this.customer
      },
    })
      .take(1)
      .subscribe({
        next: ({data}) => {
          console.log('got a new user', data);
          
        },
        error: (errors) => {
          console.log('there was an error sending the query', errors);
          
        }
      });
      this.showDialog = false;
      obj = "";
    }
 
   //console.log(this.customer);
  
      
  }
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
  selectItem(id){
     let link = ['/Gallery', id];
    this.router.navigate(link);
    location.reload();
}
  ngOnInit() {
    this.allPostsSub = this.apollo.watchQuery({
      query: AllPostsQuery
    }).subscribe(({data, loading}: any) => {
      this.allPosts = data.shop.collections.edges;
    });
    this.allPostsSub = this.apollo.watchQuery({
      query: AllProductQuery
    }).subscribe(({data, loading}: any) => {
      this.allProduct = data.shop.products.edges;
      console.log(this.allProduct);
    });
  
  }
  
 
}
