import React, { useEffect, useState } from "react";
import "./MLMTree.css";

const MLMTree = () => {
  const [treeData, setTreeData] = useState(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const userId = new URLSearchParams(window.location.search).get("id") || 1;
    fetch(`/api/v1/users/downline-tree/${userId}`)
      .then((res) => res.json())
      .then(setTreeData)
      .catch((err) => {
        console.error("Failed to load tree data:", err);
        setTreeData("error");
      });
  }, []);

  const buildTree = (node) => {
    if (!node) return null;
    return (
      <li>
        <div className="node">{node.username}</div>
        {node.children && node.children.length > 0 && (
          <ul>{node.children.map((child) => buildTree(child))}</ul>
        )}
      </li>
    );
  };

  const zoomIn = () => setScale((prev) => prev + 0.1);
  const zoomOut = () => setScale((prev) => Math.max(0.2, prev - 0.1));
  const resetZoom = () => setScale(1);

  return (
    <div>
      <div className="controls">
        <button onClick={zoomIn}>Zoom In</button>
        <button onClick={zoomOut}>Zoom Out</button>
        <button onClick={resetZoom}>Reset</button>
      </div>
      <div className="canvas">
        <div
          className="tree-wrapper"
          style={{ transform: `scale(${scale})` }}
        >
          <div className="tree">
            {treeData === "error" ? (
              <p>Failed to load tree.</p>
            ) : treeData ? (
              <ul>{buildTree(treeData)}</ul>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MLMTree;
