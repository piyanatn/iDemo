import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { ViewChild } from '@angular/core';
import { List } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';


import { AddPage } from '../pages/add/add';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  @ViewChild(List) list: List;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private sqlite: SQLite) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      
this.sqlite.create({
  name: 'data.db',
  location: 'default'
})
  .then((db: SQLiteObject) => {


    db.executeSql('create table if exist customers(fullname VARCHAR(50),mobile VARCHAR(50))', {})
      .then(() => console.log('Executed SQL'))
      .catch(e => console.log(e));


  })
  .catch(e => console.log(e));
  
    });
  }
   
}
