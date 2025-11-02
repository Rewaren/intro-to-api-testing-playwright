export class OrderDto{
  status: string
  courierId: number
  customerName: string
  customerPhone: string
  comment: string
  id: number

  constructor(
    status: string,
    courierId: number,
    customerName: string,
    customerPhone: string,
    comment: string,
    id: number,
  ) {
    this.status = 'OPEN'
    this.courierId = 0
    this.customerName = customerName
    this.customerPhone = customerPhone
    this.comment = comment
    this.id = id
  }
  // add a method to create a new instance with random data
  static createOrderWithLowPriority(): OrderDto {
    return new OrderDto(
      'OPEN',
      0,
      'John Doe',
      '+123456789',
      'Low Priority',
      Math.floor(Math.random() * 100),
    )
  }
}