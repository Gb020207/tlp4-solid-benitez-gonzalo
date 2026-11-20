"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeRepository = exports.EmployeeRepository = void 0;
const employee_model_js_1 = require("../models/employee.model.js");
// Responsabilidad: Capa de persistencia y comunicación directa con MongoDB a través de Mongoose
class EmployeeRepository {
    async create(data) {
        return await employee_model_js_1.Employee.create(data);
    }
    async findAll() {
        return await employee_model_js_1.Employee.find().sort({ createdAt: -1 });
    }
    async findById(id) {
        return await employee_model_js_1.Employee.findById(id);
    }
}
exports.EmployeeRepository = EmployeeRepository;
exports.employeeRepository = new EmployeeRepository();
