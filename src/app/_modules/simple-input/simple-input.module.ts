import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SimpleInputComponent } from './simple-input.component';

@NgModule({
    declarations: [
        SimpleInputComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ]
})
export class SimpleInputModule { }
