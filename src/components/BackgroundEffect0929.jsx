import React, { useEffect, useRef } from "react";
import * as THREE from "three";

function ThreeBackgroundEffect() {
  const mountRef = useRef(null);

  useEffect(() => {
    let scene, camera, renderer, spheres, mouse, raycaster;
    const boundary = 3; // 增加邊界範圍
    const mount = mountRef.current;
    const minSpeed = 0.02; // 設定最小速度，防止靜止
    const numSpheres = 10; // 增加球體數量

    init();
    animate();

    function init() {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 5;
      mouse = new THREE.Vector2();
      raycaster = new THREE.Raycaster();

      renderer = new THREE.WebGLRenderer({ alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      mount.appendChild(renderer.domElement);

      // 創建球體
      spheres = [];
      const geometry = new THREE.SphereGeometry(0.5, 32, 32);
      const material = new THREE.MeshBasicMaterial({
        color: 0x06d6a0, // 修改顏色，配合濾鏡效果
        transparent: true,
        opacity: 0.2, // 設定透明度
      });
      for (let i = 0; i < numSpheres; i++) {
        const sphere = new THREE.Mesh(geometry, material);

        sphere.position.set(
          Math.random() * 6 - 3, // 更大範圍
          Math.random() * 6 - 3,
          Math.random() * 6 - 3
        );
        sphere.velocity = new THREE.Vector3(
          (Math.random() - 0.5) * 0.05,
          (Math.random() - 0.5) * 0.05,
          0
        );
        sphere.isSqueezed = false;
        sphere.originalScale = new THREE.Vector3(1, 1, 1); // 保存原始大小
        spheres.push(sphere);
        scene.add(sphere);
      }

      document.addEventListener("mousemove", onMouseMove, false);
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
      const intersects = raycaster.intersectObjects(scene.children);

      spheres.forEach((sphere, index) => {
        sphere.position.add(sphere.velocity);

        // 確保速度不會低於最小速度
        sphere.velocity.x =
          Math.sign(sphere.velocity.x) *
          Math.max(minSpeed, Math.abs(sphere.velocity.x));
        sphere.velocity.y =
          Math.sign(sphere.velocity.y) *
          Math.max(minSpeed, Math.abs(sphere.velocity.y));

        // 邊界檢測
        if (sphere.position.x > boundary || sphere.position.x < -boundary) {
          sphere.velocity.x *= -1;
        }
        if (sphere.position.y > boundary || sphere.position.y < -boundary) {
          sphere.velocity.y *= -1;
        }

        // 擴大碰撞區域 (加大滑鼠投影範圍)
        const projectionRadius = 1.5; // 設定一個擴大的碰撞半徑
        // 碰撞檢測 - 球體互相碰撞反彈
        for (let j = index + 1; j < spheres.length; j++) {
          const otherSphere = spheres[j];
          const distance = sphere.position.distanceTo(otherSphere.position);
          if (distance < 1) {
            // 反彈
            const collisionNormal = sphere.position
              .clone()
              .sub(otherSphere.position)
              .normalize();
            sphere.velocity.add(collisionNormal.multiplyScalar(0.05));
            otherSphere.velocity.sub(collisionNormal.multiplyScalar(0.05));
          }
        }

        // 確保球體會持續運動
        sphere.velocity.multiplyScalar(0.999); // 減少速度
      });

      renderer.render(scene, camera);
    }

    return () => {
      mount.removeChild(renderer.domElement);
      document.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onWindowResize);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        filter: "saturate(1) contrast(1)", // 添加 Y2K 濾鏡效果
        pointerEvents: "none",
      }}
    />
  );
}

export default ThreeBackgroundEffect;
