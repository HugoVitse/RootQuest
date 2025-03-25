docker-compose run --rm openvpn ovpn_genconfig -u udp://rnvlm-2a04-cec0-1152-8ec1-897f-318a-9db9-b140.a.free.pinggy.link:35484 -r 172.18.0.0/16 -t
sed -i '1s/.*/server-bridge 172.18.0.2 255.255.0.0 172.18.0.100 172.18.0.200/' data/openvpn.conf
docker-compose run --rm openvpn ovpn_initpki
docker-compose up -d
docker exec openvpn-server ./startup.sh
