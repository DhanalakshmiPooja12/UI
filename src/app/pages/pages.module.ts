import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NgFor } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { ToastrModule } from 'ngx-toastr';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatBadgeModule } from '@angular/material/badge';

// import { MatTableModule } from '@angular/material/table';

import { PagesRoutingModule } from './pages-routing.module';
import { TemplateComponent } from './template/template.component';
import { MasterComponent } from './master/master.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { TemplateListComponent } from './template/template-list/template-list.component';
import { TemplateCreateComponent } from './template/template-create/template-create.component';
import { MasterListComponent } from './master/master-list/master-list.component';
import { MasterCreateComponent } from './master/master-create/master-create.component';
import { TemplateEditComponent } from './template/template-edit/template-edit.component';
import { MasterEditComponent } from './master/master-edit/master-edit.component';
import { PreviewComponent } from './master/preview/preview.component';
import { FilledChecklistComponent } from './checkList/filled-checklist/filled-checklist.component';
import { ApprovalComponent } from './checkList/approval/approval.component';
import { ChecklistComponent } from './checkList/checklist.component';
import { FillNewchecklistComponent } from './checkList/fill-newchecklist/fill-newchecklist.component';
import { FilledchecklistListComponent } from './checkList/filledchecklist-list/filledchecklist-list.component';
import { FilledchecklistTableComponent } from './checkList/filledchecklist-table/filledchecklist-table.component';
import { FillChecklistformComponent } from './checkList/fill-checklistform/fill-checklistform.component';
import { FormfillComponent } from './checkList/formfill/formfill.component';
import { UserconfigComponent } from './configuration/userconfig/userconfig.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { ConfigureComponent } from './configuration/configure/configure.component';
import { MappingComponent } from './configuration/mapping/mapping.component';
import { RoleComponent } from './configuration/role/role.component';
import { DepartmentComponent } from './configuration/department/department.component';
import { PlantComponent } from './configuration/plant/plant.component';
import { ShiftComponent } from './configuration/shift/shift.component';
import { ZoneComponent } from './configuration/zone/zone.component';
import { MachineComponent } from './configuration/machine/machine.component';
import { AuthGuard } from '../guard/guard';
import { PartconfigComponent } from './configuration/partconfig/partconfig.component';
import { MatRadioModule } from '@angular/material/radio';
import { DenyComponent } from '../deny/deny.component';
import { ApprovalprocessComponent } from './checkList/approvalprocess/approvalprocess.component';
import { ApproveChecklistComponent } from './checkList/approve-checklist/approve-checklist.component';
import { MaindashboardComponent } from './maindashboard/maindashboard.component';
import { TemplateViewComponent } from './template/template-view/template-view.component';
import { TemplatePreviewComponent } from './template/template-preview/template-preview.component';
import { ChecklistPreviewComponent } from './checkList/checklist-preview/checklist-preview.component';
import { PreviewgetChecklistComponent } from './checkList/previewget-checklist/previewget-checklist.component';

@NgModule({
  declarations: [
    TemplateComponent,
    MasterComponent,
    SidebarComponent,
    MainpageComponent,
    TemplateListComponent,
    TemplateCreateComponent,
    MasterListComponent,
    MasterCreateComponent,
    TemplateEditComponent,
    MasterEditComponent,
    PreviewComponent,
    ChecklistComponent,
    FilledChecklistComponent,
    FillNewchecklistComponent,
    ApprovalComponent,
    FilledchecklistListComponent,
    FilledchecklistTableComponent,
    FillChecklistformComponent,
    FormfillComponent,
    ConfigurationComponent,
    UserconfigComponent,
    ConfigureComponent,
    MappingComponent,
    PartconfigComponent,
    RoleComponent,
    DepartmentComponent,
    PlantComponent,
    ShiftComponent,
    ZoneComponent,
    MachineComponent,
    DenyComponent,
    ApprovalprocessComponent,
    ApproveChecklistComponent,
    MaindashboardComponent,
    TemplateViewComponent,
    TemplatePreviewComponent,
    ChecklistPreviewComponent,
    PreviewgetChecklistComponent,
  ],
  imports: [
    DragDropModule,
    MatRadioModule,
    PagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    NgbModule,
    InputTextModule,
    InputNumberModule,
    Ng2SearchPipeModule,
    InputTextareaModule,
    InputSwitchModule,
    MatTableModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatDividerModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    NgFor,
    MatSidenavModule,
    MatTooltipModule,
    MatExpansionModule,
    MatListModule,
    MatToolbarModule,
    MatMenuModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatDialogModule,
    MatPaginatorModule,
    MatCardModule,
    ToastrModule.forRoot(),
    MatBadgeModule,
  ],
  providers: [AuthGuard],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PagesModule {}
