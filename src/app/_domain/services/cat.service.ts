import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import Cat from "../models/cat";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class CatService
{
    private headers: HttpHeaders;
    public baseUrl = 'https://api.thecatapi.com/v1';

    constructor(private http: HttpClient) {
        this.headers = new HttpHeaders({
            'x-api-key' : environment.catApiKey
        });
    }

    public getRandom(): Observable<Cat[]> {
        const url = `${this.baseUrl}/images/search`;
        
        return this.http.get<Cat[]>(url, {
            headers: this.headers
        });
    }
}