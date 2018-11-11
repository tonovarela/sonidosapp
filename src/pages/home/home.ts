import { Animal } from './../../interfaces/animal.interface';
import { Component } from '@angular/core';
import { NavController, Refresher, reorderArray } from 'ionic-angular';
import { ANIMALES } from '../../app/data/data.animales';
 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
animales: Animal[] = [];
audio = new Audio();
audioTiempo: any;
ordenando: boolean =false;

  constructor(public navCtrl: NavController) {
    this.animales = ANIMALES.slice(0);
    
  }
  reproducir(animal: Animal){
    
    this.audio.src = animal.audio;
    this.audio.load();
    this.audio.play();
     animal.reproduciendo = true;
     for (let animalx of this.animales) {
      if (animalx.nombre != animal.nombre){
           animalx.reproduciendo = false;
       }
      } 
  
    this.audioTiempo = setTimeout(() => animal.reproduciendo = false,animal.duracion * 1000);
     console.log(animal);
  }

   pausarAudio(animalSeleccionado: Animal) {

    this.audio.pause();
    this.audio.currentTime = 0;
    clearTimeout(this.audioTiempo);
    animalSeleccionado.reproduciendo =false;

   
  }

  borrarAnimal(idx: number) {
    this.animales.splice(idx,1);


  }

  recargarAnimales(refresher: Refresher) {
    console.log("inicio del Refresh");
    setTimeout(() => {
      console.log("termino");
      this.animales = ANIMALES.slice(0);
      refresher.complete();
    }
    ,1500);
    
  }

  reordenarAnimales(indices: any) {
    console.log(indices);
    this.animales = reorderArray(this.animales, indices);
  }
}
