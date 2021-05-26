import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React from 'react'
import BorderedBox from '../BorderedBox'
import Box from '../Box'
import Typography from '../Typography'

const StyledContainer = styled(Box)`
  margin-top: 40px;
`

const StyledBorderedBox = styled(BorderedBox, {
  shouldForwardProp: prop => !['edition', 'small'].includes(prop),
})`
  padding-left: 24px;
  padding-right: 24px;
  padding-top: ${({ small }) => (small ? 16 : 24)}px;
  padding-bottom: ${({ small }) => (small ? 16 : 24)}px;
  border: 1px solid
    ${({ edition, theme }) =>
      edition ? theme.colors.primary : theme.colors.gray350};
  opacity: ${({ disabled }) => (disabled ? '0.4' : 'inherit')};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'default')};

  > * {
    margin-top: 0;
  }
  > * + * {
    margin-top: 16px;
  }
`

const Container = ({
  title,
  subtitle,
  header,
  rightTitle,
  disabled,
  edition,
  small,
  children,
  boxStyle,
  ...props
}) => (
  <StyledContainer {...props}>
    {(title || subtitle || rightTitle) && (
      <Box display="flex" justifyContent="space-between">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
          mb={1}
        >
          <Typography variant="lead" my={0} mr={2}>
            {title}
          </Typography>
          {subtitle}
        </Box>
        <div>{rightTitle}</div>
      </Box>
    )}
    {header}
    <StyledBorderedBox
      css={boxStyle}
      small={small}
      edition={edition}
      disabled={disabled}
    >
      {children}
    </StyledBorderedBox>
  </StyledContainer>
)

Container.defaultProps = {
  boxStyle: undefined,
  disabled: false,
  edition: undefined,
  header: undefined,
  rightTitle: undefined,
  small: undefined,
  subtitle: undefined,
  title: undefined,
}

Container.propTypes = {
  boxStyle: PropTypes.shape({}),
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  edition: PropTypes.bool,
  header: PropTypes.node,
  rightTitle: PropTypes.node,
  small: PropTypes.bool,
  subtitle: PropTypes.string,
  title: PropTypes.string,
}

export default Container
