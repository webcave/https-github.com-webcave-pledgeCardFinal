// A simple confetti animation utility

interface ConfettiOptions {
  particleCount?: number;
  spread?: number;
  startVelocity?: number;
  decay?: number;
  gravity?: number;
  drift?: number;
  ticks?: number;
  origin?: {
    x?: number;
    y?: number;
  };
  colors?: string[];
  shapes?: string[];
  scalar?: number;
  zIndex?: number;
  disableForReducedMotion?: boolean;
}

const defaultColors = [
  "#623895", // Primary brand color
  "#4e2d76", // Darker brand color
  "#9B6DFF", // Lighter purple
  "#FFD700", // Gold
  "#FF6B6B", // Coral
  "#4ECDC4", // Teal
];

const createElements = (
  root: HTMLElement,
  elementCount: number,
  colors: string[],
) => {
  return Array.from({ length: elementCount }).map((_, index) => {
    const element = document.createElement("div");
    const color = colors[index % colors.length];
    element.style.backgroundColor = color;
    element.style.width = "10px";
    element.style.height = "10px";
    element.style.position = "absolute";
    element.style.borderRadius = "50%";
    element.style.left = "0";
    element.style.top = "0";
    element.style.opacity = "0";
    element.style.pointerEvents = "none";
    element.style.zIndex = "1000";
    root.appendChild(element);
    return element;
  });
};

const randomPhysics = (
  angle: number,
  spread: number,
  startVelocity: number,
) => {
  const radAngle = angle * (Math.PI / 180);
  const radSpread = spread * (Math.PI / 180);
  return {
    x: 0,
    y: 0,
    wobble: Math.random() * 10,
    wobbleSpeed: Math.min(0.11, Math.random() * 0.05) + 0.02,
    velocity: startVelocity * 0.5 + Math.random() * startVelocity,
    angle2D: -radAngle + (0.5 * radSpread - Math.random() * radSpread),
    angle3D: -(Math.PI / 4) + Math.random() * (Math.PI / 2),
    tiltAngle: Math.random() * Math.PI,
    tiltAngleSpeed: 0.1 + Math.random() * 0.3,
  };
};

const updateFetti = (
  fetti: any,
  progress: number,
  decay: number,
  gravity: number,
  drift: number,
) => {
  fetti.physics.x +=
    Math.cos(fetti.physics.angle2D) * fetti.physics.velocity +
    drift * Math.cos(progress * drift);
  fetti.physics.y +=
    Math.sin(fetti.physics.angle2D) * fetti.physics.velocity -
    progress * gravity;
  fetti.physics.z += Math.sin(fetti.physics.angle3D) * fetti.physics.velocity;
  fetti.physics.wobble += fetti.physics.wobbleSpeed;

  // Slow down
  fetti.physics.velocity *= decay;

  // Update angles
  fetti.physics.tiltAngle += fetti.physics.tiltAngleSpeed;

  const { x, y, tiltAngle, wobble } = fetti.physics;

  const wobbleX = x + 10 * Math.cos(wobble);
  const wobbleY = y + 10 * Math.sin(wobble);
  const transform = `translate3d(${wobbleX}px, ${wobbleY}px, 0) rotate3d(1, 1, 1, ${tiltAngle}rad)`;

  fetti.element.style.transform = transform;
  fetti.element.style.opacity = 1 - progress;
};

const animate = (
  root: HTMLElement,
  fettis: any[],
  decay: number,
  gravity: number,
  drift: number,
  ticks: number,
) => {
  let tick = 0;

  const update = () => {
    if (tick >= ticks) {
      // Clean up when animation is complete
      fettis.forEach((fetti) => {
        if (fetti.element.parentNode === root) {
          root.removeChild(fetti.element);
        }
      });
      return;
    }

    const progress = tick / ticks;

    fettis.forEach((fetti) => {
      updateFetti(fetti, progress, decay, gravity, drift);
    });

    tick += 1;
    requestAnimationFrame(update);
  };

  requestAnimationFrame(update);
};

const confetti = (options: ConfettiOptions = {}) => {
  // Default options
  const {
    particleCount = 50,
    spread = 50,
    startVelocity = 30,
    decay = 0.9,
    gravity = 1,
    drift = 0,
    ticks = 200,
    origin = { x: 0.5, y: 0.3 },
    colors = defaultColors,
    zIndex = 100,
    disableForReducedMotion = false,
  } = options;

  // Check for reduced motion preference
  if (
    disableForReducedMotion &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion)").matches
  ) {
    return;
  }

  // Create container if it doesn't exist
  let rootContainer = document.getElementById("confetti-container");
  if (!rootContainer) {
    rootContainer = document.createElement("div");
    rootContainer.id = "confetti-container";
    rootContainer.style.position = "fixed";
    rootContainer.style.top = "0";
    rootContainer.style.left = "0";
    rootContainer.style.width = "100%";
    rootContainer.style.height = "100%";
    rootContainer.style.pointerEvents = "none";
    rootContainer.style.zIndex = zIndex.toString();
    document.body.appendChild(rootContainer);
  }

  // Create confetti elements
  const elements = createElements(rootContainer, particleCount, colors);

  // Calculate window dimensions
  const rect = rootContainer.getBoundingClientRect();
  const documentWidth = rect.width;
  const documentHeight = rect.height;

  // Create fettis with physics
  const fettis = elements.map((element) => {
    const position = {
      x: origin.x * documentWidth,
      y: origin.y * documentHeight,
    };

    const physics = randomPhysics(Math.random() * 360, spread, startVelocity);

    return {
      element,
      physics,
      position,
    };
  });

  // Set initial positions
  fettis.forEach((fetti) => {
    fetti.element.style.transform = `translate3d(${fetti.position.x}px, ${fetti.position.y}px, 0)`;
  });

  // Start animation
  animate(rootContainer, fettis, decay, gravity, drift, ticks);

  return { fettis };
};

export default confetti;
