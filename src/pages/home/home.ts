import { Component } from '@angular/core';
import { Modal,NavController } from 'ionic-angular';
import { AddPage } from '../add/add';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 items = [
    'Pokémon Yellow',
    'Super Metroid',
    'Mega Man X',
    'The Legend of Zelda',
    'Pac-Man',
    'Super Mario World',
    'Street Fighter II',
    'Half Life',
    'Final Fantasy VII',
    'Star Fox',
    'Tetris',
    'Donkey Kong III',
    'GoldenEye 007',
    'Doom',
    'Fallout',
    'GTA',
    'Halo'
 ];
    itemSelected(item: string) {
    console.log("Selected Item", item);
    }
    add() {
       this.navCtrl.push(AddPage);
  }
  constructor(public navCtrl: NavController) {

  }

}
