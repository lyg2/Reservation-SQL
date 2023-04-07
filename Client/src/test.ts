// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import { getTestBed } from "@angular/core/testing";
import {
  platformBrowserDynamicTesting,
  BrowserDynamicTestingModule
} from "@angular/platform-browser-dynamic/testing";
import "zone.js/dist/zone-testing";

// eslint-disable-next-line @typescript-eslint/no-explicit-any, , 
declare const require: any;

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
);
// Then we find all the tests.
// eslint-disable-next-line
const context = require.context("./", true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);
