import { EyeIcon } from '@ultraviolet/icons/EyeIcon'
import { EyeOffIcon } from '@ultraviolet/icons/EyeOffIcon'

import { Button } from '../Button'
import { Stack } from '../Stack'

import { textInputStyle } from './styles.css'

import type { TextInputProps } from './type'
import type { Dispatch, SetStateAction } from 'react'

export const ShowHidePassword = ({
  size,
  disabled,
  'data-testid': dataTestId,
  setIsPasswordVisible,
  isPasswordVisible,
}: Pick<TextInputProps, 'size' | 'disabled' | 'data-testid'> & {
  setIsPasswordVisible: Dispatch<SetStateAction<boolean>>
  isPasswordVisible: boolean
}) => (
  <Stack
    alignItems="center"
    className={textInputStyle.ctaSuffix}
    direction="row"
  >
    <Button
      aria-label={isPasswordVisible ? 'hide' : 'show'}
      data-testid={dataTestId ? `${dataTestId}-visibility-button` : undefined}
      disabled={disabled}
      onClick={() => {
        setIsPasswordVisible(!isPasswordVisible)
      }}
      sentiment="neutral"
      size={size === 'small' ? 'xsmall' : 'small'}
      variant="ghost"
    >
      {isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
    </Button>
  </Stack>
)
