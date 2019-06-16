#!/usr/bin/env node
/* eslint no-console:0 */
import HtgroupManager from '../libs/HtgroupManager';

try {
  const htgroupManager = new HtgroupManager(process.argv);
  htgroupManager.run();
} catch (e) {
  console.error(e.toString());
  console.error('Usage:');
  console.error('        htgroup-manager user_password_csv groupfile');
  console.error('example:');
  console.error('        htgroup-manager user_password.csv .htgroup');
  process.exit(-1);
}
