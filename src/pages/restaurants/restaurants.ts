import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { CartPage } from '../cart/cart';
import { MenusPage } from '../menus/menus';

/**
 * Generated class for the RestaurantsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-restaurants',
  templateUrl: 'restaurants.html',
  providers: [AngularFireDatabase]
})
export class RestaurantsPage {

  resturants;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public db: AngularFireDatabase) {
                this.db.list('/resturant').valueChanges().subscribe((datas) => { 
                  //console.log("datas", datas);
                  this.resturants = datas;
                  //console.log(this.resturants);
                },(err)=>{
                   console.log("probleme : ", err)
                });
  }

  ionViewDidLoad() {
    
    //this.resturants = this.resturantsService.getAll();
    //console.log(this.resturants);
    //console.log('ionViewDidLoad ResturantsPage');
  }

  cart() {
    this.navCtrl.push(CartPage);
  }

  showMenu(id){
    this.navCtrl.push(MenusPage, {id});
    //console.log(id);
  }
}