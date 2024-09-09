import styled from '@emotion/styled'
import * as ProductIcon from '@ultraviolet/icons/product'
import { Bullet, Card, Stack, Text } from '@ultraviolet/ui'
import type { PascalToCamelCaseWithoutSuffix } from '../../types'

const StyledCard = styled(Card)`
  padding: ${({ theme }) => theme.space['2']};
  text-align: left;
`

type FAQProps = {
  description: string
  productIconName?: PascalToCamelCaseWithoutSuffix<
    keyof typeof ProductIcon,
    'ProductIcon'
  >
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
}: FAQProps) => {
  const ProductIconUsed = productIconName
    ? ProductIcon[
        `${
          productIconName.charAt(0).toUpperCase() + productIconName.slice(1)
        }Icon` as keyof typeof ProductIcon
      ]
    : null

  return (
    <StyledCard>
      <Stack gap={2} direction="row">
        <div>
          {!productIconName && illustrationText ? (
            <Bullet sentiment="primary" text={illustrationText.toString()} />
          ) : null}
          {ProductIconUsed ? <ProductIconUsed size="xlarge" /> : null}
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
}
