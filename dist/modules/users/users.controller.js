import { listUsers, findUserById, findUserByEmail, updateUser, deleteUser, updateProfile, changePassword } from './users.service.js';
export async function listUsersCtrl(_req, res) {
    try {
        const users = await listUsers();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export async function getUserCtrl(req, res) {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }
        const user = await findUserById(id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export async function meCtrl(req, res) {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'No autorizado' });
        }
        const user = await findUserByEmail(req.user.email);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json({
            id: user.id,
            email: user.email,
            name: user.name,
            createdAt: user.createdAt
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export async function updateUserCtrl(req, res) {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }
        const user = await updateUser(id, req.body);
        res.json(user);
    }
    catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        if (error.code === 'P2002') {
            return res.status(409).json({ message: 'El email ya está en uso' });
        }
        res.status(500).json({ message: error.message });
    }
}
export async function deleteUserCtrl(req, res) {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }
        await deleteUser(id);
        res.status(204).send();
    }
    catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(500).json({ message: error.message });
    }
}
export async function updateProfileCtrl(req, res) {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'No autorizado' });
        }
        const user = await updateProfile(req.user.sub, req.body);
        res.json(user);
    }
    catch (error) {
        if (error.code === 'P2002') {
            return res.status(409).json({ message: 'El email ya está en uso' });
        }
        res.status(500).json({ message: error.message });
    }
}
export async function changePasswordCtrl(req, res) {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'No autorizado' });
        }
        const { currentPassword, newPassword } = req.body;
        const result = await changePassword(req.user.sub, currentPassword, newPassword);
        res.json(result);
    }
    catch (error) {
        if (error.message === 'Contraseña actual incorrecta') {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: error.message });
    }
}
//# sourceMappingURL=users.controller.js.map