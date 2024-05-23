import { Injectable } from '@angular/core';
import { SupabaseService } from '../superbase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = false;
  private authSecretKey = 'Bearer Token';

  constructor(private supabaseService: SupabaseService) {

  }

  async getUser(id: number) {
    const { data, error } = await this.supabaseService.client
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single();
    if (error) {
      console.error('Error fetching user by id:', error);
      throw error;
    }
    return data;
  }

  async logIn(mail: string, password: string) {
    const { data, error } = await this.supabaseService.client
      .from('profiles')
      .select('*')
      .eq('mail', mail)
      .single();
      if(error) {
        console.log('login fail')
      }
      if (data.mail === mail && password === password) {
        const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpheWRlZXAgUGF0aWwiLCJpYXQiOjE1MTYyMzkwMjJ9.yt3EOXf60R62Mef2oFpbFh2ihkP5qZ4fM8bjVnF8YhA'; // Generate or receive the token from your server
        localStorage.setItem(this.authSecretKey, authToken);
        localStorage.setItem("id", data.id);
        this.isAuthenticated = true;
        return true;
      } else {
        return false;
      }

  }

  async signUp(user: any) {
    try {
      let data = await this.addUser(user)
      await this.logIn(user.mail, user.password)
    } catch (error) {
      console.log("signUp fail")
    }
    
  }

  isAuthenticatedUser(): boolean {
    let token = localStorage.getItem(this.authSecretKey)
    let id = localStorage.getItem("id")
    if(token && id ) {
      this.isAuthenticated = true;
    }
    return this.isAuthenticated;
  }

  logout(): void {
    localStorage.removeItem(this.authSecretKey);
    localStorage.removeItem("id");
    this.isAuthenticated = false;
  }

  async addUser(user: any) {
    try {
      const { data, error } = await this.supabaseService.client
      .from('profiles')
      .insert(user);
      if(error) {
        console.log('error adduser')
      }

      return data;
    } catch (error) {
      console.error('Error adding user:', error);
      throw error;
    }
    
  }
}
