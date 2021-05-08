import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { CatService } from "./cat.service";
import { HttpClient } from "@angular/common/http";
import Cat from "../models/cat";

describe('CatService', () => {
    let catService: CatService;
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ],
            providers: [ CatService ]
        });

        httpClient = TestBed.inject(HttpClient);
        httpTestingController = TestBed.inject(HttpTestingController);
        catService = TestBed.inject(CatService);
    });

    afterEach(() => {
        // After every test, assert that there are no more pending requests.
        httpTestingController.verify();
    });

    describe('#getRandom', () => {
        let expectedCats: Cat[];

        beforeEach(() => {
            catService = TestBed.inject(CatService);
            expectedCats = [{ id: '1', url: 'http://domain.com' }];
        });
        
        it('retrieve random cat', () => {
            expect.assertions(2);

            catService.getRandom().subscribe(
                cats => expect(cats).toEqual(expectedCats),
                fail
            );

            const req = httpTestingController.expectOne(
                request => request.url == `${catService.baseUrl}/images/search` &&
                           request.headers.has('x-api-key')
            );
            
            expect(req.request.method).toBe('GET');
            req.flush(expectedCats);
        });
    })
});