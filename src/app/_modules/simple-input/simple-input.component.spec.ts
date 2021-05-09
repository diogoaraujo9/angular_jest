import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { SimpleInputComponent } from './simple-input.component';

describe('SimpleInputComponent', () => {
    let component: SimpleInputComponent;
    let fixture: ComponentFixture<SimpleInputComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ SimpleInputComponent ],
            imports: [ FormsModule ]
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SimpleInputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should update span content after changing value input', () => {
        const element: HTMLElement = fixture.nativeElement;
        const spanElement = element.querySelector('span');
        const inputElement = element.querySelector('input');

        inputElement.value = 'cats';

        inputElement.dispatchEvent(new Event('input'));

        fixture.detectChanges();
        expect(spanElement.textContent).toBe('cats');
    });

    it('should clear name', fakeAsync(() => {        
        component.name = 'cats';
        fixture.detectChanges();

        component.clearName();

        tick(100);

        expect(component.name).toBeFalsy();
    }));
});
