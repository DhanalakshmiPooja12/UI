import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveChecklistComponent } from './approve-checklist.component';

describe('ApproveChecklistComponent', () => {
  let component: ApproveChecklistComponent;
  let fixture: ComponentFixture<ApproveChecklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveChecklistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApproveChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
