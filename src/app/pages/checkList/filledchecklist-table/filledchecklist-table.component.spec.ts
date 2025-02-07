import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilledchecklistTableComponent } from './filledchecklist-table.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

describe('FilledchecklistTableComponent', () => {
  let component: FilledchecklistTableComponent;
  let fixture: ComponentFixture<FilledchecklistTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilledchecklistTableComponent],
      imports: [HttpClientModule, ToastrModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(FilledchecklistTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
