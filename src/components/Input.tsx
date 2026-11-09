import type { InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string
  label: string
  error?: string
}

export function Input({ id, label, error, className = '', ...props }: InputProps) {
  return (
    <div className={`input ${className}`}>
      <label className="input__label" htmlFor={id}>{label}</label>
      <input {...props} id={id} className="input__field"
        aria-invalid={error ? true : undefined} aria-describedby={error ? `${id}-error` : undefined} />
      {error && <p id={`${id}-error`} className="input__error" role="alert">{error}</p>}
    </div>
  )
}
