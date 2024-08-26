import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxSemanticModule } from 'ngx-semantic';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule, NgxSemanticModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'math-calculator';

  form!: FormGroup;
  firstNumber: number = this.randomNum();
  secondNumber: number = this.randomNum();
  correctAttempts = 0;
  incorrectAttempts = 0;
  formSubmitted = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      answer: ['', [Validators.required, this.validateAns]],
    });
  }

  validateAns(control: AbstractControl): { [key: string]: boolean } | null {
    return control.value === 0 || control.value < 1 ? { nonZero: true } : null;
  }

  getQues(): void {
    this.firstNumber = this.randomNum();
    this.secondNumber = this.randomNum();
    this.form.reset();
  }

  randomNum(): number {
    return Math.floor(Math.random() * 10) + 1;
  }

  handleSubmit(): void {
    this.formSubmitted = true;
    if (this.form.valid) {
      const correctAnswer = this.firstNumber + this.secondNumber;

      this.form.value.answer == correctAnswer
        ? this.correctAttempts++
        : this.incorrectAttempts++;

      this.getQues();
      this.formSubmitted = false;
    }
  }
}
