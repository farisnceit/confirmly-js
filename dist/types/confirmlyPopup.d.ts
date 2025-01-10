import { Placement } from '@popperjs/core';
interface PopperOptions {
    template?: string;
    buttonClasses?: {
        confirm: string;
        cancel: string;
    };
    buttonContents?: {
        confirm: string;
        cancel: string;
    };
    defaultPlacement?: Placement;
    targetElement: HTMLElement;
    onConfirm?: () => void;
    onCancel?: () => void;
}
export declare class ConfirmationPopper {
    private popperInstance;
    private template;
    private buttonClasses;
    private buttonContents;
    private defaultPlacement;
    private popperElement;
    private onConfirmCallback?;
    private onCancelCallback?;
    constructor({ template, buttonClasses, buttonContents, defaultPlacement, targetElement, onConfirm, onCancel, }: PopperOptions);
    private defaultTemplate;
    private createPopperElement;
    attach(element: HTMLElement, onConfirm?: () => void, onCancel?: () => void): void;
    private showPopper;
    private hidePopper;
    private handleConfirm;
    private handleCancel;
}
export {};
