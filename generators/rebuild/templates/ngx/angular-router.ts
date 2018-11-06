import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { <%= _s.classify(name) %>Component } from './<%= name.toLowerCase() %>.component';
import { List<%= _s.classify(name) %>Component } from './list-<%= name.toLowerCase() %>.component';
import { Add<%= _s.classify(name) %>Component } from './add-<%= name.toLowerCase() %>.component';
import { Edit<%= _s.classify(name) %>Component } from './edit-<%= name.toLowerCase() %>.component';

const routes: Routes = [
  {
    path: '',
    component: <%= _s.classify(name) %>Component,
    children: [
      {
        path: 'new-<%= name.toLowerCase() %>',
        component: Add<%= _s.classify(name) %>Component,
      },
      {
        path: 'edit-<%= name.toLowerCase() %>/:id',
        component: Edit<%= _s.classify(name) %>Component,
      },
      {
        path: 'list-<%= name.toLowerCase() %>',
        component: List<%= _s.classify(name) %>Component,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class <%= _s.classify(name) %>RoutingModule { }

export const routedComponents = [
  <%= _s.classify(name) %>Component,
  Add<%= _s.classify(name) %>Component,
  Edit<%= _s.classify(name) %>Component,
  List<%= _s.classify(name) %>Component,
];
