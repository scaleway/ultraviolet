/* eslint-disable import/no-extraneous-dependencies */
import serializer from 'jest-emotion'
import renderer from 'react-test-renderer'

expect.addSnapshotSerializer(serializer)

export default component => {
  console.log(component)
  expect(renderer.create(component).toJSON()).toMatchSnapshot()
}
