import type { ModalPlacement, ModalSize } from './types'

export const MODAL_WIDTH: Record<ModalSize, number> = {
  large: 53.125, // in rem
  medium: 44.25,
  small: 38.5,
  xsmall: 25,
  xxsmall: 22.5,
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
    margin-top: 0;
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
