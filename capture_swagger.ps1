Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

$outputPath = "c:\Users\savin\product-catalog-service-23A91A61J6\screenshots\swagger.png"

$img = [System.Windows.Forms.Clipboard]::GetImage()
if ($img) {
    $img.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    Write-Host "Saved from clipboard to: $outputPath"
}
else {
    Write-Host "No image found in clipboard."
}
