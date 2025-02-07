import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilledchecklistListComponent } from './filledchecklist-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

describe('FilledchecklistListComponent', () => {
  let component: FilledchecklistListComponent;
  let fixture: ComponentFixture<FilledchecklistListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilledchecklistListComponent],
      imports: [HttpClientModule, ToastrModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(FilledchecklistListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
