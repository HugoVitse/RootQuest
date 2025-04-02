if [ $# -ne 2 ]; then
    echo "Usage: $0 <argument>"
    exit 1
fi

# Récupérer l'argument
arg=$1
path=$2

echo "hugo" | docker-compose run --rm openvpn easyrsa revoke $arg
echo "hugo" | docker-compose run --rm openvpn easyrsa gen-crl
rm -rf $path/data/pki/issued/$arg.crt $path/data/pki/private/$arg.key $path/data/pki/reqs/$arg.req
docker-compose run --rm -e EASYRSA_PASSIN=pass:hugo openvpn easyrsa build-client-full $arg nopass
docker-compose run --rm openvpn ovpn_getclient $arg > $path/userProfiles/$arg.ovpn   
 