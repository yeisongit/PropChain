import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Car,
  Wallet,
  Shield,
  CheckCircle,
  Star,
  Copy,
  Check
} from 'lucide-react';
import { mockProperties } from '@/data/mockData';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AnimateOnView from '@/components/AnimateOnView';

interface PropertyDetailPageProps {
  onToggleFavorite: (id: string) => void;
}

export const PropertyDetailPage: React.FC<PropertyDetailPageProps> = ({ onToggleFavorite }) => {
  const { id } = useParams<{ id: string }>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);
  const [copiedWallet, setCopiedWallet] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);

  const property = mockProperties.find(p => p.id === id);

  // Auto-play carousel
  useEffect(() => {
    if (!property || property.images.length <= 1 || !autoPlay) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % property.images.length
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [property, autoPlay]);

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h2>
          <Link to="/listings" className="text-blue-600 hover:text-blue-700">
            ← Back to Listings
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    if (property.status === 'for-rent' || property.status === 'rented') {
      return `$${price.toLocaleString()}/mo`;
    }
    return `$${price.toLocaleString()}`;
  };

  const copyWalletAddress = async (address: string) => {
    try {
      await navigator.clipboard.writeText(address);
      setCopiedWallet(true);
      setTimeout(() => setCopiedWallet(false), 2000);
    } catch (err) {
      console.error('Failed to copy wallet address:', err);
    }
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
    setAutoPlay(false);
    // Resume autoplay after 5 seconds of user interaction
    setTimeout(() => setAutoPlay(true), 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.04),transparent_60%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.04),transparent_60%)]"></div>
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-white/50 to-transparent"></div>
      
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            to="/listings" 
            className="flex items-center text-gray-600 hover:text-blue-600 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Listings
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 relative z-10">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6 lg:space-y-8">
            {/* Image Gallery */}
            <AnimateOnView className="animate-fade-up" delay={100} threshold={0.15}>
              <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-white/20 overflow-hidden">
                <div className="relative">
                  <img 
                    src={property.images[currentImageIndex]} 
                    alt={property.title}
                    className="w-full h-64 sm:h-80 lg:h-96 object-cover"
                  />
                  <div className="absolute top-2 sm:top-4 left-2 sm:left-4">
                    <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                      property.status === 'for-sale' 
                        ? 'bg-emerald-500 text-white' 
                        : property.status === 'for-rent'
                        ? 'bg-blue-500 text-white'
                        : property.status === 'sold'
                        ? 'bg-gray-500 text-white'
                        : 'bg-orange-500 text-white'
                    }`}>
                      {property.status === 'for-sale' ? 'For Sale' : 
                       property.status === 'for-rent' ? 'For Rent' :
                       property.status === 'sold' ? 'Sold' : 'Rented'}
                    </span>
                  </div>
                  <div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex space-x-1 sm:space-x-2">
                    {property.isNFT && (
                      <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium flex justify-center items-center">
                        NFT Property
                      </span>
                    )}
                    <button
                      onClick={() => onToggleFavorite(property.id)}
                      className={`p-1.5 sm:p-2 rounded-full transition-all duration-200 ${
                        property.favorited 
                          ? 'bg-red-500 text-white hover:bg-red-600' 
                          : 'bg-white/80 text-gray-600 hover:bg-white hover:text-red-500'
                      }`}
                    >
                      <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${property.favorited ? 'fill-current' : ''}`} />
                    </button>
                    <button className="p-1.5 sm:p-2 rounded-full bg-white/80 text-gray-600 hover:bg-white hover:text-blue-500 transition-all duration-200">
                      <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </div>
                
                {/* Image Thumbnails */}
                {property.images.length > 1 && (
                  <div className="p-3 sm:p-4 bg-gray-50 flex space-x-2 overflow-x-auto">
                    {property.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => handleThumbnailClick(index)}
                        className={`flex-shrink-0 w-16 h-12 sm:w-20 sm:h-16 rounded-lg overflow-hidden border-2 transition-all ${
                          currentImageIndex === index 
                            ? 'border-blue-500 shadow-md' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <img src={image} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </AnimateOnView>

            {/* Property Details */}
            <AnimateOnView className="animate-fade-up" delay={200} threshold={0.15}>
              <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-white/20 p-4 sm:p-6 lg:p-8">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 sm:mb-6 space-y-4 sm:space-y-0">
                  <div className="flex-1 sm:pr-4">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
                    <div className="flex items-center text-gray-600 mb-4">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
                      <span className="text-base sm:text-lg">{property.location}</span>
                    </div>
                  </div>
                  <div className="text-left sm:text-right flex-shrink-0">
                    <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">
                      {formatPrice(property.price)}
                    </div>
                    {property.isNFT && (
                      <div className="text-sm text-gray-600">
                        Blockchain Verified
                      </div>
                    )}
                  </div>
                </div>

                {/* Property Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8 p-4 sm:p-6 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Bed className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-gray-900">{property.bedrooms}</div>
                    <div className="text-xs sm:text-sm text-gray-600">Bedrooms</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Bath className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-gray-900">{property.bathrooms}</div>
                    <div className="text-xs sm:text-sm text-gray-600">Bathrooms</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Square className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-gray-900">{property.sqft.toLocaleString()}</div>
                    <div className="text-xs sm:text-sm text-gray-600">Square Feet</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Car className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-gray-900">{property.parking}</div>
                    <div className="text-xs sm:text-sm text-gray-600">Parking</div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6 sm:mb-8">
                  <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Description</h3>
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{property.description}</p>
                </div>

                {/* Features */}
                <div className="mb-6 sm:mb-8">
                  <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Features & Amenities</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                    {property.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2 text-gray-700 text-sm sm:text-base">
                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

              {/* Property Info */}
              <div className="border-t pt-4 sm:pt-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-sm">
                  <div>
                    <span className="font-medium text-gray-600">Type:</span>
                    <div className="capitalize text-gray-900 mt-1">{property.type}</div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Year Built:</span>
                    <div className="text-gray-900 mt-1">{property.yearBuilt}</div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Property ID:</span>
                    <div className="text-gray-900 mt-1">#{property.id}</div>
                  </div>
                </div>
              </div>

              {/* Blockchain Info */}
              {property.isNFT && (
                <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                  <div className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 mt-1 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Blockchain Verified Property</h4>
                      <p className="text-gray-700 mb-4 text-sm sm:text-base">
                        This property is represented as an NFT on the blockchain, ensuring transparent ownership and secure transactions.
                      </p>
                      <div className="bg-white/80 rounded-lg p-3 sm:p-4 border border-purple-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-900 text-sm sm:text-base">Wallet Address:</span>
                          <button
                            onClick={() => property.walletAddress && copyWalletAddress(property.walletAddress)}
                            className="flex items-center space-x-1 text-purple-600 hover:text-purple-700 transition-colors group"
                          >
                            {copiedWallet ? (
                              <>
                                <Check className="w-4 h-4" />
                                <span className="text-xs sm:text-sm">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                <span className="text-xs sm:text-sm">Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                        <div className="text-xs sm:text-sm text-gray-600 font-mono bg-gray-50 p-2 rounded border break-all">
                          {property.walletAddress}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            </AnimateOnView>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <AnimateOnView className="animate-fade-right" delay={300} threshold={0.15}>
              <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-white/20 p-4 sm:p-6 lg:sticky lg:top-8">
                <div className="mb-4 sm:mb-6">
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                    {formatPrice(property.price)}
                  </div>
                  <div className="text-gray-600 text-sm sm:text-base">
                    ${Math.round(property.price / property.sqft).toLocaleString()} per sqft
                  </div>
                </div>

              <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                <button
                  onClick={() => setShowContactForm(true)}
                  className="w-full bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600 text-white py-2.5 sm:py-3 px-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base"
                >
                  Contact Agent
                </button>
                
                <button className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 py-2.5 sm:py-3 px-4 rounded-lg font-semibold transition-colors text-sm sm:text-base">
                  Schedule Tour
                </button>

                {property.isNFT && (
                  <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-2.5 sm:py-3 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 text-sm sm:text-base">
                    <Wallet className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>Purchase NFT</span>
                  </button>
                )}
              </div>

              {/* Agent Info */}
              <div className="border-t pt-4 sm:pt-6">
                <div className="flex items-center space-x-3 mb-3 sm:mb-4">
                  <img 
                    src="https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=100" 
                    alt="Agent"
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="font-semibold text-gray-900 text-base sm:text-lg">Sarah Johnson</div>
                    <div className="text-sm sm:text-base text-gray-600">Licensed Real Estate Agent</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1 mb-3 sm:mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                  ))}
                  <span className="text-sm sm:text-base text-gray-600 ml-2">(4.9/5 · 127 reviews)</span>
                </div>
                
                <div className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-600">
                  <div className="break-words">📧 sarah.johnson@propchain.com</div>
                  <div>📱 +1 (555) 123-4567</div>
                  <div>🏆 Top Agent 2024</div>
                </div>
              </div>
            </div>

            {/* Mortgage Calculator */}
            <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-white/20 p-4 sm:p-6 mt-4 sm:mt-6">
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Mortgage Calculator</h3>
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Down Payment</label>
                  <Select defaultValue="20">
                    <SelectTrigger className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="20">20% ($170,000)</SelectItem>
                      <SelectItem value="15">15% ($127,500)</SelectItem>
                      <SelectItem value="10">10% ($85,000)</SelectItem>
                      <SelectItem value="5">5% ($42,500)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Interest Rate</label>
                  <Input 
                    type="text" 
                    defaultValue="6.5%" 
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Loan Term</label>
                  <Select defaultValue="30">
                    <SelectTrigger className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 years</SelectItem>
                      <SelectItem value="25">25 years</SelectItem>
                      <SelectItem value="20">20 years</SelectItem>
                      <SelectItem value="15">15 years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="border-t pt-3 sm:pt-4">
                  <div className="flex justify-between text-base sm:text-lg font-semibold">
                    <span>Monthly Payment:</span>
                    <span className="text-blue-600">$4,234</span>
                  </div>
                </div>
              </div>
            </div>
            </AnimateOnView>
          </div>
        </div>
      </div>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-semibold mb-4">Contact Agent</h3>
            <form className="space-y-3 sm:space-y-4">
              <Input
                type="text"
                placeholder="Your Name"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              />
              <Input
                type="email"
                placeholder="Your Email"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              />
              <Textarea
                placeholder="Message"
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              />
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                <button
                  type="button"
                  onClick={() => setShowContactForm(false)}
                  className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors text-sm sm:text-base"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};