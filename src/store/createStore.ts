import { create } from 'dva-core';

const app: any = create();

function loadModels(): void {
    require('../models').default.forEach(item => app.model(item.default))
}

loadModels();
app.start();

export default app._store;




