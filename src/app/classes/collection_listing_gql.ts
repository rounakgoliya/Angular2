export module collections {
    export interface Image {
        src: string;
    }

    export interface CollectionListingGql {
        id: number;
        handle: string;
        image: Image;
        title: string;
    }

    export interface CollectionListingResponse {
        node: CollectionListingGql[];
    }

}
