import React from "react"

const useDisclousure = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const onToggle = () => {
    setIsOpen((prevState) => !prevState)
  }
  return {
    isOpen,
    onToggle
  }
}

export default useDisclousure
