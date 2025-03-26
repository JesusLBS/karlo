const fs = require('fs');
const path = require('path');
const pluralize = require('pluralize'); // Asegúrate de instalar esta librería con `yarn add pluralize`

const action = process.argv[2];
const moduleName = process.argv[3];
const version = process.argv[4] || 'v1'; // default to 'v1' if not provided

if (!moduleName) {
  console.error('Please provide a module name.');
  process.exit(1);
}

// Convert moduleName to singular form if it's plural
const singularModuleName = pluralize.singular(moduleName);

const baseDir = path.join(__dirname, '..', 'src', 'modules', singularModuleName);
const versionDir = path.join(baseDir, version);

if (action === 'create') {
  // Create the folders
  const dirs = [
    path.join(versionDir, 'domain', 'entities'),
    path.join(versionDir, 'domain', 'repositories'),
    path.join(versionDir, 'domain', `${singularModuleName}-cases`),
    path.join(versionDir, 'infraestructure', 'data'),
    path.join(versionDir, 'infraestructure', 'routes'),
    path.join(versionDir, 'interfaces', 'controllers'),
  ];

  dirs.forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });

  // Create corresponding files
  const files = {
    'domain/entities': `${singularModuleName}-entity.js`,
    'domain/repositories': `${singularModuleName}-repository.js`,
    'domain/dependents-cases': `${singularModuleName}-use-case.js`,
    'infraestructure/data': `${singularModuleName}-repository-impl.js`,
    'infraestructure/routes': `${singularModuleName}-router.js`,
    'interfaces/controllers': `${singularModuleName}-controller.js`,
    'index.js': '',
  };

  for (const [folder, file] of Object.entries(files)) {
    if (file) {
      fs.writeFileSync(path.join(versionDir, folder, file), '');
    }
  }

  fs.writeFileSync(path.join(versionDir, 'index.js'), '');
  fs.writeFileSync(path.join(baseDir, 'index.js'), '');

  console.log(`Module ${singularModuleName} with version ${version} created successfully.`);
} else if (action === 'rollback') {
  // Delete the module
  if (fs.existsSync(baseDir)) {
    fs.rmSync(baseDir, { recursive: true, force: true });
    console.log(`Module ${singularModuleName} with version ${version} deleted successfully.`);
  } else {
    console.error(`Module ${singularModuleName} with version ${version} does not exist.`);
  }
} else {
  console.error('Unknown action. Use "create" or "rollback".');
  process.exit(1);
}
