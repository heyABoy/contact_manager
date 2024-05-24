import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '@supabase/supabase-js';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {
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
      password: ['',[ Validators.required, Validators.minLength(4)]],
      mail: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]] 
    });
  }

  ngOnInit(): void {
    
  }

  async onSubmit() {
    if (this.userForm.valid) {
      try {
        await this.authService.logIn(this.userForm.value.mail, this.userForm.value.password)
        this.router.navigate(['/']);
      } catch (error) {
        console.error('Error saving user:', error);
      }
    }
  }
}
