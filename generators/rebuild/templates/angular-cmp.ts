import { Component } from '@angular/core';

@Component({
  selector: 'qmr-<%= _.toLower(_s.classify(name)) %>',
  template: `<router-outlet></router-outlet>`,
})
export class <%= _s.classify(name) %>Component { }
