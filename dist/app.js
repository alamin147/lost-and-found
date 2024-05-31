"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./app/routes/routes"));
const errorHandler_1 = __importDefault(require("./app/midddlewares/errorHandler"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.send({ message: "Welcome to Lost and found services" });
});
app.use("/api", routes_1.default);
app.use(errorHandler_1.default);
app.use((req, res) => {
    res.status(404).send({
        statusCode: 404,
        success: false,
        message: "Sorry, We can't find that!",
    });
});
exports.default = app;
