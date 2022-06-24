/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent, useRef } from "react";
import axios from 'axios';

import Button from '../Button/button';
import { HandlerFunction } from "@storybook/addon-actions";

export interface UploadProps {
  action: string;
  onProgress?: (percentage: number, file: File) => void;
  onSuccess?: (data: any, file: File) => void;
  onError?: (err: any, file: File) => void;
}

export const Upload: React.FC<UploadProps> = (props) => {
  const {
    action,
    onProgress,
    onSuccess,
    onError,
  } = props;
  const fileInput = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if(fileInput.current) {
      fileInput.current.click();
    }
  }
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if(!files) {
      return;
    }
    uploadFiles(files);
    if(fileInput.current) {
      fileInput.current.value='';
    }
  }
  // 定义上传文件的方法
  const uploadFiles = (files: FileList) => {
    const postFiles = Array.from(files);
    postFiles.forEach(file => {
      const formData = new FormData();
      formData.append(file.name, file);
      axios.post(action, formData, {
        headers: {
          'Content-type': 'multipart/form-data'
        },
        onUploadProgress: (e) => {
          const percentage = Math.round((e.loaded * 100) / e.total) || 0;
          if (percentage < 100) {
            if(onProgress) {
              onProgress(percentage, file)
            }
          }
        }
      }).then(resp => {
        console.log(resp);
        if(onSuccess) {
          onSuccess(resp.data, file);
        }
      }).catch((error) => {
        console.log(error);
        if(onError) {
          onError(error, file);
        }
      })
    })
  }

  return (
    <div
      className="yuan-upload-component"
    >
      <Button
       btnType='primary'
       onClick={handleClick}
      >
        Upload File
      </Button>
      <input
        className="yuan-file-input"
        type='file'
        ref={fileInput}
        onChange={handleChange}
        style={{display: 'none'}}
      />
    </div>
  )
};

export default Upload;