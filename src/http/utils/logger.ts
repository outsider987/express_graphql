import logger from 'node-color-log';

export const apiLogger = (msg: string) => logger.bold().info(`start ${msg} api time`);
export const errorLogger = (msg: string) => logger.bold().bgColor('red').error(`start ${msg} api time`);
const debug = (msg: any) => {
    logger.color('cyan').debug(`\n${msg}`);
};
export const localLog = (msg: any) => {
    let logContent = '';
    if (Array.isArray(msg)) {
        // logContent+='[\n'
        // msg.forEach((m) => {

        //     switch (typeof m) {
        //         case 'string':
        //             logContent += '\t' + m;
        //             break;
        //         case 'object':

        //             logContent += '\t' + JSON.stringify(m) ;
        //             break;
        //     }
        // });
        // logContent+='\n]'
        logContent += `\n${JSON.stringify(msg)}`;
    } else {
        logContent = msg;
    }

    debug(logContent);
};
