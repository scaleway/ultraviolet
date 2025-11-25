'use client'

import { CloseIcon } from '@ultraviolet/icons'
import type { SENTIMENTS } from '../../../theme'
import { Button } from '../../Button'
import { closeButtonToaster } from '../styles.css'

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
    className={closeButtonToaster}
    onClick={closeToast}
    sentiment={sentiment}
    size="xsmall"
  >
    <CloseIcon />
  </Button>
)
