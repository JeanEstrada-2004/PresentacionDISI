# Informe de integración de evidencias - Presentación NANU TECH

## 1. Evidencias encontradas

Se localizó la carpeta `NANUTECH_EVIDENCIAS_PRESENTACION` con el archivo guía `README_USO_PRESENTACION.md` y el manifiesto `00_MANIFIESTO_EVIDENCIAS_PRESENTACION.csv`.

Contenido principal encontrado:

- Lean Canvas de NANU TECH.
- Diagramas clave: arquitectura general MVP, roles/módulos, sincronización offline básica, trazabilidad resumida, mapa rol-módulo-API-dato, AWS preparada, flujo SOS y ciclo de vida de jornada.
- DER central PostgreSQL y DER SQLite local de app móvil.
- Capturas web de administrador.
- Capturas web de gerente.
- Capturas web de chofer.
- Diseños UX de referencia web y móvil.
- Evidencias QA.
- Documentos de consulta y fuentes editables Draw.io.

## 2. Evidencias usadas

Evidencias integradas directamente en `index.html`:

- `01_canvas/01_lean_canvas_nanutech.png`
- `02_diagramas_clave/01_arquitectura_general_mvp.png`
- `02_diagramas_clave/02_vista_roles_modulos.png`
- `02_diagramas_clave/03_sync_offline_basica.png`
- `02_diagramas_clave/04_trazabilidad_resumida_mvp.png`
- `02_diagramas_clave/05_mapa_rol_modulo_api_dato.png`
- `02_diagramas_clave/06_arquitectura_aws_preparada.png`
- `02_diagramas_clave/08_ciclo_vida_jornada.png`
- `03_modelo_datos/01_der_postgresql_central.png`
- `04_capturas_web_admin/02_dashboard_administrador.png`
- `04_capturas_web_admin/07_auditoria_accesos_admin.png`
- `05_capturas_web_gerente/01_gestion_contratos_gerente.png`
- `07_diseno_ux_referencia/04_ux_movil_jornada_asignada.png`
- `07_diseno_ux_referencia/05_ux_movil_sincronizacion_completada.png`
- `07_diseno_ux_referencia/06_ux_web_consulta_conductores.png`
- `08_pruebas_qa/01_collage_evidencias_qa.png`

## 3. Evidencias descartadas y motivo

No se integraron todas las imágenes para evitar saturación visual. Se descartaron como evidencia principal:

- Capturas web adicionales de administrador: login, alertas, camiones, conductores y jornadas. Motivo: la slide de implementación web ya usa una captura representativa del dashboard y otra del rol gerente.
- Capturas web adicionales de gerente: dashboard, historial, observaciones y seguimiento de jornadas. Motivo: se priorizó contratos como evidencia de rol gerente y se evitó cargar la diapositiva.
- Capturas web de chofer: dashboard, jornada, SOS y cierre de turno. Motivo: el chofer web se mantiene como canal secundario; la defensa prioriza app móvil como canal principal.
- Diseños UX de modal SOS, auxilio y dashboard web chofer. Motivo: se integraron solo dos referencias UX para mantener claridad.
- DER SQLite local de app móvil. Motivo: la sincronización offline se explica con el diagrama de offline básico; el DER móvil queda como anexo técnico.
- Flujo SOS/auxilio. Motivo: SOS ya aparece en alcance y app móvil; el diagrama puede usarse en anexos si se requiere detalle.
- Matrices QA adicionales y defecto 401. Motivo: se usa el collage QA principal como evidencia de validación global.
- Archivos `.drawio`, `.docx`, `.xlsx`, `.csv` y `.txt`. Motivo: funcionan como anexos o fuentes de edición, no como figuras principales de la exposición.

## 4. Diapositivas modificadas

La presentación fue ampliada a 28 diapositivas para alinearse mejor con el informe final del curso DISI.

Diapositivas nuevas agregadas desde el análisis del informe:

- Objetivos y alcance DISI.
- Justificación del proyecto.
- Supuestos de dimensionamiento.
- Metodología y fuentes del proyecto.
- Reglas de negocio del MVP.
- Sincronización offline básica.

Diapositivas existentes reforzadas:

- Backend/API, seguridad y auditoría: se agregó control de permisos, CORS, variables, logs y pruebas de acceso.
- Operación, capacitación y mantenimiento: se incorporó puesta en marcha controlada, capacitación por rol, soporte inicial y riesgos.
- Resultados, conclusiones y cierre: se reforzó discusión crítica y recomendaciones.

Evidencias visuales integradas directamente:

- Lean Canvas.
- Actores y canales.
- SDLC aplicado.
- MoSCoW y trazabilidad.
- Diseño UX y Figma.
- Arquitectura general.
- Sincronización offline básica.
- Modelo de datos / DER.
- Implementación web.
- Implementación app móvil.
- Backend/API, seguridad y auditoría.
- Pruebas y validaciones.
- Despliegue, AWS y costos.

## 5. Enlaces agregados

La presentación conserva accesos rápidos:

- Figma: `#figma-link`
- Sistema web: `#sistema-web-link`
- Evidencias app móvil: `#app-movil-link`
- Anexos: `#anexos-link`

## 6. Funcionalidades fuera del MVP evitadas

No se integraron imágenes como evidencia de funcionalidad implementada para:

- GPS en tiempo real.
- Tracking en mapa vivo.
- Proveedor GPS externo.
- Combustible.
- Mantenimiento avanzado.
- Facturación.
- Push notifications.
- BI avanzado.
- Publicación en Play Store/App Store.
- Producción AWS garantizada.

Estas capacidades se mantienen como exclusión o evolución futura, según corresponda.

## 7. Pendientes mínimos

- Reemplazar los enlaces placeholder por URLs reales.
- Si se cuenta con capturas reales de app móvil, evaluar reemplazar una referencia UX móvil por evidencia de implementación móvil.
- Si el DER central resulta muy denso en proyector, usar una versión recortada o ampliada como figura principal y dejar el DER completo en anexos.

## 8. Recomendación final para exponer

Usar las imágenes como evidencia de apoyo, no como sustituto de la explicación. La narrativa debe seguir el ciclo: problema, idea TIC, alcance, análisis, diseño, implementación, pruebas, despliegue, mantenimiento y resultados.
