import chevronLeft from '../assets/icons/chevron-left.svg'

type TopBarProps = { title?: string; step?: string; backHref?: string }

export function TopBar({ title = 'Book a repair', step = 'Step 1 of 3', backHref = '/' }: TopBarProps) {
  return (
    <header className="top-bar">
      <a className="top-bar__back" href={backHref} aria-label="Back to start">
        <img src={chevronLeft} width="24" height="24" alt="" />
      </a>
      <p className="top-bar__title">{title}</p>
      <p className="top-bar__step">{step}</p>
    </header>
  )
}
