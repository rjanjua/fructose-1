"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.teardown=exports.setup=undefined;require("./fakeCliArgs");require("babel-polyfill");var _detox=require("detox");var _detox2=_interopRequireDefault(_detox);var _server=require("../../server");var _startPackager=require("./startPackager");function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}var log=require('npmlog');var detoxConfig={configurations:{"ios.sim.debug":{binaryPath:"",type:"ios.simulator",name:"iPhone 7, iOS 10.3"}}};var fructosePackager=void 0;var server=void 0;var setup=exports.setup=function setup(){var config=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};return regeneratorRuntime.async(function setup$(_context){while(1){switch(_context.prev=_context.next){case 0:_context.next=2;return regeneratorRuntime.awrap((0,_startPackager.startPackager)().then(function(){return log.verbose("packager started");}));case 2:fructosePackager=_context.sent;server=new _server.FructoseServer(7811);_context.next=6;return regeneratorRuntime.awrap(server.start().then(function(){return log.verbose("fructose server started on 7811",server.server.address());}));case 6:if(!config.binaryPath){_context.next=10;break;}detoxConfig.configurations["ios.sim.debug"].binaryPath=config.binaryPath;_context.next=11;break;case 10:throw new Error({msg:"No binaryPath was provided, you need to pass in a config object"});case 11:_context.next=13;return regeneratorRuntime.awrap(_detox2.default.init(detoxConfig).then(function(){return log.verbose("detox inited");}));case 13:case"end":return _context.stop();}}},null,undefined);};var teardown=exports.teardown=function teardown(){return regeneratorRuntime.async(function teardown$(_context2){while(1){switch(_context2.prev=_context2.next){case 0:_context2.next=2;return regeneratorRuntime.awrap((0,_startPackager.kill)(fructosePackager));case 2:server.close();_context2.next=5;return regeneratorRuntime.awrap(_detox2.default.cleanup());case 5:case"end":return _context2.stop();}}},null,undefined);};