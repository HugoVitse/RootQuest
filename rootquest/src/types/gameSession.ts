export type message = {
    message:string;
    sender:string;
}
export type Session = {
    host:string,
    image: string;
    players: string[];
    team1: string[];
    team2: string[];
    messages : message[];
    launched: boolean;
    team1Success: boolean;
    team2Success: boolean;
};
