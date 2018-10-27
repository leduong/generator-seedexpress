import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Add<%= _s.classify(name) %>Component } from './add-<%= name.toLowerCase() %>.component';

describe('Add<%= _s.classify(name) %>Component', () => {
  let component: Add<%= _s.classify(name) %>Component;
  let fixture: ComponentFixture<AddUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Add<%= _s.classify(name) %>Component]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Add<%= _s.classify(name) %>Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
