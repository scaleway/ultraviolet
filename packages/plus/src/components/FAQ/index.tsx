'use client'

// oxlint-disable-next-line import/no-namespace
import * as ProductIcon from '@ultraviolet/icons/product'
import { Bullet, Card, Stack, Text } from '@ultraviolet/ui'
import type { CSSProperties } from 'react'
import type { PascalToCamelCaseWithoutSuffix } from '../../types'
import { faq } from './styles.css'

type FAQProps = {
  description: string
  productIconName?: PascalToCamelCaseWithoutSuffix<
    keyof typeof ProductIcon,
    'ProductIcon'
  >
  illustrationText?: number | string
  notes?: string
  title: string
  style?: CSSProperties
}

export const FAQ = ({
  productIconName,
  illustrationText,
  title,
  description,
  notes,
  style,
}: FAQProps) => {
  const ProductIconUsed = productIconName
    ? // biome-ignore lint/performance/noDynamicNamespaceImportAccess: to fix
      ProductIcon[
        `${
          productIconName.charAt(0).toUpperCase() + productIconName.slice(1)
        }ProductIcon` as keyof typeof ProductIcon
      ]
    : null

  return (
    <Card className={faq} style={style}>
      <Stack direction="row" gap={2}>
        <div>
          {!productIconName && illustrationText ? (
            <Bullet sentiment="primary">{illustrationText.toString()}</Bullet>
          ) : null}
          {ProductIconUsed ? <ProductIconUsed size="xlarge" /> : null}
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
}
