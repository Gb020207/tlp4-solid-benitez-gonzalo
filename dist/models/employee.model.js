"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeModel = exports.Employee = void 0;
const mongoose_1 = require("mongoose");
// Esquema de Mongoose para la colección de empleados
const employeeSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    position: { type: String, required: true },
    baseSalary: { type: Number, required: true },
    yearsOfService: { type: Number, required: true },
    finalSalary: { type: Number, required: true }
}, { timestamps: true });
// Modelo de Mongoose
exports.Employee = (0, mongoose_1.model)('Employee', employeeSchema);
exports.EmployeeModel = exports.Employee;
exports.default = exports.Employee;
