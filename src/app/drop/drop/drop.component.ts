import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { DomSanitizer } from '@angular/platform-browser';
import { DropService } from '../drop.service';
import { LoginServiceService } from '../../auth/login-service.service';

@Component({
  selector: 'app-drop',
  templateUrl: './drop.component.html',
  styleUrls: ['./drop.component.scss']
})
export class DropComponent implements OnInit {

  fileArr: any[] = [];
  urlArr: string[] = [];
  fileObj: any[] = [];
  finishObj: any[] = [];
  form: FormGroup;
  msg: string ="";
  progress: number = 0;
  message:string = "ARASTRA TUS ARCHIVOS AQUÍ";
  name:string;
  file:any;
  alertIsVisible: boolean = false;
  formIsVisible: boolean = true;
  constructor(
    public fb: FormBuilder,
    private sanitizer: DomSanitizer,
    public dropService: DropService,
    private loginService: LoginServiceService
  ) {
    this.form = this.fb.group({
      avatar: [null]
    })
  }
  ngOnInit() { }

  upload(event:any) {
    const fileListAsArray = Array.from(event);
    fileListAsArray.forEach((item, i) => {
      this.fileArr = [];
      const file:any = (event as HTMLInputElement);
      const url = URL.createObjectURL(file[i]);
      this.urlArr.push(url);
      this.fileArr.push({ item, url: url });
    })
      this.fileArr.forEach((item) => {
      this.fileObj.push(item.item);
      console.log(item);
      this.name = item.item.name;
    })
    this.form.patchValue({
      avatar: this.fileObj
    })
    this.form.get('avatar')!.updateValueAndValidity();
    console.log(this.form.value.avatar);
    this.message = `Tu archivo ${this.name} se ha subido correctamente`;
    this.loginService.uploadFile(this.form.value.avatar);

  }

  submit(data:any) {
    if (data.avatar == null) {
      this.formIsVisible = false;
      this.alertIsVisible = true;
    }
  }

  closeModal(isVisible: boolean) {
    this.alertIsVisible = isVisible;
    this.formIsVisible = true;
  }


  // Clean Url
  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
