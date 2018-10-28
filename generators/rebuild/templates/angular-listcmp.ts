import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {<%= _s.classify(name) %>Service} from "./<%= _.toLower(_s.classify(name)) %>.service";
import {<%= _s.classify(name) %>} from "./<%= _.toLower(_s.classify(name)) %>.model";

@Component({
  selector: 'qmr-list-<%= _.toLower(_s.classify(name)) %>',
  styleUrls: ['./<%= _.toLower(_s.classify(name)) %>.scss'],
  templateUrl: './list-<%= _.toLower(_s.classify(name)) %>.html',
})
export class List<%= _s.classify(name) %>Component implements OnInit {
  page = 1;
  items: <%= _s.classify(name) %>[];

  constructor(private router: Router, private <%= _.toLower(_s.classify(name)) %>Service: <%= _s.classify(name) %>Service) { }

  ngOnInit() {
    this.<%= _.toLower(_s.classify(name)) %>Service.getAll()
      .subscribe(res => {
        let data:any = res;
        this.items = data.results || [];
      });
  }

  delete<%= _s.classify(name) %> (item: <%= _s.classify(name) %>): void {
    this.<%= _.toLower(_s.classify(name)) %>Service.deleteById(item.id)
      .subscribe(data => {
        this.items = this.items.filter(u => u.id !== item.id);
      })
  };

  edit<%= _s.classify(name) %> (item: <%= _s.classify(name) %>): void {
    localStorage.removeItem("edit<%= _s.classify(name) %>Id");
    localStorage.setItem("edit<%= _s.classify(name) %>Id", item.id.toString());
    this.router.navigate(['/pages/<%= _.toLower(_s.classify(name)) %>/edit-<%= _.toLower(_s.classify(name)) %>']);
  };

  add<%= _s.classify(name) %> (): void {
    this.router.navigate(['/pages/<%= _.toLower(_s.classify(name)) %>/add-<%= _.toLower(_s.classify(name)) %>']);
  };
}
