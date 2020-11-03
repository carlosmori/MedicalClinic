import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { DropdownModule } from 'primeng/dropdown';
import { MenuModule } from 'primeng/menu';
import { StepsModule } from 'primeng/steps';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CaptchaModule } from 'primeng/captcha';
import { FileUploadModule } from 'primeng/fileupload';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InputTextModule,
    PasswordModule,
    ToastModule,
    ButtonModule,
    RippleModule,
    DropdownModule,
    MenuModule,
    StepsModule,
    CardModule,
    TableModule,
    DialogModule,
    InputTextareaModule,
    CaptchaModule,
    FileUploadModule,
  ],
  exports: [
    InputTextModule,
    PasswordModule,
    ToastModule,
    ButtonModule,
    RippleModule,
    DropdownModule,
    MenuModule,
    StepsModule,
    CardModule,
    TableModule,
    DialogModule,
    InputTextareaModule,
    CaptchaModule,
    FileUploadModule,
  ],
})
export class PrimeNgModule {}
