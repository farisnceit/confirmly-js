var confirmly = (function (exports, core) {
  'use strict';

  function _classCallCheck(a, n) {
    if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
  }
  function _defineProperties(e, r) {
    for (var t = 0; t < r.length; t++) {
      var o = r[t];
      o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey(o.key), o);
    }
  }
  function _createClass(e, r, t) {
    return _defineProperties(e.prototype, r), Object.defineProperty(e, "prototype", {
      writable: false
    }), e;
  }
  function _defineProperty(e, r, t) {
    return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
      value: t,
      enumerable: true,
      configurable: true,
      writable: true
    }) : e[r] = t, e;
  }
  function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (undefined !== e) {
      var i = e.call(t, r);
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (String )(t);
  }
  function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
  }

  var ConfirmPopup = /*#__PURE__*/function () {
    function ConfirmPopup(_ref) {
      var template = _ref.template,
        _ref$buttonClasses = _ref.buttonClasses,
        buttonClasses = _ref$buttonClasses === undefined ? {
          confirm: 'confirmly__button confirmly__button--confirm',
          cancel: 'confirmly__button confirmly__button--cancel'
        } : _ref$buttonClasses,
        _ref$buttonContents = _ref.buttonContents,
        buttonContents = _ref$buttonContents === undefined ? {
          confirm: 'Yes',
          cancel: 'No'
        } : _ref$buttonContents,
        _ref$defaultPlacement = _ref.defaultPlacement,
        defaultPlacement = _ref$defaultPlacement === undefined ? 'top' : _ref$defaultPlacement,
        targetElement = _ref.targetElement,
        onConfirm = _ref.onConfirm,
        onCancel = _ref.onCancel,
        _ref$showError = _ref.showError,
        showError = _ref$showError === undefined ? true : _ref$showError;
      _classCallCheck(this, ConfirmPopup);
      _defineProperty(this, "popperInstance", null);
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
    return _createClass(ConfirmPopup, [{
      key: "defaultTemplate",
      value: function defaultTemplate() {
        return "\n      <div class=\"confirmly__popup\">\n        <div class=\"confirmly__content\">\n          <p class=\"confirmly__message\">Are you sure?</p>\n          <div class=\"confirmly__buttons\">\n            <button class=\"{{confirmClass}}\" data-button=\"cancel\">{{cancelContent}}</button>\n            <button class=\"{{confirmClass}}\" data-button=\"confirm\">{{confirmContent}}</button>\n          </div>\n        </div>\n        <div class=\"confirmly__arrow\" data-popper-arrow></div>\n      </div>\n    ";
      }
    }, {
      key: "createPopperElement",
      value: function createPopperElement() {
        var popperDiv = document.createElement('div');
        popperDiv.className = 'confirmly';
        popperDiv.style.display = 'none';
        var template = this.template.replace('{{confirmClass}}', this.buttonClasses.confirm).replace('{{cancelClass}}', this.buttonClasses.cancel).replace('{{confirmContent}}', this.buttonContents.confirm).replace('{{cancelContent}}', this.buttonContents.cancel);
        popperDiv.innerHTML = template;
        this.attachButtonListeners(popperDiv);
        return popperDiv;
      }
    }, {
      key: "attachButtonListeners",
      value: function attachButtonListeners(popperDiv) {
        var confirmButton = popperDiv.querySelector('[data-button="confirm"]');
        var cancelButton = popperDiv.querySelector('[data-button="cancel"]');
        if (confirmButton) {
          confirmButton.addEventListener('click', this.handleConfirm.bind(this));
        }
        if (cancelButton) {
          cancelButton.addEventListener('click', this.handleCancel.bind(this));
        }
      }
    }, {
      key: "attach",
      value: function attach(element, onConfirm, onCancel) {
        var _this = this;
        if (!element && this.showError) {
          console.error('Target Element is not defined');
          return;
        }
        this.onConfirmCallback = onConfirm;
        this.onCancelCallback = onCancel;
        element === null || element === undefined || element.addEventListener('click', function (event) {
          event.preventDefault();
          event.stopPropagation();
          _this.showPopper(element);
        });
        document.addEventListener('click', this.handleOutsideClick.bind(this));
        document.addEventListener('keydown', this.handleEscapeKey.bind(this));
      }
    }, {
      key: "destroy",
      value: function destroy() {
        if (this.popperInstance) {
          this.popperInstance.destroy();
          this.popperInstance = null;
        }
        this.popperElement.remove();
        document.removeEventListener('click', this.handleOutsideClick.bind(this));
        document.removeEventListener('keydown', this.handleEscapeKey.bind(this));
      }
    }, {
      key: "handleOutsideClick",
      value: function handleOutsideClick(event) {
        if (!this.popperElement.contains(event.target)) {
          this.hidePopper();
        }
      }
    }, {
      key: "handleEscapeKey",
      value: function handleEscapeKey(event) {
        if (event.key === 'Escape') {
          this.hidePopper();
        }
      }
    }, {
      key: "showPopper",
      value: function showPopper(targetElement) {
        this.popperElement.style.display = 'block';
        var popup = this.popperElement.querySelector('.confirmly__popup');
        if (popup) {
          // Add visible class after a small delay to trigger animation
          requestAnimationFrame(function () {
            popup.classList.add('confirmly__popup--visible');
          });
        }
        if (this.popperInstance) {
          this.popperInstance.destroy();
        }
        this.popperInstance = core.createPopper(targetElement, this.popperElement, {
          placement: this.defaultPlacement,
          modifiers: [{
            name: 'offset',
            options: {
              offset: [0, 8]
            }
          }, {
            name: 'arrow',
            options: {
              element: '[data-popper-arrow]',
              padding: 8
            }
          }, {
            name: 'preventOverflow',
            options: {
              padding: 8,
              boundary: 'viewport'
            }
          }]
        });
      }
    }, {
      key: "hidePopper",
      value: function hidePopper() {
        var _this2 = this;
        var popup = this.popperElement.querySelector('.confirmly__popup');
        if (popup) {
          popup.classList.remove('confirmly__popup--visible');
          // Wait for animation to complete
          setTimeout(function () {
            if (_this2.popperInstance) {
              _this2.popperInstance.destroy();
              _this2.popperInstance = null;
            }
            _this2.popperElement.style.display = 'none';
          }, 200);
        }
      }
    }, {
      key: "handleConfirm",
      value: function handleConfirm() {
        var _this$onConfirmCallba;
        (_this$onConfirmCallba = this.onConfirmCallback) === null || _this$onConfirmCallba === undefined || _this$onConfirmCallba.call(this);
        this.hidePopper();
      }
    }, {
      key: "handleCancel",
      value: function handleCancel() {
        var _this$onCancelCallbac;
        (_this$onCancelCallbac = this.onCancelCallback) === null || _this$onCancelCallbac === undefined || _this$onCancelCallbac.call(this);
        this.hidePopper();
      }
    }]);
  }();

  exports.ConfirmPopup = ConfirmPopup;

  return exports;

})({}, Popper);
//# sourceMappingURL=confirmly-popup.umd.js.map
