const { app, BrowserWindow, globalShortcut, Menu, screen, Tray } = require('electron');
const path = require('path');
const http = require('http');

const favicon = path.join(__dirname, 'Plex.ico');
const plexServer = '0.0.0.0'; // Update with plex server address
const plexPort = '0'; // Update with plex server port
const plexPage = `http://${plexServer}:${plexPort}/web/index.html`;
const unresponsivePage = path.join(__dirname, 'unresponsive.html');

let mainWindow = null;
let tray = null;
let currentPage = null;
let plexTimeout = null;
let plexInterval = null;

const checkPlex = () => {
	http.get(plexPage, () => {
		if (currentPage && currentPage !== plexPage) {
			currentPage = plexPage;
			mainWindow.loadURL(plexPage);
		}
	}).on('error', () => {
		if (currentPage && currentPage !== unresponsivePage) {
			currentPage = unresponsivePage;
			mainWindow.loadFile(unresponsivePage);
		}
	});
};

app.whenReady().then(() => {
	globalShortcut.register('CommandOrControl+Q', () => {
		app.quit();
	});

	const screenWidth =
		screen.getAllDisplays() && screen.getAllDisplays()[0] && screen.getAllDisplays()[0].workAreaSize
			? screen.getAllDisplays()[0].workAreaSize.width
			: 1280;
	const screenHeight =
		screen.getAllDisplays() && screen.getAllDisplays()[0] && screen.getAllDisplays()[0].workAreaSize
			? screen.getAllDisplays()[0].workAreaSize.height
			: 720;

	tray = new Tray(favicon);
	tray.setContextMenu(
		Menu.buildFromTemplate([
			{
				label: 'Quit',
				click: () => {
					app.quit();
				},
				accelerator: 'CommandOrControl+Q',
			},
		])
	);

	mainWindow = new BrowserWindow({
		width: screenWidth,
		height: screenHeight,
		icon: favicon,
		fullscreen: false,
		autoHideMenuBar: true,
		backgroundColor: '#1f1f1f',
		show: false,
	});

	mainWindow
		.loadFile(unresponsivePage)
		.then(() => {
			currentPage = unresponsivePage;
			mainWindow.maximize();
			plexTimeout = setTimeout(() => {
				checkPlex();
			}, 1000);
			plexInterval = setInterval(() => {
				clearTimeout(plexTimeout);
				checkPlex();
			}, 5000);
		})
		.catch(e => {
			console.log(e);
		});
});

app.on('window-all-closed', () => {
	globalShortcut.unregisterAll();
	app.quit();
});

app.on('quit', () => {
	plexInterval = null;
	plexTimeout = null;
	currentPage = null;
	tray = null;
	mainWindow = null;
});
