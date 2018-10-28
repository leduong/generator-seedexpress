import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {<%= _s.classify(name) %>Service} from "./<%= _.lowerCase(name) %>.service";
import {<%= _s.classify(name) %>} from "./<%= _.lowerCase(name) %>.model";

@Component({
  selector: 'qmr-list-<%= _.lowerCase(name) %>',
  styleUrls: ['./<%= _.lowerCase(name) %>.scss'],
  templateUrl: './list-<%= _.lowerCase(name) %>.html',
})
export class List<%= _s.classify(name) %>Component implements OnInit {
  page = 1;
  items: <%= _s.classify(name) %>[];

  constructor(private router: Router, private <%= _.lowerCase(name) %>Service: <%= _s.classify(name) %>Service) { }

  ngOnInit() {
    this.<%= _.lowerCase(name) %>Service.getAll()
      .subscribe(res => {
        let data:any = res;
        this.items = data.results || [];
      });
  }

  delete<%= _s.classify(name) %> (item: <%= _s.classify(name) %>): void {
    this.<%= _.lowerCase(name) %>Service.deleteById(item.id)
      .subscribe(data => {
        this.items = this.items.filter(u => u.id !== item.id);
      })
  };

  edit<%= _s.classify(name) %> (item: <%= _s.classify(name) %>): void {
    localStorage.removeItem("edit<%= _s.classify(name) %>Id");
    localStorage.setItem("edit<%= _s.classify(name) %>Id", item.id.toString());
    this.router.navigate(['edit-<%= _.lowerCase(name) %>']);
  };

  add<%= _s.classify(name) %> (): void {
    this.router.navigate(['add-<%= _.lowerCase(name) %>']);
  };
}
