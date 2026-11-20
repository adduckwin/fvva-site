#!/bin/sh
# Run on the FVVA VPS after the build has been uploaded and verified.
set -eu
base=/var/www/fvva
config=/etc/nginx/sites-available/fvva
release_id=${1:?Pass the release directory name (Git commit hash)}
case "$release_id" in *[!0-9a-f]*) exit 2;; esac
release="$base/releases/$release_id"
template="$(dirname "$0")/fvva.nginx.conf"
test -f "$config" && test ! -L "$config"
test -s "$release/index.html" && test -s "$release/contact.html" && test -s "$release/404.html"

exec 9>"$base/publish.lock"
flock -x 9
work=$(mktemp -d "$base/activate-$release_id.XXXXXX")
backup="$work/previous.conf"
cp -p "$config" "$backup"
sed "s@/releases/RELEASE_ID;@/releases/$release_id;@" "$template" > "$work/candidate.conf"
grep -Fqx "    root $release;" "$work/candidate.conf"

replace_config() {
    install -m 644 "$1" "$config.next"
    mv -f "$config.next" "$config"
}

rollback() {
    replace_config "$backup"
    nginx -t && systemctl reload nginx
}

on_exit() {
    status=$?
    trap - EXIT
    if [ "$status" -ne 0 ]; then
        rollback || echo "Check Nginx and the saved configuration at $backup" >&2
    fi
    exit "$status"
}
trap on_exit EXIT
trap 'exit 1' HUP INT TERM
replace_config "$work/candidate.conf"
nginx -t
systemctl reload nginx

fetch() {
    curl --noproxy '*' --max-time 5 -sS --resolve fvva.ru:443:127.0.0.1 \
        -o "$work/response" -w '%{http_code}' "https://fvva.ru$1"
}

# New workers take over asynchronously after a successful reload.
for attempt in 1 2 3 4 5; do
    if [ "$(fetch /contact)" = 200 ] && cmp -s "$work/response" "$release/contact.html" &&
       [ "$(fetch /fvva-release-check-missing)" = 404 ] && cmp -s "$work/response" "$release/404.html"; then
        echo "Active release $release_id. Previous configuration: $backup"
        exit 0
    fi
    sleep 1
done
echo "FVVA HTTPS check failed" >&2
exit 1
