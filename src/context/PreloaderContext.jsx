"use client";

import { createContext, useContext, useState, useCallback } from "react";

const PreloaderContext = createContext({
    isPreloaderDone: false,
    markPreloaderDone: () => {},
});

export function PreloaderProvider({ children }) {
    const [isPreloaderDone, setIsPreloaderDone] = useState(false);
    const markPreloaderDone = useCallback(() => setIsPreloaderDone(true), []);

    return (
        <PreloaderContext.Provider value={{ isPreloaderDone, markPreloaderDone }}>
            {children}
        </PreloaderContext.Provider>
    );
}

export function usePreloader() {
    return useContext(PreloaderContext);
}
