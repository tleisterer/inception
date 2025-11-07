#!/usr/bin/env bash
cd /var/www/html
if [ ! -f wp-cli.phar ]; then
	required_vars=(URL DB_NAME DB_USER DB_PASSWORD WP_ADMIN WP_ADMIN_PASSWORD WP_ADMIN_EMAIL WP_USER WP_USER_EMAIL WP_USER_PASSWORD)
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

	echo "Download wp cli tool..."
	curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar > /dev/null 1>&2
	chmod +x wp-cli.phar
	echo "Setup WordPress..."
	./wp-cli.phar core download --allow-root
	./wp-cli.phar config create --dbname="$DB_NAME" --dbuser="$DB_USER" --dbpass="$DB_PASSWORD" --dbhost=mariadb:3306 --allow-root
	[[ -z "$WP_TITLE" ]] && WP_TITLE="inception"
	./wp-cli.phar core install --url="$URL" --title="$WP_TITLE" --admin_user="$WP_ADMIN" --admin_password="$WP_ADMIN_PASSWORD" --admin_email="$WP_ADMIN_EMAIL" --allow-root
	./wp-cli.phar user create "$WP_USER" "$WP_USER_EMAIL" --user_pass="$WP_USER_PASSWORD" --allow-root
	echo "Installing redis cache..."
	./wp-cli.phar plugin install redis-cache --activate --allow-root
	./wp-cli.phar config set WP_REDIS_HOST redis --allow-root
	./wp-cli.phar config set WP_REDIS_PORT 6379 --raw --allow-root
	./wp-cli.phar config set WP_CACHE_KEY_SALT "$URL" --allow-root
	./wp-cli.phar redis enable --allow-root
	chown -R www-data:www-data /var/www/html
	echo "done"
else
	echo "WordPress is already set up"
fi


exec php-fpm8.2 -F