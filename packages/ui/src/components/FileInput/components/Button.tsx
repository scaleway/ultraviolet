import type { ComponentProps } from 'react'
import { Button } from '../../Action/Button'
import { useFileInput } from '../FileInputProvider'

export const FileInputButton = ({ children, disabled, ...props }: ComponentProps<typeof Button>) => {
  const context = useFileInput()
  const isDisabled = disabled || context.disabled

  return (
    <Button {...props} disabled={isDisabled} onClick={() => context.inputRef.current?.click()}>
      {children}
    </Button>
  )
}

FileInputButton.displayName = 'FileInput.Button'
