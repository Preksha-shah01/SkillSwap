import { bootstrapApplication } from "@angular/platform-browser";
import { provideHttpClient } from "@angular/common/http";
import { Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [FormsModule],
  templateUrl: "./app.component.html"
})
export class AppComponent {
  http = inject(HttpClient);
  email = "";
  password = "";
  remember = false;
  showPassword = false;
  message = "";

  login() {
    this.message = "";

    this.http.post<any>("http://localhost:5000/api/login", {
      email: this.email,
      password: this.password,
      remember: this.remember
    }).subscribe({
      next: data => this.message = data.message,
      error: err => this.message = err.error?.message || "Unable to connect to the server."
    });
  }
}

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient()]
});
