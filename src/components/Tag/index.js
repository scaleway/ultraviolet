import { css } from '@emotion/react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React from 'react'
import ActivityIndicator from '../ActivityIndicator'
import Box from '../Box'
import Icon from '../Icon'
import Touchable from '../Touchable'

const disabledStyles = css`
  opacity: 0.5;
`

export const variantsContainer = {
  base: ({ theme }) => css`
    background-color: ${theme.colors.gray100};
    height: 24px;
    padding-left: 8px;
    padding-right: 8px;
  `,
  bordered: ({ theme }) => css`
    padding: 8px;
    border: 1px solid ${theme.colors.gray350};
  `,
}

const variantStyles = ({ variant, ...props }) =>
  variantsContainer[variant]?.(props)

const StyledContainer = styled(Box, {
  shouldForwardProp: prop => !['disabled', 'variant'].includes(prop),
})`
  ${({ disabled }) => disabled && disabledStyles}
  border-radius: 4px;
  justify-content: center;
  display: flex;
  ${variantStyles}
`

const StyledText = styled('span')`
  ${({ 'aria-disabled': disabled }) => disabled && disabledStyles}
  color: ${({ theme }) => theme.colors.gray700};
  font-size: 14px;
  align-self: center;
  max-width: 350px;
  overflow: hidden;
  white-space: pre;
  text-overflow: ellipsis;
`

const StyledTouchable = styled(Touchable, {
  shouldForwardProp: prop => !['variant'].includes(prop),
})`
  margin-left: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.colors.gray200};
    svg {
      fill: ${({ theme }) => theme.colors.primary};
    }
  }
  ${({ variant }) =>
    variant === 'bordered' &&
    `
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.gray550};
  padding: 4px;
  width: 32px;
  height: 32px;
`}
`
const Tag = ({
  children,
  isLoading,
  onClose,
  textStyle,
  disabled,
  variant,
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
          <ActivityIndicator size={16} />
        ) : (
          <Icon name="close" size={16} color="gray550" />
        )}
      </StyledTouchable>
    )}
  </StyledContainer>
)

Tag.propTypes = {
  children: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  isLoading: PropTypes.bool,
  onClose: PropTypes.func,
  textStyle: PropTypes.shape({}),
  disabled: PropTypes.bool,
  variant: PropTypes.oneOf(Object.keys(variantsContainer)),
}

Tag.defaultProps = {
  variant: 'base',
  children: undefined,
  isLoading: false,
  disabled: false,
  textStyle: {},
  onClose: undefined,
}

export default Tag
