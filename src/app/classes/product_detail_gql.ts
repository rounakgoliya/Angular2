export module product {

       export interface Node2 {
        src: string;
    }

    export interface Edge {
        node: Node2;
    }

    export interface Images {
        edges: Edge[];
    }

    export interface Node3 {
        id: string;
    }

    export interface Edge2 {
        node: Node3;
    }

    export interface Variants {
        edges: Edge2[];
    }

    export interface Node {
        id: string;
        title: string;
        images: Images;
        variants: Variants;
    }

    export interface ProductDetail {
        node: Node;
    }

}

