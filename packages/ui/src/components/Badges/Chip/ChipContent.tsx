import { cn } from '@ultraviolet/utils'
import type { ButtonHTMLAttributes, RefObject } from 'react'
import { Stack } from '../../Layout/Stack'
import type { ChipType } from './type'
import { chipStyle } from './styles.css'

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
    className={cn(className, chipStyle.contentStack({ disabled }))}
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
