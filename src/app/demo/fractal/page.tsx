import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Fractal Voyager - MindLang GPU Demo',
  description: 'Interactive WebGPU fractal explorer showcasing MindLang GPU compute capabilities',
}

export default function FractalDemo() {
  return (
    <iframe
      src="/demo/fractal/app.html"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        border: 'none',
      }}
      allow="autoplay; microphone"
    />
  )
}
