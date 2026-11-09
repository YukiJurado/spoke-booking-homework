import { useEffect, useRef, useState } from 'react'
import { TopBar } from './components/TopBar'
import { ActionBar } from './components/ActionBar'
import { ChooseService } from './screens/ChooseService'
import { PickSlot } from './screens/PickSlot'
import { services } from './data/services'
import './App.css'

export default function App() {
  const [step, setStep] = useState<1 | 2>(1)
  const [selectedId, setSelectedId] = useState(services[0].id)
  const [day, setDay] = useState('Today')
  const [time, setTime] = useState('16:30')
  const [continued, setContinued] = useState(false)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const selected = services.find(service => service.id === selectedId)!

  useEffect(() => {
    if (step === 2) headingRef.current?.focus()
  }, [step])

  function changeStep(nextStep: 1 | 2) {
    setContinued(false)
    setStep(nextStep)
    window.scrollTo(0, 0)
  }

  return (
    <div className="booking-screen">
      <TopBar step={`Step ${step} of 3`} onBack={step === 2 ? () => changeStep(1) : undefined} />
      {step === 1 ? (
        <ChooseService services={services} selectedId={selectedId} onSelect={setSelectedId}
          onContinue={() => changeStep(2)} />
      ) : (
        <PickSlot service={selected} day={day} time={time} headingRef={headingRef}
          onDayChange={value => { setDay(value); setContinued(false) }}
          onTimeChange={value => { setTime(value); setContinued(false) }}
          onContinue={() => setContinued(true)} continued={continued} />
      )}
      <ActionBar label="Continue" form={step === 1 ? 'choose-service' : 'pick-slot'} />
    </div>
  )
}
