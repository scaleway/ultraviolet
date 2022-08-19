import styled from '@emotion/styled'
import { Col, Grid, Row, Typography, down, up } from '@scaleway/ui'
import React from 'react'
import GithubAndDocumentationButtons from './GithubAndDocumentationButtons'
import Logo from './Logo'

const StyledFooter = styled.footer`
  box-shadow: 0 0 8px 2px rgba(178, 182, 195, 0.37);
`

const StyledButtonsCol = styled(Col)`
  ${up('medium', `order: 2;`)} ${down('medium', `order: 1; margin-left: 0;`)}
  display: flex;
`

const StyledLogoCol = styled(Col)`
  ${up('medium', `order: 1;`)} ${down('medium', `order: 2; margin-top: 24px;`)}
  display: flex;
  align-items: center;
`

const StyledRow = styled(Row)`
  ${up('medium', `margin-top: 40px;`)} ${down('medium', `margin-top: 24px;`)}
`

const Footer = (): JSX.Element => (
  <StyledFooter>
    <Grid py={5} px={4}>
      <Row>
        <Col>
          <Typography variant="bodyA">
            Hosted in green datacenters in France
          </Typography>
          <Typography variant="bodyB">
            Our datacenters are designed and built to deliver excellent energy
            efficiency. They offer a low carbon footprint with our guaranteed
            clean energy source. We embrace both disruptive and state-of-the-art
            technologies that reduce our environmental impact.
          </Typography>
        </Col>
      </Row>
      <StyledRow>
        <StyledButtonsCol xsmall={12} medium="auto">
          <GithubAndDocumentationButtons />
        </StyledButtonsCol>
        <StyledLogoCol xsmall={12} medium="auto">
          <Logo width={124} height={24} />
        </StyledLogoCol>
      </StyledRow>
    </Grid>
  </StyledFooter>
)

export default Footer
