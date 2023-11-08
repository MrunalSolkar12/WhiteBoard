import React,{useState} from 'react';
import { useCallback } from "react";
import Particles from "react-particles";
//import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { confetti } from "tsparticles-confetti"; // if you are going to use `loadSlim`, install the "tsparticles-slim" package too.

export const GraphPaper = () => {

    const [particlesInitialized, setParticlesInitialized] = useState(false);


    const particlesInit = useCallback(async engine => {
        console.log(engine);
        // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        //await loadFull(engine);
        await confetti(engine);
        setParticlesInitialized(true);
    }, []);

    const particlesLoaded = useCallback(async container => {
        await console.log(container);
    }, []);

    const handleClick = () => {
        // Check if particles have been initialized, and only initialize them if not already done
        if (!particlesInitialized) {
            particlesInit("tsparticles");
        }
    };

    return (
        <Particles id="tsparticles" url="http://foo.bar/particles.json" init={particlesInit} loaded={particlesLoaded} />
    );
};