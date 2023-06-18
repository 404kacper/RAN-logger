import * as React from 'react';
import { useState, useEffect } from 'react';

import untar from 'js-untar';
import JSZip from 'jszip';
import pako from 'pako';

import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import FolderIcon from '@mui/icons-material/FolderRounded';
import DescriptionIcon from '@mui/icons-material/DescriptionRounded';
import ArchiveIcon from '@mui/icons-material/ArchiveRounded';

interface RenderTree {
  id: string;
  name: string;
  type: string;
  children?: RenderTree[];
}

interface TreeNode {
  id: string;
  parentId: string | null;
  label: string;
  type: string;
  items: TreeNode[];
  file?: JSZip | JSZip.JSZipObject;
}

const Archive: React.FC = () => {
  const [nodes, setNodes] = useState<TreeNode[]>([]);
  const [selectedFile, setSelectedFile] = useState<JSZip.JSZipObject | null>(
    null
  );

  useEffect(() => {
    // console.log(selectedFile);
  }, [selectedFile]);

  // Convert the nodes data to RenderTree data
  const convertToRenderTreeData = (nodes: TreeNode[]): RenderTree[] => {
    return nodes.map((node) => ({
      id: node.id,
      name: node.label,
      type: node.type,
      children:
        node.items.length > 0 ? convertToRenderTreeData(node.items) : undefined,
    }));
  };

  const renderTree = (nodes: RenderTree): JSX.Element => {
    return (
      <TreeItem
        key={nodes.id}
        nodeId={nodes.id}
        label={nodes.name}
        // Add an icon based on the type of the node
        icon={getIconForType(nodes.type)}
        onClick={() => handleSelect(nodes)}
      >
        {Array.isArray(nodes.children)
          ? nodes.children.map((node) => renderTree(node))
          : null}
      </TreeItem>
    );
  };
  const handleSelect = async (node: RenderTree) => {
    const selectedNode = findNode(node.id);
    const file = selectedNode?.file;

    if (file && 'async' in file) {
      const fileContents = await file.async('uint8array');
      const fileText = new TextDecoder().decode(fileContents);
      console.log(fileText); // Now it should print the text contents of the file
    }
  };

  const findNode = (
    id: string,
    nodesToSearch = nodes
  ): TreeNode | undefined => {
    for (let node of nodesToSearch) {
      if (node.id === id) {
        return node;
      } else if (node.items.length) {
        const foundNode = findNode(id, node.items);
        if (foundNode) {
          return foundNode;
        }
      }
    }
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case 'folder':
        return <FolderIcon />;
      case 'file.gz':
        return <ArchiveIcon />;
      case 'file.log':
        return <DescriptionIcon />;
      default:
        break;
    }
  };

  const handleArchiveUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const archive: JSZip = await JSZip.loadAsync(event.target.files![0]);
    let nodeIdCounter = 1;

    // Directory map to track parent directories.
    const directoryMap: { [key: string]: TreeNode } = {};

    let newNodes: TreeNode[] = [];

    for (const [relativePath, file] of Object.entries(archive.files)) {
      const path = relativePath
        .split('/')
        .filter((part: string) => part !== '');

      let currentParent: TreeNode | null = null;

      for (let index = 0; index < path.length; index++) {
        const part = path[index];
        const nodeId = (nodeIdCounter++).toString();
        const directoryKey = path.slice(0, index + 1).join('/');

        // Check if we're on the actual file path
        if (!directoryMap[directoryKey]) {
          const isDirectory = file.dir || index !== path.length - 1;

          const nodeType = isDirectory
            ? 'folder'
            : `file.${part.split('.').pop()}`;

          const node: TreeNode = {
            id: nodeId,
            parentId: currentParent ? currentParent.id : null,
            label: part,
            type: nodeType,
            items: [],
            file: !isDirectory ? file : undefined,
          };

          if (nodeType === 'file.gz') {
            if (node.file && 'async' in node.file) {
              const contentUint8 = await node.file.async('uint8array');

              // Decompress the gzipped file
              const decompressed = pako.inflate(contentUint8);

              // Untar the decompressed tarball
              const filesFromGz = await untar(decompressed.buffer);

              // Interpretation of individual files after decompression and untaring
              // Assumed format is a text file
              console.log(`Currently displayed archive: ${node.label}`);
              for (const fileFromGz of filesFromGz) {
                console.log(`Displayed file is: ${fileFromGz.name}`);
                console.log(fileFromGz);

                const filePath = fileFromGz.name
                  .split('/')
                  .filter((part: string) => part !== '');
                let currentParent: TreeNode | null = node; // Start from the gz file node

                for (let index = 0; index < filePath.length; index++) {
                  const part = filePath[index];
                  const nodeId = (nodeIdCounter++).toString();
                  const directoryKey = `${node.label}/${filePath
                    .slice(0, index + 1)
                    .join('/')}`;

                  if (!directoryMap[directoryKey]) {
                    const isDirectory = index !== filePath.length - 1;

                    const nodeType = isDirectory
                      ? 'folder'
                      : `file.${part.split('.').pop()}`;

                    const childNode: TreeNode = {
                      id: nodeId,
                      parentId: currentParent ? currentParent.id : null,
                      label: part,
                      type: nodeType,
                      items: [],
                      // Only non-directory nodes have file attribute
                      file: !isDirectory
                        ? new JSZip().file(part, fileFromGz.buffer)
                        : undefined,
                    };

                    directoryMap[directoryKey] = childNode;
                    currentParent.items.push(childNode);
                    currentParent = childNode;
                  } else {
                    currentParent = directoryMap[directoryKey];
                  }
                }
              }
            } else {
              console.error(
                "File is not defined or doesn't have an 'async' method"
              );
            }
          }

          directoryMap[directoryKey] = node;

          if (currentParent) {
            currentParent.items.push(node);
          } else {
            newNodes.push(node);
          }
        }

        currentParent = directoryMap[directoryKey];
      }
    }

    setNodes((nodes) => [...nodes, ...newNodes]);
  };

  return (
    <>
      <input type='file' onChange={handleArchiveUpload} />
      {nodes.length > 0 ? (
        <TreeView
          aria-label='archive-tree'
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          sx={{
            maxHeight: 500,
            flexGrow: 1,
            maxWidth: 300,
            overflowY: 'auto',
            overflowX: 'hidden',
          }}
        >
          {convertToRenderTreeData(nodes).map((node) => renderTree(node))}
        </TreeView>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default Archive;
