import { exec } from "child_process";
import util from "util";
import { vpnResponse } from "../types/vpn";


const APP_PATH = process.env.APP_PATH;

const execPromise = util.promisify(exec);

export async function createVpnClient(username : string) : Promise<vpnResponse> {
    const command_verify_docker = `${APP_PATH}/scripts/renew_certificate.sh ${username} ${APP_PATH}`;
    console.log('hai',command_verify_docker);
    const { stdout, stderr } = await execPromise(command_verify_docker);

    if (stderr) {
        console.log(stderr);
        return { success: false, message: stderr };
    }

    else {
        console.log(stdout);
        return { success: true, message: "VPN client created" };
    }

}