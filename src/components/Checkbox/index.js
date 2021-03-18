import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React, { useEffect, useMemo } from 'react'
import { Checkbox as ReakitCheckbox, useCheckboxState } from 'reakit/Checkbox'
import { ActivityIndicator } from '../ActivityIndicator'
import { Box } from '../Box'
import { Expandable } from '../Expandable'
import Icon from '../Icon'
import { Typography, typographyVariants } from '../Typography'

const StyledCheckBoxContainer = styled(Typography)(
  ({ 'aria-disabled': disabled }) => `
  position: relative;
    display: inline-flex;
    align-items: flex-start;
    cursor: ${disabled ? 'not-allowed' : 'pointer'};
`,
)

const StyledReakitCheckbox = styled(ReakitCheckbox, {
  shouldForwardProp: prop => !['hasChildren', 'size'].includes(prop),
})(
  ({ theme, hasChildren, size, disabled }) => `
  opacity: 0.01;
    width: ${size}px;
    height: ${size}px;
    position: absolute;
    cursor: pointer;
    margin-right: ${hasChildren ? '10px' : 0};
    padding: 2px;
    pointer-events: auto;
    &:hover {
      svg {
        border-radius: ${theme.radii.default};
        background-color: ${!disabled && theme.colors.gray100};
        fill: ${!disabled && theme.colors.primary};
        transition: fill 300ms;
      }
    }
    &:focus + svg {
      outline: 1px ${theme.colors.gray550} dotted;
    }
`,
)

const StyledIcon = styled(Icon)`
  box-sizing: content-box;
`

const StyledChildrenContainer = styled('div', {
  shouldForwardProp: prop => !['size'].includes(prop),
})`
  padding-top: ${({ size }) => (size > 27 ? '4px' : '2px')};
`

const Checkbox = ({
  checked,
  onChange,
  onFocus,
  onBlur,
  valid,
  error,
  name,
  value,
  size,
  children,
  progress,
  disabled,
  autoFocus,
  typographyVariant,
  ...props
}) => {
  const hasChildren = !!children
  const checkbox = useCheckboxState({ state: checked })
  const color = useMemo(() => {
    if (disabled) return 'gray100'
    if (valid === false || !!error) return 'warning'
    if (valid === true) return 'success'
    if (checked) return 'primary'

    return 'gray300'
  }, [disabled, valid, checked, error])

  const { setState } = checkbox
  useEffect(() => {
    setState(checked)
  }, [setState, checked])

  return (
    <Box {...props}>
      <StyledCheckBoxContainer
        as="label"
        variant={typographyVariant}
        aria-disabled={disabled}
      >
        <StyledReakitCheckbox
          {...checkbox}
          hasChildren={hasChildren}
          size={size}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          checked={checked}
          disabled={disabled}
          value={value}
          name={name}
          autoFocus={autoFocus}
        />
        {progress ? (
          <ActivityIndicator size={size} mr={hasChildren ? 1 : 0} />
        ) : (
          <StyledIcon
            mr={hasChildren ? '10px' : 0}
            p="2px"
            name={
              checkbox?.state
                ? 'checkbox-marked-outline'
                : 'checkbox-blank-outline'
            }
            color={color}
            size={size}
          />
        )}
        {hasChildren && (
          <StyledChildrenContainer>{children}</StyledChildrenContainer>
        )}
      </StyledCheckBoxContainer>
      <Expandable height={56} overflow="hidden" opened={!!error}>
        <Box fontSize={12} color="warning" px="4px">
          {error}
        </Box>
      </Expandable>
    </Box>
  )
}

Checkbox.defaultProps = {
  autoFocus: false,
  checked: false,
  children: '',
  disabled: false,
  error: undefined,
  onBlur: () => {},
  onFocus: () => {},
  progress: false,
  name: 'checkbox',
  size: 24,
  typographyVariant: 'default',
  valid: undefined,
  value: undefined,
}

Checkbox.propTypes = {
  autoFocus: PropTypes.bool,
  checked: PropTypes.bool,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  progress: PropTypes.bool,
  name: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.number,
  ]),
  valid: PropTypes.bool,
  size: PropTypes.number,
  typographyVariant: PropTypes.oneOf(typographyVariants),
}

export default Checkbox
