interface Props {
  title: string
  description: string
}

export default function GenericPage({ title, description }: Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-64 text-center">
      <div className="w-14 h-14 rounded-2xl bg-blue-500/15 border border-blue-500/25 flex items-center justify-center mx-auto mb-4">
        <div className="w-6 h-6 rounded-lg bg-blue-400 opacity-60" />
      </div>
      <h2 className="font-display font-bold text-white text-2xl mb-2">{title}</h2>
      <p className="text-slate-400 text-sm max-w-sm">{description}</p>
    </div>
  )
}
