"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";

const Herobanner = () => {
    const containerRef = useRef(null);

    const [opacity, setOpacity] = useState(1);

    // Track the scroll position manually to calculate opacity
    const [scrolling, setScrolling] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const maxScroll = 200; // Adjust how fast opacity fades
            const newOpacity = Math.max(1 - scrollY / maxScroll, 0);
            setOpacity(newOpacity);
            
            if (newOpacity <= 0) {
                // Enable scrolling after opacity reaches 0
                gsap.to("body", {
                    duration: 0.3,
                    overflow: "auto", // Enable scrolling
                    position: "static", // Restore default position
                });
            } else {
                // Prevent scroll when opacity is not zero
                gsap.to("body", {
                    duration: 0.3,
                    overflow: "hidden", // Prevent scroll
                    position: "fixed", // Fix page in place
                    top: `-${window.scrollY}px`, // Keep the page in the current scroll position
                });
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [opacity]);

    // First useScroll for opacity (20vh range)
    const { scrollYProgress: opacityProgress } = useScroll({
        target: containerRef,
        offset: ["0vh", "20vh"], // Fade over 20vh
    });

    const textOpacity = useTransform(opacityProgress, [0, 1], [1, 0]); // Fade from 1 to 0 over 20vh

    const [opacity0, setOpacity0] = useState(false);

    useMotionValueEvent(textOpacity, "change", (value) => {
        if (value <= 0) { // Account for floating-point precision
            setOpacity0(true);
        }
    });

    return (
        <motion.section
            ref={containerRef}
            className="w-screen sticky top-[10%] flex flex-col h-[500vh] items-start justify-center"
        >
            <span className="bg-blue-800 rounded-2xl w-[90vw] text-center mx-auto">
                We are ready to work | Contact us
            </span>

            <section className="flex flex-col md:flex-row-reverse items-center justify-center mb-auto">
                <motion.div
                    className="mx-auto mt-12 text-xl sm:text-2xl md:w-[45vw] text-center md:ml-12 md:text-3xl flex flex-col items-start justify-center"
                    style={{
                        opacity: opacity,
                    }}
                >
                    <p>Built by Focus Flow Software</p>
                    <p className="items-center">
                        <span className="text-transparent text-2xl bg-clip-text bg-gradient-to-br from-[#00bfff] to-green-300 font-semibold">
                            Focus Flow
                        </span>
                        <br />Makes fantastic websites
                        <br />
                        <span className="text-xl text-left mt-3">You are about to see greatness</span>
                    </p>
                </motion.div>

                <section className="relative bg-blue-800 w-screen h-[30vh] mt-[8rem] max-w-[1200px] mx-auto md:w-[50vw]">
                    <div className="w-[40vw] absolute left-[50%] -translate-x-[50%] bg-green-300 h-[500px] z-[3] max-w-[250px] top-0 mx-auto object-contain max-h-[200px]" />
                    <div 
                        className="w-[40vw] absolute left-[40%] z-[2] max-w-[300px] top-[5%] -translate-x-[50%] bg-[#00bfff] h-[500px] mx-auto max-w-[250px] object-contain max-h-[200px]" 
                        style={{
                            transform: "translateX(-50%) rotateZ(-5deg)",
                        }}
                    />
                    <div 
                        className="w-[40vw] absolute left-[30%] z-[1] top-[15%] -translate-x-[50%] bg-red-600 h-[500px] mx-auto max-w-[250px] object-contain max-h-[200px]"
                        style={{
                            transform: "translateX(-50%) rotateZ(-25deg)",
                        }}
                    />
                </section>
            </section>
        </motion.section>
    );
}

export default Herobanner;
