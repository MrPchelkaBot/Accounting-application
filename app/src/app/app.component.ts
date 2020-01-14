import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  navigate: any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
    this.sideMenu();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  sideMenu()
  {
    this.navigate =
    [
      {
        title: 'Статистика',
        url: '/home',
        icon: 'home'
      },
      {
        title: 'Клиенты',
        url: '/clients',
        icon: ''
      },
      {
        title: 'Заказы',
        url: '/orders',
        icon: ''
      },
      {
        title: 'Расходы',
        url: '/costs',
        icon: ''
      },
      {
        title: 'Доходы',
        url: '/income',
        icon: ''
      }
    ]
  }
}
