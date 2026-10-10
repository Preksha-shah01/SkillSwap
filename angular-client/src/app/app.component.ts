import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <main class="shell">
    <section class="promo">
      <div class="brand"><span class="mark">⇄</span> SkillSwap</div>
      <div class="pitch"><p class="eyebrow">MADE FOR CAMPUS</p><h1>Join thousands of students learning and teaching together.</h1><p>Turn what you know into what you want to learn, one student connection at a time.</p></div>
      <div class="mini-art"><span>Python</span><b>⇄</b><span>UI/UX</span></div>
      <small>ⓥ &nbsp; Built around what students can share</small>
    </section>
    <section class="form-panel">
      <p class="kicker">Connect. Learn. Share.</p><h2>{{ mode === 'signup' ? 'Create Account' : 'Welcome back' }}</h2>
      <p class="sub">{{ mode === 'signup' ? 'Your campus community is full of people worth learning from.' : 'Log in to continue your SkillSwap journey.' }}</p>
      <form (ngSubmit)="submit()">
        <label *ngIf="mode === 'signup'">Full name<input name="name" [(ngModel)]="form.name" required placeholder="Your full name"></label>
        <label>Email address<input name="email" type="email" [(ngModel)]="form.email" required placeholder="you@college.edu"></label>
        <label>Password<input name="password" type="password" [(ngModel)]="form.password" required minlength="6" placeholder="At least 6 characters"></label>
        <label *ngIf="mode === 'signup'">Confirm password<input name="confirmPassword" type="password" [(ngModel)]="form.confirmPassword" required placeholder="Re-enter password"></label>
        <label *ngIf="mode === 'signup'" class="wide">University<select name="university" [(ngModel)]="form.university" required><option value="">Select university</option><option>Northstar University</option><option>City University</option><option>State Technical University</option><option>Other</option></select></label>
        <label *ngIf="mode === 'signup'">Department<select name="department" [(ngModel)]="form.department" required><option value="">Select department</option><option>Computer Science</option><option>Information Technology</option><option>Design</option><option>Business</option><option>Engineering</option><option>Other</option></select></label>
        <label *ngIf="mode === 'signup'">Semester<select name="semester" [(ngModel)]="form.semester" required><option value="">Select semester</option><option *ngFor="let n of semesters">Semester {{ n }}</option></select></label>
        <label *ngIf="mode === 'signup'" class="terms wide"><input type="checkbox" name="agreed" [(ngModel)]="form.agreed"> <span>I agree to the <b>Terms &amp; Conditions</b></span></label>
        <p *ngIf="message" class="notice">{{ message }}</p>
        <button class="submit wide" [disabled]="busy">{{ busy ? 'Please wait…' : (mode === 'signup' ? 'Sign up →' : 'Log in →') }}</button>
      </form>
      <p class="switch">{{ mode === 'signup' ? 'Already have an account?' : 'New to SkillSwap?' }} <button type="button" (click)="toggle()">{{ mode === 'signup' ? 'Log in' : 'Create account' }}</button></p>
    </section>
  </main>`,
})
export class AppComponent {
  mode: 'signup' | 'login' = 'signup';
  semesters = [1,2,3,4,5,6,7,8];
  busy = false;
  message = '';
  form: any = { name: '', email: '', password: '', confirmPassword: '', university: '', department: '', semester: '', agreed: false };
  constructor(private http: HttpClient) {}
  toggle() { this.mode = this.mode === 'signup' ? 'login' : 'signup'; this.message = ''; }
  submit() {
    this.message = '';
    if (this.mode === 'signup' && this.form.password !== this.form.confirmPassword) { this.message = 'Passwords do not match.'; return; }
    if (this.mode === 'signup' && !this.form.agreed) { this.message = 'Please agree to the Terms & Conditions.'; return; }
    this.busy = true;
    const body = this.mode === 'signup'
      ? { name: this.form.name, email: this.form.email, password: this.form.password, university: this.form.university, department: this.form.department, semester: this.form.semester }
      : { email: this.form.email, password: this.form.password };
    this.http.post<any>('http://localhost:5000/api/' + (this.mode === 'signup' ? 'register' : 'login'), body).subscribe({
      next: result => { this.message = result.message || 'Success'; this.busy = false; if (this.mode === 'signup') this.mode = 'login'; },
      error: error => { this.message = error.error?.message || 'Could not reach the API. Start the Node server first.'; this.busy = false; }
    });
  }
}
