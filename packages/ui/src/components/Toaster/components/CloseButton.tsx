'use client'

import { CloseIcon } from '@ultraviolet/icons/CloseIcon'

import { Button } from '../../Button'
import { toasterStyle } from '../styles.css'

import type { SENTIMENTS } from '../../../theme'

type SENTIMENT = (typeof SENTIMENTS)[number]

type CloseButtonProps = {
  closeToast?: () => void
  sentiment: SENTIMENT
}

export const CloseButton = ({
  closeToast,
  sentiment = 'success',
}: CloseButtonProps) => (
  <Button
    aria-label="close"
    className={toasterStyle.closeButton}
    onClick={closeToast}
    sentiment={sentiment}
    size="xsmall"
  >
    <CloseIcon />
  </Button>
)
