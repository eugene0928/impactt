import { Logger } from "@nestjs/common";

export class DbExceptions {

    static handle(e): {message: string} {

        const logger = new Logger(DbExceptions.name);

        logger.error(e);
        return { message: e.message };

    }

}