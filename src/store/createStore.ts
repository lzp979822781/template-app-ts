import { create } from 'dva-core';
import * as models from '../models';
const app: any = create();

/* function loadModels(): void {
    require('../models').default.forEach(item => app.model(item.default))
} */
function loadModels(): void {
    for(let key in models) {
        app.model(models[key])
    }
}

loadModels(); 
app.start();

export { app };

export default app._store;




