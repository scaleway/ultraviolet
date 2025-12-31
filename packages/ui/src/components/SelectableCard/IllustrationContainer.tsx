'use client'

// oxlint-disable-next-line import/no-namespace
import * as ProductIcon from '@ultraviolet/icons/product'
import { useTheme } from '@ultraviolet/themes'
import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { Stack } from '../Stack'
import {
  divSelectableCard,
  illustrationSelectableCard,
  imageSelectableCard,
} from './styles.css'
import type { SelectableCardProps } from './types'

export const IllustrationContainer = ({
  children: subChildren,
  productIcon,
  illustration,
}: {
  children: ReactNode
  productIcon: SelectableCardProps['productIcon']
  illustration: SelectableCardProps['illustration']
}) => {
  const theme = useTheme()
  const [svgContent, setSvgContent] = useState<string | null>(null)
  const ProductIconUsed = productIcon
    ? // biome-ignore lint/performance/noDynamicNamespaceImportAccess: to fix
      ProductIcon[
        `${
          productIcon.charAt(0).toUpperCase() + productIcon.slice(1)
        }ProductIcon` as keyof typeof ProductIcon
      ]
    : null
  useEffect(() => {
    // Check if the illustration ends with .svg to handle it as an SVG to ensure the 'fill' property and "width" are correct by changing them directly to what we want
    if (illustration?.endsWith('.svg')) {
      fetch(illustration)
        .then(async response => response.text())
        .then(svg => {
          const updatedSvg = svg
            .replace(
              /fill="[^"]*"/g,
              `fill="${theme.colors.neutral.backgroundStronger}"`,
            ) // adapt fill property to theme
            .replace(/width="[^"]*"/g, `width="220px"`) // fixed width
            .replace(/height="[^"]*"/g, `height="220px"`) // fixed height

          setSvgContent(updatedSvg)
        })
        .catch(() => null)
    }
  })
  if (ProductIconUsed || illustration) {
    return (
      <Stack
        alignItems="stretch"
        direction="row"
        flex={1}
        justifyContent="space-between"
        width="100%"
      >
        <Stack className={illustrationSelectableCard}>{subChildren}</Stack>
        <Stack justifyContent="center">
          {ProductIconUsed ? <ProductIconUsed size="large" /> : null}
        </Stack>

        {illustration ? (
          <div className={divSelectableCard}>
            {illustration.endsWith('.svg') && svgContent ? (
              <div
                className={imageSelectableCard}
                // oxlint-disable-next-line  react/no-danger
                dangerouslySetInnerHTML={{ __html: svgContent }}
              />
            ) : (
              <img
                alt="illustration"
                className={imageSelectableCard}
                height={220}
                src={illustration}
                width={220}
              />
            )}
          </div>
        ) : null}
      </Stack>
    )
  }

  return subChildren
}
