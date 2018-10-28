import { NgModule } from '@angular/core'

import { ThemeModule } from '../../@theme/theme.module'
import { <%= _s.classify(name) %>RoutingModule, routedComponents } from './<%= _.toLower(_s.classify(name)) %>-router.module'
import { <%= _s.classify(name) %>Service } from './<%= _.toLower(_s.classify(name)) %>.service'

@NgModule({
  imports: [ThemeModule, <%= _s.classify(name) %>RoutingModule],
  declarations: [...routedComponents],
  providers: [<%= _s.classify(name) %>Service],
})
export class <%= _s.classify(name) %>Module { }
