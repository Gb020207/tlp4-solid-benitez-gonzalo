"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeService = exports.EmployeeService = void 0;
const employee_repository_js_1 = require("../repository/employee.repository.js");
// Responsabilidad: Capa de lógica de negocio y cálculo de salarios
class EmployeeService {
    employeeRepository;
    // Inyección de dependencias por constructor (Principio de Inversión de Dependencias)
    constructor(employeeRepository = new employee_repository_js_1.EmployeeRepository()) {
        this.employeeRepository = employeeRepository;
    }
    // Regla de negocio: salario final = salario base + 2% del salario base por cada año de antigüedad
    calculateFinalSalary(baseSalary, yearsOfService) {
        const bonus = baseSalary * 0.02 * yearsOfService;
        return baseSalary + bonus;
    }
    async createEmployee(data) {
        // Calculamos el salario final aplicando la regla de negocio
        const finalSalary = this.calculateFinalSalary(data.baseSalary, data.yearsOfService);
        const employeeData = {
            name: data.name,
            position: data.position,
            baseSalary: data.baseSalary,
            yearsOfService: data.yearsOfService,
            finalSalary
        };
        const employee = await this.employeeRepository.create(employeeData);
        console.log(`Empleado creado: ${employee.name} - salario final: ${employee.finalSalary}`);
        return employee;
    }
    async getAllEmployees() {
        return await this.employeeRepository.findAll();
    }
    async getEmployeeById(id) {
        return await this.employeeRepository.findById(id);
    }
}
exports.EmployeeService = EmployeeService;
exports.employeeService = new EmployeeService();
