import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserconfigComponent } from './userconfig.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { MatDialogModule } from '@angular/material/dialog';

describe('UserconfigComponent', () => {
  let component: UserconfigComponent;
  let fixture: ComponentFixture<UserconfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserconfigComponent],
      imports: [HttpClientModule, ToastrModule.forRoot(), MatDialogModule],
    }).compileComponents();

    fixture = TestBed.createComponent(UserconfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
