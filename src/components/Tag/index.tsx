import { Interpolation, Theme, css } from '@emotion/react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React, { FunctionComponent, MouseEventHandler, ReactNode } from 'react'
import ActivityIndicator from '../ActivityIndicator'
import Box, { XStyledProps } from '../Box'
import Icon from '../Icon'
import Touchable from '../Touchable'

const disabledStyles = css`
  opacity: 0.5;
`

export const variantsContainer = {
  base: ({ theme }: { theme: Theme }) => css`
    background-color: ${theme.colorsDeprecated.gray100};
    height: 24px;
    padding-left: 8px;
    padding-right: 8px;
  `,
  bordered: ({ theme }: { theme: Theme }) => css`
    padding: 8px;
    border: 1px solid ${theme.colorsDeprecated.gray350};
  `,
}

type TagVariant = keyof typeof variantsContainer

const variantStyles = ({
  variant,
  ...props
}: {
  variant: TagVariant
  theme: Theme
}) => variantsContainer[variant]?.(props)

type StyledContainerProps = {
  disabled: boolean
  variant: TagVariant
} & XStyledProps

const StyledContainer = styled(Box, {
  shouldForwardProp: props =>
    !['disabled', 'variant'].includes(props.toString()),
})<StyledContainerProps>`
  ${({ disabled }) => disabled && disabledStyles}
  border-radius: 4px;
  justify-content: center;
  display: flex;
  ${variantStyles}
`

const StyledText = styled('span')`
  ${({ 'aria-disabled': disabled }) => disabled && disabledStyles}
  color: ${({ theme }) => theme.colorsDeprecated.gray700};
  font-size: 14px;
  align-self: center;
  max-width: 350px;
  overflow: hidden;
  white-space: pre;
  text-overflow: ellipsis;
`

const StyledTouchable = styled(Touchable, {
  shouldForwardProp: props => !['variant'].includes(props.toString()),
})<{ variant: TagVariant }>`
  margin-left: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.colorsDeprecated.gray200};
    svg {
      fill: ${({ theme }) => theme.colorsDeprecated.primary};
    }
  }
  ${({ variant, theme }) =>
    variant === 'bordered' &&
    `
  border-radius: 4px;
  border: 1px solid ${theme.colorsDeprecated.gray550};
  padding: 4px;
  width: 32px;
  height: 32px;
`}
`

type TagProps = {
  children: ReactNode
  disabled?: boolean
  isLoading?: boolean
  onClose?: MouseEventHandler<HTMLButtonElement>
  textStyle?: Interpolation<Theme>
  variant?: TagVariant
} & XStyledProps

const Tag: FunctionComponent<TagProps> = ({
  children,
  isLoading = false,
  onClose,
  textStyle = {},
  disabled = false,
  variant = 'base',
  ...props
}) => (
  <StyledContainer {...props} disabled={disabled} variant={variant}>
    <StyledText aria-disabled={disabled} css={[textStyle]}>
      {children}
    </StyledText>

    {onClose && (
      <StyledTouchable
        onClick={!isLoading ? onClose : undefined}
        variant={variant}
        disabled={disabled}
      >
        {isLoading ? (
          <ActivityIndicator active size={16} />
        ) : (
          <Icon name="close" size={16} color="gray550" />
        )}
      </StyledTouchable>
    )}
  </StyledContainer>
)

Tag.propTypes = {
  children: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  onClose: PropTypes.func,
  textStyle: PropTypes.shape({}),
  variant: PropTypes.oneOf<TagVariant>(
    Object.keys(variantsContainer) as TagVariant[],
  ),
}

export default Tag
