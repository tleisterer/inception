#!/usr/bin/env bash
required_vars=(URL BONUS_URL)
missing=()
for var in "${required_vars[@]}"; do
	if [[ -z "${!var}" ]]; then
		missing+=("$var")
	fi
done

if (( ${#missing[@]} > 0 )); then
	echo "Missing required environment variables: ${missing[*]}"
	exit 1
fi

cat /etc/nginx/sites-available/default > /etc/nginx/sites-available/default.bak
envsubst '$URL,$BONUS_URL' < /etc/nginx/sites-available/default.bak > /etc/nginx/sites-available/default
exec nginx -g 'daemon off;'