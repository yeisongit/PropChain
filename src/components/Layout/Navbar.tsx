"use client"

import type React from "react"
import { Link, useLocation } from "react-router-dom"
import { Home, Wallet, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

interface NavbarProps {
  onConnectWallet: () => void
  walletConnected: boolean
}

export const Navbar: React.FC<NavbarProps> = ({ onConnectWallet, walletConnected }) => {
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  const navigationLinks = [
    { path: "/", label: "Home" },
    { path: "/listings", label: "Listings" },
    { path: "/favorites", label: "Favorites" },
    { path: "/dashboard", label: "Dashboard" },
  ]

  return (
    <nav 
      className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 transition-all duration-300"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex items-center space-x-2 group"
              aria-label="PropChain - Go to homepage"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-emerald-500 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                <Home className="w-5 h-5 text-white" aria-hidden="true" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
                PropChain
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8" role="menubar">
            {navigationLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                role="menuitem"
                aria-current={isActive(link.path) ? "page" : undefined}
                className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  isActive(link.path) ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-blue-600"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            {/* Connect Wallet Button */}
            <button
              onClick={onConnectWallet}
              aria-label={walletConnected ? "Wallet connected - manage wallet" : "Connect your wallet"}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                walletConnected
                  ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                  : "bg-gradient-to-r from-blue-600 to-emerald-500 text-white hover:from-blue-700 hover:to-emerald-600 shadow-lg hover:shadow-xl transform hover:scale-105"
              }`}
            >
              <Wallet className="w-4 h-4" aria-hidden="true" />
              <span className="hidden sm:block">{walletConnected ? "Wallet Connected" : "Connect Wallet"}</span>
            </button>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <button 
                  className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  aria-label="Open navigation menu"
                >
                  <Menu className="w-5 h-5 text-gray-600" aria-hidden="true" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle className="text-left">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-emerald-500 rounded-lg flex items-center justify-center">
                        <Home className="w-5 h-5 text-white" aria-hidden="true" />
                      </div>
                      <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
                        PropChain
                      </span>
                    </div>
                  </SheetTitle>
                </SheetHeader>

                <nav className="flex flex-col space-y-4 mt-8" role="navigation" aria-label="Mobile navigation">
                  {navigationLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      aria-current={isActive(link.path) ? "page" : undefined}
                      className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                        isActive(link.path)
                          ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600"
                          : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}

                  <div className="pt-4 border-t border-gray-200">
                    <button
                      onClick={onConnectWallet}
                      aria-label={walletConnected ? "Wallet connected - manage wallet" : "Connect your wallet"}
                      className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                        walletConnected
                          ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                          : "bg-gradient-to-r from-blue-600 to-emerald-500 text-white hover:from-blue-700 hover:to-emerald-600 shadow-lg hover:shadow-xl"
                      }`}
                    >
                      <Wallet className="w-4 h-4" aria-hidden="true" />
                      <span>{walletConnected ? "Wallet Connected" : "Connect Wallet"}</span>
                    </button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
