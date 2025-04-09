FROM ubuntu:22.04

# --- Install outils nécessaires ---
RUN apt update && apt install -y socat netcat iproute2 iputils-ping curl vim

# --- Ajoute le binaire vulnérable ---
COPY vuln_bin /vuln
RUN chmod +x /vuln

# --- Crée l'ambiance prison ---
RUN mkdir /cell /logs /proto && \
    echo "== Accès restreint ==" > /cell/README && \
    echo "Nom du détenu: #042 - Surveillance active..." > /logs/log1.txt && \
    echo "Protocole de communication expérimental détecté sur port 1337" > /proto/alert.txt

# --- Message d’accueil RP ---
RUN echo '\n\
██╗ █████╗ ██╗     ██████╗ ██████╗ ███████╗██████╗ ██╗██████╗ \n\
██║██╔══██╗██║     ██╔══██╗██╔══██╗██╔════╝██╔══██╗██║██╔══██╗\n\
██║███████║██║     ██████╔╝██████╔╝█████╗  ██████╔╝██║██║  ██║\n\
██║██╔══██║██║     ██╔═══╝ ██╔═══╝ ██╔══╝  ██╔══██╗██║██║  ██║\n\
██║██║  ██║███████╗██║     ██║     ███████╗██║  ██║██║██████╔╝\n\
╚═╝╚═╝  ╚═╝╚══════╝╚═╝     ╚═╝     ╚══════╝╚═╝  ╚═╝╚═╝╚═════╝ \n\
>>> Bienvenue dans le protocole de confinement PX-1337.\n\
>>> Toute tentative de communication sera enregistrée.\n' > /etc/motd

# --- Personnalise le shell pour le fun ---
RUN echo "export PS1='[Prisonnier #042] \\w >> '" >> /root/.bashrc

# --- Lance le service vulnérable sur le port 1337 ---
EXPOSE 1337
CMD ["socat", "TCP-LISTEN:1337,reuseaddr,fork", "EXEC:/vuln"]
