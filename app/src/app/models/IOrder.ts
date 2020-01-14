import { IClient } from './IClient';

export interface IOrder {
    id?: number;
    created: Date;
    groupItems: GroupItems;
    client: IClient;
    costPrice: number;
    costLogistic: number;
    payment: number
    profit: number;
    wait: number;
    waitDate: Date;
}

export enum GroupItems {
    Молнии = 1,
    Кнопки = 2,
    Нашивки = 3,
    Украшения = 4,
    Кружева = 5,
    Фурнитура = 6,
    Пуговицы = 7
}