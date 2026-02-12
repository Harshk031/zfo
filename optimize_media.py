import os
import subprocess

public_dir = r"d:\ffreshozz\ffreshozz-next\public"

# 1. Generate Poster for Polar Bear Video
video_path = os.path.join(public_dir, "polar-bear.mp4")
poster_path = os.path.join(public_dir, "polar-bear-poster.jpg")

if os.path.exists(video_path):
    print(f"Generating poster for {video_path}...")
    # Extract frame at 00:00:01 usually avoids black frames
    cmd = f'ffmpeg -y -i "{video_path}" -ss 00:00:01 -vframes 1 -q:v 2 "{poster_path}"'
    subprocess.run(cmd, shell=True)
else:
    print(f"Video not found: {video_path}")

# 2. Compress Images to WebP
images_to_compress = [
    "article-1-thumbnail.jpg",
    "article-2-thumbnail.png",
    "article-3-thumbnail.png",
    "article-4-thumbnail.png",
    "bottle3.png",
    "truth-bomb-thumbnail.jpg"
]

for img_name in images_to_compress:
    input_path = os.path.join(public_dir, img_name)
    output_name = os.path.splitext(img_name)[0] + ".webp"
    output_path = os.path.join(public_dir, output_name)
    
    if os.path.exists(input_path):
        print(f"Compressing {img_name} to WebP...")
        # -q 80 for good quality/size balance
        # -resize 1200:-1 to ensure width isn't massive (preserving aspect ratio)
        cmd = f'ffmpeg -y -i "{input_path}" -vf "scale=1200:-1" -q:v 80 "{output_path}"'
        subprocess.run(cmd, shell=True)
    else:
        print(f"Image not found: {input_path}")
