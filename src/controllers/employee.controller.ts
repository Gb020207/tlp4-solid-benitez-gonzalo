import { Request, Response, NextFunction } from 'express';
import { EmployeeService } from '../services/employee.service.js';

// Responsabilidad: Capa de controladores para recibir peticiones HTTP, validar formato y enviar respuestas
export class EmployeeController {
  private employeeService: EmployeeService;

  // Inyección de dependencias por constructor
  constructor(employeeService: EmployeeService = new EmployeeService()) {
    this.employeeService = employeeService;
  }

  // POST /employees
  createEmployee = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, position, baseSalary, yearsOfService } = req.body;

      // Validaciones de entrada
      if (!name || !position) {
        return res.status(400).json({ message: 'Nombre y puesto son obligatorios' });
      }

      if (typeof baseSalary !== 'number' || baseSalary <= 0) {
        return res.status(400).json({ message: 'El salario base debe ser mayor a 0' });
      }

      if (
        typeof yearsOfService !== 'number' ||
        yearsOfService < 0 ||
        !Number.isInteger(yearsOfService)
      ) {
        return res.status(400).json({ message: 'La antigüedad debe ser un entero mayor o igual a 0' });
      }

      const employee = await this.employeeService.createEmployee({
        name,
        position,
        baseSalary,
        yearsOfService
      });

      return res.status(201).json(employee);
    } catch (error) {
      next(error);
    }
  };

  // GET /employees
  getAllEmployees = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const employees = await this.employeeService.getAllEmployees();
      return res.json(employees);
    } catch (error) {
      next(error);
    }
  };

  // GET /employees/:id
  getEmployeeById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id as string;
      const employee = await this.employeeService.getEmployeeById(id);

      if (!employee) {
        return res.status(404).json({ message: 'Empleado no encontrado' });
      }

      return res.json(employee);
    } catch (error) {
      next(error);
    }
  };
}

export const employeeController = new EmployeeController();
