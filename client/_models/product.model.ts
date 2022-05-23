import {client} from "../lib/sanity-client";
import {Image} from "./image.interface";

export class Product {
    _id?: string;
    name: string;
    slug: Slug;
    details: string;
    price: number;
    images: Image[];

    constructor(inputs: Product) {
        this._id = inputs._id;
        this.name = inputs.name;
        this.slug = inputs.slug;
        this.details = inputs.details;
        this.price = inputs.price;
        this.images = inputs.images;
    }

    static async fetchProducts(): Promise<Product[]> {
        const query = '*[_type == "products"]';
        const products: Product[] = await client.fetch(query);
        return products.map(product => new Product(product));
    }

    static async fetchProductBySlug(slug: string): Promise<Product> {
        const query = `*[_type == "products" && slug.current == "${slug}"][0]`;
        const product: Product = await client.fetch(query);
        return new Product(product);
    }

    // Return array of slug's products
    static async fetchProductsSlugStaticPaths(): Promise<String[]> {
        // Fetch only slug.current from products
        const query = '*[_type == "products"] { slug { current } }';
        const products: Product[] = await client.fetch(query);
        return products.map(product => product.slug.current);

    }

    toJSON() {
        return {
            _id: this._id,
            name: this.name,
            slug: this.slug,
            details: this.details,
            price: this.price,
            images: this.images
        }
    }

}

interface Slug {
    current: string;
    _type: string;
}




