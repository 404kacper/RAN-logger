import React, { useState, useEffect } from 'react';
import JSZip from 'jszip';
import { FaFolder, FaRegFolder, FaFile } from 'react-icons/fa';
import { IconType } from 'react-icons';
import ReactTree from '@naisutech/react-tree';

interface Props {}

interface FileNode {
  label: string;
  children: FileNode[];
}

const Archive: React.FC<Props> = () => {
  const [files, setFiles] = useState<FileNode[]>([]);

  useEffect(() => {
    console.log(files)
  }, files)

  const handleArchiveUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const archive: JSZip = await JSZip.loadAsync(event.target.files![0]);
    const folders: Record<string, string[]> = {};

    // play around with this to figure out how to extract folder structure into json 
    console.log(archive);
    // archive.forEach((relativePath: string, file: JSZip.JSZipObject) => {
    //   if (!file.dir) {
    //     const path: string[] = relativePath.split('/').slice(0, -1);
    //     const folderName: string = path[0];
    //     const fileName: string = path[1];

    //     if (!folders[folderName]) {
    //       folders[folderName] = [];
    //     }

    //     folders[folderName].push(fileName);
    //   }
    // });

    // const fileNodes: FileNode[] = Object.entries(folders).map(
    //   ([folderName, files]) => ({
    //     label: folderName,
    //     children: files.map((fileName) => ({
    //       label: fileName,
    //       children: [],
    //     })),
    //   })
    // );

    // setFiles(fileNodes);
  };

  const getIcon = (type: string): React.ReactNode => {
    let Icon: IconType;

    switch (type) {
      case 'folder':
        Icon = FaFolder;
        break;
      case 'file':
        Icon = FaFile;
        break;
      default:
        Icon = FaRegFolder;
        break;
    }

    return <Icon />;
  };

  return (
    <>
      <input type='file' onChange={handleArchiveUpload} />
      {/* {files.length > 0 && (
        <ReactTree
          nodes={files}
          RenderItem={({ item }) => (
            <div>
              {getIcon(item.children.length ? 'folder' : 'file')} {item.label}
            </div>
          )}
        />
      )} */}
    </>
  );
};

export default Archive;
