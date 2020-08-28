import React from 'react'
import PropTypes from 'prop-types'
import flattenChildren from 'react-flatten-children'
import Select, { components } from 'react-select'
import { css } from '@emotion/core'
import { getUUID, cx } from 'utils'
import { gray550, warning } from 'theming'
import { theme } from '../theme'
import { Icon } from './Icon'
import { Box } from './Box'
import { Expandable } from './Expandable'
import { isJsonString } from '../helpers/isJson'

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
  placeholder: p => css`
    position: absolute;
    left: 0;
    top: 6px;
    font-weight: 400;
    pointer-events: none;
    color: ${gray550(p)};
    theme.white-space: nowrap;
    width: 100%;
    height: 48px;
    font-size: 16px;
    transition: transform 250ms ease;
    opacity: 0;
  `,
  error: p => css`
    color: ${warning(p)};
  `,
  pointerEvents: css`
    pointer-events: initial;
  `,
  disabledCursor: css`
    cursor: not-allowed;
  `,
}

const getSelectStyles = (error, customStyle) => ({
  control: (provided, state) => ({
    ...provided,
    transition: 'border-color 200ms ease, box-shadow 200ms ease',
    borderStyle: state.isDisabled ? 'none' : 'solid',
    borderWidth: state.isDisabled ? 0 : '1px',
    backgroundColor: state.isDisabled ? theme.gray50 : theme.white,
    color: state.isDisabled
      ? theme.gray300
      : error
      ? theme.warning
      : theme.gray700,
    height: '48px',
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '24px',
    borderRadius: '4px',
    boxShadow: 'none',
    borderColor: error ? theme.warning : theme.gray300,
    ':hover': {
      borderColor: error
        ? theme.warning
        : state.isFocused
        ? theme.primary
        : theme.gray550,
    },
    ...((customStyle(state) || {}).control || {}),
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
    color: state.isDisabled ? theme.gray550 : theme.gray700,
    ...((customStyle(state) || {}).singleValue || {}),
  }),
  multiValue: (provided, state) => ({
    ...provided,
    color: theme.gray700,
    backgroundColor: theme.gray100,
    fontWeight: 500,
    fontSize: '14px',
    borderRadius: '8px',
    ...((customStyle(state) || {}).multiValue || {}),
  }),
  multiValueLabel: (provided, state) => ({
    ...provided,
    color: state.isDisabled ? theme.gray300 : theme.gray700,
    ...((customStyle(state) || {}).multiValueLabel || {}),
  }),
  multiValueRemove: (provided, state) => ({
    ...provided,
    ...state.isDisabled ? {
      pointerEvents: 'none',
      cursor: 'none',
      color: theme.gray300,
    } : {},
    ':hover': {
      pointerEvents: state.isDisabled ? 'none' : 'fill',
      cursor: state.isDisabled ? 'none': 'pointer',
      color: state.isDisabled ? theme.gray300 : theme.primary,
    },
    ...((customStyle(state) || {}).multiValueRemove || {}),
  }),
  placeholder: (provided, state) => ({
    ...provided,
    color: state.isDisabled
      ? theme.gray300
      : error
      ? theme.warning
      : theme.gray550,
    ...((customStyle(state) || {}).placeholder || {}),
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isDisabled
      ? theme.gray50
      : state.isSelected
      ? theme.primary
      : state.isFocused
      ? theme.gray200
      : theme.white,
    color: state.isDisabled
      ? theme.gray300
      : state.isSelected
      ? theme.white
      : theme.gray700,

    ':active': {
      color: state.isDisabled ? theme.gray300 : theme.gray700,
      backgroundColor: state.isDisabled ? theme.gray50 : theme.gray200,
    },
    ':hover': {
      color: state.isDisabled ? theme.gray300 : theme.gray700,
      backgroundColor: state.isDisabled ? theme.gray50 : theme.gray200,
    },
    ...((customStyle(state) || {}).option || {}),
  }),
  indicatorSeparator: (provided, state) => ({
    ...provided,
    backgroundColor: theme.gray200,
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
            css={cx([
              styles.placeholder,
              error && styles.error,
              props.hasValue && !props.isMulti && styles.scaled,
            ])}
          >
            {props.selectProps.placeholder}
          </Box>
        )}
      {props.children}
    </>
  </components.ValueContainer>
)

const Input = ({ inputId, labelId }) => props => (
  <components.Input
    {...props}
    style={{ caretColor: 'transparent' }}
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
        size={24}
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
    <Icon name="close" size={14} />
  </components.MultiValueRemove>
)

export function RichSelect({
  children,
  className,
  disabled,
  error,
  isMulti = false,
  isSearchable = true,
  menuPortalTarget,
  noTopLabel,
  onChange,
  options,
  placeholder,
  readOnly,
  value,
  customStyle = () => true,
  ...props
}) {
  const labelId = getUUID('label')
  const inputId = getUUID('input')
  return (
    <Select
      css={styles.select}
      components={{
        SelectContainer,
        ValueContainer: ValueContainer({
          noTopLabel,
          labelId,
          inputId,
        }),
        Option,
        Input: Input({ inputId, labelId }),
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
      styles={getSelectStyles(error, customStyle)}
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
      isMulti={isMulti}
      onChange={onChange}
      value={value}
      maxMenuHeight={250}
      error={typeof error === 'string' ? error : undefined}
      {...props}
    />
  )
}

RichSelect.Option = () => null

RichSelect.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
  id: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  readOnly: PropTypes.bool,
  noTopLabel: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  className: PropTypes.string,
  customStyle: PropTypes.func,
}
