import { offset, shift, arrow, autoUpdate, computePosition } from '@floating-ui/dom';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

class ConfirmPopup {
    constructor({ template, buttonClasses = {
        confirm: 'confirmly__button confirmly__button--confirm',
        cancel: 'confirmly__button confirmly__button--cancel',
    }, buttonContents = { confirm: 'Yes', cancel: 'No' }, defaultPlacement = 'top', targetElement, onConfirm, onCancel, showError = true, }) {
        this.cleanup = null;
        this.template = template || this.defaultTemplate();
        this.buttonClasses = buttonClasses;
        this.buttonContents = buttonContents;
        this.defaultPlacement = defaultPlacement;
        this.showError = showError;
        this.popperElement = this.createPopperElement();
        document.body.appendChild(this.popperElement);
        if (targetElement) {
            this.attach(targetElement, onConfirm, onCancel);
        }
        else if (this.showError) {
            console.error('Target Element is not defined');
        }
    }
    defaultTemplate() {
        return `
      <div class="confirmly__popup">
        <div class="confirmly__content">
          <p class="confirmly__message">Are you sure?</p>
          <div class="confirmly__buttons">
            <button class="{{cancelClass}}" data-button="cancel">{{cancelContent}}</button>
            <button class="{{confirmClass}}" data-button="confirm">{{confirmContent}}</button>
          </div>
        </div>
        <div class="confirmly__arrow" data-popper-arrow></div>
      </div>
    `;
    }
    createPopperElement() {
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
    attachButtonListeners(popperDiv) {
        const confirmButton = popperDiv.querySelector('[data-button="confirm"]');
        const cancelButton = popperDiv.querySelector('[data-button="cancel"]');
        if (confirmButton) {
            confirmButton.addEventListener('click', this.handleConfirm.bind(this));
        }
        if (cancelButton) {
            cancelButton.addEventListener('click', this.handleCancel.bind(this));
        }
    }
    attach(element, onConfirm, onCancel) {
        if (!element && this.showError) {
            console.error('Target Element is not defined');
            return;
        }
        this.onConfirmCallback = onConfirm;
        this.onCancelCallback = onCancel;
        element === null || element === undefined ? undefined : element.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            this.showPopper(element);
        });
        document.addEventListener('click', this.handleOutsideClick.bind(this));
        document.addEventListener('keydown', this.handleEscapeKey.bind(this));
    }
    destroy() {
        if (this.cleanup) {
            this.cleanup();
            this.cleanup = null;
        }
        this.popperElement.remove();
        document.removeEventListener('click', this.handleOutsideClick.bind(this));
        document.removeEventListener('keydown', this.handleEscapeKey.bind(this));
    }
    handleOutsideClick(event) {
        if (!this.popperElement.contains(event.target)) {
            this.hidePopper();
        }
    }
    handleEscapeKey(event) {
        if (event.key === 'Escape') {
            this.hidePopper();
        }
    }
    showPopper(targetElement) {
        this.popperElement.style.display = 'block';
        const popup = this.popperElement.querySelector('.confirmly__popup');
        if (popup) {
            requestAnimationFrame(() => {
                popup.classList.add('confirmly__popup--visible');
            });
        }
        const arrowElement = this.popperElement.querySelector('[data-popper-arrow]');
        const middleware = [
            offset(8),
            shift({ padding: 8 }),
            ...(arrowElement ? [arrow({ element: arrowElement, padding: 8 })] : []),
        ];
        const update = () => __awaiter(this, undefined, undefined, function* () {
            const { x, y, middlewareData } = yield computePosition(targetElement, this.popperElement, {
                placement: this.defaultPlacement,
                middleware,
            });
            this.popperElement.style.left = `${x}px`;
            this.popperElement.style.top = `${y}px`;
            if (arrowElement && middlewareData.arrow) {
                const { x: arrowX, y: arrowY } = middlewareData.arrow;
                const arrowStyles = {
                    left: arrowX != null ? `${arrowX}px` : '',
                    top: arrowY != null ? `${arrowY}px` : '',
                };
                (arrowElement).style.left = arrowStyles.left;
                (arrowElement).style.top = arrowStyles.top;
            }
        });
        this.cleanup = autoUpdate(targetElement, this.popperElement, update);
    }
    hidePopper() {
        const popup = this.popperElement.querySelector('.confirmly__popup');
        if (popup) {
            popup.classList.remove('confirmly__popup--visible');
            setTimeout(() => {
                this.popperElement.style.display = 'none';
            }, 200);
        }
    }
    handleConfirm() {
        var _a;
        (_a = this.onConfirmCallback) === null || _a === undefined ? undefined : _a.call(this);
        this.hidePopper();
    }
    handleCancel() {
        var _a;
        (_a = this.onCancelCallback) === null || _a === undefined ? undefined : _a.call(this);
        this.hidePopper();
    }
}

export { ConfirmPopup };
//# sourceMappingURL=confirmly-popup.esm.js.map
