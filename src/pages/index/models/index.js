
import initMinibModel from './minib';
import initTModel from './t';

const meshes = {
  minib: null,
  t: null,
};

function getGeometryHeight(geometry) {
  const { max, min } = geometry.boundingBox;
  return max.y - min.y;
}

const gap = 2;

export default function initModels(scene, loader, loadingManager, gui) {
  initMinibModel(scene, loader, gui, (mesh) => {
    meshes.minib = mesh;
  });
  initTModel(scene, loader, gui, (mesh) => {
    meshes.t = mesh;
  });

  // eslint-disable-next-line no-param-reassign
  loadingManager.onLoad = () => {
    // 计算整体高度和半高
    const minibHeight = getGeometryHeight(meshes.minib.geometry);
    const tHeight = getGeometryHeight(meshes.t.geometry);
    const allHeights = minibHeight + tHeight;
    const halfHeight = allHeights / 2;

    // 键盘上移
    meshes.t.geometry.translate(0, halfHeight - tHeight / 2 + gap, 0);
    // 键托下移
    meshes.minib.geometry.translate(0, -(halfHeight - minibHeight / 2 + gap), 0);
  };
}
