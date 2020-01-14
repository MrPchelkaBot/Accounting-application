import { Component, OnInit } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Router } from '@angular/router';
import { HTTPWrap } from '../wrappers/HTTPWrap';
import { HTTP } from '@ionic-native/http/ngx';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage extends HTTPWrap implements OnInit {
  
  statistic: any[] = [];
  total: number = 0;

  ngOnInit() {
  }

  async ionViewDidEnter() {
    this.total = 0;
    let isRemember = await this.nativeStorage.getItem('remember').then((data: boolean) => data).catch(() => false);
    if (!isRemember) { }

    await this.loadingService.present('Загрузка статистики');
    this.statistic = await this.getHTTP('Home/Statistik').then((v: any) => JSON.parse(v.data));
    if (this.statistic.length > 0) {
      this.statistic.forEach(v => {
        this.total += +v.balance;
      });
    }
    await this.loadingService.dismiss();

  }

  constructor(
    protected http: HTTP,
    protected nativeStorage: NativeStorage,
    private loadingService: LoadingService
  ) { super(http, nativeStorage); }



}
