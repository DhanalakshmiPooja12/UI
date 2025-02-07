import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FillChecklistformComponent } from './fill-checklistform.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

describe('FillChecklistformComponent', () => {
  let component: FillChecklistformComponent;
  let fixture: ComponentFixture<FillChecklistformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FillChecklistformComponent],
      imports: [HttpClientModule, ToastrModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(FillChecklistformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
