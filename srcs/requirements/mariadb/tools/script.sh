#!/usr/bin/env bash
if [ ! -f "/etc/mysql/init.sql" ]; then
	echo "Setting up mariadb..."
	echo "CREATE DATABASE IF NOT EXISTS $DB_NAME;" > /etc/mysql/init.sql
	echo "CREATE USER IF NOT EXISTS '$DB_USER'@'%' IDENTIFIED BY '$DB_PASSWORD';" >> /etc/mysql/init.sql
	echo "GRANT ALL PRIVILEGES ON *.* TO '$DB_USER'@'%' WITH GRANT OPTION;" >> /etc/mysql/init.sql
	echo "FLUSH PRIVILEGES;" >> /etc/mysql/init.sql
	if [ ! -d "/var/lib/mysql/mysql" ]; then
		echo "Installing database..."
		mysql_install_db > /dev/null
	fi
	echo "done"
else
		echo "MariaDB is already set up"
fi
exec mysqld