import type { ButtonHTMLAttributes, RefObject } from 'react'
import { Stack } from '../../Layout/Stack'
import type { ChipType } from './type'

type ChipContentType = ChipType & {
  chipRef?: RefObject<HTMLButtonElement | null>
  onClick: () => void
} & Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'aria-pressed'>

export const ChipContent = ({
  className,
  'data-testid': dataTestId,
  onClick,
  chipRef,
  style,
  children,
  disabled,
  'aria-pressed': ariaPressed,
}: ChipContentType) => (
  <Stack
    aria-pressed={ariaPressed}
    alignItems="center"
    className={className}
    data-testid={dataTestId}
    direction="row"
    gap={1}
    justifyContent="center"
    onClick={onClick}
    ref={chipRef}
    as="button"
    style={style}
    disabled={disabled}
  >
    {children}
  </Stack>
)
