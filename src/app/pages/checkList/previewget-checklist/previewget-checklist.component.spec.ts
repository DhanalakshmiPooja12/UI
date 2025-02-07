import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewgetChecklistComponent } from './previewget-checklist.component';

describe('PreviewgetChecklistComponent', () => {
  let component: PreviewgetChecklistComponent;
  let fixture: ComponentFixture<PreviewgetChecklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewgetChecklistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewgetChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
