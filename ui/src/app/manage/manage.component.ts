import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { from } from 'rxjs';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss'],
})
export class ManageComponent implements OnInit {
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
    private readonly snackBar: MatSnackBar,
    private readonly dbService: DbService
  ) {}

  ngOnInit(): void {
    this.manageForm.controls['language'].setValue(
      this.translateService.currentLang
    );

    this.manageForm.valueChanges.subscribe((controls) => {
      this.translateService.use(controls['language']);
    });
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
