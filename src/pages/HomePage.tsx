import React from "react";
import { Link } from "react-router-dom";
import { TrendingUp, Shield, Zap, ArrowRight } from "lucide-react";
import { PropertyCard } from "@/components/PropertyCard/PropertyCard";
import NumberCounter from "@/components/NumberCounter/NumberCounter";
import AnimateOnView from "@/components/AnimateOnView";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { mockProperties, mockMarketData } from "@/data/mockData";
import { Globe } from "@/components/magicui/globe";

interface HomePageProps {
  onToggleFavorite: (id: string) => void;
  onPropertyClick: (id: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onToggleFavorite,
  onPropertyClick,
}) => {
  const featuredProperties = mockProperties.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
        <AnimateOnView
          className="animate-fade-up"
          threshold={0.1}
          once={false}
          startVisible={true}
        >
          {/* Animated background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.3),transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.3),transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_10%,rgba(139,92,246,0.2),transparent_50%)]"></div>
          </div>

          {/* Animated background elements */}
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 no-select h-dvh">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="text-center lg:text-left">
                  <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
                    Find Your Dream Property
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">
                    On The Blockchain
                    </span>
                  </h1>
                  <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto lg:mx-0 animate-fade-in delay-300">
                    Discover luxury real estate with blockchain technology.
                    Secure, transparent, and revolutionary property investments.
                  </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in delay-500">
                  <Link
                    to="/listings"
                    className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
                  >
                    Explore Properties
                  </Link>
                  <button className="border-2 border-white/30 hover:border-white text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:bg-white/10 backdrop-blur-sm">
                    Learn More
                  </button>
                </div>
              </div>

              <div className="hidden md:block w-full  overflow-hidden">
                <Globe />
              </div>
            </div>
          </div>
        </AnimateOnView>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 relative overflow-hidden py-40">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(59,130,246,0.02)_50%,transparent_75%)]"></div>
        <AnimateOnView className="animate-fade-up" delay={200} threshold={0.15}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Market Overview
              </h2>
              <p className="text-lg text-gray-600">
                Real-time insights from our blockchain-powered marketplace
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  <NumberCounter
                    value={mockMarketData.totalProperties}
                    duration={1400}
                  />
                  +
                </div>
                <div className="text-gray-600">Properties Listed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600 mb-2">
                  <NumberCounter
                    value={mockMarketData.totalValueNumber}
                    duration={1400}
                    formatter={(n) => {
                      // Format large numbers into short form similar to '$8.2B'
                      if (n >= 1_000_000_000)
                        return `$${(n / 1_000_000_000).toFixed(1)}B`;
                      if (n >= 1_000_000)
                        return `$${(n / 1_000_000).toFixed(1)}M`;
                      return `$${n.toLocaleString()}`;
                    }}
                  />
                </div>
                <div className="text-gray-600">Total Value</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  <NumberCounter
                    value={mockMarketData.nftProperties}
                    duration={1200}
                  />
                </div>
                <div className="text-gray-600">NFT Properties</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  <NumberCounter
                    value={mockMarketData.monthlyGrowthNumber}
                    duration={1200}
                    formatter={(n) => `${n.toFixed(1)}%`}
                    decimals={1}
                  />
                </div>
                <div className="text-gray-600">Monthly Growth</div>
              </div>
            </div>
          </div>
        </AnimateOnView>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-emerald-50/30 relative overflow-hidden min-h-screen flex justify-center items-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(59,130,246,0.05),transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(16,185,129,0.05),transparent_70%)]"></div>
        <AnimateOnView className="animate-scale" delay={400} threshold={0.2}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose PropChain?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Experience the future of real estate with blockchain-powered
                transparency and security.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900 h-full">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">
                  Blockchain Security
                </h3>
                <p className="text-gray-600">
                  Every transaction is secured by blockchain technology,
                  ensuring transparency and immutable records.
                </p>
              </BackgroundGradient>

              <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900 h-full">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">
                  Instant Verification
                </h3>
                <p className="text-gray-600">
                  Smart contracts enable instant property verification and
                  seamless ownership transfers.
                </p>
              </BackgroundGradient>

              <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900 h-full">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">NFT Properties</h3>
                <p className="text-gray-600">
                  Own unique digital property tokens that represent real estate
                  assets on the blockchain.
                </p>
              </BackgroundGradient>
            </div>
          </div>
        </AnimateOnView>
      </section>

      {/* Featured Properties */}

      <section className="py-20 bg-gradient-to-b from-white to-gray-50/50 relative min-h-screen flex justify-center items-center">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_0%,rgba(59,130,246,0.02)_50%,transparent_100%)]"></div>
        <AnimateOnView
          className="animate-fade-left"
          delay={600}
          threshold={0.15}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-12">
              <div className="mb-6 lg:mb-0">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Featured Properties
                </h2>
                <p className="text-xl text-gray-600">
                  Discover our handpicked selection of premium properties.
                </p>
              </div>
              <Link
                to="/listings"
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors group self-start lg:self-auto"
              >
                <span>View All</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onToggleFavorite={onToggleFavorite}
                  onClick={onPropertyClick}
                />
              ))}
            </div>
          </div>
        </AnimateOnView>
      </section>

      {/* CTA Section */}
      <section className="py-40 bg-gradient-to-br from-blue-600 via-indigo-700 to-emerald-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1),transparent_60%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(255,255,255,0.05),transparent_60%)]"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-y-1"></div>
        <AnimateOnView
          className="animate-fade-right"
          delay={200}
          threshold={0.15}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Property Journey?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of investors who trust PropChain for their real
              estate needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/listings"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Browse Properties
              </Link>

              <Link to="/contact-us" className="border-2 border-white/30 hover:border-white text-white hover:bg-white/10 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300">
                Contact Sales
              </Link>
            </div>
          </div>
        </AnimateOnView>
      </section>
    </div>
  );
};
