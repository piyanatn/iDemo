import { Component } from '@angular/core';
import { Modal,NavController ,Platform} from 'ionic-angular';
import { AddPage } from '../add/add';
import { DatabaseProvider } from '../../providers/database/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 public itemLists: Array<Object>; 
 items = [
    'Pokémon Yellow',
    'Super Metroid',
 ];
    itemSelected(item: string) {
    console.log("Selected Item", item);
    }
    add() {
       this.navCtrl.push(AddPage);
  }
  constructor(
    public navCtrl: NavController,
    private DatabaseProvider: DatabaseProvider,
    private platform: Platform,    
  ) {
    this.itemLists = [];
     this.platform.ready().then(()=>{
          //  this.load();
    })
  }

   // public onPageDidEnter() {
   //     this.load();
   // }
 
    public load() {
        alert('Load');
        this.DatabaseProvider.getCustomer().then((result) => {
            this.itemLists = <Array<Object>> result;
        }, (error) => {
            console.log("ERROR: ", error);
        });
    }
 
   

}
