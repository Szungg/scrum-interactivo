# 🚀 Metodología Scrum - Página Interactiva y Visual

Una página web educativa, interactiva y visualmente atractiva para aprender y comprender la metodología Scrum de forma práctica.

## 📋 Características

✨ **Interactiva y Visual**
- Interfaz moderna y responsiva
- Animaciones suaves y transiciones
- Diseño minimalista pero atractivo
- Totalmente responsive para móviles, tablets y desktop
- **Optimizada para presentaciones de 5 minutos**

🎯 **Contenido Esencial**
- Introducción a Scrum
- 3 Roles principales (Product Owner, Scrum Master, Equipo de Desarrollo)
- 4 Eventos de Scrum (Planning, Daily Standup, Review, Retrospectiva)
- Caso Real: Proyecto E-commerce con 4 Sprints

🔧 **Funcionalidades Especiales**
- Navegación por pestañas e iconos
- Detalles expandibles para cada rol
- Información esencial sobre eventos de Scrum
- Búsqueda en la página (Ctrl+F)
- Atajos de teclado (Alt+1 a Alt+5)
- Botones de compartir en redes sociales
- Modo oscuro (opcional)
- Impresión amigable (Ctrl+P)

## 📁 Archivos

```
Scrum interactivo/
├── index.html          # Estructura HTML de la página
├── styles.css          # Estilos CSS y diseño responsivo
├── script.js           # Interactividad y funcionalidades
├── README.md           # Este archivo
└── Proy2.3 Scrum.pdf   # Fuente de información (referencia)
```

## 🚀 Uso

### Opción 1: Abrir directamente en el navegador
1. Ve a la carpeta `Scrum interactivo`
2. Haz doble clic en `index.html`
3. ¡Disfruta aprendiendo Scrum!

### Opción 2: Con un servidor local (recomendado)
```bash
# Si tienes Python 3
cd "D:\Programación\Proyectos\Scrum interactivo"
python -m http.server 8000

# Si tienes Python 2
python -m SimpleHTTPServer 8000

# Luego abre en tu navegador: http://localhost:8000
```

### Opción 3: Usar VS Code Live Server
1. Instala la extensión "Live Server" en VS Code
2. Haz clic derecho en `index.html`
3. Selecciona "Open with Live Server"

## ⌨️ Atajos de Teclado

| Atajo | Acción |
|-------|--------|
| **Alt + 1** | Ir a Inicio |
| **Alt + 2** | Ir a ¿Qué es Scrum? |
| **Alt + 3** | Ir a Roles |
| **Alt + 4** | Ir a Eventos |
| **Alt + 5** | Ir a Caso Real |
| **Ctrl + F** | Buscar en la página |
| **Ctrl + P** | Imprimir la página |

## 🎨 Estructura de la Página

### 1. **Navegación Principal**
Barra de navegación pegajosa con acceso rápido a todas las secciones.

### 2. **Sección Inicio**
- Bienvenida con 4 tarjetas con principios clave de Scrum
- Primeras impresiones visuales sobre la metodología

### 3. **¿Qué es Scrum?**
- Explicación conceptual
- Principios clave
- Estadísticas importantes

### 4. **Roles en Scrum**
- **Product Owner**: Gestor del producto
- **Scrum Master**: Facilitador y coach
- **Equipo de Desarrollo**: Creadores del producto
- Cada rol es expandible para ver más detalles

### 5. **Eventos de Scrum**
- **Sprint Planning**: Planificación del sprint
- **Daily Standup**: Sincronización diaria (15 min)
- **Sprint Review**: Demostración de trabajo
- **Sprint Retrospectiva**: Reflexión y mejora
- Información de duración, participantes y objetivos

### 6. **Caso de Estudio Real: Plataforma E-commerce**
- **Equipo Scrum**: Perfiles reales (Product Owner, Scrum Master, Desarrolladores, Diseñador, QA)
- **Product Backlog**: Items priorizados del proyecto (8 features reales)
- **4 Sprints de 2 Semanas**: 
  - Sprint 1: Catálogo y Carrito
  - Sprint 2: Integración de Pago
  - Sprint 3: Perfil y Reseñas
  - Sprint 4: Optimización y Lanzamiento
- **Gráfico de Velocidad**: Visualización del rendimiento del equipo
- **Resultados Reales**: Métricas de éxito, lecciones aprendidas, retrospectiva

## 🎨 Colores Utilizados

```css
--primary-color: #FF6B6B       /* Rojo coral para CTAs */
--secondary-color: #4ECDC4     /* Turquesa para secundarios */
--accent-color: #95E1D3        /* Verde menta para acentos */
--dark-color: #2C3E50          /* Gris oscuro para texto principal */
--light-color: #ECF0F1         /* Gris claro para fondos */
```

## 📱 Responsividad

La página es completamente responsive y se adapta a:
- **Desktop**: Pantallas > 1024px
- **Tablet**: Pantallas 768px - 1024px
- **Mobile**: Pantallas < 768px

## 🔧 Personalización

### Cambiar Colores
Edita los valores en `styles.css` en la sección `:root`:
```css
:root {
    --primary-color: #TU_COLOR;
    --secondary-color: #TU_COLOR;
    /* ... */
}
```

### Agregar Contenido
Edita `index.html` para agregar más secciones, roles o información.

### Modificar Interactividad
Edita `script.js` para cambiar comportamientos o agregar nuevas funcionalidades.

## 🌟 Características Avanzadas

### Animaciones
- Fade-in suave al hacer scroll
- Hover effects en tarjetas
- Transiciones entre secciones
- Escalado en elementos interactivos

### Accesibilidad
- Estructura semántica HTML
- Navegación clara
- Contraste de colores adecuado
- Atajos de teclado

### Performance
- CSS sin frameworks pesados
- JavaScript vanilla (sin dependencias)
- Imagen optimizada
- Carga rápida

## 📚 Referencias

La información presentada se basa en:
- The Scrum Guide (guía oficial de Scrum)
- Mejores prácticas de la industria
- Experiencias en equipos ágiles reales
- Archivo PDF: `Proy2.3 Scrum.pdf` (incluido en el proyecto)

## 🤝 Cómo Contribuir

1. Abre el proyecto en VS Code
2. Realiza cambios en HTML, CSS o JS
3. Prueba los cambios en el navegador
4. Verifica que todo funciona correctamente
5. Guarda los cambios

## 💡 Tips para Usar la Página

1. **Para Aprender**: Lee cada sección detenidamente
2. **Para Entrenar**: Haz clic en "Ver Detalles" para información profunda
3. **Para Enseñar**: Usa la proyección de pantalla en clase
4. **Para Compartir**: Usa los botones de compartir en redes
5. **Para Imprimir**: Usa Ctrl+P para una versión imprimible

## 🐛 Resolución de Problemas

### La página no se ve correctamente
- Abre la consola (F12) y busca errores
- Asegúrate de que todos los archivos (HTML, CSS, JS) están en la misma carpeta
- Intenta recargar la página (Ctrl+R o Cmd+R)

### Los atajos de teclado no funcionan
- Algunos navegadores pueden bloquear ciertos atajos
- Intenta con otro navegador
- Usa la navegación por menú en su lugar

### Las animaciones son lentas
- Reduce la intensidad gráfica del navegador
- Abre menos pestañas del navegador
- Actualiza tu navegador a la versión más reciente

## 📝 Notas Importantes

- Esta página es totalmente **autónoma** y no requiere servidor
- Funciona **sin conexión a internet** una vez cargada
- Es **mobile-friendly** y funciona en cualquier dispositivo
- Se puede **personalizar fácilmente** según necesidades

## 🎓 Objetivos de Aprendizaje

Después de explorar esta página, deberías entender:

✅ Qué es Scrum y por qué es importante
✅ Los 3 roles principales y sus responsabilidades
✅ Los 4 eventos clave de Scrum
✅ Los 3 artefactos y su propósito
✅ Cómo funciona un Sprint de principio a fin
✅ Los principios de la metodología ágil
✅ Cómo Scrum promueve la mejora continua

## 📞 Soporte

Si tienes dudas sobre Scrum:
- Consulta la Guía Oficial de Scrum
- Busca recursos en Scrum.org
- Lee libros recomendados sobre Scrum
- Participa en comunidades ágiles en línea

---

**Hecho con ❤️ para aprender Scrum de forma interactiva**

¡Felicidades! Ya estás en tu camino hacia dominar la metodología Scrum 🚀
