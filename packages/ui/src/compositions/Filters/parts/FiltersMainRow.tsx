import { AdjustmentsHorizontalIcon } from '@ultraviolet/icons'
import { useMemo } from 'react'
import type { ComponentType } from 'react'
import { Button } from '../../../components/Button'
import { Row } from '../../../components/Row'
import { Stack } from '../../../components/Stack'
import { useTheme } from '../../../theme/ThemeProvider'
import type { AnyObject, FilterComponentProps, FilterConfig } from '../types'
import { AbstractFilter } from './AbstractFilter'
import { useFiltersContext } from './FiltersProvider'
import { isFilterConfigGroup } from './helpers'

export type MainRowProps<V extends AnyObject> = {
  config: FilterConfig<V>[]
  components?: Record<string, ComponentType<FilterComponentProps>>
  labels: {
    seeAll: string
    clearAll: string
  }
  layout?: {
    mainFilters?: (keyof V)[]
    size?: 'large' | 'medium'
    templateColumns?: string
  }
  className?: string
}

export const FiltersMainRow = <V extends AnyObject>({
  config,
  components,
  labels,
  layout,
  className,
}: MainRowProps<V>) => {
  const { filters, openDrawer } = useFiltersContext()
  const theme = useTheme()

  const configItems = useMemo(() => config.flatMap(item => (isFilterConfigGroup(item) ? item.items : [item])), [config])
  const mainFiltersNames = useMemo(
    () => layout?.mainFilters ?? configItems.map(item => item.name).slice(0, 3),
    [configItems, layout],
  )
  const mainFilters = useMemo(
    () => mainFiltersNames.map(name => configItems.find(item => item.name === name)).filter(item => item !== undefined),
    [mainFiltersNames, configItems],
  )

  const shouldDisplayDrawer = configItems.some(item => !mainFiltersNames.includes(item.name))
  const defaultSize = mainFilters.some(item => item.type === 'slider') ? 'large' : 'medium'
  const filterSize = layout?.size ?? defaultSize

  const handleMainFilterChange = (key: string | number | symbol, value: unknown) => {
    filters.setValue(key as string, value)
    filters.submit({ [key]: value })
  }

  const handleReset = () => {
    filters.reset()
    filters.submit(filters.defaultValues)
  }

  return (
    <Row
      className={className}
      style={{
        background: theme.colors.neutral.backgroundWeak,
        borderRadius: theme.radii.default,
      }}
      padding={theme.space[2]}
      alignItems="end"
      gap={2}
      templateColumns={layout?.templateColumns ?? 'repeat(auto-fit, minmax(200px, 1fr))'}
    >
      {mainFilters.map(configItem => (
        <AbstractFilter
          value={filters.lastSubmittedValues[configItem.name]}
          values={filters.lastSubmittedValues}
          config={configItem}
          size={filterSize}
          directionContext="row"
          key={configItem.name}
          onChange={value => handleMainFilterChange(configItem.name, value)}
          customComponents={components}
        />
      ))}

      <Stack direction="row" gap={2} alignItems="center">
        {shouldDisplayDrawer ? (
          <Button onClick={openDrawer} size={filterSize} variant="outlined">
            <AdjustmentsHorizontalIcon /> {labels.seeAll}
            {filters.appliedFilters.length > 0 ? ` (${filters.appliedFilters.length})` : null}
          </Button>
        ) : null}
        <Button onClick={handleReset} size={filterSize} variant="ghost">
          {labels.clearAll}
        </Button>
      </Stack>
    </Row>
  )
}
