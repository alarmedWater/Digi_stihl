import { TestBed } from '@angular/core/testing';

import { MitarbeiterService } from './mitarbeiter.service';

/**
 * Test suite for the MitarbeiterService.
 */
describe('MitarbeiterService', () => {
  let service: MitarbeiterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MitarbeiterService);
  });

  /**
   * Test case to ensure that the service is created successfully.
   */
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
