import { IncrementButtonComponent } from './increment-button.component';
import { render, screen } from '@testing-library/angular';

describe('IncrementButtonComponent', () => {
    
    it('should show value', async () => {
        const value = 4;

        const rendered = await render(IncrementButtonComponent, {
            componentProperties: { value }
        });

        expect(screen.getByText(`Valor: ${value}`));
    });

    it('should increment value', async () => {
        const value = 4;

        const rendered = await render(IncrementButtonComponent, {
            componentProperties: { value }
        });

        screen.getByText('Increase').click();

        expect(screen.getByText(`Valor: ${value + 1}`));
    });
});
