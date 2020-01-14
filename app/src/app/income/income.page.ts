import { Component, OnInit } from '@angular/core';
import { IClient } from '../models/IClient';
import { ClientService } from '../services/client.service';
import { LoadingService } from '../services/loading.service';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { HTTPWrap } from '../wrappers/HTTPWrap';
import { HTTP } from '@ionic-native/http/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { IOrder } from '../models/IOrder';
import { Router } from '@angular/router';

@Component({
  selector: 'app-income',
  templateUrl: './income.page.html',
  styleUrls: ['./income.page.scss'],
})
export class IncomePage extends HTTPWrap implements OnInit {

  constructor(
    private clientService: ClientService,
    private loadingService: LoadingService,
    private datePicker: DatePicker,
    private router: Router,
    protected http: HTTP,
    protected nativeStorage: NativeStorage
  ) { super(http, nativeStorage); }

  ngOnInit() {
  }

  clients: IClient[] = [];
  orders: IOrder[] = [];

  dateInput1: Date = null;
  dateInput2: Date = null;


  clientNG: number = null;

  async ionViewDidEnter() {
    await this.loadingService.present('Подготовка...');
    await this.clientService.all().then((v: any) => this.clients = JSON.parse(v.data));
    await this.loadingService.dismiss();
  }

  async showDatepicker(input: number) {

    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK,
      cancelText: 'Закрыть',
      okText: 'Выбрать',
      todayText: 'Сегодня',
      locale: 'ru',

    }).then(
      async date => {
        if (input == 1) {
          this.dateInput1 = date;
          if (this.dateInput2 != null) {
            await this.getOrdersIncome();
          }
        }
        if (input == 2) {
          this.dateInput2 = date;
          await this.getOrdersIncome();
        }
      },
      err => console.log('Error occurred while getting date: ', err)
    );
  }

  async onChangeClient() {
    if (this.dateInput2 != null && this.dateInput1 != null) {
      await this.getOrdersIncome();
    }
  }

  async getOrdersIncome() {
    await this.loadingService.present('Формирование...');
    await this.getHTTP('Home/Income', { clientId: this.clientNG.toString(), ot: this.dateInput1.toLocaleDateString('ru-RU'), du: this.dateInput2.toLocaleDateString('ru-RU') }).then(
      (v: any) => this.orders = JSON.parse(v.data)
    )
    await this.loadingService.dismiss();
  }

  edit(id: number) {
    this.router.navigate([`info-order/${id}`])
  }

}
