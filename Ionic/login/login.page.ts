import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';
  constructor(private authService: AuthService ,private navCtrl: NavController,private toastController: ToastController) {}

  onSubmit() {
// Check if both email and password are provided
  if (this.email.trim() === '' || this.password.trim() === '') {
    // Show an error toast if either field is empty
    this.presentToast('Please enter your email and password', 'danger');
    return;
  }
    // Call the login method with both email and password
    this.authService.login(this.email, this.password).subscribe(
      response => {
        // Handle successful login response
        console.log('Login successful:', response);
        // Show a success toast
        this.presentToast('Welcome to Doki 😄', 'success');
        // Redirect or navigate to another page upon successful login
        this.navCtrl.navigateRoot('/home');
      },
      error => {
        // Handle login error
        console.error('Login error:', error);
        // Show an error toast
        if (error.status === 401) {
          // Show a message that the user needs to register
          this.presentToast('Invalid Email or Password. If you don\'t have an account, please Signup.', 'danger');
        } else {
          // Show a generic error message for other errors
          this.presentToast('An error occurred. Please try again later.', 'danger');
        }
      }
    );
  }

  // Function to present the toast
  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000, // Duration in milliseconds
      color: color, // 'success' for green, 'danger' for red
      position: 'top', // You can change the position as needed
    });
    toast.present();
  }
}