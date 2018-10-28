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
      <% _.each(entities, function(entity) { %> { path: '<%= _.lowerCase(entity.name) %>', loadChildren: 'app/pages/<%= _.lowerCase(entity.name) %>/<%= _.lowerCase(entity.name) %>.module#<%= _s.classify(entity.name) %>Module' },
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
