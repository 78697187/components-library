import React, { useRef } from "react";





export const VirtualList = () => {

  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="container">
      <div className="scroll-box" ref={containerRef}>
        <div>
          {
            
          }
        </div>
      </div>
    </div>
  )

}