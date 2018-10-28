import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { List<%= _s.classify(name) %>Component } from './list-<%= _.lowerCase(name) %>.component';

describe('List<%= _s.classify(name) %>Component', () => {
  let component: List<%= _s.classify(name) %>Component;
  let fixture: ComponentFixture<List<%= _s.classify(name) %>Component >;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [List <%= _s.classify(name) %>Component]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(List <%= _s.classify(name) %>Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
