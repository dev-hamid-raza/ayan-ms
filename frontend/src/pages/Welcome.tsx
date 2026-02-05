import { useAuth } from '@/contexts/AuthContext'

function Welcome() {
  const { user } = useAuth()
  const displayName = `${user.firstName} ${user.lastName}`.trim() || user.username

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-background">
      <div className="px-6 py-14">
        <div className="max-w-2xl">
          <p className="text-base md:text-lg uppercase tracking-[0.3em] text-muted-foreground">
            Ayan MS
          </p>
          <h1 className="mt-4 text-4xl md:text-5xl font-semibold text-foreground">
            Welcome, {displayName}.
          </h1>
          <p className="mt-3 text-muted-foreground text-lg">
            We’re glad to have you here.
          </p>

          <div className="mt-8 flex items-center gap-3 text-muted-foreground">
            <span className="inline-flex h-2 w-2 rounded-full bg-primary animate-ping" />
            <span className="text-sm">
              Tip: Use the sidebar to jump between modules quickly.
            </span>
          </div>
          <div className="mt-10 h-0.5 w-full bg-border" />
        </div>
      </div>
    </div>
  )
}

export default Welcome
