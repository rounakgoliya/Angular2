import { Injectable } from "@angular/core";

import { Product } from "../classes/products";
import { PRODUCTS } from "../mock-data/mock-products";
@Injectable()
export class ProductService{
    getProducts(): Promise<Product[]>{
        return Promise.resolve(PRODUCTS);
    }
    getHero(id: string): Promise<Product> {
    return this.getProducts()
               .then(heroes => heroes.find(hero => hero.id === id));
  }
}