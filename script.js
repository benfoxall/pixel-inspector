class PixelLookup {
  #ctx;
  #size = 4;

  get(img, x, y) {
    this.canvas.width = this.canvas.height = this.#size * 2 + 1;
    this.#ctx.strokeStyle = 'rgba(255,255,255,0.5)';
    this.#ctx.drawImage(img, this.#size / 2 - x, this.#size / 2 - y);

    this.#ctx.strokeRect(this.#size - 0.5, this.#size - 0.5, 2, 2);
    const px = this.#ctx.getImageData(this.#size, this.#size, 1, 1);

    this.#ctx.strokeRect(this.#size - 0.5, this.#size - 0.5, 2, 2);
    const [r, g, b, a] = px.data;

    this.text.innerText = `rgba(${r.toString().padStart(3, ' ')}, ${g
      .toString()
      .padStart(3, ' ')}, ${b.toString().padStart(3, ' ')}, ${a
      .toString()
      .padStart(3, ' ')})`;
  }

  constructor(target) {
    this.target = target;
    this.canvas = this.target.querySelector('canvas');
    this.text = this.target.querySelector('span');
    this.#ctx = this.canvas.getContext('2d');
  }
}

const lookup = new PixelLookup(document.querySelector('output'));

document.addEventListener('mousemove', ({ offsetX, offsetY, target }) => {
  if (target instanceof HTMLImageElement) {
    const sw = target.width / target.naturalWidth;
    const sh = target.height / target.naturalHeight;

    const px = Math.floor(offsetX / sw);
    const py = Math.floor(offsetY / sh);

    lookup.get(target, px, py);
  }
});

const input = document.querySelector('input');
const img = document.querySelector('img');

input.addEventListener('change', (e) => {
  if (input.files.length > 0) {
    URL.revokeObjectURL(img.src);
    img.src = URL.createObjectURL(input.files[0]);
  }
});
