import type { NextApiRequest, NextApiResponse } from 'next'
import { exec } from "child_process";

 
type ResponseData = {
  message: string
}
 
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {

    const command = "docker run -d --rm --network rootquest_vm-net --privileged --name ubuntu_container ubuntu-test";

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Erreur lors du démarrage du conteneur : ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Erreur dans la sortie standard : ${stderr}`);
            return;
        }
        console.log(`Sortie standard : ${stdout}`);
        var commandInfo  = `docker exec ${stdout.trim()} ip -4 addr show eth0 | grep -oP 'inet \\K[\\d.]+'`;

        exec(commandInfo, (error1, stdout1, stderr1) => {
            if (error1) {
                console.error(`Erreur lors du démarrage du conteneur : ${error1.message}`);
                return;
            }
            if (stderr1) {
                console.error(`Erreur dans la sortie standard : ${stderr}`);
                return;
            }
            console.log(`Sortie standard : ${stdout1.trim()}`);
            res.status(200).json({ message: stdout1.trim() })
        });
    });

  
}