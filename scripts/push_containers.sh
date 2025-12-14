#!/usr/bin/env bash
set -euo pipefail



SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
IMAGES_DIR="$SCRIPT_DIR/../images"
TERRAFORM_DIR="$SCRIPT_DIR/../terraform"
REGISTRY="rootquestdevacr.azurecr.io"
DO_PUSH=1



az acr login --name $REGISTRY




SKIP=("vpn")

if ! command -v docker >/dev/null 2>&1; then
	echo "docker is required but not found in PATH" >&2
	exit 1
fi

if [ ! -d "$IMAGES_DIR" ]; then
	echo "Images directory not found: $IMAGES_DIR" >&2
	exit 1
fi

docker build -t rootquestdevacr.azurecr.io/rootquest:latest $SCRIPT_DIR/..
docker push rootquestdevacr.azurecr.io/rootquest:latest


cd - >/dev/null || true

for dir in "$IMAGES_DIR"/*/; do
	[ -d "$dir" ] || continue
	name="$(basename "$dir")"

	# skip pattern
	skip_it=0
	for s in "${SKIP[@]}"; do
		if [ "$name" = "$s" ]; then
			skip_it=1
			break
		fi
	done
	[ "$skip_it" -eq 1 ] && continue

	# only build if there's a Dockerfile
	if [ ! -f "$dir/Dockerfile" ]; then
		continue
	fi

	# normalize registry (remove trailing slash if any)
	if [ -n "$REGISTRY" ]; then
		registry_clean="${REGISTRY%/}"
		tag="$registry_clean/$name:latest"
	else
		tag="$name:latest"
	fi

	docker build -t "$tag" "$dir"

	if [ "${DO_PUSH}" = "1" ]; then
		docker push "$tag"
	fi
done

exit 0

