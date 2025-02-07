import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilledChecklistComponent } from './filled-checklist.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

describe('FilledChecklistComponent', () => {
  let component: FilledChecklistComponent;
  let fixture: ComponentFixture<FilledChecklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilledChecklistComponent],
      imports: [HttpClientModule, ToastrModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(FilledChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
