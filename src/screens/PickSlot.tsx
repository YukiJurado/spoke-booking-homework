import type { Ref } from 'react'
import { TimeSlot } from '../components/TimeSlot'
import type { Service } from '../data/services'

// Static choices from the Figma exercise, not live booking availability.
const days = ['Today', 'Tomorrow', 'Mon 16']
const times = [
  { label: '09:00', disabled: true },
  { label: '10:30', disabled: true },
  { label: '12:00', disabled: false },
  { label: '14:00', disabled: false },
  { label: '16:30', disabled: false },
  { label: '17:30', disabled: false },
]

type PickSlotProps = {
  service: Service
  day: string
  time: string
  headingRef: Ref<HTMLHeadingElement>
  onDayChange: (day: string) => void
  onTimeChange: (time: string) => void
  onContinue: () => void
}

export function PickSlot({ service, day, time, headingRef, onDayChange, onTimeChange, onContinue }: PickSlotProps) {
  const duration = service.duration.replace(' min', ' minutes')
  return (
    <main className="booking-content">
      <header className="screen-heading">
        <h1 ref={headingRef} tabIndex={-1}>Pick a drop-off time</h1>
        <p>{service.title}, about {duration}</p>
      </header>
      <form id="pick-slot" className="slot-form" onSubmit={event => { event.preventDefault(); onContinue() }}>
        <fieldset className="slot-group">
          <legend>Day</legend>
          <div className="slot-options">
            {days.map(label => <TimeSlot key={label} name="day" label={label}
              state={day === label ? 'Selected' : 'Default'} onSelect={() => onDayChange(label)} />)}
          </div>
        </fieldset>
        <fieldset className="slot-group">
          <legend>Drop-off time</legend>
          <div className="slot-options">
            {times.map(slot => <TimeSlot key={slot.label} name="time" label={slot.label}
              state={slot.disabled ? 'Disabled' : time === slot.label ? 'Selected' : 'Default'}
              onSelect={() => onTimeChange(slot.label)} />)}
          </div>
        </fieldset>
      </form>
      <p className="slot-note">Ready the same day. We text you when your bike is done.</p>
    </main>
  )
}
