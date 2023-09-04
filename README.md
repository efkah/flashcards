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
- [x] 🚀 Feature: Make Learning functionality
  - [x] 🚀 Feature: Build the Hello new User Deck
  - [x] 🐛 Fix: Make Language change work again
  - [x] 🐛 Fix: Fix Desktop Mode
- [x] 🐛 Fix: Remove unused parts (in Manage)

### Release 1.1 (Planning)

- [ ] 🚀 Feature: Add Deck pictures as blob to indexeddb (users can upload)

```js
function encodeImageFileAsURL(element) {
  var file = element.files[0];
  var reader = new FileReader();
  reader.onloadend = function() {
    console.log('RESULT', reader.result)
  }
  reader.readAsDataURL(file);
```

- [x] 🚀 Feature: Move Manage to top right, remove main-navigation
- [ ] 🚀 Feature: In place Edit for Cards while in session mode (for quick correction like wrong spelling)
- [ ] 🚀 Feature: Make Import Export use ExcelJS
- [x] 🚧 AR: Replace Highcharts with d3.js
- [ ] 🚧 AR: Publish in App Store
- [ ] 🐛 Fix: Current State in Train shows weird numbers
 
### Dismissed and Future Ideas

- [ ] 🚀 Dismissed Feature: Add Insights (a place where to look at your training statistics)
  - [ ] 💡 TODO: Add train/quiz data to insights, preserve the data  
  - [ ] 💡 TODO: Draw ideas of how insights could look like  
  - [ ] 💡 TODO: Draw ideas of insights could enrich train/quiz

```js
// Insights Data could look like this
insights.decks[id].cards[id].quiz[session].good = true
insights.decks[id].cards[id].train[session].repeated = 5
insights.decks[id].cards[id].train[session].assessments[id] = Good
```