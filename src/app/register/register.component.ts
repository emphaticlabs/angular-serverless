import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { equalValidator } from '../custom-validators/custome.validators';
import { UserService } from '../user.service';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'liga-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  // passGroup: FormGroup;
  constructor(private fb: FormBuilder, private userService: UserService) {
    this.createFormulario();
  }

  ngOnInit() {}

  private createFormulario() {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.pattern(EMAIL_REGEX)]],
      passGroup: this.fb.group(
        {
          password: ['', [Validators.required, Validators.minLength(8)]],
          repassword: ['', [Validators.required, Validators.minLength(8)]]
        },
        { validator: equalValidator }
      )
    });
  }

  onSubmit() {
    this.userService.registrarse(this.registerForm.value);
  }

  reset() {
    this.registerForm.reset();
  }
}
