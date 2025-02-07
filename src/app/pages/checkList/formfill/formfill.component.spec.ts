import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormfillComponent } from './formfill.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

describe('FormfillComponent', () => {
  let component: FormfillComponent;
  let fixture: ComponentFixture<FormfillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormfillComponent],
      imports: [HttpClientModule, ToastrModule.forRoot(), FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(FormfillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
