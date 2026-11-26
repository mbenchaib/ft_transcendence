#!/usr/bin/env python3

from pathlib import Path
import subprocess

ENV_FILE = Path(__file__).resolve().parents[1] / ".env"

CONTAINERS = {
    "NGINX": "ft_transcendence-nginx-1",
    "BACKEND": "ft_transcendence-backend-1",
}


def get_log_locations(container):
    details = subprocess.check_output(
        [
            "docker",
            "inspect",
            "--format",
            "{{.Id}}|{{.State.Running}}|{{.HostConfig.LogConfig.Type}}|{{.LogPath}}",
            container,
        ],
        text=True,
    ).strip()

    container_id, running, driver, path = details.split("|", 3)

    if running != "true":
        raise RuntimeError(f"Container not running: {container}")

    if driver != "json-file":
        raise RuntimeError(f"Unexpected logging driver: {container}")

    expected_dir = Path("/var/lib/docker/containers") / container_id
    expected_file = expected_dir / f"{container_id}-json.log"

    if Path(path) != expected_file:
        raise RuntimeError(f"Unexpected Docker log path: {container}")

    return str(expected_file), str(expected_dir)


def main():
    updates = {}

    for name, container in CONTAINERS.items():
        log_file, log_dir = get_log_locations(container)

        updates[f"{name}_DOCKER_LOG"] = log_file
        updates[f"{name}_DOCKER_LOG_DIR"] = log_dir

    lines = ENV_FILE.read_text().splitlines()

    old_values = {}
    kept_lines = []

    for line in lines:
        if "=" in line:
            key, value = line.split("=", 1)

            if key in updates:
                old_values[key] = value
                continue

        kept_lines.append(line)

    for key, value in updates.items():
        kept_lines.append(f"{key}={value}")

    changed = any(
        old_values.get(key) != value
        for key, value in updates.items()
    )

    if changed:
        temp = ENV_FILE.with_name(".env.tmp")
        temp.write_text("\n".join(kept_lines) + "\n")
        temp.chmod(0o600)
        temp.replace(ENV_FILE)

    print(f"LOG_PATHS_CHANGED={'yes' if changed else 'no'}")

    for key in updates:
        print(f"{key}=VERIFIED")


if __name__ == "__main__":
    main()
