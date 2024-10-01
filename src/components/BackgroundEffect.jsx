import React, { useEffect, useRef } from "react";
import * as THREE from "three";

function ThreeBackgroundEffect() {
  const mountRef = useRef(null);

  useEffect(() => {
    let scene, camera, renderer, spheres, mouse, raycaster;
    const boundary = 3; // 增加邊界範圍
    const depthBoundary = 7; // 限制深度
    const mount = mountRef.current;
    const minSpeed = 0.01; // 設定最小速度，防止靜止
    const maxSpeed = 0.02; // 設定最大速度
    const numSpheres = 20; // 增加球體數量

    init();
    animate();

    function init() {
      scene = new THREE.Scene();
      // scene.background = new THREE.Color(0x000000); // 设置背景为黑色

      // // 创建渐层背景纹理
      // const canvas = document.createElement("canvas");
      // const context = canvas.getContext("2d");
      // canvas.width = 32;
      // canvas.height = window.innerHeight;
      //
      // const gradient = context.createLinearGradient(0, 0, 0, canvas.height);
      // gradient.addColorStop(0, "#A7C7E7"); // 浅蓝色
      // gradient.addColorStop(0.5, "#76B5C5"); // 蓝绿色调渐变
      // gradient.addColorStop(1, "#E0F7FA"); // 浅青色
      //
      // context.fillStyle = gradient;
      // context.fillRect(0, 0, canvas.width, canvas.height);
      //
      // const backgroundTexture = new THREE.CanvasTexture(canvas);
      // scene.background = backgroundTexture;
      camera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      // camera.position.z = 5;
      camera.position.set(0, 0, 5); // ****超級重要调整摄像机位置，使场景在屏幕平面上
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
        opacity: 0.05, // 設定透明度
      });
      for (let i = 0; i < numSpheres; i++) {
        const sphere = new THREE.Mesh(geometry, material);

        sphere.position.set(
          Math.random() * 10 - 2, // 更大範圍
          Math.random() * 10 - 2,
          // Math.random() * 2 - 1
          Math.random() * depthBoundary * 2 - depthBoundary // Z 轴限制在较小的深度
        );
        sphere.velocity = new THREE.Vector3(
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01,
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
        // 限制速度，防止球体移动速度过快
        sphere.velocity.x = Math.max(
          -maxSpeed,
          Math.min(maxSpeed, sphere.velocity.x)
        );
        sphere.velocity.y = Math.max(
          -maxSpeed,
          Math.min(maxSpeed, sphere.velocity.y)
        );
        // 边界检测并反弹
        if (sphere.position.x > boundary || sphere.position.x < -boundary) {
          sphere.velocity.x *= -0.02; // 反向X轴速度
          sphere.position.x = THREE.MathUtils.clamp(
            sphere.position.x,
            -boundary,
            boundary
          );
        }
        if (sphere.position.y > boundary || sphere.position.y < -boundary) {
          sphere.velocity.y *= -0.02; // 反向Y轴速度
          sphere.position.y = THREE.MathUtils.clamp(
            sphere.position.y,
            -boundary,
            boundary
          );
        }
        // 限制Z轴边界并反弹
        if (
          sphere.position.z > depthBoundary ||
          sphere.position.z < -depthBoundary
        ) {
          sphere.velocity.z *= -0.02; // 反向Z轴速度
          sphere.position.z = THREE.MathUtils.clamp(
            sphere.position.z,
            -depthBoundary,
            depthBoundary
          );
        }
        // 擴大碰撞區域 (加大滑鼠投影範圍)
        const projectionRadius = 1.5; // 擴大的碰撞半徑

        // 使用滑鼠投影進行碰撞檢測
        if (intersects.length > 0) {
          intersects.forEach((intersect) => {
            const object = intersect.object;
            const distanceToMouse = mouse.distanceTo(object.position);
            if (distanceToMouse < projectionRadius) {
              // 鼠標靠近球體，讓它們加速彈開
              const direction = object.position
                .clone()
                .sub(camera.position)
                .normalize();
              object.velocity.add(direction.multiplyScalar(0.01)); // 彈開
            }
          });
        }

        // 碰撞檢測 - 球體互相碰撞反彈
        for (let j = index + 1; j < spheres.length; j++) {
          const otherSphere = spheres[j];
          const distance = sphere.position.distanceTo(otherSphere.position);
          if (distance < 1) {
            // 球體之間碰撞，反彈
            const collisionNormal = sphere.position
              .clone()
              .sub(otherSphere.position)
              .normalize();

            // 將碰撞反應應用到兩個球體
            const bounceSpeed = 0.01; // 控制反彈力度
            sphere.velocity.add(collisionNormal.multiplyScalar(bounceSpeed));
            otherSphere.velocity.sub(
              collisionNormal.multiplyScalar(bounceSpeed)
            );
            // 限制反弹后的速度
            sphere.velocity.x = Math.max(
              -maxSpeed,
              Math.min(maxSpeed, sphere.velocity.x)
            );
            sphere.velocity.y = Math.max(
              -maxSpeed,
              Math.min(maxSpeed, sphere.velocity.y)
            );
          }
        }

        // 確保球體會持續運動
        sphere.velocity.multiplyScalar(0.999); // 減少速度，避免過快
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
        filter: "saturate(1) contrast(0.5)", // 添加 Y2K 濾鏡效果
        pointerEvents: "none",
      }}
    />
  );
}

export default ThreeBackgroundEffect;
