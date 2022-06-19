import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginServiceService } from '../auth/login-service.service';
import ConfirmPasswordValidator from '../shared/confirm-password.validator';


@Component({
  selector: 'app-entry-modal',
  templateUrl: './entry-modal.component.html',
  styleUrls: ['./entry-modal.component.scss']
})
export class EntryModalComponent implements OnInit {
 isModalDialogVisible: boolean = true;
 @Output() isVisible = new EventEmitter<boolean>();


 registerForm: FormGroup;
 loginForm: FormGroup;

 token: string | null;

  constructor( private formBuilder: FormBuilder, private loginService: LoginServiceService) {
    this.registerForm = formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatPass: ['', [Validators.required]]
   },
    { validators: ConfirmPasswordValidator.match('password', 'repeatPass') }
   );

   this.loginForm = formBuilder.group({
    email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$')]],
    password: ['', [Validators.required, Validators.minLength(6)]]
 });
  }

  ngOnInit(): void {
  }

  activeTab = 'login';

  login(activeTab: string){
    this.activeTab = activeTab;
  }

  register(activeTab: string){
    this.activeTab = activeTab;
  }

  closeModal() {
    this.isVisible.emit(false);
  }

  submitRegister(registerData:any) {
    console.log (registerData);
    this.isVisible.emit(false);
  }

  submitLogin(loginData:any) {
    console.log (loginData);
    this.isVisible.emit(false);
  }

}
