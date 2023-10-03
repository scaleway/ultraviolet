import styled from '@emotion/styled'
import { Card, Stack, Text } from '@ultraviolet/ui'
import type { ReactNode } from 'react'

const Container = styled(Card)`
  padding: 0;
`

const SubContainer = styled(Stack)`
  padding: ${({ theme }) => theme.space['3']};
`

const Image = styled('img', {
  shouldForwardProp: prop => prop !== 'direction',
})<{ direction: ContentCardProps['direction'] }>`
  object-fit: cover;
  border-radius: ${({ theme, direction }) =>
    `${
      direction === 'column'
        ? `${theme.radii.default} ${theme.radii.default} 0 0`
        : `${theme.radii.default} 0 0 ${theme.radii.default}`
    }`};
`

type ContentCardProps = {
  direction?: 'row' | 'column'
  /**
   * The image to display at the top of the card (if direction is column) or to the left of the card (if direction is row).
   * By default, the image will be cropped to fit the card.
   */
  image?: string
  /**
   * The icon the second element of the card to be displayed after the image. We allow any ReactNode but recommend
   * using `<ProductIcon>` from `@ultraviolet/icons`.
   */
  icon?: ReactNode
  subtitle?: string
  title: string
  description?: string
  children?: ReactNode
}

/**
 * ContentCard is a component that displays a title, subtitle, description, image and icon in a card.
 * It can take different directions to display the image and the content. You can also add more content
 * by passing children.
 */
export const ContentCard = ({
  image,
  direction = 'column',
  icon,
  subtitle,
  title,
  description,
  children,
}: ContentCardProps) => (
  <Container>
    <Stack direction={direction}>
      <Image
        alt=""
        src={image}
        height={direction === 'column' ? 120 : undefined}
        width={direction === 'row' ? 220 : undefined}
        direction={direction}
      />
      <SubContainer gap={2}>
        {icon || null}
        <Stack gap={0.5}>
          <Stack>
            {subtitle ? (
              <Text as="small" variant="caption" prominence="weak">
                {subtitle}
              </Text>
            ) : null}
            <Text as="h3" variant="bodyStrong">
              {title}
            </Text>
          </Stack>
          {description ? (
            <Text as="p" variant="bodySmall">
              {description}
            </Text>
          ) : null}
        </Stack>
        {children}
      </SubContainer>
    </Stack>
  </Container>
)
