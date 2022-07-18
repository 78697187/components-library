/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent, useRef, useState } from "react";
import axios from 'axios';
import CryptoJS from 'crypto-js';

import Button from '../Button/button';
import UploadList from "./uploadList";
import Dragger from "./dragger";

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
  action: string;
  defaultFileList?: UploadFile[];
  /** 文件上传的生命周期函数， 在文件上传之前对文件进行处理。 如： 检查文件大小 */
  beforeUpload?: (file: File) => boolean | Promise<File>;
  onProgress?: (percentage: number, file: File) => void;
  onSuccess?: (data: any, file: File) => void;
  onError?: (err: any, file: File) => void;
  onChange?: (file: File) => void;
  onRemove?: (file: UploadFile) => void;
  /** 自定义post请求头
   *  默认携带'Content-type': 'multipart/form-data'
  */
  headers?: {[key: string]: any};
  name?: string;
  data?: {[key: string]: any};
  /** 表示跨域请求时是否携带cookie， 默认不携带 */
  withCredentials?: boolean;
  /** 可传输的文件类型 */
  accept?: string;
  /** 是否可以传输多个文件 */
  multiple?: boolean;
  /** 自定义触发元素 */
  children?: React.ReactNode;
  /** 是否可以拖动上传 */
  drag?: boolean;
}

export const Upload: React.FC<UploadProps> = (props) => {
  const {
    action,
    defaultFileList,
    beforeUpload,
    onProgress,
    onSuccess,
    onError,
    onChange,
    onRemove,
    name,
    data,
    headers,
    withCredentials,
    accept,
    multiple,
    children,
    drag,
  } = props;
  const fileInput = useRef<HTMLInputElement>(null);
  const [ fileList, setFileList ] = useState<UploadFile[]>(defaultFileList || []);
  // 更新percentage
  const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
    // 传入一个函数， 解决拿不到最新的state的Bug
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

  const read = (file: File) => {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = function() {
        resolve(reader.result);
      }
      reader.onerror = reject;

      reader.readAsBinaryString(file);
    })
  }

  const post = async (file: File) => {
    const _file: UploadFile = {
      uid: Date.now() + `${file.name}`,
      status: 'ready',
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file,
    }
    // 这里有bug，传入多个文件时， 只显示最后一个， 这是setState的问题
    // setFileList([_file, ...fileList]);
    setFileList(prevList => [_file, ...prevList]);
    // const formData = new FormData();
    // formData.append('file', file);
    // axios.post(action, formData, {
    //   onUploadProgress: (e) => {
    //     console.log(e);
    //   }
    // }).then(res => {
    //   console.log(res);
    // }).catch(error => {
    //   console.log(error);
    // });
    const { size, name, type } = file;
    const chunkSize = 1024 * 50;
    const fileChunks = [];
    for (let cur = 0; cur < file.size; cur += chunkSize) {
      fileChunks.push(
        file.slice(cur, cur + chunkSize),
      );
    }
    console.log(fileChunks);
    let uploaded = 0;
    // let failIndex = undefined;
    for(let index = 0; index < fileChunks.length; index++){
      uploaded = index * chunkSize;
      const formData = new FormData();
      formData.append('name', name);
      formData.append('type', type);
      formData.append('size', String(size));
      formData.append('file', fileChunks[index]);
      formData.append('offset', String(uploaded));
      if(data) {
        Object.keys(data).forEach(key => {
          formData.append(key, data[key]);
        })
      }
      // const formData = new FormData();
      // formData.append('file', fileChunks[index]);
      // axios.post(action, formData, {
      //   onUploadProgress: (e) => {
      //     console.log(e);
      //   }
      // }).then(res => {
      //   console.log('res:', res);
      // }).catch(error => {
      //   console.log('error:', error);
      // });
      const task = await axios.post(action, formData, {
        headers: {
          ...headers,
          'Content-type': 'multipart/form-data'
        },
        withCredentials,
      })
      console.log(task);
      // task.then((resp: { data: any; }) => {
      //   console.log(resp);
      //   if(index === fileChunks.length) {
      //     console.log('传输完成');
      //     updateFileList(_file, {status: 'success', response: resp.data});
      //   }
      //   const percent = (uploaded / size);
      //   console.log(percent);
      //   if(onSuccess) {
      //     onSuccess(resp.data, file);
      //   }
      //   if(onChange) {
      //     onChange(file);
      //   }
      // }).catch((err: any) => {
      //   console.log(err);
      //   failIndex = index;
      //   console.log(failIndex);
      // })
    }
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
      <div
        className="event-container"
        onClick={handleClick}
      >
        {
          drag ?
          <Dragger
            onFile={ files => uploadFiles(files) }
          >{children}</Dragger> : children
        }
      </div>
      <input
        className="yuan-file-input"
        type='file'
        ref={fileInput}
        onChange={handleFileChange}
        style={{display: 'none'}}
        accept={accept}
        multiple={multiple}
      />
      <UploadList
        fileList={fileList}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onRemove={ handleMove }
      />
    </div>
  )
};

Upload.defaultProps = {
  name: 'file',
  children:  (<Button btnType='primary'>点击上传</Button>),
}

export default Upload;