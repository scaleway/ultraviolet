export const DROPDOWN_MAX_HEIGHT = 256

// Select all the items and the "add option" element
export const OPTION_SELECTOR =
  '#items > div[role="option"]:not([aria-disabled="true"]), #add-option'

export const SIZES_TAG = {
  gap: 8,
  paddings: 16,
  plusTag: 48,
}

export const INPUT_SIZE_HEIGHT = {
  large: '600',
  medium: '500',
  small: '400', // sizing theme tokens key
} as const
