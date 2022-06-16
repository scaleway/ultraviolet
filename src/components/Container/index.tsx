import { SerializedStyles } from '@emotion/serialize'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import { ReactNode, Validator } from 'react'
import BorderedBox from '../BorderedBox'
import Box, { BoxProps } from '../Box'
import FlexBox from '../FlexBox'
import Typography from '../Typography'

const StyledContainer = styled(Box)`
  margin-top: 40px;
`

const StyledTitleContainer = styled(FlexBox)`
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

type ContainerProps = ContainerBaseProps & {
  boxStyle?: SerializedStyles
  children: ReactNode
  header?: ReactNode
  rightTitle?: ReactNode
  subtitle?: string
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
    <FlexBox justifyContent="space-between">
      <StyledTitleContainer>
        <Typography variant="lead" my={0} mr={2}>
          {title}
        </Typography>
        {subtitle}
      </StyledTitleContainer>
      <div>{rightTitle}</div>
    </FlexBox>
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

Container.propTypes = {
  boxStyle: PropTypes.shape({}) as Validator<SerializedStyles>,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  edition: PropTypes.bool,
  /**
   * Header can be a string but also a component.
   */
  header: PropTypes.node,
  /**
   * Right title can be a string but also a component, like header properties does.
   */
  rightTitle: PropTypes.node,
  small: PropTypes.bool,
  subtitle: PropTypes.string,
  title: PropTypes.string.isRequired,
}

export default Container
