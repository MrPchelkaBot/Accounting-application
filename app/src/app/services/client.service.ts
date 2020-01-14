import { Injectable } from '@angular/core';
import { HTTPWrap } from '../wrappers/HTTPWrap';
import { HTTP } from '@ionic-native/http/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { IClient } from '../models/IClient';

@Injectable({
  providedIn: 'root'
})
export class ClientService extends HTTPWrap {

  constructor(
    protected http: HTTP,
    protected nativeStorage: NativeStorage
  ) { super(http, nativeStorage); }

  add(data: IClient) {
    return this.postHTTP('Client', data);
  }

  all() {
    return this.getHTTP('Client');
  }

  getbyId(id: number) {
    return this.getHTTP('Client/GetById', { 'id': id.toString() } );
  }

  update(data: IClient) {
    return this.putHTTP('Client', data);
  }
}
