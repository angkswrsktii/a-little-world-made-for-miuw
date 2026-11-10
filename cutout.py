"""Remove backgrounds from all photos in the folder using rembg."""
import os
import sys
import glob

from PIL import Image, ImageOps
from rembg import remove, new_session

FOLDER = os.path.dirname(os.path.abspath(__file__))
OUT_DIR = os.path.join(FOLDER, "cutouts")
MAX_SIDE = 1300  # cutouts never appear larger than ~900px in the 1080x1920 story

os.makedirs(OUT_DIR, exist_ok=True)

files = sorted(
    f for f in glob.glob(os.path.join(FOLDER, "*.jpg")) + glob.glob(os.path.join(FOLDER, "*.jpeg"))
    if os.path.basename(f).lower() != "contoh.jpeg"
)

session_main = new_session("isnet-general-use")
session_human = new_session("u2net_human_seg")


def subject_stats(img):
    """Return fraction of opaque pixels of an RGBA image."""
    alpha = img.getchannel("A")
    hist = alpha.histogram()
    total = img.width * img.height
    opaque = sum(hist[200:])
    return opaque / total


def run_model(img, session):
    out = remove(img, session=session)
    stats = subject_stats(out)
    return out, stats


report = []
for path in files:
    name = os.path.splitext(os.path.basename(path))[0]
    out_path = os.path.join(OUT_DIR, name + ".png")
    try:
        img = Image.open(path)
        img = ImageOps.exif_transpose(img).convert("RGB")
        img.thumbnail((MAX_SIDE, MAX_SIDE), Image.LANCZOS)

        out, stats = run_model(img, session_main)
        model_used = "isnet"
        # suspicious masks: nearly empty or nearly full frame -> try human model
        if stats < 0.10 or stats > 0.90:
            out2, stats2 = run_model(img, session_human)
            if 0.10 <= stats2 <= 0.90:
                out, stats, model_used = out2, stats2, "human_seg"

        # crop to subject bounding box with a little padding
        bbox = out.getbbox()
        if bbox:
            pad = 6
            bbox = (
                max(0, bbox[0] - pad),
                max(0, bbox[1] - pad),
                min(out.width, bbox[2] + pad),
                min(out.height, bbox[3] + pad),
            )
            out = out.crop(bbox)
        out.save(out_path)
        report.append(f"OK  {name}  model={model_used}  cov={stats:.2f}  size={out.width}x{out.height}")
    except Exception as e:  # keep going on failures, report at the end
        report.append(f"FAIL {name}: {e}")
    print(report[-1], flush=True)

fails = [r for r in report if r.startswith("FAIL")]
print(f"\nDone: {len(report) - len(fails)} ok, {len(fails)} failed out of {len(files)}")
sys.exit(1 if fails else 0)
