import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Edit<%= _s.classify(name) %>Component } from './edit-<%= _.toLower(_s.classify(name)) %>.component';

describe('Edit<%= _s.classify(name) %>Component', () => {
  let component: Edit<%= _s.classify(name) %>Component;
  let fixture: ComponentFixture<Edit<%= _s.classify(name) %>Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Edit<%= _s.classify(name) %>Component]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Edit<%= _s.classify(name) %>Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
