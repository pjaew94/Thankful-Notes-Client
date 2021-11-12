export const fadeUpVariant = {
    initial: {
        y: 20,
        opacity: 0
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            duration: 1,
            bounce: 0,
        }
    },
    exit: {
        y: -20,
        opacity: 0
    }
}

