import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";

interface Point3D {
  x: number;
  y: number;
  z: number;
  isLand: boolean;
}

interface ArcPoint3D {
  x: number;
  y: number;
  z: number;
}

interface Connection {
  from: { name: string; lat: number; lon: number };
  to: { name: string; lat: number; lon: number };
  speed: number;
  offset: number;
  points: ArcPoint3D[];
  pulseProgress: number;
}

// Convert Lat/Lon to 3D Cartesian coordinates on unit sphere
const latLonToCartesian = (lat: number, lon: number) => {
  const phi = (90 - lat) * (Math.PI / 180); // colatitude
  const theta = (lon + 180) * (Math.PI / 180); // azimuthal angle
  return {
    x: Math.sin(phi) * Math.cos(theta),
    y: Math.cos(phi),
    z: Math.sin(phi) * Math.sin(theta),
  };
};

// Generate 3D arc points between two coordinates with height offset
const generateArcPoints = (
  fromLat: number,
  fromLon: number,
  toLat: number,
  toLon: number,
  steps = 40
): ArcPoint3D[] => {
  const start = latLonToCartesian(fromLat, fromLon);
  const end = latLonToCartesian(toLat, toLon);
  const points: ArcPoint3D[] = [];

  // Calculate chord distance to determine maximum arc height
  const dx = start.x - end.x;
  const dy = start.y - end.y;
  const dz = start.z - end.z;
  const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
  const maxElevation = dist * 0.25; // Arc height proportional to distance

  for (let i = 0; i <= steps; i++) {
    const t = i / steps;

    // Linear interpolation
    const lx = start.x + (end.x - start.x) * t;
    const ly = start.y + (end.y - start.y) * t;
    const lz = start.z + (end.z - start.z) * t;

    // Project back to sphere surface
    const len = Math.sqrt(lx * lx + ly * ly + lz * lz);
    const sx = lx / len;
    const sy = ly / len;
    const sz = lz / len;

    // Add altitude height
    const elevation = maxElevation * Math.sin(t * Math.PI);
    points.push({
      x: sx * (1 + elevation),
      y: sy * (1 + elevation),
      z: sz * (1 + elevation),
    });
  }

  return points;
};

// Multi-octave wave synthesis to create realistic continent-like shapes on sphere
const isLandPoint = (x: number, y: number, z: number): boolean => {
  const nx = x * 1.9;
  const ny = y * 1.9;
  const nz = z * 1.9;

  const w1 = Math.sin(nx) * Math.sin(ny) * Math.sin(nz);
  const w2 = Math.cos(nx * 2.5 + 1.2) * Math.sin(ny * 2.5) * Math.cos(nz * 2.5) * 0.5;
  const w3 = Math.sin(nx * 5.0) * Math.cos(ny * 5.0) * Math.sin(nz * 5.0) * 0.22;
  const w4 = Math.sin(nx * 10.0 + nz * 2.0) * 0.08;

  const noise = w1 + w2 + w3 + w4;
  return noise > -0.15; // Threshold controlling land/water ratio
};

// Fibonacci sphere point distribution (extremely uniform spacing)
const generateSpherePoints = (count: number): Point3D[] => {
  const points: Point3D[] = [];
  const goldenRatio = (1 + Math.sqrt(5)) / 2;
  const goldenAngle = 2 * Math.PI * (1 - 1 / goldenRatio);

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const radius = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;

    const x = Math.cos(theta) * radius;
    const z = Math.sin(theta) * radius;

    points.push({
      x,
      y,
      z,
      isLand: isLandPoint(x, y, z),
    });
  }
  return points;
};

export function GlobeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const location = useLocation();

  // Settings
  const pointCount = 1400; // Optimal count for detail + performance
  const fov = 1.0;
  const cameraDist = 2.4; // Camera distance from globe center
  const autoRotateSpeed = 0.0012; // Slow elegant spin
  const friction = 0.95; // Inertial drag damping
  const goldColor = "rgba(212, 175, 55,"; // Theme metallic gold base

  // Refs for animation state to prevent React re-renders from killing FPS
  const rotationX = useRef(0.2); // Start tilted slightly
  const rotationY = useRef(0.8);
  const speedX = useRef(0);
  const speedY = useRef(0);
  const isDragging = useRef(false);
  const lastMouseX = useRef(0);
  const lastMouseY = useRef(0);

  // Globe dimensions & positions (screen space coords)
  const globeCenter = useRef({ x: 0, y: 0 });
  const globeRadius = useRef(0);
  const isHovered = useRef(false);

  // Keep track of connection arcs
  const connectionsRef = useRef<Connection[]>([]);
  const pointsRef = useRef<Point3D[]>([]);

  // Page specific position offset (e.g. only show full on certain pages or offset on hero)
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1024);

  // Handle resizing and screen dimensions
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Initialize sphere points and connection paths
  useEffect(() => {
    pointsRef.current = generateSpherePoints(pointCount);

    const routes = [
      { from: { name: "Bangalore", lat: 12.97, lon: 77.59 }, to: { name: "London", lat: 51.50, lon: -0.12 }, speed: 0.004, offset: 0 },
      { from: { name: "Bangalore", lat: 12.97, lon: 77.59 }, to: { name: "New York", lat: 40.71, lon: -74.00 }, speed: 0.0025, offset: 0.2 },
      { from: { name: "Bangalore", lat: 12.97, lon: 77.59 }, to: { name: "Tokyo", lat: 35.67, lon: 139.65 }, speed: 0.0035, offset: 0.45 },
      { from: { name: "Bangalore", lat: 12.97, lon: 77.59 }, to: { name: "Sydney", lat: -33.86, lon: 151.20 }, speed: 0.002, offset: 0.7 },
      { from: { name: "Bangalore", lat: 12.97, lon: 77.59 }, to: { name: "Dubai", lat: 25.20, lon: 55.27 }, speed: 0.006, offset: 0.1 },
    ];

    connectionsRef.current = routes.map((r) => ({
      ...r,
      points: generateArcPoints(r.from.lat, r.from.lon, r.to.lat, r.to.lon),
      pulseProgress: r.offset,
    }));
  }, []);

  // Canvas render loop and interaction attachment
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Render loop
    const render = () => {
      if (!canvas || !ctx) return;

      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // Dynamic sizing and placement
      // On desktop, place it on the right half. On mobile, center it.
      const desktopCenterX = width * 0.72;
      const desktopCenterY = height * 0.5;
      const mobileCenterX = width * 0.5;
      const mobileCenterY = height * 0.65; // Push slightly lower on mobile to sit under header

      const targetCenterX = isDesktop ? desktopCenterX : mobileCenterX;
      const targetCenterY = isDesktop ? desktopCenterY : mobileCenterY;

      // Smoothly interpolate center coordinates to avoid snapping on screen changes
      globeCenter.current = { x: targetCenterX, y: targetCenterY };

      // Set radius based on screensize
      const maxDim = Math.min(width, height);
      globeRadius.current = isDesktop ? maxDim * 0.38 : maxDim * 0.44;
      const radius = globeRadius.current;

      // Clear canvas with transparent clear rect to allow page background gradients to show
      ctx.clearRect(0, 0, width, height);

      // Handle rotation velocities and auto-rotation
      if (!isDragging.current) {
        speedY.current *= friction;
        speedX.current *= friction;
        
        // Dynamic slow rotation, slows down on hover
        const targetAutoSpeed = isHovered.current ? autoRotateSpeed * 0.2 : autoRotateSpeed;
        rotationY.current += speedY.current + targetAutoSpeed;
        rotationX.current += speedX.current;
      } else {
        rotationY.current += speedY.current;
        rotationX.current += speedX.current;
      }

      // Clamp X rotation to prevent flipping over poles
      rotationX.current = Math.max(-Math.PI / 2.5, Math.min(Math.PI / 2.5, rotationX.current));

      const cosX = Math.cos(rotationX.current);
      const sinX = Math.sin(rotationX.current);
      const cosY = Math.cos(rotationY.current);
      const sinY = Math.sin(rotationY.current);

      // Project 3D point to 2D screen space
      const project = (p: { x: number; y: number; z: number }) => {
        // Rotate Y axis
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.x * sinY + p.z * cosY;

        // Rotate X axis
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;

        // Perspective projection
        const scale = fov / (cameraDist - z2);
        const sx = globeCenter.current.x + x1 * scale * radius;
        const sy = globeCenter.current.y - y2 * scale * radius;

        return { x: sx, y: sy, depth: z2 };
      };

      // Prepare lists of projected elements to draw in depth layers
      const backPoints: { x: number; y: number; isLand: boolean; depth: number }[] = [];
      const frontPoints: { x: number; y: number; isLand: boolean; depth: number }[] = [];

      // 1. Project all landmass & sphere surface dots
      pointsRef.current.forEach((p) => {
        const proj = project(p);
        
        // Separate back hemisphere (z < 0) from front (z >= 0)
        if (proj.depth < 0) {
          backPoints.push({ x: proj.x, y: proj.y, isLand: p.isLand, depth: proj.depth });
        } else {
          frontPoints.push({ x: proj.x, y: proj.y, isLand: p.isLand, depth: proj.depth });
        }
      });

      // 2. Draw Back Hemisphere dots (furthest away)
      backPoints.forEach((p) => {
        const opacity = (1.5 + p.depth) * 0.08; // fade out towards back edge
        ctx.fillStyle = p.isLand ? `${goldColor}${opacity})` : `${goldColor}${opacity * 0.15})`;
        const dotSize = p.isLand ? 0.8 : 0.4;
        ctx.beginPath();
        ctx.arc(p.x, p.y, dotSize, 0, 2 * Math.PI);
        ctx.fill();
      });

      // 3. Draw Grid Lines (Latitude circles and Longitude loops)
      // Draw rings on the front side of the globe
      ctx.lineWidth = 0.45;
      
      // Vertical loops (longitude grid)
      const longGridCount = 6;
      for (let j = 0; j < longGridCount; j++) {
        const lonRad = (j / longGridCount) * Math.PI;
        ctx.beginPath();
        let first = true;
        for (let a = 0; a <= 40; a++) {
          const angle = (a / 40) * 2 * Math.PI;
          const x = Math.cos(angle) * Math.cos(lonRad);
          const z = Math.cos(angle) * Math.sin(lonRad);
          const y = Math.sin(angle);

          const proj = project({ x, y, z });
          // Only draw if front-facing or close to it
          if (proj.depth > -0.2) {
            const opacity = (proj.depth + 0.2) * 0.06;
            ctx.strokeStyle = `${goldColor}${opacity})`;
            if (first) {
              ctx.moveTo(proj.x, proj.y);
              first = false;
            } else {
              ctx.lineTo(proj.x, proj.y);
            }
          }
        }
        ctx.stroke();
      }

      // Horizontal rings (latitude grid)
      const latGridLines = [-0.65, -0.32, 0, 0.32, 0.65];
      latGridLines.forEach((latY) => {
        const ringRad = Math.sqrt(1 - latY * latY);
        ctx.beginPath();
        let first = true;
        for (let a = 0; a <= 40; a++) {
          const angle = (a / 40) * 2 * Math.PI;
          const x = Math.cos(angle) * ringRad;
          const z = Math.sin(angle) * ringRad;

          const proj = project({ x, y: latY, z });
          if (proj.depth > -0.2) {
            const opacity = (proj.depth + 0.2) * 0.06;
            ctx.strokeStyle = `${goldColor}${opacity})`;
            if (first) {
              ctx.moveTo(proj.x, proj.y);
              first = false;
            } else {
              ctx.lineTo(proj.x, proj.y);
            }
          }
        }
        ctx.stroke();
      });

      // 4. Draw Front Hemisphere land dots
      frontPoints.forEach((p) => {
        if (!p.isLand) return; // Only draw water as structural grid to save performance
        const opacity = (p.depth + 0.15) * 0.45; // bright, high contrast on front face
        ctx.fillStyle = `${goldColor}${opacity})`;
        
        // Front dots are slightly larger
        const dotSize = 1.3 + p.depth * 0.8;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, dotSize, 0, 2 * Math.PI);
        ctx.fill();

        // Subtly render active dot glows for premium feel
        if (p.depth > 0.7 && Math.random() > 0.992) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, dotSize * 3, 0, 2 * Math.PI);
          ctx.fillStyle = `${goldColor}0.08)`;
          ctx.fill();
        }
      });

      // 5. Draw connection arcs & moving pulses
      connectionsRef.current.forEach((conn) => {
        // Draw the arc line path
        ctx.beginPath();
        let first = true;
        let visibleSegments = 0;
        let totalSegments = conn.points.length;

        conn.points.forEach((pt) => {
          const proj = project(pt);
          if (proj.depth > -0.15) {
            visibleSegments++;
            const opacity = (proj.depth + 0.15) * 0.22;
            ctx.strokeStyle = `${goldColor}${opacity})`;
            if (first) {
              ctx.moveTo(proj.x, proj.y);
              first = false;
            } else {
              ctx.lineTo(proj.x, proj.y);
            }
          }
        });
        
        ctx.lineWidth = 0.8;
        ctx.setLineDash([2, 4]); // Dashed blueprint look
        ctx.stroke();
        ctx.setLineDash([]); // Reset
        
        // Draw particle pulse if enough segments are visible
        if (visibleSegments > totalSegments * 0.4) {
          // Increment pulse progress
          conn.pulseProgress += conn.speed;
          if (conn.pulseProgress > 1.0) {
            conn.pulseProgress = 0;
          }

          // Find exact interpolated point along the arc points
          const indexFloat = conn.pulseProgress * (conn.points.length - 1);
          const index1 = Math.floor(indexFloat);
          const index2 = Math.min(index1 + 1, conn.points.length - 1);
          const t = indexFloat - index1;

          const p1 = conn.points[index1];
          const p2 = conn.points[index2];

          const pInterp = {
            x: p1.x + (p2.x - p1.x) * t,
            y: p1.y + (p2.y - p1.y) * t,
            z: p1.z + (p2.z - p1.z) * t,
          };

          const projPulse = project(pInterp);

          // Only draw pulse if it is in front hemisphere
          if (projPulse.depth > 0) {
            const glowOpacity = projPulse.depth * 0.8;
            
            // Outer glow radial effect
            const radGlow = ctx.createRadialGradient(
              projPulse.x,
              projPulse.y,
              1,
              projPulse.x,
              projPulse.y,
              7
            );
            radGlow.addColorStop(0, `${goldColor}${glowOpacity})`);
            radGlow.addColorStop(0.3, `${goldColor}${glowOpacity * 0.4})`);
            radGlow.addColorStop(1, `${goldColor}0)`);
            ctx.fillStyle = radGlow;
            ctx.beginPath();
            ctx.arc(projPulse.x, projPulse.y, 7, 0, 2 * Math.PI);
            ctx.fill();

            // Inner core particle
            ctx.fillStyle = `rgba(255, 255, 255, ${glowOpacity})`;
            ctx.beginPath();
            ctx.arc(projPulse.x, projPulse.y, 1.8, 0, 2 * Math.PI);
            ctx.fill();
          }
        }
      });

      // Draw subtle halo glow behind the entire globe
      const haloRadius = radius * 1.05;
      const gradHalo = ctx.createRadialGradient(
        globeCenter.current.x,
        globeCenter.current.y,
        radius * 0.9,
        globeCenter.current.x,
        globeCenter.current.y,
        haloRadius
      );
      gradHalo.addColorStop(0, "rgba(212, 175, 55, 0)");
      gradHalo.addColorStop(0.7, "rgba(212, 175, 55, 0.02)");
      gradHalo.addColorStop(1, "rgba(212, 175, 55, 0)");
      ctx.fillStyle = gradHalo;
      ctx.beginPath();
      ctx.arc(globeCenter.current.x, globeCenter.current.y, haloRadius, 0, 2 * Math.PI);
      ctx.fill();

      // Trigger next frame
      animationId = requestAnimationFrame(render);
    };

    render();

    // Mouse Move Hover Detector
    const handleGlobalMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const dx = x - globeCenter.current.x;
      const dy = y - globeCenter.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      isHovered.current = dist <= globeRadius.current * 1.15;
    };

    window.addEventListener("mousemove", handleGlobalMouseMove);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleGlobalMouseMove);
    };
  }, [isDesktop]);

  // Drag interaction logic via document listeners (to allow drag release outside canvas)
  useEffect(() => {
    const handleStart = (clientX: number, clientY: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const clickX = clientX - rect.left;
      const clickY = clientY - rect.top;

      const dx = clickX - globeCenter.current.x;
      const dy = clickY - globeCenter.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Check if clicked inside or close to the globe boundaries
      if (dist <= globeRadius.current * 1.25) {
        isDragging.current = true;
        lastMouseX.current = clientX;
        lastMouseY.current = clientY;
        speedX.current = 0;
        speedY.current = 0;
      }
    };

    const handleMove = (clientX: number, clientY: number) => {
      if (!isDragging.current) return;

      const deltaX = clientX - lastMouseX.current;
      const deltaY = clientY - lastMouseY.current;

      lastMouseX.current = clientX;
      lastMouseY.current = clientY;

      // Convert mouse pixels dragged to angle rotations
      const dragSensitivity = 0.004;
      speedY.current = deltaX * dragSensitivity;
      speedX.current = deltaY * dragSensitivity;

      rotationY.current += speedY.current;
      rotationX.current += speedX.current;
    };

    const handleEnd = () => {
      isDragging.current = false;
    };

    // Desktop mouse listeners
    const onMouseDown = (e: MouseEvent) => {
      handleStart(e.clientX, e.clientY);
    };
    const onMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX, e.clientY);
    };
    const onMouseUp = () => {
      handleEnd();
    };

    // Mobile touch listeners
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handleStart(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const onTouchEnd = () => {
      handleEnd();
    };

    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);

      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  // Hide background globe on admin routes to keep admin screens clean
  const isAdmin = location.pathname.startsWith("/admin");
  if (isAdmin) return null;

  return (
    <div className="fixed inset-0 z-0 w-full h-full pointer-events-none select-none overflow-hidden">
      {/* 
        The canvas captures drag movements dynamically, but pointer-events-none on parent keeps the general layout interactive.
        Window drag listeners handle the actual interaction coordinate calculation.
      */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block opacity-70 transition-opacity duration-1000"
      />
    </div>
  );
}
