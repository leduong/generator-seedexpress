import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";

import {<%= _s.classify(name) %>Service} from "./<%= name.toLowerCase() %>.service";

@Component({
  selector: 'qmr-add-<%= name.toLowerCase() %>',
  templateUrl: './add-<%= name.toLowerCase() %>.component.html'
})

export class Add<%= _s.classify(name) %>Component implements OnInit {

  constructor(private formBuilder : FormBuilder, private router : Router, private <%= name.toLowerCase() %>Service : <%= _s.classify(name) %>Service) { }

  addForm: FormGroup;

  ngOnInit() {

    this.addForm = this.formBuilder.group({
      id: [],<% _.each(attrs, function(attr) { %>
      <%=  _s.underscored(attr.attrName.toLowerCase()) %>: ['', Validators.required],<%}) %>
    });

}

onSubmit() {
  this.<%= name.toLowerCase() %>Service.post(this.addForm.value).subscribe(data => {
    this.router.navigate(['list-<%= name.toLowerCase() %>']);
  });
}

}
