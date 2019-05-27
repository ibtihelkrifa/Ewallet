import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecupererComponent } from './recuperer.component';

describe('RecupererComponent', () => {
  let component: RecupererComponent;
  let fixture: ComponentFixture<RecupererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecupererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecupererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
