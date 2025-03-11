import { createPopper } from '@popperjs/core';

var ConfirmPopup = /** @class */ (function () {
    function ConfirmPopup(_a) {
        var template = _a.template, _b = _a.buttonClasses, buttonClasses = _b === void 0 ? {
            confirm: 'confirmly__button confirmly__button--confirm',
            cancel: 'confirmly__button confirmly__button--cancel',
        } : _b, _c = _a.buttonContents, buttonContents = _c === void 0 ? { confirm: 'Yes', cancel: 'No' } : _c, _d = _a.defaultPlacement, defaultPlacement = _d === void 0 ? 'top' : _d, targetElement = _a.targetElement, onConfirm = _a.onConfirm, onCancel = _a.onCancel, _e = _a.showError, showError = _e === void 0 ? true : _e;
        this.popperInstance = null;
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
    ConfirmPopup.prototype.defaultTemplate = function () {
        return "\n      <div class=\"confirmly__popup\">\n        <div class=\"confirmly__content\">\n          <p class=\"confirmly__message\">Are you sure?</p>\n          <div class=\"confirmly__buttons\">\n            <button class=\"{{cancelClass}}\" data-button=\"cancel\">{{cancelContent}}</button>\n            <button class=\"{{confirmClass}}\" data-button=\"confirm\">{{confirmContent}}</button>\n          </div>\n        </div>\n        <div class=\"confirmly__arrow\" data-popper-arrow></div>\n      </div>\n    ";
    };
    ConfirmPopup.prototype.createPopperElement = function () {
        var popperDiv = document.createElement('div');
        popperDiv.className = 'confirmly';
        popperDiv.style.display = 'none';
        var template = this.template
            .replace('{{confirmClass}}', this.buttonClasses.confirm)
            .replace('{{cancelClass}}', this.buttonClasses.cancel)
            .replace('{{confirmContent}}', this.buttonContents.confirm)
            .replace('{{cancelContent}}', this.buttonContents.cancel);
        popperDiv.innerHTML = template;
        this.attachButtonListeners(popperDiv);
        return popperDiv;
    };
    ConfirmPopup.prototype.attachButtonListeners = function (popperDiv) {
        var confirmButton = popperDiv.querySelector('[data-button="confirm"]');
        var cancelButton = popperDiv.querySelector('[data-button="cancel"]');
        if (confirmButton) {
            confirmButton.addEventListener('click', this.handleConfirm.bind(this));
        }
        if (cancelButton) {
            cancelButton.addEventListener('click', this.handleCancel.bind(this));
        }
    };
    ConfirmPopup.prototype.attach = function (element, onConfirm, onCancel) {
        var _this = this;
        if (!element && this.showError) {
            console.error('Target Element is not defined');
            return;
        }
        this.onConfirmCallback = onConfirm;
        this.onCancelCallback = onCancel;
        element === null || element === void 0 ? void 0 : element.addEventListener('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            _this.showPopper(element);
        });
        document.addEventListener('click', this.handleOutsideClick.bind(this));
        document.addEventListener('keydown', this.handleEscapeKey.bind(this));
    };
    ConfirmPopup.prototype.destroy = function () {
        if (this.popperInstance) {
            this.popperInstance.destroy();
            this.popperInstance = null;
        }
        this.popperElement.remove();
        document.removeEventListener('click', this.handleOutsideClick.bind(this));
        document.removeEventListener('keydown', this.handleEscapeKey.bind(this));
    };
    ConfirmPopup.prototype.handleOutsideClick = function (event) {
        if (!this.popperElement.contains(event.target)) {
            this.hidePopper();
        }
    };
    ConfirmPopup.prototype.handleEscapeKey = function (event) {
        if (event.key === 'Escape') {
            this.hidePopper();
        }
    };
    ConfirmPopup.prototype.showPopper = function (targetElement) {
        this.popperElement.style.display = 'block';
        var popup = this.popperElement.querySelector('.confirmly__popup');
        if (popup) {
            requestAnimationFrame(function () {
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
    };
    ConfirmPopup.prototype.hidePopper = function () {
        var _this = this;
        var popup = this.popperElement.querySelector('.confirmly__popup');
        if (popup) {
            popup.classList.remove('confirmly__popup--visible');
            setTimeout(function () {
                if (_this.popperInstance) {
                    _this.popperInstance.destroy();
                    _this.popperInstance = null;
                }
                _this.popperElement.style.display = 'none';
            }, 200);
        }
    };
    ConfirmPopup.prototype.handleConfirm = function () {
        var _a;
        (_a = this.onConfirmCallback) === null || _a === void 0 ? void 0 : _a.call(this);
        this.hidePopper();
    };
    ConfirmPopup.prototype.handleCancel = function () {
        var _a;
        (_a = this.onCancelCallback) === null || _a === void 0 ? void 0 : _a.call(this);
        this.hidePopper();
    };
    return ConfirmPopup;
}());

export { ConfirmPopup };
//# sourceMappingURL=confirmly-popup.esm.js.map
