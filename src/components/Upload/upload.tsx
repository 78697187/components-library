/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent, useCallback, useRef, useState } from "react";
import axios from 'axios';

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
  /** 成功的信息 */
  response?: any;
  /** 失败的信息 */
  error?: any;
}
export interface UploadProps {
  action: string;
  defaultFileList?: UploadFile[];
  /** 文件上传的生命周期函数， 在文件上传之前对文件进行处理。 如： 检查文件大小 */
  beforeUpload?: (file: File) => boolean | Promise<File>;
  /** 文件上传的生命周期函数， 在文件上传过程中的回调函数。 */
  onProgress?: (percentage: number, file: File) => void;
  /** 文件上传的生命周期函数， 在文件上传之后的回调函数。 */
  onSuccess?: (data: any, file: File) => void;
  /** 文件上传的生命周期函数， 文件上传失败的回调函数。 */
  onError?: (err: any, file: File) => void;
  /** 文件上传的生命周期函数， 文件上传成功或失败之后的回调函数。 */
  onChange?: (file: File) => void;
  onRemove?: (file: UploadFile) => void;
  /** 自定义post请求头
   *  默认携带'Content-type': 'multipart/form-data'
  */
  headers?: {[key: string]: any};
  /** 自定义传输给服务器数据的name */
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

export const Upload: React.FC<UploadProps> = React.memo((props: UploadProps) => {
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
  const post = useCallback((file: File) => {
    const _file: UploadFile = {
      uid: Date.now() + `${file.name}`,
      status: 'ready',
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file,
    }
    // 这里有bug，传入多个文件时， 只显示最后一个， 这是setState的问题
    // setFileList([_file, ...fileList]);  // 闭包
    setFileList(prevList => [_file, ...prevList])
    const formData = new FormData();
    formData.append(name || 'file', file);
    if(data) {
      Object.keys(data).forEach(key => {
        formData.append(key, data[key]);
      })
    }
    axios.post(action, formData, {
      headers: {
        ...headers,
        'Content-type': 'multipart/form-data'
      },
      withCredentials,
      onUploadProgress: (e) => {
        // console.log(e)
        const percentage = Math.round((e.loaded / e.total) * 100) || 0;
        if (percentage < 100) {
          updateFileList(_file, { percent: percentage, status: 'uploading' });
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
  }, [action, data, headers, name, onChange, onError, onProgress, onSuccess, withCredentials])
  // 定义上传文件的方法
  const uploadFiles = useCallback((files: FileList) => {
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
  }, [beforeUpload, post])

  // 删除逻辑
  const handleMove = useCallback((file: UploadFile) => {
    setFileList(prevList =>
      prevList.filter(item => item.uid !== file.uid)
    )
    if(onRemove) {
      onRemove(file);
    }
  }, [onRemove]);

  const onFile = useCallback((files: FileList) => {
    uploadFiles(files)
  }, [ uploadFiles ])

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
            onFile={ onFile }
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
        onRemove={ handleMove }
      />
    </div>
  )
});

Upload.displayName = 'Upload';

Upload.defaultProps = {
  name: 'file',
  children:  (<Button btnType='primary'>点击上传</Button>),
}

export default Upload;