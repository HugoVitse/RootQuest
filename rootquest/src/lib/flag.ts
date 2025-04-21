import { connection } from '@/db';
import { AuthResponse } from '@/types/auth';
import { ImageRow, Image, FlagRow, UserRow } from '@/types/image';

export default async function validateFlag(username : string, flag_to_check: string, image: string, flag_number:number) : Promise<AuthResponse> {
    

    const queryGetFlags : string = `SELECT flags FROM images WHERE image = '${image}'`;

    try {
        //get id of the flag
        const [rows]  = await connection.query<ImageRow[]>(queryGetFlags);

        const images: Image[] = rows.map(row => ({
            image: row.image,
            name: row.name,
            flags: row.flags,
            duo : row.duo,
        }));
        const flag_id = images[0].flags[flag_number];


        // get the flag from the id
        const queryGetFlag : string = `SELECT flag FROM flags WHERE id = '${flag_id}'`;
        const [rows_flag]  = await connection.query<FlagRow[]>(queryGetFlag);

        const flag = rows_flag[0].flag;

        // check if the flag is correct
        if(flag_to_check !== flag) {
            throw new Error("Flag not correct");
        }


        // if it is correct, get the array of flags validated from the user
        const queryGetUserFlags : string = `SELECT flags_validated FROM users WHERE username = '${username}'`;
        const [rows_user]  = await connection.query<UserRow[]>(queryGetUserFlags);

        const user: UserRow = rows_user[0];
        let flags_validated = user.flags_validated;

        if(flags_validated === null) {
            flags_validated = [];
        }

        console.log(flags_validated)

        // check if the flag is already validated
        let msg = "Flag already validated";

        if (!flags_validated.includes(flag_id)) {
            flags_validated.push(flag_id);
            const queryUpdateUser : string = `UPDATE users SET flags_validated = '${JSON.stringify(flags_validated)}' WHERE username = '${username}'`;
            await connection.query(queryUpdateUser);
            msg = "Continue";
        }   
        
        return { success: true, message: msg };

    } catch (error: unknown) {
        if (error instanceof Error) {
            return { success: false, message: error.message };
        } else {
            return { success: false, message: "Error" };
        }
    }


  
}