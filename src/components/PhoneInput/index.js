import styled from '@emotion/styled'
import { transparentize } from 'polished'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import ReactPhoneInput from 'react-phone-input-2'
import { theme } from '../../theme'
import 'react-phone-input-2/lib/style.css'
import 'react-phone-input-2/lib/material.css'

const StyleWrapper = styled.div`
  position: relative;
  flex: 1;

  > label {
    color: ${theme.gray550};
    display: block;
    font-size: 16;
    height: 48;
    left: 0;
    overflow: hidden;
    padding-left: 48px;
    padding-right: 8;
    pointer-events: none;
    position: absolute;
    text-overflow: ellipsis;
    top: 0;
    transform: translate(0, 12px) scale(1);
    transition: transform 0.15s;
    white-space: nowrap;
    width: 100%;

    &.visited {
      padding-left: 56px;
      transform: translate(-9.6%, -3px) scale(0.8);
    }
  }

  .react-tel-input {
    > .flag-dropdown,
    > .flag-dropdown .selected-flag {
      background: none;
      border: none;
      cursor: ${({ disabled, disableDropdown }) =>
        disabled || disableDropdown ? 'not-allowed' : 'inherit'};
      pointer-events: ${({ disabled, disableDropdown }) =>
        disabled || disableDropdown ? 'none' : 'inherit'};
    }
    .country-list {
      max-height: 300px;

      .search-emoji {
        display: none;
      }
    }
    > input.form-control[type='tel'] {
      background-color: ${theme.white};
      background-image: none;
      border-color: ${theme.gray350};
      border-radius: 4px;
      border-style: solid;
      border-width: 1px;
      color: ${({ visited }) => (visited ? theme.gray700 : theme.white)};
      display: block;
      font-size: 16px;
      line-height: 24px;
      max-width: 100%;
      outline: none;
      padding-right: 8px;
      padding-top: 14px;
      position: relative;
      transition: border 0.1s;
      width: 100%;
      height: 48px;

      :focus {
        box-shadow: 0 0 0 2px ${transparentize(0.75, theme.primary)};
        border-color: ${theme.primary};
      }
    }
  }
`
const PhoneInput = ({
  disabled,
  disableDropdown,
  inputProps,
  onChange,
  value,
}) => {
  const [visited, setVisited] = useState(false)

  useEffect(() => {
    setVisited(visited || (!!value && value.length > 0))
  }, [value, visited])

  const handleFocus = () => {
    setVisited(true)
  }

  return (
    <StyleWrapper
      visited={visited}
      disabled={disabled}
      disableDropdown={disableDropdown}
    >
      <ReactPhoneInput
        disabled={disabled}
        disableDropdown={disableDropdown}
        inputProps={inputProps}
        value={value}
        onChange={onChange}
        enableSearchField
        enableLongNumbers={15}
        onFocus={handleFocus}
        placeholder={visited ? '+1 012346789' : ''}
        country="us"
      />
    </StyleWrapper>
  )
}

PhoneInput.propTypes = {
  disabled: PropTypes.bool,
  disableDropdown: PropTypes.bool,
  inputProps: PropTypes.objectOf(PropTypes.bool),
  onChange: PropTypes.func,
  value: PropTypes.string,
}

PhoneInput.defaultProps = {
  disabled: false,
  disableDropdown: false,
  inputProps: {},
  onChange: () => {},
  value: '',
}

export { PhoneInput }
