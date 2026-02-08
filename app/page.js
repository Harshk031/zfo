'use client';

import Hero from '@/components/Hero';
import PromoSection from '@/components/PromoSection';
import LaunchTeaser from '@/components/LaunchTeaser';
import HeroScene from '@/components/HeroScene';
import ProductDetails from '@/components/ProductDetails';
import FizzroomTeaser from '@/components/FizzroomTeaser';
import SEOFeatures from '@/components/SEOFeatures';

export default function Home() {
    return (
        <>
            <Hero />
            <PromoSection />
            <ProductDetails />
            <SEOFeatures />
            <FizzroomTeaser />
            <HeroScene />
            <LaunchTeaser />
        </>
    );
}
