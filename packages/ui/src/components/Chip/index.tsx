import styled from '@emotion/styled'
import { type ReactNode, useEffect, useMemo, useState } from 'react'
import { Stack } from '../Stack'
import { ChipContext } from './ChipContext'
import { ChipIcon } from './ChipIcon'

const StyledContainer = styled(Stack)`
  padding: ${({ theme }) => `${theme.space['0.5']} ${theme.space['2']} `};
  display: flex;
  border-radius: ${({ theme }) => theme.radii.xlarge};
  width: fit-content;
  background-color: ${({ theme }) => theme.colors.neutral.background};
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.colors.neutral.borderWeak};
  text-align: center;
  color: ${({ theme }) => theme.colors.neutral.text};
  user-select: none;

  &[data-disabled="false"]:hover {
    background-color: ${({ theme }) => theme.colors.neutral.backgroundHover};
    border-color: ${({ theme }) => theme.colors.neutral.borderStrongHover};
    color: ${({ theme }) => theme.colors.neutral.textHover};

  }

  &[data-disabled="true"] {
    background-color: ${({ theme }) => theme.colors.neutral.backgroundDisabled};
    border-color: ${({ theme }) => theme.colors.neutral.borderWeakDisabled};
    color: ${({ theme }) => theme.colors.neutral.textDisabled};
    cursor: not-allowed;
  }

  &[data-active="true"]{
    background-color: ${({ theme }) => theme.colors.primary.backgroundStrong};
    border-color:  ${({ theme }) => theme.colors.primary.backgroundStrong};
    color: ${({ theme }) => theme.colors.neutral.textStronger};

    &[data-disabled="false"]:hover{
      background-color: ${({ theme }) => theme.colors.primary.backgroundStrongHover};
      border-color: ${({ theme }) => theme.colors.primary.backgroundStrongHover};
      color: ${({ theme }) => theme.colors.neutral.textStrongerHover};


    }

    &[data-disabled="true"] {
      background-color: ${({ theme }) => theme.colors.primary.backgroundStrongDisabled};
      border: none;
    }
  }

  &[data-size='medium']{
    ${({ theme }) =>
      `font-size: ${theme.typography.caption.fontSize};
    font-family: ${theme.typography.caption.fontFamily};
    font-weight: ${theme.typography.caption.weight};
    letter-spacing: ${theme.typography.caption.letterSpacing};
    line-height: ${theme.typography.caption.lineHeight};
    text-transform: ${theme.typography.caption.textCase};
    text-decoration: ${theme.typography.caption.textDecoration};
    height: ${theme.space[3]};
`}
  }

  &[data-size='large']{
    ${({ theme }) =>
      `font-size: ${theme.typography.bodySmall.fontSize};
    font-family: ${theme.typography.bodySmall.fontFamily};
    font-weight: ${theme.typography.bodySmall.weight};
    letter-spacing: ${theme.typography.bodySmall.letterSpacing};
    line-height: ${theme.typography.bodySmall.lineHeight};
    text-transform: ${theme.typography.bodySmall.textCase};
    text-decoration: ${theme.typography.bodySmall.textDecoration};
    height: ${theme.space[4]}`}
  }
  `
type ChipType = {
  children: ReactNode
  size?: 'medium' | 'large'
  disabled?: boolean
  active?: boolean
  className?: string
  'data-testid'?: string
  onClick?: (active: boolean) => void
}

/**
 * Chip component is used to display a clickable status or a label in a small container
 */
export const Chip = ({
  children,
  size = 'medium',
  disabled = false,
  active = false,
  className,
  'data-testid': dataTestId,
  onClick,
}: ChipType) => {
  const [isActive, setIsActive] = useState(active)
  const prominence = useMemo(() => {
    if (isActive) return 'stronger'
    if (disabled) return 'weak'

    return 'default'
  }, [isActive, disabled])
  const value = useMemo(() => ({ isActive, disabled }), [isActive, disabled])
  useEffect(() => {
    setIsActive(active)
  }, [active])

  return (
    <ChipContext.Provider value={value}>
      <StyledContainer
        data-size={size}
        onClick={() => {
          if (!disabled) {
            setIsActive(!isActive)
            onClick?.(!isActive)
          }
        }}
        className={className}
        data-active={isActive}
        data-testid={dataTestId}
        alignItems="center"
        justifyContent="center"
        data-disabled={disabled}
        data-prominence={prominence}
        direction="row"
        gap={1}
      >
        {children}
      </StyledContainer>
    </ChipContext.Provider>
  )
}

Chip.Icon = ChipIcon
