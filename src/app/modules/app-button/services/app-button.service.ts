import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class AppButtonService
{
    public onClick$: Subject<number> = new Subject<number>();
    private value: number = 42;

    constructor() {}

    public getValue(): number {
        return this.value;
    }   

    public getClickEvent(): Subject<number> {
        return this.onClick$;
    }

    public emitClickEvent(): void {
        this.onClick$.next(this.value);
    }

    public getPromise(): Promise<number> {
        return new Promise<number>((resolve, reject) => setTimeout(() => resolve(this.value), 5000));
    }
}
