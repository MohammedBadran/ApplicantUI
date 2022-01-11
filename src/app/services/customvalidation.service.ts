import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { CountryNameValidatorService } from '../httpService/country-name-validator.service';

@Injectable({
  providedIn: 'root'
})
export class CustomvalidationService {

  constructor(private countryNameValidatorService:CountryNameValidatorService) { }
  validateCountryName(countryControl: AbstractControl) {
    let result:boolean=false;
    this.countryNameValidatorService.getCountryName(countryControl.value).subscribe(
      (data)=>{
        result=data as boolean;
      }
    )
    return new Promise(resolve => {
      setTimeout(() => {
        debugger
        if(!result){
          resolve({ countryAvaibleStatus: result });
        }
      
      }, 1000);
    });
     
  }
}
