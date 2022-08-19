import styled from '@emotion/styled'
import { BorderedBox, Col, Row, Typography, down, up } from '@scaleway/ui'
import Image from 'next/image'
import React, { ReactNode } from 'react'

type CardProps = {
  title: string
  description: string | ReactNode
  icon: string
}

const StyledBorderedBox = styled(BorderedBox)`
  ${down('large', `margin: 8px 16px`)}
  ${up('large', `height: 100%;`)}
`

const Card = ({ title, description, icon }: CardProps): JSX.Element => (
  <StyledBorderedBox>
    <Row>
      <Col xsmall="auto">
        <Image src={icon} alt="icon" width={64} height={64} />
      </Col>
      <Col>
        <Typography variant="lead" mb={1} color="primary">
          {title}
        </Typography>
        {typeof description === 'string' ? (
          <Typography variant="bodyD">{description}</Typography>
        ) : (
          description
        )}
      </Col>
    </Row>
  </StyledBorderedBox>
)

export default Card
