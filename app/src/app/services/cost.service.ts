import { Injectable } from '@angular/core';
import { HTTPWrap } from '../wrappers/HTTPWrap';
import { HTTP } from '@ionic-native/http/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { ICost } from '../models/ICost';

@Injectable({
  providedIn: 'root'
})
export class CostService extends HTTPWrap {

  constructor(
    protected http: HTTP,
    protected nativeStorage: NativeStorage
  ) { super(http, nativeStorage); }

  add(data: ICost) {
    return this.postHTTP('Cost', data);
  }

  getByDate(date: Date) {
    return this.getHTTP('Cost/GetBydate', { 'stamp': date.toLocaleDateString('ru-RU') })
  }
}
