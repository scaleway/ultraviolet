import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme, shouldMatchSnapshot } from '@utils/test'
import { describe, expect, it, vi } from 'vitest'
import { OfferList } from '..'
import { columns, data } from './resources'

describe('offerList', () => {
  it('should work with default props', () =>
    shouldMatchSnapshot(
      <OfferList columns={columns}>
        {data.map(planet => (
          <OfferList.Row id={planet.id} key={planet.id} offerName={planet.id}>
            <OfferList.Cell>{planet.name}</OfferList.Cell>
            <OfferList.Cell>{planet.perihelion}AU</OfferList.Cell>
            <OfferList.Cell>{planet.aphelion}AU</OfferList.Cell>
          </OfferList.Row>
        ))}
      </OfferList>,
    ))

  it('should work with sentiment', () =>
    shouldMatchSnapshot(
      <OfferList columns={columns}>
        {data.map(planet => (
          <OfferList.Row id={planet.id} key={planet.id} offerName={planet.id}>
            <OfferList.Cell>{planet.name}</OfferList.Cell>
            <OfferList.Cell>{planet.perihelion}AU</OfferList.Cell>
            <OfferList.Cell>{planet.aphelion}AU</OfferList.Cell>
          </OfferList.Row>
        ))}
      </OfferList>,
    ))

  it('should work with banner', () =>
    shouldMatchSnapshot(
      <OfferList columns={columns} expandable>
        {data.map(planet => (
          <OfferList.Row
            banner={{
              sentiment: planet.id === 'mercury' ? 'warning' : undefined,
              text: 'text',
            }}
            expandable="text"
            id={planet.id}
            key={planet.id}
            offerName={planet.id}
          >
            <OfferList.Cell>{planet.name}</OfferList.Cell>
            <OfferList.Cell>{planet.perihelion}AU</OfferList.Cell>
            <OfferList.Cell>{planet.aphelion}AU</OfferList.Cell>
          </OfferList.Row>
        ))}
      </OfferList>,
    ))

  it('should work with banner open', () =>
    shouldMatchSnapshot(
      <OfferList columns={columns} expandable>
        {data.map(planet => (
          <OfferList.Row
            banner={{ sentiment: 'danger', text: 'text' }}
            expandable="text"
            expandablePadding="3"
            expanded
            id={planet.id}
            key={planet.id}
            offerName={planet.id}
          >
            <OfferList.Cell>{planet.name}</OfferList.Cell>
            <OfferList.Cell>{planet.perihelion}AU</OfferList.Cell>
            <OfferList.Cell>{planet.aphelion}AU</OfferList.Cell>
          </OfferList.Row>
        ))}
      </OfferList>,
    ))

  it('should work with badge', () =>
    shouldMatchSnapshot(
      <OfferList columns={columns} expandable>
        {data.map(planet => (
          <OfferList.Row
            badge={{ text: 'text' }}
            expandable="text"
            id={planet.id}
            key={planet.id}
            offerName={planet.id}
          >
            <OfferList.Cell>{planet.name}</OfferList.Cell>
            <OfferList.Cell>{planet.perihelion}AU</OfferList.Cell>
            <OfferList.Cell>{planet.aphelion}AU</OfferList.Cell>
          </OfferList.Row>
        ))}
      </OfferList>,
    ))

  it('should work loading', () =>
    shouldMatchSnapshot(
      <OfferList columns={columns} loading>
        {data.map(planet => (
          <OfferList.Row id={planet.id} key={planet.id} offerName={planet.id}>
            <OfferList.Cell>{planet.name}</OfferList.Cell>
            <OfferList.Cell>{planet.perihelion}AU</OfferList.Cell>
            <OfferList.Cell>{planet.aphelion}AU</OfferList.Cell>
          </OfferList.Row>
        ))}
      </OfferList>,
    ))
  it('should work with selectable - radio', async () => {
    const onChange = vi.fn()
    const { asFragment } = renderWithTheme(
      <OfferList
        columns={columns}
        onChangeSelect={onChange}
        selected="jupiter"
        type="radio"
      >
        {data.map(planet => (
          <OfferList.Row id={planet.id} key={planet.id} offerName={planet.id}>
            <OfferList.Cell>{planet.name}</OfferList.Cell>
            <OfferList.Cell>{planet.perihelion}AU</OfferList.Cell>
            <OfferList.Cell>{planet.aphelion}AU</OfferList.Cell>
          </OfferList.Row>
        ))}
      </OfferList>,
    )

    // Default selected value
    const radioJupiter = screen.getByDisplayValue('jupiter')
    expect(radioJupiter).toBeChecked()

    const radioVenus = screen.getByDisplayValue('venus')
    await userEvent.click(radioVenus)
    expect(onChange).toHaveBeenCalledOnce()
    expect(radioVenus).toBeChecked()
    expect(radioJupiter).not.toBeChecked()
    expect(asFragment()).toMatchSnapshot()
  })

  it('should work with selectable - checkbox', async () => {
    const onChange = vi.fn()
    const { asFragment } = renderWithTheme(
      <OfferList
        columns={columns}
        onChangeSelect={onChange}
        selected={['jupiter']}
        type="checkbox"
      >
        {data.map(planet => (
          <OfferList.Row id={planet.id} key={planet.id} offerName={planet.id}>
            <OfferList.Cell>{planet.name}</OfferList.Cell>
            <OfferList.Cell>{planet.perihelion}AU</OfferList.Cell>
            <OfferList.Cell>{planet.aphelion}AU</OfferList.Cell>
          </OfferList.Row>
        ))}
      </OfferList>,
    )
    // Default selected value
    const radioJupiter = screen.getByDisplayValue('jupiter')
    expect(radioJupiter).toBeChecked()

    const radioVenus = screen.getByDisplayValue('venus')
    await userEvent.click(radioVenus)
    expect(radioVenus).toBeChecked()

    await userEvent.click(radioJupiter)
    expect(radioJupiter).not.toBeChecked()
    expect(onChange).toHaveBeenCalledTimes(2)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should work with expandable', async () => {
    const { asFragment } = renderWithTheme(
      <OfferList columns={columns} expandable>
        {data.map(planet => (
          <OfferList.Row
            expandable="expandable content"
            id={planet.id}
            key={planet.id}
            offerName={planet.id}
          >
            <OfferList.Cell>{planet.name}</OfferList.Cell>
            <OfferList.Cell>{planet.perihelion}AU</OfferList.Cell>
            <OfferList.Cell>{planet.aphelion}AU</OfferList.Cell>
          </OfferList.Row>
        ))}
      </OfferList>,
    )

    const expandButton = screen.getAllByTestId('list-expand-button')[0]
    await userEvent.click(expandButton)

    const expandText = screen.getByText('expandable content')
    expect(expandText).toBeVisible()

    await userEvent.click(expandButton)
    expect(expandText).not.toBeVisible()
    expect(asFragment()).toMatchSnapshot()
  })

  it('should throw an error when using OfferList.Row outside OfferList', () => {
    expect(() =>
      shouldMatchSnapshot(
        <OfferList.Row id="cell" offerName="cell">
          <OfferList.Cell>a cell</OfferList.Cell>
        </OfferList.Row>,
      ),
    ).toThrowError(
      'useOfferListContext should be used inside a OfferList component',
    )
  })
})
