import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { BrandPanelComponent } from '../brand-panel/brand-panel.component';
import { AuthService } from '../services/auth.service';

function passwordsMatch(group: AbstractControl): ValidationErrors | null {
  const p = group.get('password')?.value;
  const c = group.get('confirmPassword')?.value;
  return p === c ? null : { mismatch: true };
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, BrandPanelComponent],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  universities = [
    'Veer Narmad South Gujarat University',
    'Sardar Vallabhbhai National Institute of Technology',
    'Gujarat Technological University',
    'Other',
  ];
  departments = ['Computer Science', 'Information Technology', 'Electronics', 'Mechanical', 'Civil', 'Business / Management', 'Other'];
  semesters = ['1', '2', '3', '4', '5', '6', '7', '8'];

  showPassword = false;
  showConfirm = false;
  loading = false;
  error = '';

  form = this.fb.group(
    {
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      university: ['', [Validators.required]],
      department: ['', [Validators.required]],
      semester: ['', [Validators.required]],
      terms: [false, [Validators.requiredTrue]],
    },
    { validators: passwordsMatch }
  );

  constructor(private fb: FormBuilder, private auth: AuthService) {}

  private validate(): string {
    const f = this.form.controls;
    if (f.fullName.invalid) return 'Please enter your full name.';
    if (f.email.invalid) return 'Please enter a valid college email.';
    if (f.password.invalid) return 'Password must be at least 6 characters.';
    if (this.form.hasError('mismatch')) return 'Passwords do not match.';
    if (f.university.invalid) return 'Please select your university.';
    if (f.department.invalid) return 'Please select your department.';
    if (f.semester.invalid) return 'Please select your semester.';
    if (f.terms.invalid) return 'Please accept the Terms & Conditions.';
    return '';
  }

  onSubmit(): void {
    this.error = this.validate();
    if (this.error) return;

    const v = this.form.getRawValue();
    this.loading = true;
    this.auth
      .register({
        fullName: v.fullName!, email: v.email!, password: v.password!,
        university: v.university!, department: v.department!, semester: v.semester!,
      })
      .subscribe({
        next: (res) => {
          localStorage.setItem('token', res.token);
          this.loading = false;
          alert('Account created successfully!');
          // this.router.navigate(['/login']) if you use the Angular Router
        },
        error: (err) => {
          this.error = err?.error?.message || 'Registration failed';
          this.loading = false;
        },
      });
  }
}
