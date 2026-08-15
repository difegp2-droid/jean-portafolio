# Informe de Proyecto: Dulce Tierra

## Descripción General
Página web para una marca de repostería y postres artesanales. Su propósito es deleitar visualmente al usuario y transmitir la sensación de un ambiente hogareño, cálido y hecho a mano.

## Paleta de Colores
- **Fondo:** Crema (`#F5EDD8`), Blanco cálido (`#FBF6EC`).
- **Textos y Elementos:** Marrones oscuros (`#3B2314`, `#6B3D2A`).
- **Acentos:** Terracota (`#C4683F`), Salvia/Verde hoja (`#7A8C6E`), Arena (`#D9C5A3`).

## Tipografía
- **Títulos:** `Playfair Display` (serifa muy elegante, aporta un tono gourmet y artesanal).
- **Subtítulos/Detalles:** `Lora` (serifa amigable).
- **Cuerpo:** `Nunito` (redondeada, fácil de leer, complementa la dulzura de la marca).

## Aspectos Técnicos y UI
- **Texturas:** Implementación de un filtro de "ruido" sutil mediante SVG sobre toda la página (`opacity: 0.035`) para matar el brillo digital y dar textura de papel o naturaleza.
- **Efectos:** Desenfoque de fondo (`backdrop-filter: blur`) en la barra de navegación.
- **Animaciones:** Elementos botánicos u hojas flotantes (`leaf-deco`) que se mueven suavemente. Animaciones `fadeUp` secuenciales al cargar el sitio.
