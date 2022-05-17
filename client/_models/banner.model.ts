import {client} from "../lib/sanity-client";
import {Image} from "./image.interface";

export class Banner {
    image: Image;
    buttonText: string;
    product: string;
    desc: string;
    smallText: string;
    midText: string;
    lastText1: string;
    lastText2: string;
    discount: string;
    saleTime: string;

    constructor(inputs: Banner) {
        this.image = inputs.image;
        this.buttonText = inputs.buttonText;
        this.product = inputs.product;
        this.desc = inputs.desc;
        this.smallText = inputs.smallText;
        this.midText = inputs.midText;
        this.lastText1 = inputs.lastText1;
        this.lastText2 = inputs.lastText2;
        this.discount = inputs.discount;
        this.saleTime = inputs.saleTime;
    }

    static async fetchBanner(): Promise<Banner> {
        const bannerQuery = `*[_type == "banner"]`;
        const bannerData: Banner = await client.fetch(bannerQuery);
        return new Banner(bannerData);
    }
}
