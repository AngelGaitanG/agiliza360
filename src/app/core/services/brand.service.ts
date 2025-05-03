import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private brandSubject = new BehaviorSubject<string>('');


}