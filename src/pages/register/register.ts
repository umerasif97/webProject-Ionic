import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { User } from '../user';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';



@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  providers: [AngularFireAuth]
})
export class RegisterPage {

  public user:User  = new User();
  dbUser: AngularFireList<any>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public fAuth: AngularFireAuth,
              public alertCtrl: AlertController,
              public db: AngularFireDatabase){
                this.dbUser = db.list('/users');
  }

  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

  cancel(){
    this.navCtrl.pop();
  }

  async register() {
    try {
      var r = await this.fAuth.auth.createUserWithEmailAndPassword(
        this.user.email,
        this.user.password
      );
      if (r) {
        let basicAlert = this.alertCtrl.create({
          title: 'Successfully registered!',
          buttons: ['OK']
        });
        basicAlert.present();
        this.dbUser.push({
          id: firebase.auth().currentUser.uid,
          email: this.user.email,
          name: this.user.name,
          address: this.user.address,
          phoneNumber: this.user.phoneNumber
        })
        this.user.email = '';
        this.user.password = '';
        this.user.name = '';
        this.user.phoneNumber = null;
        this.user.address = '';
        this.navCtrl.pop();
      }

    } catch (err) {
      let basicAlert = this.alertCtrl.create({
        title: err,
        buttons: ['OK']
      });
      basicAlert.present();
    }
  }
}