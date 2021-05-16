import { IncrementButtonComponent } from './increment-button.component';
import { render, screen } from '@testing-library/angular';
import { ComponentFixture, ComponentFixtureAutoDetect, TestBed, waitForAsync } from '@angular/core/testing';
import { DebugElement } from '@angular/core';

describe('IncrementButtonComponent with Testing Library', () => {
    let value = 4;

    it('should show value', async () => {
        await render(IncrementButtonComponent, {
            componentProperties: { value }
        });

        expect(screen.getByText(`Valor: ${value}`));
    });

    it('should increment value', async () => {
        await render(IncrementButtonComponent, {
            componentProperties: { value }
        });

        screen.getByText('Increase').click();

        expect(screen.getByText(`Valor: ${value + 1}`));
    });
});

describe('IncrementButtonComponent without Testing Library', () => {
    let component: IncrementButtonComponent;
    let fixture: ComponentFixture<IncrementButtonComponent>;
    let increaseButton: HTMLElement;
    let value = 4;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ IncrementButtonComponent ],
            providers: [ { provide: ComponentFixtureAutoDetect, useValue: true } ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(IncrementButtonComponent);
        component = fixture.componentInstance;

        const debugElement: DebugElement = fixture.debugElement;
        const nativeElement: HTMLElement = debugElement.nativeElement;

        const buttons = nativeElement.getElementsByTagName('button');
        component.value = value;
        fixture.detectChanges();

        for (var i = 0; i < buttons.length; i++) {
            if (buttons[i].textContent == 'Increase') {
                increaseButton = buttons[i];
                break;
            }
        }
    });

    it('should show value', async () => {
        const nativeElement: HTMLElement = fixture.debugElement.nativeElement;

        const spans = nativeElement.getElementsByTagName('span');
        expect(spans[0].innerHTML).toContain(`Valor: ${value}`);
    });

    it('should increment value', async () => {
        increaseButton.click();
        fixture.detectChanges();

        const nativeElement: HTMLElement = fixture.debugElement.nativeElement;

        const spans = nativeElement.getElementsByTagName('span');
        expect(spans[0].innerHTML).toContain(`Valor: ${value + 1}`);
    });
});
