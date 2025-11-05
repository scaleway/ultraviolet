import { Card as ScwUICard, Text } from '@ultraviolet/ui'
import Image from 'next/image'
import type { ReactNode } from 'react'
import { borderedBox } from './componentsStyles.css'

type CardProps = {
  title: string
  description: string | ReactNode
  icon: string
  className?: string
}

const Card = ({ title, description, icon, className }: CardProps) => (
  <ScwUICard className={`${className ? `${className} ` : ''}${borderedBox}`}>
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
  </ScwUICard>
)

export default Card
