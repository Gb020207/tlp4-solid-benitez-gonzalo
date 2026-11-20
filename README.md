# Práctica SOLID - Empleados y Salarios

## Objetivo

Refactorizar el servidor aplicando una separación clara de responsabilidades:

- controllers
- routes
- services
- repository
- models
- errorHandler

## Regla de negocio

El salario final se calcula así:

**salario final = salario base + 2% del salario base por cada año de antigüedad**

Ejemplo:

- Salario base: 1.000.000
- Antigüedad: 5 años
- Adicional: 10%
- Salario final: 1.100.000

## Endpoints requeridos

- `POST /employees`
- `GET /employees`
- `GET /employees/:id`

---

## Problemas del diseño inicial identificados

En la versión inicial (`src/server.ts` antes de refactorizar) todo el código estaba concentrado en un único archivo, lo que generaba varios problemas de diseño:

1. **Violación del Principio de Responsabilidad Única (SRP)**:
   - `server.ts` hacía absolutamente todo: configurar el servidor Express, conectar a MongoDB, definir el modelo y esquema de Mongoose, validar los datos del `req.body`, calcular la regla del salario y bono, interactuar con la base de datos y manejar respuestas y errores HTTP.
2. **Alto acoplamiento**:
   - La lógica de negocio (el cálculo del bono y salario final) estaba mezclada directamente dentro de la función del endpoint de Express. No se podía reutilizar ni probar sin simular una petición HTTP completa.
3. **Falta de Inversión de Dependencias (DIP)**:
   - La capa de presentación (rutas de Express) interactuaba directamente con el modelo de Mongoose (`Employee.create`, `Employee.find`, `Employee.findById`), quedando acoplada a la tecnología de base de datos específica.
4. **Código duplicado en el manejo de errores**:
   - Cada ruta tenía un bloque `try/catch` idéntico haciendo `console.error(error)` y devolviendo `{ message: 'Error interno del servidor' }`.

---

## Arquitectura y Refactorización realizada

Se reorganizó el proyecto siguiendo una arquitectura en capas clara y sencilla:

```text
src/
├── controllers/
│   └── employee.controller.ts     # Maneja peticiones HTTP y validaciones básicas
├── models/
│   └── employee.model.ts          # Interfaz TypeScript y Schema/Model de Mongoose
├── repository/
│   └── employee.repository.ts     # Acceso a datos (queries de MongoDB/Mongoose)
├── services/
│   └── employee.service.ts        # Regla de negocio y cálculo del salario final
├── routes/
│   └── employee.routes.ts         # Definición de rutas con Router de Express
├── middlewares/
│   └── errorHandler.ts            # Middleware centralizado para manejo de errores
├── errorHandler.ts                # Re-export de errorHandler
└── server.ts                      # Conexión a DB y levantamiento de Express
```

### Principios SOLID aplicados:

- **S (Single Responsibility Principle - Responsabilidad Única)**:
  - Cada archivo tiene una única razón para cambiar: el controlador solo maneja HTTP, el servicio solo contiene la lógica del negocio, el repositorio solo interactúa con la base de datos, y el modelo solo define la estructura del dato.
- **O (Open/Closed Principle - Abierto/Cerrado)**:
  - La lógica del cálculo salarial está aislada en el método `calculateFinalSalary` dentro del servicio. Si en el futuro cambian las reglas de cálculo o bonificaciones, se puede extender sin romper los controladores ni la base de datos.
- **L (Liskov Substitution Principle - Sustitución de Liskov)**:
  - Las capas respetan interfaces claras (`IEmployee`, `CreateEmployeeDTO`, etc.), garantizando coherencia en los datos intercambiados.
- **I (Interface Segregation Principle - Segregación de Interfaces)**:
  - Se definen interfaces puntuales para lo que necesita cada capa (`CreateEmployeeDTO` para entrada, `CreateEmployeeData` para persistencia, `IEmployee` para el documento).
- **D (Dependency Inversion Principle - Inversión de Dependencias)**:
  - Tanto `EmployeeController` como `EmployeeService` reciben sus dependencias a través del constructor, desacoplando las capas y facilitando el testing.

---

## Cómo ejecutar

1. Configurar variables de entorno:
```bash
cp .env.example .env
```

2. Iniciar la base de datos (Docker):
```bash
docker compose up -d
```

3. Instalar dependencias:
```bash
npm install
```

4. Ejecutar en modo desarrollo:
```bash
npm run dev
```

5. Compilar el proyecto TypeScript:
```bash
npm run build
```
