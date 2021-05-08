import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AppButtonComponent } from './components/app-button/app-button.component';
import { AppButtonService } from "./services/app-button.service";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        AppButtonComponent
    ],
    providers: [
        AppButtonService
    ],
    exports: [
        AppButtonComponent
    ]
})
export class ButtonModule { }