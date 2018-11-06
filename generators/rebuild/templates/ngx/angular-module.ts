import { NgModule } from '@angular/core'

import { ThemeModule } from '../../@theme/theme.module'
import { <%= _s.classify(name) %>RoutingModule, routedComponents } from './<%= name.toLowerCase() %>-router.module'
import { <%= _s.classify(name) %>Service } from './<%= name.toLowerCase() %>.service'

@NgModule({
  imports: [ThemeModule, <%= _s.classify(name) %>RoutingModule],
  declarations: [...routedComponents],
  providers: [<%= _s.classify(name) %>Service],
})
export class <%= _s.classify(name) %>Module { }
