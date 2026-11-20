import { Employee, IEmployee } from '../models/employee.model.js';

// Tipo con los datos necesarios para crear un empleado en la base de datos
export interface CreateEmployeeData {
  name: string;
  position: string;
  baseSalary: number;
  yearsOfService: number;
  finalSalary: number;
}

// Responsabilidad: Capa de persistencia y comunicación directa con MongoDB a través de Mongoose
export class EmployeeRepository {
  async create(data: CreateEmployeeData): Promise<IEmployee> {
    return await Employee.create(data);
  }

  async findAll(): Promise<IEmployee[]> {
    return await Employee.find().sort({ createdAt: -1 });
  }

  async findById(id: string): Promise<IEmployee | null> {
    return await Employee.findById(id);
  }
}

export const employeeRepository = new EmployeeRepository();
