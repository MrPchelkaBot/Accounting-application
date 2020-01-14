export interface IClient {
    id?: number;
    name: string;
    type: TypeClient;
    city: string;
    address: string;
    phone: string;
    email: string;
    contact: string;
}



export enum TypeClient {
    магазин = 1,
    ателье = 2,
    производитель = 3,
    дизайнер = 4,
}