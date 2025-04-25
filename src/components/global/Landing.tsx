import React from 'react'
import { Button } from "../ui/button"
import { Settings, ArrowRight, Zap, Shield, BarChart3 } from 'lucide-react'
import FeatureCard from '../ui/FeatureCard'

const Landing = () => {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-[90vh] flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
        <div className="max-w-4xl mx-auto z-10">
          <div className="flex gap-4 justify-center">
            <Button variant="default" size="lg" className="text-sm px-6 hover:opacity-90 cursor-pointer text-white">
              Get Started <ArrowRight className="ml-2 size-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Why Choose <span className="text-primary">Krono</span></h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard icon={<Zap className="text-primary" />} title="Lightning Fast" desc="Experience unparalleled speed and efficiency in your workflow automation."/>
            <FeatureCard icon={<Shield className="text-primary" />} title="Secure by Design" desc="Enterprise-grade security ensuring your data is protected at all times."/>
            <FeatureCard icon={<BarChart3 className="text-primary" />} title="Advanced Analytics" desc="Gain valuable insights with our comprehensive analytics dashboard."/>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Landing