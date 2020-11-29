/* eslint-disable import/no-extraneous-dependencies */
import { render } from '@testing-library/react'
import serializer from 'jest-emotion'

expect.addSnapshotSerializer(serializer)

export default component => {
  const { asFragment } = render(component)
  expect(asFragment()).toMatchSnapshot()
}
