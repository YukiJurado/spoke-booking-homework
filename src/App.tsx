import { useState } from 'react'
import { TopBar } from './components/TopBar'
import { ServiceCard } from './components/ServiceCard'
import { ActionBar } from './components/ActionBar'
import './App.css'

const services = [
  { id: 'flat-tyre', title: 'Flat tyre repair', price: '€15', description: 'Tube or tyre swap, any wheel size.', duration: '30 min' },
  { id: 'brakes', title: 'Brake check and adjust', price: '€25', description: 'Pads, cables and alignment.', duration: '45 min' },
  { id: 'gears', title: 'Gear tune-up', price: '€30', description: 'Smooth shifting on every gear.', duration: '45 min' },
  { id: 'full-service', title: 'Full service', price: '€89', description: 'Everything checked, cleaned and adjusted.', duration: '2 hours' },
]

export default function App() {
  const [selectedId, setSelectedId] = useState(services[0].id)
  const [continued, setContinued] = useState(false)
  const selected = services.find(service => service.id === selectedId)!

  function continueBooking() {
    setContinued(true)
  }

  return (
    <div className="booking-screen">
      <TopBar />
      <main className="booking-content">
        <header className="screen-heading">
          <h1 id="service-heading">Choose a service</h1>
          <p id="service-description">What does your bike need?</p>
        </header>
        <form id="choose-service" onSubmit={event => { event.preventDefault(); continueBooking() }}>
          <fieldset className="service-list" aria-labelledby="service-heading" aria-describedby="service-description">
            {services.map(service => (
              <ServiceCard key={service.id} {...service} selected={service.id === selectedId}
                onSelect={() => { setSelectedId(service.id); setContinued(false) }} />
            ))}
          </fieldset>
        </form>
        <p className="selection-status" role="status">
          {continued ? `${selected.title} selected: ${selected.price} · ${selected.duration}.` : ''}
        </p>
      </main>
      <ActionBar label="Continue" form="choose-service" />
    </div>
  )
}
