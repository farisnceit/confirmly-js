var confirmly = (function (exports, Popper) {
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

  var confirmPopup = /*#__PURE__*/function () {
    function confirmPopup(_ref) {
      var template = _ref.template,
        buttonClasses = _ref.buttonClasses,
        buttonContents = _ref.buttonContents,
        defaultPlacement = _ref.defaultPlacement,
        targetElement = _ref.targetElement,
        onConfirm = _ref.onConfirm,
        onCancel = _ref.onCancel,
        _ref$showError = _ref.showError,
        showError = _ref$showError === undefined ? true : _ref$showError;
      _classCallCheck(this, confirmPopup);
      _defineProperty(this, "popperInstance", null);
      this.template = template || this.defaultTemplate();
      this.buttonClasses = buttonClasses || {
        confirm: 'confirm-btn',
        cancel: 'cancel-btn'
      };
      this.buttonContents = buttonContents || {
        confirm: 'Yes',
        cancel: 'No'
      };
      this.defaultPlacement = defaultPlacement || 'top';
      this.showError = showError;
      this.popperElement = this.createPopperElement();
      document.body.appendChild(this.popperElement);
      this.attach(targetElement, onConfirm, onCancel);
    }
    return _createClass(confirmPopup, [{
      key: "defaultTemplate",
      value: function defaultTemplate() {
        return "\n      <div class=\"confirmation-content\">\n        <p>Are you sure?</p>\n        <div class=\"arrow\" data-popper-arrow></div>\n        <button class=\"{{confirmClass}}\" data-button=\"confirm\">{{confirmContent}}</button>\n        <button class=\"{{cancelClass}}\" data-button=\"cancel\">{{cancelContent}}</button>\n      </div>\n    ";
      }
    }, {
      key: "createPopperElement",
      value: function createPopperElement() {
        var popperDiv = document.createElement('div');
        popperDiv.className = 'confirmation-popper';
        popperDiv.style.display = 'none';
        popperDiv.style.position = 'absolute';
        var template = this.template.replace('{{confirmClass}}', this.buttonClasses.confirm).replace('{{cancelClass}}', this.buttonClasses.cancel).replace('{{confirmContent}}', this.buttonContents.confirm).replace('{{cancelContent}}', this.buttonContents.cancel);
        popperDiv.innerHTML = template;

        // Ensure event listeners are added dynamically after template insertion
        this.attachButtonListeners(popperDiv);
        return popperDiv;
      }
    }, {
      key: "attachButtonListeners",
      value: function attachButtonListeners(popperDiv) {
        var _this = this;
        var confirmButton = popperDiv.querySelector('[data-button="confirm"]');
        var cancelButton = popperDiv.querySelector('[data-button="cancel"]');
        if (confirmButton) {
          confirmButton.addEventListener('click', function () {
            _this.handleConfirm();
          });
        }
        if (cancelButton) {
          cancelButton.addEventListener('click', function () {
            _this.handleCancel();
          });
        }
      }
    }, {
      key: "attach",
      value: function attach(element, onConfirm, onCancel) {
        var _this2 = this;
        if (!!element && this.showError) {
          console.error('Target Element is not Defined');
        }
        element === null || element === undefined || element.addEventListener('click', function (event) {
          event.stopPropagation();
          _this2.showPopper(element, onConfirm, onCancel);
        });
        document.addEventListener('click', function (event) {
          if (!_this2.popperElement.contains(event.target)) {
            _this2.hidePopper();
          }
        });
      }
    }, {
      key: "showPopper",
      value: function showPopper(targetElement, onConfirm, onCancel) {
        this.onConfirmCallback = onConfirm;
        this.onCancelCallback = onCancel;
        this.popperElement.style.display = 'block';
        if (this.popperInstance) {
          this.popperInstance.destroy();
        }
        if (!!targetElement && this.showError) {
          console.error('Target Element is not Defined');
        }
        this.popperInstance = Popper.createPopper(targetElement, this.popperElement, {
          placement: this.defaultPlacement,
          modifiers: [{
            name: 'offset',
            options: {
              offset: [0, 8]
            }
          }, {
            name: 'arrow',
            options: {
              element: '[data-popper-arrow]'
            }
          }]
        });
      }
    }, {
      key: "hidePopper",
      value: function hidePopper() {
        if (this.popperInstance) {
          this.popperInstance.destroy();
          this.popperInstance = null;
        }
        this.popperElement.style.display = 'none';
      }
    }, {
      key: "handleConfirm",
      value: function handleConfirm() {
        if (this.onConfirmCallback) {
          this.onConfirmCallback();
        }
        this.hidePopper();
      }
    }, {
      key: "handleCancel",
      value: function handleCancel() {
        if (this.onCancelCallback) {
          this.onCancelCallback();
        }
        this.hidePopper();
      }
    }]);
  }();

  exports.confirmPopup = confirmPopup;

  return exports;

})({}, Popper);
//# sourceMappingURL=confirmly-popup.umd.js.map
