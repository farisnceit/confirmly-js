import { Placement } from '@floating-ui/dom';
export interface PopperOptions {
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
    showError: boolean;
}
