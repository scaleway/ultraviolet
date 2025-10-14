import type { ModalSize } from './types'

export const MODAL_WIDTH: Record<ModalSize, number> = {
  large: 53.125, // in rem
  medium: 44.25,
  small: 38.5,
  xsmall: 25,
  xxsmall: 22.5,
}

export const MODAL_PLACEMENT = {
  bottom: {
    margin: 'auto',
    marginBottom: 0,
  },
  'bottom-left': {
    margin: 'auto',
    marginBottom: 0,
    marginLeft: 0,
  },
  'bottom-right': {
    margin: 'auto',
    marginBottom: 0,
    marginRight: 0,
  },
  center: {
    margin: 'auto',
  },
  left: {
    margin: 'auto',
    marginLeft: 0,
  },
  right: {
    margin: 'auto',
    marginRight: 0,
  },
  top: {
    margin: 'auto',
    marginTop: 0,
  },
  'top-left': {
    margin: 'auto',
    marginLeft: 0,
    marginTop: 0,
  },
  'top-right': {
    margin: 'auto',
    marginRight: 0,
    marginTop: 0,
  },
}
