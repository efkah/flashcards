# Fk.Flashcards
A simple flashcard app.

## Development
This was a monorepo with backend at one point, hence excuse the structure. For development of the frontend, checkout `ui/README.md`.

## Roadmap

### Release 1.0

- [x] 🚧 AR: Remove Backend
- [x] 🚧 AR: Cleanup Knowledge Base
- [x] 🚀 Feature: Save Data in indexedDb
  - [x] 🐛 Fix: Card Preview does not work
  - [x] 🚀 Feature: Import export
- [ ] 🚀 Feature: Make Learning functionality
  - [x] 🚀 Feature: Build the Hello new User Deck
  - [x] 🐛 Fix: Make Language change work again
  - [x] 🐛 Fix: Fix Desktop Mode
  - [ ] 💡 TODO: Save data somewhere, if not in insights use localStorage
- [ ] 🐛 Fix: Remove unused parts (in Manage)
- [ ] 🚧 AR: Publish in App Store

### Release 1.1 (Planned)

- [ ] 🚀 Feature: Add Deck pictures as blob to indexeddb (users can upload)
- [ ] 🚀 Feature: Add Insights
  - [ ] 💡 TODO: Add train/quiz data to insights, preserve the data  
  - [ ] 💡 TODO: Draw ideas of how insights could look like  
  - [ ] 💡 TODO: Draw ideas of insights could enrich train/quiz

```js
// Insights Data could look like this
insights.decks[id].cards[id].quiz[session].good = true
insights.decks[id].cards[id].train[session].repeated = 5
insights.decks[id].cards[id].train[session].assessments[id] = Good
```