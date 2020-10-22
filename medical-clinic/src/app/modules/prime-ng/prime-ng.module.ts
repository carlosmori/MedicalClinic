import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';

@NgModule({
  declarations: [],
  imports: [CommonModule, InputTextModule, PasswordModule, ToastModule, ButtonModule, RippleModule],
  exports: [InputTextModule, PasswordModule, ToastModule, ButtonModule, RippleModule],
})
export class PrimeNgModule {}
