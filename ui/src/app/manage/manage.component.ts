import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { from } from 'rxjs';
import { CardService } from '../services/card.service';
import { DbService } from '../services/db.service';
import { DeckService } from '../services/deck.service';
import { ManageService } from '../services/manage.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss'],
})
export class ManageComponent implements OnInit {
  // user?: SocialUser;
  showOfflineHint = false;
  confirmReset = false;

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
    private readonly snackBar: MatSnackBar,
    private readonly dbService: DbService
  ) {}

  ngOnInit(): void {
    // this.socialAuthService.authState.subscribe((user) => {
    //   if (user) {
    //     this.user = user;
    //     this.showOfflineHint = false;
    //     this.manageForm.controls['sync'].setValue('online');
    //     this.manageService.token = user.idToken;
    //   } else {
    //     this.user = undefined;
    //     this.manageForm.controls['sync'].setValue('offline');
    //     this.manageService.token = '';
    //   }
    // });

    this.manageForm.controls['language'].setValue(
      this.translateService.currentLang
    );

    // this.manageForm.valueChanges.subscribe((controls) => {
    //   this.translateService.use(controls['language']);

    //   if (controls['sync'] === 'online' && !this.user) {
    //     this.showOfflineHint = true;
    //     this.manageForm.controls['sync'].patchValue('offline');
    //   } else {
    //     this.manageService.sync = controls['sync'];
    //   }

    //   // This would be a good place to start a sync
    // });

    this.manageService
      .getBackendHealth()
      .subscribe((val) => (this.backendHealth = val));

    this.manageService
      .getDatabaseHealth()
      .subscribe((val) => (this.databaseHealth = val));
  }

  // signInWithGoogle(): void {
  //   // SMELL: Is claiming necessary?
  //   from(
  //     this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
  //   ).subscribe(() => {
  //     this.manageForm.controls['sync'].setValue('online');

  //     // This would be a good place to start a sync

  //     this.snackBar.open(
  //       this.translateService.instant('manage.snackBar.claimed'),
  //       this.translateService.instant('common.close'),
  //       {
  //         duration: 1800,
  //       }
  //     );
  //   });
  // }

  signOut(): void {
    // SMELL: What does this do?
    // this.socialAuthService.signOut().then(() => {
    //   this.deckService.removeAll();
    //   this.cardService.removeAll();
    //   this.snackBar.open(`Removed local changes.`, 'Close', {
    //     duration: 1800,
    //   });
    // });
    // console.info(this.user);
    // this.manageService.getToken().subscribe((t) => console.info(t));
  }

  resetDatabase(): void {
    this.confirmReset = true;
  }

  confirmResetDatabase(): void {
    from(this.dbService.resetDatabase()).subscribe((_) => {
      this.snackBar.open(
        this.translateService.instant('manage.snackBar.resetted'),
        this.translateService.instant('common.close'),
        {
          duration: 1800,
        }
      );
      this.confirmReset = false;
    });
  }

  importDatabase(event: Event): void {
    const input = event.target as HTMLInputElement;

    var fileReader = new FileReader();
    fileReader.onload = (e) => {
      const result = JSON.parse(e.target?.result as string);
      this.dbService.populateFromJSON(result);
    };
    fileReader.readAsText(input.files![0]);
  }

  async exportDatabase() {
    const data = await this.dbService.exportAsJSON();
    const fileName = 'flashcards-export.json',
      a = document.createElement('a'),
      json = JSON.stringify(data),
      blob = new Blob([json], { type: 'octet/stream' }),
      url = window.URL.createObjectURL(blob);
    document.body.appendChild(a);
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
