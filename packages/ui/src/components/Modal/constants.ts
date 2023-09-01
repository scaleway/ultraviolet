import type { ModalPlacement, ModalSize } from './types'

export const MODAL_WIDTH: Record<ModalSize, number> = {
  large: 850,
  medium: 708,
  small: 616,
  xsmall: 400,
  xxsmall: 360,
}

export const MODAL_PLACEMENT: Record<ModalPlacement, string> = {
  bottom: `
    margin: auto;
    margin-bottom: 0;
  `,
  'bottom-left': `
    margin: auto;
    margin-left: 0;
    margin-bottom: 0;
  `,
  'bottom-right': `
    margin: auto;
    margin-right: 0;
    margin-bottom: 0;
  `,
  center: `
    margin: auto;
  `,
  left: `
    margin: auto;
    margin-left: 0;
  `,
  right: `
    margin: auto;
    margin-right: 0;
  `,
  top: `
    margin: auto;
    margin-top: 0px;
  `,
  'top-left': `
    margin: auto;
    margin-left: 0;
    margin-top: 0;
  `,
  'top-right': `
    margin: auto;
    margin-right: 0;
    margin-top: 0;
  `,
}
