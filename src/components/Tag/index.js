import { css } from '@emotion/react'
import PropTypes from 'prop-types'
import React from 'react'
import { colors } from '../../theme'
import { ActivityIndicator } from '../ActivityIndicator'
import { Box } from '../Box'
import Icon from '../Icon'
import { Touchable } from '../Touchable'

export const styles = {
  container: css`
    border-radius: 4px;
    justify-content: center;
    display: flex;
  `,
  text: css`
    color: ${colors.gray700};
    font-size: 14px;
    align-self: center;
    max-width: 350px;
    overflow: hidden;
    white-space: pre;
    text-overflow: ellipsis;
  `,
  disabled: css`
    opacity: 0.5;
  `,
  icon: css`
    margin-left: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover,
    &:focus {
      background-color: ${colors.gray200};
      svg {
        fill: ${colors.primary};
      }
    }
  `,
  bordered: css`
    border-radius: 4px;
    border: 1px solid ${colors.gray550};
    padding: 4px;
    width: 32px;
    height: 32px;
  `,
}

export const variantsContainer = {
  base: css`
    background-color: ${colors.gray100};
    height: 24px;
    padding-left: 8px;
    padding-right: 8px;
  `,
  bordered: css`
    padding: 8px;
    border: 1px solid ${colors.gray350};
  `,
}

const Tag = ({
  children,
  isLoading,
  onClose,
  textStyle,
  disabled,
  variant,
  ...props
}) => (
  <Box
    {...props}
    css={[
      disabled && styles.disabled,
      styles.container,
      variantsContainer[variant],
    ]}
  >
    <span css={[disabled && styles.disabled, styles.text, textStyle]}>
      {children}
    </span>

    {onClose && (
      <Touchable
        onClick={!isLoading ? onClose : undefined}
        css={[styles.icon, variant === 'bordered' && styles.bordered]}
        disabled={disabled}
      >
        {isLoading ? (
          <ActivityIndicator size={16} />
        ) : (
          <Icon name="close" size={16} color="gray550" />
        )}
      </Touchable>
    )}
  </Box>
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

export { Tag }
