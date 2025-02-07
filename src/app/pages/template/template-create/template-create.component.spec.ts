import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateCreateComponent } from './template-create.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

describe('TemplateCreateComponent', () => {
  let component: TemplateCreateComponent;
  let fixture: ComponentFixture<TemplateCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TemplateCreateComponent],
      imports: [
        HttpClientModule,
        ToastrModule.forRoot(),
        FormsModule,
        MatDialogModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TemplateCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
