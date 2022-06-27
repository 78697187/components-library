import React, { useState, DragEvent } from "react";
import classNames from "classnames";

interface DraggerProps {
  onFile: (files: FileList) => void;
  children?: React.ReactNode;
}

export const Dragger: React.FC<DraggerProps> = (props) => {
  const { onFile, children } = props;
  const [ dragOver, setDragOver ] = useState(false);
  const klass = classNames('yuan-uploader-dragger', {
    'is-dragover': dragOver,
  })

  const handleDrag = (e: DragEvent<HTMLElement>, over: boolean) => {
    e.preventDefault();
    setDragOver(over);
  }
  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    setDragOver(false);
    // console.log(e.dataTransfer.files);
    if(onFile) {
      onFile(e.dataTransfer.files);
    }
  }

  return (
    <div
      className={klass}
      onDragOver={e => handleDrag(e, true)}
      onDragLeave={e => handleDrag(e, false)}
      onDrop={handleDrop}
    >
      {children}
    </div>
  )
};

export default Dragger;