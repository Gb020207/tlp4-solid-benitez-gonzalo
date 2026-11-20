import { Router } from 'express';
import { employeeController } from '../controllers/employee.controller.js';

// Responsabilidad: Definición de las rutas HTTP para empleados
const router = Router();

router.post('/', employeeController.createEmployee);
router.get('/', employeeController.getAllEmployees);
router.get('/:id', employeeController.getEmployeeById);

export default router;
