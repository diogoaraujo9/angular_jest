import { RandomButtonComponent } from './random-button.component';

describe('RandomButtonComponent', () => {
    it('#refreshRandomNumber should change #randomNumber', () => {
        const component = new RandomButtonComponent();
        component.ngOnInit();
        
        expect(component.randomNumber).toBeDefined();
        
        component.numberChanged.subscribe((_number: number) => expect(_number).toBeDefined());
        component.refreshRandomNumber();
    });
});
