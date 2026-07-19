// -------------------------------------------------------------
// BACKUP EXPORT & RESTORE
// -------------------------------------------------------------
function downloadBackupFile() {
    const backupData = JSON.stringify(appState, null, 2);
    const blob = new Blob([backupData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.href = url;
    
    const now = new Date();
    const dateStr = now.getFullYear() + "-" + 
                   String(now.getMonth() + 1).padStart(2, '0') + "-" + 
                   String(now.getDate()).padStart(2, '0') + "_" + 
                   String(now.getHours()).padStart(2, '0') + "-" + 
                   String(now.getMinutes()).padStart(2, '0') + "-" + 
                   String(now.getSeconds()).padStart(2, '0');
                   
    dlAnchorElem.download = `family_finance_backup_${dateStr}.json`;
    document.body.appendChild(dlAnchorElem);
    dlAnchorElem.click();
    document.body.removeChild(dlAnchorElem);
    
    // Clean up memory
    setTimeout(() => URL.revokeObjectURL(url), 100);
}

function restoreBackupFile(file, onCompleteCallback) {
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const restored = JSON.parse(e.target.result);
            if (restored.statements && restored.categories && restored.accounts) {
                appState = restored;
                saveState();
                onCompleteCallback(true);
            } else {
                onCompleteCallback(false, "Invalid backup schema. Required nodes missing.");
            }
        } catch (err) {
            onCompleteCallback(false, "File could not be parsed as JSON.");
        }
    };
    reader.readAsText(file);
}

window.downloadBackupFile = downloadBackupFile;
window.restoreBackupFile = restoreBackupFile;
