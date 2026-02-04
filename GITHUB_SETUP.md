# 📖 INSTRUCCIONES PARA SUBIR A GITHUB

Tu repositorio local ya está listo. Aquí está cómo subirlo a GitHub:

## Paso 1: Crear un nuevo repositorio en GitHub

1. Ve a [github.com](https://github.com)
2. Inicia sesión en tu cuenta
3. Haz clic en el ícono **+** en la esquina superior derecha
4. Selecciona **New repository**
5. Completa los datos:
   - **Repository name**: `scrum-interactivo` (o el nombre que prefieras)
   - **Description**: "Página web interactiva y visual para aprender Scrum con caso de estudio real"
   - **Public**: Selecciona esto si quieres que sea visible para todos
   - **Initialize this repository with**: NO marques nada (ya tenemos archivos locales)
6. Haz clic en **Create repository**

## Paso 2: Conectar tu repositorio local con GitHub

Copia y ejecuta los siguientes comandos en PowerShell (reemplaza `TU_USERNAME` y `TU_REPO` con tus datos):

```powershell
cd "d:\Programación\Proyectos\Scrum interactivo"

git remote add origin https://github.com/TU_USERNAME/scrum-interactivo.git

git branch -M main

git push -u origin main
```

### Ejemplo:
```powershell
git remote add origin https://github.com/juanrodriguez/scrum-interactivo.git
git branch -M main
git push -u origin main
```

## Paso 3: Verificar que funcionó

1. Abre el navegador y ve a: `https://github.com/TU_USERNAME/scrum-interactivo`
2. Deberías ver todos tus archivos (HTML, CSS, JS, README, etc.)

## Paso 4: (Opcional) Habilitar GitHub Pages

Para que tu página sea visible en internet:

1. En GitHub, ve a tu repositorio
2. Haz clic en **Settings**
3. En el menú izquierdo, haz clic en **Pages**
4. En **Source**, selecciona **Deploy from a branch**
5. En **Branch**, selecciona **main** y **/root**
6. Haz clic en **Save**

Tu página estará disponible en: `https://TU_USERNAME.github.io/scrum-interactivo/`

## Futuros cambios

Para subir cambios al repositorio:

```powershell
# 1. Haz cambios en tus archivos

# 2. Revisa el estado
git status

# 3. Agregar cambios
git add .

# 4. Hacer commit
git commit -m "Descripción de los cambios"

# 5. Subir cambios
git push
```

## Comandos útiles de Git

```powershell
# Ver el historial de commits
git log

# Ver cambios no guardados
git diff

# Ver estado actual
git status

# Descartar cambios locales
git checkout -- .

# Crear una rama nueva
git checkout -b nombre-rama

# Cambiar de rama
git checkout nombre-rama
```

¡Listo! 🚀 Tu proyecto estará en GitHub
