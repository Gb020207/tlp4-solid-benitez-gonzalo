import { Schema, model, Document } from 'mongoose';

// Interfaz que define la estructura del documento de Empleado
export interface IEmployee extends Document {
  name: string;
  position: string;
  baseSalary: number;
  yearsOfService: number;
  finalSalary: number;
  createdAt: Date;
  updatedAt: Date;
}

// Esquema de Mongoose para la colección de empleados
const employeeSchema = new Schema<IEmployee>(
  {
    name: { type: String, required: true },
    position: { type: String, required: true },
    baseSalary: { type: Number, required: true },
    yearsOfService: { type: Number, required: true },
    finalSalary: { type: Number, required: true }
  },
  { timestamps: true }
);

// Modelo de Mongoose
export const Employee = model<IEmployee>('Employee', employeeSchema);
export const EmployeeModel = Employee;
export default Employee;
