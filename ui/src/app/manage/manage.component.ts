import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import {
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
} from 'angularx-social-login';
import { first, of } from 'rxjs';
import { CardService } from '../services/card.service';
import { DeckService } from '../services/deck.service';
import { ManageService } from '../services/manage.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss'],
})
export class ManageComponent implements OnInit {
  user?: SocialUser;
  showOfflineHint = false;

  manageForm: FormGroup = this.formBuilder.group({
    language: null,
    sync: null,
  });

  langs = this.translateService.getLangs();

  syncStates = ['online', 'offline'];
  backendHealth = 'not available';
  databaseHealth = 'not available';

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly translateService: TranslateService,
    private readonly manageService: ManageService,
    private readonly deckService: DeckService,
    private readonly cardService: CardService,
    private readonly socialAuthService: SocialAuthService,
    private readonly snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((user) => {
      if (user) {
        this.user = user;
        this.showOfflineHint = false;
        this.manageForm.controls['sync'].setValue('online');
        this.manageService.token = user.idToken;
      } else {
        this.user = undefined;
        this.manageForm.controls['sync'].setValue('offline');
        this.manageService.token = '';
      }
    });

    this.manageForm.controls['language'].setValue(
      this.translateService.currentLang
    );

    this.manageForm.valueChanges.subscribe((controls) => {
      this.translateService.use(controls['language']);

      if (controls['sync'] === 'online' && !this.user) {
        this.showOfflineHint = true;
        this.manageForm.controls['sync'].patchValue('offline');
      } else {
        this.manageService.sync = controls['sync'];
      }

      this.deckService.syncronize();
      this.cardService.syncronize();
    });

    this.manageService
      .getBackendHealth()
      .subscribe((val) => (this.backendHealth = val));

    this.manageService
      .getDatabaseHealth()
      .subscribe((val) => (this.databaseHealth = val));
  }

  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(() => {
      this.manageForm.controls['sync'].setValue('online');
      this.deckService.claimAll();
      this.cardService.claimAll();

      this.snackBar.open(`Claimed unowned decks.`, 'Close', {
        duration: 1800,
      });
    });
  }

  signOut(): void {
    // this.socialAuthService.signOut().then(() => {
    //   this.deckService.removeAll();
    //   this.cardService.removeAll();

    //   this.snackBar.open(`Removed local changes.`, 'Close', {
    //     duration: 1800,
    //   });
    // });
    console.info(this.user);
    this.cardService.token().subscribe((t) => console.info(t));
  }
}
