import { Global, useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import { VoidFunctionComponent } from 'react'
import DatePicker, {
  ReactDatePickerProps,
  registerLocale,
} from 'react-datepicker'
import style from 'react-datepicker/dist/react-datepicker.min.css'
import Icon from '../Icon'
import Separator from '../Separator'
import TextBox from '../TextBox'
import Touchable from '../Touchable'
import Typography from '../Typography'

const PREFIX = '.react-datepicker'

const StyledWrapper = styled.div`
  width: 100%;

  div${PREFIX}-wrapper {
    display: block;
  }
  div${PREFIX}__input-container {
    display: block;
  }
  div${PREFIX}__triangle {
    display: none;
  }
  div${PREFIX}__month-container {
    padding: 16px;
  }

  ${PREFIX}-popper {
    z-index: 1000;
  }
  .calendar {
    font-family: 'Asap';
    border-color: ${({ theme }) => theme.colors.neutral.borderWeak};

    ${PREFIX}__header {
      color: ${({ theme }) => theme.colors.neutral.text};
      background-color: ${({ theme }) => theme.colors.neutral.backgroundWeak};
      border-bottom: none;
      text-align: inherit;
      display: block;
      padding-top: 0;
      position: inherit;
    }

    ${PREFIX}__triangle {
      border-bottom-color: ${({ theme }) =>
        theme.colors.neutral.backgroundWeak};
    }
    ${PREFIX}__month {
      margin: 0;
    }

    ${PREFIX}__day-names {
      margin-top: 8px;
    }

    ${PREFIX}__day-name {
      font-family: 'Asap';
      color: ${({ theme }) => theme.colors.neutral.text};
      font-weight: 500;
      font-size: 14px;
      line-height: 24px;
      text-align: center;
      margin: 3px;
      text-transform: capitalize;
    }

    ${PREFIX}__day {
      color: ${({ theme }) => theme.colors.neutral.textWeak};
      font-size: 16px;
      width: 1.7rem;
      height: 1.7rem;
      margin-left: 3px;
      margin-right: 3px;
    }

    ${PREFIX}__day--selected {
      color: ${({ theme }) => theme.colors.primary.text};
      background-color: ${({ theme }) => theme.colors.primary.background};
      border-radius: 50%;
    }
    ${PREFIX}__day--keyboard-selected {
      color: ${({ theme }) => theme.colors.primary.text};
      background-color: ${({ theme }) => theme.colors.primary.background};
      border-radius: 50%;
    }

    ${PREFIX}__day: hover {
      color: ${({ theme }) => theme.colors.primary.text};
      border-radius: 50%;
      background-color: ${({ theme }) => theme.colors.primary.background};
    }

    ${PREFIX}__day--disabled {
      color: ${({ theme }) => theme.colors.primary.textWeakDisabled};
    }

    ${PREFIX}__day--disabled: hover {
      color: ${({ theme }) => theme.colors.primary.textWeakDisabled};
      background-color: transparent;
    }
  }
`

const StyledSpan = styled.span`
  position: absolute;
  right: 16px;
  top: 16px;
`

const StyledIconContainer = styled.div`
  padding: ${({ theme }) => theme.space['1']};
  position: absolute;
  display: flex;
  align-items: center;
  right: 0;
  top: 0;
  height: 48px;
`

const TopHeaderDiv = styled.div`
  margin-bottom: 8px;
  margin-left: 8px;
  display: inline-block;
  background-color: ${({ theme }) => theme.colors.neutral.backgroundWeak};
`
type DateInputProps = Pick<
  ReactDatePickerProps<string>,
  | 'autoFocus'
  | 'disabled'
  | 'locale'
  | 'maxDate'
  | 'minDate'
  | 'name'
  | 'onBlur'
  | 'onChange'
  | 'onFocus'
  | 'required'
> & {
  error?: string
  format?: (value?: Date | string) => string | undefined
  label?: string
  value?: Date | string
}

const DateInput: VoidFunctionComponent<DateInputProps> = ({
  autoFocus = false,
  disabled = false,
  error,
  format = value => (value instanceof Date ? value?.toISOString() : value),
  label,
  locale,
  maxDate,
  minDate,
  name,
  onBlur,
  onChange,
  onFocus,
  required = false,
  value,
}) => {
  const theme = useTheme()
  const localeCode =
    (typeof locale === 'string' ? locale : locale?.code) ?? 'en-GB'

  if (typeof locale === 'object') {
    registerLocale(localeCode, locale)
  }

  return (
    <>
      <Global styles={style} />
      <StyledWrapper>
        <DatePicker
          autoFocus={autoFocus}
          fixedHeight
          name={name}
          locale={localeCode}
          onBlur={onBlur}
          onChange={onChange}
          onFocus={onFocus}
          selected={value ? new Date(value) : undefined}
          customInput={
            <div>
              <TextBox
                error={error ? `${error}` : undefined}
                id={`date-input${name ? `-${name}` : ''}`}
                label={label}
                value={format(value) || ''}
                disabled={disabled}
              />
              <StyledIconContainer>
                {required && (
                  <Icon
                    name="asterisk"
                    color={theme.colors.danger.text}
                    size={8}
                  />
                )}
                <Separator direction="vertical" mx={1} height="100%" />
                <Icon
                  name="calendar-range"
                  color={
                    error ? theme.colors.danger.text : theme.colors.neutral.text
                  }
                  size={24}
                  alignSelf="center"
                />
              </StyledIconContainer>
            </div>
          }
          disabled={disabled}
          calendarClassName="calendar"
          minDate={minDate}
          maxDate={maxDate}
          renderCustomHeader={({
            date,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (
            <>
              <TopHeaderDiv>
                <Typography variant="bodyA" mr={1} textTransform="capitalize">
                  {new Date(date).toLocaleString(localeCode, {
                    month: 'long',
                    year: 'numeric',
                  })}
                </Typography>
              </TopHeaderDiv>
              <StyledSpan>
                <Touchable
                  onClick={decreaseMonth}
                  disabled={prevMonthButtonDisabled}
                  mx={1}
                >
                  <Icon
                    size={11}
                    name="chevron-left"
                    color={theme.colors.neutral.text}
                  />
                </Touchable>
                <Touchable
                  onClick={increaseMonth}
                  disabled={nextMonthButtonDisabled}
                  mx={1}
                >
                  <Icon
                    size={11}
                    name="chevron-right"
                    color={theme.colors.neutral.text}
                  />
                </Touchable>
              </StyledSpan>
            </>
          )}
        />
      </StyledWrapper>
    </>
  )
}

DateInput.propTypes = {
  /**
   * If set to `true` the input will be focused by default
   */
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  /**
   *
   */
  format: PropTypes.func,
  /**
   * Label of the field
   */
  label: PropTypes.string,
  /**
   * Locale provided by `date-fns/locales` package
   */
  locale: PropTypes.oneOfType([
    PropTypes.shape({
      code: PropTypes.string.isRequired,
    }),
    PropTypes.string,
  ]),
  /**
   * Max date that are allowed
   */
  maxDate: PropTypes.instanceOf(Date),
  /**
   * Min data that are allowed
   */
  minDate: PropTypes.instanceOf(Date),
  /**
   * Input name
   */
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  required: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
}

export default DateInput
