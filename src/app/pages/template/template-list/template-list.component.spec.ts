import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateListComponent } from './template-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

describe('TemplateListComponent', () => {
  let component: TemplateListComponent;
  let fixture: ComponentFixture<TemplateListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TemplateListComponent],
      imports: [HttpClientModule, ToastrModule.forRoot(), Ng2SearchPipeModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TemplateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
