import { Component } from '@angular/core';
import { Contact } from '../../models/contact';
import { FilterPipe } from 'ngx-filter-pipe';
import { ContatctService } from '../contatct.service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent {

  contacts!: Contact[];
  contactFilter!: Contact;
  filterBy!: string;
  user!: any;

  constructor(
    private filterPipe: FilterPipe,
    private contactService: ContatctService,
    private router: Router ,
    private authService: AuthService
    ) {

  }

  ngOnInit() {
    this.contactFilter = {
      name: '',
      telephone: ''
    }
    this.filterBy = "nom"
    //this.contacts = this.contactService.getAllContact()

    this.loadContacts()

    let userid = localStorage.getItem("id")

    if(userid) {
      this.loadUser(+userid)
    }
  }

  public sortContactsDesc(): void {
    this.contacts = this.contacts.sort((a, b) => b.name.toLowerCase().localeCompare(a.name.toLowerCase()));
  }

  public sortContactsAsc() {
    this.contacts = this.contacts.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
  }

  onSelected(value: string) {
   this.filterBy = value
  }

  async loadUser(id:number){
    try {
      this.user = await this.authService.getUser(id)
    } catch (error) {
      
    }
  }

  async loadContacts() {
    try {
      let id = localStorage.getItem("id")
      if (id) {
        this.contacts = await this.contactService.getcontacts(+id);
      console.log(this.contacts); // Vérifiez que les projets sont bien récupérés
      }
    } catch (error) {
      console.error('Error loading projects:', error);
    }
  }

  deleteContact(id: number){
    this.contactService.deletecontact(id)
    this.loadContacts()
  }

  logout() {
    this.authService.logout()
    this.router.navigateByUrl('/connexion')
    }

}
