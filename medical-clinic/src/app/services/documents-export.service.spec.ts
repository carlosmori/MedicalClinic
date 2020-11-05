import { TestBed } from '@angular/core/testing';

import { DocumentsExportService } from './documents-export.service';

describe('DocumentsExportService', () => {
  let service: DocumentsExportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentsExportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
