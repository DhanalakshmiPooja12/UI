import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MappingComponent } from './mapping.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { MatDialogModule } from '@angular/material/dialog';

describe('MappingComponent', () => {
  let component: MappingComponent;
  let fixture: ComponentFixture<MappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MappingComponent],
      imports: [HttpClientModule, ToastrModule.forRoot(), MatDialogModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
