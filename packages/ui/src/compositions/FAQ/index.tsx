'use client'

import type { CSSProperties, ReactNode } from 'react'
import { Bullet } from '../../components/badges/Bullet'
import { Card } from '../../components/layout/Card'
import { Stack } from '../../components/layout/Stack'
import { Text } from '../../components/typography/Text'
import { faqStyle } from './styles.css'

type FAQProps = {
  description: string
  productIcon?: ReactNode
  illustrationText?: number | string
  notes?: string
  title: string
  style?: CSSProperties
}

export const FAQ = ({ productIcon, illustrationText, title, description, notes, style }: FAQProps) => (
  <Card className={faqStyle.faq} style={style}>
    <Stack direction="row" gap={2}>
      <div>
        {!productIcon && illustrationText ? <Bullet sentiment="primary">{illustrationText.toString()}</Bullet> : null}
        {productIcon ?? null}
      </div>
      <div>
        <Text as="p" prominence="strong" variant="bodyStronger">
          {title}
        </Text>
        <Text as="div" variant="bodySmall">
          {description}
          {notes ? (
            <Text as="small" italic variant="caption">
              {notes}
            </Text>
          ) : null}
        </Text>
      </div>
    </Stack>
  </Card>
)

FAQ.displayName = 'FAQ'
