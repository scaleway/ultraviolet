import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithForm } from '@utils/test'
import { describe, expect, test, vi } from 'vitest'
import { OfferListField } from '..'
import { columns, data } from './resources'

describe('offerListField', () => {
  test('should render correctly', () => {
    const { asFragment } = renderWithForm(
      <OfferListField columns={columns} name="offer-list">
        {data.map(planet => (
          <OfferListField.Row
            id={planet.id}
            key={planet.id}
            offerName={planet.id}
          >
            <OfferListField.Cell>{planet.name}</OfferListField.Cell>
            <OfferListField.Cell>{planet.perihelion}AU</OfferListField.Cell>
            <OfferListField.Cell>{planet.aphelion}AU</OfferListField.Cell>
          </OfferListField.Row>
        ))}
      </OfferListField>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly disabled', () => {
    const { asFragment } = renderWithForm(
      <OfferListField columns={columns} name="offer-list">
        {data.map(planet => (
          <OfferListField.Row
            disabled
            id={planet.id}
            key={planet.id}
            offerName={planet.id}
          >
            <OfferListField.Cell>{planet.name}</OfferListField.Cell>
            <OfferListField.Cell>{planet.perihelion}AU</OfferListField.Cell>
            <OfferListField.Cell>{planet.aphelion}AU</OfferListField.Cell>
          </OfferListField.Row>
        ))}
      </OfferListField>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should trigger events', async () => {
    const onChange = vi.fn()
    renderWithForm(
      <OfferListField
        columns={columns}
        name="offer-list"
        onChange={onChange}
        value="jupiter"
      >
        {data.map(planet => (
          <OfferListField.Row
            id={planet.id}
            key={planet.id}
            offerName={planet.id}
          >
            <OfferListField.Cell>{planet.name}</OfferListField.Cell>
            <OfferListField.Cell>{planet.perihelion}AU</OfferListField.Cell>
            <OfferListField.Cell>{planet.aphelion}AU</OfferListField.Cell>
          </OfferListField.Row>
        ))}
      </OfferListField>,
    )

    const radioJupiter = screen.getByDisplayValue('jupiter')
    expect(radioJupiter).toBeChecked()

    const radioVenus = screen.getByDisplayValue('venus')
    await userEvent.click(radioVenus)
    expect(onChange).toHaveBeenCalledOnce()
    expect(radioVenus).toBeChecked()
    expect(radioJupiter).not.toBeChecked()
  })
})
