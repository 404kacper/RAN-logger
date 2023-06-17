import * as React from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import JSZip from 'jszip';
import { useState, useEffect } from 'react';

interface RenderTree {
  id: string;
  name: string;
  children?: RenderTree[];
}

interface TreeNode {
  id: string;
  parentId: string | null;
  label: string;
  type: string;
  items: TreeNode[];
}

const Archive: React.FC = () => {
  const [nodes, setNodes] = useState<TreeNode[]>([]);

  useEffect(() => {
    console.log(`Json structure:`);
    console.log(nodes);
  }, [nodes]);

  // Convert the nodes data to RenderTree data
  const convertToRenderTreeData = (nodes: TreeNode[]): RenderTree[] => {
    return nodes.map((node) => ({
      id: node.id,
      name: node.label,
      children:
        node.items.length > 0 ? convertToRenderTreeData(node.items) : undefined,
    }));
  };

  const renderTree = (nodes: RenderTree): JSX.Element => {
    return (
      <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
        {Array.isArray(nodes.children)
          ? nodes.children.map((node) => renderTree(node))
          : null}
      </TreeItem>
    );
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
          const nodeType =
            file.dir || index !== path.length - 1 ? 'folder' : 'file';
          const node: TreeNode = {
            id: nodeId,
            parentId: currentParent ? currentParent.id : null,
            label: part,
            type: nodeType,
            items: [],
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
          sx={{ height: 110, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
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
