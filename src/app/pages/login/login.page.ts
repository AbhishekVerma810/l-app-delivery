import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { Browser } from '@capacitor/browser';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  signupForm: FormGroup;
  isTypePassword: boolean = true;

  constructor(private apiService: ApiService, private router: Router) {
    this.initForm();
  }

  ngOnInit() {
  }

  initForm() {
    this.signupForm = new FormGroup({
      email: new FormControl('',
        { validators: [Validators.required, Validators.email] }
      ),
      password: new FormControl('',
        { validators: [Validators.required] }
      ),
    });
  }

  onChange() {
    this.isTypePassword = !this.isTypePassword;
  }

  onSubmit() {
   if (!this.signupForm.valid) return;
    console.log(this.signupForm.value);
    this.apiService.login(this.signupForm.value).then(res => {
      localStorage.setItem("user_data", JSON.stringify(res.user));
      console.log('res===>', res.user)
      this.router.navigate(['/tabs/home'])
    }).catch(err => {
      console.log('hello abhi your error')
    })
  }
  async openWhatsApp() {
    const phoneNumber = '+91 8103182388';
    const message = 'Hello, I want to chat with you!';
    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    await Browser.open({ url });

  }
}