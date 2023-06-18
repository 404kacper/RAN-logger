import * as React from 'react';
import { useState, useEffect } from 'react';

import untar from 'js-untar';
import JSZip from 'jszip';

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
  file?: JSZip.JSZipObject;
}

const Archive: React.FC = () => {
  const [nodes, setNodes] = useState<TreeNode[]>([]);
  const [selectedFile, setSelectedFile] = useState<JSZip.JSZipObject | null>(
    null
  );

  useEffect(() => {
    console.log(selectedFile);
  }, [selectedFile])

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

  const handleSelect = (node: RenderTree) => {
    const selectedNode = findNode(node.id);
    if (selectedNode && selectedNode.file) {
      setSelectedFile(selectedNode.file);
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

    archive.forEach((relativePath: string, file: JSZip.JSZipObject) => {
      // Don't include empty path as it would produce an empty node
      const path = relativePath.split('/').filter((part) => part !== '');
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

          directoryMap[directoryKey] = node;

          if (currentParent) {
            currentParent.items.push(node);
          } else {
            newNodes.push(node);
          }
        }

        currentParent = directoryMap[directoryKey];
      }
    });

    setNodes(newNodes);
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
