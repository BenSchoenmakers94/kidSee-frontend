import { TestBed, inject } from '@angular/core/testing';

import { AbstractObjectService } from './abstract-object.service';

describe('AbstractObjectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AbstractObjectService]
    });
  });

  it('should be created', inject([AbstractObjectService], (service: AbstractObjectService) => {
    expect(service).toBeTruthy();
  }));
});
