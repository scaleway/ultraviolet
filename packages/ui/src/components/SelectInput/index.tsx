import type { CSSObject, Theme, keyframes } from '@emotion/react'
import { css, useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import { ArrowDownIcon, ClockOutlineIcon, CloseIcon } from '@ultraviolet/icons'
import type {
  ComponentProps,
  ForwardRefExoticComponent,
  ForwardedRef,
  JSX,
  ReactNode,
} from 'react'
import React, {
  Children,
  forwardRef,
  useEffect,
  useId,
  useMemo,
  useState,
} from 'react'
import type {
  ClearIndicatorProps,
  CommonProps,
  ContainerProps,
  DropdownIndicatorProps,
  GroupBase,
  InputProps,
  MultiValueProps,
  OptionProps,
  Props,
  ValueContainerProps,
} from 'react-select'
import Select, { components } from 'react-select'
import isJSONString from '../../helpers/isJSON'
import * as animations from '../../utils/animations'
import { Expandable } from '../Expandable'
import { Separator } from '../Separator'
import { Stack } from '../Stack'
import { Text } from '../Text'

const StyledSeparator = styled(Separator)`
  background-color: ${({ theme }) => theme.colors.neutral.border};
  height: 100%;
`

export type SelectOption = {
  value: string
  label: ReactNode
  disabled?: boolean
  description?: string
  inlineDescription?: string
}

type SelectStyleGetterProps = {
  state: SelectProps & OptionProps
  error?: string
  theme: Theme
}

const getControlColor = ({ state, error, theme }: SelectStyleGetterProps) => {
  if (state.isDisabled) return theme.colors.neutral.textDisabled
  if (error) return theme.colors.danger.text

  return theme.colors.neutral.text
}

const getPlaceholderColor = ({
  state,
  error,
  theme,
}: SelectStyleGetterProps) => {
  if (state.isDisabled) return theme.colors.neutral.textDisabled
  if (error) return theme.colors.danger.text

  return theme.colors.neutral.textWeak
}

const getOptionColor = ({ state, theme }: SelectStyleGetterProps) => {
  let color: string = theme.colors.neutral.text
  let backgroundColor: string = theme.colors.neutral.backgroundWeakElevated
  if (state.isDisabled) {
    backgroundColor = theme.colors.neutral.backgroundDisabled
    color = theme.colors.neutral.textDisabled
  } else if (state.isSelected) {
    backgroundColor = theme.colors.primary.backgroundStrong
    color = theme.colors.primary.textStrong
  } else if (state.isFocused) {
    backgroundColor = theme.colors.primary.background
  }

  return { backgroundColor, color }
}

type SelectStyleFactory = (
  provided: CSSObject,
  state: SelectProps & OptionProps & WithSelectProps,
) => CSSObject

type SelectStyleMap = Record<string, SelectStyleFactory>

type SelectStyleProps = {
  error?: string
  /**
   * Custom styles of the SelectInput. See [React select documentation](https://react-select.com/styles)
   */
  customStyle: (
    state: SelectProps & WithSelectProps,
  ) => Record<string, CSSObject>
  animation?: string
  /**
   * Time of the animation
   */
  animationDuration: number
  /**
   * Show/hide the label inside the component
   */
  noTopLabel?: boolean
  theme: Theme
}

const getSelectStyles = ({
  error,
  customStyle,
  animation,
  animationDuration,
  noTopLabel,
  theme,
}: SelectStyleProps): SelectStyleMap => ({
  control: (provided, state) => ({
    ...provided,
    backgroundColor: state.isDisabled
      ? theme.colors.neutral.backgroundDisabled
      : theme.colors.neutral.background,
    borderColor: error
      ? theme.colors.danger.border
      : theme.colors.neutral.border,
    borderRadius: '4px',
    borderStyle: 'solid',
    borderWidth: '1px',
    boxShadow: 'none',
    color: getControlColor({ error, state, theme }),
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: '24px',
    minHeight: '48px',
    transition: 'border-color 200ms ease, box-shadow 200ms ease',
    cursor: state.isDisabled ? 'not-allowed' : 'pointer',

    ...(!state.isDisabled && {
      ':focus-within': {
        borderColor: error
          ? theme.colors.danger.border
          : theme.colors.primary.border,
        boxShadow: error
          ? theme.shadows.focusDanger
          : theme.shadows.focusPrimary,
      },
      ':hover': {
        borderColor: error
          ? theme.colors.danger.borderHover
          : theme.colors.primary.borderHover,
      },
    }),
    ...customStyle(state)?.['control'],
    animation: animation
      ? `${animationDuration}ms ${
          (animations as Record<string, ReturnType<typeof keyframes>>)[
            animation
          ]
        }`
      : 'none',
  }),
  indicatorsContainer: provided => ({
    ...provided,
    maxHeight: '48px',
  }),
  indicatorSeparator: (provided, state) => ({
    ...provided,
    backgroundColor: theme.colors.neutral.border,
    display: 'none',
    ...customStyle(state)?.['indicatorSeparator'],
  }),
  input: provided => ({
    ...provided,
    flexGrow: 1,
    marginLeft: 0,
    paddingTop: noTopLabel ? 0 : 11,
  }),
  menu: (provided, state) => ({
    ...provided,
    ...customStyle(state)?.['menu'],
    boxShadow: theme.shadows.menu,
  }),
  menuList: (provided, state) => ({
    ...provided,
    backgroundColor: theme.colors.neutral.backgroundWeak,
    maxHeight: '225px',
    ...customStyle(state)?.['menuList'],
  }),
  menuPortal: (provided, state) => ({
    ...provided,
    zIndex: 10000,
    ...customStyle(state)?.['menuPortal'],
  }),
  multiValue: (provided, state) => ({
    ...provided,
    alignItems: 'center',
    backgroundColor: theme.colors.neutral.backgroundDisabled,
    borderRadius: '4px',
    color: theme.colors.neutral.text,
    fontSize: '14px',
    fontWeight: 500,
    height: '24px',
    justifyContent: 'center',
    marginTop: theme.space[noTopLabel ? '0.5' : '2'],
    textOverflow: 'ellipsis',
    ...customStyle(state)?.['multiValue'],
  }),
  multiValueLabel: (provided, state) => ({
    ...provided,
    color: state.isDisabled
      ? theme.colors.neutral.textDisabled
      : theme.colors.neutral.text,
    fontSize: '14px',
    fontWeight: 'normal',
    lineHeight: '20px',
    ...customStyle(state)?.['multiValueLabel'],
  }),
  multiValueRemove: (provided, state) => ({
    ...provided,
    ...(state.isDisabled
      ? {
          color: theme.colors.neutral.textDisabled,
          cursor: 'none',
          pointerEvents: 'none',
        }
      : {
          color: theme.colors.primary.text,
        }),
    ':hover': {
      color: state.isDisabled
        ? theme.colors.neutral.textDisabled
        : theme.colors.primary.text,
      cursor: state.isDisabled ? 'none' : 'pointer',
      pointerEvents: state.isDisabled ? 'none' : 'fill',
    },
    ...customStyle(state)?.['multiValueRemove'],
  }),
  option: (provided, state) => ({
    ...provided,
    ...getOptionColor({ state, theme }),
    cursor: state.isDisabled ? 'not-allowed' : 'pointer',
    ':active': {
      backgroundColor: state.isDisabled
        ? theme.colors.neutral.backgroundDisabled
        : theme.colors.primary.background,
      color: state.isDisabled
        ? theme.colors.neutral.textDisabled
        : theme.colors.primary.text,
    },
    ':hover': {
      backgroundColor: state.isDisabled
        ? theme.colors.neutral.backgroundDisabled
        : theme.colors.primary.background,
      color: state.isDisabled
        ? theme.colors.neutral.textDisabled
        : theme.colors.neutral.text,
    },
    ...customStyle(state)?.['option'],
  }),
  placeholder: (provided, state) => ({
    ...provided,
    color: getPlaceholderColor({ error, state, theme }),
    ...customStyle(state)?.['placeholder'],
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: state.isDisabled
      ? theme.colors.neutral.textDisabled
      : theme.colors.neutral.text,
    marginLeft: state.hasValue ? 0 : undefined,
    marginRight: state.hasValue ? 0 : undefined,
    marginTop: !state.hasValue || noTopLabel ? 0 : '5px',
    paddingLeft: state.hasValue ? 0 : undefined,
    ...customStyle(state)?.['singleValue'],
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    ...customStyle(state)?.['valueContainer'],
    cursor: state.isDisabled ? 'not-allowed' : undefined,
    height: '100%',
    label: {
      display: noTopLabel ? 'none' : 'initial',
    },
    paddingTop: 0,
  }),
})

type WithSelectProps = {
  selectProps: SelectProps
}

type SelectProps = StyledContainerProps &
  Omit<Props<SelectOption>, 'value'> &
  CommonProps<SelectOption, boolean, GroupBase<SelectOption>> & {
    value?: string | SelectOption
    checked?: boolean
    error?: string
    labelId?: string
    required?: boolean
    time?: boolean
  }

type StyledContainerProps = {
  isDisabled?: boolean
  additionalStyles?: Parameters<typeof css>[0]
}

const StyledContainer = styled('div', {
  shouldForwardProp: prop => !['isDisabled', 'additionalStyles'].includes(prop),
})<StyledContainerProps>`
  width: 100%;
  ${({ isDisabled }) => isDisabled && `pointer-events: initial;`};
  ${({ additionalStyles }) => css(additionalStyles)}
`

const StyledError = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.danger.text};
  padding-top: ${({ theme }) => theme.space['0.25']};
`

const SelectContainer = (
  props: ContainerProps<SelectOption> & WithSelectProps,
) => {
  const {
    children,
    getStyles,
    innerProps: { onKeyDown } = {},
    isDisabled = false,
    className,
    selectProps: { name = '', error, className: selectPropsClassName } = {},
  } = props

  return (
    <StyledContainer
      data-testid={`select-input-${name}`}
      additionalStyles={getStyles?.('container', props)}
      isDisabled={isDisabled}
      className={[className, selectPropsClassName].filter(Boolean).join(' ')}
      onKeyDown={onKeyDown}
    >
      {children}
      <Expandable opened={!!error}>
        <StyledError>{error}</StyledError>
      </Expandable>
    </StyledContainer>
  )
}

type StyledPlaceholderProps = {
  error?: string
  isMulti: boolean
  isDisabled?: boolean
  hasValue: boolean
}

const StyledPlaceholder = styled('label', {
  shouldForwardProp: prop =>
    !['error', 'hasValue', 'isDisabled', 'isMulti'].includes(prop),
})<StyledPlaceholderProps>`
  position: absolute;
  left: 0;
  font-weight: 400;
  pointer-events: none;
  color: ${({ theme, error }) =>
    error ? theme.colors.danger.text : theme.colors.neutral.text};
  white-space: nowrap;
  width: 100%;
  height: 100%;
  font-size: 16px;
  transition: transform 250ms ease;
  opacity: 0;
  ${({ hasValue }) =>
    hasValue &&
    `
    transform: translate(0, -8px) scale(0.8);
    transform-origin: left;
    padding-left: 8px;
    left: 0;
    top: 2px;
    opacity: 1;
  `}
  ${({ isDisabled, hasValue }) => hasValue && isDisabled && 'opacity: 0.5'}
`

const StyledText = styled(Text, {
  shouldForwardProp: prop =>
    !['isSelectedAndNotFocused', 'isInline'].includes(prop),
})<{
  isSelectedAndNotFocused: boolean
  isInline?: boolean
}>`
  margin-left: ${({ theme, isInline }) => (isInline ? theme.space['1'] : 0)};
  color: ${({ isSelectedAndNotFocused, theme }) =>
    isSelectedAndNotFocused ? theme.colors.primary.textStrong : undefined};
`

const MaxLineStyledText = styled(StyledText)`
  -webkit-line-clamp: 3;
  margin-top: ${({ theme }) => theme.space['1']};
`

const ValueContainer = ({
  isDisabled,
  children,
  selectProps: { error, labelId, inputId, ...selectProps },
  isMulti,
  hasValue,
  clearValue,
  getStyles,
  getValue,
  getClassNames,
  isRtl,
  cx,
  options,
  selectOption,
  setValue,
  theme,
  className,
  innerProps,
}: ValueContainerProps<SelectOption> & WithSelectProps) => (
  <components.ValueContainer
    clearValue={clearValue}
    getStyles={getStyles}
    getValue={getValue}
    isRtl={isRtl}
    cx={cx}
    options={options}
    selectOption={selectOption}
    setValue={setValue}
    theme={theme}
    className={className}
    innerProps={innerProps}
    selectProps={selectProps}
    isMulti={isMulti}
    hasValue={hasValue}
    isDisabled={isDisabled}
    getClassNames={getClassNames}
  >
    <>
      {selectProps.placeholder ? (
        <StyledPlaceholder
          as="label"
          id={labelId}
          htmlFor={inputId}
          aria-live="assertive"
          error={error}
          isMulti={isMulti}
          isDisabled={isDisabled}
          hasValue={hasValue}
        >
          {selectProps.placeholder}
        </StyledPlaceholder>
      ) : null}
      {children}
    </>
  </components.ValueContainer>
)

const inputStyles = ({ isMulti }: Partial<SelectProps>) => css`
  margin-left: 0px;
  ${!isMulti && 'caret-color: transparent'};
`

const Input = ({
  isMulti,
  hasValue,
  selectProps: { inputId, labelId, placeholder, ...selectProps },
  clearValue,
  getStyles,
  getValue,
  isRtl,
  cx,
  options,
  selectOption,
  setValue,
  theme,
  className,
  isHidden,
  ...props
}: InputProps<SelectOption> & WithSelectProps) => (
  <components.Input
    {...props}
    css={inputStyles({ isMulti })}
    id={inputId}
    aria-controls={labelId}
    hasValue={hasValue}
    isMulti={isMulti}
    clearValue={clearValue}
    getStyles={getStyles}
    getValue={getValue}
    isRtl={isRtl}
    cx={cx}
    options={options}
    selectOption={selectOption}
    setValue={setValue}
    theme={theme}
    className={className}
    isHidden={isHidden}
    selectProps={
      { ...selectProps, placeholder } as InputProps<SelectOption>['selectProps']
    }
  />
)

const Option = ({
  selectProps,
  value,
  label,
  children,
  data: { inlineDescription, description },
  isSelected,
  data,
  ...props
}: OptionProps<SelectOption> & SelectOption) => {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div
      data-testid={`option-${selectProps.name || ''}-${
        isJSONString(value) ? label : value
      }`}
      onMouseOver={() => setIsFocused(true)}
      onFocus={() => setIsFocused(true)}
      onMouseOut={() => setIsFocused(false)}
      onBlur={() => setIsFocused(false)}
    >
      <components.Option
        {...props}
        selectProps={selectProps}
        label={label}
        data={data}
        isSelected={isSelected}
      >
        {children}
        {inlineDescription ? (
          <StyledText
            as="span"
            variant="bodySmall"
            isSelectedAndNotFocused={isSelected && !isFocused}
            isInline={!!inlineDescription}
          >
            {inlineDescription}
          </StyledText>
        ) : null}
        {description ? (
          <MaxLineStyledText
            as="p"
            variant="bodySmall"
            isSelectedAndNotFocused={isSelected && !isFocused}
          >
            {description}
          </MaxLineStyledText>
        ) : null}
      </components.Option>
    </div>
  )
}

const DropdownIndicator = (
  props: DropdownIndicatorProps<SelectOption> & WithSelectProps,
) => {
  const {
    selectProps: { isDisabled, time, required },
  } = props

  return (
    <components.DropdownIndicator {...props}>
      <Stack gap={1} direction="row" alignItems="center">
        {required ? (
          <Text
            as="span"
            variant="bodyStrong"
            sentiment="danger"
            aria-label="required"
          >
            *
          </Text>
        ) : null}
        {time ? <StyledSeparator direction="vertical" /> : null}
        {time ? (
          <ClockOutlineIcon
            size={time ? 'large' : 'xlarge'}
            disabled={isDisabled}
          />
        ) : (
          <ArrowDownIcon
            size={time ? 'large' : 'xlarge'}
            disabled={isDisabled}
          />
        )}
      </Stack>
    </components.DropdownIndicator>
  )
}

const ClearIndicator = (
  props: ClearIndicatorProps<SelectOption> & WithSelectProps,
) => {
  const {
    selectProps: { checked, error },
    innerProps: { ref, ...restInnerProps },
  } = props

  return (
    <components.ClearIndicator {...props}>
      {/* @ts-expect-error component is anyways deprecated */}
      <CloseIcon
        {...restInnerProps}
        sentiment={(checked && 'primary') || (error && 'danger') || 'neutral'}
      />
    </components.ClearIndicator>
  )
}

const MultiValueContainer = (props: MultiValueProps<SelectOption>) => (
  <components.MultiValueContainer {...props} />
)

const MultiValueLabel = (props: MultiValueProps<SelectOption>) => (
  <components.MultiValueLabel {...props} />
)

const MultiValueRemove = (props: MultiValueProps<SelectOption>) => (
  <components.MultiValueRemove {...props}>
    <CloseIcon size="large" />
  </components.MultiValueRemove>
)

type SelectComponents = SelectProps['components']

type StateManagedSelect = typeof Select

type SelectInputProps = SelectProps &
  SelectStyleProps & {
    /**
     * Name of the animation
     */
    animation?: string
    /**
     * Play the animation when the value change
     */
    animationOnChange?: boolean
    disabled?: boolean
    readOnly?: boolean
    innerRef?: ForwardedRef<StateManagedSelect>
    /**
     * Custom components of the SelectInput. See [React select documentation](https://react-select.com/components)
     */
    customComponents?: SelectProps['components']
    children: ReactNode
    emptyState?: ComponentProps<Select>['noOptionsMessage']
    'data-testid'?: string
  }

const defaultCustomStyle = () => ({})

const FwdSelectInput = ({
  animation = 'pulse',
  animationDuration = 1000,
  animationOnChange = false,
  children,
  className,
  customComponents,
  customStyle = defaultCustomStyle,
  disabled = false,
  error,
  innerRef,
  inputId: inputIdProp,
  isClearable = false,
  isMulti = false,
  isSearchable = true,
  menuPortalTarget,
  noTopLabel = false,
  onBlur,
  onChange,
  onFocus,
  options,
  placeholder,
  readOnly = false,
  value,
  name,
  id: idProp,
  time,
  isLoading,
  required,
  emptyState,
  'data-testid': dataTestId,
}: Partial<SelectInputProps>) => {
  const id = useId()
  const inputId = inputIdProp ?? id
  const theme = useTheme()
  const [isAnimated, setIsAnimated] = useState(false)
  const currentValue = (value as SelectOption)?.value

  // Options need to keep the same reference otherwise react-select doesn't focus the selected option
  const selectOptions = useMemo(
    () =>
      options ||
      Children.toArray(children)
        .flat()
        .reduce<SelectOption[]>((acc, child) => {
          if (
            React.isValidElement<{ children: string; value: string }>(child)
          ) {
            return [
              ...acc,
              {
                ...child.props,
                label: child.props.children,
              },
            ]
          }

          return acc
        }, []),
    [options, children],
  )

  useEffect(() => {
    if (animationOnChange) {
      setIsAnimated(true)
      setTimeout(() => setIsAnimated(false), animationDuration)
    }
  }, [setIsAnimated, animationOnChange, animationDuration, currentValue])

  return (
    <Select
      components={
        {
          ClearIndicator,
          DropdownIndicator,
          Input,
          MultiValueContainer,
          MultiValueLabel,
          MultiValueRemove,
          Option,
          SelectContainer,
          ValueContainer,
          ...customComponents,
        } as SelectComponents
      }
      placeholder={placeholder}
      className={className}
      isDisabled={disabled || readOnly}
      isOptionDisabled={option => !!option.disabled}
      styles={getSelectStyles({
        animation: isAnimated ? animation : undefined,
        animationDuration,
        customStyle,
        error,
        noTopLabel,
        theme,
      })}
      options={selectOptions}
      menuPortalTarget={menuPortalTarget || undefined}
      isSearchable={isSearchable}
      isClearable={isClearable}
      isMulti={isMulti}
      onBlur={onBlur}
      onChange={onChange}
      onFocus={onFocus}
      value={value as SelectOption}
      maxMenuHeight={250}
      inputId={inputId}
      // @ts-expect-error innerRef type issue
      ref={innerRef}
      name={name}
      id={idProp}
      time={time}
      isLoading={isLoading}
      required={required}
      noOptionsMessage={emptyState}
      data-testid={dataTestId}
    />
  )
}

type OptionComponent = (
  props: Partial<OptionProps<SelectOption> & SelectOption>,
) => JSX.Element

/**
 * SelectInput component is a wrapper around [react-select](https://react-select.com) component.
 * It provides a styled select input with a label and an error message.
 * @deprecated use SelectInputV2 component instead
 */
export const SelectInput = forwardRef(
  (props: SelectInputProps, ref: ForwardedRef<StateManagedSelect>) => (
    <FwdSelectInput innerRef={ref} {...props} />
  ),
) as ForwardRefExoticComponent<Partial<SelectInputProps>> & {
  Option: OptionComponent
}

SelectInput.displayName = 'SelectInput'

SelectInput.Option = Option as OptionComponent
