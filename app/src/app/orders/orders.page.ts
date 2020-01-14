import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from '../services/loading.service';
import { IClient } from '../models/IClient';
import { OrderService } from '../services/order.service';
import { IOrder } from '../models/IOrder';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {

  orders: IOrder[] = [];
  clients: IClient[] = [];

  clientNG: number = -1;
  slide = 'Заказ';
  dateFiltr: Date = new Date();

  constructor(
    private router: Router,
    private loadingService: LoadingService,
    private orderService: OrderService,
    private datePicker: DatePicker,
    private clientService: ClientService
  ) { }

  ngOnInit() {
  }

  async ionViewDidEnter() {
    this.clientNG = -1;
    await this.loadingService.present('Загрузка данных');
    this.clients = await this.clientService.all().then((v: any) => JSON.parse(v.data));
    if (this.slide == 'Даты') {
      this.orderService.getByDateAndId(this.dateFiltr, this.clientNG).then(async (v: any) => {
        this.orders = JSON.parse(v.data) as IOrder[];
        await this.loadingService.dismiss();
      }).catch(async (err) => {
        await this.loadingService.dismiss();
        console.log(err);
      });
    } else {
      this.orderService.all().then(async (v: any) => {
        this.orders = JSON.parse(v.data) as IOrder[];
        await this.loadingService.dismiss();
      }).catch(async () => await this.loadingService.dismiss());
    }
  }

  async onChangeClient() {
    if (this.clientNG == -1) {
      await this.loadingService.present('Загрузка данных');
      if (this.slide == 'Даты')
        this.orders = await this.orderService.getByDateAndId(this.dateFiltr, this.clientNG).then((v: any) => JSON.parse(v.data) as IOrder[]);
      else
        this.orders = await this.orderService.all().then((v: any) => JSON.parse(v.data) as IOrder[]);
      await this.loadingService.dismiss();
    }
    else {
      await this.loadingService.present('Загрузка данных');
      this.orders = await this.orderService.getByIdClient(this.clientNG).then((v: any) => JSON.parse(v.data) as IOrder[]);
      if (this.slide == 'Даты')
        this.orders = await this.orderService.getByDateAndId(this.dateFiltr, this.clientNG).then((v: any) => JSON.parse(v.data) as IOrder[]);
      else
        this.orders = await this.orderService.getByIdClient(this.clientNG).then((v: any) => JSON.parse(v.data) as IOrder[]);
      await this.loadingService.dismiss();
    }
  }

  edit(id: number) {
    this.router.navigate([`info-order/${id}`])
  }

  async changeSlide() {
    if (this.slide == 'Заказ') {
      this.slide = 'Даты'
      this.dateFiltr.setHours(0, 0, 0, 0);
      this.loadingService.present('Загрузка данных');
      this.orderService.getByDateAndId(this.dateFiltr, this.clientNG).then(async (v: any) => {
        this.orders = <IOrder[]>JSON.parse(v.data)
        await this.loadingService.dismiss();
      }).catch(async (err) => {
        await this.loadingService.dismiss();
        console.log(err);
      });
    }
    else {
      this.slide = 'Заказ'
      this.loadingService.present('Загрузка данных');
      if (this.clientNG == -1) {
        this.orderService.all().then(async (v: any) => {
          this.orders = <IOrder[]>JSON.parse(v.data)
          await this.loadingService.dismiss();
        }).catch(async () => await this.loadingService.dismiss());
      }
      else {
        this.orders = await this.orderService.getByIdClient(this.clientNG).then((v: any) => JSON.parse(v.data) as IOrder[]);
        await this.loadingService.dismiss();
      }
    }
  }

  async showDatepicker() {
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
        this.dateFiltr = date;
        this.dateFiltr.setHours(0, 0, 0, 0);
        await this.loadingService.present('Загрузка данных');
        this.orderService.getByDateAndId(this.dateFiltr, this.clientNG).then(async (v: any) => {
          this.orders = <IOrder[]>JSON.parse(v.data)
          await this.loadingService.dismiss();
        }).catch(async (err) => {
          await this.loadingService.dismiss();
          console.log(err);
        });
      },
      err => console.log('Error occurred while getting date: ', err)
    );
  }

}
