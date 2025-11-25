// Collect Browser Data (Stable + Multi-layer Fingerprinting)
export const collectBrowserData = async () => {
  const data = [];

  // Basic Navigator Info
  data.push(`userAgent:${navigator.userAgent}`);
  data.push(`language:${navigator.language}`);
  data.push(`languages:${(navigator.languages || []).join(",")}`);
  data.push(`platform:${navigator.platform}`);
  data.push(`vendor:${navigator.vendor}`);
  data.push(`deviceMemory:${navigator.deviceMemory}`);
  data.push(`hardwareConcurrency:${navigator.hardwareConcurrency}`);
  data.push(`maxTouchPoints:${navigator.maxTouchPoints}`);

  // Timezone Info
  data.push(`timezone:${Intl.DateTimeFormat().resolvedOptions().timeZone}`);
  data.push(`offset:${new Date().getTimezoneOffset()}`);

  // -----------------------------------------------------------------------
  // Normalized Canvas Fingerprint (Resolution independent)
  // -----------------------------------------------------------------------
  try {
    const canvas = document.createElement("canvas");
    canvas.width = 300;
    canvas.height = 100;
    const ctx = canvas.getContext("2d");

    ctx.textBaseline = "alphabetic";
    ctx.font = "16px Arial";
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, 300, 100);
    ctx.fillStyle = "#fff";
    ctx.fillText("DeviceSignature", 10, 50);

    const dataUrl = canvas.toDataURL("image/png", 0.1);
    data.push(`canvas:${dataUrl.slice(-60)}`);
  } catch (err) {
    data.push("canvas:error");
  }

  // -----------------------------------------------------------------------
  // WebGL Fingerprint
  // -----------------------------------------------------------------------
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");

    if (gl) {
      const debug = gl.getExtension("WEBGL_debug_renderer_info");

      if (debug) {
        data.push(
          `webglVendor:${gl.getParameter(debug.UNMASKED_VENDOR_WEBGL)}`
        );
        data.push(
          `webglRenderer:${gl.getParameter(debug.UNMASKED_RENDERER_WEBGL)}`
        );
      }

      // GPU extensions list = stable indicator of GPU + browser engine
      const ext = gl.getSupportedExtensions();
      data.push(`glExtensions:${ext ? ext.join(",") : "none"}`);
    }
  } catch (_) {
    data.push("webgl:error");
  }


  try {
    const audioCtx =
      new (window.AudioContext || window.webkitAudioContext)();

    const oscillator = audioCtx.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.value = 10000;

    const compressor = audioCtx.createDynamicsCompressor();
    compressor.threshold.value = -50;
    compressor.knee.value = 40;
    compressor.ratio.value = 12;
    compressor.attack.value = 0;
    compressor.release.value = 0.25;

    oscillator.connect(compressor);
    compressor.connect(audioCtx.destination);

    oscillator.start(0);

    const fingerprint = await new Promise((resolve) => {
      setTimeout(() => {
        const buffer = audioCtx.createAnalyser();
        compressor.connect(buffer);

        const arr = new Float32Array(buffer.frequencyBinCount);
        buffer.getFloatFrequencyData(arr);

        oscillator.stop(0);
        audioCtx.close();

        resolve(arr.slice(0, 30).join(",")); // very stable signature
      }, 50);
    });

    data.push(`audio:${fingerprint}`);
  } catch (_) {
    data.push("audio:error");
  }

  return data.join("||");
};


export const murmurhash3_32_gc = (key, seed) => {
  let remainder = key.length & 3;
  let bytes = key.length - remainder;
  let h1 = seed;

  const c1 = 0xcc9e2d51;
  const c2 = 0x1b873593;

  let i = 0;

  while (i < bytes) {
    let k1 =
      (key.charCodeAt(i) & 0xff) |
      ((key.charCodeAt(++i) & 0xff) << 8) |
      ((key.charCodeAt(++i) & 0xff) << 16) |
      ((key.charCodeAt(++i) & 0xff) << 24);
    i++;

    k1 = Math.imul(k1, c1);
    k1 = (k1 << 15) | (k1 >>> 17);
    k1 = Math.imul(k1, c2);

    h1 ^= k1;
    h1 = (h1 << 13) | (h1 >>> 19);
    h1 = (Math.imul(h1, 5) + 0xe6546b64) | 0;
  }

  let k1 = 0;

  if (remainder) {
    if (remainder >= 3)
      k1 ^= (key.charCodeAt(i + 2) & 0xff) << 16;
    if (remainder >= 2)
      k1 ^= (key.charCodeAt(i + 1) & 0xff) << 8;
    if (remainder >= 1)
      k1 ^= key.charCodeAt(i) & 0xff;

    k1 = Math.imul(k1, c1);
    k1 = (k1 << 15) | (k1 >>> 17);
    k1 = Math.imul(k1, c2);
    h1 ^= k1;
  }

  h1 ^= key.length;
  h1 ^= h1 >>> 16;
  h1 = Math.imul(h1, 0x85ebca6b);
  h1 ^= h1 >>> 13;
  h1 = Math.imul(h1, 0xc2b2ae35);
  h1 ^= h1 >>> 16;

  return (h1 >>> 0).toString(16);
};

// -----------------------------------------------------------------------
// Main Fingerprint Generator
// -----------------------------------------------------------------------
export default async function() {
  const key = "d3330091fe405c0394e4db25bf028066f67996be1898e600e2c7f96ee9bec40e";
  const stored = localStorage.getItem(key);

  if (stored) return stored;

  const raw = await collectBrowserData();
  const id = murmurhash3_32_gc(raw, 31);

  localStorage.setItem(key, id);
  return id;
}
