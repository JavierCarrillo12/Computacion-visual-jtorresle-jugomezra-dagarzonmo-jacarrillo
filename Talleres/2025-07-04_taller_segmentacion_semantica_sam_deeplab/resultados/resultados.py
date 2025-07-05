from pathlib import Path
from PIL import Image

base_dir = Path(__file__).resolve().parent.parent

input_path = base_dir / "imagenes_entrada" / "urus.jpg"
mask_path = base_dir / "mascaras_salida" / "deeplab_output.png"
output_path = Path(__file__).resolve().parent / "comparacion.png"  # Guarda en /resultados/

# Cargar las imágenes
original = Image.open(input_path)
mask = Image.open(mask_path).resize(original.size)

combined = Image.new("RGB", (original.width * 2, original.height))
combined.paste(original, (0, 0))
combined.paste(mask.convert("RGB"), (original.width, 0))
combined.save(output_path)

print(f"Imagen guardada en: {output_path}")
