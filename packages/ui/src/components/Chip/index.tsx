import styled from '@emotion/styled'
import { type ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import { Stack } from '../Stack'
import { Text } from '../Text'
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
    ${({ theme }) => `
    height: ${theme.space[3]};
    padding: ${theme.space['0.5']} ${theme.space['1.5']};`}
  }

  &[data-size='large']{
    ${({ theme }) => `
    height: ${theme.space[4]};
    padding: ${theme.space['0.5']} ${theme.space['2']};`}
  }

  &[data-trailing-icon="true"] {
    padding-right: ${({ theme }) => theme.space[1]}
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
  const [hasTrailingIcon, setTrailingIcon] = useState(false)
  const chipRef = useRef<HTMLDivElement>(null) // ref to the parent container
  const iconRef = useRef<HTMLButtonElement>(null)
  const prominence = useMemo(() => {
    if (isActive) return 'stronger'
    if (disabled) return 'weak'

    return 'default'
  }, [isActive, disabled])
  const value = useMemo(
    () => ({ isActive, disabled, iconRef }),
    [isActive, disabled, iconRef],
  )
  useEffect(() => {
    setIsActive(active)
  }, [active])

  useEffect(() => {
    if (chipRef.current && iconRef.current) {
      const lastChildNode = chipRef.current.lastChild

      // Compare the last child element with iconRef.current to check if the last element is an Icon
      // This will mean that there is a trailing icon
      if (lastChildNode === iconRef.current) {
        setTrailingIcon(true)
      } else setTrailingIcon(false)
    }
  }, [children, iconRef])

  return (
    <ChipContext.Provider value={value}>
      <Text
        as={typeof children === 'string' ? 'text' : 'div'}
        variant={size === 'large' ? 'bodySmall' : 'caption'}
      >
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
          ref={chipRef}
          data-trailing-icon={hasTrailingIcon}
        >
          {children}
        </StyledContainer>
      </Text>
    </ChipContext.Provider>
  )
}

Chip.Icon = ChipIcon
