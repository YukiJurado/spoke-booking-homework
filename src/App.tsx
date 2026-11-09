import { useEffect, useRef, useState } from 'react'
import { TopBar } from './components/TopBar'
import { ActionBar } from './components/ActionBar'
import { ChooseService } from './screens/ChooseService'
import { PickSlot } from './screens/PickSlot'
import { Confirm } from './screens/Confirm'
import { services } from './data/services'
import './App.css'

export default function App() {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [selectedId, setSelectedId] = useState(services[0].id)
  const [day, setDay] = useState('Today')
  const [time, setTime] = useState('16:30')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [confirmed, setConfirmed] = useState(false)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const selected = services.find(service => service.id === selectedId)!

  useEffect(() => {
    headingRef.current?.focus()
  }, [step])

  function changeStep(nextStep: 1 | 2 | 3) {
    setConfirmed(false)
    setStep(nextStep)
    window.scrollTo(0, 0)
  }

  return (
    <div className="booking-screen">
      <TopBar step={`Step ${step} of 3`}
        backLabel={step === 3 ? 'Back to pick a slot' : 'Back to choose a service'}
        onBack={step > 1 ? () => changeStep(step === 3 ? 2 : 1) : undefined} />
      {step === 1 ? (
        <ChooseService services={services} selectedId={selectedId} onSelect={setSelectedId} headingRef={headingRef}
          onContinue={() => changeStep(2)} />
      ) : step === 2 ? (
        <PickSlot service={selected} day={day} time={time} headingRef={headingRef}
          onDayChange={setDay} onTimeChange={setTime} onContinue={() => changeStep(3)} />
      ) : (
        <Confirm service={selected} day={day} time={time} name={name} phone={phone}
          headingRef={headingRef} onNameChange={setName} onPhoneChange={setPhone}
          onConfirm={() => setConfirmed(true)} confirmed={confirmed} />
      )}
      <ActionBar label={step === 3 ? confirmed ? 'Demo booking confirmed' : 'Confirm booking' : 'Continue'}
        form={step === 1 ? 'choose-service' : step === 2 ? 'pick-slot' : 'confirm-booking'}
        disabled={confirmed} />
    </div>
  )
}
