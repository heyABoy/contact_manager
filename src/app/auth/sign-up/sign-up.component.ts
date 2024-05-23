import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '@supabase/supabase-js';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  user!: User;

  userForm: FormGroup;
  userId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    public router: Router,
    private route: ActivatedRoute
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      mail: ['', Validators.required] 
    });
  }

  ngOnInit(): void {
    
  }

  async onSubmit() {
    if (this.userForm.valid) {
      try {
        await this.authService.signUp(this.userForm.value)
        this.router.navigate(['/']);
      } catch (error) {
        console.error('Error saving user:', error);
      }
    }
  }
}
