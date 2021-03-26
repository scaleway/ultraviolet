import { css, useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import { transparentize } from 'polished'
import PropTypes from 'prop-types'
import React, { useEffect, useMemo, useState } from 'react'
import flattenChildren from 'react-flatten-children'
import Select, { components } from 'react-select'
import { isJSONString } from '../../helpers/isJSON'
import { getUUID } from '../../utils'
import * as animations from '../../utils/animations'
import { Box } from '../Box'
import { Expandable } from '../Expandable'
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
    transition: 'border-color 200ms ease, box-shadow 200ms ease',
    borderStyle: state.isDisabled ? 'none' : 'solid',
    borderWidth: state.isDisabled ? 0 : '1px',
    backgroundColor: state.isDisabled
      ? theme.colors.gray50
      : theme.colors.white,
    color: getControlColor({ state, error, theme }),
    minHeight: '48px',
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '24px',
    borderRadius: '4px',
    boxShadow: 'none',
    borderColor: error ? theme.colors.warning : theme.colors.gray300,
    ...(!state.isDisabled && {
      ':hover': {
        borderColor: error ? theme.colors.warning : theme.colors.primary,
        svg: {
          fill: error ? theme.colors.warning : theme.colors.primary,
        },
      },
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
    }),
    ...((customStyle(state) || {}).control || {}),
    animation: animation
      ? `${animationDuration}ms ${animations[animation]}`
      : 'none',
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    ...((customStyle(state) || {}).valueContainer || {}),
    cursor: state.isDisabled ? 'not-allowed' : undefined,
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
  singleValue: (provided, state) => ({
    ...provided,
    marginTop: !state.hasValue || state.isDisabled || noTopLabel ? 0 : '8px',
    marginLeft: state.hasValue && 0,
    marginRight: state.hasValue && 0,
    paddingLeft: state.hasValue && 0,
    color: state.isDisabled ? theme.colors.gray550 : theme.colors.gray700,
    ...((customStyle(state) || {}).singleValue || {}),
  }),
  multiValue: (provided, state) => ({
    ...provided,
    color: theme.colors.gray700,
    backgroundColor: theme.colors.gray100,
    fontWeight: 500,
    fontSize: '14px',
    borderRadius: '4px',
    justifyContent: 'center',
    alignItems: 'center',
    textOverflow: 'ellipsis',
    height: '24px',
    ...((customStyle(state) || {}).multiValue || {}),
  }),
  multiValueLabel: (provided, state) => ({
    ...provided,
    color: state.isDisabled ? theme.colors.gray300 : theme.colors.gray700,
    fontSize: '14px',
    lineHeight: '20px',
    fontWeight: 'normal',
    ...((customStyle(state) || {}).multiValueLabel || {}),
  }),
  multiValueRemove: (provided, state) => ({
    ...provided,
    ...(state.isDisabled
      ? {
          pointerEvents: 'none',
          cursor: 'none',
          color: theme.colors.gray300,
        }
      : {
          color: theme.colors.gray550,
        }),
    ':hover': {
      pointerEvents: state.isDisabled ? 'none' : 'fill',
      cursor: state.isDisabled ? 'none' : 'pointer',
      color: state.isDisabled ? theme.colors.gray300 : theme.colors.primary,
    },
    ...((customStyle(state) || {}).multiValueRemove || {}),
  }),
  placeholder: (provided, state) => ({
    ...provided,
    color: getPlaceholderColor({ state, error, theme }),
    ...((customStyle(state) || {}).placeholder || {}),
  }),
  option: (provided, state) => ({
    ...provided,
    ...getOptionColor({ state, theme }),
    ':active': {
      color: state.isDisabled ? theme.colors.gray300 : theme.colors.gray700,
      backgroundColor: state.isDisabled
        ? theme.colors.gray50
        : theme.colors.gray200,
    },
    ':hover': {
      color: state.isDisabled ? theme.colors.gray300 : theme.colors.gray700,
      backgroundColor: state.isDisabled
        ? theme.colors.gray50
        : theme.colors.gray200,
    },
    ...((customStyle(state) || {}).option || {}),
  }),
  indicatorsContainer: provided => ({
    ...provided,
    maxHeight: '48px',
  }),
  indicatorSeparator: (provided, state) => ({
    ...provided,
    backgroundColor: theme.colors.gray200,
    display: state.selectProps.time ? 'flex' : 'none',
    ...((customStyle(state) || {}).indicatorSeparator || {}),
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
    },
  } = props

  return (
    <StyledContainer
      data-testid={`rich-select-${props.selectProps.name}`}
      additionalStyles={getStyles('container', props)}
      isDisabled={isDisabled}
      className={className}
      {...innerProps}
      {...{
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
  getStyles: () => {},
  innerProps: {},
  isDisabled: false,
  className: '',
  selectProps: {
    mt: 0,
  },
}
SelectContainer.propTypes = {
  children: PropTypes.node.isRequired,
  getStyles: PropTypes.func,
  innerProps: PropTypes.shape({}),
  selectProps: PropTypes.shape({
    mt: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    mr: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    mb: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    ml: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    mx: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    my: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    pt: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    pr: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    pb: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    pl: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    px: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    py: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    flex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    error: PropTypes.string,
    name: PropTypes.string,
  }),
  isDisabled: PropTypes.bool,
  className: PropTypes.string,
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
  ...props
}) => (
  <components.ValueContainer isDisabled={isDisabled} {...props}>
    <>
      {!isDisabled &&
        props.selectProps.placeholder &&
        !noTopLabel &&
        !props.isMulti && (
          <StyledPlaceholder
            as="label"
            id={labelId}
            htmlFor={inputId}
            aria-live="assertive"
            error={error}
            scaled={props.hasValue && !props.isMulti}
          >
            {props.selectProps.placeholder}
          </StyledPlaceholder>
        )}
      {children}
    </>
  </components.ValueContainer>
)

ValueContainer.defaultProps = {
  isDisabled: false,
  isMulti: false,
  selectProps: {},
  noTopLabel: false,
  labelId: undefined,
  inputId: undefined,
  error: undefined,
  children: null,
  hasValue: false,
}
ValueContainer.propTypes = {
  selectProps: SelectContainer.propTypes.selectProps,
  isDisabled: PropTypes.bool,
  isMulti: PropTypes.bool,
  noTopLabel: PropTypes.bool,
  labelId: PropTypes.string,
  inputId: PropTypes.string,
  error: PropTypes.string,
  children: PropTypes.node,
  hasValue: PropTypes.bool,
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
  labelId: PropTypes.string,
  isMulti: PropTypes.bool,
}

Input.defaultProps = {
  inputId: undefined,
  labelId: undefined,
  isMulti: false,
}

const Option = props => (
  <div
    data-testid={`option-${props.selectProps.name}-${
      isJSONString(props.value) ? props.label : props.value
    }`}
  >
    <components.Option {...props} />
  </div>
)

Option.defaultProps = {
  label: undefined,
  selectProps: { name: undefined },
}

Option.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})])
    .isRequired,
  label: PropTypes.node,
  selectProps: SelectContainer.propTypes.selectProps,
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
  error: PropTypes.bool,
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
  isDisabled: false,
  selectProps: {},
  innerProps: {},
  error: undefined,
}

ClearIndicator.propTypes = {
  error: PropTypes.string,
  isDisabled: PropTypes.bool,
  selectProps: SelectContainer.propTypes.selectProps,
  innerProps: PropTypes.shape({
    ref: {},
  }),
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
  children,
  className,
  disabled,
  error,
  inputId: inputIdProp,
  isMulti,
  isSearchable,
  isClearable,
  labelId: labelIdProp,
  menuPortalTarget,
  noTopLabel,
  onChange,
  options,
  placeholder,
  readOnly,
  value,
  customStyle,
  innerRef,
  animationOnChange,
  animation,
  animationDuration,
  customComponents,
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
        SelectContainer,
        ValueContainer: valueContainerProps => (
          <ValueContainer
            noTopLabel={noTopLabel}
            labelId={labelId}
            inputId={inputId}
            {...valueContainerProps}
          />
        ),
        Option,
        Input: inputProps => (
          <Input
            inputId={inputId}
            labelId={labelId}
            isMulti={isMulti}
            {...inputProps}
          />
        ),
        DropdownIndicator: dropDownIndicatorProps => (
          <DropdownIndicator error={error} {...dropDownIndicatorProps} />
        ),
        ClearIndicator: clearIndicatorProps => (
          <ClearIndicator error={error} {...clearIndicatorProps} />
        ),
        MultiValueContainer,
        MultiValueLabel,
        MultiValueRemove,
        ...customComponents,
      }}
      placeholder={placeholder}
      className={className}
      isDisabled={disabled || readOnly}
      isOptionDisabled={option => option.disabled}
      styles={getSelectStyles({
        error,
        customStyle,
        animation: isAnimated && animation,
        animationDuration,
        theme,
        noTopLabel,
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
  children: null,
  className: undefined,
  disabled: false,
  error: false,
  inputId: undefined,
  isMulti: false,
  isSearchable: true,
  isClearable: false,
  labelId: undefined,
  noTopLabel: false,
  onChange: null,
  placeholder: undefined,
  readOnly: false,
  customStyle: () => true,
  animationOnChange: false,
  animation: 'pulse',
  animationDuration: 1000,
  required: false,
  value: undefined,
  customComponents: undefined,
}

RichSelectWithRef.propTypes = {
  animation: PropTypes.oneOf(Object.keys(animations)),
  animationOnChange: PropTypes.bool,
  animationDuration: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  className: PropTypes.string,
  customStyle: PropTypes.func,
  customComponents: PropTypes.shape({}),
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
