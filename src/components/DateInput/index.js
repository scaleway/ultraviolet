import { Global } from '@emotion/react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import style from 'react-datepicker/dist/react-datepicker.min.css'
import Box from '../Box'
import Icon from '../Icon'
import Separator from '../Separator'
import { TextBox } from '../TextBox'
import Touchable from '../Touchable'
import { Typography } from '../Typography'

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
    border-color: ${({ theme: { colors } }) => colors.gray300};

    ${PREFIX}__header {
      color: ${({ theme: { colors } }) => colors.gray700};
      background-color: ${({ theme: { colors } }) => colors.white};
      border-bottom: none;
      text-align: inherit;
      display: block;
      padding-top: 0;
      position: inherit;
    }

    ${PREFIX}__triangle {
      border-bottom-color: ${({ theme: { colors } }) => colors.white};
    }
    ${PREFIX}__month {
      margin: 0;
    }

    ${PREFIX}__day-names {
      margin-top: 8px;
    }

    ${PREFIX}__day-name {
      font-family: 'Asap';
      color: ${({ theme: { colors } }) => colors.gray700};
      font-weight: 500;
      font-size: 14px;
      line-height: 24px;
      text-align: center;
      margin: 3px;
      text-transform: capitalize;
    }

    ${PREFIX}__day {
      color: ${({ theme: { colors } }) => colors.gray550};
      font-size: 16px;
      width: 1.7rem;
      height: 1.7rem;
      margin-left: 3px;
      margin-right: 3px;
    }

    ${PREFIX}__day--selected {
      color: ${({ theme: { colors } }) => colors.gray200};
      background-color: ${({ theme: { colors } }) => colors.primary};
      border-radius: 50%;
    }
    ${PREFIX}__day--keyboard-selected {
      color: ${({ theme: { colors } }) => colors.primary};
      background-color: ${({ theme: { colors } }) => colors.gray200};
      border-radius: 50%;
    }

    ${PREFIX}__day: hover {
      color: ${({ theme: { colors } }) => colors.primary};
      border-radius: 50%;
      background-color: ${({ theme: { colors } }) => colors.gray200};
    }

    ${PREFIX}__day--disabled {
      color: ${({ theme: { colors } }) => colors.gray200};
    }

    ${PREFIX}__day--disabled: hover {
      color: ${({ theme: { colors } }) => colors.gray200};
      background-color: ${({ theme: { colors } }) => colors.transparent};
    }
  }
`

const StyledSpan = styled.span`
  position: absolute;
  right: 16px;
  top: 16px;
`

const TopHeaderDiv = styled.div`
  margin-bottom: 8px;
  margin-left: 8px;
  display: inline-block;
  background-color: ${({ theme: { colors } }) => colors.white};
`

const DateInput = ({
  autoFocus,
  disabled,
  error,
  format,
  label,
  locale,
  maxDate,
  minDate,
  name,
  onBlur,
  onChange,
  onFocus,
  required,
  type,
  value,
}) => {
  if (locale) {
    registerLocale(locale?.code, locale)
  }

  return (
    <>
      <Global styles={style} />
      <StyledWrapper>
        <DatePicker
          autoFocus={autoFocus}
          fixedHeight
          name={name}
          locale={locale?.code || 'en-GB'}
          onBlur={onBlur}
          onChange={onChange}
          onFocus={onFocus}
          selected={value}
          type={type}
          customInput={
            <div>
              <TextBox
                error={error ? `${error}` : undefined}
                id={`date-input${name ? `-${name}` : ''}`}
                label={label}
                value={format(value) || ''}
                disabled={disabled}
              />
              <Box
                p={1}
                position="absolute"
                display="flex"
                alignItems="center"
                right={0}
                top={0}
                height={48}
              >
                {required && <Icon name="asterisk" color="warning" size={8} />}
                <Separator direction="vertical" mx={1} height="100%" />
                <Icon
                  name="calendar-range"
                  color={error ? 'warning' : 'gray'}
                  size={24}
                  alignSelf="center"
                />
              </Box>
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
                  {new Date(date).toLocaleString(locale?.code || 'fr-FR', {
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
                  <Icon size={11} name="chevron-left" color="lightBlack" />
                </Touchable>
                <Touchable
                  onClick={increaseMonth}
                  disabled={nextMonthButtonDisabled}
                  mx={1}
                >
                  <Icon size={11} name="chevron-right" color="lightBlack" />
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
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  format: PropTypes.func,
  label: PropTypes.string,
  locale: PropTypes.shape({
    code: PropTypes.string,
  }),
  maxDate: PropTypes.instanceOf(Date),
  minDate: PropTypes.instanceOf(Date),
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  required: PropTypes.bool,
  type: PropTypes.string,
  value: PropTypes.shape(Date.prototype),
}

DateInput.defaultProps = {
  autoFocus: false,
  disabled: false,
  error: false,
  format: value => value?.toISOString(),
  label: undefined,
  locale: undefined,
  maxDate: undefined,
  minDate: undefined,
  name: undefined,
  onBlur: () => {},
  onChange: () => {},
  onFocus: () => {},
  required: false,
  type: undefined,
  value: undefined,
}

export default DateInput
