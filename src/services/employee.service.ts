import { EmployeeRepository, CreateEmployeeData } from '../repository/employee.repository.js';
import { IEmployee } from '../models/employee.model.js';

// DTO para recibir los datos de entrada del empleado
export interface CreateEmployeeDTO {
  name: string;
  position: string;
  baseSalary: number;
  yearsOfService: number;
}

// Responsabilidad: Capa de lógica de negocio y cálculo de salarios
export class EmployeeService {
  private employeeRepository: EmployeeRepository;

  // Inyección de dependencias por constructor (Principio de Inversión de Dependencias)
  constructor(employeeRepository: EmployeeRepository = new EmployeeRepository()) {
    this.employeeRepository = employeeRepository;
  }

  // Regla de negocio: salario final = salario base + 2% del salario base por cada año de antigüedad
  calculateFinalSalary(baseSalary: number, yearsOfService: number): number {
    const bonus = baseSalary * 0.02 * yearsOfService;
    return baseSalary + bonus;
  }

  async createEmployee(data: CreateEmployeeDTO): Promise<IEmployee> {
    // Calculamos el salario final aplicando la regla de negocio
    const finalSalary = this.calculateFinalSalary(data.baseSalary, data.yearsOfService);

    const employeeData: CreateEmployeeData = {
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

  async getAllEmployees(): Promise<IEmployee[]> {
    return await this.employeeRepository.findAll();
  }

  async getEmployeeById(id: string): Promise<IEmployee | null> {
    return await this.employeeRepository.findById(id);
  }
}

export const employeeService = new EmployeeService();
