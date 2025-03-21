docker-compose run --rm openvpn easyrsa revoke client1
docker-compose run --rm openvpn easyrsa gen-crl
rm -rf ./pki/issued/client1.crt ./pki/private/client1.key ./pki/reqs/client1.req
docker-compose run --rm openvpn easyrsa build-client-full client1 nopass