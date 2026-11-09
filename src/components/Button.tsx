import type { ButtonHTMLAttributes } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string
  variant?: 'Primary' | 'Secondary'
}

export function Button({ label, variant = 'Primary', className = '', type = 'button', ...props }: ButtonProps) {
  return <button className={`button button--${variant.toLowerCase()} ${className}`} type={type} {...props}>{label}</button>
}
