import { AuthService } from '@/auth/services/auth.service';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { CommonModule } from '@angular/common';
import { FormUtils } from '@/utils/form-utils';

@Component({
  selector: 'app-register-page',
  imports: [RouterLink, ReactiveFormsModule,CommonModule],
  templateUrl: './register-page.component.html',
  styles: `
    .btn-disabled{
      color: #FFFFFF !important;
    }

  `,
})
export class RegisterPageComponent {
  fb = inject(FormBuilder);
  hasError = signal(false);
  isPosting = signal(true);
  router = inject(Router);

  authService = inject(AuthService);
  formUtils = FormUtils;

  registerForm = this.fb.group(
    {
      email: [
        '',
        [
          Validators.email,
          Validators.required,
          Validators.pattern(this.formUtils.emailPattern),
        ],
        [FormUtils.checkingServerResponse],
      ],
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(this.formUtils.notOnlySpacesPattern),
          FormUtils.notStrider,
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(6),
        Validators.pattern(this.formUtils.passwordPattern),
      ]],
      password2: ['', Validators.required],
    },
    {
      validators: [FormUtils.isFieldOneEqualFieldTwo('password', 'password2')],
    }
  );

  onSubmit() {
    if (this.registerForm.invalid) {
      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false);
      }, 2000);
      return;
    }

    this.isPosting.set(false); // opcional para deshabilitar el botón

    const { email, password, username } = this.registerForm.value;
    console.log(email, password, username);

    this.authService.register(email!, password!, username!).subscribe({
      next: (isAuthenticated) => {
        this.isPosting.set(true);
        if (isAuthenticated) {
          // Registro OK → Redirigir
          this.router.navigateByUrl('/');
          return;
        }
        // Si llega aquí, hay error del backend
        this.hasError.set(true);
        setTimeout(() => {
          this.hasError.set(false);
        }, 2000);
      },
    });
  }
}
