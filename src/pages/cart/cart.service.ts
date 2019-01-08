import { Injectable } from "@angular/core";
import { AlertController } from "ionic-angular";

@Injectable()
export class CartService {
    cart = [];
    sum;

    constructor(public alertCtrl: AlertController){

    }
    
    getCart() {
        if (this.cart.length == 0) {
            this.cart = JSON.parse(localStorage.getItem('cart')) || [];
            this.sum = JSON.parse(localStorage.getItem('totalBill')) || 0;
        }
        return this.cart;
    }

    total() {
        let sum = 0;
        for (let a = 0; a < this.cart.length; a++) {
            for (let k = 0; k < this.cart[a].dishes.length; k++) {
                let product = this.cart[a].dishes[k]
                sum += product.dishQuantity * product.dishPrice;
            }
            this.cart[a].totalPrice = sum;
            sum = 0;  
        }
        return sum;
    }

    totalBill() {
        this.sum = 0;
        for (let a = 0; a < this.cart.length; a++) {
                let product = this.cart[a]
                this.sum += product.totalPrice;
            }
            localStorage.setItem('totalBill', JSON.stringify(this.sum));
        return this.sum;
    }

    increaseQty(resturantId, dishId) {
        let count = 0;
        for (let b = 0; b < this.cart.length; b++) {
            if (this.cart[b].resturantId == resturantId) {
                for (let c = 0; c < this.cart[b].dishes.length; c++) {
                    if (this.cart[b].dishes[c].dishId == dishId) {
                        let inc = this.cart[b].dishes[c]
                        count = inc.dishQuantity++;
                    }
                }
                this.cart[b].dishQuantity = count;
                count = 0;
            }
            this.total();
            this.totalBill();
            localStorage.setItem('cart', JSON.stringify(this.cart));
        }
        return count;
    }

    decreaseQty(resturantId, dishId) {
        let count = 0;
        for (let b = 0; b < this.cart.length; b++) {
            if (this.cart[b].resturantId == resturantId) {
                for (let c = 0; c < this.cart[b].dishes.length; c++) {
                    if (this.cart[b].dishes[c].dishId == dishId) {
                        let inc = this.cart[b].dishes[c]
                        if (inc.dishQuantity > 1) {
                            count = inc.dishQuantity--;
                        }
                    }
                }
                this.cart[b].dishQuantity = count;
                count = 0;
            }
            this.total();
            this.totalBill();
            localStorage.setItem('cart', JSON.stringify(this.cart));
        }
        return count;
    }

    addItem(resturantId, resturantName, dishId, dishName, dishPrice, dishQuantity, totalPrice) {
        //checks whether this is first time?
        if (this.cart.length > 0) {
            let resturantIndex = (this.cart).findIndex(i => i.resturantId == resturantId)
            //for checking dish of same resturant
            if (resturantIndex > -1) {
                //finding index of the dish if present
                let dishIndex = (this.cart[resturantIndex].dishes).findIndex(j => j.dishId == dishId)
                if (dishIndex > -1) {
                    this.cart[resturantIndex].dishes[dishIndex].dishQuantity += dishQuantity
                } else {
                    this.cart[resturantIndex].dishes.push({
                        dishId: dishId,
                        dishName: dishName,
                        dishPrice: dishPrice,
                        dishQuantity: dishQuantity
                    })

                }
                //if no item of same resturant is available
            } else {
                this.cart.push({
                    resturantId: resturantId,
                    resturantName: resturantName,
                    dishes: [{
                        dishId: dishId,
                        dishName: dishName,
                        dishPrice: dishPrice,
                        dishQuantity: dishQuantity
                    }],
                    totalPrice: 0
                });
            }
            //for first time
        } else {
                this.cart.push({
                resturantId: resturantId,
                resturantName: resturantName,
                dishes: [{
                    dishId: dishId,
                    dishName: dishName,
                    dishPrice: dishPrice,
                    dishQuantity: dishQuantity
                }],
                totalPrice: 0
            });
            //console.log(this.cart);
        }
        this.total();
        this.totalBill();
        localStorage.setItem('cart', JSON.stringify(this.cart));
        let alert = this.alertCtrl.create({
            title: 'Added to Cart',
            buttons: ['OK']
          });
          alert.present();
        return this.cart;
    }

    removeItem(resturantId, dishId) {
        for (let b = 0; b < this.cart.length; b++) {
            if (this.cart[b].resturantId == resturantId) {
                let removeDish = (this.cart[b].dishes).findIndex(y => y.dishId == dishId)
                // for (let c = 0; c < this.cart[b].dishes.length; c++) {
                //     if (this.cart[b].dishes[c].dishId == dishId) {
                if (this.cart[b].dishes.length > 1) {
                    this.cart[b].dishes.splice(removeDish, 1);
                } else {
                    this.cart.splice(b, 1);
                }
            }
            this.total();
            this.totalBill();
            localStorage.setItem('cart', JSON.stringify(this.cart));
        }
    }

    removeResturant(resturantId) {
        for (let b = 0; b < this.cart.length; b++) {
            if (this.cart[b].resturantId == resturantId) {
                this.cart.splice(b, 1);
            }
            this.totalBill();
            localStorage.setItem('cart', JSON.stringify(this.cart));
        }
    }
}