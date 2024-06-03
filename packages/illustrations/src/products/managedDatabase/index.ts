import { bucketLinkProduct } from '../../helper'

const [
  managedDatabaseContent,
  managedDatabaseKeyvisual,
  managedDatabaseOriginal,
  managedDatabaseWire,
] = bucketLinkProduct('managedDatabase')

export {
  managedDatabaseOriginal,
  managedDatabaseWire,
  managedDatabaseKeyvisual,
  managedDatabaseContent,
}
