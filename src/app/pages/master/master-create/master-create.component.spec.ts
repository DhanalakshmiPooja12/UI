import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterCreateComponent } from './master-create.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

describe('MasterCreateComponent', () => {
  let component: MasterCreateComponent;
  let fixture: ComponentFixture<MasterCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MasterCreateComponent],
      imports: [
        HttpClientModule,
        ToastrModule.forRoot(),
        FormsModule,
        MatDialogModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MasterCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
