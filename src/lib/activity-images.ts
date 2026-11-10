import avCompraventa from '@/assets/images/av-compraventa-inmuebles.jpg'
import avVehiculos from '@/assets/images/av-comercializacion-vehiculos.jpg'
import avJoyeria from '@/assets/images/av-joyeria-metales.jpg'
import avActivos from '@/assets/images/av-activos-virtuales.jpg'
import avJuegos from '@/assets/images/av-juegos-apuestas.jpg'

// DECISIÓN: el mock guarda nombres de archivo; aquí se resuelven a imports de Vite (mismo patrón que el blog con assets locales).
const MAP: Record<string, string> = {
  'av-compraventa-inmuebles.jpg': avCompraventa,
  'av-comercializacion-vehiculos.jpg': avVehiculos,
  'av-joyeria-metales.jpg': avJoyeria,
  'av-activos-virtuales.jpg': avActivos,
  'av-juegos-apuestas.jpg': avJuegos,
}

export function resolveActivityImage(
  keyOrUrl: string | null | undefined,
): string | undefined {
  if (!keyOrUrl) return undefined
  return MAP[keyOrUrl] ?? keyOrUrl
}
