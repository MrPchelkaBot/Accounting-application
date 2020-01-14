import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClientService } from '../services/client.service';
import { IClient, TypeClient } from '../models/IClient';
import { AlertController } from '@ionic/angular';
import { LoadingService } from '../services/loading.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.page.html',
  styleUrls: ['./add-client.page.scss'],
})
export class AddClientPage implements OnInit {

  addForm: FormGroup = new FormGroup({
    'name': new FormControl('', Validators.required),
    'type': new FormControl(TypeClient.магазин, Validators.required),
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

  constructor(
    private clientService: ClientService,
    private alertController: AlertController,
    private loadingService: LoadingService,
    private router: Router) { }

  ngOnInit() {
  }

  async add() {
    await this.loadingService.present('Добавление...')
    let data: IClient = {
      name: this.addForm.get('name').value,
      type: +this.addForm.get('type').value as TypeClient,
      city: this.addForm.get('city').value,
      address: this.addForm.get('address').value,
      phone: this.addForm.get('phone').value,
      email: this.addForm.get('email').value,
      contact: this.addForm.get('contact').value
    };


    this.clientService.add(data).then(async (res: any) => {
      await this.loadingService.dismiss();
      this.router.navigate(['clients']);

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
