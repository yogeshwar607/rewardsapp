import { Component } from '@angular/core';
import {Http, Response,RequestOptions,Headers} from '@angular/http';
import { ActivatedRoute,Router } from '@angular/router';

declare let jQuery:any;
@Component({
  selector: 'addProduct',
  templateUrl: './addProduct.template.html',
  styleUrls:['./addProduct.style.scss']
})
export class AddProductPage {

showFileNames:any;
editorContent:any;
filesToUpload: Array<File> = [];
fileLogoUpload:any;
name:any;
videoLink:any;
videoLinkList:any=[];
category:any;
categoryList:any=[];
nAvailable:any;
fbLink:any;
linkedInLink:any;
twitterLink:any;
location:any;
locationList:any=[];
model:any;
permonthperuser:any;
perweekperuser:any;
perdayperuser:any;
brandId:any;
survey:any;
surveyList:any=[];
minAge:any;
maxAge:any;
init:any;
wizard:any=[];
count:any=0;
surveyType:any="descriptive";
noOpt:any=true;
optionList:any=[];
option:any;
tag:any;
tagList:any=[];
// id:any;
constructor(private route: ActivatedRoute,private http:Http,private router:Router){
     this.editorContent = 'My Document\'s Description'
         this.model = {
            sex: "both"
        };

        this.wizard=[{active:true},{active:false},{active:false},{active:false},{active:false}];
           let headers = new Headers();

       let options = new RequestOptions({ headers: headers });
   
    

        this.http.get('http://localhost:4700/api/v1/category/getAll',options)
        .map(res => res.json())
        .subscribe(result =>{
           console.log('res', result)
          this.init = result.data.category;

        })

}

 ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');

    this.brandId = id;
   console.log(id);
  }
     onChange(event: any) {
    let files = [].slice.call(event.target.files);
    
    this.showFileNames = files;

     this.filesToUpload = <Array<File>>[].slice.call(event.target.files);
     console.log(this.filesToUpload);
     
    //  let files = [].slice.call(event.target.files);
  }

  // onChangeLogo(event: any){
  //    this.fileLogoUpload = [].slice.call(event.target.files);
  //    console.log(this.fileLogoUpload);

  // }

  addVideo(){
  if(this.videoLink != undefined && this.videoLink != ""){
    
    this.videoLinkList.push(this.videoLink);
    this.videoLink = "";
  }
  }
  addCategory(){
    console.log("cat",this.category);
  if(this.category != undefined && this.category != ""){
    
    this.categoryList.push(this.category);

  }
  }
  addLocation(){
  if(this.location != undefined && this.location != ""){
    
     this.locationList.push(this.location);
     this.location="";
      }

  }
  addOption(){

  if(this.option != undefined && this.option != ""){
    
    
     this.optionList.push({o:this.option});
     this.option="";

  }
    
  }

  addSurvey(){
    this.surveyList.push({
      ques:{q:this.survey},
      options:this.optionList,
      typeO:{t:this.surveyType}
    });
    this.optionList = [];
    this.option ="";
  }
  sub(){
      console.log(this.editorContent);
  }

  upload() {
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;
    const fileLogo:any = this.fileLogoUpload;
    console.log(files,fileLogo);

    for(let i =0; i < files.length; i++){
        formData.append("imgStore", files[i], "img");
    }

    
        // formData.append("imgStore", fileLogo[0], "logo");
    
    console.log('form data variable :   '+ formData.toString());
      let info = {
        name: this.name,
        description: this.editorContent,
        videos: this.videoLinkList,
        category: this.categoryList,
        location: this.locationList,
        fbLink: this.fbLink,
        updatedBy: undefined,
        brand:this.brandId,
        tags:this.tagList,
        no_of_available_items:this.nAvailable,
        total_Qunatity:this.nAvailable,
        survey:this.surveyList,
        target_audience:{
          "age":{
            "min":this.minAge,
            "max":this.maxAge
          },
          "gender":this.model.sex,
          "location":this.locationList
        }
      };
      
    


        formData.append('data', JSON.stringify(info));
         let headers = new Headers();
    // headers.append('content-type', 'multipart/formdata');
    let options = new RequestOptions({ headers: headers });
   
    // formData.append("uploads[]", files[0], files[0]['name']);
    // this.address.documents = files.toString();

        this.http.post('http://localhost:4700/api/v1/product/admin/create', formData,options)
        .map(files => files.json())
        .subscribe(files => {
          alert("Product Created");
         this.router.navigate(['/app/products-page/'+this.brandId]);

          console.log('files', files)})
}

fileChangeEvent(fileInput: any) {
    // this.filesToUpload = <Array<File>>fileInput.target.files;
    //  let files = [].slice.call(event.target.files);
    
    // this.showFileNames = files;
    //this.product.photo = fileInput.target.files[0]['name'];
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

changeSurveyType(){
  this.survey = "";
  this.optionList = [];
  this.option = "";
  if(this.surveyType == "descriptive"){
    this.noOpt = true;
  }else{
    this.noOpt = false;
  }
}
addTag(i){
  if(this.tag != undefined && this.tag != ""){
     this.tagList.push(this.tag);
     this.tag="";
  }

  

}
deleteTag(i,a){
this.tagList.splice(a,1);
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
deleteLocation(i,a){
this.locationList.splice(a,1);
  
}
deleteOption(i,a){
  console.log(i);
  this.optionList.splice(a,1);
}
backWizard(){

   this.count = this.count -1;
        this.wizard[this.count +1 ].active =false;
        this.wizard[this.count].active =true;

}

}
