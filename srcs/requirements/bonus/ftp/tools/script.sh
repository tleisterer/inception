#!/usr/bin/env bash
required_vars=(FTP_USER FTP_PASSWORD)
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

if ! id "$FTP_USER" &> /dev/null ; then
	echo "Creating user $FTP_USER..."
	adduser --home /home/ftp --no-create-home "$FTP_USER" --disabled-password --gecos "" > /dev/null
	echo "$FTP_USER:$FTP_PASSWORD" | /usr/sbin/chpasswd > /dev/null
	echo "$FTP_USER" | tee -a /etc/vsftpd.userlist > /dev/null
	echo "done"
fi

exec /usr/sbin/vsftpd /etc/vsftpd.conf