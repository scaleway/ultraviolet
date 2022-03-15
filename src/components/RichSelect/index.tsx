import { CSSObject, Theme, css, keyframes, useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import { transparentize } from 'polished'
import PropTypes from 'prop-types'
import React, {
  ForwardRefExoticComponent,
  ForwardedRef,
  FunctionComponent,
  ReactElement,
  ReactNode,
  Validator,
  forwardRef,
  useEffect,
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
import { getUUID } from '../../utils'
import * as animations from '../../utils/animations'
import Box, { XStyledProps } from '../Box'
import Expandable from '../Expandable'
import Icon from '../Icon'
import Typography from '../Typography'

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
  if (state.isDisabled) return theme.colors.neutral.textWeakDisabled
  if (error) return theme.colors.danger.textWeak

  return theme.colors.neutral.textWeak
}

const getOptionColor = ({ state, theme }: SelectStyleGetterProps) => {
  let color: string = theme.colors.neutral.text
  let backgroundColor: string = theme.colors.neutral.backgroundWeak
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
  customStyle: (
    state: SelectProps & WithSelectProps,
  ) => Record<string, CSSObject>
  animation?: string
  animationDuration: number
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
      ? theme.colors.neutral.backgroundWeakDisabled
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
        boxShadow: `0 0 2px 2px ${transparentize(
          0.75,
          error
            ? theme.colors.danger.backgroundStrong
            : theme.colors.primary.backgroundStrong,
        )}`,
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
    boxShadow: `0 0 0 1px ${transparentize(
      0.9,
      theme.colors.neutral.backgroundStronger,
    )}, 0 4px 11px ${transparentize(
      0.9,
      theme.colors.neutral.backgroundStronger,
    )}`,
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
    marginTop: '11px',
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
        ? theme.colors.neutral.backgroundWeakDisabled
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

export type WithSelectProps =  {
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
  shouldForwardProp: prop =>
    !['isDisabled', 'additionalStyles'].includes(prop.toString()),
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

const SelectContainer: FunctionComponent<
  ContainerProps<SelectOption> & WithSelectProps
> = props => {
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
      <Expandable height={56} overflow="hidden" opened={!!error}>
        <StyledError>{error}</StyledError>
      </Expandable>
    </StyledContainer>
  )
}

SelectContainer.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  getStyles: PropTypes.func.isRequired,
  innerProps: PropTypes.shape({}).isRequired,
  isDisabled: PropTypes.bool.isRequired,
  selectProps: PropTypes.shape({
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    flex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    inputId: PropTypes.string,
    labelId: PropTypes.string,
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
  }) as Validator<SelectProps & ContainerProps<SelectOption>['selectProps']>,
}

type StyledPlaceholderProps = {
  error?: string
  isMulti: boolean
  isDisabled?: boolean
  hasValue: boolean
}

const StyledPlaceholder = styled('label', {
  shouldForwardProp: prop =>
    !['error', 'hasValue', 'isDisabled', 'isMulti'].includes(prop.toString()),
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

const ValueContainer: FunctionComponent<
  ValueContainerProps<SelectOption> & WithSelectProps
> = ({
  isDisabled,
  children,
  selectProps: { error, labelId, inputId, ...selectProps },
  isMulti,
  hasValue,
  ...props
}) => (
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

ValueContainer.propTypes = {
  children: PropTypes.node,
  hasValue: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  isMulti: PropTypes.bool.isRequired,
  selectProps: SelectContainer.propTypes?.selectProps,
}

const inputStyles = ({ isMulti }: Partial<SelectProps>) => css`
  margin-left: 0px;
  ${!isMulti && 'caret-color: transparent'};
`

const Input: FunctionComponent<InputProps<SelectOption> & WithSelectProps> = ({
  isMulti,
  hasValue,
  selectProps: { inputId, labelId, placeholder, ...selectProps } = {},
  ...props
}) => (
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

Input.propTypes = {
  hasValue: PropTypes.bool.isRequired,
  isMulti: PropTypes.bool.isRequired,
  selectProps: SelectContainer.propTypes?.selectProps,
  value: PropTypes.string,
}

const Option: FunctionComponent<OptionProps<SelectOption> & SelectOption> = ({
  selectProps,
  value,
  label,
  children,
  data: { inlineDescription, description },
  isSelected,
  data,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const theme = useTheme()

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
          <Typography
            as="span"
            variant="bodyB"
            color={
              isSelected && !isFocused
                ? theme.colors.primary.textStrong
                : undefined
            }
            ml={1}
          >
            {inlineDescription}
          </Typography>
        ) : null}
        {description ? (
          <Typography
            as="p"
            variant="bodyB"
            color={
              isSelected && !isFocused
                ? theme.colors.primary.textStrong
                : undefined
            }
            mt={1}
            maxLines={3}
          >
            {description}
          </Typography>
        ) : null}
      </components.Option>
    </div>
  )
}

Option.propTypes = {
  description: PropTypes.string,
  inlineDescription: PropTypes.string,
  label: PropTypes.string.isRequired,
  selectProps: SelectContainer.propTypes?.selectProps,
  value: PropTypes.string.isRequired,
}

Option.defaultProps = {
  description: undefined,
  inlineDescription: undefined,
}

const DropdownIndicator: FunctionComponent<
  DropdownIndicatorProps<SelectOption> & WithSelectProps
> = props => {
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
      <Icon
        name={time ? 'clock-outline' : 'chevron-down'}
        size={time ? 24 : 11}
        color={color}
        mr={required ? 2 : 0}
      />
      {required ? (
        <Icon name="asterisk" size={8} color={theme.colors.danger.text} />
      ) : null}
    </components.DropdownIndicator>
  )
}

DropdownIndicator.propTypes = {
  selectProps: SelectContainer.propTypes?.selectProps,
}

const ClearIndicator: FunctionComponent<
  ClearIndicatorProps<SelectOption> & WithSelectProps
> = props => {
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

ClearIndicator.propTypes = {
  innerProps: PropTypes.shape({}).isRequired,
  selectProps: SelectContainer.propTypes?.selectProps,
}

const MultiValueContainer: FunctionComponent<
  MultiValueProps<SelectOption>
> = props => <components.MultiValueContainer {...props} />

const MultiValueLabel: FunctionComponent<
  MultiValueProps<SelectOption>
> = props => <components.MultiValueLabel {...props} />

const MultiValueRemove: FunctionComponent<
  MultiValueProps<SelectOption>
> = props => (
  <components.MultiValueRemove {...props}>
    <Icon name="close" size={16} />
  </components.MultiValueRemove>
)

type SelectComponents = SelectProps['components']

type StateManagedSelect = typeof Select

type RichSelectProps = SelectProps &
  SelectStyleProps & {
    animation?: string
    animationOnChange?: boolean
    disabled?: boolean
    readOnly?: boolean
    innerRef?: ForwardedRef<StateManagedSelect>
    customComponents?: SelectProps['components']
    children: ReactNode
  }

const defaultCustomStyle = () => ({})

const RichSelect: FunctionComponent<Partial<RichSelectProps>> = ({
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
}) => {
  const inputId = useMemo(() => inputIdProp || getUUID('input'), [inputIdProp])
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

type OptionComponent = FunctionComponent<
  Partial<OptionProps<SelectOption> & SelectOption>
>

const RichSelectWithRef = forwardRef(
  (props: RichSelectProps, ref: ForwardedRef<StateManagedSelect>) => (
    <RichSelect innerRef={ref} {...props} />
  ),
) as ForwardRefExoticComponent<Partial<RichSelectProps>> & {
  Option: OptionComponent
}

RichSelectWithRef.Option = Option as OptionComponent

RichSelectWithRef.propTypes = {
  /**
   * Name of the animation
   */
  animation: PropTypes.oneOf(Object.keys(animations)),
  /**
   * Time of the animation
   */
  animationDuration: PropTypes.number,
  /**
   * Play the animation when the value change
   */
  animationOnChange: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  className: PropTypes.string,
  /**
   * Custom components of the RichSelect. See [React select documentation](https://react-select.com/components)
   */
  customComponents: PropTypes.shape({}),
  /**
   * Custom styles of the RichSelect. See [React select documentation](https://react-select.com/styles)
   */
  customStyle: PropTypes.func,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  inputId: PropTypes.string,
  isClearable: PropTypes.bool,
  isMulti: PropTypes.bool,
  isSearchable: PropTypes.bool,
  labelId: PropTypes.string,
  name: PropTypes.string,
  /**
   * Show/hide the label inside the component
   */
  noTopLabel: PropTypes.bool,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ]),
}
RichSelect.propTypes = RichSelectWithRef.propTypes

export default RichSelectWithRef
