import { ServiceCard } from '../components/ServiceCard'
import type { Service } from '../data/services'

type ChooseServiceProps = {
  services: Service[]
  selectedId: string
  onSelect: (id: string) => void
  onContinue: () => void
}

export function ChooseService({ services, selectedId, onSelect, onContinue }: ChooseServiceProps) {
  return (
    <main className="booking-content">
      <header className="screen-heading">
        <h1 id="service-heading">Choose a service</h1>
        <p id="service-description">What does your bike need?</p>
      </header>
      <form id="choose-service" onSubmit={event => { event.preventDefault(); onContinue() }}>
        <fieldset className="service-list" aria-labelledby="service-heading" aria-describedby="service-description">
          {services.map(service => (
            <ServiceCard key={service.id} {...service} selected={service.id === selectedId}
              onSelect={() => onSelect(service.id)} />
          ))}
        </fieldset>
      </form>
    </main>
  )
}
