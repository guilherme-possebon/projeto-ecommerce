import { Product } from '../../../models/Product'
import type { ProductInterface } from '../../../models/Product'
import type { NextApiRequest, NextApiResponse } from 'next'
import { mongooseConnect } from '../../../lib/mongoose'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req
  await mongooseConnect()

  if (method === 'GET') {
    if (req.query?.id) {
      res.json(await Product.findOne({ _id: req.query.id }))
    } else {
      res.json(await Product.find())
    }
  }

  if (method === 'POST') {
    const { title, description, price }: ProductInterface = req.body
    const productDoc = await Product.create({
      title,
      description,
      price
    })
    res.json(productDoc)
  }
}
