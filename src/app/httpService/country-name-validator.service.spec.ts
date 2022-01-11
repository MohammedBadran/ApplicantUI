import { TestBed } from '@angular/core/testing';

import { CountryNameValidatorService } from './country-name-validator.service';

describe('CountryNameValidatorService', () => {
  let service: CountryNameValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountryNameValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
