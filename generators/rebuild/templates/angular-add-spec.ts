import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Add<%= _s.classify(name) %>Component } from './add-<%= _.toLower(_s.classify(name)) %>.component';

describe('Add<%= _s.classify(name) %>Component', () => {
  let component: Add<%= _s.classify(name) %>Component;
  let fixture: ComponentFixture<Add<%= _s.classify(name) %>Component>;

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
