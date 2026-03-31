import { InformationIcon } from '@ultraviolet/icons/InformationIcon'
import { Link, Stack, StepList, Tooltip } from '@ultraviolet/ui'
import * as Compositions from '@ultraviolet/ui/compositions'

const NOT_COMPONENTS = [
  'NavigationProvider',
  'useNavigation',
  'estimateCostDefaultLocales',
]

type ComponentInfo = {
  name: string
  description?: string
}

type ReactComponentWithDocGen = {
  displayName?: string
  __docgenInfo?: { description: string }
}

export const CompositionsList = () => {
  const componentsList: ComponentInfo[] = Object.entries(Compositions)
    .map(([name, component]) => ({
      name: name,
      // oxlint-disable-next-line typescript/no-unsafe-type-assertion
      description: (component as ReactComponentWithDocGen).__docgenInfo
        ?.description,
    }))
    .filter(component => !NOT_COMPONENTS.includes(component.name))

  return (
    <StepList>
      {componentsList.map((component, index) => {
        const lowerCaseName = component.name.toLowerCase()
        const componentLink = `https://storybook.ultraviolet.scaleway.com/?path=/docs/compositions-${lowerCaseName}--docs`

        return component ? (
          <StepList.Item
            key={component.name}
            size="small"
            bulletContent={index + 1}
          >
            <Stack direction="row" gap={1} alignItems="baseline">
              <Link href={componentLink} size="small" prominence="stronger">
                <Stack direction="row" alignItems="baseline">
                  {component.name}
                </Stack>
              </Link>
              {component.description ? (
                <Tooltip text={component.description}>
                  <InformationIcon
                    sentiment="neutral"
                    size="xsmall"
                    prominence="weak"
                  />
                </Tooltip>
              ) : null}{' '}
            </Stack>
          </StepList.Item>
        ) : null
      })}
    </StepList>
  )
}
