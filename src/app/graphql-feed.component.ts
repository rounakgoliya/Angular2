import { Component, OnInit, OnDestroy } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/take';
import gql from 'graphql-tag';
import 'rxjs/add/operator/toPromise';

const AllPostsQuery = gql`
  query {
    shop {
    collections(first: 1) {
      edges {
        node{
          id
          title
          products(first: 5){
        	edges{
        		node{
        			id
        			description
        		}
        	}
          }
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
@Component({
  selector: 'app-root',
  template: `
    <a routerLink="/home" class="fixed bg-white top-0 right-0 pa4 ttu dim black no-underline">+ New Post</a>
    <div class="w-100" style="max-width: 400px">
    </div>
  `,
  host: {'style': 'width: 100%; display: flex; justify-content: center;'}
})
export class FeedComponent implements OnInit, OnDestroy {
  allPosts: any;
  allPostsSub: Subscription;
  constructor(
    private apollo: Apollo
  ) {}
  ngOnInit() {
    this.allPostsSub = this.apollo.watchQuery({
      query: AllPostsQuery
    }).subscribe(({data, loading}: any) => {
      this.allPosts = data.shop.collections.edges;
      console.log(this.allPosts);
    });
  
  }

  ngOnDestroy() {
    this.allPostsSub.unsubscribe();
  }
}