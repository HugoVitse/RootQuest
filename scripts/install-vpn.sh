docker-compose run --rm openvpn ovpn_genconfig -u udp://qyony-80-215-229-156.a.free.pinggy.link:37614 -r 172.20.0.0/16 -t
sed -i '1s/.*/server-bridge 172.20.0.2 255.255.0.0 172.20.0.100 172.20.0.200/' data/openvpn.conf
docker-compose run --rm openvpn ovpn_initpki
docker-compose up -d
docker exec openvpn-server ./startup.sh

