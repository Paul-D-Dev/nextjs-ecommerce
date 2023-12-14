export interface Image {
    asset: Asset;
    _key: string;
    _type: string;
}

interface Asset {
    _ref: string;
    _type: string;
}

export interface Slug {
    current: string;
    _type: string;
}
