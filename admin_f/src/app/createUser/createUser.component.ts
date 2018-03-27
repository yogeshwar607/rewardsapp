import { Component ,ViewEncapsulation} from '@angular/core';
import {Http, Response,RequestOptions,Headers} from '@angular/http';
import { ActivatedRoute,Router } from '@angular/router';
@Component({
  selector: 'createUser',
  styleUrls: [ './createUser.style.scss' ],
  templateUrl: './createUser.template.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'createUser'
  }
})
export class CreateUser {
    name:any;
    email:any;
    mobile_no:any;
    password:any;
   constructor(private http:Http, private route: ActivatedRoute,router:Router){
    //  this.editorContent = 'My Document\'s Description'
          

          let id = this.route.snapshot.paramMap.get('id');
   console.log(id);

}

submit(){

        let headers = new Headers();

       let options = new RequestOptions({ headers: headers });
   
    let data={
        name:this.name,
        email:this.email,
        mobile_no:this.mobile_no,
        password:this.password
    };

        this.http.post('http://localhost:4700/api/v1/user/create',data,options)
        .map(res => res.json())
        .subscribe(result =>{
           console.log('res', result)

           alert("user created");
         

        })

}

}
