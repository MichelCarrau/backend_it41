import express from 'express';
import { UserModel } from '../model/user.model.js'

export class UserRoutes {
    
    initUserRoutes(app) {
        app.get('/hello', (req, res) => {
          res.send('<p>Hello World!</p>');
        });

        // Nueva ruta para actualizar usuario
        app.put('/update-user/:id', async (req, res) => {
            try {
                const userId = req.params.id; // Obtiene el ID desde la URL
                const { name, password } = req.body; // Obtiene los datos del body

                // Validar que los datos sean correctos
                if (!name && !password) {
                    return res.status(400).json({ ok: false, message: 'No data provided for update' });
                }

                // Se bucsan el usuario en la base de datos
                const user = await UserModel.findByPk(userId);
                if (!user) {
                    return res.status(404).json({ ok: false, message: 'User not found' });
                }

                // Se actualizan los datos solo si fueron proporcionados
                if (name) user.name = name;
                if (password) user.password = password;

                // Guarda los cambios en la base de datos
                await user.save();

                res.status(200).json({ ok: true, message: 'User updated successfully', data: user });

            } catch (error) {
                console.error('Error updating user:', error);
                res.status(500).json({ ok: false, message: 'Internal server error' });
            }
        });
    }
}