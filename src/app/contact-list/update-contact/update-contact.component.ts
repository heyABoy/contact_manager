import { Component } from '@angular/core';
import { ContatctService } from '../contatct.service';
import { Contact } from '../../models/contact';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-contact',
  templateUrl: './update-contact.component.html',
  styleUrl: './update-contact.component.css'
})
export class UpdateContactComponent {
  contact!: Contact;
  name!: string;
  telephone!: string;
  mail!: string;

  contactId: number | null = null;


  constructor(
    private fb: FormBuilder,
    private contactService: ContatctService,
    public router: Router,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.contactId = this.route.snapshot.params['id'];
    if (this.contactId) {
      this.loadcontact(this.contactId);
    }
  }

  async loadcontact(id: number) {
    try {
     const contact = await this.contactService.getcontactById(id);
      this.name = contact.name
      this.telephone = contact.telephone
      this.mail = contact.mail
      console.log(this.contact)
    } catch (error) {
      console.error('Error loading contact:', error);
    }
  }

  async onSubmit(updateContact: any) {
    console.log(updateContact.value)
    if (updateContact) {
      try {
        if (this.contactId) {
          await this.contactService.updatecontact(
            this.contactId,
            updateContact.value
          );
        }
        this.router.navigate(['/contacts']);
      } catch (error) {
        console.error('Error saving contact:', error);
      }
    }
  }
}
