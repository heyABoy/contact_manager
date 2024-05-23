import { Component } from '@angular/core';
import { ContatctService } from '../contatct.service';
import { Contact } from '../../models/contact';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-new-contact',
  templateUrl: './add-new-contact.component.html',
  styleUrl: './add-new-contact.component.css'
})
export class AddNewContactComponent {

  contact!: Contact;

  contactForm: FormGroup;
  contactId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private contactService: ContatctService,
    public router: Router,
    private route: ActivatedRoute
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      telephone: ['', Validators.required],
      mail: ['', Validators.required]
    });
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
      this.contactForm.patchValue(contact);
    } catch (error) {
      console.error('Error loading contact:', error);
    }
  }

  async onSubmit() {
    if (this.contactForm.valid) {
      try {
        let id = localStorage.getItem('id')
        let newContact
        if (id) {
          newContact = {
            name: this.contactForm.value.name,
            telephone: this.contactForm.value.telephone,
            mail: this.contactForm.value.mail,
            user_id: +id
          }
        }
        await this.contactService.addcontact(newContact)
        this.router.navigate(['/contacts']);
      } catch (error) {
        console.error('Error saving contact:', error);
      }
    }
  }
}
