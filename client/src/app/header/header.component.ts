import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  isAuthenticated() {
    return this.authService.isAuthenticated;
  }

  getUserAliasName(): null | string {
    if (!this.isAuthenticated()) return null;
    return this.authService.userData!.username;
  }
}
