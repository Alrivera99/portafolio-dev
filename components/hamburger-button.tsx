"use client"

import { motion } from "framer-motion"
import { useTheme } from "next-themes"

interface HamburgerButtonProps {
  isOpen: boolean
  onClick: () => void
}

export function HamburgerButton({ isOpen, onClick }: HamburgerButtonProps) {
  const { theme } = useTheme()

  return (
    <button
      onClick={onClick}
      className="relative w-8 h-8 flex flex-col justify-center items-center focus:outline-none"
      aria-label="Toggle menu"
    >
      <motion.span
        animate={{
          rotate: isOpen ? 45 : 0,
          y: isOpen ? 0 : -6,
        }}
        transition={{ duration: 0.3 }}
        className={`block w-6 h-0.5 rounded-full transform origin-center ${
          theme === "dark" ? "bg-white" : "bg-slate-900"
        }`}
      />
      <motion.span
        animate={{
          opacity: isOpen ? 0 : 1,
        }}
        transition={{ duration: 0.3 }}
        className={`block w-6 h-0.5 rounded-full mt-1 ${theme === "dark" ? "bg-white" : "bg-slate-900"}`}
      />
      <motion.span
        animate={{
          rotate: isOpen ? -45 : 0,
          y: isOpen ? 0 : 6,
        }}
        transition={{ duration: 0.3 }}
        className={`block w-6 h-0.5 rounded-full mt-1 transform origin-center ${
          theme === "dark" ? "bg-white" : "bg-slate-900"
        }`}
      />
    </button>
  )
}
