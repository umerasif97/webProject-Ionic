import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestaurantsPage } from '../restaurants/restaurants';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { CartService } from './cart.service';
import * as firebase from 'firebase/app';
import { CheckoutPage } from '../checkout/checkout';

/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
  providers: [CartService]
})
export class CartPage {

  cart;
  totalCartBill;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private cartService: CartService,
              public db: AngularFireDatabase) {
                this.cart = this.cartService.getCart();
                console.log(this.cart);
                this.totalCartBill = this.cartService.totalBill();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
  }

  menu() {
    this.navCtrl.push(RestaurantsPage);
  }

 

  checkOut() {
    this.navCtrl.push(CheckoutPage);
  }

  increase(resturantId, dishId) {
    this.cartService.increaseQty(resturantId, dishId);
    this.totalCartBill = this.cartService.totalBill();
    //console.log(resturantId, dishId);
  }
  decrease(resturantId, dishId) {
    this.cartService.decreaseQty(resturantId, dishId);
    this.totalCartBill = this.cartService.totalBill();
  }

  removeDishFromCart(resturantId, dishId) {
    this.cartService.removeItem(resturantId, dishId);
    this.totalCartBill = this.cartService.totalBill();
  }

  removeResturantFromCart(resturantId) {
    this.cartService.removeResturant(resturantId);
    this.totalCartBill = this.cartService.totalBill();
    //console.log(resturantId);
  }

}