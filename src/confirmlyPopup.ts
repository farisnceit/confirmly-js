import { createPopper, Instance as PopperInstance, Placement } from '@popperjs/core';
import { PopperOptions } from './constants';

export class ConfirmPopup {
  private popperInstance: PopperInstance | null = null;
  private readonly template: string;
  private readonly buttonClasses: { confirm: string; cancel: string };
  private readonly buttonContents: { confirm: string; cancel: string };
  private readonly defaultPlacement: Placement;
  private readonly popperElement: HTMLElement;
  private onConfirmCallback?: () => void;
  private onCancelCallback?: () => void;
  private readonly showError: boolean;

  constructor({
    template,
    buttonClasses = { 
      confirm: 'confirmly__button confirmly__button--confirm', 
      cancel: 'confirmly__button confirmly__button--cancel' 
    },
    buttonContents = { confirm: 'Yes', cancel: 'No' },
    defaultPlacement = 'top',
    targetElement,
    onConfirm,
    onCancel,
    showError = true,
  }: PopperOptions) {
    this.template = template || this.defaultTemplate();
    this.buttonClasses = buttonClasses;
    this.buttonContents = buttonContents;
    this.defaultPlacement = defaultPlacement;
    this.showError = showError;

    this.popperElement = this.createPopperElement();
    document.body.appendChild(this.popperElement);

    if (targetElement) {
      this.attach(targetElement, onConfirm, onCancel);
    } else if (this.showError) {
      console.error('Target Element is not defined');
    }
  }

  private defaultTemplate(): string {
    return `
      <div class="confirmly__popup">
        <div class="confirmly__content">
          <p class="confirmly__message">Are you sure?</p>
          <div class="confirmly__buttons">
            <button class="{{confirmClass}}" data-button="cancel">{{cancelContent}}</button>
            <button class="{{confirmClass}}" data-button="confirm">{{confirmContent}}</button>
          </div>
        </div>
        <div class="confirmly__arrow" data-popper-arrow></div>
      </div>
    `;
  }

  private createPopperElement(): HTMLElement {
    const popperDiv = document.createElement('div');
    popperDiv.className = 'confirmly';
    popperDiv.style.display = 'none';

    const template = this.template
      .replace('{{confirmClass}}', this.buttonClasses.confirm)
      .replace('{{cancelClass}}', this.buttonClasses.cancel)
      .replace('{{confirmContent}}', this.buttonContents.confirm)
      .replace('{{cancelContent}}', this.buttonContents.cancel);

    popperDiv.innerHTML = template;
    this.attachButtonListeners(popperDiv);

    return popperDiv;
  }

  private attachButtonListeners(popperDiv: HTMLElement): void {
    const confirmButton = popperDiv.querySelector('[data-button="confirm"]');
    const cancelButton = popperDiv.querySelector('[data-button="cancel"]');

    if (confirmButton) {
      confirmButton.addEventListener('click', this.handleConfirm.bind(this));
    }

    if (cancelButton) {
      cancelButton.addEventListener('click', this.handleCancel.bind(this));
    }
  }

  public attach(
    element: HTMLElement,
    onConfirm?: () => void,
    onCancel?: () => void,
  ): void {
    if (!element && this.showError) {
      console.error('Target Element is not defined');
      return;
    }

    this.onConfirmCallback = onConfirm;
    this.onCancelCallback = onCancel;

    element?.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      this.showPopper(element);
    });

    document.addEventListener('click', this.handleOutsideClick.bind(this));
    document.addEventListener('keydown', this.handleEscapeKey.bind(this));
  }

  public destroy(): void {
    if (this.popperInstance) {
      this.popperInstance.destroy();
      this.popperInstance = null;
    }
    this.popperElement.remove();
    document.removeEventListener('click', this.handleOutsideClick.bind(this));
    document.removeEventListener('keydown', this.handleEscapeKey.bind(this));
  }

  private handleOutsideClick(event: MouseEvent): void {
    if (!this.popperElement.contains(event.target as Node)) {
      this.hidePopper();
    }
  }

  private handleEscapeKey(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.hidePopper();
    }
  }

  private showPopper(targetElement: HTMLElement) {
    this.popperElement.style.display = 'block';
    const popup = this.popperElement.querySelector('.confirmly__popup');
    
    if (popup) {
      // Add visible class after a small delay to trigger animation
      requestAnimationFrame(() => {
        popup.classList.add('confirmly__popup--visible');
      });
    }

    if (this.popperInstance) {
      this.popperInstance.destroy();
    }

    this.popperInstance = createPopper(targetElement, this.popperElement, {
      placement: this.defaultPlacement,
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 8],
          },
        },
        {
          name: 'arrow',
          options: {
            element: '[data-popper-arrow]',
            padding: 8,
          },
        },
        {
          name: 'preventOverflow',
          options: {
            padding: 8,
            boundary: 'viewport',
          },
        },
      ],
    });
  }

  private hidePopper(): void {
    const popup = this.popperElement.querySelector('.confirmly__popup');
    
    if (popup) {
      popup.classList.remove('confirmly__popup--visible');
      // Wait for animation to complete
      setTimeout(() => {
        if (this.popperInstance) {
          this.popperInstance.destroy();
          this.popperInstance = null;
        }
        this.popperElement.style.display = 'none';
      }, 200);
    }
  }

  private handleConfirm(): void {
    this.onConfirmCallback?.();
    this.hidePopper();
  }

  private handleCancel(): void {
    this.onCancelCallback?.();
    this.hidePopper();
  }
}
