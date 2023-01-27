import './App.css'

export function CardTitle({text}) {
  return(
    <div className="tw-cardTitle">
      <strong className="tw-cardTitle-text">{text}</strong>
    </div>
  )
}