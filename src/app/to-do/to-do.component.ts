import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit {

  toDoItems;
  currentUser;
  newToDoTitle;

  constructor(private router: Router, private service: UserService) { }

  ngOnInit() {
    this.service.getToDoItems().subscribe(
      res => {
        this.toDoItems = res;
      },
      err => {
        console.log(err);
      },
    );
    this.service.getUserProfile().subscribe(
      res => {
        this.currentUser = res;
      },
      err => {
        console.log(err);
      },
    );
  }


  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }

  onUserInfo() {
    this.router.navigate(['/home']);
  }

  onAddToDo() {
    let toDoItem = {
      title: this.newToDoTitle,
      text: '',
      isDone: false,
    }

    this.toDoItems.push(toDoItem);
    
    this.service.postToDoItem(toDoItem).subscribe(
      res => {

      },
      err => {
        console.log(err);
      }
    )
  }

}
