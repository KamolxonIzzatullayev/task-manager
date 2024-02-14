import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { TasksListComponent } from './components/task-list/task-list.component';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';

export const routes: Routes = [
  { path: 'tasks', component: TasksListComponent },
  { path: 'task-detail/:id', component: TaskDetailComponent },
  { path: 'task-detail', component: TaskDetailComponent },
  { path: '', redirectTo: '/tasks', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }