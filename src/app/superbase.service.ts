import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabaseUrl = 'https://bboywkrhpamhsbrcxdts.supabase.co';
  private supabaseKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJib3l3a3JocGFtaHNicmN4ZHRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYzMDUxNDQsImV4cCI6MjAzMTg4MTE0NH0.8QOm3zVTXb9hXITFUnC7I6_tcY_G-YZlA8NIA0Ps84U';
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
  }

  get client() {
    return this.supabase;
  }
}