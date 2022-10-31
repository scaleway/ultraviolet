import styled from '@emotion/styled'
import { ReactNode } from 'react'
import BorderedBox from '../BorderedBox'
import Stack from '../Stack'
import Text from '../Text'

type ContainerBaseProps = {
  small?: boolean
  edition?: boolean
  disabled?: boolean
}

const StyledBorderedBox = styled(BorderedBox, {
  shouldForwardProp: prop => !['small', 'edition', 'disabled'].includes(prop),
})<ContainerBaseProps>`
  background: ${({ theme }) => theme.colors.neutral.background};
  padding: ${({ theme, small }) =>
    `${small ? theme.space['2'] : theme.space['3']} ${theme.space['3']}`};
  border: 1px solid
    ${({ edition, theme }) =>
      edition ? theme.colors.primary.border : theme.colors.neutral.border};
  opacity: ${({ disabled }) => (disabled ? '0.4' : 'inherit')};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'default')};
`

type ContainerProps = ContainerBaseProps & {
  children: ReactNode
  className?: string
  /** Header can be a string but also a component. */
  header?: ReactNode
  /** Right title can be a string but also a component, like header properties does. */
  rightTitle?: ReactNode
  subtitle?: ReactNode
  title?: string
}

const ContainerV2 = ({
  title,
  subtitle,
  header,
  rightTitle,
  disabled = false,
  edition = false,
  small = false,
  children,
  className,
}: ContainerProps) => (
  <Stack gap={1} className={className}>
    {title ? (
      <Stack
        gap={2}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Stack gap={1} direction="row" alignItems="center">
          <Text variant="heading" as="h2">
            {title}
          </Text>
          {subtitle}
        </Stack>
        <div>{rightTitle}</div>
      </Stack>
    ) : null}
    {header}
    <StyledBorderedBox small={small} edition={edition} disabled={disabled}>
      {children}
    </StyledBorderedBox>
  </Stack>
)

export default ContainerV2
