import {client} from "../lib/sanity-client";
import {Image} from "./image.interface";

export class Banner {
    image: Image;
    buttonText: string;
    product: string;
    desc: string;
    smallText: string;
    midText: string;
    largeText1: string;
    largeText2: string;
    discount: string;
    saleTime: string;

    constructor(inputs: Banner) {
        this.image = inputs.image;
        this.buttonText = inputs.buttonText;
        this.product = inputs.product;
        this.desc = inputs.desc;
        this.smallText = inputs.smallText;
        this.midText = inputs.midText;
        this.largeText1 = inputs.largeText1;
        this.largeText2 = inputs.largeText2;
        this.discount = inputs.discount;
        this.saleTime = inputs.saleTime;
    }

    static async fetchBanner(): Promise<Banner> {
        const bannerQuery = `*[_type == "banner"]`;
        const bannerData: Banner[] = await client.fetch(bannerQuery);
        return new Banner(bannerData[0]);
    }

    toJSON() {
        return {
            image: this.image,
            buttonText: this.buttonText,
            product: this.product,
            desc: this.desc,
            smallText: this.smallText,
            midText: this.midText,
            largeText1: this.largeText1,
            largeText2: this.largeText2,
            discount: this.discount,
            saleTime: this.saleTime
        }
    }
}
