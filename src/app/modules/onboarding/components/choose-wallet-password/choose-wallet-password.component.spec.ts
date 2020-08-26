import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseWalletPasswordComponent } from './choose-wallet-password.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { FormBuilder, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('ChooseWalletPasswordComponent', () => {
  let component: ChooseWalletPasswordComponent;
  let fixture: ComponentFixture<ChooseWalletPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseWalletPasswordComponent ],
      imports: [
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseWalletPasswordComponent);
    component = fixture.componentInstance;
    const builder = new FormBuilder();
    component.formGroup = builder.group({
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      passwordConfirmation: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render input elements', () => {
    const compiled = fixture.debugElement.nativeElement;
    const passwordInput = compiled.querySelector('input[name="password"]');
    const confirmationInput = compiled.querySelector('input[name="passwordConfirmation"]');
    expect(passwordInput).toBeTruthy();
    expect(confirmationInput).toBeTruthy();
  });

  it('should check validity is falsy for empty form', () => {
    const form = component.formGroup;
    expect(form.valid).toBeFalsy();
  });

  it('should test form invalidity for password', () => {
    const form = component.formGroup;
    const passwordInput = fixture.nativeElement.querySelector('input[name="password"]');
    const confirmationInput = fixture.nativeElement.querySelector('input[name="passwordConfirmation"]');

    passwordInput.value = '1234';
    passwordInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(passwordInput.value).toContain('1234');
    expect(form.valid).toBeFalsy();

    const warnings = fixture.debugElement.query(By.css('.password-warnings'));
    expect(warnings).toBeTruthy();

    // If password confirmation does not match, we expect an invalid form.
    passwordInput.value = 'Password0%2020';
    confirmationInput.value = 'Password0%20202020';
    passwordInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(form.valid).toBeFalsy();
  });

  it('should not show warnings on an empty form on pristine', () => {
    const warnings = fixture.debugElement.query(By.css('.password-warnings'));
    expect(warnings).toBeFalsy();
  });
});