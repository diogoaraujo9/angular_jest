import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CatButtonModule } from './_modules/cat-button/cat-button.module';
import { RandomButtonModule } from './_modules/random-button/random-button.module';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CatButtonModule,
        HttpClientModule,
        RandomButtonModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
