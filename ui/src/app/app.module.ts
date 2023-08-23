import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DeckListComponent } from './decks/deck-list.component';
import { InsightsComponent } from './insights/insights.component';
import { ManageComponent } from './manage/manage.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { DeckEditComponent } from './decks/deck-edit/deck-edit.component';
import { MatDividerModule } from '@angular/material/divider';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CardViewComponent } from './decks/card-view/card-view.component';
import { MarkdownModule } from 'ngx-markdown';
import { AnimateDirective } from './directives/animate.directive';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { CardEditComponent } from './decks/card-edit/card-edit.component';
import { DeckHelpComponent } from './decks/deck-help/deck-help.component';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatSelectModule } from '@angular/material/select';
import { HomeComponent } from './home/home.component';
// import {
//   GoogleLoginProvider,
//   SocialAuthServiceConfig,
//   SocialLoginModule,
// } from 'angularx-social-login';
import { QuizComponent } from './quiz/quiz.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { TrainComponent } from './train/train.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TrainInsightsComponent } from './train/train-insights/train-insights.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
const CLIENT_ID = environment.googleSocialLogin.clientId;
@NgModule({
  declarations: [
    AppComponent,
    DeckListComponent,
    InsightsComponent,
    ManageComponent,
    DeckEditComponent,
    CardViewComponent,
    AnimateDirective,
    CardEditComponent,
    DeckHelpComponent,
    HomeComponent,
    QuizComponent,
    TrainComponent,
    TrainInsightsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    HttpClientModule,
    MatSelectModule,
    MatProgressBarModule,
    HighchartsChartModule,
    MatSliderModule,
    MatSlideToggleModule,
    MarkdownModule.forRoot({ loader: HttpClient }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [
    MatIconRegistry,
    // {
    //   provide: 'SocialAuthServiceConfig',
    //   useValue: {
    //     autoLogin: true,
    //     providers: [
    //       {
    //         id: GoogleLoginProvider.PROVIDER_ID,
    //         provider: new GoogleLoginProvider(CLIENT_ID),
    //       },
    //     ],
    //   } as SocialAuthServiceConfig,
    // },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(
    public iconRegistry: MatIconRegistry,
    public translateService: TranslateService
  ) {
    iconRegistry.setDefaultFontSetClass('material-icons-round');

    translateService.addLangs(['en', 'de']);
    translateService.setDefaultLang('de');
    translateService.use('en');
  }
}
