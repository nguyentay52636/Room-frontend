import { useState, useEffect } from 'react';
import {
    ClipLoader,
    BeatLoader,
    BounceLoader,
    CircleLoader,
    ClimbingBoxLoader,
    ClockLoader,
    DotLoader,
    FadeLoader,
    GridLoader,
    HashLoader,
    MoonLoader,
    PacmanLoader,
    PropagateLoader,
    PulseLoader,
    RingLoader,
    RiseLoader,
    RotateLoader,
    ScaleLoader,
    SyncLoader,
    BarLoader,
} from 'react-spinners';

const config = {
    size: 50,
    color: '#ec4899',
    loading: true,
    speedMultiplier: 1,
};

const loaders = [
    <ClipLoader {...config} />,
    <BeatLoader {...config} />,
    <BounceLoader {...config} />,
    <CircleLoader {...config} />,
    <ClimbingBoxLoader {...config} />,
    <ClockLoader {...config} />,
    <DotLoader {...config} />,
    <FadeLoader {...config} />,
    <GridLoader {...config} />,
    <HashLoader {...config} />,
    <MoonLoader {...config} />,
    <PacmanLoader {...config} />,
    <PropagateLoader {...config} />,
    <PulseLoader {...config} />,
    <RingLoader {...config} />,
    <RiseLoader {...config} />,
    <RotateLoader {...config} />,
    <ScaleLoader {...config} />,
    <SyncLoader {...config} />,
    <BarLoader {...config} />,
];

// Props interface
interface SkeletonLoadingProps {
    loadingTime: number;
    loadingText: string;
    children: React.ReactNode;
}

export default function SkeletonLoading({ loadingTime, loadingText, children }: SkeletonLoadingProps) {
    const [currentLoaderIndex, setCurrentLoaderIndex] = useState(
        Math.floor(Math.random() * loaders.length)
    );
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), loadingTime);
        return () => clearTimeout(timer);
    }, [loadingTime]);

    // Randomize loader every 2 seconds while loading
    useEffect(() => {
        if (!loading) return;
        const interval = setInterval(() => {
            setCurrentLoaderIndex(Math.floor(Math.random() * loaders.length));
        }, 2000);
        return () => clearInterval(interval);
    }, [loading]);

    if (!loading) return <>{children}</>;

    return (
        <div className="fixed w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 z-[9999]">
            <div className="flex items-center justify-center">
                {currentLoaderIndex !== null && loaders[currentLoaderIndex]}
            </div>
            <div className="mt-8 text-center">
                <p className="text-lg font-medium text-gray-600 dark:text-gray-300 animate-pulse">
                    {loadingText}
                </p>
                <div className="mt-4 flex items-center justify-center space-x-2">
                    <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
            </div>
        </div>
    );
}