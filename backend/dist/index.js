import AdminJS from 'adminjs';
import express from 'express';
import AdminJSExpress from '@adminjs/express';
import Adapter, { Database, Resource } from '@adminjs/sql';
const PORT = 3001;
AdminJS.registerAdapter({
    Database,
    Resource,
});
const start = async () => {
    const app = express();
    const db = await new Adapter('postgresql', {
        connectionString: 'postgresql://postgres:example@localhost:5432/Blog',
        database: 'Blog',
    }).init();
    const admin = new AdminJS({
        resources: [
            {
                resource: db.table('posts'),
                options: {
                    properties: {
                        cardContent: {
                            type: 'richtext',
                        },
                    },
                },
            },
        ],
    });
    const adminRouter = AdminJSExpress.buildRouter(admin);
    app.use(admin.options.rootPath, adminRouter);
    app.listen(PORT, () => {
        console.log(`AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`);
    });
};
start();
