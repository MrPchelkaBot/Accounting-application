export interface ICost {
    id?: number;
    name: string;
    price: number;
    type: TypeCost;
    date: Date;
}

export enum TypeCost {
    Аренда = 1,
    Водитель = 2,
    Курьер = 3,
    ТранспортнаяКомпания = 4,
    Зарплата = 5,
    ПроцентОтСделок = 6,
    Налоги = 7,
    АрендаСклада = 8,
    Бензин = 9,
    Гостиница = 10,
    Питание = 11,
    Фрилансер = 12,
    Помощник = 13,
    Прочее = 14
}