import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardEditComponent } from './decks/card-edit/card-edit.component';
import { CardViewComponent } from './decks/card-view/card-view.component';
import { DeckEditComponent } from './decks/deck-edit/deck-edit.component';
import { DeckHelpComponent } from './decks/deck-help/deck-help.component';
import { DeckListComponent } from './decks/deck-list.component';
import { HomeComponent } from './home/home.component';
import { InsightsComponent } from './insights/insights.component';
import { ManageComponent } from './manage/manage.component';
import { QuizComponent } from './quiz/quiz.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'decks', component: DeckListComponent },
  { path: 'decks/help', component: DeckHelpComponent },
  { path: 'decks/:deck_id', component: DeckEditComponent },
  { path: 'decks/:deck_id/quiz', component: QuizComponent },
  { path: 'decks/:deck_id/cards/:card_id', component: CardViewComponent },
  { path: 'decks/:deck_id/cards/:card_id/edit', component: CardEditComponent },
  { path: 'insights', component: InsightsComponent },
  { path: 'manage', component: ManageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
