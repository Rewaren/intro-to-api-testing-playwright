import { expect, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'

// Common headers for authenticated requests
const requestHeaders: { api_key: string } = {
  api_key: '1234567890123456',
}

// GET Tests
test('GET - Get order with valid ID', async ({ request }) => {
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders/1')
  console.log('response body:', await response.json())
  console.log('response headers:', response.headers())
  expect(response.status()).toBe(StatusCodes.OK)
})

test('GET - Get order with incorrect ID', async ({ request }) => {
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders/9999')
  console.log('response status:', response.status())
  console.log('response body:', await response.text())
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('GET - Get order with invalid ID format', async ({ request }) => {
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders/invalid')
  console.log('response status:', response.status())
  console.log('response body:', await response.text())
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('GET - Get order without authentication when required', async ({ request }) => {
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders/1')
  expect([StatusCodes.OK, StatusCodes.UNAUTHORIZED]).toContain(response.status())
})

// PUT Tests
test('PUT - Update order with valid data and API key', async ({ request }) => {
  const requestBody = {
    status: 'OPEN',
    courierId: 1,
    customerName: 'Updated Customer',
    customerPhone: '123456789',
    comment: 'Updated comment',
    id: 1,
  }

  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/1', {
    headers: requestHeaders,
    data: requestBody,
  })

  console.log('response status:', response.status())
  console.log('response body:', await response.text())
  expect([StatusCodes.OK, StatusCodes.NO_CONTENT]).toContain(response.status())
})

test('PUT - Update order with invalid ID', async ({ request }) => {
  const requestBody = {
    status: 'PROCESSING',
    courierId: 1,
    customerName: 'Updated Customer',
    customerPhone: '123456789',
    comment: 'Updated comment',
  }

  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/0', {
    headers: requestHeaders,
    data: requestBody,
  })

  console.log('response status:', response.status())
  console.log('response body:', await response.text())
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('PUT - Update order without API key', async ({ request }) => {
  const requestBody = {
    status: 'PROCESSING',
    courierId: 1,
    customerName: 'Updated Customer',
    customerPhone: '123456789',
    comment: 'Updated comment',
  }

  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/1', {
    data: requestBody,
  })

  console.log('response status:', response.status())
  console.log('response body:', await response.text())
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('PUT - should return 400 when updating order with invalid API key', async ({ request }) => {
  const requestBody = {
    status: 'PROCESSING',
    courierId: 1,
    customerName: 'Updated Customer',
    customerPhone: '123456789',
    comment: 'Updated comment',
  }

  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/1', {
    headers: { api_key: 'invalid-key' },
    data: requestBody,
  })

  console.log('response status:', response.status())
  console.log('response body:', await response.text())
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('PUT - Update order with invalid data', async ({ request }) => {
  const requestBody = {
    status: 'INVALID_STATUS',
    courierId: 'invalid',
    customerName: '',
    customerPhone: 'invalid-phone',
  }

  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/1', {
    headers: requestHeaders,
    data: requestBody,
  })

  console.log('response status:', response.status())
  console.log('response body:', await response.text())
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

// DELETE Tests
test('DELETE - Delete order with valid ID and API key', async ({ request }) => {
  const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/1', {
    headers: requestHeaders,
  })

  console.log('response status:', response.status())
  console.log('response body:', await response.text())
  expect(response.status()).toBe(StatusCodes.NO_CONTENT)
})

test('DELETE - Delete order with invalid ID', async ({ request }) => {
  const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/0', {
    headers: requestHeaders,
  })

  console.log('response status:', response.status())
  console.log('response body:', await response.text())
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('DELETE - Delete order without API key', async ({ request }) => {
  const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/1')
  console.log('response status:', response.status())
  console.log('response body:', await response.text())
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('DELETE - Delete order with invalid API key', async ({ request }) => {
  const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/1', {
    headers: { api_key: 'invalid-key' },
  })

  console.log('response status:', response.status())
  console.log('response body:', await response.text())
  expect(response.status()).toBe(StatusCodes.UNAUTHORIZED)
})

test('DELETE - Delete already deleted order', async ({ request }) => {
  await request.delete('https://backend.tallinn-learning.ee/test-orders/2', {
    headers: requestHeaders,
  })

  const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/2', {
    headers: requestHeaders,
  })

  console.log('response status:', response.status())
  console.log('response body:', await response.text())
  expect(response.status()).toBe(StatusCodes.NO_CONTENT)
})

// Login Tests
test('GET Login - Login with valid credentials', async ({ request }) => {
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders', {
    params: {
      username: 'validuser',
      password: 'validpass',
    },
  })

  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect(response.status()).toBe(StatusCodes.OK)
})
