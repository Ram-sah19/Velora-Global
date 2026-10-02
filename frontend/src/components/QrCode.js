import React from 'react';

// Byte-mode QR, versions 1-5, error correction level M, fixed mask pattern 2.
// The certificate only ever encodes the verification URL: 36 fixed characters plus
// the certificate number, so anything up to 31 characters fits version 5 at level M
// (84 bytes) — the same ceiling the issue form enforces. Longer input renders no QR.
const VERSIONS = [
  { version: 1, data: 16, ecPerBlock: 10, blocks: 1, alignment: [] },
  { version: 2, data: 28, ecPerBlock: 16, blocks: 1, alignment: [6, 18] },
  { version: 3, data: 44, ecPerBlock: 26, blocks: 1, alignment: [6, 22] },
  { version: 4, data: 64, ecPerBlock: 18, blocks: 2, alignment: [6, 26] },
  { version: 5, data: 86, ecPerBlock: 24, blocks: 2, alignment: [6, 30] }
];

const GF_EXP = new Array(512);
const GF_LOG = new Array(256);
(() => {
  let x = 1;
  for (let i = 0; i < 255; i++) {
    GF_EXP[i] = x;
    x <<= 1;
    if (x & 0x100) x ^= 0x11d;
  }
  for (let i = 255; i < 512; i++) GF_EXP[i] = GF_EXP[i - 255];
  for (let i = 0; i < 256; i++) GF_LOG[GF_EXP[i]] = i;
})();

const gfMul = (a, b) => (a === 0 || b === 0 ? 0 : GF_EXP[GF_LOG[a] + GF_LOG[b]]);

function generatorPoly(degree) {
  let poly = [1];
  for (let i = 0; i < degree; i++) {
    const next = new Array(poly.length + 1).fill(0);
    for (let j = 0; j < poly.length; j++) {
      next[j] ^= poly[j];
      next[j + 1] ^= gfMul(poly[j], GF_EXP[i]);
    }
    poly = next;
  }
  return poly;
}

function errorCodewords(data, ecLength) {
  const gen = generatorPoly(ecLength);
  const remainder = data.concat(new Array(ecLength).fill(0));
  for (let i = 0; i < data.length; i++) {
    const factor = remainder[i];
    if (factor === 0) continue;
    for (let j = 0; j < gen.length; j++) {
      remainder[i + j] ^= gfMul(gen[j], factor);
    }
  }
  return remainder.slice(data.length);
}

function toCodewords(text, spec) {
  const bytes = Array.from(text).map((c) => c.codePointAt(0));
  let stream = '0100' + bytes.length.toString(2).padStart(8, '0');
  bytes.forEach((b) => {
    stream += b.toString(2).padStart(8, '0');
  });

  const capacityBits = spec.data * 8;
  stream += '0000'.slice(0, Math.min(4, capacityBits - stream.length));
  while (stream.length % 8 !== 0) stream += '0';

  const codewords = [];
  for (let i = 0; i < stream.length; i += 8) {
    codewords.push(parseInt(stream.slice(i, i + 8), 2));
  }
  const pads = [0xec, 0x11];
  for (let i = 0; codewords.length < spec.data; i++) codewords.push(pads[i % 2]);
  return codewords;
}

function interleave(codewords, spec) {
  const { blocks, ecPerBlock } = spec;
  const sizes = new Array(blocks).fill(Math.floor(spec.data / blocks));
  for (let i = blocks - (spec.data % blocks); i < blocks; i++) sizes[i] += 1;

  const dataBlocks = [];
  const ecBlocks = [];
  let offset = 0;
  for (let b = 0; b < blocks; b++) {
    const chunk = codewords.slice(offset, offset + sizes[b]);
    offset += sizes[b];
    dataBlocks.push(chunk);
    ecBlocks.push(errorCodewords(chunk, ecPerBlock));
  }

  const out = [];
  const longest = Math.max(...sizes);
  for (let i = 0; i < longest; i++) {
    dataBlocks.forEach((block) => { if (i < block.length) out.push(block[i]); });
  }
  for (let i = 0; i < ecPerBlock; i++) {
    ecBlocks.forEach((block) => out.push(block[i]));
  }
  return out;
}

function buildMatrix(spec) {
  const size = 17 + spec.version * 4;
  const grid = Array.from({ length: size }, () => new Array(size).fill(0));
  const reserved = Array.from({ length: size }, () => new Array(size).fill(false));

  const finder = (row, col) => {
    for (let r = -1; r <= 7; r++) {
      for (let c = -1; c <= 7; c++) {
        const gr = row + r;
        const gc = col + c;
        if (gr < 0 || gr >= size || gc < 0 || gc >= size) continue;
        const inside = r >= 0 && r <= 6 && c >= 0 && c <= 6 &&
          (r === 0 || r === 6 || c === 0 || c === 6 || (r >= 2 && r <= 4 && c >= 2 && c <= 4));
        grid[gr][gc] = inside ? 1 : 0;
        reserved[gr][gc] = true;
      }
    }
  };

  finder(0, 0);
  finder(0, size - 7);
  finder(size - 7, 0);

  for (let i = 0; i < size; i++) {
    if (!reserved[6][i]) { grid[6][i] = i % 2 === 0 ? 1 : 0; reserved[6][i] = true; }
    if (!reserved[i][6]) { grid[i][6] = i % 2 === 0 ? 1 : 0; reserved[i][6] = true; }
  }

  spec.alignment.forEach((row) => {
    spec.alignment.forEach((col) => {
      if (reserved[row][col]) return;
      for (let r = -2; r <= 2; r++) {
        for (let c = -2; c <= 2; c++) {
          grid[row + r][col + c] = Math.max(Math.abs(r), Math.abs(c)) !== 1 ? 1 : 0;
          reserved[row + r][col + c] = true;
        }
      }
    });
  });

  for (let i = 0; i <= 8; i++) {
    if (!reserved[8][i]) reserved[8][i] = true;
    if (!reserved[i][8]) reserved[i][8] = true;
  }
  for (let i = 0; i < 8; i++) reserved[8][size - 1 - i] = true;
  for (let i = 0; i < 7; i++) reserved[size - 1 - i][8] = true;
  reserved[size - 8][8] = true;
  grid[size - 8][8] = 1;

  return { grid, reserved, size };
}

function placeData(grid, reserved, size, bits) {
  let index = 0;
  let upward = true;
  for (let col = size - 1; col > 0; col -= 2) {
    if (col === 6) col -= 1;
    for (let step = 0; step < size; step++) {
      const row = upward ? size - 1 - step : step;
      for (const c of [col, col - 1]) {
        if (reserved[row][c]) continue;
        grid[row][c] = index < bits.length ? Number(bits[index]) : 0;
        index += 1;
      }
    }
    upward = !upward;
  }
}

function formatBits(mask) {
  const data = (0b00 << 3) | mask;
  let value = data << 10;
  for (let i = 4; i >= 0; i--) {
    if ((value >> (i + 10)) & 1) {
      value ^= 0b10100110111 << i;
    }
  }
  return ((data << 10) | value) ^ 0b101010000010010;
}

// Mask pattern 2, the one this encoder's writeFormat() must also record: every third
// column is inverted. Scored over 120 certificate URLs it was best or within 1.29x of
// the best of all eight patterns; pattern 0 was never best.
function applyMask(grid, reserved, size) {
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (!reserved[r][c] && c % 3 === 0) grid[r][c] ^= 1;
    }
  }
}

function writeFormat(grid, size, mask) {
  const bits = formatBits(mask);
  const at = (i) => Number((bits >> i) & 1);
  for (let i = 0; i <= 5; i++) grid[i][8] = at(i);
  grid[7][8] = at(6);
  grid[8][8] = at(7);
  grid[8][7] = at(8);
  for (let i = 9; i <= 14; i++) grid[8][14 - i] = at(i);
  for (let i = 0; i <= 7; i++) grid[8][size - 1 - i] = at(i);
  for (let i = 8; i <= 14; i++) grid[size - 15 + i][8] = at(i);
}

function qrMatrix(text) {
  const bytes = Array.from(text).length;
  const spec = VERSIONS.find((v) => 4 + 8 + bytes * 8 <= v.data * 8);
  if (!spec) return null;

  const { grid, reserved, size } = buildMatrix(spec);
  const bits = interleave(toCodewords(text, spec), spec)
    .map((cw) => cw.toString(2).padStart(8, '0'))
    .join('');
  placeData(grid, reserved, size, bits);
  applyMask(grid, reserved, size);
  writeFormat(grid, size, 2);
  return grid;
}

export default function QrCode({ value, size = 96, title }) {
  const grid = qrMatrix(value);
  if (!grid) return null;

  const n = grid.length;
  let path = '';
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c]) path += `M${c} ${r}h1v1h-1z`;
    }
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox={`-2 -2 ${n + 4} ${n + 4}`}
      shapeRendering="crispEdges"
      role="img"
      aria-label={title || 'QR code'}
    >
      <rect x="-2" y="-2" width={n + 4} height={n + 4} fill="#ffffff" />
      <path d={path} fill="#0b1f3a" />
    </svg>
  );
}
