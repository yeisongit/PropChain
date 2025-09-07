import React from 'react';
import { Heart, MapPin, Bed, Bath, Square, Car } from 'lucide-react';
import { Property } from '@/types';

interface PropertyCardProps {
  property: Property;
  onToggleFavorite: (id: string) => void;
  onClick: (id: string) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ 
  property, 
  onToggleFavorite, 
  onClick 
}) => {
  const formatPrice = (price: number) => {
    if (property.status === 'for-rent' || property.status === 'rented') {
      return `$${price.toLocaleString()}/mo`;
    }
    return `$${price.toLocaleString()}`;
  };

  return (
    <article 
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer transform hover:scale-[1.02] border border-gray-100 hover:border-blue-200 relative focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2"
      onClick={() => onClick(property.id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(property.id);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${property.title} - ${formatPrice(property.price)} ${property.status === 'for-rent' || property.status === 'rented' ? 'per month' : ''}`}
    >
      <div className="relative">
        <img 
          src={property.images[0]} 
          alt={`Main image of ${property.title} located in ${property.location}`}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span 
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              property.status === 'for-sale' 
                ? 'bg-emerald-500 text-white' 
                : property.status === 'for-rent'
                ? 'bg-blue-500 text-white'
                : property.status === 'sold'
                ? 'bg-gray-500 text-white'
                : 'bg-orange-500 text-white'
            }`}
            aria-label={`Property status: ${property.status === 'for-sale' ? 'For Sale' : 
              property.status === 'for-rent' ? 'For Rent' :
              property.status === 'sold' ? 'Sold' : 'Rented'}`}
          >
            {property.status === 'for-sale' ? 'For Sale' : 
             property.status === 'for-rent' ? 'For Rent' :
             property.status === 'sold' ? 'Sold' : 'Rented'}
          </span>
        </div>
        <div className="absolute top-3 right-3 flex space-x-2">
          {property.isNFT && (
            <span 
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-medium flex justify-center items-center"
              aria-label="This is an NFT property"
            >
              NFT
            </span>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(property.id);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                e.stopPropagation();
                onToggleFavorite(property.id);
              }
            }}
            aria-label={property.favorited ? `Remove ${property.title} from favorites` : `Add ${property.title} to favorites`}
            className={`p-2 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              property.favorited 
                ? 'bg-red-500 text-white hover:bg-red-600' 
                : 'bg-white/80 text-gray-600 hover:bg-white hover:text-red-500'
            }`}
          >
            <Heart className={`w-4 h-4 ${property.favorited ? 'fill-current' : ''}`} aria-hidden="true" />
          </button>
        </div>
      </div>
      
      <div className="p-6 relative">
        {/* Price Tag Flotante */}
        <div className={`absolute -top-4 right-4 px-4 py-2 rounded-lg shadow-lg transform rotate-0 group-hover:rotate-2 transition-all duration-300 ${
          property.isNFT 
            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
            : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white'
        }`}>
          <div className="text-xs font-medium opacity-90 t">
            {property.isNFT ? 'NFT Price' : 'Price'}
          </div>
          <div className="text-lg font-bold leading-none">{formatPrice(property.price)}</div>
          {property.isNFT && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
          )}
        </div>

        {/* Título con más espacio */}
        <div className="pr-20 mb-4 mt-3">
          <h3 className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight">
            {property.title}
          </h3>
        </div>
        
        <div className="flex items-center text-gray-500 mb-4">
          <MapPin className="w-4 h-4 mr-2" aria-hidden="true" />
          <span className="text-sm font-medium">{property.location}</span>
        </div>
        
        <div className="flex items-center justify-between text-gray-600 text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-gray-50 px-2 py-1 rounded-md" aria-label={`${property.bedrooms} bedroom${property.bedrooms !== 1 ? 's' : ''}`}>
              <Bed className="w-4 h-4 mr-1 text-blue-500" aria-hidden="true" />
              <span className="font-medium">{property.bedrooms}</span>
            </div>
            <div className="flex items-center bg-gray-50 px-2 py-1 rounded-md" aria-label={`${property.bathrooms} bathroom${property.bathrooms !== 1 ? 's' : ''}`}>
              <Bath className="w-4 h-4 mr-1 text-blue-500" aria-hidden="true" />
              <span className="font-medium">{property.bathrooms}</span>
            </div>
            <div className="flex items-center bg-gray-50 px-2 py-1 rounded-md" aria-label={`${property.sqft.toLocaleString()} square feet`}>
              <Square className="w-4 h-4 mr-1 text-blue-500" aria-hidden="true" />
              <span className="font-medium">{property.sqft.toLocaleString()}</span>
            </div>
            {property.parking > 0 && (
              <div className="flex items-center bg-gray-50 px-2 py-1 rounded-md" aria-label={`${property.parking} parking space${property.parking !== 1 ? 's' : ''}`}>
                <Car className="w-4 h-4 mr-1 text-blue-500" aria-hidden="true" />
                <span className="font-medium">{property.parking}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};