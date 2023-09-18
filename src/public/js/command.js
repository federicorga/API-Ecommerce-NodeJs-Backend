import { Command } from "commander";

const program=new Command();

program.option('-d','variable para debug',false)

.option('-p <port>', 'puerto el servidor', 8080)
.option('--mode <mode>','modo de trabajo', 'production')
.requiredOption('-u <user>', 'usuario del sistema') 


program.parse();
