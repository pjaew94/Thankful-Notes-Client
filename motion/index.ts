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
        y: 30,
        opacity: 0,
        transition: {
            type: "spring",
            duration: 0.8,
            bounce: 0,
        }
    }
}



export const PostFormMobileVariant = {
    initial: {
        x: "100vw"
    },
    animate: {
        x: 0,
        transition: {
            type: "ease-in-out",
            duration: 0.5,
            bounce: 0,
        }
    },
    exit: {
        x: "100vw",
        transition: {
            type: "ease-in-out",
            duration: 0.5,
            bounce: 0,
        }
    }
}

export const PostSuccessVariant = {
    initial: {
        y: 20,
        opacity: 0
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            duration: 0.5,
            bounce: 0,
            delay: 0.5
        }
    }
}

export const PostModalDesktopVariant = {
    initial: {
        y: 20,
        opacity:0
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            duration: 0.5,
            bounce: 0,
        }
    }
}

export const PostListCardsVariants = {
    initial: {
        y: 10,
        opacity: 0
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            duration: 0.5,
            bounce: 0,
        }
    }
}

export const PostListContainer = {
    initial: {
        opacity: 0
    },
    animate: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            type: "spring",
            duration: 0.2,
            bounce: 0,
        }
    }
}

