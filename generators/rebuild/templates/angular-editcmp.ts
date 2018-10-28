import { Router } from "@angular/router";
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import {<%= _s.classify(name) %>Service} from "./<%= _.lowerCase(name) %>.service";
import { first } from "rxjs/operators";

@Component({
  selector: 'qmr-edit-<%= _.lowerCase(name) %>',
  styleUrls: ['./<%= _.lowerCase(name) %>.scss'],
  templateUrl: './edit-<%= _.lowerCase(name) %>.html'
})
export class Edit<%= _s.classify(name) %>Component implements OnInit {

  editForm: FormGroup;
  constructor(private formBuilder : FormBuilder, private router : Router, private <%= _.lowerCase(name) %>Service : <%= _s.classify(name) %>Service) { }

  ngOnInit() {
    let <%= _.lowerCase(name) %>Id = localStorage.getItem("edit<%= _s.classify(name) %>Id");
    if (!<%= _.lowerCase(name) %>Id) {
      alert("Invalid action.")
      this.router.navigate(['list-<%= _.lowerCase(name) %>']);
      return;
    }

    this.editForm = this.formBuilder.group({
      id: [],<% _.each(attrs, function(attr) { %>
      <%=  _s.underscored(attr.attr_.lowerCase(name)) %>: ['', Validators.required],<%}) %>
    });

    this.<%= _.lowerCase(name) %>Service.getById(+<%= _.lowerCase(name) %>Id).subscribe(data => {
      this.editForm.setValue(data);
    });
}

onSubmit() {
  this.<%= _.lowerCase(name) %>Service.put(this.editForm.value).pipe(first()).subscribe(data => {
    this.router.navigate(['list-<%= _.lowerCase(name) %>']);
  }, error => {
    alert(error);
  });
}
}
