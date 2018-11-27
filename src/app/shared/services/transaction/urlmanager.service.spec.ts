import { TestBed } from '@angular/core/testing';

import { UrlmanagerService } from './urlmanager.service';

describe('UrlmanagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UrlmanagerService = TestBed.get(UrlmanagerService);
    expect(service).toBeTruthy();
  });
});
