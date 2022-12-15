import styled from '@emotion/styled'
import type { ComponentProps, ReactNode } from 'react'
import Bullet from '../Bullet'

export const Steps = styled.ul`
  list-style: none;
  padding-left: 0;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space['3']};
  font-size: 16px;
`

export const Step = styled('li', {
  shouldForwardProp: prop => !['disabled'].includes(prop),
})<{ disabled: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  justify-content: center;
  color: ${({ theme, disabled }) =>
    disabled
      ? theme.colors.neutral.textDisabled
      : theme.colors.neutral.textStrong};
`

const StyledDiv = styled('div', {
  shouldForwardProp: prop => !['size'].includes(prop),
})<{ size: Sizes }>`
  flex: 1;
  margin: auto;
  line-height: ${({ size }) => (size === 'medium' ? '32px' : '24px')};
  font-size: ${({ size }) => (size === 'medium' ? '24px' : '16px')};
`

export type Sizes = 'small' | 'medium'

type ContentProps =
  | { bulletIcon: ComponentProps<typeof Bullet>['icon']; bulletText?: never }
  | { bulletIcon?: never; bulletText: string }

type ItemProps = {
  variant?: ComponentProps<typeof Bullet>['variant']
  size?: Sizes
  disabled?: boolean
  children: ReactNode
  className?: string
} & ContentProps

const Item = ({
  bulletText,
  bulletIcon,
  variant,
  children,
  size = 'medium',
  disabled = false,
  className,
}: ItemProps) => (
  <Step disabled={disabled} className={className}>
    {bulletIcon ? (
      <Bullet
        icon={bulletIcon}
        size={size}
        variant={disabled ? 'disabled' : variant}
      />
    ) : null}
    {bulletText ? (
      <Bullet
        text={bulletText}
        size={size}
        variant={disabled ? 'disabled' : variant}
      />
    ) : null}
    <StyledDiv size={size}>{children}</StyledDiv>
  </Step>
)

type StepListProps = {
  children: ReactNode
  className?: string
}

const StepList = ({ children, className }: StepListProps) => (
  <Steps className={className}>{children}</Steps>
)

StepList.Item = Item

export default StepList
