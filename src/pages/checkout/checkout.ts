import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { CartService } from '../cart/cart.service';
import * as firebase from 'firebase/app';
import { RestaurantsPage } from '../restaurants/restaurants';

/**
 * Generated class for the CheckoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
  providers: [CartService]
})
export class CheckoutPage {

  cart;
  totalCartBill;
  scart: AngularFireList<any>;
  user;
  id;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private cartService: CartService,
    public db: AngularFireDatabase,
    public alertCtrl: AlertController) {
    this.cart = this.cartService.getCart();
    this.totalCartBill = this.cartService.totalBill();
    this.scart = db.list('/cart');
    this.id = firebase.auth().currentUser.uid;
    console.log(this.cart);
    this.getUser();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutPage');
  }

  getUser() {
    firebase.database().ref('/users').orderByChild('id').equalTo(this.id).on('value', (snapshot) => {
      console.log(snapshot.val());
      let filter;
      filter = (snapshot.val());
      for (var id in filter) {
        filter[id]['key'] = id;
        this.user = filter[id]
      }
      console.log(this.user);
    });
  }

  checkOut() {
    this.scart.push({
      orderName: this.user['name'],
      orderPhoneNumber: this.user['phoneNumber'],
      orderAddress: this.user['address'],
      totalBill: this.totalCartBill,
      order: this.cart
    });
    let alert = this.alertCtrl.create({
      title: 'Order has been placed',
      buttons: ['OK']
    });
    alert.present();
    this.cart = [];
    this.totalCartBill = 0;
    localStorage.setItem('cart', JSON.stringify(this.cart));
    localStorage.setItem('totalBill', JSON.stringify(this.totalCartBill));
    this.navCtrl.push(RestaurantsPage);
  }

  cancel(){
    this.navCtrl.pop();
  }

}
