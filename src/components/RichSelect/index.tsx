import { CSSObject, Theme, css, keyframes, useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import { transparentize } from 'polished'
import PropTypes from 'prop-types'
import React, {
  ForwardedRef,
  FunctionComponent,
  LabelHTMLAttributes,
  ReactElement,
  forwardRef,
  useEffect,
  useMemo,
  useState,
} from 'react'
import flattenChildren from 'react-flatten-children'
import Select, {
  ContainerProps,
  IndicatorProps,
  InputProps,
  MultiValueProps,
  OptionProps,
  OptionTypeBase,
  Props,
  ValueContainerProps as ValueContainerPropsBase,
  components,
} from 'react-select'
import isJSONString from '../../helpers/isJSON'
import { getUUID } from '../../utils'
import * as animations from '../../utils/animations'
import Box, { XStyledProps } from '../Box'
import Expandable from '../Expandable'
import Icon from '../Icon'

export interface SelectOption extends OptionTypeBase {
  value: string
  label: string
  disabled?: boolean
}

type SelectStyleGetterProps = {
  state: SelectProps
  error?: string
  theme: Theme
}

const getControlColor = ({ state, error, theme }: SelectStyleGetterProps) => {
  if (state.isDisabled) return theme.colors.gray300
  if (error) return theme.colors.warning

  return theme.colors.gray700
}

const getPlaceholderColor = ({
  state,
  error,
  theme,
}: SelectStyleGetterProps) => {
  if (state.isDisabled) return theme.colors.gray300
  if (error) return theme.colors.warning

  return theme.colors.gray550
}

const getOptionColor = ({ state, theme }: SelectStyleGetterProps) => {
  let color: string = theme.colors.gray700
  let backgroundColor: string = theme.colors.white
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

type SelectStyleFactory = (
  provided: CSSObject,
  state: SelectProps & WithSelectProps,
) => CSSObject

export type SelectStyleMap = Record<string, SelectStyleFactory>

type SelectStyleProps = {
  error?: string
  customStyle: (state: SelectProps) => CSSObject
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
    ...((customStyle(state)?.control || {}) as CSSObject),
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
    backgroundColor: theme.colors.gray200,
    display: state.selectProps?.time ? 'flex' : 'none',
    ...((customStyle(state)?.indicatorSeparator || {}) as CSSObject),
  }),
  input: provided => ({
    ...provided,
    flexGrow: 1,
    marginLeft: 0,
    paddingTop: 0,
  }),
  menu: (provided, state) => ({
    ...provided,
    ...((customStyle(state)?.menu || {}) as CSSObject),
    boxShadow: `0 0 0 1px ${transparentize(
      0.9,
      theme.colors.black,
    )}, 0 4px 11px ${transparentize(0.9, theme.colors.black)}`,
  }),
  menuList: (provided, state) => ({
    ...provided,
    backgroundColor: theme.colors.white,
    maxHeight: '225px',
    ...((customStyle(state)?.menuList || {}) as CSSObject),
  }),
  menuPortal: (provided, state) => ({
    ...provided,
    zIndex: 10000,
    ...((customStyle(state)?.menuPortal || {}) as CSSObject),
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
    marginTop: '11px',
    textOverflow: 'ellipsis',
    ...((customStyle(state)?.multiValue || {}) as CSSObject),
  }),
  multiValueLabel: (provided, state) => ({
    ...provided,
    color: state.isDisabled ? theme.colors.gray300 : theme.colors.gray700,
    fontSize: '14px',
    fontWeight: 'normal',
    lineHeight: '20px',
    ...((customStyle(state)?.multiValueLabel || {}) as CSSObject),
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
    ...((customStyle(state)?.multiValueRemove || {}) as CSSObject),
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
    ...((customStyle(state)?.option || {}) as CSSObject),
  }),
  placeholder: (provided, state) => ({
    ...provided,
    color: getPlaceholderColor({ error, state, theme }),
    ...((customStyle(state)?.placeholder || {}) as CSSObject),
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: state.isDisabled ? theme.colors.gray550 : theme.colors.gray700,
    marginLeft: state.hasValue ? 0 : undefined,
    marginRight: state.hasValue ? 0 : undefined,
    marginTop: !state.hasValue || noTopLabel ? 0 : '5px',
    paddingLeft: state.hasValue ? 0 : undefined,
    ...((customStyle(state)?.singleValue || {}) as CSSObject),
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    ...((customStyle(state)?.valueContainer || {}) as CSSObject),
    cursor: state.isDisabled ? 'not-allowed' : undefined,
    height: '100%',
  }),
})

export interface WithSelectProps {
  selectProps: SelectProps
}

type SelectProps = {
  inputId?: string | null
  error?: string
  labelId?: string
  noTopLabel?: boolean
  time?: number
  required?: boolean
  checked?: boolean
  additionalStyles?: Parameters<typeof css>[0]
} & Props<SelectOption, boolean> &
  XStyledProps

const StyledContainer = styled(Box, {
  shouldForwardProp: prop =>
    !['isDisabled', 'additionalStyles'].includes(prop.toString()),
})<SelectProps>`
  width: 100%;
  ${({ isDisabled }) => isDisabled && `pointer-events: initial;`};
  ${({ additionalStyles }) => css(additionalStyles)}
`

type SelectContainerProps = ContainerProps<SelectOption, boolean> &
  WithSelectProps

const SelectContainer: FunctionComponent<SelectContainerProps> = props => {
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
        <Box fontSize={12} color="warning" pt="2px">
          {error}
        </Box>
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
  }).isRequired,
}

type StyledPlaceholderProps = LabelHTMLAttributes<HTMLLabelElement> & {
  error?: string
  isMulti: boolean
  isDisabled?: boolean
  hasValue: boolean
}

const StyledPlaceholder = styled(Box, {
  shouldForwardProp: prop =>
    !['error', 'hasValue', 'isDisabled', 'isMulti'].includes(prop.toString()),
})<StyledPlaceholderProps>`
  position: absolute;
  left: 0;
  font-weight: 400;
  pointer-events: none;
  color: ${({ theme }) => theme.colors.gray550};
  white-space: nowrap;
  width: 100%;
  height: 100%;
  font-size: 16px;
  transition: transform 250ms ease;
  opacity: 0;

  ${({ error, theme }) => error && `color: ${theme.colors.warning};`}
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

  ${({ isDisabled, hasValue }) =>
    hasValue && isDisabled ? 'opacity: 0.5' : ''}
`

type ValueContainerProps = ValueContainerPropsBase<SelectOption, boolean> &
  WithSelectProps & {
    isDisabled?: boolean
  }

const ValueContainer: FunctionComponent<ValueContainerProps> = ({
  isDisabled,
  children,
  selectProps: { error, labelId, inputId, noTopLabel, ...selectProps },
  isMulti,
  hasValue,
  ...props
}) => (
  <components.ValueContainer
    {...props}
    selectProps={{ error, ...selectProps }}
    isMulti={isMulti}
    hasValue={hasValue}
  >
    <>
      {selectProps.placeholder && !noTopLabel ? (
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
  isDisabled: PropTypes.bool,
  isMulti: PropTypes.bool.isRequired,
  selectProps:
    SelectContainer.propTypes && SelectContainer.propTypes.selectProps,
}

const inputStyles = ({
  isMulti,
  hasValue,
  noTopLabel,
  placeholder,
}: SelectProps) => css`
  padding-top: ${(placeholder && hasValue) || noTopLabel ? 11 : 0}px;
  margin-left: 0px;
  ${!isMulti && 'caret-color: transparent'};
`

const Input: FunctionComponent<InputProps & SelectContainerProps> = ({
  isMulti = false,
  hasValue = false,
  selectProps: {
    inputId,
    labelId,
    noTopLabel,
    placeholder,
    ...selectProps
  } = {},
  ...props
}) => (
  <components.Input
    {...props}
    css={inputStyles({ hasValue, isMulti, noTopLabel, placeholder })}
    id={inputId}
    aria-controls={labelId}
    selectProps={{ ...selectProps, placeholder }}
  />
)

Input.propTypes = {
  hasValue: PropTypes.bool.isRequired,
  isMulti: PropTypes.bool.isRequired,
  selectProps:
    SelectContainer.propTypes && SelectContainer.propTypes.selectProps,
  value: PropTypes.string,
}

type RichOptionProps = OptionProps<SelectOption, boolean> & SelectOption

const Option: FunctionComponent<RichOptionProps> = ({
  selectProps,
  value,
  label,
  ...props
}) => (
  <div
    data-testid={`option-${selectProps.name || ''}-${
      isJSONString(value) ? label : value
    }`}
  >
    <components.Option {...props} selectProps={selectProps} label={label} />
  </div>
)

Option.propTypes = {
  label: PropTypes.string.isRequired,
  selectProps:
    SelectContainer.propTypes && SelectContainer.propTypes.selectProps,
  value: PropTypes.string.isRequired,
}

const DropdownIndicator: FunctionComponent<
  IndicatorProps<SelectOption, boolean> & WithSelectProps
> = props => {
  const { selectProps: { isDisabled, error, time, required } = {} } = props
  const color = useMemo(() => {
    if (isDisabled) return 'gray300'
    if (error) return 'warning'

    return 'gray350'
  }, [isDisabled, error])

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
  selectProps:
    SelectContainer.propTypes && SelectContainer.propTypes.selectProps,
}

const ClearIndicator: FunctionComponent<
  IndicatorProps<SelectOption, boolean> & WithSelectProps
> = ({ selectProps: { checked, error }, ...props }) => {
  const {
    innerProps: { ref, ...restInnerProps },
  } = props

  return (
    <components.ClearIndicator {...props}>
      <Icon
        {...restInnerProps}
        name="close"
        size={20}
        cursor="pointer"
        color={(checked && 'primary') || (error && 'warning') || 'gray350'}
      />
    </components.ClearIndicator>
  )
}

ClearIndicator.propTypes = {
  innerProps: PropTypes.shape({
    ref: PropTypes.shape({}).isRequired,
  }).isRequired,
  selectProps:
    SelectContainer.propTypes && SelectContainer.propTypes.selectProps,
}

const MultiValueContainer: FunctionComponent<MultiValueProps<SelectOption>> =
  props => <components.MultiValueContainer {...props} />

const MultiValueLabel: FunctionComponent<MultiValueProps<SelectOption>> =
  props => <components.MultiValueLabel {...props} />

const MultiValueRemove: FunctionComponent<MultiValueProps<SelectOption>> =
  props => (
    <components.MultiValueRemove {...props}>
      <Icon name="close" size={16} />
    </components.MultiValueRemove>
  )

type SelectComponents = typeof components

export type RichSelectProps = SelectProps &
  Partial<SelectStyleProps> & {
    animation?: string
    disabled?: boolean
    readOnly?: boolean
    innerRef?: ForwardedRef<unknown>
    customComponents?: Partial<SelectComponents>
  }

const RichSelect: FunctionComponent<RichSelectProps> = ({
  animation = 'pulse',
  animationDuration = 1000,
  animationOnChange = false,
  children,
  className,
  customComponents,
  customStyle = () => ({}),
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
  const labelId = useMemo(() => labelIdProp || getUUID('label'), [labelIdProp])
  const theme = useTheme()
  const [isAnimated, setIsAnimated] = useState(false)

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
  }, [setIsAnimated, animationOnChange, animationDuration, value])

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
        } as Partial<SelectComponents>
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
      value={value}
      maxMenuHeight={250}
      error={error}
      inputId={inputId}
      labelId={labelId}
      noTopLabel={noTopLabel}
      innerRef={innerRef}
      {...props}
    />
  )
}

const RichSelectWithRef = Object.assign(
  forwardRef((props: RichSelectProps, ref) => (
    <RichSelect innerRef={ref} {...props} />
  )),
  {
    Option: ({ children }: Partial<RichOptionProps>) => children as JSX.Element,
  },
)

RichSelectWithRef.propTypes = {
  /**
   * Name of the animation
   */
  animation: PropTypes.string, // oneOf(Object.keys(animations)),
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
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  inputId: PropTypes.string,
  isClearable: PropTypes.bool,
  isMulti: PropTypes.bool,
  isSearchable: PropTypes.bool,
  labelId: PropTypes.string,
  name: PropTypes.string.isRequired,
  /**
   * Show/hide the label inside the component
   */
  noTopLabel: PropTypes.bool,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
}
RichSelect.propTypes = RichSelectWithRef.propTypes

export default RichSelectWithRef
