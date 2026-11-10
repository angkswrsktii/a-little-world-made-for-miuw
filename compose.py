"""Compose the Instagram story collage (1080x1920) from background-removed cutouts.

Style follows contoh.jpeg: dense overlapping cutout collage of the same person,
edge-to-edge on a near-black warm background, no text (text is added in the IG app).
"""
import glob
import os
import random
import sys

from PIL import Image, ImageEnhance, ImageFilter

Image.MAX_IMAGE_PIXELS = None

FOLDER = os.path.dirname(os.path.abspath(__file__))
CUT_DIR = os.path.join(FOLDER, "cutouts")
W, H = 1080, 1920
SEED = int(os.environ.get("SEED", "3"))

files = sorted(glob.glob(os.path.join(CUT_DIR, "*.png")))
if not files:
    print("No cutouts found - run cutout.py first")
    sys.exit(1)

rng = random.Random(SEED)
imgs = [Image.open(f).convert("RGBA") for f in files]
names = [os.path.splitext(os.path.basename(f))[0] for f in files]
idx = list(range(len(imgs)))
rng.shuffle(idx)
imgs = [imgs[i] for i in idx]
names = [names[i] for i in idx]


def cover_fit(im, cw, ch):
    """Scale and center-crop so the image fully covers a cw x ch rect."""
    scale = max(cw / im.width, ch / im.height)
    im = im.resize((max(1, round(im.width * scale)), max(1, round(im.height * scale))), Image.LANCZOS)
    x = (im.width - cw) // 2
    y = (im.height - ch) // 2
    return im.crop((x, y, x + cw, y + ch))


# --- backdrop: dimmed original photos so no black background shows ------------
canvas = Image.new("RGB", (W, H), (24, 17, 16))
originals = sorted(
    f for f in glob.glob(os.path.join(FOLDER, "*.jp*g"))
    if os.path.basename(f).lower() != "contoh.jpeg"
)
rng.shuffle(originals)
cols, rows = 2, 3
cw, ch = W // cols + 60, H // rows + 60  # slight overlap hides seams
backdrop_idx = 0
for r in range(rows):
    for c in range(cols):
        x = c * (cw - 60) + (30 if r % 2 else -30)
        y = r * (ch - 60) - 30
        src = Image.open(originals[backdrop_idx % len(originals)])
        src = ImageEnhance.Brightness(src).enhance(0.40)
        src = src.filter(ImageFilter.GaussianBlur(2))
        canvas.paste(cover_fit(src.convert("RGB"), cw, ch), (x, y))
        backdrop_idx += 1
# unify the backdrop with a dark gradient so cutouts still pop
dark = Image.new("RGB", (W, H), (16, 11, 10))
grad = Image.new("L", (1, H))
for y in range(H):
    grad.putpixel((0, y), int(255 * (0.35 + 0.25 * (y / H))))
canvas = Image.composite(dark, canvas, grad.resize((W, H)))

# --- build bands top to bottom ------------------------------------------------
# each band = a row of images at a shared target height; bands overlap so the
# frame is fully covered (like contoh.jpeg). Heights shrink toward the bottom.
n = len(imgs)
heights_pct = [0.28, 0.26, 0.24, 0.22, 0.20, 0.18, 0.17, 0.16, 0.15, 0.14]
BAND_OVERLAP = 0.30   # fraction of band height hidden under the next band
IN_ROW_OVERLAP = 0.22  # fraction of each image width hidden by its neighbour

bands = []
i = 0
for hp in heights_pct:
    if i >= n:
        break
    h = H * hp
    band, wsum = [], 0.0
    while i < n:
        im = imgs[i]
        tw = im.width * (h / im.height)
        adv = tw * (1 - IN_ROW_OVERLAP)
        if band and wsum + adv > W * 1.14:
            break
        band.append((im, names[i], h, tw, adv))
        wsum += adv
        i += 1
    # sparse band (last rows): scale photos up so they span the canvas width
    band_w = wsum + band[-1][4] * IN_ROW_OVERLAP
    if band_w < W * 0.92:
        up = min(1.8, (W * 0.98) / band_w)
        band = [(im, nm, h * up, tw * up, adv * up) for (im, nm, h, tw, adv) in band]
    bands.append(band)

# rescale band heights so the stack spans the whole canvas
span = sum(b[0][2] for b in bands) - sum(
    bands[k][0][2] * BAND_OVERLAP for k in range(len(bands) - 1)
)
factor = (H * 1.10) / span
bands = [[(im, nm, h * factor, tw * factor, adv * factor) for (im, nm, h, tw, adv) in b] for b in bands]

# --- paste ---------------------------------------------------------------------
cursor = -H * 0.02  # tiny bleed so top-row faces stay intact
for row_index, band in enumerate(bands):
    row_h = max(t[2] for t in band)
    row_w = sum(t[4] for t in band) + band[-1][3] * IN_ROW_OVERLAP
    x = (W - row_w) / 2
    # hide at most ~18% of an edge image so no slivers or near-invisible slots
    left_min = -0.18 * band[0][3]
    right_max = W - row_w + 0.82 * band[-1][3]
    x = max(min(x, right_max), left_min)
    y = cursor + rng.uniform(-14, 14)
    for j, (im, nm, t, tw, adv) in enumerate(band):
        pasted = im.resize((max(1, int(tw)), max(1, int(t))), Image.LANCZOS)
        angle = rng.uniform(2.5, 6.5) * (1 if j % 2 else -1)
        pasted = pasted.rotate(angle, expand=True, resample=Image.BICUBIC)
        px = x + rng.uniform(-8, 8)
        py = y + rng.uniform(-12, 12)
        # soft drop shadow for depth
        shadow = Image.new("RGBA", pasted.size, (0, 0, 0, 0))
        shadow.putalpha(pasted.getchannel("A").point(lambda a: int(a * 0.5)))
        shadow = shadow.filter(ImageFilter.GaussianBlur(10))
        canvas.paste(shadow, (int(px) + 3, int(py) + 12), shadow)
        canvas.paste(pasted, (int(px), int(py)), pasted)
        x += adv
    cursor = y + row_h * (1 - BAND_OVERLAP)

unused = n - i
out = os.path.join(FOLDER, "story_instagram.png")
canvas.save(out)
print(f"Saved {out}  bands={len(bands)} photos_used={i}/{n} last_cursor={cursor:.0f}")
if unused:
    print(f"WARNING: {unused} photos did not fit")
