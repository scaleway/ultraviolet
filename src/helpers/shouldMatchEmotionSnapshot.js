/* eslint-disable import/no-extraneous-dependencies */
import { createSerializer } from '@emotion/jest'
import renderer from 'react-test-renderer'

expect.addSnapshotSerializer(createSerializer())

export default component => {
  expect(renderer.create(component).toJSON()).toMatchSnapshot()
}
