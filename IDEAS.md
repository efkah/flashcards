# Serving & Hosting

## Internet Adresse

Preise prüfen
Woher bekomme ich eine Adresse?

## Hosting

z.b. https://www.mongodb.com/de-de/cloud/atlas/register für DB
"Free forever" bis zu 512 MB
https://help.pythonanywhere.com/pages/MongoDB/

user: admin / pw: 2YuBvsjdQr9Xr9n0

Und Python anywhere
https://www.pythonanywhere.com/user/efkah/consoles/#
auch "free" - yeah

## Self-Hosting

ssh username@ip.adress.of.pi
pip install uvicorn
scp /path/to/file username@a:/path/to/destination
uvicorn main:app --reload
=> Hosting sollte klappen

sudo crontab -e

> HOME=/home/pi
> @reboot python3 -m uvicorn --host 0.0.0.0 main:app &
> => Hosting beim reboot des pis

dyndns:
https://www.matthias-petrat.com/anleitung-fernzugriff-eines-raspberry-pi-mit-dyndns-einrichten/
https://engineerworkshop.com/blog/connecting-your-raspberry-pi-web-server-to-the-internet/
