import { ChangePage } from './../pages/change/change';
import { EditUserPage } from './../pages/edit-user/edit-user';
import { ProfilePage } from './../pages/profile/profile';
import { LoginPage } from './../pages/login/login';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { UserHttpProvider } from '../providers/user-http/user-http';
import { HttpClientModule } from '@angular/common/http';
import { HeaderMenuComponent } from '../components/header-menu/header-menu';
import { UserProvider } from '../providers/user/user';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SignUpPage,
    DashboardPage,
    HeaderMenuComponent,
    ProfilePage,
    EditUserPage,
    ChangePage
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SignUpPage,
    DashboardPage,
    ProfilePage,
    EditUserPage,
    ChangePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserHttpProvider,
    UserProvider
  ]
})
export class AppModule {}
