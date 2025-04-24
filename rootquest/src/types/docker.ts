export type DockerData = {
    image: string;
};

export type DockerResponse = {
    ip : string;
    success: boolean;
    nbflags : number;
    message : string;

}

export type IpResponse = {
    ip : string;
}

export type GameLaunchedResponse = {
    ip: string;
    host: string;
    launched: boolean;
};