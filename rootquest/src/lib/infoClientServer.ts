import { UserRow } from "@/types/image";
import { pool } from "@/db";
import { RowDataPacket } from "mysql2";

interface UserRankRow extends RowDataPacket {

    rank: number;
}

export async function fetchUserData(username: string) {
    const queryGetUserFlags : string = `SELECT flags_validated,points FROM users WHERE username = '${username}'`;
    const [rows_user]  = await pool.query<UserRow[]>(queryGetUserFlags);
    const nb_flags = rows_user[0].flags_validated.length;
    const points = rows_user[0].points;


    const queryRank : string = `SELECT COUNT(*) as rank FROM users WHERE points > ${points}`;
    const [rows_rank]  = await pool.query<UserRankRow[]>(queryRank);
    const rank = rows_rank[0].rank + 1;
    
    return { nb_flags, points, rank };

}