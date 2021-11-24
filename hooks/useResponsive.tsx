
import { useEffect, useState } from 'react';
import { Size, useWindowSize } from './useWindowSize';

interface currentSize {
    sm: boolean,
    md: boolean,
    lg: boolean,
    xl: boolean,
    xxl: boolean
}

const useResponsive = () => {

    
  const size: Size = useWindowSize(); 

    const [currentSize, setCurrentSize] = useState<currentSize>({
        sm: false, md: false, lg: false, xl: false, xxl: false
    });

    useEffect(() => {

        if(typeof window !== 'undefined' && window.document && window.document.createElement && size.width) {
           if(size.width >= 0 && size.width < 768) {
               setCurrentSize({sm: true, md: false, lg: false, xl: false, xxl: false})
           } else if(size.width >= 768 && size.width < 1024){
            setCurrentSize({sm: false, md: true, lg: false, xl: false, xxl: false})
           }else if(size.width >= 1024 && size.width < 1280){
            setCurrentSize({sm: false, md: false, lg: true, xl: false, xxl: false})
           } else if(size.width >= 1280 && size.width < 1536){
            setCurrentSize({sm: false, md: false, lg: false, xl: true, xxl: false})
           } else if(size.width >= 1536) {
            setCurrentSize({sm: false, md: false, lg: false, xl: false, xxl: true})
           }
        }
    }, [size])

    return currentSize
}

export default useResponsive
