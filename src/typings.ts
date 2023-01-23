export interface Address {
    country: string
    city: string
    street: string
    zipCode: string
}

export interface Image {
    url: string
}

export interface IProperty {
    id: string; //@TODO check Typescript type for UUID
    title: string;
    description: string;
    address: Address;
    picture: Image;
}