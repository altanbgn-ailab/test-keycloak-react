import { createFileRoute } from "@tanstack/react-router"
import { useTranslation } from "react-i18next"
import { Button } from "uilab-core"
import { useKeycloak } from "@/providers/keycloak"

export const Route = createFileRoute("/")({
  component: App,
})

function App() {
  const { t } = useTranslation()
  const { authenticated, login, logout } = useKeycloak()

  return (
    <div className="flex flex-col justify-center items-center h-[80vh] gap-6">
      <p className="text-3xl font-black">
        {t("homePage.title")}
      </p>
      <p className="text-3xl">{authenticated ? "Logged In" : "Not Logged In"}</p>
      <p>
        Edit <code className="rounded py-1 px-2 bg-muted text-muted-foreground">src/routes/index.tsx</code> and save to reload.
      </p>
      <div className="space-x-4">
        <Button asChild>
          <a
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </Button>
        <Button asChild>
          <a
            href="https://tanstack.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn TanStack
          </a>
        </Button>
        <Button asChild>
          <a
            href="https://uilab-c35bb7.gitlab.io/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn UILab
          </a>
        </Button>
        {authenticated ? (
          <Button onClick={() => logout()}>
            Logout
          </Button>
        ) : (
          <Button onClick={() => login()}>
            Login
          </Button>
        )}
      </div>
    </div>
  )
}
