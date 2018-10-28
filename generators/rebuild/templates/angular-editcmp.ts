import { Router } from "@angular/router";
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import {<%= _s.classify(name) %>Service} from "./<%= name.toLowerCase() %>.service";
import { first } from "rxjs/operators";

@Component({
  selector: 'qmr-edit-<%= name.toLowerCase() %>',
  styleUrls: ['./<%= name.toLowerCase() %>.scss'],
  templateUrl: './edit-<%= name.toLowerCase() %>.html'
})
export class Edit<%= _s.classify(name) %>Component implements OnInit {

  editForm: FormGroup;
  constructor(private formBuilder : FormBuilder, private router : Router, private <%= name.toLowerCase() %>Service : <%= _s.classify(name) %>Service) { }

  ngOnInit() {
    let <%= name.toLowerCase() %>Id = localStorage.getItem("edit<%= _s.classify(name) %>Id");
    if (!<%= name.toLowerCase() %>Id) {
      alert("Invalid action.")
      this.router.navigate(['list-<%= name.toLowerCase() %>']);
      return;
    }

    this.editForm = this.formBuilder.group({
      id: [],<% _.each(attrs, function(attr) { %>
      <%=  _s.underscored(attr.attrName.toLowerCase()) %>: ['', Validators.required],<%}) %>
    });

    this.<%= name.toLowerCase() %>Service.getById(+<%= name.toLowerCase() %>Id).subscribe(data => {
      this.editForm.setValue(data);
    });
}

onSubmit() {
  this.<%= name.toLowerCase() %>Service.put(this.editForm.value).pipe(first()).subscribe(data => {
    this.router.navigate(['list-<%= name.toLowerCase() %>']);
  }, error => {
    alert(error);
  });
}
}
