import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MenusService } from './menus.service';
import { CartService } from '../cart/cart.service';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { CartPage } from '../cart/cart';
import * as firebase from 'firebase/app';

/**
 * Generated class for the MenusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menus',
  templateUrl: 'menus.html',
  providers: [MenusService, CartService]
})
export class MenusPage {

  id;
  private sub;
  menus;
  allMenus;
  menu;
  mcart;
  scart: AngularFireList<any>;
  totalCartBill;
  abc;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private menuService: MenusService,
    private cartService: CartService,
    public db: AngularFireDatabase) {
    this.sub = this.navParams.get('id');
    //console.log(this.sub)
    
    //this.getMenu();
    //console.log(this.menus);
    this.scart = db.list('/cart');
    console.log(this.sub)
    this.menus = this.menuService.getMenuByResturantId(this.sub);
    console.log(this.menus)
    this.mcart = this.cartService.getCart();
    //this.rName = this.resturantService.getResturantByResturantId(this.sub);
    //console.log(this.rName); 
    this.totalCartBill = this.cartService.totalBill();
  }

  ionViewDidLoad() {
    
    //console.log('ionViewDidLoad MenusPage');
  }
  ionViewWillEnter() {
  }

  back() {
    this.navCtrl.pop();
  }

  cart() {
    this.navCtrl.push(CartPage);
  }

  addToCart(resturantId, resturantName, dishId, dishName, dishPrice, dishQuantity, totalPrice) {
    this.cartService.addItem(resturantId, resturantName, dishId, dishName, dishPrice, dishQuantity, totalPrice);
    this.totalCartBill = this.cartService.totalBill();
    //console.log(dishQuantity);
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