"use client";

import React, { useState } from "react";
import { gsap } from "gsap";

const ScrollControl = () => {
    const [isScrollingEnabled, setIsScrollingEnabled] = useState(true);

    const toggleScroll = () => {
        setIsScrollingEnabled(!isScrollingEnabled);

        // Disable or enable scroll
        if (isScrollingEnabled) {
            // Disable scrolling using GSAP
            gsap.to("body", {
                duration: 0,
                overflow: "hidden",
            });
        } else {
            // Enable scrolling using GSAP
            gsap.to("body", {
                duration: 0,
                overflow: "auto",
            });
        }
    };

    return (
        <div>
            <button onClick={toggleScroll}>
                {isScrollingEnabled ? "Disable Scroll" : "Enable Scroll"}
            </button>
            <div style={{ height: "200vh", backgroundColor: "lightblue" }}>
                <h2>Scroll control page</h2>
                <p>Scroll down to see the effect. Scroll is controlled by the button above!</p>
            </div>
        </div>
    );
};

export default ScrollControl;
