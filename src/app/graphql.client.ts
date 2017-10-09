import { ApolloClient, createNetworkInterface } from 'apollo-client';
import * as $ from 'jquery';

const networkInterface = createNetworkInterface({ uri: 'https://bigphi-biz.myshopify.com/api/graphql' })

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};
    }
    console.log("Rounak");
      $("body").addClass("loading");

// $(document).on({
//     ajaxStart: function() { $body    },
//      ajaxStop: function() { $body.removeClass("loading"); }    
// });      
    req.options.headers['X-Shopify-Storefront-Access-Token'] = '15092a2f3ed594f3f1c7bf914b53ae15'
    next();
  }
}]);

networkInterface.useAfter([{
  applyAfterware(res, next) {
    if (res.response.status === 200) {
      console.log("Goliya");
      $("body").removeClass("loading");
    }
    if (res.response.status === 501) {
      throw new Error('Unauthorized');
    }
    if (res.response.status === 500) {
      throw new Error('Server Error');
    }
    next();
  }
}]);
const client = new ApolloClient({ networkInterface });

export function provideClient(): ApolloClient {
  return client;
}