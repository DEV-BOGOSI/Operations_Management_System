import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../service/user.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-user',
  standalone: false,

  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit  {

  users: User[] = [];
  displayedColumns: string[] = ['firstname', 'lastname', 'email', 'isActive'];

  constructor(private userService: UserService) {}

  ngOnInit(): void
  {
    this.userService.getUsers().subscribe((users) => (this.users = users));
  }

  addUserPrompt(): void {
    Swal.fire({
      title: 'Add New User',
      html: ` <input id="swal-input1" class="swal2-input" placeholder="First Name">
      <input id="swal-input2" class="swal2-input" placeholder="Last Name">
      <input id="swal-input3" class="swal2-input" placeholder="Email">
      <input id="swal-input4" class="swal2-input" type="checkbox"> Active
      <input id="swal-input5" class="swal2-input" placeholder="Password" type="password"> `,
      focusConfirm: false,
      preConfirm: () => {
        const firstname = (document.getElementById('swal-input1') as HTMLInputElement).value;
        const lastname = (document.getElementById('swal-input2') as HTMLInputElement).value;
        const email = (document.getElementById('swal-input3') as HTMLInputElement).value;
        const isActive = (document.getElementById('swal-input4') as HTMLInputElement).checked;
        const password = (document.getElementById('swal-input5') as HTMLInputElement).value;

        return { firstname, lastname, email, isActive, password };
      },
    }).then((result) => {
      if (result.value) {
        this.addUser(result.value);
      }
    });
  }

  addUser(newUser: User): void {
    this.userService.addUser(newUser).subscribe(() => this.loadUsers());
  }

  updateUser(updatedUser: User): void {
    this.userService.updateUser(updatedUser).subscribe(() => this.loadUsers());
  }

  deleteUser(id: string): void {
    this.userService.deleteUser(id).subscribe(() => this.loadUsers());
  }

  private loadUsers(): void {
    this.userService.getUsers().subscribe((users) => (this.users = users));
  }

}
