$ErrorActionPreference = 'Stop'
$appDirectory = Split-Path -Parent $PSScriptRoot
Push-Location $appDirectory
try {
    $deployArgs = @('deploy', '--prod', '--context', 'production', '--skip-functions-cache', '--site',
        '932d120c-3238-4e88-a540-6c0c2ba3de42')
    $hasKey = $false
    foreach ($line in Get-Content -LiteralPath '.env.local') {
        if ($line -match '^(DEEPSEEK_API_KEY|DEEPSEEK_MODEL|DEEPSEEK_BASE_URL)=(.+)$') {
            $settingName = $Matches[1]
            $settingValue = $Matches[2].Trim().Trim('"').Trim("'")
            if ($settingName -eq 'DEEPSEEK_API_KEY' -and $settingValue) { $hasKey = $true }
            $deployArgs += @('--secret-env', ($settingName + '=' + $settingValue))
        }
    }
    if (-not $hasKey) { throw 'DEEPSEEK_API_KEY is missing from .env.local' }
    # Secret values are passed only to the deployed functions, never printed.
    & netlify @deployArgs
    if ($LASTEXITCODE -ne 0) { throw 'Netlify production deploy failed' }
} finally { Pop-Location }
