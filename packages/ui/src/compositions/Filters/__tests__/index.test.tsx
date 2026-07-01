import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme } from '@utils/test'
import { describe, expect, it, vi } from 'vitest'
import { Filters, FiltersMainRow, FiltersProvider } from '..'
import { Button } from '../../../components'
import type { FilterComponentProps, FilterConfig } from '../types'

export type FilterValues = {
  name: string
  status: string
  env: string[]
  price: [number, number]
  ram: [number, number]
  gpu: string
}

export const defaultValues: FilterValues = {
  name: '',
  status: '',
  env: [],
  price: [0, 1000],
  ram: [0, 64],
  gpu: '',
}

export const config: FilterConfig<FilterValues>[] = [
  {
    type: 'search',
    name: 'name',
    hideInDrawer: true,
    label: 'Name',
    debounceDuration: 500,
    placeholder: 'Type to search...',
  },
  {
    type: 'group',
    label: 'Infos',
    name: 'infos',
    items: [
      {
        type: 'select',
        name: 'status',
        label: 'Status',
        placeholder: 'Select status',
        options: [
          { label: 'Active', value: 'active' },
          { label: 'Inactive', value: 'inactive' },
        ],
      },
      {
        type: 'multiselect',
        name: 'env',
        label: 'Environment',
        placeholder: 'Select environment',
        options: [
          { label: 'Production', value: 'prod' },
          { label: 'Development', value: 'dev' },
          { label: 'Staging', value: 'staging' },
        ],
        searchable: true,
      },
    ],
  },
  {
    type: 'slider',
    name: 'price',
    label: 'Price',
    min: 0,
    double: true,
    max: 1000,
    step: 10,
  },
  {
    type: 'slider',
    name: 'ram',
    label: 'RAM',
    min: 0,
    max: 64,
    double: true,
  },
  {
    type: 'group',
    name: 'advanced',
    label: 'Advanced',
    expanded: true,
    items: [
      {
        name: 'gpu',
        type: 'select',
        label: 'GPU',
        options: [],
      },
    ],
  },
]

const labels = {
  clear: 'Clear',
  clearAll: 'Clear all',
  seeAll: 'All filters',
  drawerHeader: 'Filters',
  submit: 'See results',
}

describe('filters', () => {
  it('should render main row with filters', () => {
    const { asFragment } = renderWithTheme(<Filters config={config} defaultValues={defaultValues} labels={labels} />)

    expect(screen.getByRole('textbox', { name: 'Name' })).toBeVisible()
    expect(screen.getByRole('combobox', { name: 'Status' })).toBeVisible()
    expect(screen.getByRole('combobox', { name: 'Environment' })).toBeVisible()
    expect(screen.getByRole('button', { name: 'All filters' })).toBeVisible()
    expect(screen.getByRole('button', { name: 'Clear all' })).toBeVisible()
    expect(screen.queryByRole('slider', { name: 'RAM' })).not.toBeInTheDocument()

    expect(asFragment()).toMatchSnapshot()
  })

  it('should submit immediately when updating filters in the main row', async () => {
    const onSubmit = vi.fn()
    const onChange = vi.fn()

    renderWithTheme(
      <Filters config={config} defaultValues={defaultValues} labels={labels} onSubmit={onSubmit} onChange={onChange} />,
    )

    await userEvent.click(screen.getByRole('combobox', { name: 'Status' }))
    await userEvent.click(screen.getByRole('option', { name: 'active' }))

    expect(onChange).toHaveBeenCalledExactlyOnceWith({ ...defaultValues, status: 'active' })
    expect(onSubmit).toHaveBeenCalledExactlyOnceWith({ ...defaultValues, status: 'active' })
  })

  it('should submit immediately when clearing filters in the main row', async () => {
    const onSubmit = vi.fn()
    const onChange = vi.fn()

    renderWithTheme(
      <Filters config={config} defaultValues={defaultValues} labels={labels} onSubmit={onSubmit} onChange={onChange} />,
    )

    await userEvent.click(screen.getByRole('combobox', { name: 'Status' }))
    await userEvent.click(screen.getByRole('option', { name: 'inactive' }))
    expect(onChange).toHaveBeenCalledExactlyOnceWith({ ...defaultValues, status: 'inactive' })
    expect(onSubmit).toHaveBeenCalledExactlyOnceWith({ ...defaultValues, status: 'inactive' })

    await userEvent.click(screen.getByRole('button', { name: 'Clear all' }))

    expect(onChange).toHaveBeenLastCalledWith(defaultValues)
    expect(onSubmit).toHaveBeenLastCalledWith(defaultValues)
  })

  it('should submit only after clicking the submit button in the drawer', async () => {
    const onSubmit = vi.fn()
    const onChange = vi.fn()
    const onDrawerOpen = vi.fn()

    renderWithTheme(
      <Filters
        config={config}
        defaultValues={defaultValues}
        labels={labels}
        onSubmit={onSubmit}
        onChange={onChange}
        onDrawerOpen={onDrawerOpen}
      />,
    )

    await userEvent.click(screen.getByRole('button', { name: 'All filters' }))
    expect(onDrawerOpen).toHaveBeenCalledOnce()

    await userEvent.click(screen.getByRole('radio', { name: 'Inactive' }))
    expect(onChange).toHaveBeenLastCalledWith({ ...defaultValues, status: 'inactive' })
    expect(onSubmit).not.toHaveBeenCalled()

    await userEvent.click(screen.getByRole('button', { name: 'See results' }))
    expect(onSubmit).toHaveBeenCalledExactlyOnceWith({ ...defaultValues, status: 'inactive' })
  })

  it('should discard edits in the drawer when closing without validating', async () => {
    const onSubmit = vi.fn()
    const onChange = vi.fn()

    renderWithTheme(
      <Filters config={config} defaultValues={defaultValues} labels={labels} onSubmit={onSubmit} onChange={onChange} />,
    )

    await userEvent.click(screen.getByRole('button', { name: 'All filters' }))

    await userEvent.click(screen.getByRole('checkbox', { name: 'Production' }))
    expect(onChange).toHaveBeenLastCalledWith({ ...defaultValues, env: ['prod'] })

    await userEvent.click(screen.getByRole('button', { name: 'close' }))

    expect(onChange).toHaveBeenLastCalledWith(defaultValues)
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('should accept initial values different from default values', async () => {
    const onSubmit = vi.fn()
    const onChange = vi.fn()

    renderWithTheme(
      <Filters
        config={config}
        defaultValues={defaultValues}
        initialValues={{
          status: 'active',
          price: [100, 500],
        }}
        labels={labels}
        onSubmit={onSubmit}
        onChange={onChange}
      />,
    )

    await userEvent.click(screen.getByRole('combobox', { name: 'Environment' }))
    await userEvent.click(screen.getByRole('option', { name: 'prod' }))

    expect(onSubmit).toHaveBeenLastCalledWith({
      ...defaultValues,
      status: 'active',
      env: ['prod'],
      price: [100, 500],
    })
  })

  it('should display clear buttons in the drawer if the values are different from the default values', async () => {
    renderWithTheme(<Filters config={config} defaultValues={defaultValues} labels={labels} />)

    await userEvent.click(screen.getByRole('button', { name: 'All filters' }))
    expect(screen.getByRole('dialog')).toBeVisible()

    expect(screen.queryByRole('button', { name: 'Clear' })).not.toBeInTheDocument()

    await userEvent.click(screen.getByRole('checkbox', { name: 'Production' }))
    expect(screen.getByRole('button', { name: 'Clear' })).toBeVisible()

    await userEvent.click(screen.getByRole('checkbox', { name: 'Production' }))
    expect(screen.queryByRole('button', { name: 'Clear' })).not.toBeInTheDocument()
  })

  it('should show the "see all" button when at least one filter of the config is not in the main row', () => {
    renderWithTheme(
      <Filters
        config={config.filter(item => ['Name', 'Price'].includes(item.label))}
        defaultValues={defaultValues}
        labels={labels}
        layout={{ mainFilters: ['name'] }}
      />,
    )

    expect(screen.getByLabelText('Name')).toBeVisible()
    expect(screen.queryByRole('slider', { name: 'Price' })).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'All filters' })).toBeVisible()
  })

  it('should hide the "see all" button when all filters are in main row', () => {
    renderWithTheme(
      <Filters
        config={config.filter(item => ['Name', 'Price'].includes(item.label))}
        defaultValues={defaultValues}
        labels={labels}
      />,
    )

    expect(screen.getByLabelText('Name')).toBeVisible()
    expect(screen.getByLabelText('Price')).toBeVisible()
    expect(screen.queryByRole('button', { name: 'All filters' })).not.toBeInTheDocument()
  })

  it('should accept custom filter components', () => {
    const CustomFilter = ({ config }: FilterComponentProps) => <button type="button">{config.label}</button>

    renderWithTheme(
      <Filters
        components={{ custom: CustomFilter }}
        config={[
          {
            name: 'custom',
            label: 'Custom component',
            type: 'custom',
          },
        ]}
        defaultValues={{ custom: '' }}
        labels={labels}
      />,
    )

    expect(screen.getByRole('button', { name: 'Custom component' })).toBeVisible()
  })

  it('should provide the context for access outside of the main components', async () => {
    const onSubmit = vi.fn()

    renderWithTheme(
      <FiltersProvider
        defaultValues={defaultValues}
        initialValues={{
          name: 'John',
          status: 'active',
        }}
        onSubmit={onSubmit}
      >
        {({ filters }) => (
          <>
            <FiltersMainRow config={config} labels={labels} />
            <Button
              onClick={() => {
                filters.reset()
                filters.submit(filters.defaultValues)
              }}
            >
              Reset from outside of the component
            </Button>
          </>
        )}
      </FiltersProvider>,
    )

    expect(screen.getByRole('textbox', { name: 'Name' })).toHaveValue('John')

    await userEvent.click(screen.getByRole('button', { name: 'Reset from outside of the component' }))

    expect(onSubmit).toHaveBeenCalledExactlyOnceWith(defaultValues)
    expect(screen.getByRole('textbox', { name: 'Name' })).toHaveValue('')
  })
})
