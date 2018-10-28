import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";

import {<%= _s.classify(name) %>Service} from "./<%= _.lowerCase(name) %>.service";

@Component({
  selector: 'qmr-add-<%= _.lowerCase(name) %>',
  styleUrls: ['./<%= _.lowerCase(name) %>.scss'],
  templateUrl: './add-<%= _.lowerCase(name) %>.html'
})

export class Add<%= _s.classify(name) %>Component implements OnInit {

  constructor(private formBuilder : FormBuilder, private router : Router, private <%= _.lowerCase(name) %>Service : <%= _s.classify(name) %>Service) { }

  addForm: FormGroup;

  ngOnInit() {

    this.addForm = this.formBuilder.group({
      id: [],<% _.each(attrs, function(attr) { %>
      <%=  _s.underscored(attr.attr_.lowerCase(name)) %>: ['', Validators.required],<%}) %>
    });

}

onSubmit() {
  this.<%= _.lowerCase(name) %>Service.post(this.addForm.value).subscribe(data => {
    this.router.navigate(['list-<%= _.lowerCase(name) %>']);
  });
}

}
