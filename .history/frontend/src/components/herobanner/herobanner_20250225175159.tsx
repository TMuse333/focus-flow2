"use client";

import React, { useState, useEffect, useRef } from "react";

const ScrollTranslateContainer = () => {
    const containerRef = useRef(null);
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY);
        };

        // Listen for the scroll event
        window.addEventListener("scroll", handleScroll);

        return () => {
            // Clean up the event listener when the component is unmounted
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Calculate the translation amount, ensuring it doesn't go beyond 1000px
    const translateY = Math.min(scrollPosition, 1000); 

    return (
        <div
            ref={containerRef}
            className="w-full h-[2000px] bg-black text-white"
            style={{
                transform: `translateY(-${translateY}px)`, // Translate container upwards as you scroll
                transition: "transform 0.1s ease-out", // Smooth transition
            }}
        >
            <div className="p-8 bg-blue-500 text-xl font-bold text-center">
                This is the top of the container (text will stay visible as container moves).
            </div>

            <div className="flex justify-center items-center h-[1500px]">
                <div className="p-8 bg-blue-500 text-white rounded-lg shadow-lg">
                    <h2 className="text-3xl">Scroll me up as you scroll down!</h2>
                </div>
            </div>
        </div>
    );
};

export default ScrollTranslateContainer;
