import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { UserService } from '../../user.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {

  userData: any; 
  username: string = '';

  constructor(
  private dataService: DataService,
  private userService: UserService,
  private authService: AuthService,) {}

  ngOnInit() {
    this.loadUserData();
    console.log("usuario success component: ", this.username)
  }

  loadUserData() {
    this.username = this.userService.getUsername();
    this.dataService.getUserData(this.username).subscribe(
      (response) => {
          this.userData = response.userData;
          console.log('User data loaded:', this.userData);
      },
      (error) => {
        console.error('Error fetching user data:', error);
        
      }
    );

  }
  logout() {
    this.authService.logout(); 
  }
}
