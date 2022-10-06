import { SerializedStyles } from '@emotion/serialize'
import styled from '@emotion/styled'
import { ReactNode } from 'react'
import BorderedBox from '../BorderedBox'
import Box, { BoxProps } from '../Box'
import Text from '../Text'

const RightSpacedText = styled(Text)`
  margin: 0 ${({ theme }) => theme.space[2]} 0 0;
`
const StyledContainer = styled(Box)`
  margin-top: 40px;
`

const StyledTitleContainer = styled.div`
  display: flex;
  margin-bottom: ${({ theme }) => theme.space['1']};
`

type ContainerBaseProps = {
  small?: boolean
  edition?: boolean
  disabled?: boolean
}

const StyledBox = styled(BorderedBox, {
  shouldForwardProp: prop => !['small', 'edition'].includes(prop),
})<ContainerBaseProps>`
  background: ${({ theme }) => theme.colors.neutral.background};
  padding-left: 24px;
  padding-right: 24px;
  padding-top: ${({ small }) => (small ? 16 : 24)}px;
  padding-bottom: ${({ small }) => (small ? 16 : 24)}px;
  border: 1px solid
    ${({ edition, theme }) =>
      edition ? theme.colors.primary.border : theme.colors.neutral.border};
  opacity: ${({ disabled }) => (disabled ? '0.4' : 'inherit')};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'default')};

  > * {
    margin-top: 0;
  }
  > * + * {
    margin-top: 16px;
  }
`

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

type ContainerProps = ContainerBaseProps & {
  boxStyle?: SerializedStyles
  children: ReactNode
  /** Header can be a string but also a component. */
  header?: ReactNode
  /** Right title can be a string but also a component, like header properties does. */
  rightTitle?: ReactNode
  subtitle?: ReactNode
  title: string
} & BoxProps

const Container = ({
  title,
  subtitle,
  header,
  rightTitle,
  disabled = false,
  edition = false,
  small = false,
  children,
  boxStyle,
  ...props
}: ContainerProps) => (
  <StyledContainer {...props}>
    <TitleContainer>
      <StyledTitleContainer>
        <RightSpacedText variant="heading" as="h2">
          {title}
        </RightSpacedText>
        {subtitle}
      </StyledTitleContainer>
      <div>{rightTitle}</div>
    </TitleContainer>
    {header}
    <StyledBox
      css={boxStyle}
      small={small}
      edition={edition}
      disabled={disabled}
    >
      {children}
    </StyledBox>
  </StyledContainer>
)

export default Container
