import { CSSObject, Theme, css, keyframes, useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import {
  ForwardRefExoticComponent,
  ForwardedRef,
  ReactElement,
  ReactNode,
  forwardRef,
  useEffect,
  useId,
  useMemo,
  useState,
} from 'react'
import flattenChildren from 'react-flatten-children'
import Select, {
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
  components,
} from 'react-select'
import isJSONString from '../../helpers/isJSON'
import * as animations from '../../utils/animations'
import Box, { XStyledProps } from '../Box'
import Expandable from '../Expandable'
import Icon from '../Icon'
import Stack from '../Stack'
import Text from '../Text'

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
  if (error) return theme.colors.danger.textWeak

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
   * Custom styles of the RichSelect. See [React select documentation](https://react-select.com/styles)
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
      : theme.colors.neutral.backgroundWeak,
    borderColor: error
      ? theme.colors.danger.border
      : theme.colors.neutral.borderWeak,
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
        borderColor: error
          ? theme.colors.danger.border
          : theme.colors.primary.border,
        boxShadow: error
          ? theme.shadows.focusDanger
          : theme.shadows.focusPrimary,
        svg: {
          fill: error ? theme.colors.danger.text : theme.colors.primary.text,
        },
      },
      ':hover': {
        borderColor: error
          ? theme.colors.danger.borderHover
          : theme.colors.primary.borderHover,
        svg: {
          fill: error ? theme.colors.danger.text : theme.colors.primary.text,
        },
      },
    }),
    ...(customStyle(state)?.control || {}),
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
    backgroundColor: theme.colors.neutral.borderWeak,
    display: state.selectProps?.time ? 'flex' : 'none',
    ...(customStyle(state)?.indicatorSeparator || {}),
  }),
  input: provided => ({
    ...provided,
    flexGrow: 1,
    marginLeft: 0,
    paddingTop: noTopLabel ? 0 : 11,
  }),
  menu: (provided, state) => ({
    ...provided,
    ...(customStyle(state)?.menu || {}),
    boxShadow: theme.shadows.menu,
  }),
  menuList: (provided, state) => ({
    ...provided,
    backgroundColor: theme.colors.neutral.backgroundWeak,
    maxHeight: '225px',
    ...(customStyle(state)?.menuList || {}),
  }),
  menuPortal: (provided, state) => ({
    ...provided,
    zIndex: 10000,
    ...(customStyle(state)?.menuPortal || {}),
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
    ...(customStyle(state)?.multiValue || {}),
  }),
  multiValueLabel: (provided, state) => ({
    ...provided,
    color: state.isDisabled
      ? theme.colors.neutral.textDisabled
      : theme.colors.neutral.text,
    fontSize: '14px',
    fontWeight: 'normal',
    lineHeight: '20px',
    ...(customStyle(state)?.multiValueLabel || {}),
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
    ...(customStyle(state)?.multiValueRemove || {}),
  }),
  option: (provided, state) => ({
    ...provided,
    ...getOptionColor({ state, theme }),
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
    ...(customStyle(state)?.option || {}),
  }),
  placeholder: (provided, state) => ({
    ...provided,
    color: getPlaceholderColor({ error, state, theme }),
    ...(customStyle(state)?.placeholder || {}),
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
    ...(customStyle(state)?.singleValue || {}),
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    ...(customStyle(state)?.valueContainer || {}),
    cursor: state.isDisabled ? 'not-allowed' : undefined,
    height: '100%',
    label: {
      display: noTopLabel ? 'none' : 'initial',
    },
    paddingTop: 0,
  }),
})

export type WithSelectProps = {
  selectProps: SelectProps
}

type SelectProps = StyledContainerProps &
  Omit<Props<SelectOption>, 'value'> &
  CommonProps<SelectOption, boolean, GroupBase<SelectOption>> &
  XStyledProps & {
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

const StyledContainer = styled(Box, {
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

const ExpandableWithHiddenOverflow = styled(Expandable)`
  overflow: hidden;
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
    selectProps: {
      name = '',
      mt = 0,
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
    } = {},
  } = props

  return (
    <StyledContainer
      data-testid={`rich-select-${name}`}
      additionalStyles={getStyles?.('container', props)}
      isDisabled={isDisabled}
      className={className}
      onKeyDown={onKeyDown}
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
      <ExpandableWithHiddenOverflow height={56} opened={!!error}>
        <StyledError>{error}</StyledError>
      </ExpandableWithHiddenOverflow>
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

const StyledText = styled(Text)<{ isSelectedAndNotFocused: boolean }>`
  margin-left: ${({ theme }) => theme.space['1']};
  color: ${({ isSelectedAndNotFocused, theme }) =>
    isSelectedAndNotFocused ? theme.colors.primary.textStrong : undefined};
`

const MaxLineStyledText = styled(StyledText)`
  -webkit-line-clamp: 3;
  margin-top: ${({ theme }) => theme.space['2']};
`

const ValueContainer = ({
  isDisabled,
  children,
  selectProps: { error, labelId, inputId, ...selectProps },
  isMulti,
  hasValue,
  ...props
}: ValueContainerProps<SelectOption> & WithSelectProps) => (
  <components.ValueContainer
    {...props}
    selectProps={selectProps}
    isMulti={isMulti}
    hasValue={hasValue}
    isDisabled={isDisabled}
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
  ...props
}: InputProps<SelectOption> & WithSelectProps) => (
  <components.Input
    {...props}
    css={inputStyles({ isMulti })}
    id={inputId}
    aria-controls={labelId}
    hasValue={hasValue}
    isMulti={isMulti}
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
  const theme = useTheme()
  const color = useMemo(
    () =>
      isDisabled
        ? theme.colors.neutral.textDisabled
        : theme.colors.neutral.text,
    [theme, isDisabled],
  )

  return (
    <components.DropdownIndicator {...props}>
      <Stack gap={2} direction="row">
        <Icon
          name={time ? 'clock-outline' : 'chevron-down'}
          size={time ? 24 : 11}
          color={color}
        />
        {required ? (
          <Icon name="asterisk" size={8} color={theme.colors.danger.text} />
        ) : null}
      </Stack>
    </components.DropdownIndicator>
  )
}

const ClearIndicator = (
  props: ClearIndicatorProps<SelectOption> & WithSelectProps,
) => {
  const theme = useTheme()
  const {
    selectProps: { checked, error },
    innerProps: { ref, ...restInnerProps },
  } = props

  return (
    <components.ClearIndicator {...props}>
      <Icon
        {...restInnerProps}
        name="close"
        size={20}
        cursor="pointer"
        color={
          (checked && theme.colors.primary.text) ||
          (error && theme.colors.danger.text) ||
          theme.colors.neutral.text
        }
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
    <Icon name="close" size={16} />
  </components.MultiValueRemove>
)

type SelectComponents = SelectProps['components']

type StateManagedSelect = typeof Select

type RichSelectProps = SelectProps &
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
     * Custom components of the RichSelect. See [React select documentation](https://react-select.com/components)
     */
    customComponents?: SelectProps['components']
    children: ReactNode
  }

const defaultCustomStyle = () => ({})

const RichSelect = ({
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
  labelId: labelIdProp,
  menuPortalTarget,
  noTopLabel = false,
  onChange,
  options,
  placeholder,
  readOnly = false,
  value,
  ...props
}: Partial<RichSelectProps>) => {
  const id = useId()
  const inputId = inputIdProp ?? id
  const theme = useTheme()
  const [isAnimated, setIsAnimated] = useState(false)
  const currentValue = (value as SelectOption)?.value

  // Options need to keep the same reference otherwise react-select doesn't focus the selected option
  const selectOptions = useMemo(
    () =>
      options ||
      (flattenChildren(children) as ReactElement<{ children: string }>[]).map(
        ({ props: { children: label, ...subProps } }) =>
          ({
            ...subProps,
            label,
          } as SelectOption),
      ),
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
      onChange={onChange}
      value={value as SelectOption}
      maxMenuHeight={250}
      inputId={inputId}
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      ref={innerRef as any}
      {...props}
    />
  )
}

type OptionComponent = (
  props: Partial<OptionProps<SelectOption> & SelectOption>,
) => JSX.Element

const RichSelectWithRef = forwardRef(
  (props: RichSelectProps, ref: ForwardedRef<StateManagedSelect>) => (
    <RichSelect innerRef={ref} {...props} />
  ),
) as ForwardRefExoticComponent<Partial<RichSelectProps>> & {
  Option: OptionComponent
}

RichSelectWithRef.Option = Option as OptionComponent

export default RichSelectWithRef
