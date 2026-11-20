"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeController = exports.EmployeeController = void 0;
const employee_service_js_1 = require("../services/employee.service.js");
// Responsabilidad: Capa de controladores para recibir peticiones HTTP, validar formato y enviar respuestas
class EmployeeController {
    employeeService;
    // Inyección de dependencias por constructor
    constructor(employeeService = new employee_service_js_1.EmployeeService()) {
        this.employeeService = employeeService;
    }
    // POST /employees
    createEmployee = async (req, res, next) => {
        try {
            const { name, position, baseSalary, yearsOfService } = req.body;
            // Validaciones de entrada
            if (!name || !position) {
                return res.status(400).json({ message: 'Nombre y puesto son obligatorios' });
            }
            if (typeof baseSalary !== 'number' || baseSalary <= 0) {
                return res.status(400).json({ message: 'El salario base debe ser mayor a 0' });
            }
            if (typeof yearsOfService !== 'number' ||
                yearsOfService < 0 ||
                !Number.isInteger(yearsOfService)) {
                return res.status(400).json({ message: 'La antigüedad debe ser un entero mayor o igual a 0' });
            }
            const employee = await this.employeeService.createEmployee({
                name,
                position,
                baseSalary,
                yearsOfService
            });
            return res.status(201).json(employee);
        }
        catch (error) {
            next(error);
        }
    };
    // GET /employees
    getAllEmployees = async (_req, res, next) => {
        try {
            const employees = await this.employeeService.getAllEmployees();
            return res.json(employees);
        }
        catch (error) {
            next(error);
        }
    };
    // GET /employees/:id
    getEmployeeById = async (req, res, next) => {
        try {
            const id = req.params.id;
            const employee = await this.employeeService.getEmployeeById(id);
            if (!employee) {
                return res.status(404).json({ message: 'Empleado no encontrado' });
            }
            return res.json(employee);
        }
        catch (error) {
            next(error);
        }
    };
}
exports.EmployeeController = EmployeeController;
exports.employeeController = new EmployeeController();
