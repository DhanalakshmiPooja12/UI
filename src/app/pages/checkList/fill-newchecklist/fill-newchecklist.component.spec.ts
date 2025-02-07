import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FillNewchecklistComponent } from './fill-newchecklist.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

describe('FillNewchecklistComponent', () => {
  let component: FillNewchecklistComponent;
  let fixture: ComponentFixture<FillNewchecklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FillNewchecklistComponent],
      imports: [HttpClientModule, ToastrModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(FillNewchecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
