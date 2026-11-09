import { Tag } from './Tag'

type ServiceCardProps = {
  id: string
  title: string
  price: string
  description: string
  duration: string
  selected: boolean
  onSelect: () => void
}

export function ServiceCard({ id, title, price, description, duration, selected, onSelect }: ServiceCardProps) {
  return (
    <label className="service-option">
      <input className="service-option__radio" type="radio" name="service" value={id}
        checked={selected} onChange={onSelect} aria-labelledby={`${id}-title ${id}-price`}
        aria-describedby={`${id}-description ${id}-duration`} />
      <span className={`service-card${selected ? ' service-card--selected' : ''}`}>
        <span className="service-card__header">
          <span className="service-card__title" id={`${id}-title`}>{title}</span>
          <span className="service-card__price" id={`${id}-price`}>{price}</span>
        </span>
        <span className="service-card__description" id={`${id}-description`}>{description}</span>
        <span id={`${id}-duration`}><Tag label={duration} /></span>
      </span>
    </label>
  )
}
