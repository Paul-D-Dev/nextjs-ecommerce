import {client} from "../lib/sanity-client";
import {Image} from "./image.interface";

interface Slug {
    current: string;
    _type: string;
}

export class Product {
    name: string;
    slug: Slug;
    details: string;
    price: number;
    image: Image[];

    constructor(inputs: Product) {
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
}




