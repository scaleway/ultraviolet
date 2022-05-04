import { css, useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React, { ReactNode, WeakValidationMap, isValidElement } from 'react'
import useMedia from 'use-media'
import Icon from '../Icon'
import Loader from '../Loader'

const sizes = {
  medium: {
    dot: 32,
    dotFontSize: 16,
  },
}

const StyledStepNumber = styled.div`
  position: relative;
  min-width: ${sizes.medium.dot}px;
  max-width: ${sizes.medium.dot}px;
  height: ${sizes.medium.dot}px;
  font-size: ${sizes.medium.dotFontSize}px;
  border-radius: ${sizes.medium.dot}px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledStepContent = styled.div`
  display: flex;
  align-items: center;
  margin-left: ${({ theme }) => theme.space[1]};
  font-size: 13px;
  line-height: 18px;
  font-weight: 700;

  &[aria-hidden='true'] {
    overflow: hidden;
    max-width: 0;
    white-space: nowrap;
  }
`

const StyledStepLoader = styled.span`
  height: calc(100% + calc(${({ theme }) => theme.radii.default} * 4));
  width: calc(100% + calc(${({ theme }) => theme.radii.default} * 4));
  position: absolute;
`

const StyledStep = styled('li', {
  shouldForwardProp: prop =>
    !['isCompleted', 'isLoading', 'condensed'].includes(prop.toString()),
})<{ isCompleted: boolean; isLoading: boolean; condensed?: boolean }>`
  display: flex;
  font-weight: 700;
  align-items: center;

  ${({ condensed, isCompleted, theme }) =>
    isCompleted
      ? css`
          color: ${theme.colors.success.text};
          ${StyledStepNumber} {
            background-color: ${theme.colors.success.backgroundStrong};
            color: ${theme.colors.success.textStrong};
          }
        `
      : css`
          color: ${theme.colors.neutral.textWeak};
          ${StyledStepNumber} {
            border: 3px solid ${theme.colors.neutral.borderWeak};
          }

          &[aria-current='true'] {
            color: ${theme.colors.primary.textWeak};
            ${condensed
              ? css`
                  flex-grow: 1;
                `
              : ``}

            ${StyledStepNumber} {
              border-color: ${theme.colors.primary.borderStrong};
              color: ${theme.colors.primary.textStrong};
              background-color: ${theme.colors.primary.backgroundStrong};
            }
          }
        `};
`

type StepProps = { children: ReactNode; isLoading?: boolean }
export const Step = ({ children }: StepProps) => children as JSX.Element
Step.displayName = 'NavigationStepper.Step'

Step.propTypes = {
  children: PropTypes.node.isRequired,
  isLoading: PropTypes.bool,
}

const StyledUl = styled('ul', {
  shouldForwardProp: prop => !['count', 'condensed'].includes(prop.toString()),
})<{ count: number; condensed?: boolean }>`
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;

  ${({ count, condensed, theme }) =>
    !condensed
      ? css`
          display: grid;
          grid-template-columns: repeat(${count}, 1fr);
          ${StyledStep} {
            place-self: center;
            &:first-of-type {
              place-self: start;
            }
            &:last-of-type {
              place-self: end;
            }
          }
        `
      : css`
          display: flex;
          ${StyledStep} {
            margin-right: ${theme.space[1]};
            &:last-of-type {
              margin-right: 0;
            }
          }
        `}
`

type NavigationStepperProps = {
  step?: number
  children: ReactNode[]
  condensed?: boolean
  className?: string
}

type NavigationStepperType = ((
  props: NavigationStepperProps,
) => JSX.Element) & {
  Step: (props: StepProps) => JSX.Element
  propTypes: WeakValidationMap<NavigationStepperProps>
}

const NavigationStepper: NavigationStepperType = ({
  condensed,
  className,
  children,
  step = 1,
}) => {
  const theme = useTheme()
  const isMobile = useMedia({ maxWidth: theme.screens.small })

  const computedCondensed = condensed !== undefined ? condensed : isMobile
  const steps = React.Children.map<JSX.Element | null, ReactNode>(
    children,
    (child, index) => {
      if (isValidElement(child) && child.type === Step) {
        const childStep = index + 1
        const isCompleted = step > childStep
        const isCurrent = step === childStep
        const { isLoading = false } = child.props as StepProps

        return (
          <StyledStep
            isLoading={isLoading}
            isCompleted={isCompleted}
            aria-current={isCurrent}
            condensed={computedCondensed}
          >
            <StyledStepNumber>
              {isLoading && isCurrent ? (
                <StyledStepLoader>
                  <Loader
                    active
                    trailColor="transparent"
                    color="success"
                    size="100%"
                    strokeWidth={8}
                  />
                </StyledStepLoader>
              ) : null}
              {isCompleted ? (
                <Icon stroke="currentColor" strokeWidth={2} name="check" />
              ) : (
                childStep
              )}
            </StyledStepNumber>
            <StyledStepContent aria-hidden={!isCurrent && computedCondensed}>
              {child}
            </StyledStepContent>
          </StyledStep>
        )
      }

      return null
    },
  ) as ReactNode[]

  return (
    <StyledUl
      className={className}
      condensed={computedCondensed}
      count={steps.length}
    >
      {steps}
    </StyledUl>
  )
}

NavigationStepper.Step = Step

NavigationStepper.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  className: PropTypes.string,
  condensed: PropTypes.bool,
  step: PropTypes.number,
}

export default NavigationStepper
