export interface Image {
    asset: Asset;
    _key: string;
    _type: string;
}

interface Asset {
    _ref: string;
    _type: string;
}
