import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { RegisterPage } from '../pages/register/register';
import { LoginPage } from '../pages/login/login';
import { RestaurantsPage } from '../pages/restaurants/restaurants';
import { MenusPage } from '../pages/menus/menus';
import { CartPage } from '../pages/cart/cart';
import { CheckoutPage } from '../pages/checkout/checkout';

var config = {
  apiKey: "AIzaSyBdtYlaHYNjxqrWz_ckQXW8e9G7_o0rEcM",
  authDomain: "order-da4b9.firebaseapp.com",
  databaseURL: "https://order-da4b9.firebaseio.com",
  projectId: "order-da4b9",
  storageBucket: "order-da4b9.appspot.com",
  messagingSenderId: "486609275362"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RegisterPage,
    LoginPage,
    RestaurantsPage,
    MenusPage,
    CartPage,
    CheckoutPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RegisterPage,
    LoginPage,
    RestaurantsPage,
    MenusPage,
    CartPage,
    CheckoutPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
