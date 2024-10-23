import { ChangeDetectorRef, Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-setting-security',
  standalone: true,
  imports: [
    NzInputModule,
    NzFormModule,
    ReactiveFormsModule,
    NzIconModule
  ],
  templateUrl: './setting-security.component.html',
  styleUrl: './setting-security.component.scss'
})
export class SettingSecurityComponent {


  securityForm: FormGroup
  constructor(
    private fb:FormBuilder,
  
  ) { 
    this.securityForm = this.fb.group({
      email: ['',Validators.email],
      currentPassword: [''],
      newPassword: [''],
      confirmPassword: ['']
    },{validators: this.passwordMatchValidator})
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const newPassword = control.get('newPassword')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    return newPassword === confirmPassword ? null : { mismatch: true };
  }

  onSubmit() {
    console.log(this.securityForm.value);
  }
}
