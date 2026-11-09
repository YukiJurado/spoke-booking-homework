export const services = [
  { id: 'flat-tyre', title: 'Flat tyre repair', price: '€15', description: 'Tube or tyre swap, any wheel size.', duration: '30 min' },
  { id: 'brakes', title: 'Brake check and adjust', price: '€25', description: 'Pads, cables and alignment.', duration: '45 min' },
  { id: 'gears', title: 'Gear tune-up', price: '€30', description: 'Smooth shifting on every gear.', duration: '45 min' },
  { id: 'full-service', title: 'Full service', price: '€89', description: 'Everything checked, cleaned and adjusted.', duration: '2 hours' },
]

export type Service = (typeof services)[number]
