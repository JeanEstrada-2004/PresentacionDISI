# Informe de ajuste de equilibrio de componentes

## 1. Diapositivas ajustadas

- Portada: se reemplazo el bloque narrativo centrado en backend/API por una lectura equilibrada de web de gestion, app movil, trazabilidad y servicios de soporte. Tambien se agregaron los integrantes del equipo.
- Objetivos y alcance: se reemplazo la mencion a servicios backend por servicios tecnicos de soporte.
- Contexto y problematica: se cambio el lenguaje de API/backend por servicios comunes y datos trazables.
- Justificacion, Lean Canvas y propuesta de valor: se reforzo la plataforma web-movil con trazabilidad operativa, no la capa tecnica como protagonista.
- Alcance, actores y canales: el soporte tecnico queda como servicio comun, no como actor de negocio.
- Arquitectura general: se explica la separacion entre canales de usuario, datos, servicios tecnicos y operacion.
- Modelo de datos: se reforzo la trazabilidad operativa y la reconstruccion de jornadas mediante datos.
- Implementacion web y movil: se dio prioridad funcional a la web de gestion/supervision y a la app movil como canal principal del chofer.
- Servicios tecnicos, seguridad y auditoria: se mantuvo la explicacion del backend/API donde corresponde, con enfoque de soporte compartido.
- Pruebas y cierre: se balanceo la validacion entre web, app movil, roles, integracion, offline/sync, auditoria y evidencias QA.

## 2. Menciones reducidas o reemplazadas

Se redujeron menciones narrativas de "backend/API" en portada, alcance, propuesta de valor, actores, arquitectura, pruebas y cierre. Cuando no era necesario hablar tecnicamente, se reemplazo por:

- servicios tecnicos;
- servicios de soporte;
- servicios comunes;
- capa de servicios;
- datos y auditoria;
- trazabilidad operativa.

## 3. Frases nuevas de equilibrio

- "La web gestiona, la app movil opera, los datos trazan y los servicios tecnicos sostienen seguridad, persistencia y auditoria."
- "La arquitectura separa canales de usuario, datos y servicios tecnicos para mantener consistencia entre gestion web, operacion movil y trazabilidad."
- "La trazabilidad se construye entre canales, datos y auditoria; los servicios tecnicos permiten que web y app movil compartan reglas sin convertirse en el centro funcional del producto."
- "Los servicios tecnicos sostienen autenticacion, permisos, persistencia y auditoria para mantener consistencia entre web, app movil y datos."

## 4. Backend/API donde corresponde

El backend/API se mantiene en la diapositiva tecnica de servicios, seguridad y auditoria, asi como en referencias tecnicas justificadas: endpoints, mapa rol-modulo-API-dato, API Gateway, integracion y despliegue preparado.

## 5. Alcance del MVP

No se altero el alcance del MVP. Se mantienen incluidos: web administrativa, web gerencial, panel web de chofer como respaldo, app movil del chofer, autenticacion y roles, camiones, contratos, jornadas, observaciones, alertas/SOS/auxilio, auditoria, PostgreSQL, SQLite local movil, offline basico, sincronizacion posterior controlada, pruebas funcionales/integracion y preparacion local/testing/cloud inicial.

Tambien se mantienen como excluidos o evolucion futura: GPS real-time, tracking en mapa vivo, proveedor GPS externo, combustible, facturacion, mantenimiento avanzado, push notifications, BI avanzado, publicacion en tiendas, produccion AWS estable garantizada, offline robusto productivo y sincronizacion background completa garantizada.

## 6. Revision visual

Se reviso la presentacion en Chrome fullscreen despues del ajuste. La portada mantiene equilibrio visual con los integrantes, los textos no saturan las tarjetas y la navegacion conserva flechas, botones, numeracion y barra de progreso.

## 7. Recomendacion para exposicion oral

Al explicar la arquitectura, usar la frase guia: "la web gestiona, la app movil opera, los datos trazan y los servicios tecnicos sostienen permisos, persistencia y auditoria". Esto evita que el docente interprete el proyecto como una defensa centrada solo en backend/API.
