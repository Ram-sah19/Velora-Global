// Wraps an already-encoded JPEG in the smallest valid single-page A4-landscape PDF:
// the image goes in untouched through /DCTDecode, so nothing is re-compressed here.
const PAGE = '841.89 595.28';
const FIT = '841.89 0 0 595.28 0 0';
const encode = new TextEncoder();

const asBytes = (part) => (typeof part === 'string' ? encode.encode(part) : part);

function fromBase64(base64) {
  const raw = atob(base64);
  const bytes = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) bytes[i] = raw.charCodeAt(i);
  return bytes;
}

export default function pdfFromJpeg(dataUrl, width, height) {
  const jpeg = fromBase64(dataUrl.slice(dataUrl.indexOf(',') + 1));
  const parts = [];
  const offsets = [];
  let size = 0;

  const add = (part) => {
    const bytes = asBytes(part);
    parts.push(bytes);
    size += bytes.length;
  };
  const object = (id, body) => {
    offsets[id] = size;
    add(`${id} 0 obj\n${body}\nendobj\n`);
  };

  add('%PDF-1.4\n');
  object(1, '<< /Type /Catalog /Pages 2 0 R >>');
  object(2, '<< /Type /Pages /Kids [3 0 R] /Count 1 >>');
  object(3, `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE}] /Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R >>`);

  offsets[4] = size;
  add(`4 0 obj\n<< /Type /XObject /Subtype /Image /Width ${width} /Height ${height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpeg.length} >>\nstream\n`);
  add(jpeg);
  add('\nendstream\nendobj\n');

  const content = `q ${FIT} cm /Im0 Do Q`;
  object(5, `<< /Length ${content.length} >>\nstream\n${content}\nendstream\n`);

  const start = size;
  add('xref\n0 6\n0000000000 65535 f \r\n');
  for (let id = 1; id <= 5; id++) add(`${String(offsets[id]).padStart(10, '0')} 00000 n \r\n`);
  add(`trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${start}\n%%EOF\n`);

  return new Blob(parts, { type: 'application/pdf' });
}
