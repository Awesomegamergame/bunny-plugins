import { ReactNative } from "@vendetta/metro/common";
import { after } from "@vendetta/patcher";
import { logger } from "@vendetta";

const { View } = ReactNative;

const log = (message: string, data?: any) => {
  logger.log(`[Dashless] ${message}`, data);
};

// Function to recursively traverse and modify children
const traverseAndModify = (node) => {
  if (typeof node === "string") {
    return node.replace(/-/g, " ");
  }

  if (Array.isArray(node)) {
    return node.map(traverseAndModify);
  }

  if (node && typeof node === "object" && node.props && node.props.children) {
    return {
      ...node,
      props: {
        ...node.props,
        children: traverseAndModify(node.props.children),
      },
    };
  }

  return node;
};

const patchRender = () => {
  return after("render", View, (_, res) => {
    //log("View render patched");

    const modifiedTree = traverseAndModify(res);

    //log("React tree modified");

    return modifiedTree;
  });
};

const unpatchRender = patchRender();

export const onUnload = () => {
  unpatchRender();
};
