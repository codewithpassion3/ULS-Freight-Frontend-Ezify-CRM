import Footer from "@/components/common/Footer"
import Header from "@/components/common/Header"

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:px-8 pt-16 flex flex-col min-h-screen">
        {children}
      </main>
      <Footer />
    </div>
  )
}