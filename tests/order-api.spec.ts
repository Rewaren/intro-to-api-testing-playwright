import { expect, test } from '@playwright/test'
import { OrderDto } from '../dto/order-dto'
import { StatusCodes } from 'http-status-codes'

test('post order with correct data should receive code 201', async ({ request }) => {
  const requestBody = new OrderDto('OPEN', 0, 'John Doe', '+123456789', 'Low Priority', 7)

  const response = await request.post('https://backend.tallinn-learning.ee/test-orders', {
    data: requestBody,
  })
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect(response.status()).toBe(StatusCodes.OK)
})

test('post order with incorrect data should receive code 400', async ({ request }) => {
  const requestBody = new OrderDto('OPEN', 0, 'John Doe', '+123456789', 'Low Priority', 7)
  const response = await request.post('https://backend.tallinn-learning.ee/test-orders', {
    data: requestBody,
  })
  // Log the response status and body
  console.log('response status:', response.status())
  console.log('response body:', await response.text())
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})
