import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      <% _.each(entities, function(entity) { %> { path: '<%= _.toLower(_s.classify(entity.name)) %>', loadChildren: 'app/pages/<%= _.toLower(_s.classify(entity.name)) %>/<%= _.toLower(_s.classify(entity.name)) %>.module#<%= _s.classify(entity.name) %>Module' },
        <% }); %>
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
],
      },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
