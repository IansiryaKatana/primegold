/** In-memory persistence when Supabase is not configured */

export type MemoryOrderLine = {
  productId: string
  name: string
  price: number
  qty: number
}

export type MemoryOrder = {
  id: string
  orderNumber: string
  email: string
  name: string
  lines: MemoryOrderLine[]
  subtotal: number
  shipping: number
  total: number
  status: string
  createdAt: string
}

const appointments: Array<Record<string, unknown>> = []
const subscribers = new Set<string>()
const orders: MemoryOrder[] = []
const kycCases: Array<Record<string, unknown>> = []
const buybackQuotes: Array<Record<string, unknown>> = []
const contactMessages: Array<Record<string, unknown>> = []

export const memoryStore = {
  appointments,
  subscribers,
  orders,
  kycCases,
  buybackQuotes,
  contactMessages,
}

export function generateOrderNumber() {
  return `PGT-${Date.now().toString(36).toUpperCase()}`
}

export type OrderSummary = {
  orderNumber: string
  email: string
  name: string
  lines: MemoryOrderLine[]
  subtotal: number
  shipping: number
  total: number
  status: string
  createdAt: string
}

export function toOrderSummary(order: MemoryOrder): OrderSummary {
  return {
    orderNumber: order.orderNumber,
    email: order.email,
    name: order.name,
    lines: order.lines,
    subtotal: order.subtotal,
    shipping: order.shipping,
    total: order.total,
    status: order.status,
    createdAt: order.createdAt,
  }
}
