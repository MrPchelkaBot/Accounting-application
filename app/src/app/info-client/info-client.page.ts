import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClientService } from '../services/client.service';
import { IClient, TypeClient } from '../models/IClient';
import { AlertController } from '@ionic/angular';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-info-client',
  templateUrl: './info-client.page.html',
  styleUrls: ['./info-client.page.scss'],
})
export class InfoClientPage implements OnInit {

  infoForm: FormGroup = new FormGroup({
    'name': new FormControl('', Validators.required),
    'type': new FormControl('', Validators.required),
    'city': new FormControl('', Validators.required),
    'address': new FormControl('', Validators.required),
    'phone': new FormControl('', Validators.required),
    'email': new FormControl('', Validators.required),
    'contact': new FormControl('', Validators.required)
  });

  types = [
    { value: TypeClient.магазин, title: 'магазин' },
    { value: TypeClient.ателье, title: 'ателье' },
    { value: TypeClient.производитель, title: 'производитель' },
    { value: TypeClient.дизайнер, title: 'дизайнер' }
  ];

  private id: number;

  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService,
    private alertController: AlertController,
    private loadingService: LoadingService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(p => {
      let client: IClient;
      this.id = +p.get('id');
      this.clientService.getbyId(+p.get('id')).then(async (v: any) => {
        client = JSON.parse(v.data) as IClient;

        this.setValueForm('name', client.name);
        this.setValueForm('type', client.type);
        this.setValueForm('city', client.city);
        this.setValueForm('address', client.address);
        this.setValueForm('phone', client.phone);
        this.setValueForm('email', client.email);
        this.setValueForm('contact', client.contact);
      }).catch(async (err: any) => {
        let alert = await this.alertController.create({
          header: 'Загрузка клиента',
          message: err.error,
          buttons: ['V']
        });
        await alert.present();
        this.router.navigate(['clients']);
      })
    })
  }

  setValueForm = (control: string, value: any) => this.infoForm.get(control).setValue(value);

  async save() {
    await this.loadingService.present('Обновление данных');

    let data: IClient = {
      id: this.id,
      name: this.infoForm.get('name').value,
      type: +this.infoForm.get('type').value as TypeClient,
      city: this.infoForm.get('city').value,
      address: this.infoForm.get('address').value,
      phone: this.infoForm.get('phone').value,
      email: this.infoForm.get('email').value,
      contact: this.infoForm.get('contact').value
    };

    this.clientService.update(data).then(async (res: any) => {
      await this.loadingService.dismiss();
      this.router.navigate(['clients']);
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

}
