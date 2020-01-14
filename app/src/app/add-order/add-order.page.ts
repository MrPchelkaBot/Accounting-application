import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GroupItems, IOrder } from '../models/IOrder';
import { IClient } from '../models/IClient';
import { ClientService } from '../services/client.service';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { AlertController } from '@ionic/angular';
import { LoadingService } from '../services/loading.service';
import { Router } from '@angular/router';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.page.html',
  styleUrls: ['./add-order.page.scss'],
})
export class AddOrderPage implements OnInit {

  addForm: FormGroup = new FormGroup({
    'groupItems': new FormControl('', Validators.required),
    'client': new FormControl('', Validators.required),
    'costPrice': new FormControl('0', Validators.required),
    'costLogistic': new FormControl('0', Validators.required),
    'payment': new FormControl('0', Validators.required),
    'profit': new FormControl('', Validators.required),
    'wait': new FormControl('0', Validators.required),
  });

  groups = [
    { value: GroupItems.Молнии, title: 'Молнии' },
    { value: GroupItems.Кнопки, title: 'Кнопки' },
    { value: GroupItems.Нашивки, title: 'Нашивки' },
    { value: GroupItems.Украшения, title: 'Украшения' },
    { value: GroupItems.Пуговицы, title: 'Пуговицы' }
  ];

  clients: IClient[];

  dateInput1: Date = new Date();
  dateInput2: Date = new Date();

  ionViewDidEnter() {
    this.clientService.all().then((v: any) => this.clients = JSON.parse(v.data) as IClient[])
  }

  constructor(
    private clientService: ClientService,
    private datePicker: DatePicker,
    private alertController: AlertController,
    private loadingService: LoadingService,
    private router: Router,
    private orderService: OrderService
  ) { }

  ngOnInit() {
  }

  async add() {
    await this.loadingService.present('Добавление...');
    let client: IClient = await this.clientService.getbyId(+this.addForm.get('client').value).then((v: any) => JSON.parse(v.data));

    this.dateInput1.setHours(0, 0, 0, 0);
    this.dateInput2.setHours(0, 0, 0, 0);

    let data: IOrder = {
      created: this.dateInput1,
      groupItems: +this.addForm.get('groupItems').value as GroupItems,
      client: client,
      costPrice: +this.addForm.get('costPrice').value,
      costLogistic: +this.addForm.get('costLogistic').value,
      payment: +this.addForm.get('payment').value,
      profit: +this.addForm.get('profit').value,
      wait: +this.addForm.get('wait').value,
      waitDate: this.dateInput2
    }
    this.orderService.add(data).then(async (res: any) => {
      await this.loadingService.dismiss();
      this.router.navigate(['orders']);

    }).catch(async (err: any) => {
      await this.loadingService.dismiss();
      let alert = await this.alertController.create({
        header: 'Добавление',
        message: err.error,
        buttons: ['V']
      });
      await alert.present();
    });

  }

  getProfit() {
    this.addForm.get('profit').setValue(+this.addForm.get('payment').value - (+this.addForm.get('costPrice').value + +this.addForm.get('costLogistic').value))
  }

  showDatepicker(input: number) {
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK,
      cancelText: 'Закрыть',
      okText: 'Выбрать',
      todayText: 'Сегодня',
      locale: 'ru',

    }).then(
      date => {
        if (input == 1) {
          this.dateInput1 = date;
        }
        if (input == 2) {
          this.dateInput2 = date;
        }
        //this.myDate = date.getDate() + "/" + date.toLocaleString('default', { month: 'long' }) + "/" + date.getFullYear();
      },
      err => console.log('Error occurred while getting date: ', err)
    );
  }

}
