"""Turn the class pictures under images/ from PNG into lossless WebP.

    python3 to_webp.py

The pciSeq viewer exports PNG. Lossless WebP keeps every pixel and is less than half the size,
which keeps the site under GitHub Pages' 1 GB limit. Each WebP is read back and compared with
its PNG pixel for pixel before the PNG is deleted. Run it after every new export, then
build_data.py.
"""
import glob
import os

from PIL import Image, ImageChops

IMAGES = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'images')


def convert(png_path):
    webp_path = png_path[:-len('.png')] + '.webp'
    picture = Image.open(png_path)
    # exact keeps the colour under transparent pixels too, so the check below can pass
    picture.save(webp_path, 'WEBP', lossless=True, exact=True)
    if ImageChops.difference(picture.convert('RGBA'), Image.open(webp_path).convert('RGBA')).getbbox():
        raise ValueError(f'{webp_path} differs from {png_path}, PNG kept')
    os.remove(png_path)


def main():
    png_paths = sorted(glob.glob(os.path.join(IMAGES, '*', '*.png')))
    for png_path in png_paths:
        convert(png_path)
    print(f'{len(png_paths)} pictures converted to WebP')


if __name__ == '__main__':
    main()
