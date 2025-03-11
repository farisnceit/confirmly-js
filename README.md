# Confirmly-Popup.js

A lightweight, customizable JavaScript confirmation popup library with TypeScript support. Built on top of Popper.js for perfect positioning and works seamlessly with Bootstrap, Tailwind CSS, or any custom styling.

## Live Demo

Check out the live demo to see Confirmly in action with various themes, placements, and customization options:

[**View Demo**](https://farisnceit.github.io/confirmly-js/)

## Features

- Perfect positioning with Popper.js
- Fully customizable template and styling
- Responsive and mobile-friendly
- TypeScript support
- Lightweight with minimal dependencies
- Easy to integrate with any framework
- ESM and UMD builds available

## Installation

```bash
npm i confirmly-popup.js
```

```bash
pnpm i confirmly-popup.js
```

Or use via CDN:

```html
<script src="https://unpkg.com/confirmly-popup.js@1.3.0/dist/confirmly-popup.umd.min.js"></script>
```

## Basic Usage

```javascript
import { ConfirmPopup } from 'confirmly-popup.js';

// Create a new confirmation popup
const popup = new ConfirmPopup({
  targetElement: document.querySelector('#myButton'),
  onConfirm: () => {
    console.log('Confirmed!');
  },
  onCancel: () => {
    console.log('Cancelled!');
  },
});
```

## Advanced Usage

```javascript
const popup = new ConfirmPopup({
  targetElement: document.querySelector('#myButton'),
  template: `
    <div class="my-custom-popup">
      <p>Are you really sure?</p>
      <div class="buttons">
        <button data-button="confirm">Yes, proceed</button>
        <button data-button="cancel">No, go back</button>
      </div>
      <div data-popper-arrow></div>
    </div>
  `,
  buttonClasses: {
    confirm: 'btn btn-primary',
    cancel: 'btn btn-secondary',
  },
  buttonContents: {
    confirm: 'Yes, proceed',
    cancel: 'No, go back',
  },
  defaultPlacement: 'top',
  showError: true,
  onConfirm: () => {
    console.log('Action confirmed');
  },
  onCancel: () => {
    console.log('Action cancelled');
  },
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
