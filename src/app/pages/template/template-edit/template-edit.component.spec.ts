import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateEditComponent } from './template-edit.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

describe('TemplateEditComponent', () => {
  let component: TemplateEditComponent;
  let fixture: ComponentFixture<TemplateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TemplateEditComponent],
      imports: [
        HttpClientModule,
        ToastrModule.forRoot(),
        FormsModule,
        MatDialogModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TemplateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
