import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { RegisterPage } from '../register/register';
import { RestaurantsPage } from '../restaurants/restaurants';
import { User } from '../user';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [AngularFireAuth]
})
export class LoginPage {

  public user: User = new User();
  dbUser: AngularFireList<any[]>;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public fAuth: AngularFireAuth,
    public alertCtrl: AlertController,
    public db: AngularFireDatabase) {
    this.dbUser = db.list('/users');
  }

  register() {
    this.navCtrl.push(RegisterPage);
  }

  async login() {
    try {
      var r = await this.fAuth.auth.signInWithEmailAndPassword(
        this.user.email,
        this.user.password
      );
      if (r) {
        let alert = this.alertCtrl.create({
          title: 'Successfully logged in!',
          buttons: ['OK']
        });
        //console.log("Successfully logged in!");
        alert.present();
        this.navCtrl.push(RestaurantsPage);
        //this.navCtrl.pop();
      }

    } catch (err) {
      let errAlert = this.alertCtrl.create({
        title: err,
        buttons: ['OK']
      });
      errAlert.present();
      //console.error(err);
    }
  }
}