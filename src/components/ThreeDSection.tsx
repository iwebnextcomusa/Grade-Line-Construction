/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { HelpCircle, Layers, MousePointer, VolumeX } from "lucide-react";

export default function ThreeDSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isInteractive, setIsInteractive] = useState(true);
  const [terrainMode, setTerrainMode] = useState<"wireframe" | "solid" | "points">("wireframe");

  // Keep references to Three.js objects for manipulation during events
  const stateRef = useRef({
    scene: null as THREE.Scene | null,
    camera: null as THREE.PerspectiveCamera | null,
    renderer: null as THREE.WebGLRenderer | null,
    terrainMesh: null as THREE.Mesh | null,
    terrainPoints: null as THREE.Points | null,
    geometry: null as THREE.PlaneGeometry | null,
    mouse: { x: 0, y: 0, targetX: 0, targetY: 0 },
    scrollPercent: 0,
    animationFrameId: 0,
  });

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    // Get current dimensions
    let width = container.clientWidth;
    let height = container.clientHeight || 450;

    // 1. Scene setup
    const scene = new THREE.Scene();
    scene.background = null; // transparent background so it looks modern and blends in
    stateRef.current.scene = scene;

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.set(0, 5, 10);
    camera.lookAt(0, 0, 0);
    stateRef.current.camera = camera;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    stateRef.current.renderer = renderer;

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xe67e22, 1.2); // Construction Orange hue
    dirLight1.position.set(5, 10, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x444444, 0.8);
    dirLight2.position.set(-5, -5, 5);
    scene.add(dirLight2);

    // 5. Create Terrain (Topographical mesh representing grading)
    const gridSize = 30;
    const segments = 45;
    const geometry = new THREE.PlaneGeometry(gridSize, gridSize, segments, segments);
    geometry.rotateX(-Math.PI / 2); // Make it horizontal
    stateRef.current.geometry = geometry;

    // Displace vertices to form complex 3D hills and valleys (topography)
    const updateTerrainHeights = (time = 0) => {
      const position = geometry.attributes.position;
      for (let i = 0; i < position.count; i++) {
        const x = position.getX(i);
        const z = position.getZ(i);

        // Complex wave equations to model site elevation / contour hills
        const height1 = Math.sin(x * 0.15 + time) * Math.cos(z * 0.15 + time) * 1.5;
        const height2 = Math.sin(x * 0.4 - time * 0.5) * Math.cos(z * 0.3 + time * 0.5) * 0.4;
        const height3 = Math.cos(x * 0.08) * Math.sin(z * 0.08) * 2.2; // deep valleys

        position.setY(i, height1 + height2 + height3);
      }
      geometry.computeVertexNormals();
      position.needsUpdate = true;
    };

    updateTerrainHeights(0);

    // Create Mesh representation Styles
    // A: Solid Material
    const meshMaterial = new THREE.MeshStandardMaterial({
      color: 0x2d2d2d,
      roughness: 0.6,
      metalness: 0.2,
      flatShading: true,
      transparent: true,
      opacity: 0.85,
      side: THREE.DoubleSide
    });

    // B: Wireframe overlay (Orange contour line visual)
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0xe67e22, // Grade Line Orange
      wireframe: true,
      transparent: true,
      opacity: 0.55
    });

    const terrainMesh = new THREE.Mesh(geometry, meshMaterial);
    const wireframeMesh = new THREE.Mesh(geometry, wireframeMaterial);
    terrainMesh.add(wireframeMesh);
    scene.add(terrainMesh);
    stateRef.current.terrainMesh = terrainMesh;

    // C: Elevation Points Cloud (Futuristic laser scanner GPS setup)
    const pointsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.08,
      transparent: true,
      opacity: 0.75,
    });
    const terrainPoints = new THREE.Points(geometry, pointsMaterial);
    scene.add(terrainPoints);
    stateRef.current.terrainPoints = terrainPoints;

    // Initial positioning of terrain mesh
    terrainMesh.position.set(0, -1, 0);
    terrainPoints.position.set(0, -1, 0);

    // 6. Interactive Cursor Object (representing grader/level)
    const glowGeo = new THREE.SphereGeometry(0.4, 16, 16);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0xe67e22,
      transparent: true,
      opacity: 0.85,
    });
    const cursorIndicator = new THREE.Mesh(glowGeo, glowMat);
    scene.add(cursorIndicator);

    // 7. Mouse move tracker inside element
    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      
      stateRef.current.mouse.targetX = x * 4;
      stateRef.current.mouse.targetY = y * 3;
    };

    container.addEventListener("mousemove", handleMouseMove);

    // 8. Scroll triggered animation tracking
    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how close the element is to the center of view
      const elementTop = rect.top;
      const elementHeight = rect.height;
      const scrollProgress = Math.max(0, Math.min(1, (windowHeight - elementTop) / (windowHeight + elementHeight)));
      stateRef.current.scrollPercent = scrollProgress;
    };

    window.addEventListener("scroll", handleScroll);

    // 9. Resize observer – Essential guideline for Canvas resizing
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        width = entry.contentRect.width || container.clientWidth;
        height = 420; // safe static target height

        if (stateRef.current.camera && stateRef.current.renderer) {
          stateRef.current.camera.aspect = width / height;
          stateRef.current.camera.updateProjectionMatrix();
          stateRef.current.renderer.setSize(width, height);
        }
      }
    });
    resizeObserver.observe(container);

    // 10. Animation Loop
    let clock = new THREE.Clock();
    
    const animate = () => {
      const time = clock.getElapsedTime();
      
      // Terrain waving motion
      updateTerrainHeights(time * 0.25);

      // Damp mouse coordinates for smooth lag effect
      const mouse = stateRef.current.mouse;
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // Update cursor indicator position to follow mouse on topographic terrain
      if (cursorIndicator) {
        cursorIndicator.position.set(mouse.x * 2.5, Math.sin(mouse.x)*0.5 + Math.cos(mouse.y)*0.5, mouse.y * 2.5);
      }

      // Scroll triggered rotation / translation
      const scroll = stateRef.current.scrollPercent;
      if (terrainMesh && terrainPoints) {
        terrainMesh.rotation.y = time * 0.04 + (scroll * Math.PI * 0.25);
        terrainPoints.rotation.y = time * 0.04 + (scroll * Math.PI * 0.25);
        
        terrainMesh.rotation.z = mouse.x * 0.05;
        terrainPoints.rotation.z = mouse.x * 0.05;

        // Camera positioning adapts based on scroll
        camera.position.y = 4.5 + Math.sin(scroll * Math.PI) * 2;
      }

      // Check toggled modes
      if (terrainMesh && terrainPoints) {
        if (terrainMode === "wireframe") {
          terrainMesh.visible = true;
          wireframeMesh.visible = true;
          terrainPoints.visible = true;
        } else if (terrainMode === "solid") {
          terrainMesh.visible = true;
          wireframeMesh.visible = false;
          terrainPoints.visible = false;
        } else if (terrainMode === "points") {
          terrainMesh.visible = false;
          terrainPoints.visible = true;
        }
      }

      renderer.render(scene, camera);
      stateRef.current.animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(stateRef.current.animationFrameId);
      container.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      resizeObserver.disconnect();
      geometry.dispose();
      meshMaterial.dispose();
      wireframeMaterial.dispose();
      pointsMaterial.dispose();
      glowGeo.dispose();
      glowMat.dispose();
    };
  }, [terrainMode]);

  return (
    <div 
      id="3d-grading"
      ref={containerRef} 
      className="relative w-full h-[450px] bg-gradient-to-b from-[#111111] to-[#222222] rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl flex flex-col items-center justify-center p-6 text-center"
    >
      {/* Background 3D Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
      />

      {/* Floating Control Badges */}
      <div className="absolute top-4 left-4 right-4 flex flex-wrap justify-between items-center z-10 gap-3">
        <div className="flex items-center gap-2 bg-[#222222]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-neutral-700 text-xs text-[#E67E22]">
          <Layers className="w-3.5 h-3.5 animate-pulse" />
          <span className="font-mono tracking-wider uppercase font-semibold">Active Grading Mesh</span>
        </div>

        {/* View Mode Switching controls */}
        <div className="flex items-center gap-1.5 bg-neutral-900/95 backdrop-blur-md p-1 rounded-[2px] border border-neutral-800">
          <button
            id="mesh-wire-btn"
            onClick={() => setTerrainMode("wireframe")}
            className={`px-3.5 py-1.5 rounded-[1px] text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              terrainMode === "wireframe" 
              ? "bg-[#E67E22] text-white shadow-md" 
              : "text-gray-400 hover:text-white"
            }`}
          >
            Contour Grid
          </button>
          <button
            id="mesh-solid-btn"
            onClick={() => setTerrainMode("solid")}
            className={`px-3.5 py-1.5 rounded-[1px] text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              terrainMode === "solid" 
              ? "bg-[#E67E22] text-white shadow-md" 
              : "text-gray-400 hover:text-white"
            }`}
          >
            Solid Site
          </button>
          <button
            id="mesh-points-btn"
            onClick={() => setTerrainMode("points")}
            className={`px-3.5 py-1.5 rounded-[1px] text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              terrainMode === "points" 
              ? "bg-[#E67E22] text-white shadow-md" 
              : "text-gray-400 hover:text-white"
            }`}
          >
            GPS Points
          </button>
        </div>
      </div>

      {/* Hero Overlaid Interactive Description */}
      <div className="relative z-10 max-w-lg pointer-events-none mt-auto">
        <h4 className="text-xl md:text-2xl font-semibold tracking-tight text-white mb-2 font-sans">
          Interactive Topological Grading Map
        </h4>
        <p className="text-sm text-neutral-400 font-sans leading-relaxed">
          Hover your cursor down onto the surface above to simulate heavy-duty land leveling. Move around to observe positive yard contours, precise grading angles, and our engineered GPS compaction grid.
        </p>
        
        {/* Simple cursor tooltip element */}
        <div className="mt-4 flex items-center justify-center gap-4 text-xs font-mono text-neutral-500">
          <span className="flex items-center gap-1.5">
            <MousePointer className="w-3.5 h-3.5" />
            Mouse moves terrain
          </span>
          <span className="h-3 w-px bg-neutral-800"></span>
          <span className="flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5" />
            Scroll to shift angle
          </span>
        </div>
      </div>

      {/* Decorative Grid Line styling overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(230,126,34,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(230,126,34,0.02)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none z-0" />
    </div>
  );
}
