iimport { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {<%= _s.classify(name) %>Service} from "./<%= name.toLowerCase() %>-service";
import {<%= _s.classify(name) %>} from "./<%= name.toLowerCase() %>-model";

@Component({
  selector: 'qmr-list-<%= name.toLowerCase() %>',
  templateUrl: './list-<%= name.toLowerCase() %>.component.html',
})
export class List<%= _s.classify(name) %>Component implements OnInit {

  items: <%= _s.classify(name) %>[];

  constructor(private router: Router, private <%= name.toLowerCase() %>Service: <%= _s.classify(name) %>Service) { }

  ngOnInit() {
    this.<%= name.toLowerCase() %>Service.getAll()
      .subscribe(data => {
        this.items = data;
      });
  }

  delete<%= _s.classify(name) %> (item: <%= _s.classify(name) %>): void {
    this.userService.delete<%= _s.classify(name) %> (item.id)
      .subscribe(data => {
        this.items = this.items.filter(u => u.id !== item.id);
      })
  };

  edit<%= _s.classify(name) %> (item: <%= _s.classify(name) %>): void {
    localStorage.removeItem("edit<%= _s.classify(name) %>Id");
    localStorage.setItem("edit<%= _s.classify(name) %>Id", item.id.toString());
    this.router.navigate(['edit-<%= name.toLowerCase() %>']);
  };

  add <%= _s.classify(name) %> (): void {
    this.router.navigate(['add-<%= name.toLowerCase() %>']);
  };
}
