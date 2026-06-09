import * as THREE from "three";

class Gradation {
  constructor() {
    const canvas = document.querySelector("#c");
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: canvas,
    });

    // https://threejs.org/manual/resources/scene-down.svg
    const fov = 75;
    const aspect = window.innerWidth / window.innerHeight; // the canvas default
    const near = 0.1;
    const far = 1000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.updateProjectionMatrix();

    camera.position.z = 2;

    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene(); //空間作成

    // 光源を追加
    {
      const color = 0xffffff;
      const intensity = 3;
      const light = new THREE.DirectionalLight(color, intensity);
      light.position.set(-1, 2, 4);
      scene.add(light);
    }

    const geometry = new THREE.BoxGeometry(1, 1, 1); //立方体の形状を作成

    const makeInstance = (geometry, color, x) => {
      const material = new THREE.MeshPhongMaterial({ color });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);

      cube.position.x = x;

      return cube;
    };

    const cubes = [
      makeInstance(geometry, 0x44aa88, 0),
      makeInstance(geometry, 0x8844aa, -2),
      makeInstance(geometry, 0xaa8844, 2),
    ];

    //回転アニメーション（描画ループ）
    const render = (time) => {
      time *= 0.001;

      cubes.forEach((cube, ndx) => {
        const speed = 1 + ndx * 0.1;
        const rot = time * speed;
        cube.rotation.x = rot;
        cube.rotation.y = rot;
      });

      renderer.render(scene, camera); //シーンとカメラを渡して描画(レンダリング)

      requestAnimationFrame(render);
    };
    requestAnimationFrame(render);
  }
}

export default Gradation;
