import { useState } from 'react'
import type { Ref } from 'react'
import { Button } from '../components/Button'
import { SummaryRow } from '../components/SummaryRow'
import { Tag } from '../components/Tag'
import type { Service } from '../data/services'

type BookingCompleteProps = {
  name: string
  service: Service
  day: string
  time: string
  reference: string
  headingRef: Ref<HTMLHeadingElement>
}

export function BookingComplete({ name, service, day, time, reference, headingRef }: BookingCompleteProps) {
  const [downloadStarted, setDownloadStarted] = useState(false)
  const firstName = name.trim().split(/\s+/)[0]

  function saveDetails() {
    const receipt = [
      'SPOKE — DEMO BOOKING DETAILS',
      `Reference: ${reference}`,
      `Name: ${name.trim()}`,
      `Service: ${service.title}`,
      `Drop-off: ${day} at ${time}`,
      `Price: ${service.price}, pay at pick-up`,
      `Saved: ${new Date().toLocaleString()}`,
      '',
      'Demo only. No workshop appointment has been reserved.',
    ].join('\n')
    const url = URL.createObjectURL(new Blob([receipt], { type: 'text/plain;charset=utf-8' }))
    const link = document.createElement('a')
    link.href = url
    link.download = `spoke-${reference.toLowerCase()}.txt`
    link.click()
    window.setTimeout(() => URL.revokeObjectURL(url), 1000)
    setDownloadStarted(true)
  }

  return (
    <main className="booking-content booking-complete">
      <header className="success-heading">
        <svg className="success-mark" width="64" height="64" viewBox="0 0 64 64" aria-hidden="true">
          <circle cx="32" cy="32" r="32" />
          <path d="M20 32L28 40L44 24" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div className="screen-heading">
          <h1 ref={headingRef} tabIndex={-1}>You’re all set, {firstName}!</h1>
          <p>One step closer to getting back on the road.</p>
        </div>
      </header>
      <section className="booking-summary" aria-labelledby="booking-pass-title">
        <div className="booking-pass__heading">
          <h2 id="booking-pass-title">Booking details</h2>
          <Tag label="Demo booking" />
        </div>
        <dl className="booking-pass__rows">
          <SummaryRow label="Service" value={service.title} />
          <SummaryRow label="Drop-off" value={`${day} at ${time}`} />
          <SummaryRow label="Price" value={`${service.price}, pay at pick-up`} />
          <SummaryRow label="Reference" value={reference} />
        </dl>
      </section>
      <Button label="Save booking details" variant="Secondary" className="booking-pass__save" onClick={saveDetails} />
      <p className="slot-note success-note">Demo only. No workshop appointment has been reserved.</p>
      <p className="selection-status" role="status">{downloadStarted ? 'Your booking details download has started.' : ''}</p>
    </main>
  )
}
