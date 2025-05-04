import React from 'react'
import { Button } from "../ui/button"
import { ArrowRight, Zap, Shield, BarChart3, Sparkles, Rocket, Users } from 'lucide-react'
import FeatureCard from '../ui/FeatureCard'
import Link from 'next/link'

const Landing = () => {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-[90vh] flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
        <div className="max-w-4xl mx-auto z-10">
          <div className="flex items-center justify-center mb-4">
            <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
              <Sparkles className="size-4" />
              New: Event-Driven Workflow Automation
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Automate Your Workflows with <span className="text-primary">Krono</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Streamline your business processes with our powerful automation platform. Save time, reduce errors, and boost productivity.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/sign-in">
              <Button variant="default" size="lg" className="text-sm px-6 hover:opacity-90 cursor-pointer text-white">
                Get Started <ArrowRight className="ml-2 size-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Rocket className="text-primary size-6" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold">10x</h3>
                  <p className="text-muted-foreground">Faster Workflows</p>
                </div>
              </div>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Users className="text-primary size-6" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold">500+</h3>
                  <p className="text-muted-foreground">Happy Customers</p>
                </div>
              </div>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Zap className="text-primary size-6" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold">99.9%</h3>
                  <p className="text-muted-foreground">Uptime</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 my-40">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Why Choose <span className="text-primary">Krono</span></h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Zap className="text-primary" />} 
              title="Lightning Fast" 
              desc="Experience unparalleled speed and efficiency in your workflow automation."
            />
            <FeatureCard 
              icon={<Shield className="text-primary" />} 
              title="Secure by Design" 
              desc="Enterprise-grade security ensuring your data is protected at all times."
            />
            <FeatureCard 
              icon={<BarChart3 className="text-primary" />} 
              title="Advanced Analytics" 
              desc="Gain valuable insights with our comprehensive analytics dashboard."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Transform Your Workflows?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of businesses already using Krono to automate their processes.
          </p>
          <Link href="/sign-in">
            <Button variant="default" size="lg" className="text-sm px-8 hover:opacity-90 cursor-pointer text-white">
              Get Started <ArrowRight className="ml-2 size-4" />
            </Button>
          </Link>
        </div>
      </section>
    </main>
  )
}

export default Landing