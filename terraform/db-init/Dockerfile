#image docker du db-init

FROM debian:bookworm-slim

#mariadb install
RUN apt-get update && \
    apt-get install -y mariadb-client && \
    rm -rf /var/lib/apt/lists/*


COPY init-db.sql /init-db.sql