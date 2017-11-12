import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'liga-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.crearFormulario();
  }

  ngOnInit() {}

  private crearFormulario() {
    this.loginForm = this.fb.group({
      usuario: ['', [Validators.required, Validators.pattern(EMAIL_REGEX)]],
      password: ['', Validators.required]
    });
  }

  login() {
    console.log('login', this.loginForm.value);
  }

  reset() {
    this.loginForm.reset();
  }
}
