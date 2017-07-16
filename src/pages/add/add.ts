import { Component } from '@angular/core';
import { NavController,Platform,AlertController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../../providers/database/database';
import { HomePage } from '../home/home';
@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
  providers: [DatabaseProvider]
})
export class AddPage {
  customers = {
    fullname: '',
    mobile: ''
  };
  db: SQLiteObject;  
  constructor(
    public navCtrl: NavController,
    private DatabaseProvider: DatabaseProvider,
    private platform: Platform,    
    public alertCtrl: AlertController,
  ) {
    this.platform.ready().then(()=>{

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
validate(){
  if (this.customers.fullname != '')
      {
        if (this.customers.mobile != '')
            { 
                 this.DatabaseProvider.createCustomer(this.customers.fullname, this.customers.mobile).then((result) => {
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
  
}
