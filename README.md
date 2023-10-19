# mysendingbox-node

## Description

**MySendingBox API wrapper**. It allows you to send postcards, letters, campaigns and more from your application.

It's the rebranded and refactored version of the [Seeuletter API wrapper](https://www.npmjs.com/package/seeuletter). If you manage to migrate from Seeuletter to MySendingBox, please read the [breaking changes](#breakingchanges).

## Prerequisites

This package is written in TypeScript and requires **Node.js** v14.21.3 or higher and **ESM** support.

## Documentation

You can find the documentation of the API here : [https://docs.mysendingbox.fr](https://docs.mysendingbox.fr)

## Installation

**BEFORE YOU INSTALL** : please read the [prerequisites](#prerequisites)

```bash
npm install mysendingbox
```

## Usage

```typescript
import { MySendingBox } from 'mysendingbox';

const config = {
  apiKey: "YOUR_API_KEY",
  host: "MSB_HOST",
}

const msb = new MySendingBox(config);

/** Create a letter */
msb.letter.create({
  description: "My first test letter",
  to: {
    name: "John Doe",
    company: "My Company",
    address_line1: "1 rue du Louvre",
    address_city: "Paris",
    address_postalcode: "75000",
    address_country: "France",
  },
  from: {
    name: "John Doe",
    company: "My Company",
    address_line1: "1 rue du Louvre",
    address_city: "Paris",
    address_postalcode: "75000",
    address_country: "France",
  },
  color: "bw",
  postage_type: "prioritaire",
  source_file: createReadStream('test.html'),
  source_file_type: "html",
  content: "My letter content",
  content_type: "text",
  variables: {
    nom: "wrapper variable test"
  }
}).then((letter) => {
  console.log(letter);
}).catch((err) => {
  console.log(err);
});

/** Retrieve a specific Letter */
msb.letter.findById("LETTER_ID").then((letter) => {
  console.log(letter);
}).catch((err) => {
  console.log(err);
});

/** Retrieve all letters */
msb.letter.find().then((letter) => {
  console.log(letter);
}).catch((err) => {
  console.log(err);
});
```

## BreakingChanges

### Seeuletter to MySendingBox instance

The Seeuletter instance has been renamed to MySendingBox. You have now to instanciate the class by yourself. The constructor has been updated to accept a config object instead of a string. The config object has three properties: `apiKey`, `host` and `timeout`. The `host` property is optional and defaults to `https://api.mysendingbox.com`.

```typescript
// Before
var Seeuletter = require('seeuletter')('YOUR_API_KEY');
```

```typescript
// After
import MySendingBox from 'mysendingbox';

const config = {
  apiKey: "YOUR_API_KEY", // required could be found in your MySendingBox dashboard
  host: "MSB_HOST", // optional, defaults to https://api.mysendingbox.com
  timeout: 3000, // optional, defaults to 5000
}

const msb = new MySendingBox(config);
```

### Seeuletter to MySendingBox Letters

The createElectronic method has been merged into a single method create. This method is now deprecated and you have to specify the channel of your choice `paper` or `electronic` as the create method first param.

```typescript
// Before
Seeuletter.letters.createElectronic({
  description: 'Test electronic letter from the Node.js Wrapper',
  to: {
    email: 'erlich.dumas@example.com',
    first_name: 'Erlich',
    last_name: 'Dumas',
    status: 'individual'
  },
  postage_type: 'lre',
  content: 'Please review the attached documents:',
  source_file: '<html>Hello, {{nom}}</html>',
  source_file_type: 'html',
  variables: {
    nom : 'Seeuletter'
  }
})
.then(function (response) {
  console.log('response : ', response);
})
.catch(function (err) {
  console.log('err : ', err);
});
```

```typescript
// After
mysendingbox.letter.create('paper', {
  description: "My first test letter",
  to: {
    name: "John Doe",
    company: "My Company",
    address_line1: "1 rue du Louvre",
    address_city: "Paris",
    address_postalcode: "75000",
    address_country: "France",
  },
  from: {
    name: "John Doe",
    company: "My Company",
    address_line1: "1 rue du Louvre",
    address_city: "Paris",
    address_postalcode: "75000",
    address_country: "France",
  },
  color: "bw",
  postage_type: "prioritaire",
  source_file: '<html>Test</html>',
  source_file_type: "html",
  content: "My letter content",
  content_type: "text",
  variables: {
    nom: "wrapper variable test"
  }
})
.then((letter) => {
  console.log(letter);
})
.catch((err) => {
  console.log(err);
});
```
