import Popper from '@popperjs/core';

interface PopperOptions {
  template?: string;
  buttonClasses?: { confirm: string; cancel: string };
  buttonContents?: { confirm: string; cancel: string };
  defaultPlacement?: Popper.Placement;
  targetElement: HTMLElement;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export class confirmPopup {
  private popperInstance: any = null;
  private template: string;
  private buttonClasses: { confirm: string; cancel: string };
  private buttonContents: { confirm: string; cancel: string };
  private defaultPlacement: Popper.Placement;
  private popperElement: HTMLElement;
  private onConfirmCallback?: () => void;
  private onCancelCallback?: () => void;

  constructor({
    template,
    buttonClasses,
    buttonContents,
    defaultPlacement,
    targetElement,
    onConfirm,
    onCancel,
  }: PopperOptions) {
    this.template = template || this.defaultTemplate();
    this.buttonClasses = buttonClasses || {
      confirm: 'confirm-btn',
      cancel: 'cancel-btn',
    };
    this.buttonContents = buttonContents || { confirm: 'Yes', cancel: 'No' };
    this.defaultPlacement = defaultPlacement || 'top';

    this.popperElement = this.createPopperElement();
    document.body.appendChild(this.popperElement);

    this.attach(targetElement, onConfirm, onCancel);
  }

  private defaultTemplate(): string {
    return `
      <div class="confirmation-content">
        <p>Are you sure?</p>
        <div class="arrow" data-popper-arrow></div>
        <button class="{{confirmClass}}" data-button="confirm">{{confirmContent}}</button>
        <button class="{{cancelClass}}" data-button="cancel">{{cancelContent}}</button>
      </div>
    `;
  }

  private createPopperElement(): HTMLElement {
    const popperDiv = document.createElement('div');
    popperDiv.className = 'confirmation-popper';
    popperDiv.style.display = 'none';
    popperDiv.style.position = 'absolute';

    const template = this.template
      .replace('{{confirmClass}}', this.buttonClasses.confirm)
      .replace('{{cancelClass}}', this.buttonClasses.cancel)
      .replace('{{confirmContent}}', this.buttonContents.confirm)
      .replace('{{cancelContent}}', this.buttonContents.cancel);

    popperDiv.innerHTML = template;

    const confirmClass = this.buttonClasses.confirm.replace(' ', '.');

    popperDiv
      .querySelector(`[data-button="confirm"]`)
      ?.addEventListener('click', () => {
        this.handleConfirm();
      });

    const cancelClass = this.buttonClasses.cancel.replace(' ', '.');

    popperDiv
      .querySelector(`[data-button="cancel"]`)
      ?.addEventListener('click', () => {
        this.handleCancel();
      });

    return popperDiv;
  }

  public attach(
    element: HTMLElement,
    onConfirm?: () => void,
    onCancel?: () => void,
  ): void {
    element.addEventListener('click', (event) => {
      event.stopPropagation();
      this.showPopper(element, onConfirm, onCancel);
    });

    document.addEventListener('click', (event) => {
      if (!this.popperElement.contains(event.target as Node)) {
        this.hidePopper();
      }
    });
  }

  private showPopper(
    targetElement: HTMLElement,
    onConfirm?: () => void,
    onCancel?: () => void,
  ) {
    this.onConfirmCallback = onConfirm;
    this.onCancelCallback = onCancel;

    this.popperElement.style.display = 'block';

    if (this.popperInstance) {
      this.popperInstance.destroy();
    }

    this.popperInstance = Popper.createPopper(
      targetElement,
      this.popperElement,
      {
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
            },
          },
        ],
      },
    );
  }

  private hidePopper() {
    if (this.popperInstance) {
      this.popperInstance.destroy();
      this.popperInstance = null;
    }
    this.popperElement.style.display = 'none';
  }

  private handleConfirm() {
    if (this.onConfirmCallback) {
      this.onConfirmCallback();
    }
    this.hidePopper();
  }

  private handleCancel() {
    if (this.onCancelCallback) {
      this.onCancelCallback();
    }
    this.hidePopper();
  }
}
