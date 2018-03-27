import { Component } from '@angular/core';
const PEOPLE = [
  {
   
    'name': 'Hindustan Uniliver',
    'category':'A,B,C'
    
  },
  {
   
    'name': 'Dabar',
    'category':'A,B,D'
    
  }
  
];
@Component({
  selector: 'home',
  templateUrl: './home.template.html',
  styleUrls:['./home.style.scss']
})
export class Home {
  data: any[] = PEOPLE;

}
