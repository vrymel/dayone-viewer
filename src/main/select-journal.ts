import { ipcMain, dialog, BrowserWindow } from 'electron';
import { readFileSync } from 'fs';

export function setupJournalHandlers(mainWindow: BrowserWindow) {
  ipcMain.handle('selectJournal', async () => {
    console.log('selectJournal');

    const result = await dialog.showOpenDialog(mainWindow, {
        properties: ['openFile'],
        title: 'Select JSON File',
        filters: [
          { name: 'JSON Files', extensions: ['json'] },
          // { name: 'All Files', extensions: ['*'] }
        ]
      });
      
      if (result.canceled) {
        return null;
      }

      const filePath = result.filePaths[0];

      try {
        // Read and parse the JSON file
        const fileContent = readFileSync(filePath, 'utf-8');
        const jsonData = JSON.parse(fileContent);
        
        return {
          success: true,
          data: jsonData,
          filePath: filePath
        };
      } catch (error) {
        console.error('Error parsing JSON file:', error);
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error occurred',
          filePath: filePath
        };
      }
  });
}