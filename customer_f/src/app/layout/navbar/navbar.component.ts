import { Component, EventEmitter, OnInit, ElementRef, Output } from '@angular/core';
import { AppConfig } from '../../app.config';
import { AppState } from '../../app.service';
import {Http, Response,RequestOptions,Headers} from '@angular/http';
import {AuthenticationService} from '../../services/authenticate.service'
declare let jQuery: any;
// import { DatepickerOptions } from 'ng2-datepicker';

@Component({
  selector: '[navbar]',
  templateUrl: './navbar.template.html'
})
export class Navbar implements OnInit {
  @Output() toggleSidebarEvent: EventEmitter<any> = new EventEmitter();
  @Output() toggleChatEvent: EventEmitter<any> = new EventEmitter();
  $el: any;
  config: any;
  show:any='';
  showDialog = false;
  radioModel = 'login';
  cart:any;
  int:any;
  country:any;
  state:any;
  city:any;
  email:any;
  name:any;
  gender:any;
  dob:any;
  username:any;
  mobile_no:any;
  password:any;
  input:any="";
  intList:any=[];
appState:any;
data1:any;
data2:any;
data:any;
_subscription:any;
model:any;
count:any=0;
loginStatus:any=false;
interestsData:any=[];
otpR:any="";
resendOtp:any=false;
mobile_noL:any;
otpL:any
validation:any={
  name:false,
  email:false,
  pass:false,
  mobile_no:false,
  otp:false,
  dobFormat:false,
  dob:false
};
inputerror:any=false;
passerror:any=false;
model1:any;
model2:any;
// login:any=false;

wizard:any;
  constructor(el: ElementRef, config: AppConfig,appState:AppState,private http:Http,private authenticationService: AuthenticationService) {
     this.model = {
            sex: "male"
        };

        this.wizard = [{ active : true},{ active : false},{ active : false},{ active : false},{ active : false},{ active : false},{ active : false}];
    this.appState = appState;
    this.$el = jQuery(el.nativeElement);
    this.config = config.getConfig();
    console.log(this.radioModel);
    this.cart = this.appState.getcart();
    this._subscription = this.appState.nameChange.subscribe((value) => { 
        this.cart = value; 
    });
       

   this.config=appState;
   let headers = new Headers();
   let options = new RequestOptions({ headers: headers });
       this.http.get('http://localhost:4700/api/v1/brand/getAll',options)
        .map(res => res.json())
        .subscribe(result =>{
           console.log('res', result)
          this.data1 = result.data.brands;
        })
          this.http.get('http://localhost:4700/api/v1/category/getAll',options)
        .map(res => res.json())
        .subscribe(result =>{
           console.log('res', result)
          // this.intList = result.data.interests;
          this.data = result.data.category;

        })
            this.http.get('http://localhost:4700/api/v1/interest/getAll',options)
        .map(res => res.json())
        .subscribe(result =>{
           console.log('res', result)
          // this.intList = result.data.interests;
          this.interestsData = result.data.interests;

        })
        
        let ls = localStorage.getItem("currentUser");
        console.log("ls ls ",ls);
        if(ls != null){
          this.loginStatus = true;
            this.username = (JSON.parse(ls)).name;
          console.log("name",(JSON.parse(ls)).name);
        }else{
          this.loginStatus = false;
        
        }
        

  }

  showD(){
    this.showDialog = !this.showDialog;
            this.wizard = [{ active : true},{ active : false},{ active : false},{ active : false},{ active : false},{ active : false},{ active : false}];

     this.country="";
      this.state="";
     this. city="";
      this.email="";
      this.name="";
      // this.gender="";
      this.dob="";
      this.mobile_no="";
      this.password="";
      this.count =0;
    // this.state ="dsdad";
  }

  toggleSidebar(state): void {
    this.toggleSidebarEvent.emit(state);
  }

  toggleChat(): void {
    this.toggleChatEvent.emit(null);
  }
  addInt(){
    this.intList.push(this.int);
  }

  ngOnInit(): void {
    jQuery('.parsleyjs').parsley();
    

    // this.deadlineinput = {
    //     formatted: ''
    // };
    setTimeout(() => {
      let $chatNotification = jQuery('#chat-notification');
      $chatNotification.removeClass('hide').addClass('animated fadeIn')
        .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', () => {
          $chatNotification.removeClass('animated fadeIn');
          setTimeout(() => {
            $chatNotification.addClass('animated fadeOut')
              .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd' +
                ' oanimationend animationend', () => {
                $chatNotification.addClass('hide');
              });
          }, 8000);
        });
      $chatNotification.siblings('#toggle-chat')
        .append('<i class="chat-notification-sing animated bounceIn"></i>');
    }, 4000);

    this.$el.find('.input-group-addon + .form-control').on('blur focus', function(e): void {
      jQuery(this).parents('.input-group')
        [e.type === 'focus' ? 'addClass' : 'removeClass']('focus');
    });
  }

   mouseEnter(div : string){
      console.log("mouse enter : " + div);
      this.show=div;
   }

   mouseLeave(div : string){
     console.log('mouse leave :' + div);
      this.show=' ';
     
   }
    getLocationInfo(){

    return this.http.get('http://ipinfo.io/json')
               .map(response => response.json());

  }

  register(){

    let data={
      name:this.name,
      password:this.password,
      email:this.email,
      mobile_no:this.mobile_no,
      gender:this.model.sex,
      interests:this.intList,
      dob:this.dob,
      state:this.state,
      city:this.city,
      country:this.country,
      is_active:true
    };
       let headers = new Headers();
let options = new RequestOptions({ headers: headers });
      return this.http.post('http://localhost:4700/api/v1/customer/create',data,options)
        .map(res => res.json())
       
  }

  nextWizard(){
    // console.log(name,email,pass);
if(this.count == 0){
  if(this.name.length != 0 && this.email.length != 0 && this.password.length != 0){
this.count = this.count +1;
this.wizard[0].active =false;
this.wizard[1].active =true;
  }else{
    if(this.name.length == 0){
      this.validation.name = true;
    }else{
      this.validation.name = false;
      
    }
     if(this.email.length == 0){
      this.validation.email = true;
    }else{
      this.validation.email = false;
      
    }
     if(this.password.length == 0){
      this.validation.pass = true;
    }else{
      this.validation.pass = false;
      
    }

  }


  
}else{

  if(this.count == 5){

    this.register().subscribe(result =>{
           console.log('res', result);
          //  this.showDialog = !this.showDialog;
          //  alert("Registration successful");
         this.count = this.count +1;
         this.wizard[this.count -1 ].active =false;
         this.wizard[this.count].active =true;

        })


      }else if(this.count == 1){

        if(this.mobile_no.length == 0){
      this.validation.mobile_no = true;
    }else{
      this.validation.mobile_no = false;
       this.requestOtp().subscribe(result =>{

            this.count = this.count +1;
         this.wizard[this.count -1 ].active =false;
         this.wizard[this.count].active =true;
        })
      
    }
        
       

      }else if(this.count == 2){
         if(this.otpR.length == 0){
      this.validation.otp = true;
    }else{

      this.validation.otp = false;
       this.verifyOtp().subscribe(result =>{
           if(result.data.otp == false){
             alert("otp do not match");
           }else{

             this.count = this.count +1;
         this.wizard[this.count -1 ].active =false;
         this.wizard[this.count].active =true;

           }

            
        })
      
    }
        
        

        }else if(this.count == 3){
          if(this.dob.length == 0){
            this.validation.dob = true;
          }else{
            this.validation.dob = false;
            
          }
          if(this.dob.split('/')[0] > 12){
             this.validation.dobFormat = true;

          }else{
             this.validation.dobFormat = false;

          }
          if(this.validation.dobFormat == false && this.validation.dob == false){
                  this.count = this.count +1;
        this.wizard[this.count -1 ].active =false;
        this.wizard[this.count].active =true;  
              this.getLocationInfo().subscribe((r) =>{
                    console.log(r);
                    this.state = r.region;
                    this.city = r.city;
                    this.country = "India";
                  

          }
        , (error) => {
          console.log("err",error)
        }
        , () => { }
      );
          }

        }
        // else if(this.count == 4){
       
        // }
         else{

    
        this.count = this.count +1;
        this.wizard[this.count -1 ].active =false;
        this.wizard[this.count].active =true;

  }


}




}

activate(i,event){
  console.log(this.intList);
  // this.active = !this.notActive;
if(i.active == true){


jQuery(event.target).css('background-color',"white");
 i.active = false;

 this.intList.find((x,index) =>{ 
   console.log(index);
 this.intList.splice(index,1);
   
   });
//  this.intList.splice(,1);


}else{
jQuery(event.target).css('background-color',"lightgrey");
 i.active = true;
  this.intList.push(i);

}

  
  console.log(this.intList);

}

    login(model2,model1) {
        // this.loading = true;
       if(model2 == true || model1== true){
           this.inputerror = true;
           this.passerror = true;
       }else{

              console.log(this.input,this.password);
        this.authenticationService.login(this.input, this.password)
            .subscribe(result => {
              console.log(result,"res");
                if (result.success === true) {
                    // login successful
                   console.log("login sucewss");
                   this.showDialog = !this.showDialog;
                   this.loginStatus = true;
                   this.username = result.user.name;
                } else {
                    // login failed
                  alert(result.msg);
                 
                }
            });

       }
     
    }
    inputChange(){
       console.log(this.input.length,this.input);
        if(this.input.length - 1 == 0 ){
            this.validation.input =true;
          }else{
            this.validation.input =false;
            
          }
        
        
     

    }
    passChange(){
          if(this.password.length == 0){
          this.validation.pass=true;
        }else{
          this.validation.pass=false;
          
        }
    }

    logout(){

        this.authenticationService.logout();
        this.loginStatus = false;

    }

    requestOtp(){
      console.log(this.radioModel);
      let data={};
      if(this.radioModel =='otp'){

        data={mobile_no:this.mobile_noL,login:true};

       

      }else{
        data={mobile_no:this.mobile_no};
        
    
      }

           let headers = new Headers();
let options = new RequestOptions({ headers: headers });
      return this.http.post('http://localhost:4700/api/v1/otp/send',data,options)
        .map(res => res.json())

      

    }

    requestOtpL(){
        this.requestOtp().subscribe(result =>{
          if(result.data == false){
             alert("Invalid mobile no");
          }else{
        this.resendOtp=true;

          }
        
      })

    }


    verifyOtp(){
      let data={};
      
      if(this.radioModel =='otp'){
        data={mobile_no:this.mobile_noL,otp:this.otpL,login:true};
    }

      else{
           data={mobile_no:this.mobile_no,otp:this.otpR};
    }
 let headers = new Headers();
let options = new RequestOptions({ headers: headers });
      return this.http.post('http://localhost:4700/api/v1/otp/verify',data,options)
        .map(res => res.json())
      }
      verifyOtpL(){
         this.verifyOtp().subscribe(result =>{
           if(result.data.otp == false){
             alert("otp do not match");
           }else{
           localStorage.setItem('currentUser', JSON.stringify({ name: result.data.customer.name,_id: result.data.customer._id, token: result.data.token }));

             this.showDialog = !this.showDialog;
                   this.loginStatus = true;
                   this.username = result.data.customer.name;
             this.resendOtp=false;

           }
        
      })

      }
    

}
