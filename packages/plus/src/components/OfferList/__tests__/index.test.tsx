import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme, shouldMatchEmotionSnapshot } from '@utils/test'
import { describe, expect, it, vi } from 'vitest'
import { OfferList } from '..'
import { columns, data } from './resources'

describe('OfferList', () => {
  it('should work with default props', () =>
    shouldMatchEmotionSnapshot(
      <OfferList columns={columns}>
        {data.map(planet => (
          <OfferList.Row key={planet.id} id={planet.id} offerName={planet.id}>
            <OfferList.Cell>{planet.name}</OfferList.Cell>
            <OfferList.Cell>{planet.perihelion}AU</OfferList.Cell>
            <OfferList.Cell>{planet.aphelion}AU</OfferList.Cell>
          </OfferList.Row>
        ))}
      </OfferList>,
    ))

  it('should work with sentiment', () =>
    shouldMatchEmotionSnapshot(
      <OfferList columns={columns}>
        {data.map(planet => (
          <OfferList.Row key={planet.id} id={planet.id} offerName={planet.id}>
            <OfferList.Cell>{planet.name}</OfferList.Cell>
            <OfferList.Cell>{planet.perihelion}AU</OfferList.Cell>
            <OfferList.Cell>{planet.aphelion}AU</OfferList.Cell>
          </OfferList.Row>
        ))}
      </OfferList>,
    ))

  it('should work with banner', () =>
    shouldMatchEmotionSnapshot(
      <OfferList columns={columns} expandable>
        {data.map(planet => (
          <OfferList.Row
            offerName={planet.id}
            key={planet.id}
            id={planet.id}
            banner={{
              text: 'text',
              sentiment: planet.id === 'mercury' ? 'warning' : undefined,
            }}
            expandable="text"
          >
            <OfferList.Cell>{planet.name}</OfferList.Cell>
            <OfferList.Cell>{planet.perihelion}AU</OfferList.Cell>
            <OfferList.Cell>{planet.aphelion}AU</OfferList.Cell>
          </OfferList.Row>
        ))}
      </OfferList>,
    ))

  it('should work with banner open', () =>
    shouldMatchEmotionSnapshot(
      <OfferList columns={columns} expandable>
        {data.map(planet => (
          <OfferList.Row
            offerName={planet.id}
            key={planet.id}
            id={planet.id}
            banner={{ text: 'text', sentiment: 'danger' }}
            expandablePadding="3"
            expanded
            expandable="text"
          >
            <OfferList.Cell>{planet.name}</OfferList.Cell>
            <OfferList.Cell>{planet.perihelion}AU</OfferList.Cell>
            <OfferList.Cell>{planet.aphelion}AU</OfferList.Cell>
          </OfferList.Row>
        ))}
      </OfferList>,
    ))

  it('should work with badge', () =>
    shouldMatchEmotionSnapshot(
      <OfferList columns={columns} expandable>
        {data.map(planet => (
          <OfferList.Row
            offerName={planet.id}
            key={planet.id}
            id={planet.id}
            badge={{ text: 'text' }}
            expandable="text"
          >
            <OfferList.Cell>{planet.name}</OfferList.Cell>
            <OfferList.Cell>{planet.perihelion}AU</OfferList.Cell>
            <OfferList.Cell>{planet.aphelion}AU</OfferList.Cell>
          </OfferList.Row>
        ))}
      </OfferList>,
    ))

  it('should work loading', () =>
    shouldMatchEmotionSnapshot(
      <OfferList columns={columns} loading>
        {data.map(planet => (
          <OfferList.Row offerName={planet.id} key={planet.id} id={planet.id}>
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
        type="radio"
        selected="jupiter"
      >
        {data.map(planet => (
          <OfferList.Row offerName={planet.id} key={planet.id} id={planet.id}>
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
        type="checkbox"
        selected={['jupiter']}
      >
        {data.map(planet => (
          <OfferList.Row offerName={planet.id} key={planet.id} id={planet.id}>
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
            offerName={planet.id}
            key={planet.id}
            id={planet.id}
            expandable="expandable content"
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
      shouldMatchEmotionSnapshot(
        <OfferList.Row offerName="cell" id="cell">
          <OfferList.Cell>a cell</OfferList.Cell>
        </OfferList.Row>,
      ),
    ).toThrowError(
      'useOfferListContext should be used inside a OfferList component',
    )
  })
})
