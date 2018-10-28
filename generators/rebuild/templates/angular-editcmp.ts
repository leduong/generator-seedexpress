import { Router } from "@angular/router";
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {ToasterService} from 'angular2-toaster';

import {<%= _s.classify(name) %>Service} from "./<%= _.toLower(_s.classify(name)) %>.service";
import { first } from "rxjs/operators";

@Component({
  selector: 'qmr-edit-<%= _.toLower(_s.classify(name)) %>',
  styleUrls: ['./<%= _.toLower(_s.classify(name)) %>.scss'],
  templateUrl: './edit-<%= _.toLower(_s.classify(name)) %>.html'
})
export class Edit<%= _s.classify(name) %>Component implements OnInit {

  private origForm: any;
  editForm: FormGroup;
  constructor(private toasterService : ToasterService,private formBuilder : FormBuilder, private router : Router, private <%= _.toLower(_s.classify(name)) %>Service : <%= _s.classify(name) %>Service) { }

  ngOnInit() {
    let <%= _.toLower(_s.classify(name)) %>Id = localStorage.getItem("edit<%= _s.classify(name) %>Id");
    if (!<%= _.toLower(_s.classify(name)) %>Id) {
      this.toasterService.popAsync('danger', 'Invalid action');
      this.router.navigate(['/pages/<%= _.toLower(_s.classify(name)) %>/list-<%= _.toLower(_s.classify(name)) %>']);
      return;
    }

    this.editForm = this.formBuilder.group({
      id: [],<% _.each(attrs, function(attr) { %>
      <%=  _s.underscored(attr.attrName.toLowerCase()) %>: ['', Validators.required],<%}) %>
    });

    this.<%= _.toLower(_s.classify(name)) %>Service.getById(+<%= _.toLower(_s.classify(name)) %>Id).subscribe(data => {
      this.origForm = data;
      this.editForm.setValue(data);
    });
}

onSubmit() {
  this.<%= _.toLower(_s.classify(name)) %>Service.put(this.editForm.value).pipe(first()).subscribe(data => {
    this.toasterService.popAsync('success', '<% _s.classify(name) %>'+' update success');
    this.router.navigate(['/pages/<%= _.toLower(_s.classify(name)) %>/list-<%= _.toLower(_s.classify(name)) %>']);
  }, (err) => {
    this.toasterService.popAsync('danger', err);
  });
}
  resetForm(){
    this.editForm.setValue(this.origForm);
  }
}
