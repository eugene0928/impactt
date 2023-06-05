import { HttpStatus, Logger } from "@nestjs/common";
import { BaseResponse } from "@utils/base.response";

export class ServiceExceptions {

    static handle(e: any, serviceName: string, methodName: string): BaseResponse<null> {

        const logger = new Logger(ServiceExceptions.name);
        logger.error(`Service: [${serviceName}], method: [${methodName}], Error: ${e}`);

        return { status: e.code ? e.code : HttpStatus.INTERNAL_SERVER_ERROR, data: null, message: e.message };

    }

}