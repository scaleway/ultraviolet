import useClipboard from 'react-use-clipboard'
import { Button } from '../Button'

const COPY_DURATION = 2500

type CopyButtonProps = {
  size?: 'xsmall' | 'small' | 'medium' | 'large'
  value: string
  copyText?: string
  copiedText?: string
  sentiment?: 'primary' | 'neutral'
  /**
   * @deprecated Use `bordered` instead
   */
  noBorder?: boolean
  bordered?: boolean
  className?: string
  'data-testid'?: string
  children?: string
  onCopy?: () => void
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
  bordered,
  className,
  children,
  'data-testid': dataTestId,
  onCopy,
}: CopyButtonProps) => {
  const [isCopied, setCopied] = useClipboard(value, {
    successDuration: COPY_DURATION,
  })

  return (
    <Button
      type="button"
      onClick={() => {
        setCopied()
        onCopy?.()
      }}
      size={size}
      sentiment={sentiment}
      variant={noBorder || !bordered ? 'ghost' : 'outlined'}
      className={className}
      data-testid={dataTestId}
      aria-label="Copy"
      icon={isCopied ? 'check' : 'copy-content'}
      tooltip={isCopied ? copiedText : copyText}
    >
      {children}
    </Button>
  )
}
