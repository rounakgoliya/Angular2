export module collections {

    export interface DefaultProductImage {
        id: any;
        created_at: string;
        position: number;
        updated_at: string;
        product_id: any;
        src: string;
        variant_ids: any[];
        width: number;
        height: number;
    }

    export interface Image {
        created_at: string;
        src: string;
    }

    export interface CollectionListing {
        collection_id: number;
        updated_at: string;
        body_html: string;
        default_product_image: DefaultProductImage;
        handle: string;
        image: Image;
        title: string;
        sort_order: string;
        published_at: string;
    }

    export interface CollectionListingResponse {
        collection_listings: CollectionListing[];
    }

}
