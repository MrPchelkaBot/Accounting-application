import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GroupItems, IOrder } from '../models/IOrder';
import { OrderService } from '../services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LoadingService } from '../services/loading.service';
import { IClient } from '../models/IClient';
import { ClientService } from '../services/client.service';
import { DatePicker } from '@ionic-native/date-picker/ngx';

@Component({
  selector: 'app-info-order',
  templateUrl: './info-order.page.html',
  styleUrls: ['./info-order.page.scss'],
})
export class InfoOrderPage implements OnInit {

  infoForm: FormGroup = new FormGroup({
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

  private id: number;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private alertController: AlertController,
    private loadingService: LoadingService,
    private clientService: ClientService,
    private router: Router,
    private datePicker: DatePicker
  ) { }

  dateInput1: Date = new Date();
  dateInput2: Date = new Date();
  clients: IClient[];

  ngOnInit() {
    this.route.paramMap.subscribe(p => {
      this.clientService.all().then((v: any) => this.clients = JSON.parse(v.data) as IClient[])
      let order: IOrder;
      this.id = +p.get('id');
      this.orderService.getbyId(+p.get('id')).then(async (v: any) => {
        order = JSON.parse(v.data) as IOrder;
        this.dateInput1 = order.created;
        this.dateInput2 = order.waitDate;
        this.setValueForm('groupItems', order.groupItems);
        this.setValueForm('client', order.client.id);
        this.setValueForm('costPrice', order.costPrice);
        this.setValueForm('costLogistic', order.costLogistic);
        this.setValueForm('payment', order.payment);
        this.setValueForm('profit', order.profit);
        this.setValueForm('wait', order.wait);
      }).catch(async (err: any) => {
        let alert = await this.alertController.create({
          header: 'Загрузка заказа',
          message: err.error,
          buttons: ['V']
        });
        await alert.present();
        this.router.navigate(['orders']);
      })
    })
  }

  setValueForm = (control: string, value: any) => this.infoForm.get(control).setValue(value);

  async save() {
    await this.loadingService.present('Обновление данных');
    let client: IClient = await this.clientService.getbyId(+this.infoForm.get('client').value).then((v: any) => JSON.parse(v.data));
    
    let data: IOrder = {
      id: this.id,
      created: this.dateInput1,
      groupItems: +this.infoForm.get('groupItems').value as GroupItems,
      client: client,
      costPrice: +this.infoForm.get('costPrice').value,
      costLogistic: +this.infoForm.get('costLogistic').value,
      payment: +this.infoForm.get('payment').value,
      profit: +this.infoForm.get('profit').value,
      wait: +this.infoForm.get('wait').value,
      waitDate: this.dateInput2
    }

    this.orderService.update(data).then(async (res: any) => {
      await this.loadingService.dismiss();
      this.router.navigate(['orders']);
    }).catch(async (err: any) => {
      await this.loadingService.dismiss();
      let alert = await this.alertController.create({
        header: 'Обновление клиента',
        message: err.error,
        buttons: ['V']
      });
      await alert.present();
    })
  }

  getProfit() {
    this.infoForm.get('profit').setValue(+this.infoForm.get('payment').value - (+this.infoForm.get('costPrice').value + +this.infoForm.get('costLogistic').value))
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
