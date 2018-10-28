import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";
import {ToasterService} from 'angular2-toaster';

import {<%= _s.classify(name) %>Service} from "./<%= _.toLower(_s.classify(name)) %>.service";

@Component({
  selector: 'qmr-add-<%= _.toLower(_s.classify(name)) %>',
  styleUrls: ['./<%= _.toLower(_s.classify(name)) %>.scss'],
  templateUrl: './add-<%= _.toLower(_s.classify(name)) %>.html'
})

export class Add<%= _s.classify(name) %>Component implements OnInit {

  constructor(private toasterService : ToasterService,private formBuilder : FormBuilder, private router : Router, private <%= _.toLower(_s.classify(name)) %>Service : <%= _s.classify(name) %>Service) { }

  addForm: FormGroup;

  ngOnInit() {

    this.addForm = this.formBuilder.group({
      id: [],<% _.each(attrs, function(attr) { %>
      <%=  _s.underscored(attr.attrName.toLowerCase()) %>: ['', Validators.required],<%}) %>
    });

}

onSubmit() {
  this.<%= _.toLower(_s.classify(name)) %>Service.post(this.addForm.value).subscribe(data => {
    this.toasterService.popAsync('success', '<% _s.classify(name) %>'+' add success');
    this.router.navigate(['/pages/<%= _.toLower(_s.classify(name)) %>/list-<%= _.toLower(_s.classify(name)) %>']);
  }, (err) => {
    this.toasterService.popAsync('danger', err);
  });
}
  resetForm(){
    this.editForm.setValue({});
  }
}
