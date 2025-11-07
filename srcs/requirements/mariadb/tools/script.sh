#!/usr/bin/env bash
if [ ! -f "/etc/mysql/init.sql" ]; then
	required_vars=(DB_NAME DB_USER DB_PASSWORD DB_ROOTPASSWORD)
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

	echo "Setting up mariadb..."
	echo "CREATE DATABASE IF NOT EXISTS $DB_NAME;" > /etc/mysql/init.sql
	echo "CREATE USER IF NOT EXISTS '$DB_USER'@'%' IDENTIFIED BY '$DB_PASSWORD';" >> /etc/mysql/init.sql
	echo "GRANT ALL PRIVILEGES ON *.* TO '$DB_USER'@'%' WITH GRANT OPTION;" >> /etc/mysql/init.sql
	echo "ALTER USER 'root'@'localhost' IDENTIFIED BY '$DB_ROOTPASSWORD';"  >> /etc/mysql/init.sql
	echo "DELETE FROM mysql.user WHERE User='';" >> /etc/mysql/init.sql
	echo "FLUSH PRIVILEGES;" >> /etc/mysql/init.sql
fi
if [ ! -d "/var/lib/mysql/mysql" ]; then
	echo "Installing database..."
	mysql_install_db > /dev/null
fi
echo "done"
echo "MariaDB is set up"

exec mysqld