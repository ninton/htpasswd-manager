#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint no-console:0 */
var HtgroupManager_1 = __importDefault(require("../libs/HtgroupManager"));
try {
    var htgroupManager = new HtgroupManager_1.default(process.argv);
    htgroupManager.run();
}
catch (e) {
    console.error(e.toString());
    console.error('Usage:');
    console.error('        htgroup-manager user_password_csv groupfile');
    console.error('example:');
    console.error('        htgroup-manager user_password.csv .htgroup');
    process.exit(-1);
}
//# sourceMappingURL=htgroup-manager.js.map