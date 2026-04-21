import { createContext, useContext, useEffect, useState } from "react"
import Keycloak from "keycloak-js"
import type { KeycloakInitOptions } from "keycloak-js";

const KEYCLOAK_INIT_OPTIONS: KeycloakInitOptions = {
  onLoad: "check-sso",
  checkLoginIframe: false,
}

const keycloak = new Keycloak({
  url: import.meta.env.VITE_KC_URL,
  clientId: import.meta.env.VITE_KC_ID,
  realm: import.meta.env.VITE_KC_REALM,
})

keycloak.onAuthSuccess = () => {
  const { token, tokenParsed } = keycloak

  if (token && tokenParsed) {
    sessionStorage.setItem("accessToken", token)
    sessionStorage.setItem("parsedToken", JSON.stringify(tokenParsed))
    sessionStorage.setItem("name", tokenParsed.name ?? "")
    sessionStorage.setItem("username", tokenParsed.username ?? "")
  }
}

keycloak.onTokenExpired = () => {
  keycloak.updateToken(5)
}

keycloak.onAuthRefreshSuccess = () => {
  if (keycloak.token) {
    sessionStorage.setItem("accessToken", keycloak.token)
  }
}

export const KeycloakContext = createContext<Keycloak>(keycloak)

export function KeycloakProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    if (keycloak.didInitialize) return

    keycloak.init(KEYCLOAK_INIT_OPTIONS)
      .catch((err) => {
        console.error("Failed to initialize Keycloak:", err)
      })
      .finally(() => setIsLoading(false))
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-2xl font-bold">Loading...</p>
      </div>
    )
  }

  return (
    <KeycloakContext.Provider value={keycloak}>
      {children}
    </KeycloakContext.Provider>
  )
}

export const useKeycloak = () => useContext(KeycloakContext)
