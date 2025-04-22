import { exec } from "child_process";
import { RowDataPacket, FieldPacket } from "mysql2";
import util from "util";
import {connection } from '@/db';
import { DockerResponse } from "../types/docker";
import { ImageRow } from "@/types/image";

const execPromise = util.promisify(exec);

export async function containerExists(image : string) : Promise<boolean> {
    const command_verify_docker = `docker ps --filter "name=${image}"`;
    const { stdout, stderr } = await execPromise(command_verify_docker);

    if (stderr) {
        return true;
    }

    else {
        if (stdout.trim().includes(image)) {
            return true;
        }
        else {
            return false;
        }
    }

}

export async function startContainer(image : string, username: string) : Promise<DockerResponse> {

    const querySelectImages : string = `SELECT * FROM images WHERE duo = 0`;


    try {
        const [rows] = await connection.query<ImageRow[]>(querySelectImages);
        const imageExists = (element:any) => element.image === image;
        const exists : boolean = rows.some(imageExists);
    

        const imageRow = rows.find(row => row.image === image);
        if (!imageRow) {
            throw new Error('Image not found in database');
        }
        const flagCount = imageRow.flags.length;
        console.log(flagCount)

        if (!exists) {
            throw new Error('Image doesnt exists');
        }
        let image_name = `${image}_${username}`

        if(await containerExists(image_name)) {
            const commandInfo  = `docker exec ${image_name} ip -4 addr show eth0 | grep -oP 'inet \\K[\\d.]+'`;
            const { stdout: stdout1, stderr: stderr1 } = await execPromise(commandInfo);
            return { ip : stdout1, success: true, nbflags:flagCount, message: "ip" };
        }

        const command = `docker run -d --rm --network rootquest_vm-net --privileged --name ${image_name} ${image}`;
        const { stdout, stderr } = await execPromise(command);

        if (stderr) {
            throw new Error(stderr);
        }

        const commandInfo  = `docker exec ${stdout.trim()} ip -4 addr show eth0 | grep -oP 'inet \\K[\\d.]+'`;
        const { stdout: stdout1, stderr: stderr1 } = await execPromise(commandInfo);

        if (stderr1) {
            throw new Error(stderr1);
        }
        const ip = stdout1.trim();
        return { ip: ip, success: true ,  nbflags:flagCount, message: ""};

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error starting container:", error);
            return { ip : "", success: false, nbflags:0, message: error.message };
        } else {
            return { ip : "", success: false,  nbflags:0, message: "Error" };
        }
    }

}

export async function stopContainer(image : string, username: string) : Promise<DockerResponse> {
    const querySelectImages : string = `SELECT * FROM images`;


    try {
        const rows : [RowDataPacket[],FieldPacket[]] = await connection.query<RowDataPacket[]>(querySelectImages);
        const imageExists = (element:any) => element.image === image;
        const exists : boolean = rows[0].some(imageExists);
        if (!exists) {
            throw new Error('Image doesnt exists');
        }
        let image_name = `${image}_${username}`

        if(!await containerExists(image_name)) {
            throw new Error("Container not even started");
        }

        const command = `docker stop ${image_name}`;
        const { stdout, stderr } = await execPromise(command);

        if (stderr) {
            throw new Error(stderr);
        }

       
        return { ip:  "", success: true , message: "",  nbflags:0};

    } catch (error: unknown) {
        if (error instanceof Error) {
            return { ip : "", success: false, message: error.message, nbflags:0 };
        } else {
            return { ip : "", success: false, message: "Error" , nbflags:0};
        }
    }
}