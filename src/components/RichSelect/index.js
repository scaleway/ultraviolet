import { css } from '@emotion/react'
import { transparentize } from 'polished'
import PropTypes from 'prop-types'
import React, { useEffect, useMemo, useState } from 'react'
import flattenChildren from 'react-flatten-children'
import Select, { components } from 'react-select'
import { isJSONString } from '../../helpers/isJSON'
import { colors } from '../../theme'
import { getUUID } from '../../utils'
import * as animations from '../../utils/animations'
import { Box } from '../Box'
import { Expandable } from '../Expandable'
import { Icon } from '../Icon'

const styles = {
  select: css`
    width: 100%;
  `,
  scaled: css`
    transform: translate(0, -8px) scale(0.8);
    transform-origin: left;
    padding-left: 8px;
    left: 0;
    top: 0;
    opacity: 1;
  `,
  placeholder: css`
    position: absolute;
    left: 0;
    top: 6px;
    font-weight: 400;
    pointer-events: none;
    color: ${colors.gray550};
    white-space: nowrap;
    width: 100%;
    height: 48px;
    font-size: 16px;
    transition: transform 250ms ease;
    opacity: 0;
  `,
  error: css`
    color: ${colors.warning};
  `,
  pointerEvents: css`
    pointer-events: initial;
  `,
  disabledCursor: css`
    cursor: not-allowed;
  `,
  input: css`
    input {
      position: absolute;
      top: 50%;
    }
  `,
}

const getControlColor = (state, error) => {
  if (state.isDisabled) return colors.gray300
  if (error) return colors.warning

  return colors.gray700
}

const getPlaceholderColor = (state, error) => {
  if (state.isDisabled) return colors.gray300
  if (error) return colors.warning

  return colors.gray550
}

const getOptionColor = state => {
  let color = colors.gray700
  let backgroundColor = colors.white

  if (state.isDisabled) {
    backgroundColor = colors.gray50
    color = colors.gray300
  } else if (state.isSelected) {
    backgroundColor = colors.primary
    color = colors.white
  } else if (state.isFocused) {
    backgroundColor = colors.gray200
  }

  return { backgroundColor, color }
}

const getSelectStyles = (
  error,
  customStyle,
  animation,
  animationDuration,
  noTopLabel,
) => ({
  control: (provided, state) => ({
    ...provided,
    transition: 'border-color 200ms ease, box-shadow 200ms ease',
    borderStyle: state.isDisabled ? 'none' : 'solid',
    borderWidth: state.isDisabled ? 0 : '1px',
    backgroundColor: state.isDisabled ? colors.gray50 : colors.white,
    color: getControlColor(state, error),
    minHeight: '48px',
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '24px',
    borderRadius: '4px',
    boxShadow: 'none',
    borderColor: error ? colors.warning : colors.gray300,
    ...(!state.isDisabled && {
      ':hover': {
        borderColor: error ? colors.warning : colors.primary,
        svg: {
          fill: error ? colors.warning : colors.primary,
        },
      },
      ':focus-within': {
        borderColor: error ? colors.warning : colors.primary,
        boxShadow: `0 0 2px 2px ${transparentize(
          0.75,
          error ? colors.warning : colors.primary,
        )}`,
        svg: {
          fill: error ? colors.warning : colors.primary,
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
    color: state.isDisabled ? colors.gray550 : colors.gray700,
    ...((customStyle(state) || {}).singleValue || {}),
  }),
  multiValue: (provided, state) => ({
    ...provided,
    color: colors.gray700,
    backgroundColor: colors.gray100,
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
    color: state.isDisabled ? colors.gray300 : colors.gray700,
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
          color: colors.gray300,
        }
      : {
          color: colors.gray550,
        }),
    ':hover': {
      pointerEvents: state.isDisabled ? 'none' : 'fill',
      cursor: state.isDisabled ? 'none' : 'pointer',
      color: state.isDisabled ? colors.gray300 : colors.primary,
    },
    ...((customStyle(state) || {}).multiValueRemove || {}),
  }),
  placeholder: (provided, state) => ({
    ...provided,
    color: getPlaceholderColor(state, error),
    ...((customStyle(state) || {}).placeholder || {}),
  }),
  option: (provided, state) => ({
    ...provided,
    ...getOptionColor(state),
    ':active': {
      color: state.isDisabled ? colors.gray300 : colors.gray700,
      backgroundColor: state.isDisabled ? colors.gray50 : colors.gray200,
    },
    ':hover': {
      color: state.isDisabled ? colors.gray300 : colors.gray700,
      backgroundColor: state.isDisabled ? colors.gray50 : colors.gray200,
    },
    ...((customStyle(state) || {}).option || {}),
  }),
  indicatorsContainer: provided => ({
    ...provided,
    maxHeight: '48px',
  }),
  indicatorSeparator: (provided, state) => ({
    ...provided,
    backgroundColor: colors.gray200,
    display: state.selectProps.time ? 'flex' : 'none',
    ...((customStyle(state) || {}).indicatorSeparator || {}),
  }),
})

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
    <Box
      data-testid={`rich-select-${props.selectProps.name}`}
      css={[
        css(getStyles('container', props)),
        isDisabled && styles.pointerEvents,
      ]}
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
      <Expandable height={56} overflow="hidden" opened={Boolean(error)}>
        <Box fontSize={12} color="warning" pt="2px">
          {error}
        </Box>
      </Expandable>
    </Box>
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

const ValueContainer = ({
  noTopLabel,
  labelId,
  inputId,
  error,
  children,
  ...props
}) => (
  <components.ValueContainer
    {...props}
    css={props.isDisabled && styles.disabledCursor}
  >
    <>
      {!props.isDisabled &&
        props.selectProps.placeholder &&
        !noTopLabel &&
        !props.isMulti && (
          <Box
            as="label"
            id={labelId}
            htmlFor={inputId}
            aria-live="assertive"
            css={[
              styles.placeholder,
              error && styles.error,
              props.hasValue && !props.isMulti && styles.scaled,
            ]}
          >
            {props.selectProps.placeholder}
          </Box>
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

const Input = ({ inputId, labelId, isMulti }) => props => (
  <components.Input
    {...props}
    style={{
      caretColor: !isMulti && 'transparent',
    }}
    css={styles.input}
    id={inputId}
    aria-controls={labelId}
  />
)

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
  isMulti,
  isSearchable,
  isClearable,
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
  const labelId = getUUID('label')
  const inputId = getUUID('input')

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
      css={styles.select}
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
        Input: Input({ inputId, labelId, isMulti }),
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
      styles={getSelectStyles(
        error,
        customStyle,
        isAnimated && animation,
        animationDuration,
        noTopLabel,
      )}
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
  isMulti: false,
  isSearchable: true,
  isClearable: false,
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
  customComponents: PropTypes.shape({}),
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  readOnly: PropTypes.bool,
  noTopLabel: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  className: PropTypes.string,
  customStyle: PropTypes.func,
  animation: PropTypes.oneOf(Object.keys(animations)),
  animationOnChange: PropTypes.bool,
  animationDuration: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  isMulti: PropTypes.bool,
  isSearchable: PropTypes.bool,
  isClearable: PropTypes.bool,
}
RichSelect.defaultProps = RichSelectWithRef.defaultProps
RichSelect.propTypes = RichSelectWithRef.propTypes

export { RichSelectWithRef as RichSelect }
