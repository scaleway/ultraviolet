import { AlertCircleIcon } from '@ultraviolet/icons/AlertCircleIcon'
import { CheckCircleIcon } from '@ultraviolet/icons/CheckCircleIcon'
import { CloseIcon } from '@ultraviolet/icons/CloseIcon'
import type {
  ChangeEvent,
  ChangeEventHandler,
  Dispatch,
  RefObject,
  SetStateAction,
} from 'react'
import { Button } from '../Button'
import { Loader } from '../Loader'
import { Stack } from '../Stack'
import { textInputStyle } from './styles.css'
import type { TextInputProps } from './type'

export const RightIcon = ({
  success,
  error,
  loading,
  computedClearable,
  disabled,
  size,
  computedValue,
  inputRef,
  setLocalValue,
  onChangeCallback,
}: Pick<
  TextInputProps,
  'success' | 'error' | 'loading' | 'disabled' | 'size'
> & {
  computedClearable: boolean
  computedValue?: string
  inputRef?: RefObject<HTMLInputElement | null>
  setLocalValue: Dispatch<SetStateAction<string | undefined>>
  onChangeCallback: ChangeEventHandler<HTMLInputElement>
}) =>
  success || error || loading || computedClearable ? (
    <Stack
      alignItems="center"
      className={textInputStyle.stateStack}
      direction="row"
      gap={1}
    >
      {computedClearable ? (
        <Button
          aria-label="clear value"
          disabled={disabled || !computedValue}
          onClick={() => {
            if (inputRef?.current) {
              inputRef.current.value = ''
              setLocalValue('')
              // oxlint-disable-next-line typescript/no-unsafe-type-assertion
              onChangeCallback({
                currentTarget: { value: '' },
                target: { value: '' },
              } as ChangeEvent<HTMLInputElement>)
            }
          }}
          sentiment="neutral"
          size={size === 'small' ? 'xsmall' : 'small'}
          variant="ghost"
        >
          <CloseIcon size="small" />
        </Button>
      ) : null}
      {success ? (
        <CheckCircleIcon disabled={disabled} sentiment="success" size="small" />
      ) : null}
      {error ? (
        <AlertCircleIcon disabled={disabled} sentiment="danger" size="small" />
      ) : null}
      {loading && !disabled ? <Loader active size="small" /> : null}
    </Stack>
  ) : null
