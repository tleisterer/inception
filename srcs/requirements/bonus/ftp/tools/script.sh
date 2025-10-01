#!/usr/bin/env bash
if ! id "$FTP_USER" &> /dev/null ; then
	echo "Creating user $FTP_USER..."
	adduser --home /home/ftp --no-create-home $FTP_USER --disabled-password --gecos "" > /dev/null
	echo "$FTP_USER:$FTP_PASSWORD" | /usr/sbin/chpasswd > /dev/null
	echo "$FTP_USER" | tee -a /etc/vsftpd.userlist > /dev/null
	echo "done"
fi

exec /usr/sbin/vsftpd /etc/vsftpd.conf