import * as THREE from 'three';
import modelUrl from '../../../static/1800t.stl';

const props = {
  color: '#ffffff',
};

export default function initMinibModel(scene, loader, gui, callback) {
  loader.load(modelUrl, (geometry) => {
    const material = new THREE.MeshStandardMaterial({ color: props.color, shininess: 200 });
    const mesh = new THREE.Mesh(geometry, material);

    geometry.center();
    geometry.rotateZ(-Math.PI / 12);

    mesh.scale.set(0.1, 0.1, 0.1);

    mesh.castShadow = true;
    mesh.receiveShadow = true;

    scene.add(mesh);
    callback(mesh);

    gui.addColor(props, 'color').name('键盘框颜色').onChange(() => {
      material.color.set(props.color);
    });
  });
}
