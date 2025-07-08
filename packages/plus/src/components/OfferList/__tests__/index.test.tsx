import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme, shouldMatchEmotionSnapshot } from '@utils/test'
import { describe, expect, it, vi } from 'vitest'
import { OfferList } from '..'
import { columns, data } from './resources'

describe('InfoTable', () => {
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

  it('should work with banner top', () =>
    shouldMatchEmotionSnapshot(
      <OfferList columns={columns} expandable>
        {data.map(planet => (
          <OfferList.Row
            offerName={planet.id}
            key={planet.id}
            id={planet.id}
            banner={{ text: 'text', position: 'top' }}
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

  it('should work with banner bottom', () =>
    shouldMatchEmotionSnapshot(
      <OfferList columns={columns} expandable>
        {data.map(planet => (
          <OfferList.Row
            offerName={planet.id}
            key={planet.id}
            id={planet.id}
            banner={{ text: 'text', position: 'bottom', sentiment: 'danger' }}
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

  it('should work with footprint', () =>
    shouldMatchEmotionSnapshot(
      <OfferList columns={columns}>
        {data.map(planet => (
          <OfferList.Row offerName={planet.id} key={planet.id} id={planet.id}>
            <OfferList.Cell footPrint={{ score: 2 }}>
              {planet.name}
            </OfferList.Cell>
            <OfferList.Cell footPrint={{ score: 3, max: 10 }}>
              {planet.perihelion}AU
            </OfferList.Cell>
            <OfferList.Cell>{planet.aphelion}AU</OfferList.Cell>
          </OfferList.Row>
        ))}
      </OfferList>,
    ))

  it('should work loading', () =>
    shouldMatchEmotionSnapshot(
      <OfferList columns={columns} loading selectable="radio">
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
      <OfferList columns={columns} onChangeSelect={onChange} selectable="radio">
        {data.map(planet => (
          <OfferList.Row offerName={planet.id} key={planet.id} id={planet.id}>
            <OfferList.Cell>{planet.name}</OfferList.Cell>
            <OfferList.Cell>{planet.perihelion}AU</OfferList.Cell>
            <OfferList.Cell>{planet.aphelion}AU</OfferList.Cell>
          </OfferList.Row>
        ))}
      </OfferList>,
    )

    const radioVenus = screen.getByDisplayValue('venus')
    await userEvent.click(radioVenus)
    expect(onChange).toHaveBeenCalled()
    expect(radioVenus).toBeChecked()
    expect(asFragment()).toMatchSnapshot()
  })

  it('should work with selectable - checkbox', async () => {
    const onChange = vi.fn()
    const { asFragment } = renderWithTheme(
      <OfferList
        columns={columns}
        onChangeSelect={onChange}
        selectable="checkbox"
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

    const radioVenus = screen.getByDisplayValue('venus')
    await userEvent.click(radioVenus)
    expect(onChange).toHaveBeenCalled()
    expect(radioVenus).toBeChecked()
    expect(asFragment()).toMatchSnapshot()
  })

  it('should work with expandable', async () => {
    const { asFragment } = renderWithTheme(
      <OfferList columns={columns} selectable="radio" expandable>
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

  it('should throw an error when using OfferList.Cell outside OfferList.Row', () => {
    expect(() =>
      shouldMatchEmotionSnapshot(
        <OfferList columns={columns}>
          <OfferList.Cell>a cell</OfferList.Cell>
        </OfferList>,
      ),
    ).toThrowError(
      'OfferList.Cell should be used inside a OfferList.Row component',
    )
  })
})
