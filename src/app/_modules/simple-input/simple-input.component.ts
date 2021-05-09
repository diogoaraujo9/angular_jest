import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'simple-input',
    template: `
        <input type="text" [(ngModel)]="name"/>
        <span>{{ name }}</span>

        <button (click)="clearName()">Clear name</button>
    `,
    styles: [
    ]
})
export class SimpleInputComponent implements OnInit {

    public name: string = '';

    constructor() { }

    ngOnInit(): void {
    }

    public clearName(): void{
        setTimeout(() => this.name = '', 100);
    }
}
