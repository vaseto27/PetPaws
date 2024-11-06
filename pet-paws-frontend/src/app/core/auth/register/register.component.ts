import { Component, inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule],
  templateUrl: './register.component..html',
  styleUrl: './register.component..scss'
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router)
  registerForm: FormGroup;
  constructor() {
    this.registerForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required])
    })
  }

  register() {
    this.authService.register(this.registerForm.controls['name'].value,this.registerForm.controls['email'].value, this.registerForm.controls['password'].value).subscribe({
      next: () => {
        this.router.navigate(['/home'])
      },
      error: (err) => console.error(err)
    });
  }

  gotoLogin() {
    this.router.navigate(['/login'])
  }
}
