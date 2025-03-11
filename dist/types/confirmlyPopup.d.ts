import { PopperOptions } from './constants';
import '../styles/confirmly-popup.scss';
export declare class ConfirmPopup {
    private popperInstance;
    private readonly template;
    private readonly buttonClasses;
    private readonly buttonContents;
    private readonly defaultPlacement;
    private readonly popperElement;
    private onConfirmCallback?;
    private onCancelCallback?;
    private readonly showError;
    constructor({ template, buttonClasses, buttonContents, defaultPlacement, targetElement, onConfirm, onCancel, showError, }: PopperOptions);
    private defaultTemplate;
    private createPopperElement;
    private attachButtonListeners;
    attach(element: HTMLElement, onConfirm?: () => void, onCancel?: () => void): void;
    destroy(): void;
    private handleOutsideClick;
    private handleEscapeKey;
    private showPopper;
    private hidePopper;
    private handleConfirm;
    private handleCancel;
}
