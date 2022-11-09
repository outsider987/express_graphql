import { PrismaClient } from '@prisma/client';

class BaseService {
    public prisma: PrismaClient = new PrismaClient();
}
export default BaseService;
