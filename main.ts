import { app, BrowserWindow, screen, ipcMain, MenuItem, Menu, MenuItemConstructorOptions, shell } from 'electron';
import * as path from 'path';
import * as url from 'url';
import * as fs from 'fs';
import Bunny from './src/app/entities/bunny.schema';
import * as sqlite from 'sqlite';
import { Database } from 'sqlite';
import * as log from 'electron-log';

log.info('Application starting');
let win, serve;
const args = process.argv.slice(1);
// This is basically a surrogate for 'dev' environment
serve = args.some(val => val === '--serve');

// const template = [
//   // // { role: 'appMenu' }
//   // ...(process.platform === 'darwin' ? [{
//   //   label: app.getName(),
//   //   submenu: [
//   //     {role: 'about'},
//   //     {type: 'separator'},
//   //     {role: 'services'},
//   //     {type: 'separator'},
//   //     {role: 'hide'},
//   //     {role: 'hideothers'},
//   //     {role: 'unhide'},
//   //     {type: 'separator'},
//   //     {role: 'quit'}
//   //   ]
//   // }] : []),
//   // // { role: 'fileMenu' }
//   // {
//   //   label: 'File',
//   //   submenu: [
//   //     is.macOS() ? {role: 'close'} : {role: 'quit'}
//   //   ]
//   // },
//   // // { role: 'editMenu' }
//   // {
//   //   label: 'Edit',
//   //   submenu: [
//   //     {role: 'undo'},
//   //     {role: 'redo'},
//   //     {type: 'separator'},
//   //     {role: 'cut'},
//   //     {role: 'copy'},
//   //     {role: 'paste'},
//   //     ...(is.macOS() ? [
//   //       {role: 'pasteAndMatchStyle'},
//   //       {role: 'delete'},
//   //       {role: 'selectAll'},
//   //       {type: 'separator'},
//   //       {
//   //         label: 'Speech',
//   //         submenu: [
//   //           {role: 'startspeaking'},
//   //           {role: 'stopspeaking'}
//   //         ]
//   //       }
//   //     ] : [
//   //       {role: 'delete'},
//   //       {type: 'separator'},
//   //       {role: 'selectAll'}
//   //     ])
//   //   ]
//   // },
//   // // { role: 'viewMenu' }
//   // {
//   //   label: 'View',
//   //   submenu: [
//   //     {role: 'reload'},
//   //     {role: 'forcereload'},
//   //     {role: 'toggledevtools'},
//   //     {type: 'separator'},
//   //     {role: 'resetzoom'},
//   //     {role: 'zoomin'},
//   //     {role: 'zoomout'},
//   //     {type: 'separator'},
//   //     {role: 'togglefullscreen'}
//   //   ]
//   // },
//   // // { role: 'windowMenu' }
//   // {
//   //   label: 'Window',
//   //   submenu: [
//   //     {role: 'minimize'},
//   //     {role: 'zoom'},
//   //     ...(is.macOS() ? [
//   //       {type: 'separator'},
//   //       {role: 'front'},
//   //       {type: 'separator'},
//   //       {role: 'window'}
//   //     ] : [
//   //       {role: 'close'}
//   //     ])
//   //   ]
//   // },
//   {
//     role: 'help'
//     // submenu: [
//     //   {
//     //     label: 'Github',
//     //     click() {
//     //       require('electron').shell.openExternalSync('https://github.com/Jazzepi/bunny-tracker')
//     //     }
//     //   }
//     // ]
//   }
// ];

const template: Array<(MenuItemConstructorOptions) | (MenuItem)> = [
  {
    role: 'quit'
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Source Code',
        click() {
          shell.openExternalSync('https://github.com/Jazzepi/bunny-tracker');
        }
      }
    ]
  }
];


Menu.setApplicationMenu(Menu.buildFromTemplate(template));

const createWindow = async () => {
  const migrationPath = path.join(__dirname, 'dist', 'assets', 'migrations');
  const databasePath = path.join(app.getPath('userData'), 'database.sqlite');

  log.info('Logging paths START');
  log.info('__dirname path:' + __dirname);
  log.info('Migration path:' + migrationPath);
  log.info('Database path:' + databasePath);
  log.info('Logging paths END');

  const database: Database = await sqlite.open(databasePath);
  await database.run('PRAGMA foreign_keys = ON;');
  await database.migrate({
    force: serve ? 'last' : undefined,
    migrationsPath: serve ? 'src/assets/migrations' : path.join(__dirname, 'dist', 'assets', 'migrations')
  });

  ipcMain.on('GET-BUNNY', async (event: any, ..._args: any[]) => {
    try {
      event.returnValue = await database.all('SELECT * FROM bunnies');
    } catch (err) {
      throw err;
    }
  });

  ipcMain.on('ADD-BUNNY', async (event: any, bunny: Bunny) => {
    try {
      event.returnValue = await database.all('SELECT * FROM bunnies');
    } catch (err) {
      throw err;
    }
  });

  ipcMain.on('DELETE-BUNNY', async (event: any, bunny: Bunny) => {
    try {
      event.returnValue = await database.all('SELECT * FROM bunnies');
    } catch (err) {
      throw err;
    }
  });

  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width,
    height: size.height,
    webPreferences: {
      nodeIntegration: true,
      zoomFactor: 2.0
    },
  });

  if (serve) {
    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });
    win.loadURL('http://localhost:4200');
  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }

  if (serve) {
    win.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

};

try {

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow);

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      log.info('Application closing.');
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

} catch (e) {
  log.error('Application errored out. Logging error below.');
  log.error(e);
  throw e;
}
