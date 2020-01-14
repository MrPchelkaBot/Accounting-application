import { Component, OnInit } from '@angular/core';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { CostService } from '../services/cost.service';
import { LoadingService } from '../services/loading.service';
import { IOrder } from '../models/IOrder';
import { ICost } from '../models/ICost';

@Component({
  selector: 'app-costs',
  templateUrl: './costs.page.html',
  styleUrls: ['./costs.page.scss'],
})
export class CostsPage implements OnInit {

  dateFiltr: Date = new Date();
  costs: ICost[] = [];

  constructor(private datePicker: DatePicker, private costService: CostService, private loadingService: LoadingService) { }

  ngOnInit() {
  }

  async ionViewDidEnter() {
    await this.loadingService.present('Загрузка данных');
    this.costService.getByDate(this.dateFiltr).then(async (v: any) => {
      this.costs = <ICost[]>JSON.parse(v.data)
      await this.loadingService.dismiss();
    }).catch(async (err) => {
      await this.loadingService.dismiss();
      console.log(err);
    });
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
        await this.loadingService.present('Загрузка данных');
        this.costService.getByDate(this.dateFiltr).then(async (v: any) => {
          this.costs = <ICost[]>JSON.parse(v.data)
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
