import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CatButtonComponent } from './cat-button.component';
import { CatDataService } from "./services/cat-data.service";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        CatButtonComponent
    ],
    providers: [
        CatDataService
    ],
    exports: [
        CatButtonComponent
    ]
})
export class CatButtonModule { }