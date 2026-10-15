import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BrandPanelComponent } from '../brand-panel/brand-panel.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, BrandPanelComponent],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  showPassword = false;
  loading = false;
  error = '';

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    remember: [false],
  });

  constructor(private fb: FormBuilder, private auth: AuthService) {}

  onSubmit(): void {
    const f = this.form.controls;
    if (f.email.invalid) { this.error = 'Please enter a valid college email.'; return; }
    if (f.password.invalid) { this.error = 'Password must be at least 6 characters.'; return; }

    this.error = '';
    this.loading = true;
    const v = this.form.getRawValue();

    this.auth.login({ email: v.email!, password: v.password! }).subscribe({
      next: (res) => {
        (v.remember ? localStorage : sessionStorage).setItem('token', res.token);
        this.loading = false;
        alert('Logged in successfully!');
        // this.router.navigate(['/dashboard']) once you have a dashboard route
      },
      error: (err) => {
        this.error = err?.error?.message || 'Login failed';
        this.loading = false;
      },
    });
  }
}
