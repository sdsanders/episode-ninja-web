import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SignupPromptComponent } from './signup-prompt.component';

describe('SignupPromptComponent', () => {
  let component: SignupPromptComponent;
  let fixture: ComponentFixture<SignupPromptComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupPromptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
