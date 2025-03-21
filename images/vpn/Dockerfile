FROM kylemanna/openvpn

# Copier ton script shell dans le conteneur
COPY ./bridge-start.sh /startup.sh
RUN chmod +x /startup.sh

CMD ["ovpn_run"]
