import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterEditComponent } from './master-edit.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

describe('MasterEditComponent', () => {
  let component: MasterEditComponent;
  let fixture: ComponentFixture<MasterEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MasterEditComponent],
      imports: [HttpClientModule, ToastrModule.forRoot(), FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MasterEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
