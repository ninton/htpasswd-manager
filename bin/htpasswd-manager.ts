#!/usr/bin/env node
/* eslint no-console:0 */
import HtpasswdManager from '../libs/HtpasswdManager';

try {
  const htpasswdManager = new HtpasswdManager(process.argv);
  htpasswdManager.run();
} catch (e) {
  console.error(e.toString());
  console.error('Usage:');
  console.error('        htpasswd-manager user_password_csv passwordfile');
  console.error('example:');
  console.error('        htpasswd-manager user_password.csv .htpasswd');
  process.exit(-1);
}
