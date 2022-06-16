import styled from '@emotion/styled'
import { ComponentProps, ReactNode } from 'react'
import Bullet from '../Bullet'

export const Steps = styled.ul`
  list-style: none;
  padding-left: ${({ theme }) => theme.space['2']};
  text-align: left;
  font-size: 16px;
`

export const Step = styled('li', {
  shouldForwardProp: prop => !['disabled'].includes(prop),
})<{ disabled: boolean }>`
  margin-bottom: ${({ theme }) => theme.space['3']};
  display: flex;
  align-items: center;
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
  margin-left: 1rem;
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
