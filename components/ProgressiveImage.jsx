'use client';

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ProgressiveImage = ({ src, alt, className, bgColor = "bg-gray-900", ...props }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [imgSrc, setImgSrc] = useState(null);

    useEffect(() => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
            setImgSrc(src);
            setIsLoaded(true);
        };
    }, [src]);

    return (
        <div className={`relative overflow-hidden ${bgColor} ${className}`}>
            {/* Pulse Skeleton / Low Res Placeholder */}
            <div
                className={`absolute inset-0 bg-gray-800 animate-pulse transition-opacity duration-700 ${isLoaded ? "opacity-0" : "opacity-100"
                    }`}
            />

            {/* Actual Image with Fade-In */}
            {imgSrc && (
                <motion.img
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    src={imgSrc}
                    alt={alt}
                    className={`w-full h-full object-cover ${className}`}
                    {...props}
                    loading="lazy"
                    decoding="async"
                />
            )}
        </div>
    );
};

export default ProgressiveImage;


