import { TestBed } from "@angular/core/testing";
import { CatDataService } from "./cat-data.service";

describe('AppButtonService', () => {
    let service: CatDataService;
    let expectedValue = 42;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ CatDataService ]
        });

        service = TestBed.inject(CatDataService);
    });

    it('pegar valor estático', () => {
        expect(service.getValue()).toBe(expectedValue);
    });

    it('pegar valor de observable', done => {
        expect.assertions(1);

        service.getClickEvent().subscribe(_value => {
            expect(_value).toBe(expectedValue);
            done();
        });
        
        service.emitClickEvent();
    });

    it('pegar valor de promise', async () => {
        let value = await service.getPromise();
        expect(value).toBe(expectedValue);
    });
});