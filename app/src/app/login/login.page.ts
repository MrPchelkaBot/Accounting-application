import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { LoadingService } from '../services/loading.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private authService: AuthService,
    private loadingService: LoadingService,
    private nativeStorage: NativeStorage,
    private alertController: AlertController,
    private router: Router
  ) { }

  loginForm: FormGroup = new FormGroup({

    'login': new FormControl('', Validators.required),
    'password': new FormControl('', Validators.required),
    'remember': new FormControl()
  });

  ngOnInit() {
  }

  async login() {
    let data = {
      UserName: this.loginForm.get('login').value,
      Password: this.loginForm.get('password').value
    };

    if (this.loginForm.get('remember').value)
      await this.nativeStorage.setItem('remember', true);
    else 
      await this.nativeStorage.setItem('remember', false); 

    await this.loadingService.present('Авторизация');
    this.authService.logIn(data).then(
      async (v: any) => {
        await this.authService.setToken(v.data);
        await this.loadingService.dismiss();
        this.router.navigate(['/']);
      }
    ).catch(
      async (err: any) => {
        await this.loadingService.dismiss();
        let alert = await this.alertController.create({
          header: 'Авторизация',
          message: err.error,
          buttons: ['V']
        });
        await alert.present();
      }
    )

    //console.log(data);
    //console.log(this.loginForm.get('remember').value);
  }

}
