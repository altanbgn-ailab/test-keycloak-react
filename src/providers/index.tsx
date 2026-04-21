import { ThemeProvider } from "next-themes"
import { TooltipProvider } from "uilab-core"
import { TanstackProvider } from "./tanstack"
import { ToasterProvider } from "./toaster"
import { I18nProvider } from "./i18n"
import { KeycloakProvider } from "./keycloak"

export default function ProvidersWrapper() {
  return (
    <KeycloakProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <I18nProvider>
          <TooltipProvider delayDuration={0}>
            <ToasterProvider richColors />
            <TanstackProvider />
          </TooltipProvider>
        </I18nProvider>
      </ThemeProvider>
    </KeycloakProvider>
  )
}
