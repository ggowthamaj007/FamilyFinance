$excelPath = "c:\Users\GOW\Desktop\Expense Rpt\#Input Ref\tradebook-YFS872-EQ.xlsx"
if (-not (Test-Path $excelPath)) {
    Write-Host "File not found: $excelPath"
    exit 1
}

try {
    $excel = New-Object -ComObject Excel.Application
    $excel.Visible = $false
    $excel.DisplayAlerts = $false
    $wb = $excel.Workbooks.Open($excelPath)
    
    foreach ($sheet in $wb.Sheets) {
        Write-Host "`n=== Sheet: $($sheet.Name) ==="
        for ($r = 1; $r -le 20; $r++) {
            $rowVals = @()
            for ($c = 1; $c -le 15; $c++) {
                $val = $sheet.Cells.Item($r, $c).Text
                $rowVals += $val
            }
            $nonEmpty = $rowVals | Where-Object { $_ -and $_.Trim() -ne "" }
            if ($nonEmpty.Count -gt 0) {
                Write-Host ("Row {0:D2}: " -f $r) ($rowVals -join " | ")
            }
        }
    }
    
    $wb.Close($false)
    $excel.Quit()
} catch {
    Write-Host "Failed to open Excel via COM: $_"
} finally {
    if ($excel) {
        [System.Runtime.Interopservices.Marshal]::ReleaseComObject($excel) | Out-Null
        Remove-Variable excel -ErrorAction SilentlyContinue
    }
}
