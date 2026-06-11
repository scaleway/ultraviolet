import { Button, Drawer, Stack, Separator } from '@ultraviolet/ui'
import { useId } from 'react'
import type { ComponentType, SubmitEvent } from 'react'
import type { AnyObject, FilterComponentProps, FilterConfig, FilterConfigItem } from '../types'
import { AbstractFilter } from './AbstractFilter'
import { ExpandableFilterGroup } from './ExpandableFilterGroup'
import { useFiltersContext } from './FiltersProvider'
import { isFilterConfigGroup } from './helpers'

export type DrawerProps<V extends AnyObject> = {
  config: FilterConfig<V>[]
  components?: Record<string, ComponentType<FilterComponentProps>>
  labels: {
    submit: string
    clear: string
    drawerHeader: string
  }
}

export const FiltersDrawer = <V extends AnyObject>({ config, components, labels }: DrawerProps<V>) => {
  const formId = useId()

  const { filters, closeDrawer, isDrawerOpen } = useFiltersContext()
  const drawerFilters = config.filter(item => !item.hideInDrawer)

  const createResetHandler = (configItem: FilterConfig<AnyObject>) => {
    let fieldsToReset: string[] = []
    if (isFilterConfigGroup(configItem)) {
      fieldsToReset = configItem.items.map(item => item.name).filter(name => filters.dirtyFilters.includes(name))
    } else if (filters.dirtyFilters.includes(configItem.name)) {
      fieldsToReset = [configItem.name]
    }
    return fieldsToReset.length > 0 ? () => filters.resetFields(fieldsToReset) : undefined
  }

  if (drawerFilters.length === 0) {
    return null
  }

  return (
    <Drawer
      footer={<Button render={<button form={formId} type="submit" />}>{labels.submit}</Button>}
      header={labels.drawerHeader}
      hideOnClickOutside={false}
      onClose={() => {
        filters.discard()
        closeDrawer()
      }}
      open={isDrawerOpen}
      separator
      size="small"
    >
      <form
        id={formId}
        onSubmit={(e: SubmitEvent) => {
          e.preventDefault()
          e.stopPropagation()
          filters.submit()
          closeDrawer()
        }}
      >
        <Stack gap={2}>
          {drawerFilters.map((configItem, index) => (
            <Stack gap={2} key={isFilterConfigGroup(configItem) ? configItem.label : configItem.name}>
              {index > 0 ? <Separator /> : null}
              <ExpandableFilterGroup
                clearText={labels.clear}
                label={configItem.label}
                defaultExpanded={configItem.expanded}
                onReset={createResetHandler(configItem)}
              >
                {isFilterConfigGroup(configItem) ? (
                  <Stack gap={2}>
                    {configItem.items
                      .filter(item => !item.hideInDrawer)
                      .map((subConfigItem: FilterConfigItem) => (
                        <AbstractFilter
                          config={subConfigItem}
                          directionContext="column"
                          size="large"
                          key={subConfigItem.name}
                          onChange={value => filters.setValue(subConfigItem.name, value)}
                          value={filters.values[subConfigItem.name]}
                          values={filters.values}
                          customComponents={components}
                        />
                      ))}
                  </Stack>
                ) : (
                  <AbstractFilter
                    config={configItem}
                    directionContext="column"
                    size="large"
                    hideLabel
                    onChange={value => filters.setValue(configItem.name, value)}
                    value={filters.values[configItem.name]}
                    values={filters.values}
                    customComponents={components}
                  />
                )}
              </ExpandableFilterGroup>
            </Stack>
          ))}
        </Stack>
      </form>
    </Drawer>
  )
}
