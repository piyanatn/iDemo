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
   private db: SQLiteObject;
   public constructor(
  private storage: SQLite,
    ) {
    //console.log('Hello DatabaseProvider Provider');
 if(!this.isOpen) {
            

      console.log('open sqlite');
      this.storage.create({ name: 'data.db', location: 'default' }).then((db: SQLiteObject) => {
                //db.executeSql('Drop TABLE customers', []);
                db.executeSql('CREATE TABLE IF NOT EXISTS customers(id INTEGER PRIMARY KEY AUTOINCREMENT,fullname VARCHAR(50),mobile VARCHAR(50))', []);
                this.isOpen = true;
                this.db = db;     
            });
        }
  }

   public createCustomer(fullname: string, mobile: string) {
        return new Promise((resolve, reject) => {
            console.log('create');
            this.storage.create({ name: 'data.db', location: 'default' }).then((db: SQLiteObject) => {
                this.db.executeSql("insert into customers(fullname,mobile) values (?,?)", [fullname, mobile]).then((data) => {
                    resolve(data);
                }, (error) => {
                    reject(error);
                });
            });     
        });
    }
   public updateCustomer(fullname: string, mobile: string,id: number) {
        return new Promise((resolve, reject) => {
            console.log('update');
            this.storage.create({ name: 'data.db', location: 'default' }).then((db: SQLiteObject) => {
                this.db.executeSql("update customers set fullname=?,mobile=? where id = ?", [fullname, mobile,id]).then((data) => {
                    resolve(data);
                }, (error) => {
                    reject(error);
                });
            });     
        });
   }
   public deleteCustomer(id: number) {
        return new Promise((resolve, reject) => {
            console.log('delete');
            this.storage.create({ name: 'data.db', location: 'default' }).then((db: SQLiteObject) => {
                this.db.executeSql("delete from customers where id = ?", [id]).then((data) => {
                    resolve(data);
                }, (error) => {
                    reject(error);
                });
            });     
        });
   }    
   public getCustomerbyID(id : number) {
       console.log('Query SQLite');
       return new Promise((resolve, reject) => {
              this.storage.create({ name: 'data.db', location: 'default' }).then((db: SQLiteObject) => {
            this.db.executeSql("SELECT * FROM customers where id = ?", [id]).then((data) => {              
                resolve(data.rows);
            }, (error) => {
                reject(error);
                      });
              });      
        });
    }    
   public getCustomer() {
       console.log('Load SQLite');

       return new Promise((resolve, reject) => {
           this.storage.create({ name: 'data.db', location: 'default' }).then((db: SQLiteObject) => {
               this.db.executeSql("SELECT * FROM customers", []).then((data) => {
                   resolve(data.rows);
               }, (error) => {
                   reject(error);
               });
           });
        });
    }
 


}
