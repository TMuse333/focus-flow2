"use client"

import React, { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";

const Herobanner: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    // First useScroll for opacity (20vh range)
    const { scrollYProgress: opacityProgress } = useScroll({
        target: containerRef,
        offset: ["0vh", "20vh"],
    });

    // Second useScroll for translateY (full container height)
    const { scrollYProgress: translateProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"], // From top entering to top leaving viewport
    });

    const textOpacity = useTransform(opacityProgress, [0, 1], [1, 0]);
    const translateY = useTransform(translateProgress, [0, 1], [0, window.innerHeight]); // Move up by viewport height

    const [opacity0, setOpacity0] = useState<boolean>(false);

    // Log translateY value
    useMotionValueEvent(translateY, "change", (value: number) => {
        console.log("translateY:", value);
    });

    useMotionValueEvent(textOpacity, "change", (value: number) => {
        if (value <= 0) {
            setOpacity0(true);
        }
    });

    return (
        <div className="h-[200vh]">
            <motion.section
                ref={containerRef}
                className="w-screen flex flex-col h-screen items-start justify-center"
                style={{
                    translateY, // Should move up as you scroll down
                }}
            >
                <span className="bg-blue-800 rounded-2xl w-[90vw] text-center mx-auto">
                    We are ready to work | Contact us
                </span>

                <section className="flex flex-col md:flex-row-reverse items-center justify-center mb-auto">
                    <motion.div
                        className="mx-auto mt-12 text-xl sm:text-2xl md:w-[45vw] text-center md:ml-12 md:text-3xl flex flex-col items-start justify-center"
                        style={{
                            opacity: textOpacity,
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
                            style={{ transform: "translateX(-50%) rotateZ(-5deg)" }}
                        />
                        <div 
                            className="w-[40vw] absolute left-[30%] z-[1] top-[15%] -translate-x-[50%] bg-red-600 h-[500px] mx-auto max-w-[250px] object-contain max-h-[200px]"
                            style={{ transform: "translateX(-50%) rotateZ(-25deg)" }}
                        />
                    </section>
                </section>
            </motion.section>
        </div>
    );
}

export default Herobanner;