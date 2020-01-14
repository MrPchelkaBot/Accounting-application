import { Injectable } from '@angular/core';
import { HTTPWrap } from '../wrappers/HTTPWrap';
import { HTTP } from '@ionic-native/http/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends HTTPWrap {

  constructor(
    protected http: HTTP,
    protected nativeStorage: NativeStorage
  ) { super(http, nativeStorage); }

  logIn(data: any) {
    return this.postHTTP('Auth', data);
  }

  async setToken(token: string) {
    await this.nativeStorage.setItem('token', token);
  }

  async getToken() {
    return await this.nativeStorage.getItem('token').then((data: string) => data).catch(() => '');
  }

}
