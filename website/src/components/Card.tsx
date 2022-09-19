import styled from '@emotion/styled'
import { BorderedBox, Text } from '@scaleway/ui'
import Image from 'next/image'
import { ReactNode } from 'react'

type CardProps = {
  title: string
  description: string | ReactNode
  icon: string
  className?: string
}

const StyledBorderedBox = styled(BorderedBox)`
  display: grid;
  grid-template-columns: fit-content(20%) 3fr;
  gap: ${({ theme }) => theme.space['2']};
  height: auto;
  min-width: 350px;
`

const Card = ({ title, description, icon, className }: CardProps) => (
  <StyledBorderedBox className={className}>
    <div>
      <Image src={icon} alt="icon" width={64} height={64} />
    </div>
    <div>
      <Text as="h3" variant="heading" color="primary">
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
