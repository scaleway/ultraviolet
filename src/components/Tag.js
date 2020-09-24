import { css } from '@emotion/core'
import { ActivityIndicator, Icon, Touchable} from './'
import { Box } from '@smooth-ui/core-em'
import React from 'react'
import { gray100, gray200, gray350, gray550, gray700 } from 'theming'
import { cx } from 'utils'

export const styles = {
  container: css`
    border-radius: 4px;
    justify-content: center;
    display: flex;
  `,
  text: p => css`
    color: ${gray700(p)};
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
  icon: p => css`
    margin-left: 16px;
    &:hover {
      background-color: ${gray200(p)};
    }
  `,
  bordered: p => css`
    border-radius: 4px;
    border: 1px solid ${gray550(p)};
    padding: 4px;
    width: 32px;
    height: 32px;
  `,
}

export const variantsContainer = {
  base: p => css`
    background-color: ${gray100(p)};
    height: 24px;
    padding-left: 8px;
    padding-right: 8px;
  `,
  bordered: p => css`
    padding: 8px;
    border: 1px solid ${gray350(p)};
  `,
}

export const Tag = ({
  children,
  isLoading,
  onClose,
  textStyle,
  disabled,
  variant = 'base',
  ...props
}) => (
  <Box
    {...props}
    css={cx([
      disabled && styles.disabled,
      styles.container,
      variantsContainer[variant],
    ])}
  >
    <span css={cx([disabled && styles.disabled, styles.text, textStyle])}>
      {children}
    </span>

    {onClose && (
      <Touchable
        onClick={!isLoading ? onClose : undefined}
        css={cx([styles.icon, variant === 'bordered' && styles.bordered])}
        disabled={disabled}
      >
        {isLoading ? (
          <ActivityIndicator size={16} />
        ) : (
          <Icon name="close" size={16} color="darkGrey" />
        )}
      </Touchable>
    )}
  </Box>
)
