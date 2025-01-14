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
  displayedColumns: string[] = ['firstname', 'lastname', 'email', 'actions'];

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
      <input id="swal-input5" class="swal2-input" placeholder="Password" type="password"> `,
      focusConfirm: false,
      preConfirm: () => {
        const firstname = (document.getElementById('swal-input1') as HTMLInputElement).value;
        const lastname = (document.getElementById('swal-input2') as HTMLInputElement).value;
        const email = (document.getElementById('swal-input3') as HTMLInputElement).value;
        const password = (document.getElementById('swal-input4') as HTMLInputElement).value;

        return { firstname, lastname, email, password };
      },
    }).then((result) => {
      if (result.value) {
        this.addUser(result.value);
      }
    });
  }


  editUserPrompt(user: User): void {
    Swal.fire({
      title: 'Edit User',
      html: `
        <input id="swal-input1" class="swal2-input" placeholder="First Name" value="${user.firstname}">
        <input id="swal-input2" class="swal2-input" placeholder="Last Name" value="${user.lastname}">
        <input id="swal-input3" class="swal2-input" placeholder="Email" value="${user.email}">
        <input id="swal-input4" class="swal2-input" placeholder="Password" type="password" value="${user.password}">
      `,
      focusConfirm: false,
      preConfirm: () => {
        const firstname = (document.getElementById('swal-input1') as HTMLInputElement).value;
        const lastname = (document.getElementById('swal-input2') as HTMLInputElement).value;
        const email = (document.getElementById('swal-input3') as HTMLInputElement).value;
        const password = (document.getElementById('swal-input4') as HTMLInputElement).value;

        return { ...user, firstname, lastname, email, password };
      },
    }).then((result) => {
      if (result.value) {
        this.updateUser(result.value);
      }
    });
  }


  confirmDelete(userId: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this user!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {

      if (result.isConfirmed) {

        this.deleteUser(userId);
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
