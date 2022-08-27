declare const dbConfig: {
    database: string | undefined;
    username: string | undefined;
    password: string | undefined;
    host: string | undefined;
    port: string | undefined;
    dialect: string;
    dialectOptions: {
        encrypt: boolean;
    };
};
