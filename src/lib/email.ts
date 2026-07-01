type SendEmailInput = {
  to: string
  subject: string
  text: string
}

export async function sendEmail({ to, subject, text }: SendEmailInput) {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM ?? 'Prime Gold <onboarding@resend.dev>'

  if (!apiKey) {
    console.info('[email demo]', { to, subject })
    return { demo: true }
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from, to, subject, text }),
  })

  if (!res.ok) {
    throw new Error(`Resend error: ${res.status}`)
  }

  return res.json()
}
