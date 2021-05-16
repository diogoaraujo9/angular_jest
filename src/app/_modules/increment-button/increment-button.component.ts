import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'increment-button',
    templateUrl: './increment-button.component.html',
    styleUrls: ['./increment-button.component.scss']
})
export class IncrementButtonComponent implements OnInit {
    public value: number = 0;

    constructor() { }

    ngOnInit(): void {
    }

    public decrease(): void {
        this.value--;
    }

    public increase(): void {
        this.value++;
    }
}
