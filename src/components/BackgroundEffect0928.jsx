import React, {useEffect, useRef} from "react";
import * as THREE from "three";

function BackgroundEffect() {
  const containerRef = useRef(null);

  useEffect(() => {
    let scene, camera, renderer, instancedSpheres, mouse, raycaster;
    const boundarySize = {x: 10, y: 10, z: 2};
    const instanceCount = 20000;
    let mouseInfluenceRadius = 5;
    let mouseInfluenceRadiusDelta = 0.9;

    // 初始化 Three.js 場景
    function init() {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 15;

      // 添加環境光和點光源
      const ambientLight = new THREE.AmbientLight(0xddffdd, 0.25);
      scene.add(ambientLight);
      const pointLight = new THREE.PointLight(0xffffff, 10, 10);
      scene.add(pointLight);
      pointLight.decay = 6;

      mouse = new THREE.Vector2();
      raycaster = new THREE.Raycaster();

      const radius = 0.01;
      const geometry = new THREE.SphereGeometry(radius, 32, 32);
      const material = new THREE.MeshPhongMaterial({
        color: 0xff00,
        opacity: 0.9,
        transparent: true,
        roughness: 0.9,
        metalness: 0.9,
        shininess: 90,
      });

      instancedSpheres = new THREE.InstancedMesh(
        geometry,
        material,
        instanceCount
      );
      const matrix = new THREE.Matrix4();
      const position = new THREE.Vector3();
      const scale = new THREE.Vector3();
      const quaternion = new THREE.Quaternion();

      for (let i = 0; i < instanceCount; i++) {
        position.x = THREE.MathUtils.randFloatSpread(boundarySize.x);
        position.y = THREE.MathUtils.randFloatSpread(boundarySize.y);
        position.z = THREE.MathUtils.randFloatSpread(boundarySize.z);
        const randomScale = THREE.MathUtils.randFloat(0.01, 0.02) / radius;
        scale.set(randomScale, randomScale, randomScale);
        matrix.compose(position, quaternion, scale);
        instancedSpheres.setMatrixAt(i, matrix);
      }
      scene.add(instancedSpheres);

      // 創建邊界盒
      const boundaryGeometry = new THREE.BoxGeometry(
        boundarySize.x,
        boundarySize.y,
        boundarySize.z
      );
      const edges = new THREE.EdgesGeometry(boundaryGeometry);
      const boundaryMaterial = new THREE.LineBasicMaterial({color: 0xffffff});
      const boundaryBox = new THREE.LineSegments(edges, boundaryMaterial);
      scene.add(boundaryBox);

      // 初始化渲染器
      renderer = new THREE.WebGLRenderer({antialias: true});
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.0;

      if (containerRef.current) {
        containerRef.current.appendChild(renderer.domElement);
      }

      window.addEventListener("mousemove", onMouseMove, false);
      window.addEventListener("resize", onWindowResize, false);
    }

    function onMouseMove(event) {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function animate() {
      requestAnimationFrame(animate);
      raycaster.setFromCamera(mouse, camera);

      instancedSpheres.instanceMatrix.needsUpdate = true;
      for (let i = 0; i < instanceCount; i++) {
        const matrix = new THREE.Matrix4();
        instancedSpheres.getMatrixAt(i, matrix);

        const position = new THREE.Vector3();
        const quaternion = new THREE.Quaternion();
        const scale = new THREE.Vector3();
        matrix.decompose(position, quaternion, scale);
        matrix.compose(position, quaternion, scale);
        instancedSpheres.setMatrixAt(i, matrix);
      }

      renderer.render(scene, camera);
    }

    init();
    animate();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onWindowResize);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      id="scene-container"
      ref={containerRef}
      style={{ width: "100vw", height: "100vh" }}
    />
  )
}

export default BackgroundEffect;
