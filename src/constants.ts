import Popper from '@popperjs/core';

export interface PopperOptions {
    template?: string;
    buttonClasses?: { confirm: string; cancel: string };
    buttonContents?: { confirm: string; cancel: string };
    defaultPlacement?: Popper.Placement;
    targetElement: HTMLElement;
    onConfirm?: () => void;
    onCancel?: () => void;
    showError: boolean;
}