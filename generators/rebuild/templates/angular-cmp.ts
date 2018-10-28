import { Component } from '@angular/core';

@Component({
  selector: 'qmr-<%= _.lowerCase(name) %>',
  template: `<router-outlet></router-outlet>`,
})
export class <%= _s.classify(name) %>Component { }
