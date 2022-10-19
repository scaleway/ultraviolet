import styled from '@emotion/styled'
import useClipboard from 'react-use-clipboard'
import { Color } from '../../theme'
import Icon from '../Icon'
import Tooltip from '../Tooltip'

const COPY_DURATION = 2500

export const SIZES = {
  small: 32,
  large: 48,
} as const

/**
 * TODO: replace when buttonV2 will be available
 */
const StyledButton = styled('button', {
  shouldForwardProp: prop => !['size', 'variant'].includes(prop),
})<{ size: number; variant: Color; noBorder?: boolean }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  background: transparent;
  color: ${({ theme, variant }) =>
    variant === 'primary'
      ? theme.colors.primary.textWeak
      : theme.colors.neutral.text};
  border: ${({ theme, noBorder, variant }) =>
    noBorder ? 'none' : `1px solid ${theme.colors[variant].borderWeak}`};
  border-radius: ${({ theme }) => theme.radii.default};
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  outline: none;

  &:hover {
    background: ${({ theme, variant }) =>
      theme.colors[variant].backgroundWeakHover};
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
  variant?: 'primary' | 'neutral'
  noBorder?: boolean
  className?: string
}

const CopyButton = ({
  size = 'small',
  value,
  copyText = 'Copy',
  copiedText = 'Copied!',
  variant = 'primary',
  noBorder,
  className,
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
        variant={variant}
        noBorder={noBorder}
        className={className}
      >
        <Icon name={isCopied ? 'check' : 'copy-content'} size={16} />
      </StyledButton>
    </Tooltip>
  )
}

export default CopyButton
