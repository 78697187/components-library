/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent, useRef, useState } from "react";
import axios from 'axios';

import Button from '../Button/button';
import UploadList from "./uploadList";

// 定义展示上传状态的数据结构
export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error';
export interface UploadFile {
  uid: string;
  size: number;
  name: string;
  status?: UploadFileStatus;
  /** 已上传的百分比 */
  percent?: number;
  /** 源文件 */
  raw?: File;
  response?: any;
  error?: any;
}
export interface UploadProps {
  /** 按钮名称 */
  content?: string;
  action: string;
  defaultFileList?: UploadFile[];
  /** 文件上传的生命周期函数， 在文件上传之前对文件进行处理。 如： 检查文件大小 */
  beforeUpload?: (file: File) => boolean | Promise<File>;
  onProgress?: (percentage: number, file: File) => void;
  onSuccess?: (data: any, file: File) => void;
  onError?: (err: any, file: File) => void;
  onChange?: (file: File) => void;
  onRemove?: (file: UploadFile) => void;
}

export const Upload: React.FC<UploadProps> = (props) => {
  const {
    content,
    action,
    defaultFileList,
    beforeUpload,
    onProgress,
    onSuccess,
    onError,
    onChange,
    onRemove,
  } = props;
  const fileInput = useRef<HTMLInputElement>(null);
  const [ fileList, setFileList ] = useState<UploadFile[]>(defaultFileList || []);
  // 更新percentage
  const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
    setFileList(prevList => {
      return prevList.map(file => {
        if(file.uid === updateFile.uid) {
          return {... file, ...updateObj};
        } else {
          return file;
        }
      })
    })
  }

  // 点击上传按钮
  const handleClick = () => {
    if(fileInput.current) {
      fileInput.current.click();
    }
  }
  // 选择文件后得处理函数
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
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
      if(!beforeUpload){
        post(file);
      } else {
        const result = beforeUpload(file);
        if(result && result instanceof Promise){
          result.then(processedFile => {
            post(processedFile);
          })
        } else if(result !== false) {
          post(file);
        }
      }
    })
  }
  const post = (file: File) => {
    const _file: UploadFile = {
      uid: Date.now() + `${file.name}`,
      status: 'ready',
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file,
    }
    setFileList([_file, ...fileList]);
    const formData = new FormData();
    formData.append(file.name, file);
    axios.post(action, formData, {
      headers: {
        'Content-type': 'multipart/form-data'
      },
      onUploadProgress: (e) => {
        console.log(e)
        const percentage = Math.round((e.loaded / e.total) * 100) || 0;
        if (percentage < 100) {
          updateFileList(_file, { percent: percentage, status: 'uploading'});
          if(onProgress) {
            onProgress(percentage, file)
          }
        }
      }
    }).then(resp => {
      console.log(resp);
      updateFileList(_file, {status: 'success', response: resp.data});
      if(onSuccess) {
        onSuccess(resp.data, file);
      }
      if(onChange) {
        onChange(file);
      }
    }).catch((err) => {
      console.log(err);
      updateFileList(_file, {status: 'error', error: err});
      if(onError) {
        onError(err, file);
      }
      if(onChange) {
        onChange(file);
      }
    })
  }

  // 删除逻辑
  const handleMove = (file: UploadFile) => {
    setFileList(prevList =>
      prevList.filter(item => item.uid !== file.uid)
    )
    if(onRemove) {
      onRemove(file);
    }
  }

  return (
    <div
      className="yuan-upload-component"
    >
      <Button
       btnType='primary'
       onClick={handleClick}
      >
        {
          content ? content : '点击上传'
        }
      </Button>
      <input
        className="yuan-file-input"
        type='file'
        ref={fileInput}
        onChange={handleFileChange}
        style={{display: 'none'}}
      />
      <UploadList
        fileList={fileList}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onRemove={ handleMove }
      />
    </div>
  )
};

export default Upload;