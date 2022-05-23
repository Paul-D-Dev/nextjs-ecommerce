import {client} from "../lib/sanity-client";
import {Image} from "./image.interface";

export class Product {
    _id: string;
    name: string;
    slug: Slug;
    details: string;
    price: number;
    image: Image[];

    constructor(inputs: Product) {
        this._id = inputs._id;
        this.name = inputs.name;
        this.slug = inputs.slug;
        this.details = inputs.details;
        this.price = inputs.price;
        this.image = inputs.image;
    }

    static async fetchProducts(): Promise<Product[]> {
        const query = `*[_type == "products"]`
        const products: Product[] = await client.fetch(query);
        return products.map(product => new Product(product));
    }

    toJSON() {
        return {
            _id: this._id,
            name: this.name,
            slug: this.slug,
            details: this.details,
            price: this.price,
            image: this.image
        }
    }
}

interface Slug {
    current: string;
    _type: string;
}




