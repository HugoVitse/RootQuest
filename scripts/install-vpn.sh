docker-compose run --rm openvpn ovpn_genconfig -u udp://rnaxl-2a04-cec0-115d-3ec7-58af-69ae-7e5a-2513.a.free.pinggy.link:35195 -r 172.20.0.0/16 -t
sed -i '1s/.*/server-bridge 172.20.0.2 255.255.0.0 172.20.0.100 172.20.0.200/' data/openvpn.conf
docker-compose run --rm openvpn ovpn_initpki
docker-compose up -d
docker exec openvpn-server ./startup.sh