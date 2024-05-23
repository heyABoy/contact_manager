import { Injectable } from '@angular/core';
import { SupabaseService } from '../superbase.service';

@Injectable({
  providedIn: 'root'
})
export class ContatctService {
  constructor(private supabaseService: SupabaseService) {}

  async getcontacts(user_id: number) {
    console.log("cotact all")
    const { data, error } = await this.supabaseService.client
      .from('contacts')
      .select('*')
      .eq('user_id', user_id);
    if (error) {
      console.error('Error fetching contacts:', error);
      throw error;
    }
    return data;
  }

  async getcontactById(id: number) {
    const { data, error } = await this.supabaseService.client
      .from('contacts')
      .select('*')
      .eq('id', id)
      .single();
    if (error) {
      console.error('Error fetching contact by id:', error);
      throw error;
    }
    return data;
  }

  async addcontact(contact: any) {
    console.log(contact)
    const { data, error } = await this.supabaseService.client
      .from('contacts')
      .insert(contact);
    if (error) {
      console.error('Error adding contact:', error);
      throw error;
    }
    return data;
  }

  async updatecontact(id: number, contact: any) {
    const { data, error } = await this.supabaseService.client
      .from('contacts')
      .update(contact)
      .eq('id', id);
    if (error) {
      console.error('Error updating contact:', error);
      throw error;
    }
    console.log('fffff',data)
    return data;
  }

  async deletecontact(id: number) {
    const { data, error } = await this.supabaseService.client
      .from('contacts')
      .delete()
      .eq('id', id);
    if (error) {
      console.error('Error deleting contact:', error);
      throw error;
    }
    return data;
  }

  
}
