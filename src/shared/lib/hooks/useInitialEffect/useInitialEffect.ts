import { useEffect } from "react";

/**
 * Эффект, который вызывается один раз при инциализации страницы
 * @param callback
 */
export function useInitialEffect(callback: () => void) {
    useEffect(() => {
        if (__PROJECT_ENV__ !== "storybook" && __PROJECT_ENV__ !== "jest") {
            callback();
        }
        // eslint-disable-next-line
    }, []);
}
