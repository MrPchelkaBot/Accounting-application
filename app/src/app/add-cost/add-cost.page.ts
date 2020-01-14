import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { AlertController } from '@ionic/angular';
import { LoadingService } from '../services/loading.service';
import { Router } from '@angular/router';
import { ICost, TypeCost } from '../models/ICost';
import { CostService } from '../services/cost.service';

@Component({
  selector: 'app-add-cost',
  templateUrl: './add-cost.page.html',
  styleUrls: ['./add-cost.page.scss'],
})
export class AddCostPage implements OnInit {

  addForm: FormGroup = new FormGroup({
    'name': new FormControl('', Validators.required),
    'price': new FormControl('', Validators.required),
    'type': new FormControl(TypeCost.Аренда)
  });

  types = [
    { value: TypeCost.Аренда, title: 'Аренда' },
    { value: TypeCost.Водитель, title: 'Водитель' },
    { value: TypeCost.Курьер, title: 'Курьер' },
    { value: TypeCost.ТранспортнаяКомпания, title: 'Транспортная компания' },
    { value: TypeCost.Зарплата, title: 'Зарплата' },
    { value: TypeCost.ПроцентОтСделок, title: '% от сделок' },
    { value: TypeCost.Налоги, title: 'Налоги' },
    { value: TypeCost.АрендаСклада, title: 'Аренда склада' },
    { value: TypeCost.Бензин, title: 'Бензин' },
    { value: TypeCost.Гостиница, title: 'Гостиница' },
    { value: TypeCost.Питание, title: 'Питание' },
    { value: TypeCost.Фрилансер, title: 'Фрилансер' },
    { value: TypeCost.Помощник, title: 'Помощник' },
    { value: TypeCost.Прочее, title: 'Прочее' }
  ]

  dateInput: Date = new Date();

  constructor(
    private datePicker: DatePicker,
    private alertController: AlertController,
    private loadingService: LoadingService,
    private router: Router,
    private costService: CostService
  ) { }

  ngOnInit() {
  }

  showDatepicker() {
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
        this.dateInput = date;
      },
      err => console.log('Error occurred while getting date: ', err)
    );
  }

  async add() {
    await this.loadingService.present('Добавление...');
    this.dateInput.setHours(0, 0, 0, 0);

    let data: ICost = {
      name: this.addForm.get('name').value,
      price: +this.addForm.get('price').value,
      type: +this.addForm.get('type').value as TypeCost,
      date: this.dateInput
    };

    this.costService.add(data).then(async (res: any) => {
      await this.loadingService.dismiss();
      this.router.navigate(['costs']);

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

}
