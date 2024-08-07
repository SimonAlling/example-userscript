import { ALWAYS } from "userscripter/run-time/environment";
import { Stylesheets, stylesheet } from "userscripter/run-time/stylesheets";

import { P, Preferences } from "~src/preferences";

import stylesheetFoobars from "./stylesheets/foobars.scss";
import stylesheetMain from "./stylesheets/main.scss";

function i(x: string) {
    return "example-userscript-stylesheet-" + x;
}

const STYLESHEETS = {
    main: stylesheet({
        condition: ALWAYS,
        css: stylesheetMain,
    }),
    foobars: stylesheet({
        condition: () => Preferences.get(P.foobars._.insert),
        id: i("foobars"),
        css: stylesheetFoobars,
    }),
} as const;

// This trick uncovers type errors in STYLESHEETS while retaining the static knowledge of its properties (so we can still write e.g. STYLESHEETS.foo):
const _: Stylesheets = STYLESHEETS; void _;

export default STYLESHEETS;
