import { NgModule } from '@angular/core';

import { ThemeModule } from '../@theme/theme.module';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';

<% _.each(entities, function(entity) { %>
import { <%= _s.classify(entity.name) %>Module } from './<%= _.lowerCase(entity.name) %>/<%= _.lowerCase(entity.name) %>.module'; <% }) %>

const PAGES_COMPONENTS = [PagesComponent];

@NgModule({
  imports: [
    ThemeModule,
    PagesRoutingModule,
    DashboardModule,
    MiscellaneousModule,
    <% _.each(entities, function(entity) { %>
    <%= _s.classify(entity.name) %>Module, <% }) %>
    ],
  declarations: [...PAGES_COMPONENTS],
})
export class PagesModule { }
