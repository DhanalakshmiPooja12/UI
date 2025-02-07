import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterListComponent } from './master-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

describe('MasterListComponent', () => {
  let component: MasterListComponent;
  let fixture: ComponentFixture<MasterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MasterListComponent],
      imports: [HttpClientModule, ToastrModule.forRoot(), Ng2SearchPipeModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MasterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
