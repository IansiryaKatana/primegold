/** In-memory persistence when Supabase is not configured */
const appointments: Array<Record<string, unknown>> = []
const subscribers = new Set<string>()
const orders: Array<Record<string, unknown>> = []
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
