import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { InputErrorComponent } from '../../../../shared/components/input-error/input-error.component';
import { passwordValidator } from '../../../../shared/validators/password.validator';
import { NotificationService } from '../../../../shared/services/notification.service';
import { NotificationComponent } from '../../../../shared/components/notification/notification.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    RouterModule, 
    InputErrorComponent,
    NotificationComponent
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  error: string | null = null;
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private fb: FormBuilder,
    private readonly authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), passwordValidator]],
      confirmPassword: ['', [Validators.required]],
      terms: [false, [Validators.requiredTrue]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  ngOnInit(): void {
    // Verificar si el usuario ya está autenticado
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/welcome']);
    }
  }

  passwordMatchValidator(g: FormGroup) {
    const password = g.get('password')?.value;
    const confirmPassword = g.get('confirmPassword')?.value;
    
    if (password === confirmPassword) {
      g.get('confirmPassword')?.setErrors(null);
      return null;
    }
    
    g.get('confirmPassword')?.setErrors({ mismatch: true });
    return { mismatch: true };
  }

  getPasswordErrorMessage(): string {
    const control = this.registerForm.get('password');
    if (!control?.errors || !control.touched) return '';

    if (control.errors['minlength']) {
      return 'La contraseña debe tener al menos 8 caracteres';
    }
    if (control.errors['requiresUppercase']) {
      return 'La contraseña debe contener al menos una mayúscula';
    }
    if (control.errors['requiresLowercase']) {
      return 'La contraseña debe contener al menos una minúscula';
    }
    if (control.errors['requiresNumber']) {
      return 'La contraseña debe contener al menos un número';
    }
    if (control.errors['requiresSpecialChar']) {
      return 'La contraseña debe contener al menos un carácter especial';
    }

    return '';
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = null;

    const { name, email, password } = this.registerForm.value;

    this.authService.register({fullName: name, email, password}).subscribe({
      next: () => {
        this.notificationService.showNotification('Registro exitoso. Redirigiendo al login...', 'success');
        setTimeout(() => {
          this.router.navigate(['/auth/login']);
        }, 2000);
      },
      error: (err) => {
        console.log('ERROR', err.error.message);
        this.error = err.error.message || 'Error al registrar usuario';
        this.notificationService.showNotification(err.error.message || 'Error al registrar usuario', 'error');
        this.loading = false;
      }
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}
