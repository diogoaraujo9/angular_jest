import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, ComponentFixtureAutoDetect, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import Cat from 'src/app/_domain/models/cat';
import { CatService } from 'src/app/_domain/services/cat.service';
import { CatButtonComponent } from './cat-button.component';

class MockCatService {
    public getRandom(): Observable<Cat[]> {
        return of<Cat[]>([{id: 'cat_id', url: 'http://cat.com/image.jpg'}]);
    }
}

class MockEmptyCatService {
    public getRandom(): Observable<Cat[]> {
        return of<Cat[]>([{id: 'cat_id', url: ''}]);
    }
}

const catId = 'cat_id';
const catUrl = 'http://cat.com/image.jpg';

// Teste simples com poucas linhas
describe('CatButtonComponent (minimal)', () => {
    it('should create', () => {
        TestBed.configureTestingModule({ 
            declarations: [ CatButtonComponent ],
            providers: [ 
                { provide: CatService, useClass: MockCatService }
            ]
        });

        const fixture = TestBed.createComponent(CatButtonComponent);
        const component = fixture.componentInstance;
        expect(component).toBeDefined();
    });
});

// Testes para a classe do componente, sem se preocupar com a interação com o DOM
describe('CatButtonComponent without createComponent', () => {
    let component: CatButtonComponent;
    let catService: CatService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                CatButtonComponent,
                { provide: CatService, useClass: MockCatService }
            ]
        });
        
        // Captura a injeção do componente e do serviço
        component = TestBed.inject(CatButtonComponent);
        catService = TestBed.inject(CatService);
    });

    it('cat should be empty after construction', () => {
        expect(component.cat).toBeUndefined();
    });

    it('cat should be empty after construction', () => {
        component.ngOnInit();
        expect(component.cat).toBeDefined();
        expect(component.cat.id).toBeDefined();
        expect(component.cat.url).toBeDefined();
    });
});

// Maneira recomendada quando os testes interagem com o DOM
describe('CatButtonComponent with compile components', () => {
    let component: CatButtonComponent;
    let fixture: ComponentFixture<CatButtonComponent>;

    describe('with simple mock', () => {
        beforeEach(waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [ CatButtonComponent ],
                providers: [ 
                    { provide: CatService, useClass: MockCatService },
                    { provide: ComponentFixtureAutoDetect, useValue: true }
                ]
            })
            .compileComponents();
        }));
    
        beforeEach(() => {
            fixture = TestBed.createComponent(CatButtonComponent);
            component = fixture.componentInstance;
    
            // Não é necessário, pois o TestBed está com o ComponentFixtureAutoDetect no providers
            // fixture.detectChanges(); 
        });

        it('should create', () => {
            expect(component).toBeTruthy();
        });
    
        it('should contain "Get Random Cat"', () => {
            const buttonDebugElement: DebugElement = fixture.debugElement;
            const buttonElement: HTMLElement = buttonDebugElement.nativeElement;
            expect(buttonElement.textContent).toContain('Get Random Cat');
        });
    
        it('should find the <button> with fixture.debugElement.query(By.css)', () => {
            const buttonDebugElement: DebugElement = fixture.debugElement;
            const foundButtonDebugElement = buttonDebugElement.query(By.css('.cat-button'));
            const buttonElement: HTMLElement = foundButtonDebugElement.nativeElement;
            expect(buttonElement.textContent).toContain('Get Random Cat');
        });
    
        it('should display cat image', () => {
            component.cat = { id: catId, url: catUrl };
            fixture.detectChanges();
    
            const foundImageElement = fixture.debugElement.query(By.css('img'));
            const imageElement: HTMLElement = foundImageElement.nativeElement;
            expect(imageElement.getAttribute('src')).toEqual(catUrl);
        });
    })

    describe('with simple empty mock', () => {
        beforeEach(waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [ CatButtonComponent ],
                providers: [ 
                    { provide: CatService, useClass: MockEmptyCatService },
                ]
            })
            .compileComponents();
        }));
    
        beforeEach(() => {
            fixture = TestBed.createComponent(CatButtonComponent);
            component = fixture.componentInstance;
        });

        it('should display loading message', () => {
            fixture.detectChanges();
            const foundLoadingMessageElement = fixture.debugElement.query(By.css('.cat-loading-message'));
            const loadingMessageElement = foundLoadingMessageElement.nativeElement;
            expect(loadingMessageElement.textContent).toContain('Loading');
        });
    });
});

// Maneira recomendada quando os testes interagem com o DOM
describe('CatButtonComponent with jest mock', () => {
    let component: CatButtonComponent;
    let fixture: ComponentFixture<CatButtonComponent>;
    let expectedCat: Cat = {
        id: catId,
        url: catUrl
    };
    
    const catServiceMock: jest.Mocked<CatService> = {
        getRandom: jest.fn()
    } as any;

    beforeEach(waitForAsync(() => {
        // Com o Jasmine ficaria assim:
        // const catService = jasmine.createSpyObj('CatService', ['getRandom']);
        // getRandomSpy = catService.getRandom.and.returnValue(of({ id: 'cat_id', url: 'http://cat.com/image.jpg' }));
        
        // Com o jest, podemos fazer dessa maneira:
        catServiceMock.getRandom.mockReturnValue(of([expectedCat]));

        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ],
            declarations: [ CatButtonComponent ],
            providers: [ 
                { provide: CatService, useValue: catServiceMock },
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CatButtonComponent);
        component = fixture.componentInstance;
    });

    it('should display cat image', () => {
        fixture.detectChanges(); 

        const foundImageElement = fixture.debugElement.query(By.css('img'));
        const imageElement: HTMLElement = foundImageElement.nativeElement;
        expect(imageElement.getAttribute('src')).toEqual(catUrl);
        expect(catServiceMock.getRandom).toBeCalled();
        expect(catServiceMock.getRandom.mock.calls).toHaveLength(1);
        expect(component.cat).toEqual(expectedCat);
    });
});
