# Arma las páginas del sitio uniendo cabecera + contenido + pie.
# Edita los archivos de la carpeta "fuente" y luego ejecuta este script.
$root = $PSScriptRoot
$utf8 = New-Object System.Text.UTF8Encoding($false)
$cab = [IO.File]::ReadAllText("$root\fuente\cabecera.html", $utf8)
$pie = [IO.File]::ReadAllText("$root\fuente\pie.html", $utf8)
$paginas = 'index','nosotros','programas','acciones','galeria','apoyanos','contacto'
foreach ($p in $paginas) {
  $cuerpo = [IO.File]::ReadAllText("$root\fuente\$p.html", $utf8)
  if ($cuerpo -notmatch '<!-- TITULO: (.*?) \| DESC: (.*?) -->') { throw "Falta la línea TITULO/DESC en $p.html" }
  $titulo = $matches[1]; $desc = $matches[2]
  $cuerpo = $cuerpo -replace '<!-- TITULO: .*? -->\r?\n', ''
  $h = $cab.Replace('{{TITULO}}', $titulo).Replace('{{DESC}}', $desc)
  foreach ($q in $paginas) { $h = $h.Replace("{{ACT_$q}}", $(if ($q -eq $p) { 'aria-current="page"' } else { '' })) }
  [IO.File]::WriteAllText("$root\$p.html", $h + $cuerpo + $pie, $utf8)
  Write-Host "OK  $p.html"
}
