import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { <%= _s.classify(name) %>Component } from './<%= _.toLower(_s.classify(name)) %>.component';
import { List<%= _s.classify(name) %>Component } from './list-<%= _.toLower(_s.classify(name)) %>.component';
import { Add<%= _s.classify(name) %>Component } from './add-<%= _.toLower(_s.classify(name)) %>.component';
import { Edit<%= _s.classify(name) %>Component } from './edit-<%= _.toLower(_s.classify(name)) %>.component';

const routes: Routes = [
  {
    path: '',
    component: <%= _s.classify(name) %>Component,
    children: [
      {
        path: 'add-<%= _.toLower(_s.classify(name)) %>',
        component: Add<%= _s.classify(name) %>Component,
      },
      {
        path: 'edit-<%= _.toLower(_s.classify(name)) %>',
        component: Edit<%= _s.classify(name) %>Component,
      },
      {
        path: 'list-<%= _.toLower(_s.classify(name)) %>',
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
