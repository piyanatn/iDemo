import { Component } from '@angular/core';
import { NavController, NavParams,Platform,AlertController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../../providers/database/database';
import { HomePage } from '../home/home';
/**
 * Generated class for the EditPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
  providers: [DatabaseProvider]
})
export class EditPage {
  customers = {
    id: 0,
    fullname: '',
    mobile: ''
  };
  public id: number;
  public itemLists: Array<Object>; 
  db: SQLiteObject;  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private DatabaseProvider: DatabaseProvider,
    private platform: Platform,        
    public alertCtrl: AlertController,
  ) {
      this.id = navParams.get("id");
      this.platform.ready().then(()=>{
        this.load();
    })
  }
public showConfirmsave() {
    let confirm = this.alertCtrl.create({
      title: 'ยืนยันการบันทึก',
      message: 'คุณต้องการบันทึกใช่หรือไม่',
      buttons: [
        {
          text: 'ใช่',
          handler: () => {
              console.log('Yes clicked');
              this.validate();  
          }
        },
        {
          text: 'ไม่ใช่',
          handler: () => {
            console.log('No clicked');
          }
        }
      ]
    });
    confirm.present();
}
public showConfirmdelete() {
    let confirm = this.alertCtrl.create({
      title: 'ยืนยันการลบ',
      message: 'คุณต้องการลบใช่หรือไม่',
      buttons: [
        {
          text: 'ใช่',
          handler: () => {
              console.log('Yes clicked');
              this.delete();  
          }
        },
        {
          text: 'ไม่ใช่',
          handler: () => {
            console.log('No clicked');
          }
        }
      ]
    });
    confirm.present();
  }    
    public load() {
        this.DatabaseProvider.getCustomerbyID(this.id).then((rows:any) => {
            
            this.itemLists = [];
                if(rows.length > 0) {
                    for (let i = 0; i < rows.length; i++) {
                        
                        this.customers = {
                            id: rows.item(i).id,
                            fullname: rows.item(i).fullname,
                            mobile: rows.item(i).mobile
                        };
                        
                      /*  this.itemLists.push({
                            id : rows.item(i).id,
                            fullname: rows.item(i).fullname,
                            mobile:  rows.item(i).mobile
                        });*/
                        console.log(rows.item(i).fullname);
                    }
                }
        }, (error) => {
            console.log("ERROR: ", error);
        });
    }
    validate() {
      
  if (this.customers.fullname != '')
      {
        if (this.customers.mobile != '')
        { 
            
                 this.DatabaseProvider.updateCustomer(this.customers.fullname, this.customers.mobile,this.customers.id).then((result) => {
                this.navCtrl.push(HomePage);
                }, (error) => {
                console.log("ERROR: ", error);
                });
          }else{
              alert('เบอร์ต้องไม่เป็นค่าว่าง');
          } 
      }else{
        alert('ชื่อต้องไม่เป็นค่าว่าง');            
       } 
  }  
delete() { 
    this.DatabaseProvider.deleteCustomer(this.id).then((result) => {
             this.navCtrl.push(HomePage);
                }, (error) => {
                console.log("ERROR: ", error);
                }); 
    }
}
