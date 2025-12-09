import { pool } from '@/db';
import { FieldPacket, RowDataPacket } from 'mysql2';
import crypto from 'crypto';
import { AuthResponse } from '@/types/auth';

export default async function login(username : string, password: string) : Promise<AuthResponse> {
    var hash : string = crypto.createHash('sha256').update(password).digest('hex');


    const queryCheckUser : string = `SELECT COUNT(*) as count FROM users WHERE username = '${username}'`;
    const querySelectPassword : string = `SELECT username,password FROM users WHERE username = '${username}'`;

    try {
        const rows : [RowDataPacket[],FieldPacket[]] = await pool.query<RowDataPacket[]>(queryCheckUser);
        const exists : boolean = rows[0][0].count == 0;
        if (exists) {
            throw new Error('User doesnt exists');
        }
        const row : [RowDataPacket[],FieldPacket[]] = await pool.query<RowDataPacket[]>(querySelectPassword);
        if(row[0][0].password != hash) {
            throw new Error('Invalid password');
        }
        console.log("ok")
        return { success: true, message: 'User logged successfully' };
    } catch (error: unknown) {
        if (error instanceof Error) {
            return { success: false, message: error.message };
        } else {
            return { success: false, message: "Error" };
        }
    }


  
}