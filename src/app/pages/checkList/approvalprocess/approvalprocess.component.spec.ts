import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalprocessComponent } from './approvalprocess.component';

describe('ApprovalprocessComponent', () => {
  let component: ApprovalprocessComponent;
  let fixture: ComponentFixture<ApprovalprocessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovalprocessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovalprocessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
