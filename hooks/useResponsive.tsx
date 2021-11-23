
import { useEffect, useState } from 'react';
import { Size, useWindowSize } from './useWindowSize';

interface currentSize {
    isMobile: boolean,
    isTablet: boolean,
    isDesktop: boolean,
    is4k: boolean
}

const useResponsive = () => {

    
  const size: Size = useWindowSize(); 

    const [currentSize, setCurrentSize] = useState<currentSize>({
        isMobile: false,
        isTablet: false,
        isDesktop: false,
        is4k: false
    });

    useEffect(() => {

        if(typeof window !== 'undefined' && window.document && window.document.createElement && size.width) {
           if(size.width <= 767) {
               setCurrentSize({isMobile: true, isTablet: false, isDesktop: false, is4k: false})
           } else if(size.width <= 1024 && size.width > 767){
            setCurrentSize({isMobile: false, isTablet: true, isDesktop: false, is4k: false})
           }else if(size.width <= 1280 && size.width > 1024){
            setCurrentSize({isMobile: false, isTablet: false, isDesktop: true, is4k: false})
           } else if(size.width >= 1536 ){
            setCurrentSize({isMobile: false, isTablet: false, isDesktop: false, is4k: true})
           }
        }
  
    }, [size])

    return currentSize
}

export default useResponsive
