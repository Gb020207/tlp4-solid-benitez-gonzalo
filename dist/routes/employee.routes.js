"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employee_controller_js_1 = require("../controllers/employee.controller.js");
// Responsabilidad: Definición de las rutas HTTP para empleados
const router = (0, express_1.Router)();
router.post('/', employee_controller_js_1.employeeController.createEmployee);
router.get('/', employee_controller_js_1.employeeController.getAllEmployees);
router.get('/:id', employee_controller_js_1.employeeController.getEmployeeById);
exports.default = router;
