import useClipboard from 'react-use-clipboard'
import { Button } from '../Button'

const COPY_DURATION = 2500

type CopyButtonProps = {
  size?: 'small' | 'large'
  value: string
  copyText?: string
  copiedText?: string
  sentiment?: 'primary' | 'neutral'
  noBorder?: boolean
  className?: string
  'data-testid'?: string
}

/**
 * CopyButton is a button that copies a given value to the clipboard.
 */
export const CopyButton = ({
  size = 'small',
  value,
  copyText = 'Copy',
  copiedText = 'Copied!',
  sentiment = 'primary',
  noBorder,
  className,
  'data-testid': dataTestId,
}: CopyButtonProps) => {
  const [isCopied, setCopied] = useClipboard(value, {
    successDuration: COPY_DURATION,
  })

  return (
    <Button
      type="button"
      onClick={setCopied}
      size={size}
      sentiment={sentiment}
      variant={noBorder ? 'ghost' : 'outlined'}
      className={className}
      data-testid={dataTestId}
      aria-label="Copy"
      icon={isCopied ? 'check' : 'copy-content'}
      tooltip={isCopied ? copiedText : copyText}
    />
  )
}
