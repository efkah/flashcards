import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  SocialUser,
  SocialAuthService,
  GoogleLoginProvider,
} from 'angularx-social-login';
import { first, switchMap } from 'rxjs';
import { ManageService } from '../services/manage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private readonly manageService: ManageService,
    private readonly authService: SocialAuthService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.authService.authState.pipe(first()).subscribe((user) => {
      if (!user) {
        this.manageService.sync = 'offline';
      } else {
        this.manageService.token = user.idToken;
        this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
        this.router.navigate(['decks']);
      }
    });
  }
}
