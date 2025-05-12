'use client'

import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import { CheckIcon } from '@ultraviolet/icons'
import type { ReactNode } from 'react'
import { useMemo } from 'react'
import { Bullet } from '../Bullet'
import { Stack } from '../Stack'
import { Text } from '../Text'
import { useStepper } from './StepperProvider'

const LINE_HEIGHT_SIZES = {
  small: 2,
  medium: 4,
} as const

type StepProps = {
  onClick?: (index: number) => void
  /**
   * Automatically attribued by the parent Stepper
   */
  index?: number
  /**
   * Whether the step is disabled
   */
  disabled?: boolean
  /**
   * Title of the step
   */
  title?: ReactNode
  /**
   * For additional information.
   * Use prop `title` to properly name the step
   */
  children?: ReactNode
  className?: string
  'data-testid'?: string
}
const loadingAnimation = (size: 'small' | 'medium') => keyframes`
  from {
    width: 0;
  }
  to {
    width: calc(100% - ${size === 'small' ? '24px' : '32px'} - 8px)};
`

const loadingStyle = (size: 'small' | 'medium') => css`
  animation: ${loadingAnimation(size)} 1s linear infinite;
`

const StyledBullet = styled(Bullet)<{
  size: 'small' | 'medium'
  isActive: boolean
}>`
  margin-top: ${({ theme, size }) =>
    size === 'small' ? theme.space['0.5'] : 0};
  transition: box-shadow 300ms;
  min-width: ${({ theme, size }) =>
    size === 'small' ? theme.space[3] : theme.space[4]};
  ${({ theme, isActive }) =>
    isActive
      ? `background-color: ${theme.colors.primary.backgroundStrongHover};
          box-shadow: ${theme.shadows.focusPrimary};`
      : null};
`

const StyledText = styled(Text)`
  transition: text-decoration-color 250ms ease-out;
  text-decoration-thickness: 1px;
  text-underline-offset: 2px;
  text-decoration-color: transparent;
`

const StyledStepContainer = styled(Stack)<{
  'data-disabled': boolean
  'data-interactive': boolean
  'data-hide-separator': boolean
  'data-label-position': 'bottom' | 'right'
  size: 'small' | 'medium'
  'data-selected': boolean
  'data-done': boolean
  'data-animated': boolean
}>`
  display: flex;
  white-space: nowrap;
  transition: text-decoration 300ms;

  &[data-interactive="true"]:not([data-disabled="true"]) {
    cursor: pointer;

    &[data-selected="true"]:hover {
      & > ${StyledBullet} {
        box-shadow: ${({ theme }) => theme.shadows.focusPrimary};
        & > ${StyledText} {
          color: ${({ theme }) => theme.colors.primary.textHover};
          text-decoration: underline
            ${({ theme }) => theme.colors.primary.textHover};
          text-decoration-thickness: 1px;
        }
      }
    }

    &[data-done="true"]:hover {
      & > ${StyledBullet} {
        box-shadow: ${({ theme }) => theme.shadows.focusPrimary};
      }
      & > ${StyledText} {
        color: ${({ theme }) => theme.colors.neutral.textHover};
        text-decoration: underline
          ${({ theme }) => theme.colors.neutral.textHover};
        text-decoration-thickness: 1px;
      }
    }
  }

  &[data-disabled="true"] {
    cursor: not-allowed;

    & > ${StyledText} {
      color: ${({ theme }) => theme.colors.neutral.textDisabled};
    }

    & > ${StyledBullet} {
      background-color: ${({ theme }) =>
        theme.colors.neutral.backgroundDisabled};
      box-shadow: none;
      color: ${({ theme }) => theme.colors.neutral.textDisabled};
      border-color: ${({ theme }) => theme.colors.neutral.borderDisabled};
    }
  }

  &:not([data-hide-separator="true"]):not([data-label-position="right"]) {
    flex-direction: column;
    flex: 1;

    & > ${StyledText} {
      margin-top: ${({ theme }) => theme.space[1]};
    }

    &:not(:last-child){
      &:after {
        content: "";
        position: relative;
        align-self: baseline;
        border-radius: ${({ theme }) => theme.radii.default};
        top: ${({ theme }) => theme.space[2]};
        width: calc(100% - ${({ theme, size }) => (size === 'small' ? theme.space[5] : theme.space[6])});
        left: calc(50% + 25px);
        order: -1;
        height: ${({ size }) =>
          size === 'small'
            ? LINE_HEIGHT_SIZES.small
            : LINE_HEIGHT_SIZES.medium}px;
      }

      &[data-done="true"]:after {
        background-color: ${({ theme }) =>
          theme.colors.primary.backgroundStrong};
      }
      &[data-selected="true"][data-animated="true"]:after {
        ${({ size }) => loadingStyle(size)}
        background-color: ${({ theme }) =>
          theme.colors.primary.backgroundStrong};

      }
    }
      &:not(:last-child){
      &::before {
        content: "";
        position: relative;
        align-self: baseline;
        border-radius: ${({ theme }) => theme.radii.default};
        background-color: ${({ theme }) =>
          theme.colors.neutral.backgroundStrong};
        top: 20px;
        width: calc(
          100% - ${({ theme, size }) => (size === 'small' ? theme.space[5] : theme.space[6])});
        left: calc(50% + 25px);
        order: -1;
        height: ${({ size }) =>
          size === 'small'
            ? LINE_HEIGHT_SIZES.small
            : LINE_HEIGHT_SIZES.medium}px;
      }
    }

    &:last-child {
      margin-top: ${({ theme, size }) =>
        size === 'small' ? '0px' : theme.space[1]};
    }
  }
`

export const Step = ({
  index = 0,
  onClick,
  disabled = false,
  title,
  children,
  className,
  'data-testid': dataTestId,
}: StepProps) => {
  const currentState = useStepper()
  const isActive = index === currentState.step
  const isDone = index < currentState.step

  const textVariant = useMemo(() => {
    if (currentState.size === 'medium') {
      return isActive ? 'bodyStrong' : 'body'
    }

    return isActive ? 'bodySmallStrong' : 'bodySmall'
  }, [currentState.size, isActive])

  return (
    <StyledStepContainer
      gap={currentState.labelPosition === 'right' ? 1 : 0}
      direction={currentState.labelPosition === 'right' ? 'row' : 'column'}
      alignItems="center"
      justifyContent="flex-start"
      className={className ?? 'step'}
      data-interactive={currentState.interactive && isDone}
      onClick={() => {
        if (currentState.interactive && !disabled) {
          if (index < currentState.step) {
            currentState.setStep(index)
          }
          onClick?.(index)
        }
      }}
      data-disabled={disabled}
      data-testid={dataTestId ?? `stepper-step-${index}`}
      data-hide-separator={!currentState.separator}
      data-label-position={currentState.labelPosition}
      size={currentState.size}
      data-selected={isActive}
      data-done={isDone}
      data-animated={currentState.animated}
    >
      {isDone && !disabled ? (
        <StyledBullet
          sentiment="primary"
          prominence="strong"
          size={currentState.size}
          isActive={isActive}
        >
          <CheckIcon />
        </StyledBullet>
      ) : (
        <StyledBullet
          sentiment={isDone || isActive ? 'primary' : 'neutral'}
          prominence="strong"
          size={currentState.size}
          isActive={isActive}
        >
          {(index + 1).toString()}
        </StyledBullet>
      )}
      {title ? (
        <StyledText
          as="span"
          variant={textVariant}
          prominence={isDone || isActive ? 'default' : 'weak'}
          sentiment={isActive ? 'primary' : 'neutral'}
          whiteSpace="normal"
        >
          {title}
        </StyledText>
      ) : null}
      {children ?? null}
    </StyledStepContainer>
  )
}
