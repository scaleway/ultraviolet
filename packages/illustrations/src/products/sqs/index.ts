import { bucketLinkProduct } from '../../helper'

const [sqsContent, sqsKeyvisual, sqsOriginal, sqsWire] =
  bucketLinkProduct('sqs')

export { sqsOriginal, sqsWire, sqsContent, sqsKeyvisual }
