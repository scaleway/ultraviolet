import { Theme, css } from '@emotion/react'
import styled from '@emotion/styled'
import { transparentize } from 'polished'
import PropTypes from 'prop-types'
import React, {
  FunctionComponent,
  InputHTMLAttributes,
  ReactNode,
  useMemo,
} from 'react'
import { Radio as ReakitRadio } from 'reakit'
import Box, { XStyledProps } from '../Box'
import Expandable from '../Expandable'
import Icon from '../Icon'
import Typography from '../Typography'

const StyledIcon = styled(Icon)``

const IconContainer = styled.div`
  min-width: 32px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
`

const disabledClass = ({ theme }: { theme: Theme }) => css`
  color: ${theme.colors.neutral.textDisabled};
  cursor: not-allowed;
`

const activeFocusClass = ({ theme }: { theme: Theme }) => css`
  :hover,
  :focus {
    ${IconContainer} {
      background-color: ${transparentize(
        0.75,
        theme.colors.neutral.background,
      )};
      border-radius: 50%;

      > ${StyledIcon} {
        fill: ${theme.colors.primary.text};
      }
    }
  }
`

const StyledRadioContainer = styled(Typography)<{
  disabled: boolean
  htmlFor: string
}>`
  position: relative;
  display: flex;
  align-items: center;
  height: 32px;
  cursor: pointer;

  ${({ disabled }) => (disabled ? disabledClass : activeFocusClass)}
`

const StyledRadio = styled(ReakitRadio)`
  position: absolute;
  opacity: 0.01;
`

const StyledError = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.danger.text};
  padding: ${({ theme }) => `0 ${theme.space['0.5']}`};
`

type RadioProps = {
  children: ReactNode
  valid?: boolean
  error?: string | ReactNode
  name: string
  size?: number
  value: string | number
  showError?: boolean
} & XStyledProps &
  InputHTMLAttributes<HTMLInputElement>

const Radio: FunctionComponent<RadioProps> = ({
  checked,
  onChange,
  onFocus,
  onBlur,
  disabled = false,
  error,
  name,
  valid,
  value,
  size = 24,
  children,
  showError = true,
  ...props
}): JSX.Element => {
  const color = useMemo(() => {
    if (disabled) return 'gray100'
    if (valid === false || !!error) return 'warning'
    if (valid === true) return 'success'
    if (checked) return 'primary'

    return 'gray300'
  }, [disabled, valid, checked, error])

  return (
    <Box {...props}>
      <StyledRadioContainer
        as="label"
        htmlFor={`${name}-${value}`}
        disabled={disabled}
      >
        <IconContainer>
          <StyledIcon
            name={checked ? 'radiobox-marked' : 'radiobox-blank'}
            color={color}
            size={size}
          />
        </IconContainer>
        <div>{children}</div>
        <StyledRadio
          type="radio"
          aria-checked={checked ? 'true' : 'false'}
          checked={checked}
          id={`${name}-${value}`}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          value={value}
          disabled={disabled}
          name={name}
        />
      </StyledRadioContainer>
      <Expandable opened={!!error && showError}>
        <StyledError>{error}</StyledError>
      </Expandable>
    </Box>
  )
}

Radio.propTypes = {
  checked: PropTypes.bool,
  /**
   * Component near the radio button
   */
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  /**
   * Size of the button
   */
  showError: PropTypes.bool,
  size: PropTypes.number,
  valid: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
}

export default Radio
