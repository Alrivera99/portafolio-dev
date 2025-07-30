"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { theme } = useTheme()

  const menuItems = [
    { name: "Inicio", href: "#inicio" },
    { name: "Sobre mí", href: "#about" },
    { name: "Proyectos", href: "#projects" },
    { name: "Experiencia", href: "#experience" },
    { name: "Contacto", href: "#contact" },
  ]

  const handleItemClick = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm lg:hidden"
            onClick={onClose}
          />

          {/* Menu Container */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            className={`fixed top-0 right-0 h-full w-80 z-50 lg:hidden ${
              theme === "dark" ? "bg-slate-900/95" : "bg-white/95"
            } backdrop-blur-md border-l ${theme === "dark" ? "border-slate-700" : "border-slate-200"}`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl font-bold text-blue-500"
              >
                AR.DEV
              </motion.div>
              <motion.button
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 0.1 }}
                onClick={onClose}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  theme === "dark" ? "hover:bg-slate-800" : "hover:bg-slate-100"
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </div>

            {/* Menu Items */}
            <div className="py-8">
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  onClick={() => handleItemClick(item.href)}
                  className={`w-full text-left px-6 py-4 text-lg font-medium transition-all duration-200 relative group ${
                    theme === "dark"
                      ? "text-slate-300 hover:text-white hover:bg-slate-800/50"
                      : "text-slate-700 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <span className="relative z-10">{item.name}</span>
                  <motion.div
                    className="absolute left-0 top-0 h-full w-1 bg-blue-500 origin-top"
                    initial={{ scaleY: 0 }}
                    whileHover={{ scaleY: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.button>
              ))}
            </div>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="absolute bottom-0 left-0 right-0 p-6 border-t border-slate-200 dark:border-slate-700"
            >
              <p className={`text-sm text-center ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                © 2024 Alejandro Rivera
              </p>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
