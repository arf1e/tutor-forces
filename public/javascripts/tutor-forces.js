import '../scss/style.scss';

import autocomplete from './modules/autocomplete.js';
import { $, $$} from './modules/bling';

autocomplete( $('#address'), $('#lng'), $('#lat'));