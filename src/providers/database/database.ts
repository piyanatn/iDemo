import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

   private isOpen: boolean;
   private db:SQLiteObject
 
   public constructor(
  private storage: SQLite,
    ) {
    //console.log('Hello DatabaseProvider Provider');
 if(!this.isOpen) {
            

    
            this.storage.create({name: 'data.db', location: 'default'}).then(() => {
                this.db.executeSql('create table if exist customers(fullname VARCHAR(50),mobile VARCHAR(50))', []);
                this.isOpen = true;
            });
        }
  }

   public createCustomer(fullname: string, mobile: string) {
        return new Promise((resolve, reject) => {
            
            this.db.executeSql("insert into customers(fullname,mobile) value (?,?)", [fullname, mobile]).then((data) => {
                resolve(data);
            }, (error) => {
                reject(error);
            });
        });
    }

    public getCustomer() {
        return new Promise((resolve, reject) => {
            this.db.executeSql("SELECT * FROM customer", []).then((data) => {
                let customers = [];
                if(data.rows.length > 0) {
                    for(let i = 0; i < data.rows.length; i++) {
                        customers.push({
                            id: data.rows.item(i).id,
                            firstname: data.rows.item(i).fullname,
                            lastname: data.rows.item(i).mobile
                        });
                    }
                }
                resolve(customers);
            }, (error) => {
                reject(error);
            });
        });
    }
 


}
