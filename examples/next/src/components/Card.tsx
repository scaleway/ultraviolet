import styled from '@emotion/styled'
import { Card as ScwUICard, Text } from '@ultraviolet/ui'
import Image from 'next/image'
import type { ReactNode } from 'react'

type CardProps = {
  title: string
  description: string | ReactNode
  icon: string
  className?: string
}

const StyledBorderedBox = styled(ScwUICard)`
  display: grid;
  grid-template-columns: fit-content(20%) 3fr;
  gap: ${({ theme }) => theme.space['2']};
  height: auto;
  min-width: 350px;
`

const Card = ({ title, description, icon, className }: CardProps) => (
  <StyledBorderedBox className={className}>
    <div>
      <Image alt="icon" height={64} src={icon} width={64} />
    </div>
    <div>
      <Text as="h3" sentiment="primary" variant="headingSmall">
        {title}
      </Text>
      {typeof description === 'string' ? (
        <Text as="p" variant="bodySmall">
          {description}
        </Text>
      ) : (
        description
      )}
    </div>
  </StyledBorderedBox>
)

export default Card
