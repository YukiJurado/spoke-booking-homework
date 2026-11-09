type TimeSlotProps = {
  label: string
  name: string
  state?: 'Default' | 'Selected' | 'Disabled'
  onSelect: () => void
}

export function TimeSlot({ label, name, state = 'Default', onSelect }: TimeSlotProps) {
  return (
    <label className={`time-slot time-slot--${state.toLowerCase()}`}>
      <input className="time-slot__radio" type="radio" name={name} value={label}
        checked={state === 'Selected'} disabled={state === 'Disabled'} onChange={onSelect} />
      <span className="time-slot__label">{label}</span>
    </label>
  )
}
