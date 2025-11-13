import { getProfile, updateProfile, changePassword, createProfile } from './profile.service.js';
import { createProfileSchema } from './profile.schema.js';
export async function getProfileCtrl(req, res) {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'No autorizado' });
        }
        const profile = await getProfile(req.user.sub);
        if (!profile) {
            return res.status(404).json({ message: 'Perfil no encontrado' });
        }
        res.json(profile);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export async function createProfileCtrl(req, res) {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'No autorizado' });
        }
        const data = createProfileSchema.parse(req.body);
        // Construir el objeto solo con propiedades definidas
        const profileData = {
            username: data.username,
            userId: req.user.sub
        };
        if (data.bio !== undefined) {
            profileData.bio = data.bio;
        }
        if (data.avatarUrl !== undefined) {
            profileData.avatarUrl = data.avatarUrl;
        }
        const profile = await createProfile(profileData);
        res.status(201).json(profile);
    }
    catch (error) {
        if (error.code === 'P2002') {
            return res.status(409).json({ message: 'El perfil ya existe para este usuario' });
        }
        res.status(400).json({ message: error.message });
    }
}
export async function updateProfileCtrl(req, res) {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'No autorizado' });
        }
        const updatedProfile = await updateProfile(req.user.sub, req.body);
        res.json(updatedProfile);
    }
    catch (error) {
        if (error.code === 'P2002') {
            return res.status(409).json({ message: 'El email o username ya está en uso' });
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
//# sourceMappingURL=profile.controller.js.map