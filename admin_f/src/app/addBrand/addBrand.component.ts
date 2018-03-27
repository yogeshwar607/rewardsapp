import { Component } from '@angular/core';
import {Http, Response,RequestOptions,Headers} from '@angular/http';
import { ActivatedRoute,Router } from '@angular/router';
@Component({
  selector: 'addBrand',
  templateUrl: './addBrand.template.html',
  styleUrls:['./addBrand.style.scss']
})
export class AddBrandPage {
showFileNames:any;
editorContent:any;
filesToUpload: Array<File> = [];
fileLogoUpload:any;
name:any;
videoLink:any;
videoLinkList:any=[];
category:any;
categoryList:any=[];
headquaters:any;
fbLink:any;
linkedInLink:any;
twitterLink:any;
inti:any;
count:any=0;

wizard:any=[];





constructor(private route: ActivatedRoute,private http:Http,private router:Router){
    //  this.editorContent = 'My Document\'s Description'

    this.wizard = [{active:true},{active:false},{active:false}];
           let headers = new Headers();
       let options = new RequestOptions({ headers: headers });
       this.http.get('http://localhost:4700/api/v1/category/getAll',options)
        .map(res => res.json())
        .subscribe(result =>{
           console.log('res', result)
          this.inti = result.data.category;

        })

}
     onChange(event: any) {
    let files = [].slice.call(event.target.files);
    
    this.showFileNames = files;

     this.filesToUpload = <Array<File>>[].slice.call(event.target.files);
     console.log(this.filesToUpload);
     
    //  let files = [].slice.call(event.target.files);
  }

  onChangeLogo(event: any){
     this.fileLogoUpload = [].slice.call(event.target.files);
     console.log(this.fileLogoUpload);

  }

  addVideo(){
      if(this.videoLink != undefined && this.videoLink != ""){

    this.videoLinkList.push(this.videoLink);
    this.videoLink ="";
      }
  }
  addCategory(){
      if(this.category != undefined && this.category != ""){

    this.categoryList.push(this.category);
      }
  }
  sub(){
      console.log(this.editorContent);
  }
  nextWizard(){
if(this.count == 0){
this.count = this.count +1;
this.wizard[0].active =false;
this.wizard[1].active =true;

  
}else{

  if(this.count == 4){
alert("post dtaa");
    // this.register().subscribe(result =>{
    //        console.log('res', result);
    //       //  this.showDialog = !this.showDialog;
    //       //  alert("Registration successful");
    //      this.count = this.count +1;
    //      this.wizard[this.count -1 ].active =false;
    //      this.wizard[this.count].active =true;

    //     })


        }else{

    
        this.count = this.count +1;
        this.wizard[this.count -1 ].active =false;
        this.wizard[this.count].active =true;

  }


}




}

  upload() {
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;
    const fileLogo:any = this.fileLogoUpload;
    console.log(files,fileLogo);

    for(let i =0; i < files.length; i++){
        formData.append("imgStore", files[i], "img");
    }

    
        formData.append("imgStore", fileLogo[0], "logo");
    
    console.log('form data variable :   '+ formData.toString());
      let info = {
             name: this.name,
        description: this.editorContent,
        videos: this.videoLinkList,
        category: this.categoryList,
        headquaters: this.headquaters,
        fbLink: this.fbLink,
        twitterLink: this.twitterLink,
        updatedBy: undefined
        };
        formData.append('data', JSON.stringify(info));
         let headers = new Headers();
    // headers.append('content-type', 'multipart/formdata');
    let options = new RequestOptions({ headers: headers });
   
    // formData.append("uploads[]", files[0], files[0]['name']);
    // this.address.documents = files.toString();

        this.http.post('http://localhost:4700/api/v1/brand/create', formData,options)
        .map(files => files.json())
        .subscribe(files => {
          
          alert("Brand Created");
                   this.router.navigate(['/app/dashboard']);

          console.log('files', files)})
}

fileChangeEvent(fileInput: any) {
    // this.filesToUpload = <Array<File>>fileInput.target.files;
    //  let files = [].slice.call(event.target.files);
    
    // this.showFileNames = files;
    //this.product.photo = fileInput.target.files[0]['name'];
}
deleteCat(i,a){
  this.categoryList.splice(a,1);
}
deleteFile(i,a){
this.showFileNames.splice(a,1);


}
deleteVideo(i,a){
this.videoLinkList.splice(a,1);

}
backWizard(){

   this.count = this.count -1;
        this.wizard[this.count +1 ].active =false;
        this.wizard[this.count].active =true;

}

}
