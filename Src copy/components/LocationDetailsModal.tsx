import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Navigation } from 'lucide-react';

interface Attraction {
  name: string;
  description: string;
  distance: string;
  imageUrl: string;
}

interface LocationDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  destination: {
    name: string;
    description: string;
    imageUrl: string;
    region: string;
    nearbyAttractions: Attraction[];
  };
}

const LocationDetailsModal: React.FC<LocationDetailsModalProps> = ({
  isOpen,
  onClose,
  destination
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-4xl bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-black bg-opacity-20 text-white hover:bg-opacity-30 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="h-64 relative">
              <img
                src={destination.imageUrl}
                alt={destination.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
                <h2 className="text-3xl font-bold text-white mb-2">
                  {destination.name}
                </h2>
                <p className="text-gray-200 flex items-center">
                  <MapPin size={16} className="mr-2" />
                  {destination.region}, India
                </p>
              </div>
            </div>

            <div className="p-6">
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                {destination.description}
              </p>

              <h3 className="text-xl font-semibold mb-4">Nearby Attractions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {destination.nearbyAttractions.map((attraction, index) => (
                  <motion.div
                    key={attraction.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden"
                  >
                    <div className="h-40 relative">
                      <img
                        src={attraction.imageUrl}
                        alt={attraction.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold mb-2">{attraction.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {attraction.description}
                      </p>
                      <div className="flex items-center text-sm text-primary-600 dark:text-primary-400">
                        <Navigation size={14} className="mr-1" />
                        {attraction.distance} from {destination.name}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LocationDetailsModal;