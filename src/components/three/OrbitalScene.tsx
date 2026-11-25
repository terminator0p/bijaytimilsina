"use client";
import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import type { BufferGeometry, Material } from "three";

export default function OrbitalScene() {
  const mount = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const [paused, setPaused] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const host = mount.current;
    if (!host) return;
    let cancelled = false;
    let cleanup = () => {};
    // Load the renderer only in the browser; the CSS orbital illustration stays visible until ready.
    import("three")
      .then((THREE) => {
        if (cancelled) return;
        let renderer: InstanceType<typeof THREE.WebGLRenderer>;
        try {
          renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
            powerPreference: "low-power",
          });
        } catch {
          return;
        }
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
        renderer.setClearColor(0x000000, 0);
        host.appendChild(renderer.domElement);
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
        camera.position.set(0, 0, 7.6);
        const group = new THREE.Group();
        scene.add(group);
        const geometries: BufferGeometry[] = [];
        const materials: Material[] = [];
        function mesh(geometry: BufferGeometry, material: Material) {
          geometries.push(geometry);
          materials.push(material);
          const item = new THREE.Mesh(geometry, material);
          group.add(item);
          return item;
        }
        const core = mesh(
          new THREE.IcosahedronGeometry(1.2, 1),
          new THREE.MeshStandardMaterial({
            color: 0xb3182d,
            metalness: 0.65,
            roughness: 0.22,
            flatShading: true,
          }),
        );
        const wire = mesh(
          new THREE.IcosahedronGeometry(1.205, 1),
          new THREE.MeshBasicMaterial({
            color: 0xff9ba3,
            wireframe: true,
            transparent: true,
            opacity: 0.22,
          }),
        );
        const ringA = mesh(
          new THREE.TorusGeometry(1.9, 0.013, 8, 160),
          new THREE.MeshBasicMaterial({ color: 0xff4757 }),
        );
        ringA.rotation.set(1.05, 0.35, -0.4);
        const ringB = mesh(
          new THREE.TorusGeometry(2.2, 0.007, 8, 160),
          new THREE.MeshBasicMaterial({ color: 0x72313a }),
        );
        ringB.rotation.set(-0.5, 1.05, 0.3);
        const ringC = mesh(
          new THREE.TorusGeometry(1.65, 0.008, 8, 160),
          new THREE.MeshBasicMaterial({ color: 0xffb3ac }),
        );
        ringC.rotation.set(0.25, -0.9, -0.2);
        const satellite = mesh(
          new THREE.SphereGeometry(0.12, 20, 20),
          new THREE.MeshStandardMaterial({
            color: 0xff6c78,
            emissive: 0x68101c,
            roughness: 0.2,
          }),
        );
        const moon = mesh(
          new THREE.SphereGeometry(0.07, 16, 16),
          new THREE.MeshBasicMaterial({ color: 0xffd4d0 }),
        );
        scene.add(new THREE.AmbientLight(0xffaab1, 1.4));
        const light = new THREE.DirectionalLight(0xffd3ce, 5);
        light.position.set(-3, 4, 4);
        scene.add(light);
        const fill = new THREE.PointLight(0xff243f, 40);
        fill.position.set(3, -2, 2);
        scene.add(fill);
        const pointer = { x: 0, y: 0 };
        const move = (e: PointerEvent) => {
          const r = host.getBoundingClientRect();
          pointer.x = ((e.clientX - r.left) / r.width - 0.5) * 0.5;
          pointer.y = ((e.clientY - r.top) / r.height - 0.5) * 0.4;
        };
        const leave = () => {
          pointer.x = 0;
          pointer.y = 0;
        };
        host.addEventListener("pointermove", move);
        host.addEventListener("pointerleave", leave);
        const media = window.matchMedia("(prefers-reduced-motion: reduce)");
        let visible = true;
        let frame = 0;
        let time = 0;
        let lastTime = 0;
        const render = () => renderer.render(scene, camera);
        const resize = new ResizeObserver(() => {
          const { width, height } = host.getBoundingClientRect();
          if (!width || !height) return;
          renderer.setSize(width, height);
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          render();
        });
        resize.observe(host);
        function tick(now: number) {
          frame = 0;
          if (!visible || document.hidden || pausedRef.current) {
            lastTime = 0;
            return;
          }
          time += lastTime ? Math.min((now - lastTime) / 1000, 0.05) : 0;
          lastTime = now;
          core.rotation.y = wire.rotation.y = time * 0.14;
          core.rotation.z = wire.rotation.z = 0.16;
          group.rotation.y += (pointer.x - group.rotation.y) * 0.04;
          group.rotation.x += (pointer.y - group.rotation.x) * 0.04;
          satellite.position.set(
            Math.cos(time * 0.4) * 1.9,
            Math.sin(time * 0.4) * 0.95,
            Math.sin(time * 0.4) * 1.3,
          );
          moon.position.set(
            Math.cos(time * 0.25 + 2) * 2.2,
            Math.sin(time * 0.25 + 2) * 1.8,
            -0.4,
          );
          render();
          frame = requestAnimationFrame(tick);
        }
        const resume = () => {
          if (!frame) frame = requestAnimationFrame(tick);
        };
        const observer = new IntersectionObserver(([entry]) => {
          visible = entry.isIntersecting;
          if (visible) resume();
        });
        observer.observe(host);
        const onPreference = () => {
          setPaused(media.matches);
          pausedRef.current = media.matches;
          resume();
        };
        media.addEventListener("change", onPreference);
        document.addEventListener("visibilitychange", resume);
        host.addEventListener("animation-toggle", resume);
        const lost = (event: Event) => {
          event.preventDefault();
          visible = false;
          setReady(false);
        };
        renderer.domElement.addEventListener("webglcontextlost", lost);
        satellite.position.set(1.8, 0.5, 0.5);
        moon.position.set(-1.5, -1.4, 0);
        onPreference();
        render();
        setReady(true);
        cleanup = () => {
          cancelAnimationFrame(frame);
          resize.disconnect();
          observer.disconnect();
          media.removeEventListener("change", onPreference);
          document.removeEventListener("visibilitychange", resume);
          host.removeEventListener("pointermove", move);
          host.removeEventListener("pointerleave", leave);
          host.removeEventListener("animation-toggle", resume);
          renderer.domElement.removeEventListener("webglcontextlost", lost);
          geometries.forEach((g) => g.dispose());
          materials.forEach((m) => m.dispose());
          renderer.dispose();
          renderer.domElement.remove();
        };
      })
      .catch(() => {
        /* Keep the static illustration when the optional 3D module cannot load. */
      });
    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);
  function toggle() {
    const next = !paused;
    pausedRef.current = next;
    setPaused(next);
    mount.current?.dispatchEvent(new Event("animation-toggle"));
  }
  return (
    <div className="orbital-container">
      <div className="orbital-grid" />
      <div
        className={`orbital-fallback ${ready ? "hidden" : ""}`}
        aria-hidden="true"
      >
        <i />
        <i />
        <span />
      </div>
      <div ref={mount} className="orbital-canvas" aria-hidden="true" />
      <span className="orbit-label label-code">&lt; code /&gt;</span>
      <span className="orbit-label label-create">create ✳</span>
      <span className="orbit-coordinate">IMAGINATION IN MOTION</span>
      {ready && (
        <button
          className="motion-toggle"
          onClick={toggle}
          aria-label={paused ? "Play 3D animation" : "Pause 3D animation"}
          aria-pressed={paused}
        >
          {paused ? <Play size={14} /> : <Pause size={14} />}
          <span>{paused ? "Play motion" : "Pause motion"}</span>
        </button>
      )}
    </div>
  );
}
