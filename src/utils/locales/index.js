import store from '../../redux/Store'

export default function translate(string) {
    const lang = store.getState().app.language;
    const localesData = require('./locales.json');
    return (localesData[string] && localesData[string][lang] ? localesData[string][lang] : string);
}