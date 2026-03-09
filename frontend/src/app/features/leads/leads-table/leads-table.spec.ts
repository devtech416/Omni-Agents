import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadsTable } from './leads-table';

describe('LeadsTable', () => {
  let component: LeadsTable;
  let fixture: ComponentFixture<LeadsTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeadsTable],
    }).compileComponents();

    fixture = TestBed.createComponent(LeadsTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
