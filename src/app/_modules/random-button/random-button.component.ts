import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
    selector: 'random-button',
    templateUrl: './random-button.component.html',
    styleUrls: ['./random-button.component.scss']
})
export class RandomButtonComponent implements OnInit {
    @Output() numberChanged = new EventEmitter<number>();
    public randomNumber: number;
    
    constructor() { }

    ngOnInit(): void {
        this.refreshRandomNumber();
    }

    public refreshRandomNumber(): void {
        this.randomNumber = Math.random();
        this.numberChanged.emit(this.randomNumber);
    }
}
