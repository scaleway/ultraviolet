import { AlertCircleIcon } from '@ultraviolet/icons/AlertCircleIcon'
import { CloseIcon } from '@ultraviolet/icons/CloseIcon'
import type { Dispatch, SetStateAction } from 'react'
import { Button } from '../Button'
import { Stack } from '../Stack'

export const RightIcon = ({
  error,
  clearable,
  isEditable,
  setTime,
  onChange,
}: {
  error: boolean
  clearable?: boolean
  isEditable: boolean
  setTime: Dispatch<SetStateAction<Date | null | undefined>>
  onChange?: (value: Date | undefined, valuePeriod?: string) => void
}) => (
  <Stack alignItems="center" direction="row" gap="1">
    {error ? <AlertCircleIcon sentiment="danger" /> : null}
    {clearable ? (
      <Button
        aria-label="clear value"
        data-testid="clear"
        disabled={isEditable}
        onClick={event => {
          event.stopPropagation()
          setTime(undefined)
          onChange?.(undefined)
        }}
        sentiment="neutral"
        size="small"
        variant="ghost"
      >
        <CloseIcon />
      </Button>
    ) : null}
  </Stack>
)
