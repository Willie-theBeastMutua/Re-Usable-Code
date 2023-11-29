import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  userData = {
    fName: '',
    lName: '',
    email: '',
    password: ''
  };

  ngOnInit() {
  }

  constructor(private http: HttpClient, private toastController: ToastController, private router: Router) { }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      color: color,
      position: 'top',
    });
    toast.present();
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  signUp() {
    if (this.userData.fName == '' || this.userData.lName == '') {
      this.presentToast("First and Last Name Required", 'danger');
    } else if (this.userData.email == '' || this.userData.password == '') {
      this.presentToast("Email and password Required", 'danger');
    } else if (!this.validateEmail(this.userData.email)) {
      this.presentToast("Invalid Email Format", 'danger');
    } else {
      console.log(this.userData);

      this.http.post('http://localhost:3000/signup', this.userData)
        .subscribe(
          (response: any) => {
            console.log(response);
            console.log('Sign-up successful:', response);
            this.presentToast('Sign-up successful', 'success');
            this.userData = {
              fName: '',
              lName: '',
              email: '',
              password: ''
            };
            // Navigate to login on success
            window.location.href = '/login';
          },
          (error) => {
            // console.error('Sign-up error:', error.error.error.slice(-19, -1));
            if (error.error.error.slice(-19, -1) === "users.email_UNIQUE") {
              this.presentToast('User with the Email Exists', 'danger');
            } else {
              this.presentToast('Sign-up error', 'danger');

            }
          }
        );
    }
  }
}
