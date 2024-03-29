import AdminJS from 'adminjs';
import express from 'express';

import AdminJSExpress from '@adminjs/express';
import Adapter, { Database, Resource } from '@adminjs/sql';
import cors from 'cors';


const PORT = 3001;

// We'll need to register the SQL Adapter
AdminJS.registerAdapter({
	Database,
	Resource,
});



const start = async () => {
  const app = express();

  app.use(
    cors({
      origin: '*', // Zezwól na wszystkie źródła (to może być ustawienie tymczasowe w celu rozwiązania problemu)
      credentials: true, // Ustawienie na true umożliwia przesyłanie plików cookie w żądaniach
    })
  );

  app.options('*', cors());

	// This facilitates the connection to the postgres database
	const db = await new Adapter('postgresql', {
		connectionString: 'postgresql://postgres:example@localhost:5432/Blog',
		database: 'Blog',
	}).init();
	
	// We will need to create an instance of AdminJS with a basic resource fetched 
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