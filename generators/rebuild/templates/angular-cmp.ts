import { Component } from '@angular/core';

@Component({
  selector: 'qmr-<%= name.toLowerCase() %>',
  template: `<router-outlet></router-outlet>`,
})
export class <%= _s.classify(name) %>Component { }
