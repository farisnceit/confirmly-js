'use strict';

var core = require('@popperjs/core');

// src/ConfirmationPopper.ts
var ConfirmationPopper = /** @class */ (function () {
    function ConfirmationPopper(_a) {
        var template = _a.template, buttonClasses = _a.buttonClasses, buttonContents = _a.buttonContents, defaultPlacement = _a.defaultPlacement, targetElement = _a.targetElement, onConfirm = _a.onConfirm, onCancel = _a.onCancel;
        this.popperInstance = null;
        this.template = template || this.defaultTemplate();
        this.buttonClasses = buttonClasses || { confirm: 'confirm-btn', cancel: 'cancel-btn' };
        this.buttonContents = buttonContents || { confirm: 'Yes', cancel: 'No' };
        this.defaultPlacement = defaultPlacement || 'top';
        this.popperElement = this.createPopperElement();
        document.body.appendChild(this.popperElement);
        this.attach(targetElement, onConfirm, onCancel);
    }
    ConfirmationPopper.prototype.defaultTemplate = function () {
        return "\n      <div class=\"confirmation-content\">\n        <p>Are you sure?</p>\n        <div class=\"arrow\" data-popper-arrow></div>\n        <button class=\"{{confirmClass}}\">{{confirmContent}}</button>\n        <button class=\"{{cancelClass}}\">{{cancelContent}}</button>\n      </div>\n    ";
    };
    ConfirmationPopper.prototype.createPopperElement = function () {
        var _this = this;
        var _a, _b;
        var popperDiv = document.createElement('div');
        popperDiv.className = 'confirmation-popper';
        popperDiv.style.display = 'none';
        popperDiv.style.position = 'absolute';
        var template = this.template
            .replace('{{confirmClass}}', this.buttonClasses.confirm)
            .replace('{{cancelClass}}', this.buttonClasses.cancel)
            .replace('{{confirmContent}}', this.buttonContents.confirm)
            .replace('{{cancelContent}}', this.buttonContents.cancel);
        popperDiv.innerHTML = template;
        (_a = popperDiv.querySelector(".".concat(this.buttonClasses.confirm))) === null || _a === undefined ? undefined : _a.addEventListener('click', function () {
            _this.handleConfirm();
        });
        (_b = popperDiv.querySelector(".".concat(this.buttonClasses.cancel))) === null || _b === undefined ? undefined : _b.addEventListener('click', function () {
            _this.handleCancel();
        });
        return popperDiv;
    };
    ConfirmationPopper.prototype.attach = function (element, onConfirm, onCancel) {
        var _this = this;
        element.addEventListener('click', function (event) {
            event.stopPropagation();
            _this.showPopper(element, onConfirm, onCancel);
        });
        document.addEventListener('click', function (event) {
            if (!_this.popperElement.contains(event.target)) {
                _this.hidePopper();
            }
        });
    };
    ConfirmationPopper.prototype.showPopper = function (targetElement, onConfirm, onCancel) {
        this.onConfirmCallback = onConfirm;
        this.onCancelCallback = onCancel;
        this.popperElement.style.display = 'block';
        if (this.popperInstance) {
            this.popperInstance.destroy();
        }
        this.popperInstance = core.createPopper(targetElement, this.popperElement, {
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
        });
    };
    ConfirmationPopper.prototype.hidePopper = function () {
        if (this.popperInstance) {
            this.popperInstance.destroy();
            this.popperInstance = null;
        }
        this.popperElement.style.display = 'none';
    };
    ConfirmationPopper.prototype.handleConfirm = function () {
        if (this.onConfirmCallback) {
            this.onConfirmCallback();
        }
        this.hidePopper();
    };
    ConfirmationPopper.prototype.handleCancel = function () {
        if (this.onCancelCallback) {
            this.onCancelCallback();
        }
        this.hidePopper();
    };
    return ConfirmationPopper;
}());

exports.ConfirmationPopper = ConfirmationPopper;
//# sourceMappingURL=confirmly-popup.cjs.js.map
