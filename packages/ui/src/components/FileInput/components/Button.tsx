import { Button } from '../../Button'
import { useFileInput } from '../FileInputProvider'

import type { ComponentProps } from 'react'

export const FileInputButton = ({
  children,
  disabled,
  ...props
}: ComponentProps<typeof Button>) => {
  const context = useFileInput()
  const isDisabled = disabled || context.disabled

  return (
    <Button
      {...props}
      disabled={isDisabled}
      onClick={() => context.inputRef.current?.click()}
    >
      {children}
    </Button>
  )
}
