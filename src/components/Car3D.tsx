import { useEffect, useRef } from "react";
import * as THREE from "three";

interface Car3DProps {
  color?: string;
  bg?: "light" | "dark";
  className?: string;
}

export default function Car3D({ color = "#B8B8B8", bg = "dark", className = "" }: Car3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const carRef = useRef<any>(null);
  const frameRef = useRef<number>(0);
  const drag = useRef(false);
  const px = useRef(0);
  const ry = useRef(0);
  const auto = useRef(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const w = el.clientWidth, h = el.clientHeight;
    if (!w || !h) return;

    const bgc = bg === "light" ? 0xf0f0f2 : 0x0a0a0c;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(bgc);
    scene.fog = new THREE.Fog(bgc, 10, 22);

    const cam = new THREE.PerspectiveCamera(42, w / h, 0.1, 100);
    cam.position.set(5, 2.3, 5.5);
    cam.lookAt(0, 0.2, 0);

    const r = new THREE.WebGLRenderer({ antialias: true });
    r.setSize(w, h);
    r.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    r.shadowMap.enabled = true;
    r.toneMapping = THREE.ACESFilmicToneMapping;
    r.toneMappingExposure = 1.15;
    el.innerHTML = "";
    el.appendChild(r.domElement);

    const il = bg === "light" ? 0.7 : 0.45;
    scene.add(new THREE.AmbientLight(0xffffff, il));
    const dl = new THREE.DirectionalLight(0xffffff, bg === "light" ? 1 : 0.9);
    dl.position.set(5, 8, 5); dl.castShadow = true; scene.add(dl);
    scene.add(new THREE.DirectionalLight(bg === "light" ? 0xffffff : 0x4488ff, 0.3).translateX(-5).translateY(3).translateZ(-5));

    const gc = bg === "light" ? 0xe0e0e0 : 0x111113;
    const gnd = new THREE.Mesh(new THREE.PlaneGeometry(20, 20), new THREE.MeshStandardMaterial({ color: gc, roughness: 0.9 }));
    gnd.rotation.x = -Math.PI / 2; gnd.position.y = -0.5; gnd.receiveShadow = true; scene.add(gnd);

    const car = new THREE.Group();
    const bm = new THREE.MeshStandardMaterial({ color: new THREE.Color(color), metalness: 0.82, roughness: 0.16 });
    const gm = new THREE.MeshStandardMaterial({ color: 0x0a1628, metalness: 0.95, roughness: 0.05, transparent: true, opacity: 0.72 });

    const body = new THREE.Mesh(new THREE.BoxGeometry(3.5, 0.55, 1.55), bm);
    body.position.y = 0.42; body.castShadow = true; car.add(body);
    const hood = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.1, 1.48), bm);
    hood.position.set(1.15, 0.72, 0); hood.rotation.z = -0.15; car.add(hood);
    const trunk = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.1, 1.45), bm);
    trunk.position.set(-1.3, 0.72, 0); trunk.rotation.z = 0.2; car.add(trunk);
    const cabin = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.5, 1.4), gm);
    cabin.position.set(-0.1, 0.92, 0); car.add(cabin);
    const ws = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.44, 1.32), gm);
    ws.position.set(0.62, 0.88, 0); ws.rotation.z = 0.4; car.add(ws);
    const rg = ws.clone(); rg.position.set(-0.88, 0.86, 0); rg.rotation.z = -0.35; car.add(rg);

    const tm = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.9 });
    const rm = new THREE.MeshStandardMaterial({ color: 0xcccccc, metalness: 0.9, roughness: 0.2 });
    [[1.1, 0.82], [1.1, -0.82], [-1.1, 0.82], [-1.1, -0.82]].forEach(([x, z]) => {
      const g = new THREE.Group();
      const t = new THREE.Mesh(new THREE.CylinderGeometry(0.33, 0.33, 0.22, 24), tm);
      t.rotation.x = Math.PI / 2; g.add(t);
      const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.23, 6), rm);
      rim.rotation.x = Math.PI / 2; g.add(rim);
      g.position.set(x, 0.15, z); car.add(g);
    });

    const hlm = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffcc, emissiveIntensity: 0.7 });
    [[1.77, 0.4], [1.77, -0.4]].forEach(([x, z]) => { const h = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.07, 0.4), hlm); h.position.set(x, 0.44, z); car.add(h); });
    const tlm = new THREE.MeshStandardMaterial({ color: 0xff1111, emissive: 0xff0000, emissiveIntensity: 0.5 });
    [[-1.77, 0.4], [-1.77, -0.4]].forEach(([x, z]) => { const t = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.07, 0.35), tlm); t.position.set(x, 0.44, z); car.add(t); });
    const bar = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.025, 1.3), tlm);
    bar.position.set(-1.77, 0.5, 0); car.add(bar);

    carRef.current = { group: car, body, hood, trunk };
    scene.add(car);

    const onD = (e: any) => { drag.current = true; px.current = e.clientX || e.touches?.[0]?.clientX; auto.current = false; };
    const onM = (e: any) => { if (!drag.current) return; const x = e.clientX || e.touches?.[0]?.clientX; ry.current += (x - px.current) * 0.008; px.current = x; };
    const onU = () => { drag.current = false; setTimeout(() => auto.current = true, 2500); };
    el.addEventListener("mousedown", onD); el.addEventListener("mousemove", onM);
    el.addEventListener("touchstart", onD, { passive: true }); el.addEventListener("touchmove", onM, { passive: true });
    window.addEventListener("mouseup", onU); window.addEventListener("touchend", onU);

    const anim = () => { frameRef.current = requestAnimationFrame(anim); if (auto.current) ry.current += 0.004; car.rotation.y = ry.current; r.render(scene, cam); };
    anim();

    const onR = () => { const nw = el.clientWidth, nh = el.clientHeight; if (!nw || !nh) return; r.setSize(nw, nh); cam.aspect = nw / nh; cam.updateProjectionMatrix(); };
    window.addEventListener("resize", onR);
    return () => { cancelAnimationFrame(frameRef.current); window.removeEventListener("resize", onR); window.removeEventListener("mouseup", onU); window.removeEventListener("touchend", onU); r.dispose(); };
  }, [bg]);

  useEffect(() => {
    if (!carRef.current) return;
    [carRef.current.body, carRef.current.hood, carRef.current.trunk].forEach((m: any) => m.material.color.set(color));
  }, [color]);

  return <div ref={ref} className={"w-full h-full cursor-grab active:cursor-grabbing select-none " + className} />;
}
