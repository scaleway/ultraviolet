import styled from '@emotion/styled'
import { transparentize } from 'polished'
import PropTypes from 'prop-types'
import React, { useMemo } from 'react'
import flattenChildren from 'react-flatten-children'
import ActivityIndicator from '../ActivityIndicator'
import Box from '../Box'
import Icon from '../Icon'

const StyledContainer = styled(Box)`
  position: relative;
  display: flex;
  justify-content: center;
`

const StyledSelect = styled('select', {
  shouldForwardProp: prop => !['isLoading', 'error'].includes(prop),
})`
  transition: box-shadow 0.2s ease, border-color 0.2s ease;
  appearance: none;
  background-color: ${({ theme }) => theme.colors.white};
  background-image: none;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.gray350};
  border-style: solid;
  border-radius: ${({ theme }) => theme.radii.default};
  color: ${({ theme }) => theme.colors.black};
  display: block;
  height: ${({ theme }) => theme.space['6']};
  max-width: 100%;
  outline: none;
  position: relative;
  width: 100%;
  padding-left: ${({ theme }) => theme.space['1']};
  padding-right: ${({ theme }) => theme.space['4']};
  font-weight: 500;
  font-size: 16px;
  line-height: ${({ theme }) => theme.space['3']};

  &:focus {
    box-shadow: 0 0 0 2px
      ${({ theme }) => transparentize(0.75, theme.colors.primary)};
    border-color: ${({ theme }) => theme.colors.primary};
  }

  ${({ disabled, isLoading, theme }) =>
    disabled &&
    !isLoading &&
    `
      cursor: default;
      pointer-events: none;
      background: ${theme.colors.gray50};
      color: ${theme.colors.gray350};
      border-color: ${theme.colors.gray350};
    `}

  ${({ readOnly, theme }) =>
    readOnly &&
    `
      background: ${theme.colors.gray100};
      border-color: ${theme.colors.gray100};
      color: ${theme.colors.black};
    `}

  ${({ theme, error }) =>
    error &&
    `
      border-color: ${theme.colors.warning};
      color: ${theme.colors.warning};
    `}
`

const StyledChevron = styled.div`
  background-color: transparent;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  padding: ${({ theme }) => theme.space[1]};
`

const Select = ({
  styles: mainStyles,
  selectStyles,
  chevronStyles,
  error,
  disabled,
  readOnly,
  name,
  value,
  onChange,
  onBlur,
  required,
  arrowColor,
  children,
  id,
  isLoading,
  ...props
}) => {
  const disabledChildren = () =>
    flattenChildren(children).map((child, index) =>
      React.cloneElement(child, {
        key: index,
        disabled: true,
        ...child.props,
      }),
    )

  const color = useMemo(() => {
    if (arrowColor) return arrowColor
    if (error) return 'warning'
    if (disabled) return 'gray'

    return 'gray550'
  }, [arrowColor, error, disabled])

  return (
    <StyledContainer css={[...mainStyles]} {...props}>
      <StyledSelect
        css={[...selectStyles]}
        id={id}
        name={name}
        required={required}
        disabled={disabled || isLoading}
        isLoading={isLoading}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        readOnly={readOnly}
        error={error}
      >
        {readOnly ? disabledChildren() : children}
      </StyledSelect>

      <StyledChevron css={[...chevronStyles]}>
        {isLoading ? (
          <ActivityIndicator size={20} />
        ) : (
          <Icon name="chevron-down" size={11} color={color} />
        )}
      </StyledChevron>
    </StyledContainer>
  )
}

Select.Option = 'option'
Select.OptGroup = 'optgroup'

Select.defaultProps = {
  arrowColor: undefined,
  chevronStyles: [],
  children: null,
  disabled: false,
  error: undefined,
  id: undefined,
  isLoading: false,
  name: undefined,
  onBlur: undefined,
  onChange: () => {},
  readOnly: false,
  required: false,
  styles: [],
  selectStyles: [],
  value: undefined,
}

Select.propTypes = {
  arrowColor: PropTypes.string,
  chevronStyles: PropTypes.arrayOf(PropTypes.shape({})),
  children: PropTypes.node,
  disabled: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  id: PropTypes.string,
  isLoading: PropTypes.bool,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  name: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  styles: PropTypes.arrayOf(PropTypes.shape({})),
  selectStyles: PropTypes.arrayOf(PropTypes.shape({})),
  value: PropTypes.string,
}

export default Select
