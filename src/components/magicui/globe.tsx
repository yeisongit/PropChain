"use client";

import createGlobe, { COBEOptions } from "cobe";
import { useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [5 / 255, 150 / 255, 105 / 255],
  glowColor: [1, 1, 1],
  markers: [
    // Asia
    { location: [14.5995, 120.9842], size: 0.03 }, // Manila, Philippines
    { location: [19.076, 72.8777], size: 0.1 },    // Mumbai, India
    { location: [23.8103, 90.4125], size: 0.05 },  // Dhaka, Bangladesh
    { location: [39.9042, 116.4074], size: 0.08 }, // Beijing, China
    { location: [34.6937, 135.5022], size: 0.05 }, // Osaka, Japan
    { location: [35.6762, 139.6503], size: 0.09 }, // Tokyo, Japan
    { location: [31.2304, 121.4737], size: 0.07 }, // Shanghai, China
    { location: [22.3193, 114.1694], size: 0.06 }, // Hong Kong
    { location: [1.3521, 103.8198], size: 0.06 },  // Singapore
    { location: [13.7563, 100.5018], size: 0.05 }, // Bangkok, Thailand
    { location: [28.7041, 77.1025], size: 0.08 },  // New Delhi, India
    { location: [37.5665, 126.9780], size: 0.07 }, // Seoul, South Korea
    { location: [25.2048, 55.2708], size: 0.06 },  // Dubai, UAE
    { location: [41.0082, 28.9784], size: 0.06 },  // Istanbul, Turkey
    { location: [33.6844, 73.0479], size: 0.05 },  // Islamabad, Pakistan
    
    // Europe
    { location: [51.5074, -0.1278], size: 0.08 },  // London, UK
    { location: [48.8566, 2.3522], size: 0.07 },   // Paris, France
    { location: [52.5200, 13.4050], size: 0.06 },  // Berlin, Germany
    { location: [41.9028, 12.4964], size: 0.06 },  // Rome, Italy
    { location: [40.4168, -3.7038], size: 0.06 },  // Madrid, Spain
    { location: [55.7558, 37.6173], size: 0.07 },  // Moscow, Russia
    { location: [59.9311, 30.3609], size: 0.05 },  // St. Petersburg, Russia
    { location: [50.0755, 14.4378], size: 0.04 },  // Prague, Czech Republic
    { location: [47.4979, 19.0402], size: 0.04 },  // Budapest, Hungary
    { location: [52.3676, 4.9041], size: 0.05 },   // Amsterdam, Netherlands
    { location: [60.1699, 24.9384], size: 0.04 },  // Helsinki, Finland
    { location: [59.3293, 18.0686], size: 0.04 },  // Stockholm, Sweden
    
    // North America
    { location: [40.7128, -74.0060], size: 0.1 },  // New York, USA
    { location: [34.0522, -118.2437], size: 0.08 }, // Los Angeles, USA
    { location: [41.8781, -87.6298], size: 0.06 }, // Chicago, USA
    { location: [29.7604, -95.3698], size: 0.05 }, // Houston, USA
    { location: [33.4484, -112.0740], size: 0.04 }, // Phoenix, USA
    { location: [39.7392, -104.9903], size: 0.04 }, // Denver, USA
    { location: [47.6062, -122.3321], size: 0.05 }, // Seattle, USA
    { location: [37.7749, -122.4194], size: 0.06 }, // San Francisco, USA
    { location: [25.7617, -80.1918], size: 0.05 },  // Miami, USA
    { location: [43.6532, -79.3832], size: 0.06 },  // Toronto, Canada
    { location: [45.5017, -73.5673], size: 0.05 },  // Montreal, Canada
    { location: [49.2827, -123.1207], size: 0.05 }, // Vancouver, Canada
    { location: [19.4326, -99.1332], size: 0.1 },   // Mexico City, Mexico
    
    // South America
    { location: [-23.5505, -46.6333], size: 0.1 }, // São Paulo, Brazil
    { location: [-22.9068, -43.1729], size: 0.08 }, // Rio de Janeiro, Brazil
    { location: [-34.6037, -58.3816], size: 0.08 }, // Buenos Aires, Argentina
    { location: [-33.4489, -70.6693], size: 0.06 }, // Santiago, Chile
    { location: [4.7110, -74.0721], size: 0.06 },   // Bogotá, Colombia
    { location: [-12.0464, -77.0428], size: 0.06 }, // Lima, Peru
    { location: [10.4806, -66.9036], size: 0.05 },  // Caracas, Venezuela
    { location: [-15.7942, -47.8822], size: 0.05 }, // Brasília, Brazil
    
    // Africa
    { location: [30.0444, 31.2357], size: 0.07 },   // Cairo, Egypt
    { location: [-26.2041, 28.0473], size: 0.06 },  // Johannesburg, South Africa
    { location: [-33.9249, 18.4241], size: 0.05 },  // Cape Town, South Africa
    { location: [6.5244, 3.3792], size: 0.06 },     // Lagos, Nigeria
    { location: [-1.2921, 36.8219], size: 0.05 },   // Nairobi, Kenya
    { location: [33.5731, -7.5898], size: 0.05 },   // Casablanca, Morocco
    { location: [9.0579, 7.4951], size: 0.05 },     // Abuja, Nigeria
    { location: [15.5007, 32.5599], size: 0.04 },   // Khartoum, Sudan
    
    // Oceania
    { location: [-33.8688, 151.2093], size: 0.07 }, // Sydney, Australia
    { location: [-37.8136, 144.9631], size: 0.06 }, // Melbourne, Australia
    { location: [-27.4698, 153.0251], size: 0.05 }, // Brisbane, Australia
    { location: [-31.9505, 115.8605], size: 0.04 }, // Perth, Australia
    { location: [-36.8485, 174.7633], size: 0.05 }, // Auckland, New Zealand
    { location: [-41.2865, 174.7762], size: 0.04 }, // Wellington, New Zealand
    
    // Additional Major Cities
    { location: [55.6761, 12.5683], size: 0.04 },   // Copenhagen, Denmark
    { location: [60.1699, 24.9384], size: 0.04 },   // Helsinki, Finland
    { location: [64.1466, -21.9426], size: 0.03 },  // Reykjavik, Iceland
    { location: [35.6762, 51.4241], size: 0.06 },   // Tehran, Iran
    { location: [24.7136, 46.6753], size: 0.05 },   // Riyadh, Saudi Arabia
    { location: [31.7683, 35.2137], size: 0.04 },   // Jerusalem, Israel
    { location: [36.2048, 138.2529], size: 0.04 },  // Central Japan
    { location: [17.3850, 78.4867], size: 0.05 },   // Hyderabad, India
    { location: [12.9716, 77.5946], size: 0.06 },   // Bangalore, India
  ],
};

export function Globe({
  className,
  config = GLOBE_CONFIG,
}: {
  className?: string;
  config?: COBEOptions;
}) {
  let phi = 0;
  let width = 0;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);

  const r = useMotionValue(0);
  const rs = useSpring(r, {
    mass: 1,
    damping: 30,
    stiffness: 100,
  });

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab";
    }
  };

  useEffect(() => {
    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
      }
    };

    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvasRef.current!, {
      ...config,
      width: width * 2,
      height: width * 2,
      onRender: (state) => {
        if (!pointerInteracting.current) phi += 0.005;
        state.phi = phi + rs.get();
        state.width = width * 2;
        state.height = width * 2;
      },
    });

    setTimeout(() => (canvasRef.current!.style.opacity = "1"), 0);
    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [rs, config]);

  return (
    <div
      className={cn(
        "relative inset-0 mx-auto aspect-[1/1] w-full max-w-[600px]",
        className,
      )}
    >
      <canvas
        className={cn(
          "size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]",
        )}
        ref={canvasRef}
        onPointerDown={() => {
          updatePointerInteraction(null);
        }}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={() => {}}
        onTouchMove={() => {}}
      />
    </div>
  );
}
