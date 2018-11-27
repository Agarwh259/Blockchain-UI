import { TestBed } from '@angular/core/testing';

import { TokenmanagerService } from './tokenmanager.service';

describe('TokenmanagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TokenmanagerService = TestBed.get(TokenmanagerService);
    expect(service).toBeTruthy();
  });
});
