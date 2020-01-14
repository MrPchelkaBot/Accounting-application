import { HTTP } from '@ionic-native/http/ngx';
import { server } from '../consts';
import { NativeStorage } from '@ionic-native/native-storage/ngx';


export class HTTPWrap {


    private token: string;

    constructor(protected http: HTTP, protected nativeStorage: NativeStorage) {
    }

    private headers = {
        'Content-Type': 'application/json',
        'Authorization': ''
    };

    protected async postHTTP(controller: string, data: any) {
        await this.Token();
        return this.http.post(`${server}api/${controller}`, data, this.headers);
    }

    protected async getHTTP(controller: string, params?: any) {
        await this.Token();
        return this.http.get(`${server}api/${controller}`, params, this.headers);
    }

    protected async putHTTP(controller: string, data: any) {
        await this.Token();
        return this.http.put(`${server}api/${controller}`, data, this.headers);
    }

    private async Token() {
        this.token = await this.nativeStorage.getItem('token').then((token: string) => token).catch(() => '');
        this.headers.Authorization = 'Bearer ' + this.token;
        this.http.setDataSerializer('json');
    }

}