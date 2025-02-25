"use client"

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const StickyIllusionContainer = () => {
    const containerRef = useRef(null);

    const { scrollY } = useScroll({
        container: null, // Tracks global scroll (viewport)
    });

    // Translate upward by the exact scroll distance
    const translateY = useTransform(scrollY, (value) => -value);

    return (
        <div className="h-[200vh] bg-gray-100"> {/* Parent taller than viewport for scrolling */}
            <motion.div
                ref={containerRef}
                className="w-screen h-screen bg-blue-200 flex flex-col items-center justify-center"
                style={{
                    translateY, // Moves up as you scroll down
                }}
            >
                <h1 className="text-4xl font-bold text-white">I Stay in Place!</h1>
                <p className="text-lg text-white mt-4">Scroll down to see the effect.</p>
            </motion.div>
        </div>
    );
}

export default StickyIllusionContainer;