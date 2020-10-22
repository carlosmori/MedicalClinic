import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [],
  imports: [CommonModule, InputTextModule, PasswordModule, ToastModule, ButtonModule, RippleModule, DropdownModule],
  exports: [InputTextModule, PasswordModule, ToastModule, ButtonModule, RippleModule, DropdownModule],
})
export class PrimeNgModule {}
