import { Router } from "express";
import blogRoutes from "./blogs";
import userRoutes from "./users";

const router = Router();
// todas las rutas que lleguen a /api/blogs, ejecutaran lo que se exporto de blogRoutes
router.use("/blogs", blogRoutes);
router.use("/users", userRoutes);

// se pueden agregar todas las rutas que se necesiten, estaran dentro de /api

export default router;
