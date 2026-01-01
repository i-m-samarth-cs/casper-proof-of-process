import { LayoutShell } from "@/components/layout-shell"
import { Testimonial } from "@/components/ui/design-testimonial"
import { LinkPreview } from "@/components/ui/link-preview"

export default function AboutPage() {
  return (
    <LayoutShell>
      <div className="space-y-16">
        {/* Hero Section */}
        <section className="text-center space-y-6 py-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            About Casper Proof-of-Process
          </h1>
          <div className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
            The next-generation blockchain-powered workflow management system built on the{" "}
            <LinkPreview
              url="https://casper.network"
              className="font-semibold text-foreground underline decoration-orange-500"
            >
              Casper Network
            </LinkPreview>
            . Design, deploy, and verify enterprise workflows with immutable on-chain proof.
          </div>
        </section>

        {/* Features Grid with Link Previews */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-center">Powered by Industry Leaders</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4 p-6 rounded-xl border bg-card">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold text-xl">
                C
              </div>
              <h3 className="text-xl font-semibold">Casper Network</h3>
              <div className="text-muted-foreground">
                Built on{" "}
                <LinkPreview
                  url="https://casper.network"
                  className="font-medium text-foreground underline decoration-orange-500"
                >
                  Casper's enterprise-grade blockchain
                </LinkPreview>{" "}
                for maximum security and scalability.
              </div>
            </div>

            <div className="space-y-4 p-6 rounded-xl border bg-card">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl">
                R
              </div>
              <h3 className="text-xl font-semibold">React Flow</h3>
              <div className="text-muted-foreground">
                Intuitive workflow design powered by{" "}
                <LinkPreview
                  url="https://reactflow.dev"
                  className="font-medium text-foreground underline decoration-blue-500"
                >
                  React Flow
                </LinkPreview>
                's powerful node-based editor.
              </div>
            </div>

            <div className="space-y-4 p-6 rounded-xl border bg-card">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center text-white font-bold text-xl">
                N
              </div>
              <h3 className="text-xl font-semibold">Next.js</h3>
              <div className="text-muted-foreground">
                Built with{" "}
                <LinkPreview
                  url="https://nextjs.org"
                  className="font-medium text-foreground underline decoration-green-500"
                >
                  Next.js 16
                </LinkPreview>{" "}
                for optimal performance and developer experience.
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
          <Testimonial />
        </section>

        {/* CTA Section */}
        <section className="text-center space-y-6 py-12 rounded-2xl bg-gradient-to-br from-orange-500/10 via-red-500/10 to-orange-500/10 border-2 border-orange-500/20">
          <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transform your business processes with blockchain-verified workflows today.
          </p>
        </section>
      </div>
    </LayoutShell>
  )
}
