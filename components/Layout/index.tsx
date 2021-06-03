import React from "react"
import Navbar from "@components/Navbar"
import Container from "@components/Container"

interface LayoutProps {
  children: React.ReactNode
  pageProps: any
}

const Layout: React.FC<LayoutProps> = ({ children, pageProps }) => {
  return (
    <Container>
      <Navbar />
      <main style={{ marginBottom: "4rem" }}>{children}</main>
    </Container>
  )
}

export default Layout
