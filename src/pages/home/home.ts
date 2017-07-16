import { Component } from '@angular/core';
import { NavController ,Platform} from 'ionic-angular';
import { AddPage } from '../add/add';
import { EditPage } from '../edit/edit';
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

  constructor(
    public navCtrl: NavController,
    private DatabaseProvider: DatabaseProvider,
    private platform: Platform, 
    
  ) {
    this.itemLists = [];
     this.platform.ready().then(()=>{
            this.load();
    })
  }

    public itemSelected(itemID: string) {
    //console.log("Selected Item", itemID);
        this.navCtrl.push(EditPage, {
            id: itemID
        });     
    }
    public add() {
       this.navCtrl.push(AddPage);
  }
    public load() {
        this.DatabaseProvider.getCustomer().then((rows:any) => {
            
            this.itemLists = [];
                if(rows.length > 0) {
                    for(let i = 0; i < rows.length; i++) {
                        this.itemLists.push({
                            id : rows.item(i).id,
                            fullname: rows.item(i).fullname,
                            mobile:  rows.item(i).mobile
                        });
                        console.log(rows.item(i).fullname);
                    }
                }
        }, (error) => {
            console.log("ERROR: ", error);
        });
    }
 
   

}
