import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Http, Response,RequestOptions,Headers} from '@angular/http';

export type InternalStateType = {
  [key: string]: any
};

@Injectable()
export class AppState {
  _state: InternalStateType = { };
  cart:any;
  nameChange: Subject<string> = new Subject<string>();

  constructor(private http:Http) {

    let ls:any = localStorage.getItem("cart");
if(ls == null){

  this.cart=0;

}else{
  ls = JSON.parse(ls);
  this.cart = ls.length;
  
}

  }

  getLocationInfo(){

    return this.http.get('http://ipinfo.io/json')
               .map(response => response.json());

  }

  // already return a clone of the current state
  get state() {
    return this._state = this._clone(this._state);
  }
  // never allow mutation
  set state(value) {
    throw new Error('do not mutate the `.state` directly');
  }


  get(prop?: any) {
    // use our state getter for the clone
    const state = this.state;
    return state.hasOwnProperty(prop) ? state[prop] : state;
  }

  set(prop: string, value: any) {
    // internally mutate our state
    return this._state[prop] = value;
  }
setCart(){
this.cart = this.cart+1;
this.nameChange.next(this.cart);

console.log("set set");
}

downCart(){
  this.cart = this.cart-1;
this.nameChange.next(this.cart);
}

getcart(){
  return this.cart;
}




  private _clone(object: InternalStateType) {
    // simple object clone
    return JSON.parse(JSON.stringify( object ));
  }
}
