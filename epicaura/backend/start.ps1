# Wrapper to run the project root start.ps1 when executed from backend folder
# It forwards any passed arguments to the root script.

$rootDir = Split-Path -Parent $PSScriptRoot
$rootScript = Join-Path $rootDir 'start.ps1'

if (Test-Path $rootScript) {
    try {
        & $rootScript @args
    } catch {
        Write-Error "Failed to run '$rootScript': $_"
        Write-Error "If scripts are blocked by ExecutionPolicy, run:"
        Write-Error "  powershell -ExecutionPolicy Bypass -File \"$rootScript\""
        exit 1
    }
} else {
    Write-Error "Could not find project root script: '$rootScript'."
    Write-Error "Run the root script from the project root folder or use the full path to start.ps1."
    exit 1
}
