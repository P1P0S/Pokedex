export const typeColors: Record<string, { card: string; pill: string }> = {
  normal: {
    card: 'bg-gradient-to-r from-slate-400 to-slate-500',
    pill: 'bg-slate-600',
  },
  fighting: {
    card: 'bg-gradient-to-r from-red-400 to-red-600',
    pill: 'bg-red-700',
  },
  flying: {
    card: 'bg-gradient-to-r from-sky-300 to-sky-500',
    pill: 'bg-sky-600',
  },
  poison: {
    card: 'bg-gradient-to-r from-purple-400 to-purple-600',
    pill: 'bg-purple-700',
  },
  ground: {
    card: 'bg-gradient-to-r from-amber-500 to-amber-700',
    pill: 'bg-amber-800',
  },
  rock: {
    card: 'bg-gradient-to-r from-stone-400 to-stone-600',
    pill: 'bg-stone-700',
  },
  bug: {
    card: 'bg-gradient-to-r from-lime-400 to-lime-600',
    pill: 'bg-lime-700',
  },
  ghost: {
    card: 'bg-gradient-to-r from-indigo-400 to-indigo-600',
    pill: 'bg-indigo-700',
  },
  steel: {
    card: 'bg-gradient-to-r from-zinc-300 to-zinc-500',
    pill: 'bg-zinc-600',
  },
  fire: {
    card: 'bg-gradient-to-r from-orange-400 to-orange-600',
    pill: 'bg-orange-700',
  },
  water: {
    card: 'bg-gradient-to-r from-blue-400 to-blue-600',
    pill: 'bg-blue-700',
  },
  grass: {
    card: 'bg-gradient-to-r from-green-400 to-green-600',
    pill: 'bg-green-700',
  },
  electric: {
    card: 'bg-gradient-to-r from-yellow-300 to-yellow-500',
    pill: 'bg-yellow-600',
  },
  psychic: {
    card: 'bg-gradient-to-r from-pink-400 to-pink-600',
    pill: 'bg-pink-700',
  },
  ice: {
    card: 'bg-gradient-to-r from-cyan-300 to-cyan-500',
    pill: 'bg-cyan-600',
  },
  dragon: {
    card: 'bg-gradient-to-r from-violet-400 to-violet-600',
    pill: 'bg-violet-700',
  },
  dark: {
    card: 'bg-gradient-to-r from-neutral-600 to-neutral-800',
    pill: 'bg-neutral-900',
  },
  fairy: {
    card: 'bg-gradient-to-r from-rose-300 to-rose-500',
    pill: 'bg-rose-600',
  },
}

export const moveStatusColors: Record<string, { pill: string }> = {
  psychicStatus: {
    pill: 'bg-pink-800',
  },
  special: {
    pill: 'bg-indigo-800',
  },
  status: {
    pill: 'bg-gray-800',
  },
}
