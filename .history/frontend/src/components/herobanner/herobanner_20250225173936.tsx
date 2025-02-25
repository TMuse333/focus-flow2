"use client"

import React, { useState, useEffect } from "react";

const Herobanner = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(1);

    useEffect(() => {
        const handleMouseMove = (event:any) => {
            const x = event.clientX;
            const y = event.clientY;

            // Calculate opacity based on mouse X position (0 to 1 range)
            const newOpacity = Math.max(1 - (y / window.innerHeight), 0);

            setMousePosition({ x, y });
            setOpacity(newOpacity);
        };

        window.addEventListener("mousemove", handleMouseMove);

        // Clean up event listener on component unmount
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <section className="w-screen sticky top-[10%] flex flex-col h-[500vh] items-start justify-center">
            <span className="bg-blue-800 rounded-2xl w-[90vw] text-center mx-auto">
                We are ready to work | Contact us
            </span>

            <section className="flex flex-col md:flex-row-reverse items-center justify-center mb-auto">
                <div
                    className="mx-auto mt-12 text-xl sm:text-2xl md:w-[45vw] text-center md:ml-12 md:text-3xl flex flex-col items-start justify-center"
                    style={{ opacity }} // Apply opacity based on mouse movement
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
                </div>

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
        </section>
    );
};

export default Herobanner;
