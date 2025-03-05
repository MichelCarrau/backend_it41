import express from 'express';

export class UserRoutes {

    initUserRoutes(app = express.application) {
        app.get('/hello', (req, res) => {
            res.send('<p>Hello World!</p><img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOXRyMnJqa284c21xdndoeHlzMnRkMndtbjc5YjUxNjE5aXo2azdhayZlcD12MV9naWZzX3NlYXJjaCZjdD1n/Vuw9m5wXviFIQ/giphy.gif" />');
        });
          
        app.get('/bye', (req, res) => {
            res.status(404).send('Not Found');
        });

        app.post('/user-data', (req, res) => {
            const { user, password } = req.body;
            
            console.log('Json object', req.body);
            console.log(user, password);
            res.status(200).send('Hello $(user), you are awesome!');
        });

        app.post('/get-user', async (req, res) => {
            try {
                const { condition } = req.body;
                const user = await UserModel.findAll({
                    where: condition
                });

                if(user.length > 0 ) {
                    res.status(200).send({ ok: true, data: user });
                }
                res.status(200).send({ ok: true, data: user });
            } catch (error) {
                console.error('Error', error);
                res.status(500).send({ ok: false, message: ' Internal server error' });
            }
        });

        app.post('/create-user', async (req, res) => {
            try {
                const { user } = req.body;
                const newUser = await UserModel.create(user);
                res.status(200).send({ ok: true, data: newUser });
            } catch (error) {
                console.error('Error', error);
                res.status(500).send({ ok: false, message: 'Internet server error' });
            }
        });
    }
}
