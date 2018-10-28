import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { <%= _s.classify(name) %>Component } from './<%= _.lowerCase(name) %>.component';
import { List<%= _s.classify(name) %>Component } from './list-<%= _.lowerCase(name) %>.component';
import { Add<%= _s.classify(name) %>Component } from './add-<%= _.lowerCase(name) %>.component';
import { Edit<%= _s.classify(name) %>Component } from './edit-<%= _.lowerCase(name) %>.component';

const routes: Routes = [
  {
    path: '',
    component: <%= _s.classify(name) %>Component,
    children: [
      {
        path: 'new-<%= _.lowerCase(name) %>',
        component: Add<%= _s.classify(name) %>Component,
      },
      {
        path: 'edit-<%= _.lowerCase(name) %>/:id',
        component: Edit<%= _s.classify(name) %>Component,
      },
      {
        path: 'list-<%= _.lowerCase(name) %>',
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
