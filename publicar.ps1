# Reconstruye las páginas y publica los cambios en https://educateycrece.github.io
param([string]$mensaje = "Actualización del sitio")
$env:Path = [Environment]::GetEnvironmentVariable('Path','Machine') + ';' + [Environment]::GetEnvironmentVariable('Path','User')
Set-Location $PSScriptRoot
& powershell -NoProfile -ExecutionPolicy Bypass -File "$PSScriptRoot\construir.ps1"
git add -A
git commit -q -m $mensaje
git push -q
Write-Host "Publicado. La web se actualiza en 1 o 2 minutos: https://educateycrece.github.io"
