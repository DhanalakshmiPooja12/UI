import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartconfigComponent } from './partconfig.component';

describe('PartconfigComponent', () => {
  let component: PartconfigComponent;
  let fixture: ComponentFixture<PartconfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartconfigComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartconfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
