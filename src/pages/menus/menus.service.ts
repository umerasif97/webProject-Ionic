import * as firebase from 'firebase/app';
import { Injectable } from "@angular/core";
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MenusService {


    allMenus;
    menu;
    menus;
    Item;

    constructor(private db: AngularFireDatabase) {
        // this.db.list('/menus').valueChanges().subscribe(datas => {
        //     console.log("datas", datas);
        //     this.allMenus = datas;
        //   }, (err) => {
        //     console.log("probleme : ", err)
        //   });
        let self = this;
        self.menu = firebase.database().ref('/menus').on('value', function (snapshot) {
          self.allMenus = snapshot.val();
          console.log(self.allMenus);
        });
    }


    getMenuByResturantId(Id) {
        console.log(this.allMenus);
            for (var id in this.allMenus) {
                if (Id == this.allMenus[id].resturantId) {
                    this.menus = this.allMenus[id];
                    console.log(this.allMenus[id]);
                }
            }
            return this.menus;
    }
}