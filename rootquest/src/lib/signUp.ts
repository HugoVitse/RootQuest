import { connection } from '@/db';
import { FieldPacket, RowDataPacket } from 'mysql2';
import crypto from 'crypto';
import { AuthResponse } from '@/types/auth';

export default async function signUp(username : string, password: string, email: string) : Promise<AuthResponse> {
    var hash : string = crypto.createHash('sha256').update(password).digest('hex');


    const queryCheckUser : string = `SELECT COUNT(*) as count FROM users WHERE username = '${username}'`;
    const queryInsertUser : string = `INSERT INTO users (username, password, email, flags_validated, points) VALUES ('${username}', '${hash}', '${email}', '[]', 0)`;

    try {
        const rows : [RowDataPacket[],FieldPacket[]] = await connection.query<RowDataPacket[]>(queryCheckUser);
        const exists : boolean = rows[0][0].count > 0;
        if (exists) {
            throw new Error('Username already exists');
        }
        await connection.execute(queryInsertUser);
        return { success: true, message: 'User registered successfully' };
    } catch (error: unknown) {
        if (error instanceof Error) {
            return { success: false, message: error.message };
        } else {
            return { success: false, message: "Error" };
        }
    }


  
}