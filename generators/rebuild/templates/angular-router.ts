import { NgModule } from '@angular/core'

import { ThemeModule } from '../../@theme/theme.module'
import { <%= _s.classify(name) %>RoutingModule, routedComponents } from './<%= name.toLowerCase() %>-router.module'
import { <%= _s.classify(name) %>Service } from './<%= name.toLowerCase() %>-service'

@NgModule({
  imports: [ThemeModule, <%= _s.classify(name) %>RoutingModule],
  declarations: [...routedComponents],
  providers: [<%= _s.classify(name) %>Service],
})
export class <%= _s.classify(name) %>Module { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { <%= _s.classify(name) %>Component } from './<%= name.toLowerCase() %>.component';
import { List<%= _s.classify(name) %>Component } from './list-<%= name.toLowerCase() %>.component';
import { New<%= _s.classify(name) %>Component } from './new-<%= name.toLowerCase() %>.component';
import { Edit<%= _s.classify(name) %>Component } from './edit-<%= name.toLowerCase() %>.component';

const routes: Routes = [
  {
    path: '',
    component: <%= _s.classify(name) %>Component,
    children: [
      {
        path: 'new-<%= name.toLowerCase() %>',
        component: New <%= _s.classify(name) %>Component,
      },
      {
        path: 'edit-<%= name.toLowerCase() %>/:id',
        component: Edit <%= _s.classify(name) %>Component,
      },
      {
        path: 'list-<%= name.toLowerCase() %>',
        component: List <%= _s.classify(name) %>Component,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class <%= _s.classify(name) %> RoutingModule { }

export const routedComponents = [
  <%= _s.classify(name) %>Component,
  New <%= _s.classify(name) %>Component,
  Edit <%= _s.classify(name) %>Component,
  List <%= _s.classify(name) %>Component,
];
