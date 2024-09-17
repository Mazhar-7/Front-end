import React,{useRef,useEffect } from 'react';
import "./cursor.css";

const Cursor = (props) => {
    console.log(`this loading state ${props.loading}`);
    const cursorRef = useRef(null);

    useEffect(() => {
     if (!props.loading){
        const handleMouseMove = (event) => {
            const { clientX, clientY } = event;
            console.log(`this ref ${cursorRef.current}`);
            
            cursorRef.current.style.left = `${clientX}px`;
            console.log(`this is event X ${event}`);
            cursorRef.current.style.top = `${clientY}px`;
            console.log(`this is event X ${event}`);
          };
      
          document.addEventListener('mousemove', handleMouseMove);
      
          return () => {
            document.removeEventListener('mousemove', handleMouseMove);
          };
     }
    }, [loading]);



  return (
     <div ref={cursorRef} className="follower-cursor" />
  )
}

export default Cursor;