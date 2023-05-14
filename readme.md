# Lightsrush

Source code of [lightsrush](https://lightsrush.com) website.

## Run the website

1. Download [the latest release of Zola](https://github.com/getzola/zola/releases)
2. Extract the archive and put the `zola` executable in the `lightsrush/` folder
3. Open a terminal and run `zola serve`

## Add a production
- Create a `.md` file in `content/productions/`
- Fill this template:

```markdown
+++
title = "Production name"
slug = "my-production-name"
date = "20XX-XX-XX"

[extra]
year = "20XX"
duration = "short|feature"
directed_by = ""
starring = ""
links = [
    "service name;link",
]
festivals = [
    "award;festival name 1",
    "festival name 2",
]
+++

Synopsis
```

- Add the poster in `static/posters/`. If the `slug` was `my-production-name`, the file should be called `my-production-name.jpeg`.
- Add the video in `static/videos/`.

## Exporting images

~ 500kB jpeg files are enough, re-export bigger files with macOS preview app and lower the quality slider.

## Exporting videos

```shell
# WebM (VP9)
ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 40 -vf scale=1920:-2 -deadline best -an output.webm

# MP4 (h265)
ffmpeg -i input.mp4 -c:v libx265 -crf 32 -vf scale=1920:-2 -preset veryslow -tag:v hvc1 -movflags faststart -an output.mp4
```