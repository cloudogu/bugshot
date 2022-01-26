#!/bin/bash
set -euo pipefail
IFS=$'\n\t'

ORIGIN="$1"
SIZES=(16x16 24x24 32x32 64x64 128x128 256x256 512x512)

FILENAME=$(basename -- "$ORIGIN")
FILENAME="${FILENAME%.*}"

for SIZE in ${SIZES[*]}; do
  convert -background none -format png -size ${SIZE} ${ORIGIN} ${FILENAME}-${SIZE}.png
done
