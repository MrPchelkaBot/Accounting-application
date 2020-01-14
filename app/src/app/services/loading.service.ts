import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loading: HTMLIonLoadingElement;

  constructor(
    private loadingCtr: LoadingController
  ) { }

  async present(message: string) {
    this.loading = await this.loadingCtr.create({
      message
    });
    await this.loading.present();
  }

  async dismiss() {
    await this.loading.dismiss();
  }

}
