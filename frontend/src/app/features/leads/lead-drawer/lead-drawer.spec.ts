import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadDrawer } from './lead-drawer';

describe('LeadDrawer', () => {
  let component: LeadDrawer;
  let fixture: ComponentFixture<LeadDrawer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeadDrawer],
    }).compileComponents();

    fixture = TestBed.createComponent(LeadDrawer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
