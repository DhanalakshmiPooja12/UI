import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateComponent } from './template/template.component';
import { MasterComponent } from './master/master.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { TemplateListComponent } from './template/template-list/template-list.component';
import { TemplateCreateComponent } from './template/template-create/template-create.component';
import { MasterListComponent } from './master/master-list/master-list.component';
import { MasterCreateComponent } from './master/master-create/master-create.component';
import { TemplateEditComponent } from './template/template-edit/template-edit.component';
import { MasterEditComponent } from './master/master-edit/master-edit.component';
import { PreviewComponent } from './master/preview/preview.component';
import { ChecklistComponent } from './checkList/checklist.component';
import { ApprovalComponent } from './checkList/approval/approval.component';
import { FillNewchecklistComponent } from './checkList/fill-newchecklist/fill-newchecklist.component';
import { FilledChecklistComponent } from './checkList/filled-checklist/filled-checklist.component';
import { FilledchecklistListComponent } from './checkList/filledchecklist-list/filledchecklist-list.component';
import { FilledchecklistTableComponent } from './checkList/filledchecklist-table/filledchecklist-table.component';
import { FillChecklistformComponent } from './checkList/fill-checklistform/fill-checklistform.component';
import { FormfillComponent } from './checkList/formfill/formfill.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { UserconfigComponent } from './configuration/userconfig/userconfig.component';
import { ConfigureComponent } from './configuration/configure/configure.component';
import { MappingComponent } from './configuration/mapping/mapping.component';
import { PartconfigComponent } from './configuration/partconfig/partconfig.component';
import { RoleComponent } from './configuration/role/role.component';
import { DepartmentComponent } from './configuration/department/department.component';
import { PlantComponent } from './configuration/plant/plant.component';
import { ZoneComponent } from './configuration/zone/zone.component';
import { ShiftComponent } from './configuration/shift/shift.component';
import { MachineComponent } from './configuration/machine/machine.component';
import { AuthGuard } from '../guard/guard';
import { DenyComponent } from '../deny/deny.component';
import { ApprovalprocessComponent } from './checkList/approvalprocess/approvalprocess.component';
import { ApproveChecklistComponent } from './checkList/approve-checklist/approve-checklist.component';
import { MaindashboardComponent } from './maindashboard/maindashboard.component';
import { TemplatePreviewComponent } from './template/template-preview/template-preview.component';
import { TemplateViewComponent } from './template/template-view/template-view.component';
import { ChecklistPreviewComponent } from './checkList/checklist-preview/checklist-preview.component';
import { PreviewgetChecklistComponent } from './checkList/previewget-checklist/previewget-checklist.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'mainpage',
    component: MainpageComponent,
    children: [
      {
        path: 'dashboard',
        component: MaindashboardComponent,
        // canActivate: [AuthGuard],
      },
      {
        path: 'template',
        component: TemplateComponent,
        children: [
          { path: 'list', component: TemplateListComponent },
          { path: 'new', component: TemplateCreateComponent },
          { path: 'edit/:id', component: TemplateEditComponent },
          { path: 'temPreview/:id', component: TemplatePreviewComponent },
          { path: 'temView/:id', component: TemplateViewComponent },
        ],
        // canActivate: [AuthGuard],
      },
      {
        path: 'master',
        component: MasterComponent,
        children: [
          { path: 'list', component: MasterListComponent },
          { path: 'create', component: MasterCreateComponent },
          { path: 'edit/:id', component: MasterEditComponent },
          { path: 'preview/:id', component: PreviewComponent },
        ],
        // canActivate: [AuthGuard],
      },
      {
        path: 'checklist',
        component: ChecklistComponent,
        children: [
          { path: 'filledCL', component: FilledChecklistComponent },
          { path: 'fillnew', component: FillNewchecklistComponent },
          { path: 'approval', component: ApprovalComponent },
          { path: 'filledList', component: FilledchecklistListComponent },
          { path: 'filledTable/:id', component: FilledchecklistTableComponent },
          { path: 'fillform/:id', component: FillChecklistformComponent },
          { path: 'form/:id', component: FormfillComponent },
          { path: 'approvalprocess', component: ApprovalprocessComponent },
          { path: 'approvechecklist', component: ApproveChecklistComponent },
          {
            path: 'checklistPreview/:id',
            component: ChecklistPreviewComponent,
          },
          { path: 'InputPreview/:id', component: PreviewgetChecklistComponent },
        ],
        // canActivate: [AuthGuard],
      },
      {
        path: 'config',
        component: ConfigurationComponent,
        children: [
          { path: 'userconfig', component: UserconfigComponent },
          { path: 'configData', component: ConfigureComponent },
          { path: 'role', component: RoleComponent },
          { path: 'map', component: MappingComponent },
          { path: 'part', component: PartconfigComponent },
          { path: 'department', component: DepartmentComponent },
          { path: 'plant', component: PlantComponent },
          { path: 'zone', component: ZoneComponent },
          { path: 'shift', component: ShiftComponent },
          { path: 'machine', component: MachineComponent },
        ],
        // canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'deny',
    component: DenyComponent,
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'prefix',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
