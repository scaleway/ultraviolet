import { bucketLinkProduct } from '../../helper'

const [
  serverlessJobContent,
  serverlessJobKeyvisual,
  serverlessJobOriginal,
  serverlessJobWire,
] = bucketLinkProduct('serverlessJob')

export {
  serverlessJobOriginal,
  serverlessJobWire,
  serverlessJobContent,
  serverlessJobKeyvisual,
}
