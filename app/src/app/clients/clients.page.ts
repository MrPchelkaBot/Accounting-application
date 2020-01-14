import { Component, OnInit } from '@angular/core';
import { IClient } from '../models/IClient';
import { ClientService } from '../services/client.service';
import { Router } from '@angular/router';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.page.html',
  styleUrls: ['./clients.page.scss'],
})
export class ClientsPage implements OnInit {

  clients: IClient[] = [];

  constructor(private clientService: ClientService, private router: Router, private loadingService: LoadingService) { }

  ngOnInit() {
  }

  async ionViewDidEnter() {
    await this.loadingService.present('Загрузка данных');
    this.clientService.all().then(async (v: any) => {
      this.clients = <IClient[]>JSON.parse(v.data)
      await this.loadingService.dismiss();
    }).catch(async () => await this.loadingService.dismiss());
  }

  edit(id: number) {
    this.router.navigate([`info-client/${id}`])
  }

}
