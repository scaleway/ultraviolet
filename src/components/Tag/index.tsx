import { Theme, useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import { MouseEventHandler, ReactNode, useMemo } from 'react'
import { Color, SENTIMENTS } from '../../theme'
import Icon, { IconName } from '../Icon'
import Loader from '../Loader'
import Touchable from '../Touchable'
import Typography from '../Typography'

const StyledContainer = styled('span', {
  shouldForwardProp: prop => !['variant'].includes(prop.toString()),
})<{ variant: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  border-radius: ${({ theme }) => theme.space['0.5']};
  padding: 0 ${({ theme }) => theme.space['1']};
  gap: ${({ theme }) => theme.space['1']};
  width: fit-content;
  height: 24px;
  ${({ variant }) => variant}
`

const StyledTypography = styled(Typography)`
  font-size: 12px;
  font-weight: 500;
  color: inherit;
`

const StyledTouchable = styled(Touchable, {
  shouldForwardProp: props => !['variant'].includes(props.toString()),
})<{ variant: Color }>`
  display: flex;
  align-items: center;
  svg {
    fill: ${({ theme }) => theme.colors.neutral.textWeak};
  }
  &:hover,
  &:focus {
    svg {
      fill: ${({ theme }) => theme.colors.neutral.textHover};
    }
  }
`
const generateStyles = ({
  theme,
}: {
  theme: Theme
}): Record<string, string> => {
  const text = 'text'
  const background = 'background'

  return {
    ...SENTIMENTS.reduce(
      (reducer, sentiment) => ({
        ...reducer,
        [sentiment]: `
      color: ${theme.colors[sentiment][text]};
      background: ${theme.colors[sentiment][background]}
    `,
      }),
      {},
    ),
    disabled: `
      color: ${theme.colors.neutral.textWeak};
      background: ${theme.colors.neutral.backgroundStrong};
    `,
    neutral: `
      color: ${theme.colors.neutral[text]};
      background: ${theme.colors.neutral[background]};
      border: solid 1px ${theme.colors.neutral.border};
    `,
  }
}

type TagProps = {
  isLoading?: boolean
  onClose?: MouseEventHandler<HTMLButtonElement>
  textStyle?: JSX.IntrinsicAttributes['css']
  variant?: Color
  /**
   * Defines icon to display on left side of badge. **Only available on medium and large sizes**.
   */
  disabled?: boolean
  icon?: IconName
  className?: string
  children: ReactNode
}

const Tag = ({
  children,
  isLoading = false,
  onClose,
  textStyle,
  icon,
  disabled = false,
  variant = 'neutral',
  className,
}: TagProps) => {
  const theme = useTheme()

  const generatedStyles = useMemo(() => generateStyles({ theme }), [theme])

  return (
    <StyledContainer
      variant={disabled ? generatedStyles.disabled : generatedStyles[variant]}
      className={className}
    >
      {icon ? <Icon name={icon} size={16} /> : null}
      <StyledTypography aria-disabled={disabled} css={textStyle}>
        {children}
      </StyledTypography>

      {onClose || isLoading ? (
        <StyledTouchable
          onClick={!isLoading ? onClose : undefined}
          variant={variant}
          disabled={disabled}
          aria-label="Close tag"
        >
          {isLoading ? (
            <Loader active size={16} />
          ) : (
            <Icon name="close" size={16} />
          )}
        </StyledTouchable>
      ) : null}
    </StyledContainer>
  )
}

export default Tag
