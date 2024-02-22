import styled from '@emotion/styled'
import { ProductIcon } from '@ultraviolet/icons'
import { Bullet, Card, Stack, Text } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'

const StyledCard = styled(Card)`
  padding: ${({ theme }) => theme.space['2']};
  text-align: left;
`

type FAQProps = {
  description: string
  productIconName?: ComponentProps<typeof ProductIcon>['name']
  illustrationText?: number | string
  notes?: string
  title: string
}

export const FAQ = ({
  productIconName,
  illustrationText,
  title,
  description,
  notes,
}: FAQProps) => (
  <StyledCard>
    <Stack gap={2} direction="row">
      <div>
        {!productIconName && illustrationText ? (
          <Bullet sentiment="primary" text={illustrationText.toString()} />
        ) : null}
        {productIconName ? (
          <ProductIcon name={productIconName} size="xlarge" />
        ) : null}
      </div>
      <div>
        <Text as="p" variant="bodyStronger" prominence="strong">
          {title}
        </Text>
        <Text as="div" variant="bodySmall">
          {description}
          {notes ? (
            <Text variant="caption" as="small" italic>
              {notes}
            </Text>
          ) : null}
        </Text>
      </div>
    </Stack>
  </StyledCard>
)
