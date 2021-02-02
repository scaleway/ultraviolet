import { css } from '@emotion/react'
import { transparentize } from 'polished'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import flattenChildren from 'react-flatten-children'
import Select, { components } from 'react-select'
import { isJsonString } from '../../helpers/isJson'
import { colors } from '../../new_theme'
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

const getSelectStyles = (error, customStyle, animation, animationDuration) => ({
  control: (provided, state) => ({
    ...provided,
    transition: 'border-color 200ms ease, box-shadow 200ms ease',
    borderStyle: state.isDisabled ? 'none' : 'solid',
    borderWidth: state.isDisabled ? 0 : '1px',
    backgroundColor: state.isDisabled ? colors.gray50 : colors.white,
    color: state.isDisabled
      ? colors.gray300
      : error
      ? colors.warning
      : colors.gray700,
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
    marginTop: !state.hasValue || state.isDisabled ? 0 : '8px',
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
    color: state.isDisabled
      ? colors.gray300
      : error
      ? colors.warning
      : colors.gray550,
    ...((customStyle(state) || {}).placeholder || {}),
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isDisabled
      ? colors.gray50
      : state.isSelected
      ? colors.primary
      : state.isFocused
      ? colors.gray200
      : colors.white,
    color: state.isDisabled
      ? colors.gray300
      : state.isSelected
      ? colors.white
      : colors.gray700,

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

const ValueContainer = ({ noTopLabel, labelId, inputId, error }) => props => (
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
      {props.children}
    </>
  </components.ValueContainer>
)

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
      isJsonString(props.value) ? props.label : props.value
    }`}
  >
    <components.Option {...props} />
  </div>
)

const DropdownIndicator = ({ error }) => ({
  isDisabled,
  selectProps: { checked, time, required },
  ...props
}) => (
  <components.DropdownIndicator {...props}>
    <Icon
      name={time ? 'clock-outline' : 'chevron-down'}
      size={time ? 24 : 11}
      color={
        isDisabled
          ? 'gray300'
          : checked
          ? 'primary'
          : error
          ? 'warning'
          : 'gray350'
      }
      mr={required ? 2 : 0}
    />
    {required ? <Icon name="asterisk" size={8} color="warning" /> : null}
  </components.DropdownIndicator>
)

const ClearIndicator = ({ error }) => ({
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
          isDisabled
            ? 'gray300'
            : checked
            ? 'primary'
            : error
            ? 'warning'
            : 'gray350'
        }
      />
    </components.ClearIndicator>
  )
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
  ...props
}) {
  const labelId = getUUID('label')
  const inputId = getUUID('input')

  const [isAnimated, setIsAnimated] = useState(false)

  if (animationOnChange) {
    const deepValue = value?.value

    useEffect(() => {
      setIsAnimated(true)
      setTimeout(() => setIsAnimated(false), animationDuration)
    }, [setIsAnimated, animationOnChange, deepValue])
  }

  return (
    <Select
      ref={innerRef}
      css={styles.select}
      components={{
        SelectContainer,
        ValueContainer: ValueContainer({
          noTopLabel,
          labelId,
          inputId,
        }),
        Option,
        Input: Input({ inputId, labelId, isMulti }),
        DropdownIndicator: DropdownIndicator({ error }),
        ClearIndicator: ClearIndicator({ error }),
        MultiValueContainer,
        MultiValueLabel,
        MultiValueRemove,
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
      )}
      options={
        options ||
        flattenChildren(children).map(
          ({ props: { children, ...props } } = {}) => ({
            ...props,
            label: children,
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
}

RichSelectWithRef.propTypes = {
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

export { RichSelectWithRef as RichSelect }
