export class ContactSupplierForm { 
   constructor( 
      public productId: number,
      public productName: string, 
      public quantity: string,
      public units: string,
      public email: string,
      public mobile: string, 
   ) {  } 
}