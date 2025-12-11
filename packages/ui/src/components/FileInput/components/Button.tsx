import type { ComponentProps } from 'react'
import { Button } from '../../Button'
import { useFileInput } from '../FileInputProvider'
import { buttonFileInput } from '../styles.css'

export const FileInputButton = ({
  children,
  disabled,
  ...props
}: ComponentProps<typeof Button>) => {
  const context = useFileInput()

  if (!context) {
    throw new Error(
      'FileInput.Button should be inside FileInput to work properly.',
    )
  }
  const isDisabled = disabled || context.disabled

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Button {...props} disabled={isDisabled}>
      <label
        className={buttonFileInput[isDisabled ? 'disabled' : 'default']}
        htmlFor={context.inputId}
      >
        {children}
      </label>
    </Button>
  )
}
