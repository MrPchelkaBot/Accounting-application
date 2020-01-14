import { Injectable } from '@angular/core';
import { IOrder } from '../models/IOrder';
import { HTTPWrap } from '../wrappers/HTTPWrap';
import { HTTP } from '@ionic-native/http/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends HTTPWrap {

  constructor(
    protected http: HTTP,
    protected nativeStorage: NativeStorage
  ) { super(http, nativeStorage); }

  add(data: IOrder) {
    return this.postHTTP('Order', data);
  }

  getbyId(id: number) {
    return this.getHTTP('Order/GetById', { 'id': id.toString() });
  }

  getByDateAndId(date: Date, id: number) {
    return this.getHTTP('Order/GetByDate', { 'stamp': date.toLocaleDateString('ru-RU'), 'id': id.toString() });
  }

  getByIdClient(id: number) {
    return this.getHTTP('Order/GetByIdClient', { 'id': id.toString() });
  }

  all() {
    return this.getHTTP('Order');
  }

  update(data: IOrder) {
    return this.putHTTP('Order', data);
  }
}
