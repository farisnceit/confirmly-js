# Confirmly-Popup.js

A lightweight, customizable JavaScript confirmation popup library with TypeScript support. Built on top of Popper.js for perfect positioning and works seamlessly with Bootstrap, Tailwind CSS, or any custom styling.

<span style="color: white; background-color: oklch(0.546 0.245 262.881); padding:4px 16px; font-size:18px; border-radius:12px">A lightweight Javascript confirmation plugin 🚀 No Hassle!</span>

![GitHub Release](https://img.shields.io/github/v/release/farisnceit/confirmly-js)
![NPM Version](https://img.shields.io/npm/v/confirmly-popup.js)
![](https://img.shields.io/github/issues/farisnceit/confirmly-js)
![NPM License](https://img.shields.io/npm/l/confirmly-popup.js)

## Live Demo

Check out the live demo to see Confirmly in action with various themes, placements, and customization options:

[**View Demo & Docs**](https://farisnceit.github.io/confirmly-js/)

## Features

- Perfect positioning with Popper.js
- Fully customizable template and styling
- Responsive and mobile-friendly
- TypeScript support
- Lightweight with minimal dependencies
- Easy to integrate with any framework
- ESM and UMD builds available

## Installation

### NPM

```bash
npm install confirmly-popup.js
```

### PNPM

```bash
pnpm add confirmly-popup.js
```

### CDN

Add the following script tags to your HTML file:

```html
<!-- Development version -->
<script src="https://cdn.jsdelivr.net/npm/confirmly-popup.js@latest/dist/confirmly-popup.umd.js"></script>

<!-- Production version (minified) -->
<script src="https://cdn.jsdelivr.net/npm/confirmly-popup.js@latest/dist/confirmly-popup.umd.min.js"></script>

<!-- CSS file (required) -->
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/confirmly-popup.js@latest/styles/confirmly-popup.css"
/>
```

## Basic Usage

### ES Modules

```javascript
import { ConfirmPopup } from 'confirmly-popup.js';
import 'confirmly-popup.js/styles.css';

// Create a new confirmation popup
const popup = new confirmly.ConfirmPopup({
  targetElement: document.querySelector('#myButton'),
  onConfirm: () => {
    console.log('Confirmed!');
  },
  onCancel: () => {
    console.log('Cancelled!');
  },
});
```

### CommonJS

```javascript
const { ConfirmPopup } = require('confirmly-popup.js');
require('confirmly-popup.js/styles.css');

// Create a new confirmation popup
const popup = new confirmly.ConfirmPopup({
  targetElement: document.querySelector('#myButton'),
  onConfirm: () => {
    console.log('Confirmed!');
  },
  onCancel: () => {
    console.log('Cancelled!');
  },
});
```

### Browser (UMD)

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/confirmly-popup.js@latest/styles/confirmly-popup.css">
</head>
<body>
  <button id="myButton">Delete Item</button>

  <script src="https://unpkg.com/@popperjs/core@2.11.6/dist/umd/popper.min.js"></script>
  <script src=https://cdn.jsdelivr.net/npm/confirmly-popup.js@latest/dist/confirmly-popup.umd.min.js"></script>

  <script>
    const popup = new confirmly.ConfirmPopup({
      targetElement: document.querySelector('#myButton'),
      onConfirm: () => {
        console.log('Confirmed!');
      },
      onCancel: () => {
        console.log('Cancelled!');
      },
    });
  </script>
</body>
</html>
```

new confirmly.ConfirmPopup

## Framework Integration

### Bootstrap

```javascript
const popup = new confirmly.ConfirmPopup({
  targetElement: document.querySelector('#myButton'),
  buttonClasses: {
    confirm: 'btn btn-primary',
    cancel: 'btn btn-secondary',
  },
  template: `
    <div class="card shadow-sm">
      <div class="card-body">
        <p class="mb-3">Are you sure you want to proceed?</p>
        <div class="d-flex justify-content-end gap-2">
          <button data-button="cancel">Cancel</button>
          <button data-button="confirm">Confirm</button>
        </div>
      </div>
      <div data-popper-arrow></div>
    </div>
  `,
});
```

### Tailwind CSS

```javascript
const popup = new confirmly.ConfirmPopup({
  targetElement: document.querySelector('#myButton'),
  buttonClasses: {
    confirm: 'px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600',
    cancel: 'px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300',
  },
  template: `
    <div class="bg-white rounded-lg shadow-lg p-4 max-w-sm">
      <p class="text-gray-700 mb-4">Are you sure you want to proceed?</p>
      <div class="flex justify-end space-x-2">
        <button data-button="cancel">Cancel</button>
        <button data-button="confirm">Confirm</button>
      </div>
      <div data-popper-arrow></div>
    </div>
  `,
});
```

### Material Design

```javascript
const popup = new confirmly.ConfirmPopup({
  targetElement: document.querySelector('#myButton'),
  buttonClasses: {
    confirm: 'mdc-button mdc-button--raised',
    cancel: 'mdc-button',
  },
  template: `
    <div class="mdc-card">
      <div class="mdc-card__content p-4">
        <p class="mdc-typography--body1">Are you sure you want to proceed?</p>
        <div class="mdc-card__actions">
          <button data-button="cancel">Cancel</button>
          <button data-button="confirm">Confirm</button>
        </div>
      </div>
      <div data-popper-arrow></div>
    </div>
  `,
});
```

## API Reference

### Options

| Option             | Type        | Default                                            | Description                                |
| ------------------ | ----------- | -------------------------------------------------- | ------------------------------------------ |
| `targetElement`    | HTMLElement | Required                                           | The element that triggers the popup        |
| `template`         | string      | Default template                                   | Custom HTML template for the popup         |
| `buttonClasses`    | object      | `{ confirm: 'confirm-btn', cancel: 'cancel-btn' }` | CSS classes for buttons                    |
| `buttonContents`   | object      | `{ confirm: 'Yes', cancel: 'No' }`                 | Button text content                        |
| `defaultPlacement` | string      | 'top'                                              | Popup placement (top, bottom, left, right) |
| `showError`        | boolean     | true                                               | Show console errors                        |
| `onConfirm`        | function    | undefined                                          | Callback for confirm action                |
| `onCancel`         | function    | undefined                                          | Callback for cancel action                 |

### Methods

- `attach(element, onConfirm, onCancel)`: Attach the popup to a new element
- `destroy()`: Clean up and remove the popup

## Styling

The popup comes with minimal default styling. You can easily customize it using CSS:

```css
.confirmly-wrapper {
  /* Your styles */
}

.confirmly-popup {
  background: white;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  padding: 1rem;
}

.confirmly-arrow {
  /* Arrow styles */
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - see LICENSE file for details
