import { useState } from 'react'
import type { FormEvent, Ref } from 'react'
import { Input } from '../components/Input'
import { SummaryRow } from '../components/SummaryRow'
import type { Service } from '../data/services'

type ConfirmProps = {
  service: Service
  day: string
  time: string
  name: string
  phone: string
  headingRef: Ref<HTMLHeadingElement>
  onNameChange: (name: string) => void
  onPhoneChange: (phone: string) => void
  onConfirm: () => void
  confirmed: boolean
}

type ContactErrors = { name?: string; phone?: string }

export function Confirm({ service, day, time, name, phone, headingRef, onNameChange, onPhoneChange, onConfirm, confirmed }: ConfirmProps) {
  const [errors, setErrors] = useState<ContactErrors>({})

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (confirmed) return
    const nextErrors: ContactErrors = {}
    if (!name.trim()) nextErrors.name = 'Enter your name.'
    const digits = phone.replace(/\D/g, '')
    if (!/^\+?[\d\s().-]+$/.test(phone.trim()) || digits.length < 7 || digits.length > 15) {
      nextErrors.phone = 'Enter a phone number with 7 to 15 digits.'
    }
    setErrors(nextErrors)
    if (nextErrors.name || nextErrors.phone) {
      const field = event.currentTarget.elements.namedItem(nextErrors.name ? 'name' : 'phone')
      if (field instanceof HTMLInputElement) field.focus()
      return
    }
    onConfirm()
  }

  return (
    <main className="booking-content">
      <header className="screen-heading">
        <h1 ref={headingRef} tabIndex={-1}>Check and confirm</h1>
      </header>
      <dl className="booking-summary" aria-label="Booking summary">
        <SummaryRow label="Service" value={service.title} />
        <SummaryRow label="Drop-off" value={`${day} at ${time}`} />
        <SummaryRow label="Price" value={`${service.price}, pay at pick-up`} />
      </dl>
      <form id="confirm-booking" className="contact-form" noValidate onSubmit={submit}>
        <Input id="customer-name" name="name" label="Your name" placeholder="First and last name"
          autoComplete="name" required value={name} disabled={confirmed} error={errors.name}
          onChange={event => { onNameChange(event.target.value); setErrors(current => ({ ...current, name: undefined })) }} />
        <Input id="customer-phone" name="phone" type="tel" label="Phone number" placeholder="+32 470 12 34 56"
          autoComplete="tel" required value={phone} disabled={confirmed} error={errors.phone}
          onChange={event => { onPhoneChange(event.target.value); setErrors(current => ({ ...current, phone: undefined })) }} />
      </form>
      <p className="slot-note">We text you when your bike is ready. You pay when you pick it up.</p>
      <p className="selection-status" role="status">
        {confirmed ? 'Demo booking confirmed. This does not reserve a workshop appointment.' : ''}
      </p>
    </main>
  )
}
