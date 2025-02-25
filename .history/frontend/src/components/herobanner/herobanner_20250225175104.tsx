"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const ScrollTranslateContainer = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const maxTranslate = 1000; // Maximum translation in pixels
            const translateAmount = Math.min(scrollY, maxTranslate); // Ensure we don't exceed maxTranslate

            // Apply translation to the container based on scroll position
            gsap.to(containerRef.current, {
                duration: 0.3,
                y: -translateAmount, // Translate upwards
            });
        };

        // Listen for the scroll event
        window.addEventListener("scroll", handleScroll);

        return () => {
            // Clean up the event listener when the component is unmounted
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div ref={containerRef} className="w-full h-[2000px] bg-gray-200">
            <div className="flex justify-center items-center h-full">
                <div className="p-8 bg-blue-500 text-white rounded-lg shadow-lg">
                    <h2 className="text-3xl mb-auto s">Scroll me up as you scroll down!</h2>
                </div>
            </div>
        </div>
    );
};

export default ScrollTranslateContainer;
