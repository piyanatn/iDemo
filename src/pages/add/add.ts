import { Component } from '@angular/core';
import { NavController,Platform } from 'ionic-angular';
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
  ) {
    this.platform.ready().then(()=>{

    })
  }

 public create(fullname: string, mobile: string) {
        this.DatabaseProvider.createCustomer(fullname, mobile).then((result) => {
            this.navCtrl.push(HomePage);
        }, (error) => {
            console.log("ERROR: ", error);
        });
    }
validate(){
  if (this.customers.fullname != '')
      {
    if (this.customers.mobile != '')
      { 

    //('insert into customers(fullname,mobile) value ('+ this.customers.fullname + ','+ this.customers.mobile + ')', {})
     // .then(() => console.log('Executed SQL'))
    //  .catch(e => console.log(e));
 
          this.create(this.customers.fullname, this.customers.mobile);
          //this.create();
      }else{
          alert('เบอร์ต้องไม่เป็นค่าว่าง');
      } 
  }else{
    alert('ชื่อต้องไม่เป็นค่าว่าง');
  } 

}
save(){

}

}
