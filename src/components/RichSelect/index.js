import { css, useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import { transparentize } from 'polished'
import PropTypes from 'prop-types'
import React, { useEffect, useMemo, useState } from 'react'
import flattenChildren from 'react-flatten-children'
import Select, { components } from 'react-select'
import isJSONString from '../../helpers/isJSON'
import { getUUID } from '../../utils'
import * as animations from '../../utils/animations'
import Box from '../Box'
import Expandable from '../Expandable'
import Icon from '../Icon'

const getControlColor = ({ state, error, theme }) => {
  if (state.isDisabled) return theme.colors.gray300
  if (error) return theme.colors.warning

  return theme.colors.gray700
}

const getPlaceholderColor = ({ state, error, theme }) => {
  if (state.isDisabled) return theme.colors.gray300
  if (error) return theme.colors.warning

  return theme.colors.gray550
}

const getOptionColor = ({ state, theme }) => {
  let color = theme.colors.gray700
  let backgroundColor = theme.colors.white

  if (state.isDisabled) {
    backgroundColor = theme.colors.gray50
    color = theme.colors.gray300
  } else if (state.isSelected) {
    backgroundColor = theme.colors.primary
    color = theme.colors.white
  } else if (state.isFocused) {
    backgroundColor = theme.colors.gray200
  }

  return { backgroundColor, color }
}

const getSelectStyles = ({
  error,
  customStyle,
  animation,
  animationDuration,
  noTopLabel,
  theme,
}) => ({
  control: (provided, state) => ({
    ...provided,
    backgroundColor: state.isDisabled
      ? theme.colors.gray50
      : theme.colors.white,
    borderColor: error ? theme.colors.warning : theme.colors.gray300,
    borderRadius: '4px',
    borderStyle: state.isDisabled ? 'none' : 'solid',
    borderWidth: state.isDisabled ? 0 : '1px',
    boxShadow: 'none',
    color: getControlColor({ error, state, theme }),
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: '24px',
    minHeight: '48px',
    transition: 'border-color 200ms ease, box-shadow 200ms ease',

    ...(!state.isDisabled && {
      ':focus-within': {
        borderColor: error ? theme.colors.warning : theme.colors.primary,
        boxShadow: `0 0 2px 2px ${transparentize(
          0.75,
          error ? theme.colors.warning : theme.colors.primary,
        )}`,
        svg: {
          fill: error ? theme.colors.warning : theme.colors.primary,
        },
      },
      ':hover': {
        borderColor: error ? theme.colors.warning : theme.colors.primary,
        svg: {
          fill: error ? theme.colors.warning : theme.colors.primary,
        },
      },
    }),
    ...((customStyle(state) || {}).control || {}),
    animation: animation
      ? `${animationDuration}ms ${animations[animation]}`
      : 'none',
  }),
  indicatorSeparator: (provided, state) => ({
    ...provided,
    backgroundColor: theme.colors.gray200,
    display: state.selectProps.time ? 'flex' : 'none',
    ...((customStyle(state) || {}).indicatorSeparator || {}),
  }),
  indicatorsContainer: provided => ({
    ...provided,
    maxHeight: '48px',
  }),
  menu: (provided, state) => ({
    ...provided,
    ...((customStyle(state) || {}).menu || {}),
  }),
  menuList: (provided, state) => ({
    ...provided,
    maxHeight: '225px',
    ...((customStyle(state) || {}).menuList || {}),
  }),
  menuPortal: (provided, state) => ({
    ...provided,
    zIndex: 10000,
    ...((customStyle(state) || {}).menuPortal || {}),
  }),
  multiValue: (provided, state) => ({
    ...provided,
    alignItems: 'center',
    backgroundColor: theme.colors.gray100,
    borderRadius: '4px',
    color: theme.colors.gray700,
    fontSize: '14px',
    fontWeight: 500,
    height: '24px',
    justifyContent: 'center',
    textOverflow: 'ellipsis',
    ...((customStyle(state) || {}).multiValue || {}),
  }),
  multiValueLabel: (provided, state) => ({
    ...provided,
    color: state.isDisabled ? theme.colors.gray300 : theme.colors.gray700,
    fontSize: '14px',
    fontWeight: 'normal',
    lineHeight: '20px',
    ...((customStyle(state) || {}).multiValueLabel || {}),
  }),
  multiValueRemove: (provided, state) => ({
    ...provided,
    ...(state.isDisabled
      ? {
          color: theme.colors.gray300,
          cursor: 'none',
          pointerEvents: 'none',
        }
      : {
          color: theme.colors.gray550,
        }),
    ':hover': {
      color: state.isDisabled ? theme.colors.gray300 : theme.colors.primary,
      cursor: state.isDisabled ? 'none' : 'pointer',
      pointerEvents: state.isDisabled ? 'none' : 'fill',
    },
    ...((customStyle(state) || {}).multiValueRemove || {}),
  }),
  option: (provided, state) => ({
    ...provided,
    ...getOptionColor({ state, theme }),
    ':active': {
      backgroundColor: state.isDisabled
        ? theme.colors.gray50
        : theme.colors.gray200,
      color: state.isDisabled ? theme.colors.gray300 : theme.colors.gray700,
    },
    ':hover': {
      backgroundColor: state.isDisabled
        ? theme.colors.gray50
        : theme.colors.gray200,
      color: state.isDisabled ? theme.colors.gray300 : theme.colors.gray700,
    },
    ...((customStyle(state) || {}).option || {}),
  }),
  placeholder: (provided, state) => ({
    ...provided,
    color: getPlaceholderColor({ error, state, theme }),
    ...((customStyle(state) || {}).placeholder || {}),
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: state.isDisabled ? theme.colors.gray550 : theme.colors.gray700,
    marginLeft: state.hasValue && 0,
    marginRight: state.hasValue && 0,
    marginTop: !state.hasValue || state.isDisabled || noTopLabel ? 0 : '8px',
    paddingLeft: state.hasValue && 0,
    ...((customStyle(state) || {}).singleValue || {}),
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    ...((customStyle(state) || {}).valueContainer || {}),
    cursor: state.isDisabled ? 'not-allowed' : undefined,
    height: '100%',
  }),
})

const StyledContainer = styled(Box, {
  shouldForwardProp: prop => !['isDisabled', 'additionalStyles'].includes(prop),
})`
  width: 100%;
  ${({ isDisabled }) => isDisabled && `pointer-events: initial;`};
  ${({ additionalStyles }) => css(additionalStyles)}
`

const SelectContainer = props => {
  const {
    children,
    getStyles,
    innerProps,
    isDisabled,
    className,
    selectProps: {
      mt,
      mr,
      mb,
      ml,
      mx,
      my,
      pt,
      pr,
      pb,
      pl,
      px,
      py,
      flex,
      height,
      width,
      error,
      name,
    },
  } = props

  return (
    <StyledContainer
      data-testid={`rich-select-${name}`}
      additionalStyles={getStyles('container', props)}
      isDisabled={isDisabled}
      className={className}
      {...innerProps}
      {...{
        flex,
        height,
        mb,
        ml,
        mr,
        mt,
        mx,
        my,
        pb,
        pl,
        pr,
        pt,
        px,
        py,
        width,
      }}
    >
      {children}
      <Expandable height={56} overflow="hidden" opened={!!error}>
        <Box fontSize={12} color="warning" pt="2px">
          {error}
        </Box>
      </Expandable>
    </StyledContainer>
  )
}

SelectContainer.defaultProps = {
  className: '',
  getStyles: () => {},
  innerProps: {},
  isDisabled: false,
  selectProps: {
    mt: 0,
  },
}
SelectContainer.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  getStyles: PropTypes.func,
  innerProps: PropTypes.shape({}),
  isDisabled: PropTypes.bool,
  selectProps: PropTypes.shape({
    error: PropTypes.string,
    flex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    mb: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    ml: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    mr: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    mt: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    mx: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    my: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    pb: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    pl: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    pr: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    pt: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    px: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    py: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
}

const StyledPlaceholder = styled(Box, {
  shouldForwardProp: prop => !['error', 'scaled'].includes(prop),
})`
  position: absolute;
  left: 0;
  top: 6px;
  font-weight: 400;
  pointer-events: none;
  color: ${({ theme }) => theme.colors.gray550};
  white-space: nowrap;
  width: 100%;
  height: 48px;
  font-size: 16px;
  transition: transform 250ms ease;
  opacity: 0;

  ${({ error, theme }) => error && `color: ${theme.colors.warning};`}
  ${({ scaled }) =>
    scaled &&
    `
    transform: translate(0, -8px) scale(0.8);
    transform-origin: left;
    padding-left: 8px;
    left: 0;
    top: 0;
    opacity: 1;
  `}
`

const ValueContainer = ({
  noTopLabel,
  labelId,
  inputId,
  isDisabled,
  error,
  children,
  selectProps,
  isMulti,
  hasValue,
  ...props
}) => (
  <components.ValueContainer
    selectProps={selectProps}
    isMulti={isMulti}
    hasValue={hasValue}
    isDisabled={isDisabled}
    {...props}
  >
    <>
      {!isDisabled && selectProps.placeholder && !noTopLabel && !isMulti && (
        <StyledPlaceholder
          as="label"
          id={labelId}
          htmlFor={inputId}
          aria-live="assertive"
          error={error}
          scaled={hasValue && !isMulti}
        >
          {selectProps.placeholder}
        </StyledPlaceholder>
      )}
      {children}
    </>
  </components.ValueContainer>
)

ValueContainer.defaultProps = {
  children: null,
  error: undefined,
  hasValue: false,
  inputId: undefined,
  isDisabled: false,
  isMulti: false,
  labelId: undefined,
  noTopLabel: false,
  selectProps: {},
}
ValueContainer.propTypes = {
  children: PropTypes.node,
  error: PropTypes.string,
  hasValue: PropTypes.bool,
  inputId: PropTypes.string,
  isDisabled: PropTypes.bool,
  isMulti: PropTypes.bool,
  labelId: PropTypes.string,
  noTopLabel: PropTypes.bool,
  selectProps: SelectContainer.propTypes.selectProps,
}

const inputStyles = css`
  input {
    position: absolute;
    top: 50%;
  }
`

const Input = ({ inputId, labelId, isMulti, ...props }) => (
  <components.Input
    {...props}
    css={inputStyles}
    style={{
      caretColor: !isMulti && 'transparent',
    }}
    id={inputId}
    aria-controls={labelId}
  />
)

Input.propTypes = {
  inputId: PropTypes.string,
  isMulti: PropTypes.bool,
  labelId: PropTypes.string,
}

Input.defaultProps = {
  inputId: undefined,
  isMulti: false,
  labelId: undefined,
}

const Option = ({ selectProps, value, label, ...props }) => (
  <div
    data-testid={`option-${selectProps.name}-${
      isJSONString(value) ? label : value
    }`}
  >
    <components.Option
      selectProps={selectProps}
      value={value}
      label={label}
      {...props}
    />
  </div>
)

Option.defaultProps = {
  label: undefined,
  selectProps: { name: undefined },
}

Option.propTypes = {
  label: PropTypes.node,
  selectProps: SelectContainer.propTypes.selectProps,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})])
    .isRequired,
}

const DropdownIndicator = ({
  error,
  isDisabled,
  selectProps: { checked, time, required },
  ...props
}) => {
  const color = useMemo(() => {
    if (isDisabled) return 'gray300'
    if (checked) return 'primary'
    if (error) return 'warning'

    return 'gray350'
  }, [isDisabled, checked, error])

  return (
    <components.DropdownIndicator {...props}>
      <Icon
        name={time ? 'clock-outline' : 'chevron-down'}
        size={time ? 24 : 11}
        color={color}
        mr={required ? 2 : 0}
      />
      {required ? <Icon name="asterisk" size={8} color="warning" /> : null}
    </components.DropdownIndicator>
  )
}

DropdownIndicator.propTypes = {
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  isDisabled: PropTypes.bool,
  selectProps: SelectContainer.propTypes.selectProps,
}
DropdownIndicator.defaultProps = {
  error: undefined,
  isDisabled: false,
  selectProps: SelectContainer.defaultProps.selectProps,
}

const ClearIndicator = ({
  error,
  isDisabled,
  selectProps: { checked },
  ...props
}) => {
  const {
    innerProps: { ref, ...restInnerProps },
  } = props

  return (
    <components.ClearIndicator {...props}>
      <Icon
        {...restInnerProps}
        name="close"
        size={20}
        cursor={isDisabled ? 'none' : 'pointer'}
        color={
          (isDisabled && 'gray300') ||
          (checked && 'primary') ||
          (error && 'warning') ||
          'gray350'
        }
      />
    </components.ClearIndicator>
  )
}

ClearIndicator.defaultProps = {
  error: undefined,
  innerProps: {},
  isDisabled: false,
  selectProps: {},
}

ClearIndicator.propTypes = {
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  innerProps: PropTypes.shape({
    ref: {},
  }),
  isDisabled: PropTypes.bool,
  selectProps: SelectContainer.propTypes.selectProps,
}

const MultiValueContainer = props => (
  <components.MultiValueContainer {...props} />
)

const MultiValueLabel = props => <components.MultiValueLabel {...props} />

const MultiValueRemove = props => (
  <components.MultiValueRemove {...props}>
    <Icon name="close" size={16} />
  </components.MultiValueRemove>
)

function RichSelect({
  animation,
  animationDuration,
  animationOnChange,
  children,
  className,
  customComponents,
  customStyle,
  disabled,
  error,
  innerRef,
  inputId: inputIdProp,
  isClearable,
  isMulti,
  isSearchable,
  labelId: labelIdProp,
  menuPortalTarget,
  noTopLabel,
  onChange,
  options,
  placeholder,
  readOnly,
  value,
  ...props
}) {
  const inputId = inputIdProp || getUUID('input')
  const labelId = labelIdProp || getUUID('label')
  const theme = useTheme()

  const [isAnimated, setIsAnimated] = useState(false)

  useEffect(() => {
    if (animationOnChange) {
      setIsAnimated(true)
      setTimeout(() => setIsAnimated(false), animationDuration)
    }
  }, [setIsAnimated, animationOnChange, animationDuration, value?.value])

  return (
    <Select
      ref={innerRef}
      components={{
        ClearIndicator: clearIndicatorProps => (
          <ClearIndicator error={error} {...clearIndicatorProps} />
        ),
        DropdownIndicator: dropDownIndicatorProps => (
          <DropdownIndicator error={error} {...dropDownIndicatorProps} />
        ),
        Input: inputProps => (
          <Input
            inputId={inputId}
            labelId={labelId}
            isMulti={isMulti}
            {...inputProps}
          />
        ),
        MultiValueContainer,
        MultiValueLabel,
        MultiValueRemove,
        Option,
        SelectContainer,
        ValueContainer: valueContainerProps => (
          <ValueContainer
            noTopLabel={noTopLabel}
            labelId={labelId}
            inputId={inputId}
            {...valueContainerProps}
          />
        ),
        ...customComponents,
      }}
      placeholder={placeholder}
      className={className}
      isDisabled={disabled || readOnly}
      isOptionDisabled={option => option.disabled}
      styles={getSelectStyles({
        animation: isAnimated && animation,
        animationDuration,
        customStyle,
        error,
        noTopLabel,
        theme,
      })}
      options={
        options ||
        flattenChildren(children).map(
          ({ props: { children: subChildren, ...subProps } } = {}) => ({
            ...subProps,
            label: subChildren,
          }),
        )
      }
      menuPortalTarget={menuPortalTarget || document.getElementById(inputId)}
      isSearchable={isSearchable}
      isClearable={isClearable}
      isMulti={isMulti}
      onChange={onChange}
      value={value}
      maxMenuHeight={250}
      error={typeof error === 'string' ? error : undefined}
      {...props}
    />
  )
}

const RichSelectWithRef = React.forwardRef((props, ref) => (
  <RichSelect innerRef={ref} {...props} />
))

RichSelectWithRef.Option = () => null

RichSelectWithRef.defaultProps = {
  animation: 'pulse',
  animationDuration: 1000,
  animationOnChange: false,
  children: null,
  className: undefined,
  customComponents: undefined,
  customStyle: () => true,
  disabled: false,
  error: false,
  inputId: undefined,
  isClearable: false,
  isMulti: false,
  isSearchable: true,
  labelId: undefined,
  noTopLabel: false,
  onChange: null,
  placeholder: undefined,
  readOnly: false,
  required: false,
  value: undefined,
}

RichSelectWithRef.propTypes = {
  animation: PropTypes.oneOf(Object.keys(animations)),
  animationDuration: PropTypes.number,
  animationOnChange: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  className: PropTypes.string,
  customComponents: PropTypes.shape({}),
  customStyle: PropTypes.func,
  disabled: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  inputId: PropTypes.string,
  isClearable: PropTypes.bool,
  isMulti: PropTypes.bool,
  isSearchable: PropTypes.bool,
  labelId: PropTypes.string,
  name: PropTypes.string.isRequired,
  noTopLabel: PropTypes.bool,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
}
RichSelect.defaultProps = RichSelectWithRef.defaultProps
RichSelect.propTypes = RichSelectWithRef.propTypes

export default RichSelectWithRef
