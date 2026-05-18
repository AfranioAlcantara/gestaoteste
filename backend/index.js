const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger');
const authRoutes = require('./routes/auth');
const vacationRoutes = require('./routes/vacations');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const useLocalStore = process.env.USE_LOCAL_STORE === 'true';

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/auth', authRoutes);
app.use('/api/vacations', vacationRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), localStore: useLocalStore });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Backend rodando em http://localhost:${port} (USE_LOCAL_STORE=${useLocalStore})`);
  console.log(`Swagger docs disponíveis em http://localhost:${port}/api-docs`);
});
