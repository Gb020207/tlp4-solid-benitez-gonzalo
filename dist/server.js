"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const employee_routes_js_1 = __importDefault(require("./routes/employee.routes.js"));
const errorHandler_js_1 = require("./middlewares/errorHandler.js");
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Rutas
app.use('/employees', employee_routes_js_1.default);
// Manejador centralizado de errores
app.use(errorHandler_js_1.errorHandler);
const PORT = Number(process.env.PORT ?? 3000);
const MONGO_URI = process.env.MONGO_URI ?? 'mongodb://localhost:27017/employees_db';
mongoose_1.default
    .connect(MONGO_URI)
    .then(() => {
    console.log('MongoDB conectado');
    app.listen(PORT, () => {
        console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });
})
    .catch((error) => {
    console.error('No se pudo conectar a MongoDB', error);
    process.exit(1);
});
exports.default = app;
