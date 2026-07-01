import { FiltersDrawer } from './parts/FiltersDrawer'
import type { DrawerProps } from './parts/FiltersDrawer'
import { FiltersMainRow } from './parts/FiltersMainRow'
import type { MainRowProps } from './parts/FiltersMainRow'
import { FiltersProvider } from './parts/FiltersProvider'
import type { FiltersProviderProps } from './parts/FiltersProvider'
import type { AnyObject } from './types'

export type FiltersProps<V extends AnyObject = AnyObject> = MainRowProps<V> & {
  labels: Partial<DrawerProps<V>['labels']>
} & FiltersProviderProps<V>

const hasFullDrawerLabels = (labels: Partial<DrawerProps['labels']>): labels is Required<DrawerProps['labels']> =>
  !!labels.clear && !!labels.submit && !!labels.drawerHeader

export const Filters = <V extends AnyObject>({
  config,
  defaultValues,
  initialValues,
  onChange,
  onSubmit,
  onDrawerOpen,
  layout,
  components,
  labels,
  className,
}: FiltersProps<V>) => (
  <FiltersProvider
    defaultValues={defaultValues}
    initialValues={initialValues}
    onChange={onChange}
    onSubmit={onSubmit}
    onDrawerOpen={onDrawerOpen}
  >
    <FiltersMainRow config={config} components={components} labels={labels} layout={layout} className={className} />
    {hasFullDrawerLabels(labels) ? <FiltersDrawer config={config} components={components} labels={labels} /> : null}
  </FiltersProvider>
)

Filters.displayName = 'Filters'
