import {Image, Slug} from "./sanity.interface";

export interface IProduct {
    _id?: string;
    name: string;
    slug: Slug;
    details: string;
    price: number;
    images: Image[];
}

