# Prompt: Actualización de documentación existente (docs/)

## Rol
Actúa como un **Senior Technical Writer + Senior Software Engineer** con criterio de producto y arquitectura.

## Contexto
Existe una carpeta **`docs/`** que contiene la documentación del proyecto.  
Esa documentación **está desactualizada**, ya que el código, la arquitectura y los flujos han cambiado desde que fue generada.

## Objetivo
Actualizar **toda la documentación existente en `docs/`** para que refleje fielmente el **estado actual del proyecto**.

## Alcance
- Revisar **todo el contenido de `docs/`**
- Analizar el **código actual**, estructura del repositorio y configuración
- Detectar diferencias entre documentación y realidad
- Actualizar, corregir o reescribir lo necesario
- Eliminar secciones obsoletas
- Agregar documentación faltante si es imprescindible

## Reglas estrictas
- ❌ NO inventar funcionalidades que no existan en el código
- ❌ NO cambiar la estructura del proyecto
- ❌ NO modificar código fuente
- ✅ SOLO modificar archivos dentro de `docs/`
- ✅ Mantener un lenguaje claro, técnico y preciso
- ✅ Priorizar exactitud sobre cantidad de texto

## Entregables
- Documentación completamente actualizada dentro de `docs/`
- Cada archivo debe reflejar el estado real del sistema
- Si un archivo ya no tiene sentido, eliminarlo justificadamente

## Criterios de calidad
- La documentación debe permitir a un nuevo desarrollador:
  - Entender la arquitectura
  - Levantar el proyecto
  - Comprender flujos clave
  - Saber cómo extenderlo sin romperlo

## Pasos sugeridos
1. Auditar `docs/` y listar archivos existentes
2. Contrastar cada archivo con el código actual
3. Marcar contenido obsoleto
4. Actualizar o reescribir según corresponda
5. Validar coherencia global entre documentos

## Resultado esperado
Al finalizar, la carpeta `docs/` debe representar **una fuente de verdad confiable** del proyecto actual.
