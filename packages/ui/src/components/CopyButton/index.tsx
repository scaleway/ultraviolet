import styled from '@emotion/styled'
import useClipboard from 'react-use-clipboard'
import type { Color } from '../../theme'
import { Icon } from '../Icon'
import { Tooltip } from '../Tooltip'

const COPY_DURATION = 2500

export const SIZES = {
  small: 32,
  large: 48,
} as const

/**
 * TODO: replace when buttonV2 will be available
 */
const StyledButton = styled('button', {
  shouldForwardProp: prop => !['size', 'sentiment', 'noBorder'].includes(prop),
})<{ size: number; sentiment: Color; noBorder?: boolean }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  background: transparent;
  color: ${({ theme, sentiment }) =>
    sentiment === 'primary'
      ? theme.colors.primary.textWeak
      : theme.colors.neutral.text};
  border: ${({ theme, noBorder, sentiment }) =>
    noBorder ? 'none' : `1px solid ${theme.colors[sentiment].borderWeak}`};
  border-radius: ${({ theme }) => theme.radii.default};
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  outline: none;

  &:hover {
    background: ${({ theme, sentiment }) =>
      theme.colors[sentiment].backgroundWeakHover};
  }

  &active,
  &:focus {
    box-shadow: ${({ theme }) => theme.shadows.focusPrimary};
  }
`

type CopyButtonProps = {
  size?: keyof typeof SIZES
  value: string
  copyText?: string
  copiedText?: string
  sentiment?: 'primary' | 'neutral'
  noBorder?: boolean
  className?: string
  'data-testid'?: string
}

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
    <Tooltip text={isCopied ? copiedText : copyText}>
      <StyledButton
        type="button"
        onClick={setCopied}
        size={SIZES[size]}
        sentiment={sentiment}
        noBorder={noBorder}
        className={className}
        data-testid={dataTestId}
        aria-label="Copy"
      >
        <Icon name={isCopied ? 'check' : 'copy-content'} size={16} />
      </StyledButton>
    </Tooltip>
  )
}
