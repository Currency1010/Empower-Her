import { Button } from './ui/button'
import AnimatedSection from './AnimatedSection'
import Link from 'next/link'

export default function Cta() {
  return (
    <AnimatedSection delay={0.4} className="mt-16 text-center">
<p className="text-white/90 text-base md:text-lg mb-5">
  Ready to make a direct impact?
</p>
    <Link href="/donate">
    <Button className="bg-white text-primary border-2 border-secondary hover:bg-secondary hover:text-primary rounded-none px-10 py-6 font-bold tracking-wide uppercase text-sm">
        Donate Now
    </Button>
</Link>
</AnimatedSection>
  )
}
