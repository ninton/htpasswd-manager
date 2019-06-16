#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint no-console:0 */
var HtpasswdManager_1 = __importDefault(require("../libs/HtpasswdManager"));
try {
    var htpasswdManager = new HtpasswdManager_1.default(process.argv);
    htpasswdManager.run();
}
catch (e) {
    console.error(e.toString());
    console.error('Usage:');
    console.error('        htpasswd-manager user_password_csv passwordfile');
    console.error('example:');
    console.error('        htpasswd-manager user_password.csv .htpasswd');
    process.exit(-1);
}
//# sourceMappingURL=htpasswd-manager.js.map