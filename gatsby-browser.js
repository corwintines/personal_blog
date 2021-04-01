'use strict';

require('./src/assets/scss/init.scss');
require('./static/css/prismjs/theme.min.css');

export const onServiceWorkerUpdateReady = () => window.location.reload();
export default onServiceWorkerUpdateReady;
