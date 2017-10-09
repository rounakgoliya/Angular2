export class QuickRequestForm { 
   constructor( 
      public productdescription: string, 
      public quantity: string,
      public units: string,
      public requestType: string,
      public email: string,
   ) {  } 
}