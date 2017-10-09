export module products {

    export interface Node2 {
        src: string;
    }

    export interface Edge {
        node: Node2;
    }

    export interface Images {
        edges: Edge[];
    }

    export interface Node {
        id: string;
        description: string;
        productType: string;
        tags: string[];
        vendor: string;
        images: Images;
    }

    export interface ProductListingResponse {
        node: Node;
    }

}

