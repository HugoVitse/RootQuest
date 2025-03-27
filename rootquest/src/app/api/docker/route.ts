import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";
import util from "util";

const execPromise = util.promisify(exec);

export async function GET(req: NextRequest) {
    let error_return = "";
    let ip = "";


    const command = "docker run -d --rm --network rootquest_vm-net --privileged --name ubuntu_container ubuntu-test";
    const { stdout, stderr } = await execPromise(command);

    if (stderr) {
        error_return = stderr;
    }


    const commandInfo  = `docker exec ${stdout.trim()} ip -4 addr show eth0 | grep -oP 'inet \\K[\\d.]+'`;
    const { stdout: stdout1, stderr: stderr1 } = await execPromise(commandInfo);

    if (stderr1) {
        error_return = stderr1;
    }
    ip = stdout1.trim();



    if(error_return === "") {
        return NextResponse.json({ success: true, ip: ip }, { status: 200 });
    }
    else {
        return NextResponse.json({ success: false, message: error_return }, { status: 500 });
    }
}