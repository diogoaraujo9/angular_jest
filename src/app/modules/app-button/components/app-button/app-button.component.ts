import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import Cat from 'src/app/_domain/models/cat';
import { CatService } from 'src/app/_domain/services/cat.service';

@Component({
    selector: 'app-button',
    templateUrl: './app-button.component.html',
    styleUrls: ['./app-button.component.scss']
})
export class AppButtonComponent implements OnInit, OnDestroy {
    public cat: Cat;
    private subscription = new Subscription();

    constructor(private _catService: CatService) { }

    ngOnInit(): void {
        this.refreshCat();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    public refreshCat(): void {
        this._catService.getRandom().subscribe(_cat => {
            this.cat = _cat[0];
        });
    }
}
