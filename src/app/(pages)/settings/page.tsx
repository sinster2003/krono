import FormSection from "@/components/global/FormSection"

const Settings = async () => {
  return (
    <div className="flex min-h-screen bg-background">
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto my-14">
          {/* Header */}
          <header className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-1">Settings</h1>
            </div>
          </header>
          
          <div className="flex w-full justify-center items-center">
            <FormSection />
          </div>
        </div>
      </main>
    </div>
  )
}

export default Settings