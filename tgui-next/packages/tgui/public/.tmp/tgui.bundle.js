/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "e0debfa0bc047feaa290";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "tgui";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../node_modules/core-js/internals/a-function.js":
/*!********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/a-function.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  }

  return it;
};

/***/ }),

/***/ "../../node_modules/core-js/internals/a-possible-prototype.js":
/*!******************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/a-possible-prototype.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isObject = __webpack_require__(/*! ../internals/is-object */ "../../node_modules/core-js/internals/is-object.js");

module.exports = function (it) {
  if (!isObject(it) && it !== null) {
    throw TypeError("Can't set " + String(it) + ' as a prototype');
  }

  return it;
};

/***/ }),

/***/ "../../node_modules/core-js/internals/add-to-unscopables.js":
/*!****************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/add-to-unscopables.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../node_modules/core-js/internals/well-known-symbol.js");

var create = __webpack_require__(/*! ../internals/object-create */ "../../node_modules/core-js/internals/object-create.js");

var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "../../node_modules/core-js/internals/create-non-enumerable-property.js");

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype; // Array.prototype[@@unscopables]
// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables

if (ArrayPrototype[UNSCOPABLES] == undefined) {
  createNonEnumerableProperty(ArrayPrototype, UNSCOPABLES, create(null));
} // add a key to Array.prototype[@@unscopables]


module.exports = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};

/***/ }),

/***/ "../../node_modules/core-js/internals/advance-string-index.js":
/*!******************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/advance-string-index.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var charAt = __webpack_require__(/*! ../internals/string-multibyte */ "../../node_modules/core-js/internals/string-multibyte.js").charAt; // `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex


module.exports = function (S, index, unicode) {
  return index + (unicode ? charAt(S, index).length : 1);
};

/***/ }),

/***/ "../../node_modules/core-js/internals/an-instance.js":
/*!*********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/an-instance.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (it, Constructor, name) {
  if (!(it instanceof Constructor)) {
    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
  }

  return it;
};

/***/ }),

/***/ "../../node_modules/core-js/internals/an-object.js":
/*!*******************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/an-object.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isObject = __webpack_require__(/*! ../internals/is-object */ "../../node_modules/core-js/internals/is-object.js");

module.exports = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  }

  return it;
};

/***/ }),

/***/ "../../node_modules/core-js/internals/array-buffer-view-core.js":
/*!********************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/array-buffer-view-core.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../node_modules/core-js/internals/descriptors.js");

var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");

var isObject = __webpack_require__(/*! ../internals/is-object */ "../../node_modules/core-js/internals/is-object.js");

var has = __webpack_require__(/*! ../internals/has */ "../../node_modules/core-js/internals/has.js");

var classof = __webpack_require__(/*! ../internals/classof */ "../../node_modules/core-js/internals/classof.js");

var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "../../node_modules/core-js/internals/create-non-enumerable-property.js");

var redefine = __webpack_require__(/*! ../internals/redefine */ "../../node_modules/core-js/internals/redefine.js");

var defineProperty = __webpack_require__(/*! ../internals/object-define-property */ "../../node_modules/core-js/internals/object-define-property.js").f;

var getPrototypeOf = __webpack_require__(/*! ../internals/object-get-prototype-of */ "../../node_modules/core-js/internals/object-get-prototype-of.js");

var setPrototypeOf = __webpack_require__(/*! ../internals/object-set-prototype-of */ "../../node_modules/core-js/internals/object-set-prototype-of.js");

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../node_modules/core-js/internals/well-known-symbol.js");

var uid = __webpack_require__(/*! ../internals/uid */ "../../node_modules/core-js/internals/uid.js");

var DataView = global.DataView;
var DataViewPrototype = DataView && DataView.prototype;
var Int8Array = global.Int8Array;
var Int8ArrayPrototype = Int8Array && Int8Array.prototype;
var Uint8ClampedArray = global.Uint8ClampedArray;
var Uint8ClampedArrayPrototype = Uint8ClampedArray && Uint8ClampedArray.prototype;
var TypedArray = Int8Array && getPrototypeOf(Int8Array);
var TypedArrayPrototype = Int8ArrayPrototype && getPrototypeOf(Int8ArrayPrototype);
var ObjectPrototype = Object.prototype;
var isPrototypeOf = ObjectPrototype.isPrototypeOf;
var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var TYPED_ARRAY_TAG = uid('TYPED_ARRAY_TAG');
var NATIVE_ARRAY_BUFFER = !!(global.ArrayBuffer && DataView); // Fixing native typed arrays in Opera Presto crashes the browser, see #595

var NATIVE_ARRAY_BUFFER_VIEWS = NATIVE_ARRAY_BUFFER && !!setPrototypeOf && classof(global.opera) !== 'Opera';
var TYPED_ARRAY_TAG_REQIRED = false;
var NAME;
var TypedArrayConstructorsList = {
  Int8Array: 1,
  Uint8Array: 1,
  Uint8ClampedArray: 1,
  Int16Array: 2,
  Uint16Array: 2,
  Int32Array: 4,
  Uint32Array: 4,
  Float32Array: 4,
  Float64Array: 8
};

var isView = function () {
  function isView(it) {
    var klass = classof(it);
    return klass === 'DataView' || has(TypedArrayConstructorsList, klass);
  }

  return isView;
}();

var isTypedArray = function isTypedArray(it) {
  return isObject(it) && has(TypedArrayConstructorsList, classof(it));
};

var aTypedArray = function aTypedArray(it) {
  if (isTypedArray(it)) return it;
  throw TypeError('Target is not a typed array');
};

var aTypedArrayConstructor = function aTypedArrayConstructor(C) {
  if (setPrototypeOf) {
    if (isPrototypeOf.call(TypedArray, C)) return C;
  } else for (var ARRAY in TypedArrayConstructorsList) {
    if (has(TypedArrayConstructorsList, NAME)) {
      var TypedArrayConstructor = global[ARRAY];

      if (TypedArrayConstructor && (C === TypedArrayConstructor || isPrototypeOf.call(TypedArrayConstructor, C))) {
        return C;
      }
    }
  }

  throw TypeError('Target is not a typed array constructor');
};

var exportProto = function exportProto(KEY, property, forced) {
  if (!DESCRIPTORS) return;
  if (forced) for (var ARRAY in TypedArrayConstructorsList) {
    var TypedArrayConstructor = global[ARRAY];

    if (TypedArrayConstructor && has(TypedArrayConstructor.prototype, KEY)) {
      delete TypedArrayConstructor.prototype[KEY];
    }
  }

  if (!TypedArrayPrototype[KEY] || forced) {
    redefine(TypedArrayPrototype, KEY, forced ? property : NATIVE_ARRAY_BUFFER_VIEWS && Int8ArrayPrototype[KEY] || property);
  }
};

var exportStatic = function exportStatic(KEY, property, forced) {
  var ARRAY, TypedArrayConstructor;
  if (!DESCRIPTORS) return;

  if (setPrototypeOf) {
    if (forced) for (ARRAY in TypedArrayConstructorsList) {
      TypedArrayConstructor = global[ARRAY];

      if (TypedArrayConstructor && has(TypedArrayConstructor, KEY)) {
        delete TypedArrayConstructor[KEY];
      }
    }

    if (!TypedArray[KEY] || forced) {
      // V8 ~ Chrome 49-50 `%TypedArray%` methods are non-writable non-configurable
      try {
        return redefine(TypedArray, KEY, forced ? property : NATIVE_ARRAY_BUFFER_VIEWS && Int8Array[KEY] || property);
      } catch (error) {
        /* empty */
      }
    } else return;
  }

  for (ARRAY in TypedArrayConstructorsList) {
    TypedArrayConstructor = global[ARRAY];

    if (TypedArrayConstructor && (!TypedArrayConstructor[KEY] || forced)) {
      redefine(TypedArrayConstructor, KEY, property);
    }
  }
};

for (NAME in TypedArrayConstructorsList) {
  if (!global[NAME]) NATIVE_ARRAY_BUFFER_VIEWS = false;
} // WebKit bug - typed arrays constructors prototype is Object.prototype


if (!NATIVE_ARRAY_BUFFER_VIEWS || typeof TypedArray != 'function' || TypedArray === Function.prototype) {
  // eslint-disable-next-line no-shadow
  TypedArray = function () {
    function TypedArray() {
      throw TypeError('Incorrect invocation');
    }

    return TypedArray;
  }();

  if (NATIVE_ARRAY_BUFFER_VIEWS) for (NAME in TypedArrayConstructorsList) {
    if (global[NAME]) setPrototypeOf(global[NAME], TypedArray);
  }
}

if (!NATIVE_ARRAY_BUFFER_VIEWS || !TypedArrayPrototype || TypedArrayPrototype === ObjectPrototype) {
  TypedArrayPrototype = TypedArray.prototype;
  if (NATIVE_ARRAY_BUFFER_VIEWS) for (NAME in TypedArrayConstructorsList) {
    if (global[NAME]) setPrototypeOf(global[NAME].prototype, TypedArrayPrototype);
  }
} // WebKit bug - one more object in Uint8ClampedArray prototype chain


if (NATIVE_ARRAY_BUFFER_VIEWS && getPrototypeOf(Uint8ClampedArrayPrototype) !== TypedArrayPrototype) {
  setPrototypeOf(Uint8ClampedArrayPrototype, TypedArrayPrototype);
}

if (DESCRIPTORS && !has(TypedArrayPrototype, TO_STRING_TAG)) {
  TYPED_ARRAY_TAG_REQIRED = true;
  defineProperty(TypedArrayPrototype, TO_STRING_TAG, {
    get: function () {
      function get() {
        return isObject(this) ? this[TYPED_ARRAY_TAG] : undefined;
      }

      return get;
    }()
  });

  for (NAME in TypedArrayConstructorsList) {
    if (global[NAME]) {
      createNonEnumerableProperty(global[NAME], TYPED_ARRAY_TAG, NAME);
    }
  }
} // WebKit bug - the same parent prototype for typed arrays and data view


if (NATIVE_ARRAY_BUFFER && setPrototypeOf && getPrototypeOf(DataViewPrototype) !== ObjectPrototype) {
  setPrototypeOf(DataViewPrototype, ObjectPrototype);
}

module.exports = {
  NATIVE_ARRAY_BUFFER: NATIVE_ARRAY_BUFFER,
  NATIVE_ARRAY_BUFFER_VIEWS: NATIVE_ARRAY_BUFFER_VIEWS,
  TYPED_ARRAY_TAG: TYPED_ARRAY_TAG_REQIRED && TYPED_ARRAY_TAG,
  aTypedArray: aTypedArray,
  aTypedArrayConstructor: aTypedArrayConstructor,
  exportProto: exportProto,
  exportStatic: exportStatic,
  isView: isView,
  isTypedArray: isTypedArray,
  TypedArray: TypedArray,
  TypedArrayPrototype: TypedArrayPrototype
};

/***/ }),

/***/ "../../node_modules/core-js/internals/array-buffer.js":
/*!**********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/array-buffer.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../node_modules/core-js/internals/descriptors.js");

var NATIVE_ARRAY_BUFFER = __webpack_require__(/*! ../internals/array-buffer-view-core */ "../../node_modules/core-js/internals/array-buffer-view-core.js").NATIVE_ARRAY_BUFFER;

var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "../../node_modules/core-js/internals/create-non-enumerable-property.js");

var redefineAll = __webpack_require__(/*! ../internals/redefine-all */ "../../node_modules/core-js/internals/redefine-all.js");

var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");

var anInstance = __webpack_require__(/*! ../internals/an-instance */ "../../node_modules/core-js/internals/an-instance.js");

var toInteger = __webpack_require__(/*! ../internals/to-integer */ "../../node_modules/core-js/internals/to-integer.js");

var toLength = __webpack_require__(/*! ../internals/to-length */ "../../node_modules/core-js/internals/to-length.js");

var toIndex = __webpack_require__(/*! ../internals/to-index */ "../../node_modules/core-js/internals/to-index.js");

var getOwnPropertyNames = __webpack_require__(/*! ../internals/object-get-own-property-names */ "../../node_modules/core-js/internals/object-get-own-property-names.js").f;

var defineProperty = __webpack_require__(/*! ../internals/object-define-property */ "../../node_modules/core-js/internals/object-define-property.js").f;

var arrayFill = __webpack_require__(/*! ../internals/array-fill */ "../../node_modules/core-js/internals/array-fill.js");

var setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ "../../node_modules/core-js/internals/set-to-string-tag.js");

var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "../../node_modules/core-js/internals/internal-state.js");

var getInternalState = InternalStateModule.get;
var setInternalState = InternalStateModule.set;
var ARRAY_BUFFER = 'ArrayBuffer';
var DATA_VIEW = 'DataView';
var PROTOTYPE = 'prototype';
var WRONG_LENGTH = 'Wrong length';
var WRONG_INDEX = 'Wrong index';
var NativeArrayBuffer = global[ARRAY_BUFFER];
var $ArrayBuffer = NativeArrayBuffer;
var $DataView = global[DATA_VIEW];
var Math = global.Math;
var RangeError = global.RangeError; // eslint-disable-next-line no-shadow-restricted-names

var Infinity = 1 / 0;
var abs = Math.abs;
var pow = Math.pow;
var floor = Math.floor;
var log = Math.log;
var LN2 = Math.LN2; // IEEE754 conversions based on https://github.com/feross/ieee754

var packIEEE754 = function packIEEE754(number, mantissaLength, bytes) {
  var buffer = new Array(bytes);
  var exponentLength = bytes * 8 - mantissaLength - 1;
  var eMax = (1 << exponentLength) - 1;
  var eBias = eMax >> 1;
  var rt = mantissaLength === 23 ? pow(2, -24) - pow(2, -77) : 0;
  var sign = number < 0 || number === 0 && 1 / number < 0 ? 1 : 0;
  var index = 0;
  var exponent, mantissa, c;
  number = abs(number); // eslint-disable-next-line no-self-compare

  if (number != number || number === Infinity) {
    // eslint-disable-next-line no-self-compare
    mantissa = number != number ? 1 : 0;
    exponent = eMax;
  } else {
    exponent = floor(log(number) / LN2);

    if (number * (c = pow(2, -exponent)) < 1) {
      exponent--;
      c *= 2;
    }

    if (exponent + eBias >= 1) {
      number += rt / c;
    } else {
      number += rt * pow(2, 1 - eBias);
    }

    if (number * c >= 2) {
      exponent++;
      c /= 2;
    }

    if (exponent + eBias >= eMax) {
      mantissa = 0;
      exponent = eMax;
    } else if (exponent + eBias >= 1) {
      mantissa = (number * c - 1) * pow(2, mantissaLength);
      exponent = exponent + eBias;
    } else {
      mantissa = number * pow(2, eBias - 1) * pow(2, mantissaLength);
      exponent = 0;
    }
  }

  for (; mantissaLength >= 8; buffer[index++] = mantissa & 255, mantissa /= 256, mantissaLength -= 8) {
    ;
  }

  exponent = exponent << mantissaLength | mantissa;
  exponentLength += mantissaLength;

  for (; exponentLength > 0; buffer[index++] = exponent & 255, exponent /= 256, exponentLength -= 8) {
    ;
  }

  buffer[--index] |= sign * 128;
  return buffer;
};

var unpackIEEE754 = function unpackIEEE754(buffer, mantissaLength) {
  var bytes = buffer.length;
  var exponentLength = bytes * 8 - mantissaLength - 1;
  var eMax = (1 << exponentLength) - 1;
  var eBias = eMax >> 1;
  var nBits = exponentLength - 7;
  var index = bytes - 1;
  var sign = buffer[index--];
  var exponent = sign & 127;
  var mantissa;
  sign >>= 7;

  for (; nBits > 0; exponent = exponent * 256 + buffer[index], index--, nBits -= 8) {
    ;
  }

  mantissa = exponent & (1 << -nBits) - 1;
  exponent >>= -nBits;
  nBits += mantissaLength;

  for (; nBits > 0; mantissa = mantissa * 256 + buffer[index], index--, nBits -= 8) {
    ;
  }

  if (exponent === 0) {
    exponent = 1 - eBias;
  } else if (exponent === eMax) {
    return mantissa ? NaN : sign ? -Infinity : Infinity;
  } else {
    mantissa = mantissa + pow(2, mantissaLength);
    exponent = exponent - eBias;
  }

  return (sign ? -1 : 1) * mantissa * pow(2, exponent - mantissaLength);
};

var unpackInt32 = function unpackInt32(buffer) {
  return buffer[3] << 24 | buffer[2] << 16 | buffer[1] << 8 | buffer[0];
};

var packInt8 = function packInt8(number) {
  return [number & 0xFF];
};

var packInt16 = function packInt16(number) {
  return [number & 0xFF, number >> 8 & 0xFF];
};

var packInt32 = function packInt32(number) {
  return [number & 0xFF, number >> 8 & 0xFF, number >> 16 & 0xFF, number >> 24 & 0xFF];
};

var packFloat32 = function packFloat32(number) {
  return packIEEE754(number, 23, 4);
};

var packFloat64 = function packFloat64(number) {
  return packIEEE754(number, 52, 8);
};

var addGetter = function addGetter(Constructor, key) {
  defineProperty(Constructor[PROTOTYPE], key, {
    get: function () {
      function get() {
        return getInternalState(this)[key];
      }

      return get;
    }()
  });
};

var get = function get(view, count, index, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  var store = getInternalState(view);
  if (intIndex + count > store.byteLength) throw RangeError(WRONG_INDEX);
  var bytes = getInternalState(store.buffer).bytes;
  var start = intIndex + store.byteOffset;
  var pack = bytes.slice(start, start + count);
  return isLittleEndian ? pack : pack.reverse();
};

var set = function set(view, count, index, conversion, value, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  var store = getInternalState(view);
  if (intIndex + count > store.byteLength) throw RangeError(WRONG_INDEX);
  var bytes = getInternalState(store.buffer).bytes;
  var start = intIndex + store.byteOffset;
  var pack = conversion(+value);

  for (var i = 0; i < count; i++) {
    bytes[start + i] = pack[isLittleEndian ? i : count - i - 1];
  }
};

if (!NATIVE_ARRAY_BUFFER) {
  $ArrayBuffer = function () {
    function ArrayBuffer(length) {
      anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
      var byteLength = toIndex(length);
      setInternalState(this, {
        bytes: arrayFill.call(new Array(byteLength), 0),
        byteLength: byteLength
      });
      if (!DESCRIPTORS) this.byteLength = byteLength;
    }

    return ArrayBuffer;
  }();

  $DataView = function () {
    function DataView(buffer, byteOffset, byteLength) {
      anInstance(this, $DataView, DATA_VIEW);
      anInstance(buffer, $ArrayBuffer, DATA_VIEW);
      var bufferLength = getInternalState(buffer).byteLength;
      var offset = toInteger(byteOffset);
      if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset');
      byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
      if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
      setInternalState(this, {
        buffer: buffer,
        byteLength: byteLength,
        byteOffset: offset
      });

      if (!DESCRIPTORS) {
        this.buffer = buffer;
        this.byteLength = byteLength;
        this.byteOffset = offset;
      }
    }

    return DataView;
  }();

  if (DESCRIPTORS) {
    addGetter($ArrayBuffer, 'byteLength');
    addGetter($DataView, 'buffer');
    addGetter($DataView, 'byteLength');
    addGetter($DataView, 'byteOffset');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function () {
      function getInt8(byteOffset) {
        return get(this, 1, byteOffset)[0] << 24 >> 24;
      }

      return getInt8;
    }(),
    getUint8: function () {
      function getUint8(byteOffset) {
        return get(this, 1, byteOffset)[0];
      }

      return getUint8;
    }(),
    getInt16: function () {
      function getInt16(byteOffset
      /* , littleEndian */
      ) {
        var bytes = get(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : undefined);
        return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
      }

      return getInt16;
    }(),
    getUint16: function () {
      function getUint16(byteOffset
      /* , littleEndian */
      ) {
        var bytes = get(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : undefined);
        return bytes[1] << 8 | bytes[0];
      }

      return getUint16;
    }(),
    getInt32: function () {
      function getInt32(byteOffset
      /* , littleEndian */
      ) {
        return unpackInt32(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined));
      }

      return getInt32;
    }(),
    getUint32: function () {
      function getUint32(byteOffset
      /* , littleEndian */
      ) {
        return unpackInt32(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined)) >>> 0;
      }

      return getUint32;
    }(),
    getFloat32: function () {
      function getFloat32(byteOffset
      /* , littleEndian */
      ) {
        return unpackIEEE754(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined), 23);
      }

      return getFloat32;
    }(),
    getFloat64: function () {
      function getFloat64(byteOffset
      /* , littleEndian */
      ) {
        return unpackIEEE754(get(this, 8, byteOffset, arguments.length > 1 ? arguments[1] : undefined), 52);
      }

      return getFloat64;
    }(),
    setInt8: function () {
      function setInt8(byteOffset, value) {
        set(this, 1, byteOffset, packInt8, value);
      }

      return setInt8;
    }(),
    setUint8: function () {
      function setUint8(byteOffset, value) {
        set(this, 1, byteOffset, packInt8, value);
      }

      return setUint8;
    }(),
    setInt16: function () {
      function setInt16(byteOffset, value
      /* , littleEndian */
      ) {
        set(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : undefined);
      }

      return setInt16;
    }(),
    setUint16: function () {
      function setUint16(byteOffset, value
      /* , littleEndian */
      ) {
        set(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : undefined);
      }

      return setUint16;
    }(),
    setInt32: function () {
      function setInt32(byteOffset, value
      /* , littleEndian */
      ) {
        set(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : undefined);
      }

      return setInt32;
    }(),
    setUint32: function () {
      function setUint32(byteOffset, value
      /* , littleEndian */
      ) {
        set(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : undefined);
      }

      return setUint32;
    }(),
    setFloat32: function () {
      function setFloat32(byteOffset, value
      /* , littleEndian */
      ) {
        set(this, 4, byteOffset, packFloat32, value, arguments.length > 2 ? arguments[2] : undefined);
      }

      return setFloat32;
    }(),
    setFloat64: function () {
      function setFloat64(byteOffset, value
      /* , littleEndian */
      ) {
        set(this, 8, byteOffset, packFloat64, value, arguments.length > 2 ? arguments[2] : undefined);
      }

      return setFloat64;
    }()
  });
} else {
  if (!fails(function () {
    NativeArrayBuffer(1);
  }) || !fails(function () {
    new NativeArrayBuffer(-1); // eslint-disable-line no-new
  }) || fails(function () {
    new NativeArrayBuffer(); // eslint-disable-line no-new

    new NativeArrayBuffer(1.5); // eslint-disable-line no-new

    new NativeArrayBuffer(NaN); // eslint-disable-line no-new

    return NativeArrayBuffer.name != ARRAY_BUFFER;
  })) {
    $ArrayBuffer = function () {
      function ArrayBuffer(length) {
        anInstance(this, $ArrayBuffer);
        return new NativeArrayBuffer(toIndex(length));
      }

      return ArrayBuffer;
    }();

    var ArrayBufferPrototype = $ArrayBuffer[PROTOTYPE] = NativeArrayBuffer[PROTOTYPE];

    for (var keys = getOwnPropertyNames(NativeArrayBuffer), j = 0, key; keys.length > j;) {
      if (!((key = keys[j++]) in $ArrayBuffer)) {
        createNonEnumerableProperty($ArrayBuffer, key, NativeArrayBuffer[key]);
      }
    }

    ArrayBufferPrototype.constructor = $ArrayBuffer;
  } // iOS Safari 7.x bug


  var testView = new $DataView(new $ArrayBuffer(2));
  var nativeSetInt8 = $DataView[PROTOTYPE].setInt8;
  testView.setInt8(0, 2147483648);
  testView.setInt8(1, 2147483649);
  if (testView.getInt8(0) || !testView.getInt8(1)) redefineAll($DataView[PROTOTYPE], {
    setInt8: function () {
      function setInt8(byteOffset, value) {
        nativeSetInt8.call(this, byteOffset, value << 24 >> 24);
      }

      return setInt8;
    }(),
    setUint8: function () {
      function setUint8(byteOffset, value) {
        nativeSetInt8.call(this, byteOffset, value << 24 >> 24);
      }

      return setUint8;
    }()
  }, {
    unsafe: true
  });
}

setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);
module.exports = {
  ArrayBuffer: $ArrayBuffer,
  DataView: $DataView
};

/***/ }),

/***/ "../../node_modules/core-js/internals/array-copy-within.js":
/*!***************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/array-copy-within.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toObject = __webpack_require__(/*! ../internals/to-object */ "../../node_modules/core-js/internals/to-object.js");

var toAbsoluteIndex = __webpack_require__(/*! ../internals/to-absolute-index */ "../../node_modules/core-js/internals/to-absolute-index.js");

var toLength = __webpack_require__(/*! ../internals/to-length */ "../../node_modules/core-js/internals/to-length.js");

var min = Math.min; // `Array.prototype.copyWithin` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.copywithin

module.exports = [].copyWithin || function () {
  function copyWithin(target
  /* = 0 */
  , start
  /* = 0, end = @length */
  ) {
    var O = toObject(this);
    var len = toLength(O.length);
    var to = toAbsoluteIndex(target, len);
    var from = toAbsoluteIndex(start, len);
    var end = arguments.length > 2 ? arguments[2] : undefined;
    var count = min((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
    var inc = 1;

    if (from < to && to < from + count) {
      inc = -1;
      from += count - 1;
      to += count - 1;
    }

    while (count-- > 0) {
      if (from in O) O[to] = O[from];else delete O[to];
      to += inc;
      from += inc;
    }

    return O;
  }

  return copyWithin;
}();

/***/ }),

/***/ "../../node_modules/core-js/internals/array-fill.js":
/*!********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/array-fill.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toObject = __webpack_require__(/*! ../internals/to-object */ "../../node_modules/core-js/internals/to-object.js");

var toAbsoluteIndex = __webpack_require__(/*! ../internals/to-absolute-index */ "../../node_modules/core-js/internals/to-absolute-index.js");

var toLength = __webpack_require__(/*! ../internals/to-length */ "../../node_modules/core-js/internals/to-length.js"); // `Array.prototype.fill` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.fill


module.exports = function () {
  function fill(value
  /* , start = 0, end = @length */
  ) {
    var O = toObject(this);
    var length = toLength(O.length);
    var argumentsLength = arguments.length;
    var index = toAbsoluteIndex(argumentsLength > 1 ? arguments[1] : undefined, length);
    var end = argumentsLength > 2 ? arguments[2] : undefined;
    var endPos = end === undefined ? length : toAbsoluteIndex(end, length);

    while (endPos > index) {
      O[index++] = value;
    }

    return O;
  }

  return fill;
}();

/***/ }),

/***/ "../../node_modules/core-js/internals/array-for-each.js":
/*!************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/array-for-each.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $forEach = __webpack_require__(/*! ../internals/array-iteration */ "../../node_modules/core-js/internals/array-iteration.js").forEach;

var sloppyArrayMethod = __webpack_require__(/*! ../internals/sloppy-array-method */ "../../node_modules/core-js/internals/sloppy-array-method.js"); // `Array.prototype.forEach` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach


module.exports = sloppyArrayMethod('forEach') ? function () {
  function forEach(callbackfn
  /* , thisArg */
  ) {
    return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }

  return forEach;
}() : [].forEach;

/***/ }),

/***/ "../../node_modules/core-js/internals/array-from.js":
/*!********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/array-from.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(/*! ../internals/bind-context */ "../../node_modules/core-js/internals/bind-context.js");

var toObject = __webpack_require__(/*! ../internals/to-object */ "../../node_modules/core-js/internals/to-object.js");

var callWithSafeIterationClosing = __webpack_require__(/*! ../internals/call-with-safe-iteration-closing */ "../../node_modules/core-js/internals/call-with-safe-iteration-closing.js");

var isArrayIteratorMethod = __webpack_require__(/*! ../internals/is-array-iterator-method */ "../../node_modules/core-js/internals/is-array-iterator-method.js");

var toLength = __webpack_require__(/*! ../internals/to-length */ "../../node_modules/core-js/internals/to-length.js");

var createProperty = __webpack_require__(/*! ../internals/create-property */ "../../node_modules/core-js/internals/create-property.js");

var getIteratorMethod = __webpack_require__(/*! ../internals/get-iterator-method */ "../../node_modules/core-js/internals/get-iterator-method.js"); // `Array.from` method implementation
// https://tc39.github.io/ecma262/#sec-array.from


module.exports = function () {
  function from(arrayLike
  /* , mapfn = undefined, thisArg = undefined */
  ) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var argumentsLength = arguments.length;
    var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iteratorMethod = getIteratorMethod(O);
    var length, result, step, iterator, next;
    if (mapping) mapfn = bind(mapfn, argumentsLength > 2 ? arguments[2] : undefined, 2); // if the target is not iterable or it's an array with the default iterator - use a simple case

    if (iteratorMethod != undefined && !(C == Array && isArrayIteratorMethod(iteratorMethod))) {
      iterator = iteratorMethod.call(O);
      next = iterator.next;
      result = new C();

      for (; !(step = next.call(iterator)).done; index++) {
        createProperty(result, index, mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      result = new C(length);

      for (; length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }

    result.length = index;
    return result;
  }

  return from;
}();

/***/ }),

/***/ "../../node_modules/core-js/internals/array-includes.js":
/*!************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/array-includes.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "../../node_modules/core-js/internals/to-indexed-object.js");

var toLength = __webpack_require__(/*! ../internals/to-length */ "../../node_modules/core-js/internals/to-length.js");

var toAbsoluteIndex = __webpack_require__(/*! ../internals/to-absolute-index */ "../../node_modules/core-js/internals/to-absolute-index.js"); // `Array.prototype.{ indexOf, includes }` methods implementation


var createMethod = function createMethod(IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value; // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare

    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++]; // eslint-disable-next-line no-self-compare

      if (value != value) return true; // Array#indexOf ignores holes, Array#includes - not
    } else for (; length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    }
    return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};

/***/ }),

/***/ "../../node_modules/core-js/internals/array-iteration.js":
/*!*************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/array-iteration.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(/*! ../internals/bind-context */ "../../node_modules/core-js/internals/bind-context.js");

var IndexedObject = __webpack_require__(/*! ../internals/indexed-object */ "../../node_modules/core-js/internals/indexed-object.js");

var toObject = __webpack_require__(/*! ../internals/to-object */ "../../node_modules/core-js/internals/to-object.js");

var toLength = __webpack_require__(/*! ../internals/to-length */ "../../node_modules/core-js/internals/to-length.js");

var arraySpeciesCreate = __webpack_require__(/*! ../internals/array-species-create */ "../../node_modules/core-js/internals/array-species-create.js");

var push = [].push; // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation

var createMethod = function createMethod(TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self = IndexedObject(O);
    var boundFunction = bind(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var value, result;

    for (; length > index; index++) {
      if (NO_HOLES || index in self) {
        value = self[index];
        result = boundFunction(value, index, O);

        if (TYPE) {
          if (IS_MAP) target[index] = result; // map
          else if (result) switch (TYPE) {
              case 3:
                return true;
              // some

              case 5:
                return value;
              // find

              case 6:
                return index;
              // findIndex

              case 2:
                push.call(target, value);
              // filter
            } else if (IS_EVERY) return false; // every
        }
      }
    }

    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

module.exports = {
  // `Array.prototype.forEach` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
  forEach: createMethod(0),
  // `Array.prototype.map` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.map
  map: createMethod(1),
  // `Array.prototype.filter` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.filter
  filter: createMethod(2),
  // `Array.prototype.some` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.some
  some: createMethod(3),
  // `Array.prototype.every` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.every
  every: createMethod(4),
  // `Array.prototype.find` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.find
  find: createMethod(5),
  // `Array.prototype.findIndex` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod(6)
};

/***/ }),

/***/ "../../node_modules/core-js/internals/array-last-index-of.js":
/*!*****************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/array-last-index-of.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "../../node_modules/core-js/internals/to-indexed-object.js");

var toInteger = __webpack_require__(/*! ../internals/to-integer */ "../../node_modules/core-js/internals/to-integer.js");

var toLength = __webpack_require__(/*! ../internals/to-length */ "../../node_modules/core-js/internals/to-length.js");

var sloppyArrayMethod = __webpack_require__(/*! ../internals/sloppy-array-method */ "../../node_modules/core-js/internals/sloppy-array-method.js");

var min = Math.min;
var nativeLastIndexOf = [].lastIndexOf;
var NEGATIVE_ZERO = !!nativeLastIndexOf && 1 / [1].lastIndexOf(1, -0) < 0;
var SLOPPY_METHOD = sloppyArrayMethod('lastIndexOf'); // `Array.prototype.lastIndexOf` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.lastindexof

module.exports = NEGATIVE_ZERO || SLOPPY_METHOD ? function () {
  function lastIndexOf(searchElement
  /* , fromIndex = @[*-1] */
  ) {
    // convert -0 to +0
    if (NEGATIVE_ZERO) return nativeLastIndexOf.apply(this, arguments) || 0;
    var O = toIndexedObject(this);
    var length = toLength(O.length);
    var index = length - 1;
    if (arguments.length > 1) index = min(index, toInteger(arguments[1]));
    if (index < 0) index = length + index;

    for (; index >= 0; index--) {
      if (index in O && O[index] === searchElement) return index || 0;
    }

    return -1;
  }

  return lastIndexOf;
}() : nativeLastIndexOf;

/***/ }),

/***/ "../../node_modules/core-js/internals/array-method-has-species-support.js":
/*!******************************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/array-method-has-species-support.js ***!
  \******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../node_modules/core-js/internals/well-known-symbol.js");

var SPECIES = wellKnownSymbol('species');

module.exports = function (METHOD_NAME) {
  return !fails(function () {
    var array = [];
    var constructor = array.constructor = {};

    constructor[SPECIES] = function () {
      return {
        foo: 1
      };
    };

    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};

/***/ }),

/***/ "../../node_modules/core-js/internals/array-reduce.js":
/*!**********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/array-reduce.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var aFunction = __webpack_require__(/*! ../internals/a-function */ "../../node_modules/core-js/internals/a-function.js");

var toObject = __webpack_require__(/*! ../internals/to-object */ "../../node_modules/core-js/internals/to-object.js");

var IndexedObject = __webpack_require__(/*! ../internals/indexed-object */ "../../node_modules/core-js/internals/indexed-object.js");

var toLength = __webpack_require__(/*! ../internals/to-length */ "../../node_modules/core-js/internals/to-length.js"); // `Array.prototype.{ reduce, reduceRight }` methods implementation


var createMethod = function createMethod(IS_RIGHT) {
  return function (that, callbackfn, argumentsLength, memo) {
    aFunction(callbackfn);
    var O = toObject(that);
    var self = IndexedObject(O);
    var length = toLength(O.length);
    var index = IS_RIGHT ? length - 1 : 0;
    var i = IS_RIGHT ? -1 : 1;
    if (argumentsLength < 2) while (true) {
      if (index in self) {
        memo = self[index];
        index += i;
        break;
      }

      index += i;

      if (IS_RIGHT ? index < 0 : length <= index) {
        throw TypeError('Reduce of empty array with no initial value');
      }
    }

    for (; IS_RIGHT ? index >= 0 : length > index; index += i) {
      if (index in self) {
        memo = callbackfn(memo, self[index], index, O);
      }
    }

    return memo;
  };
};

module.exports = {
  // `Array.prototype.reduce` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.reduce
  left: createMethod(false),
  // `Array.prototype.reduceRight` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.reduceright
  right: createMethod(true)
};

/***/ }),

/***/ "../../node_modules/core-js/internals/array-species-create.js":
/*!******************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/array-species-create.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isObject = __webpack_require__(/*! ../internals/is-object */ "../../node_modules/core-js/internals/is-object.js");

var isArray = __webpack_require__(/*! ../internals/is-array */ "../../node_modules/core-js/internals/is-array.js");

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../node_modules/core-js/internals/well-known-symbol.js");

var SPECIES = wellKnownSymbol('species'); // `ArraySpeciesCreate` abstract operation
// https://tc39.github.io/ecma262/#sec-arrayspeciescreate

module.exports = function (originalArray, length) {
  var C;

  if (isArray(originalArray)) {
    C = originalArray.constructor; // cross-realm fallback

    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  }

  return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
};

/***/ }),

/***/ "../../node_modules/core-js/internals/bind-context.js":
/*!**********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/bind-context.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var aFunction = __webpack_require__(/*! ../internals/a-function */ "../../node_modules/core-js/internals/a-function.js"); // optional / simple context binding


module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;

  switch (length) {
    case 0:
      return function () {
        return fn.call(that);
      };

    case 1:
      return function (a) {
        return fn.call(that, a);
      };

    case 2:
      return function (a, b) {
        return fn.call(that, a, b);
      };

    case 3:
      return function (a, b, c) {
        return fn.call(that, a, b, c);
      };
  }

  return function ()
  /* ...args */
  {
    return fn.apply(that, arguments);
  };
};

/***/ }),

/***/ "../../node_modules/core-js/internals/call-with-safe-iteration-closing.js":
/*!******************************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/call-with-safe-iteration-closing.js ***!
  \******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__(/*! ../internals/an-object */ "../../node_modules/core-js/internals/an-object.js"); // call something on iterator step with safe closing on error


module.exports = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value); // 7.4.6 IteratorClose(iterator, completion)
  } catch (error) {
    var returnMethod = iterator['return'];
    if (returnMethod !== undefined) anObject(returnMethod.call(iterator));
    throw error;
  }
};

/***/ }),

/***/ "../../node_modules/core-js/internals/check-correctness-of-iteration.js":
/*!****************************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/check-correctness-of-iteration.js ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../node_modules/core-js/internals/well-known-symbol.js");

var ITERATOR = wellKnownSymbol('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      function next() {
        return {
          done: !!called++
        };
      }

      return next;
    }(),
    'return': function () {
      function _return() {
        SAFE_CLOSING = true;
      }

      return _return;
    }()
  };

  iteratorWithReturn[ITERATOR] = function () {
    return this;
  }; // eslint-disable-next-line no-throw-literal


  Array.from(iteratorWithReturn, function () {
    throw 2;
  });
} catch (error) {
  /* empty */
}

module.exports = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;

  try {
    var object = {};

    object[ITERATOR] = function () {
      return {
        next: function () {
          function next() {
            return {
              done: ITERATION_SUPPORT = true
            };
          }

          return next;
        }()
      };
    };

    exec(object);
  } catch (error) {
    /* empty */
  }

  return ITERATION_SUPPORT;
};

/***/ }),

/***/ "../../node_modules/core-js/internals/classof-raw.js":
/*!*********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/classof-raw.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

/***/ }),

/***/ "../../node_modules/core-js/internals/classof.js":
/*!*****************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/classof.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var classofRaw = __webpack_require__(/*! ../internals/classof-raw */ "../../node_modules/core-js/internals/classof-raw.js");

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../node_modules/core-js/internals/well-known-symbol.js");

var TO_STRING_TAG = wellKnownSymbol('toStringTag'); // ES3 wrong here

var CORRECT_ARGUMENTS = classofRaw(function () {
  return arguments;
}()) == 'Arguments'; // fallback for IE11 Script Access Denied error

var tryGet = function tryGet(it, key) {
  try {
    return it[key];
  } catch (error) {
    /* empty */
  }
}; // getting tag from ES6+ `Object.prototype.toString`


module.exports = function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null' // @@toStringTag case
  : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag // builtinTag case
  : CORRECT_ARGUMENTS ? classofRaw(O) // ES3 arguments fallback
  : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
};

/***/ }),

/***/ "../../node_modules/core-js/internals/collection-strong.js":
/*!***************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/collection-strong.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defineProperty = __webpack_require__(/*! ../internals/object-define-property */ "../../node_modules/core-js/internals/object-define-property.js").f;

var create = __webpack_require__(/*! ../internals/object-create */ "../../node_modules/core-js/internals/object-create.js");

var redefineAll = __webpack_require__(/*! ../internals/redefine-all */ "../../node_modules/core-js/internals/redefine-all.js");

var bind = __webpack_require__(/*! ../internals/bind-context */ "../../node_modules/core-js/internals/bind-context.js");

var anInstance = __webpack_require__(/*! ../internals/an-instance */ "../../node_modules/core-js/internals/an-instance.js");

var iterate = __webpack_require__(/*! ../internals/iterate */ "../../node_modules/core-js/internals/iterate.js");

var defineIterator = __webpack_require__(/*! ../internals/define-iterator */ "../../node_modules/core-js/internals/define-iterator.js");

var setSpecies = __webpack_require__(/*! ../internals/set-species */ "../../node_modules/core-js/internals/set-species.js");

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../node_modules/core-js/internals/descriptors.js");

var fastKey = __webpack_require__(/*! ../internals/internal-metadata */ "../../node_modules/core-js/internals/internal-metadata.js").fastKey;

var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "../../node_modules/core-js/internals/internal-state.js");

var setInternalState = InternalStateModule.set;
var internalStateGetterFor = InternalStateModule.getterFor;
module.exports = {
  getConstructor: function () {
    function getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
      var C = wrapper(function (that, iterable) {
        anInstance(that, C, CONSTRUCTOR_NAME);
        setInternalState(that, {
          type: CONSTRUCTOR_NAME,
          index: create(null),
          first: undefined,
          last: undefined,
          size: 0
        });
        if (!DESCRIPTORS) that.size = 0;
        if (iterable != undefined) iterate(iterable, that[ADDER], that, IS_MAP);
      });
      var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

      var define = function () {
        function define(that, key, value) {
          var state = getInternalState(that);
          var entry = getEntry(that, key);
          var previous, index; // change existing entry

          if (entry) {
            entry.value = value; // create new entry
          } else {
            state.last = entry = {
              index: index = fastKey(key, true),
              key: key,
              value: value,
              previous: previous = state.last,
              next: undefined,
              removed: false
            };
            if (!state.first) state.first = entry;
            if (previous) previous.next = entry;
            if (DESCRIPTORS) state.size++;else that.size++; // add to index

            if (index !== 'F') state.index[index] = entry;
          }

          return that;
        }

        return define;
      }();

      var getEntry = function () {
        function getEntry(that, key) {
          var state = getInternalState(that); // fast case

          var index = fastKey(key);
          var entry;
          if (index !== 'F') return state.index[index]; // frozen object case

          for (entry = state.first; entry; entry = entry.next) {
            if (entry.key == key) return entry;
          }
        }

        return getEntry;
      }();

      redefineAll(C.prototype, {
        // 23.1.3.1 Map.prototype.clear()
        // 23.2.3.2 Set.prototype.clear()
        clear: function () {
          function clear() {
            var that = this;
            var state = getInternalState(that);
            var data = state.index;
            var entry = state.first;

            while (entry) {
              entry.removed = true;
              if (entry.previous) entry.previous = entry.previous.next = undefined;
              delete data[entry.index];
              entry = entry.next;
            }

            state.first = state.last = undefined;
            if (DESCRIPTORS) state.size = 0;else that.size = 0;
          }

          return clear;
        }(),
        // 23.1.3.3 Map.prototype.delete(key)
        // 23.2.3.4 Set.prototype.delete(value)
        'delete': function () {
          function _delete(key) {
            var that = this;
            var state = getInternalState(that);
            var entry = getEntry(that, key);

            if (entry) {
              var next = entry.next;
              var prev = entry.previous;
              delete state.index[entry.index];
              entry.removed = true;
              if (prev) prev.next = next;
              if (next) next.previous = prev;
              if (state.first == entry) state.first = next;
              if (state.last == entry) state.last = prev;
              if (DESCRIPTORS) state.size--;else that.size--;
            }

            return !!entry;
          }

          return _delete;
        }(),
        // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
        // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
        forEach: function () {
          function forEach(callbackfn
          /* , that = undefined */
          ) {
            var state = getInternalState(this);
            var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
            var entry;

            while (entry = entry ? entry.next : state.first) {
              boundFunction(entry.value, entry.key, this); // revert to the last existing entry

              while (entry && entry.removed) {
                entry = entry.previous;
              }
            }
          }

          return forEach;
        }(),
        // 23.1.3.7 Map.prototype.has(key)
        // 23.2.3.7 Set.prototype.has(value)
        has: function () {
          function has(key) {
            return !!getEntry(this, key);
          }

          return has;
        }()
      });
      redefineAll(C.prototype, IS_MAP ? {
        // 23.1.3.6 Map.prototype.get(key)
        get: function () {
          function get(key) {
            var entry = getEntry(this, key);
            return entry && entry.value;
          }

          return get;
        }(),
        // 23.1.3.9 Map.prototype.set(key, value)
        set: function () {
          function set(key, value) {
            return define(this, key === 0 ? 0 : key, value);
          }

          return set;
        }()
      } : {
        // 23.2.3.1 Set.prototype.add(value)
        add: function () {
          function add(value) {
            return define(this, value = value === 0 ? 0 : value, value);
          }

          return add;
        }()
      });
      if (DESCRIPTORS) defineProperty(C.prototype, 'size', {
        get: function () {
          function get() {
            return getInternalState(this).size;
          }

          return get;
        }()
      });
      return C;
    }

    return getConstructor;
  }(),
  setStrong: function () {
    function setStrong(C, CONSTRUCTOR_NAME, IS_MAP) {
      var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator';
      var getInternalCollectionState = internalStateGetterFor(CONSTRUCTOR_NAME);
      var getInternalIteratorState = internalStateGetterFor(ITERATOR_NAME); // add .keys, .values, .entries, [@@iterator]
      // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11

      defineIterator(C, CONSTRUCTOR_NAME, function (iterated, kind) {
        setInternalState(this, {
          type: ITERATOR_NAME,
          target: iterated,
          state: getInternalCollectionState(iterated),
          kind: kind,
          last: undefined
        });
      }, function () {
        var state = getInternalIteratorState(this);
        var kind = state.kind;
        var entry = state.last; // revert to the last existing entry

        while (entry && entry.removed) {
          entry = entry.previous;
        } // get next entry


        if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
          // or finish the iteration
          state.target = undefined;
          return {
            value: undefined,
            done: true
          };
        } // return step by kind


        if (kind == 'keys') return {
          value: entry.key,
          done: false
        };
        if (kind == 'values') return {
          value: entry.value,
          done: false
        };
        return {
          value: [entry.key, entry.value],
          done: false
        };
      }, IS_MAP ? 'entries' : 'values', !IS_MAP, true); // add [@@species], 23.1.2.2, 23.2.2.2

      setSpecies(CONSTRUCTOR_NAME);
    }

    return setStrong;
  }()
};

/***/ }),

/***/ "../../node_modules/core-js/internals/collection-weak.js":
/*!*************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/collection-weak.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var redefineAll = __webpack_require__(/*! ../internals/redefine-all */ "../../node_modules/core-js/internals/redefine-all.js");

var getWeakData = __webpack_require__(/*! ../internals/internal-metadata */ "../../node_modules/core-js/internals/internal-metadata.js").getWeakData;

var anObject = __webpack_require__(/*! ../internals/an-object */ "../../node_modules/core-js/internals/an-object.js");

var isObject = __webpack_require__(/*! ../internals/is-object */ "../../node_modules/core-js/internals/is-object.js");

var anInstance = __webpack_require__(/*! ../internals/an-instance */ "../../node_modules/core-js/internals/an-instance.js");

var iterate = __webpack_require__(/*! ../internals/iterate */ "../../node_modules/core-js/internals/iterate.js");

var ArrayIterationModule = __webpack_require__(/*! ../internals/array-iteration */ "../../node_modules/core-js/internals/array-iteration.js");

var $has = __webpack_require__(/*! ../internals/has */ "../../node_modules/core-js/internals/has.js");

var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "../../node_modules/core-js/internals/internal-state.js");

var setInternalState = InternalStateModule.set;
var internalStateGetterFor = InternalStateModule.getterFor;
var find = ArrayIterationModule.find;
var findIndex = ArrayIterationModule.findIndex;
var id = 0; // fallback for uncaught frozen keys

var uncaughtFrozenStore = function uncaughtFrozenStore(store) {
  return store.frozen || (store.frozen = new UncaughtFrozenStore());
};

var UncaughtFrozenStore = function UncaughtFrozenStore() {
  this.entries = [];
};

var findUncaughtFrozen = function findUncaughtFrozen(store, key) {
  return find(store.entries, function (it) {
    return it[0] === key;
  });
};

UncaughtFrozenStore.prototype = {
  get: function () {
    function get(key) {
      var entry = findUncaughtFrozen(this, key);
      if (entry) return entry[1];
    }

    return get;
  }(),
  has: function () {
    function has(key) {
      return !!findUncaughtFrozen(this, key);
    }

    return has;
  }(),
  set: function () {
    function set(key, value) {
      var entry = findUncaughtFrozen(this, key);
      if (entry) entry[1] = value;else this.entries.push([key, value]);
    }

    return set;
  }(),
  'delete': function () {
    function _delete(key) {
      var index = findIndex(this.entries, function (it) {
        return it[0] === key;
      });
      if (~index) this.entries.splice(index, 1);
      return !!~index;
    }

    return _delete;
  }()
};
module.exports = {
  getConstructor: function () {
    function getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
      var C = wrapper(function (that, iterable) {
        anInstance(that, C, CONSTRUCTOR_NAME);
        setInternalState(that, {
          type: CONSTRUCTOR_NAME,
          id: id++,
          frozen: undefined
        });
        if (iterable != undefined) iterate(iterable, that[ADDER], that, IS_MAP);
      });
      var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

      var define = function () {
        function define(that, key, value) {
          var state = getInternalState(that);
          var data = getWeakData(anObject(key), true);
          if (data === true) uncaughtFrozenStore(state).set(key, value);else data[state.id] = value;
          return that;
        }

        return define;
      }();

      redefineAll(C.prototype, {
        // 23.3.3.2 WeakMap.prototype.delete(key)
        // 23.4.3.3 WeakSet.prototype.delete(value)
        'delete': function () {
          function _delete(key) {
            var state = getInternalState(this);
            if (!isObject(key)) return false;
            var data = getWeakData(key);
            if (data === true) return uncaughtFrozenStore(state)['delete'](key);
            return data && $has(data, state.id) && delete data[state.id];
          }

          return _delete;
        }(),
        // 23.3.3.4 WeakMap.prototype.has(key)
        // 23.4.3.4 WeakSet.prototype.has(value)
        has: function () {
          function has(key) {
            var state = getInternalState(this);
            if (!isObject(key)) return false;
            var data = getWeakData(key);
            if (data === true) return uncaughtFrozenStore(state).has(key);
            return data && $has(data, state.id);
          }

          return has;
        }()
      });
      redefineAll(C.prototype, IS_MAP ? {
        // 23.3.3.3 WeakMap.prototype.get(key)
        get: function () {
          function get(key) {
            var state = getInternalState(this);

            if (isObject(key)) {
              var data = getWeakData(key);
              if (data === true) return uncaughtFrozenStore(state).get(key);
              return data ? data[state.id] : undefined;
            }
          }

          return get;
        }(),
        // 23.3.3.5 WeakMap.prototype.set(key, value)
        set: function () {
          function set(key, value) {
            return define(this, key, value);
          }

          return set;
        }()
      } : {
        // 23.4.3.1 WeakSet.prototype.add(value)
        add: function () {
          function add(value) {
            return define(this, value, true);
          }

          return add;
        }()
      });
      return C;
    }

    return getConstructor;
  }()
};

/***/ }),

/***/ "../../node_modules/core-js/internals/collection.js":
/*!********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/collection.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");

var isForced = __webpack_require__(/*! ../internals/is-forced */ "../../node_modules/core-js/internals/is-forced.js");

var redefine = __webpack_require__(/*! ../internals/redefine */ "../../node_modules/core-js/internals/redefine.js");

var InternalMetadataModule = __webpack_require__(/*! ../internals/internal-metadata */ "../../node_modules/core-js/internals/internal-metadata.js");

var iterate = __webpack_require__(/*! ../internals/iterate */ "../../node_modules/core-js/internals/iterate.js");

var anInstance = __webpack_require__(/*! ../internals/an-instance */ "../../node_modules/core-js/internals/an-instance.js");

var isObject = __webpack_require__(/*! ../internals/is-object */ "../../node_modules/core-js/internals/is-object.js");

var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");

var checkCorrectnessOfIteration = __webpack_require__(/*! ../internals/check-correctness-of-iteration */ "../../node_modules/core-js/internals/check-correctness-of-iteration.js");

var setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ "../../node_modules/core-js/internals/set-to-string-tag.js");

var inheritIfRequired = __webpack_require__(/*! ../internals/inherit-if-required */ "../../node_modules/core-js/internals/inherit-if-required.js");

module.exports = function (CONSTRUCTOR_NAME, wrapper, common, IS_MAP, IS_WEAK) {
  var NativeConstructor = global[CONSTRUCTOR_NAME];
  var NativePrototype = NativeConstructor && NativeConstructor.prototype;
  var Constructor = NativeConstructor;
  var ADDER = IS_MAP ? 'set' : 'add';
  var exported = {};

  var fixMethod = function fixMethod(KEY) {
    var nativeMethod = NativePrototype[KEY];
    redefine(NativePrototype, KEY, KEY == 'add' ? function () {
      function add(value) {
        nativeMethod.call(this, value === 0 ? 0 : value);
        return this;
      }

      return add;
    }() : KEY == 'delete' ? function (key) {
      return IS_WEAK && !isObject(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
    } : KEY == 'get' ? function () {
      function get(key) {
        return IS_WEAK && !isObject(key) ? undefined : nativeMethod.call(this, key === 0 ? 0 : key);
      }

      return get;
    }() : KEY == 'has' ? function () {
      function has(key) {
        return IS_WEAK && !isObject(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
      }

      return has;
    }() : function () {
      function set(key, value) {
        nativeMethod.call(this, key === 0 ? 0 : key, value);
        return this;
      }

      return set;
    }());
  }; // eslint-disable-next-line max-len


  if (isForced(CONSTRUCTOR_NAME, typeof NativeConstructor != 'function' || !(IS_WEAK || NativePrototype.forEach && !fails(function () {
    new NativeConstructor().entries().next();
  })))) {
    // create collection constructor
    Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
    InternalMetadataModule.REQUIRED = true;
  } else if (isForced(CONSTRUCTOR_NAME, true)) {
    var instance = new Constructor(); // early implementations not supports chaining

    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance; // V8 ~ Chromium 40- weak-collections throws on primitives, but should return false

    var THROWS_ON_PRIMITIVES = fails(function () {
      instance.has(1);
    }); // most early implementations doesn't supports iterables, most modern - not close it correctly
    // eslint-disable-next-line no-new

    var ACCEPT_ITERABLES = checkCorrectnessOfIteration(function (iterable) {
      new NativeConstructor(iterable);
    }); // for early implementations -0 and +0 not the same

    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new NativeConstructor();
      var index = 5;

      while (index--) {
        $instance[ADDER](index, index);
      }

      return !$instance.has(-0);
    });

    if (!ACCEPT_ITERABLES) {
      Constructor = wrapper(function (dummy, iterable) {
        anInstance(dummy, Constructor, CONSTRUCTOR_NAME);
        var that = inheritIfRequired(new NativeConstructor(), dummy, Constructor);
        if (iterable != undefined) iterate(iterable, that[ADDER], that, IS_MAP);
        return that;
      });
      Constructor.prototype = NativePrototype;
      NativePrototype.constructor = Constructor;
    }

    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }

    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER); // weak collections should not contains .clear method

    if (IS_WEAK && NativePrototype.clear) delete NativePrototype.clear;
  }

  exported[CONSTRUCTOR_NAME] = Constructor;
  $({
    global: true,
    forced: Constructor != NativeConstructor
  }, exported);
  setToStringTag(Constructor, CONSTRUCTOR_NAME);
  if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);
  return Constructor;
};

/***/ }),

/***/ "../../node_modules/core-js/internals/copy-constructor-properties.js":
/*!*************************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/copy-constructor-properties.js ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = __webpack_require__(/*! ../internals/has */ "../../node_modules/core-js/internals/has.js");

var ownKeys = __webpack_require__(/*! ../internals/own-keys */ "../../node_modules/core-js/internals/own-keys.js");

var getOwnPropertyDescriptorModule = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "../../node_modules/core-js/internals/object-get-own-property-descriptor.js");

var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "../../node_modules/core-js/internals/object-define-property.js");

module.exports = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};

/***/ }),

/***/ "../../node_modules/core-js/internals/correct-is-regexp-logic.js":
/*!*********************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/correct-is-regexp-logic.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../node_modules/core-js/internals/well-known-symbol.js");

var MATCH = wellKnownSymbol('match');

module.exports = function (METHOD_NAME) {
  var regexp = /./;

  try {
    '/./'[METHOD_NAME](regexp);
  } catch (e) {
    try {
      regexp[MATCH] = false;
      return '/./'[METHOD_NAME](regexp);
    } catch (f) {
      /* empty */
    }
  }

  return false;
};

/***/ }),

/***/ "../../node_modules/core-js/internals/correct-prototype-getter.js":
/*!**********************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/correct-prototype-getter.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");

module.exports = !fails(function () {
  function F() {
    /* empty */
  }

  F.prototype.constructor = null;
  return Object.getPrototypeOf(new F()) !== F.prototype;
});

/***/ }),

/***/ "../../node_modules/core-js/internals/create-html.js":
/*!*********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/create-html.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "../../node_modules/core-js/internals/require-object-coercible.js");

var quot = /"/g; // B.2.3.2.1 CreateHTML(string, tag, attribute, value)
// https://tc39.github.io/ecma262/#sec-createhtml

module.exports = function (string, tag, attribute, value) {
  var S = String(requireObjectCoercible(string));
  var p1 = '<' + tag;
  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};

/***/ }),

/***/ "../../node_modules/core-js/internals/create-iterator-constructor.js":
/*!*************************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/create-iterator-constructor.js ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var IteratorPrototype = __webpack_require__(/*! ../internals/iterators-core */ "../../node_modules/core-js/internals/iterators-core.js").IteratorPrototype;

var create = __webpack_require__(/*! ../internals/object-create */ "../../node_modules/core-js/internals/object-create.js");

var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "../../node_modules/core-js/internals/create-property-descriptor.js");

var setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ "../../node_modules/core-js/internals/set-to-string-tag.js");

var Iterators = __webpack_require__(/*! ../internals/iterators */ "../../node_modules/core-js/internals/iterators.js");

var returnThis = function returnThis() {
  return this;
};

module.exports = function (IteratorConstructor, NAME, next) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create(IteratorPrototype, {
    next: createPropertyDescriptor(1, next)
  });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
  Iterators[TO_STRING_TAG] = returnThis;
  return IteratorConstructor;
};

/***/ }),

/***/ "../../node_modules/core-js/internals/create-non-enumerable-property.js":
/*!****************************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/create-non-enumerable-property.js ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../node_modules/core-js/internals/descriptors.js");

var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "../../node_modules/core-js/internals/object-define-property.js");

var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "../../node_modules/core-js/internals/create-property-descriptor.js");

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

/***/ }),

/***/ "../../node_modules/core-js/internals/create-property-descriptor.js":
/*!************************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/create-property-descriptor.js ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

/***/ }),

/***/ "../../node_modules/core-js/internals/create-property.js":
/*!*************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/create-property.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ "../../node_modules/core-js/internals/to-primitive.js");

var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "../../node_modules/core-js/internals/object-define-property.js");

var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "../../node_modules/core-js/internals/create-property-descriptor.js");

module.exports = function (object, key, value) {
  var propertyKey = toPrimitive(key);
  if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));else object[propertyKey] = value;
};

/***/ }),

/***/ "../../node_modules/core-js/internals/date-to-iso-string.js":
/*!****************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/date-to-iso-string.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");

var padStart = __webpack_require__(/*! ../internals/string-pad */ "../../node_modules/core-js/internals/string-pad.js").start;

var abs = Math.abs;
var DatePrototype = Date.prototype;
var getTime = DatePrototype.getTime;
var nativeDateToISOString = DatePrototype.toISOString; // `Date.prototype.toISOString` method implementation
// https://tc39.github.io/ecma262/#sec-date.prototype.toisostring
// PhantomJS / old WebKit fails here:

module.exports = fails(function () {
  return nativeDateToISOString.call(new Date(-5e13 - 1)) != '0385-07-25T07:06:39.999Z';
}) || !fails(function () {
  nativeDateToISOString.call(new Date(NaN));
}) ? function () {
  function toISOString() {
    if (!isFinite(getTime.call(this))) throw RangeError('Invalid time value');
    var date = this;
    var year = date.getUTCFullYear();
    var milliseconds = date.getUTCMilliseconds();
    var sign = year < 0 ? '-' : year > 9999 ? '+' : '';
    return sign + padStart(abs(year), sign ? 6 : 4, 0) + '-' + padStart(date.getUTCMonth() + 1, 2, 0) + '-' + padStart(date.getUTCDate(), 2, 0) + 'T' + padStart(date.getUTCHours(), 2, 0) + ':' + padStart(date.getUTCMinutes(), 2, 0) + ':' + padStart(date.getUTCSeconds(), 2, 0) + '.' + padStart(milliseconds, 3, 0) + 'Z';
  }

  return toISOString;
}() : nativeDateToISOString;

/***/ }),

/***/ "../../node_modules/core-js/internals/date-to-primitive.js":
/*!***************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/date-to-primitive.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__(/*! ../internals/an-object */ "../../node_modules/core-js/internals/an-object.js");

var toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ "../../node_modules/core-js/internals/to-primitive.js");

module.exports = function (hint) {
  if (hint !== 'string' && hint !== 'number' && hint !== 'default') {
    throw TypeError('Incorrect hint');
  }

  return toPrimitive(anObject(this), hint !== 'number');
};

/***/ }),

/***/ "../../node_modules/core-js/internals/define-iterator.js":
/*!*************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/define-iterator.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var createIteratorConstructor = __webpack_require__(/*! ../internals/create-iterator-constructor */ "../../node_modules/core-js/internals/create-iterator-constructor.js");

var getPrototypeOf = __webpack_require__(/*! ../internals/object-get-prototype-of */ "../../node_modules/core-js/internals/object-get-prototype-of.js");

var setPrototypeOf = __webpack_require__(/*! ../internals/object-set-prototype-of */ "../../node_modules/core-js/internals/object-set-prototype-of.js");

var setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ "../../node_modules/core-js/internals/set-to-string-tag.js");

var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "../../node_modules/core-js/internals/create-non-enumerable-property.js");

var redefine = __webpack_require__(/*! ../internals/redefine */ "../../node_modules/core-js/internals/redefine.js");

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../node_modules/core-js/internals/well-known-symbol.js");

var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "../../node_modules/core-js/internals/is-pure.js");

var Iterators = __webpack_require__(/*! ../internals/iterators */ "../../node_modules/core-js/internals/iterators.js");

var IteratorsCore = __webpack_require__(/*! ../internals/iterators-core */ "../../node_modules/core-js/internals/iterators-core.js");

var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis = function returnThis() {
  return this;
};

module.exports = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function getIterationMethod(KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];

    switch (KIND) {
      case KEYS:
        return function () {
          function keys() {
            return new IteratorConstructor(this, KIND);
          }

          return keys;
        }();

      case VALUES:
        return function () {
          function values() {
            return new IteratorConstructor(this, KIND);
          }

          return values;
        }();

      case ENTRIES:
        return function () {
          function entries() {
            return new IteratorConstructor(this, KIND);
          }

          return entries;
        }();
    }

    return function () {
      return new IteratorConstructor(this);
    };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR] || IterablePrototype['@@iterator'] || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY; // fix native

  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));

    if (IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (setPrototypeOf) {
          setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
        } else if (typeof CurrentIteratorPrototype[ITERATOR] != 'function') {
          createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR, returnThis);
        }
      } // Set @@toStringTag to native iterators


      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
      if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;
    }
  } // fix Array#{values, @@iterator}.name in V8 / FF


  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    INCORRECT_VALUES_NAME = true;

    defaultIterator = function () {
      function values() {
        return nativeIterator.call(this);
      }

      return values;
    }();
  } // define iterator


  if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
    createNonEnumerableProperty(IterablePrototype, ITERATOR, defaultIterator);
  }

  Iterators[NAME] = defaultIterator; // export additional methods

  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        redefine(IterablePrototype, KEY, methods[KEY]);
      }
    } else $({
      target: NAME,
      proto: true,
      forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME
    }, methods);
  }

  return methods;
};

/***/ }),

/***/ "../../node_modules/core-js/internals/define-well-known-symbol.js":
/*!**********************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/define-well-known-symbol.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var path = __webpack_require__(/*! ../internals/path */ "../../node_modules/core-js/internals/path.js");

var has = __webpack_require__(/*! ../internals/has */ "../../node_modules/core-js/internals/has.js");

var wrappedWellKnownSymbolModule = __webpack_require__(/*! ../internals/wrapped-well-known-symbol */ "../../node_modules/core-js/internals/wrapped-well-known-symbol.js");

var defineProperty = __webpack_require__(/*! ../internals/object-define-property */ "../../node_modules/core-js/internals/object-define-property.js").f;

module.exports = function (NAME) {
  var Symbol = path.Symbol || (path.Symbol = {});
  if (!has(Symbol, NAME)) defineProperty(Symbol, NAME, {
    value: wrappedWellKnownSymbolModule.f(NAME)
  });
};

/***/ }),

/***/ "../../node_modules/core-js/internals/descriptors.js":
/*!*********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/descriptors.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js"); // Thank's IE8 for his funny defineProperty


module.exports = !fails(function () {
  return Object.defineProperty({}, 'a', {
    get: function () {
      function get() {
        return 7;
      }

      return get;
    }()
  }).a != 7;
});

/***/ }),

/***/ "../../node_modules/core-js/internals/document-create-element.js":
/*!*********************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/document-create-element.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");

var isObject = __webpack_require__(/*! ../internals/is-object */ "../../node_modules/core-js/internals/is-object.js");

var document = global.document; // typeof document.createElement is 'object' in old IE

var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};

/***/ }),

/***/ "../../node_modules/core-js/internals/dom-iterables.js":
/*!***********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/dom-iterables.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
module.exports = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};

/***/ }),

/***/ "../../node_modules/core-js/internals/enum-bug-keys.js":
/*!***********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/enum-bug-keys.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// IE8- don't enum bug keys
module.exports = ['constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf'];

/***/ }),

/***/ "../../node_modules/core-js/internals/export.js":
/*!****************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/export.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");

var getOwnPropertyDescriptor = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "../../node_modules/core-js/internals/object-get-own-property-descriptor.js").f;

var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "../../node_modules/core-js/internals/create-non-enumerable-property.js");

var redefine = __webpack_require__(/*! ../internals/redefine */ "../../node_modules/core-js/internals/redefine.js");

var setGlobal = __webpack_require__(/*! ../internals/set-global */ "../../node_modules/core-js/internals/set-global.js");

var copyConstructorProperties = __webpack_require__(/*! ../internals/copy-constructor-properties */ "../../node_modules/core-js/internals/copy-constructor-properties.js");

var isForced = __webpack_require__(/*! ../internals/is-forced */ "../../node_modules/core-js/internals/is-forced.js");
/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/


module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;

  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }

  if (target) for (key in source) {
    sourceProperty = source[key];

    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];

    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced); // contained in target

    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty === typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    } // add a flag to not completely full polyfills


    if (options.sham || targetProperty && targetProperty.sham) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    } // extend global


    redefine(target, key, sourceProperty, options);
  }
};

/***/ }),

/***/ "../../node_modules/core-js/internals/fails.js":
/*!***************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/fails.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

/***/ }),

/***/ "../../node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js":
/*!********************************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "../../node_modules/core-js/internals/create-non-enumerable-property.js");

var redefine = __webpack_require__(/*! ../internals/redefine */ "../../node_modules/core-js/internals/redefine.js");

var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../node_modules/core-js/internals/well-known-symbol.js");

var regexpExec = __webpack_require__(/*! ../internals/regexp-exec */ "../../node_modules/core-js/internals/regexp-exec.js");

var SPECIES = wellKnownSymbol('species');
var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;

  re.exec = function () {
    var result = [];
    result.groups = {
      a: '7'
    };
    return result;
  };

  return ''.replace(re, '$<a>') !== '7';
}); // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
// Weex JS has frozen built-in prototypes, so use try / catch wrapper

var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
  var re = /(?:)/;
  var originalExec = re.exec;

  re.exec = function () {
    return originalExec.apply(this, arguments);
  };

  var result = 'ab'.split(re);
  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
});

module.exports = function (KEY, length, exec, sham) {
  var SYMBOL = wellKnownSymbol(KEY);
  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};

    O[SYMBOL] = function () {
      return 7;
    };

    return ''[KEY](O) != 7;
  });
  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;

    re.exec = function () {
      execCalled = true;
      return null;
    };

    if (KEY === 'split') {
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};

      re.constructor[SPECIES] = function () {
        return re;
      };
    }

    re[SYMBOL]('');
    return !execCalled;
  });

  if (!DELEGATES_TO_SYMBOL || !DELEGATES_TO_EXEC || KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS || KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC) {
    var nativeRegExpMethod = /./[SYMBOL];
    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
      if (regexp.exec === regexpExec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return {
            done: true,
            value: nativeRegExpMethod.call(regexp, str, arg2)
          };
        }

        return {
          done: true,
          value: nativeMethod.call(str, regexp, arg2)
        };
      }

      return {
        done: false
      };
    });
    var stringMethod = methods[0];
    var regexMethod = methods[1];
    redefine(String.prototype, KEY, stringMethod);
    redefine(RegExp.prototype, SYMBOL, length == 2 // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
    // 21.2.5.11 RegExp.prototype[@@split](string, limit)
    ? function (string, arg) {
      return regexMethod.call(string, this, arg);
    } // 21.2.5.6 RegExp.prototype[@@match](string)
    // 21.2.5.9 RegExp.prototype[@@search](string)
    : function (string) {
      return regexMethod.call(string, this);
    });
    if (sham) createNonEnumerableProperty(RegExp.prototype[SYMBOL], 'sham', true);
  }
};

/***/ }),

/***/ "../../node_modules/core-js/internals/flatten-into-array.js":
/*!****************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/flatten-into-array.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isArray = __webpack_require__(/*! ../internals/is-array */ "../../node_modules/core-js/internals/is-array.js");

var toLength = __webpack_require__(/*! ../internals/to-length */ "../../node_modules/core-js/internals/to-length.js");

var bind = __webpack_require__(/*! ../internals/bind-context */ "../../node_modules/core-js/internals/bind-context.js"); // `FlattenIntoArray` abstract operation
// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray


var flattenIntoArray = function flattenIntoArray(target, original, source, sourceLen, start, depth, mapper, thisArg) {
  var targetIndex = start;
  var sourceIndex = 0;
  var mapFn = mapper ? bind(mapper, thisArg, 3) : false;
  var element;

  while (sourceIndex < sourceLen) {
    if (sourceIndex in source) {
      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

      if (depth > 0 && isArray(element)) {
        targetIndex = flattenIntoArray(target, original, element, toLength(element.length), targetIndex, depth - 1) - 1;
      } else {
        if (targetIndex >= 0x1FFFFFFFFFFFFF) throw TypeError('Exceed the acceptable array length');
        target[targetIndex] = element;
      }

      targetIndex++;
    }

    sourceIndex++;
  }

  return targetIndex;
};

module.exports = flattenIntoArray;

/***/ }),

/***/ "../../node_modules/core-js/internals/forced-object-prototype-accessors-methods.js":
/*!***************************************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/forced-object-prototype-accessors-methods.js ***!
  \***************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "../../node_modules/core-js/internals/is-pure.js");

var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");

var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js"); // Forced replacement object prototype accessors methods


module.exports = IS_PURE || !fails(function () {
  var key = Math.random(); // In FF throws only define methods
  // eslint-disable-next-line no-undef, no-useless-call

  __defineSetter__.call(null, key, function () {
    /* empty */
  });

  delete global[key];
});

/***/ }),

/***/ "../../node_modules/core-js/internals/forced-string-html-method.js":
/*!***********************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/forced-string-html-method.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js"); // check the existence of a method, lowercase
// of a tag and escaping quotes in arguments


module.exports = function (METHOD_NAME) {
  return fails(function () {
    var test = ''[METHOD_NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  });
};

/***/ }),

/***/ "../../node_modules/core-js/internals/forced-string-trim-method.js":
/*!***********************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/forced-string-trim-method.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");

var whitespaces = __webpack_require__(/*! ../internals/whitespaces */ "../../node_modules/core-js/internals/whitespaces.js");

var non = "\u200B\x85\u180E"; // check that a method works with the correct list
// of whitespaces and has a correct name

module.exports = function (METHOD_NAME) {
  return fails(function () {
    return !!whitespaces[METHOD_NAME]() || non[METHOD_NAME]() != non || whitespaces[METHOD_NAME].name !== METHOD_NAME;
  });
};

/***/ }),

/***/ "../../node_modules/core-js/internals/freezing.js":
/*!******************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/freezing.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");

module.exports = !fails(function () {
  return Object.isExtensible(Object.preventExtensions({}));
});

/***/ }),

/***/ "../../node_modules/core-js/internals/function-bind.js":
/*!***********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/function-bind.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var aFunction = __webpack_require__(/*! ../internals/a-function */ "../../node_modules/core-js/internals/a-function.js");

var isObject = __webpack_require__(/*! ../internals/is-object */ "../../node_modules/core-js/internals/is-object.js");

var slice = [].slice;
var factories = {};

var construct = function construct(C, argsLength, args) {
  if (!(argsLength in factories)) {
    for (var list = [], i = 0; i < argsLength; i++) {
      list[i] = 'a[' + i + ']';
    } // eslint-disable-next-line no-new-func


    factories[argsLength] = Function('C,a', 'return new C(' + list.join(',') + ')');
  }

  return factories[argsLength](C, args);
}; // `Function.prototype.bind` method implementation
// https://tc39.github.io/ecma262/#sec-function.prototype.bind


module.exports = Function.bind || function () {
  function bind(that
  /* , ...args */
  ) {
    var fn = aFunction(this);
    var partArgs = slice.call(arguments, 1);

    var boundFunction = function () {
      function bound()
      /* args... */
      {
        var args = partArgs.concat(slice.call(arguments));
        return this instanceof boundFunction ? construct(fn, args.length, args) : fn.apply(that, args);
      }

      return bound;
    }();

    if (isObject(fn.prototype)) boundFunction.prototype = fn.prototype;
    return boundFunction;
  }

  return bind;
}();

/***/ }),

/***/ "../../node_modules/core-js/internals/function-to-string.js":
/*!****************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/function-to-string.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var shared = __webpack_require__(/*! ../internals/shared */ "../../node_modules/core-js/internals/shared.js");

module.exports = shared('native-function-to-string', Function.toString);

/***/ }),

/***/ "../../node_modules/core-js/internals/get-built-in.js":
/*!**********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/get-built-in.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var path = __webpack_require__(/*! ../internals/path */ "../../node_modules/core-js/internals/path.js");

var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");

var aFunction = function aFunction(variable) {
  return typeof variable == 'function' ? variable : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global[namespace]) : path[namespace] && path[namespace][method] || global[namespace] && global[namespace][method];
};

/***/ }),

/***/ "../../node_modules/core-js/internals/get-iterator-method.js":
/*!*****************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/get-iterator-method.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var classof = __webpack_require__(/*! ../internals/classof */ "../../node_modules/core-js/internals/classof.js");

var Iterators = __webpack_require__(/*! ../internals/iterators */ "../../node_modules/core-js/internals/iterators.js");

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../node_modules/core-js/internals/well-known-symbol.js");

var ITERATOR = wellKnownSymbol('iterator');

module.exports = function (it) {
  if (it != undefined) return it[ITERATOR] || it['@@iterator'] || Iterators[classof(it)];
};

/***/ }),

/***/ "../../node_modules/core-js/internals/get-iterator.js":
/*!**********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/get-iterator.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__(/*! ../internals/an-object */ "../../node_modules/core-js/internals/an-object.js");

var getIteratorMethod = __webpack_require__(/*! ../internals/get-iterator-method */ "../../node_modules/core-js/internals/get-iterator-method.js");

module.exports = function (it) {
  var iteratorMethod = getIteratorMethod(it);

  if (typeof iteratorMethod != 'function') {
    throw TypeError(String(it) + ' is not iterable');
  }

  return anObject(iteratorMethod.call(it));
};

/***/ }),

/***/ "../../node_modules/core-js/internals/global.js":
/*!****************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/global.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var check = function check(it) {
  return it && it.Math == Math && it;
}; // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028


module.exports = // eslint-disable-next-line no-undef
check(typeof globalThis == 'object' && globalThis) || check(typeof window == 'object' && window) || check(typeof self == 'object' && self) || check(typeof global == 'object' && global) || // eslint-disable-next-line no-new-func
Function('return this')();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "../../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../../node_modules/core-js/internals/has.js":
/*!*************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/has.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var hasOwnProperty = {}.hasOwnProperty;

module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

/***/ }),

/***/ "../../node_modules/core-js/internals/hidden-keys.js":
/*!*********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/hidden-keys.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {};

/***/ }),

/***/ "../../node_modules/core-js/internals/host-report-errors.js":
/*!****************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/host-report-errors.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");

module.exports = function (a, b) {
  var console = global.console;

  if (console && console.error) {
    arguments.length === 1 ? console.error(a) : console.error(a, b);
  }
};

/***/ }),

/***/ "../../node_modules/core-js/internals/html.js":
/*!**************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/html.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "../../node_modules/core-js/internals/get-built-in.js");

module.exports = getBuiltIn('document', 'documentElement');

/***/ }),

/***/ "../../node_modules/core-js/internals/ie8-dom-define.js":
/*!************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/ie8-dom-define.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../node_modules/core-js/internals/descriptors.js");

var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");

var createElement = __webpack_require__(/*! ../internals/document-create-element */ "../../node_modules/core-js/internals/document-create-element.js"); // Thank's IE8 for his funny defineProperty


module.exports = !DESCRIPTORS && !fails(function () {
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () {
      function get() {
        return 7;
      }

      return get;
    }()
  }).a != 7;
});

/***/ }),

/***/ "../../node_modules/core-js/internals/indexed-object.js":
/*!************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/indexed-object.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");

var classof = __webpack_require__(/*! ../internals/classof-raw */ "../../node_modules/core-js/internals/classof-raw.js");

var split = ''.split; // fallback for non-array-like ES3 and non-enumerable old V8 strings

module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;

/***/ }),

/***/ "../../node_modules/core-js/internals/inherit-if-required.js":
/*!*****************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/inherit-if-required.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isObject = __webpack_require__(/*! ../internals/is-object */ "../../node_modules/core-js/internals/is-object.js");

var setPrototypeOf = __webpack_require__(/*! ../internals/object-set-prototype-of */ "../../node_modules/core-js/internals/object-set-prototype-of.js"); // makes subclassing work correct for wrapped built-ins


module.exports = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if ( // it can work only with native `setPrototypeOf`
  setPrototypeOf && // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
  typeof (NewTarget = dummy.constructor) == 'function' && NewTarget !== Wrapper && isObject(NewTargetPrototype = NewTarget.prototype) && NewTargetPrototype !== Wrapper.prototype) setPrototypeOf($this, NewTargetPrototype);
  return $this;
};

/***/ }),

/***/ "../../node_modules/core-js/internals/internal-metadata.js":
/*!***************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/internal-metadata.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "../../node_modules/core-js/internals/hidden-keys.js");

var isObject = __webpack_require__(/*! ../internals/is-object */ "../../node_modules/core-js/internals/is-object.js");

var has = __webpack_require__(/*! ../internals/has */ "../../node_modules/core-js/internals/has.js");

var defineProperty = __webpack_require__(/*! ../internals/object-define-property */ "../../node_modules/core-js/internals/object-define-property.js").f;

var uid = __webpack_require__(/*! ../internals/uid */ "../../node_modules/core-js/internals/uid.js");

var FREEZING = __webpack_require__(/*! ../internals/freezing */ "../../node_modules/core-js/internals/freezing.js");

var METADATA = uid('meta');
var id = 0;

var isExtensible = Object.isExtensible || function () {
  return true;
};

var setMetadata = function setMetadata(it) {
  defineProperty(it, METADATA, {
    value: {
      objectID: 'O' + ++id,
      // object ID
      weakData: {} // weak collections IDs

    }
  });
};

var fastKey = function fastKey(it, create) {
  // return a primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;

  if (!has(it, METADATA)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F'; // not necessary to add metadata

    if (!create) return 'E'; // add missing metadata

    setMetadata(it); // return object ID
  }

  return it[METADATA].objectID;
};

var getWeakData = function getWeakData(it, create) {
  if (!has(it, METADATA)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true; // not necessary to add metadata

    if (!create) return false; // add missing metadata

    setMetadata(it); // return the store of weak collections IDs
  }

  return it[METADATA].weakData;
}; // add metadata on freeze-family methods calling


var onFreeze = function onFreeze(it) {
  if (FREEZING && meta.REQUIRED && isExtensible(it) && !has(it, METADATA)) setMetadata(it);
  return it;
};

var meta = module.exports = {
  REQUIRED: false,
  fastKey: fastKey,
  getWeakData: getWeakData,
  onFreeze: onFreeze
};
hiddenKeys[METADATA] = true;

/***/ }),

/***/ "../../node_modules/core-js/internals/internal-state.js":
/*!************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/internal-state.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var NATIVE_WEAK_MAP = __webpack_require__(/*! ../internals/native-weak-map */ "../../node_modules/core-js/internals/native-weak-map.js");

var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");

var isObject = __webpack_require__(/*! ../internals/is-object */ "../../node_modules/core-js/internals/is-object.js");

var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "../../node_modules/core-js/internals/create-non-enumerable-property.js");

var objectHas = __webpack_require__(/*! ../internals/has */ "../../node_modules/core-js/internals/has.js");

var sharedKey = __webpack_require__(/*! ../internals/shared-key */ "../../node_modules/core-js/internals/shared-key.js");

var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "../../node_modules/core-js/internals/hidden-keys.js");

var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function enforce(it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function getterFor(TYPE) {
  return function (it) {
    var state;

    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    }

    return state;
  };
};

if (NATIVE_WEAK_MAP) {
  var store = new WeakMap();
  var wmget = store.get;
  var wmhas = store.has;
  var wmset = store.set;

  set = function set(it, metadata) {
    wmset.call(store, it, metadata);
    return metadata;
  };

  get = function get(it) {
    return wmget.call(store, it) || {};
  };

  has = function has(it) {
    return wmhas.call(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;

  set = function set(it, metadata) {
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };

  get = function get(it) {
    return objectHas(it, STATE) ? it[STATE] : {};
  };

  has = function has(it) {
    return objectHas(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};

/***/ }),

/***/ "../../node_modules/core-js/internals/is-array-iterator-method.js":
/*!**********************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/is-array-iterator-method.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../node_modules/core-js/internals/well-known-symbol.js");

var Iterators = __webpack_require__(/*! ../internals/iterators */ "../../node_modules/core-js/internals/iterators.js");

var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype; // check on default Array iterator

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};

/***/ }),

/***/ "../../node_modules/core-js/internals/is-array.js":
/*!******************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/is-array.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var classof = __webpack_require__(/*! ../internals/classof-raw */ "../../node_modules/core-js/internals/classof-raw.js"); // `IsArray` abstract operation
// https://tc39.github.io/ecma262/#sec-isarray


module.exports = Array.isArray || function () {
  function isArray(arg) {
    return classof(arg) == 'Array';
  }

  return isArray;
}();

/***/ }),

/***/ "../../node_modules/core-js/internals/is-forced.js":
/*!*******************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/is-forced.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");

var replacement = /#|\.prototype\./;

var isForced = function isForced(feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true : value == NATIVE ? false : typeof detection == 'function' ? fails(detection) : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';
module.exports = isForced;

/***/ }),

/***/ "../../node_modules/core-js/internals/is-integer.js":
/*!********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/is-integer.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isObject = __webpack_require__(/*! ../internals/is-object */ "../../node_modules/core-js/internals/is-object.js");

var floor = Math.floor; // `Number.isInteger` method implementation
// https://tc39.github.io/ecma262/#sec-number.isinteger

module.exports = function () {
  function isInteger(it) {
    return !isObject(it) && isFinite(it) && floor(it) === it;
  }

  return isInteger;
}();

/***/ }),

/***/ "../../node_modules/core-js/internals/is-object.js":
/*!*******************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/is-object.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),

/***/ "../../node_modules/core-js/internals/is-pure.js":
/*!*****************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/is-pure.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = false;

/***/ }),

/***/ "../../node_modules/core-js/internals/is-regexp.js":
/*!*******************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/is-regexp.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isObject = __webpack_require__(/*! ../internals/is-object */ "../../node_modules/core-js/internals/is-object.js");

var classof = __webpack_require__(/*! ../internals/classof-raw */ "../../node_modules/core-js/internals/classof-raw.js");

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../node_modules/core-js/internals/well-known-symbol.js");

var MATCH = wellKnownSymbol('match'); // `IsRegExp` abstract operation
// https://tc39.github.io/ecma262/#sec-isregexp

module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classof(it) == 'RegExp');
};

/***/ }),

/***/ "../../node_modules/core-js/internals/iterate.js":
/*!*****************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/iterate.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__(/*! ../internals/an-object */ "../../node_modules/core-js/internals/an-object.js");

var isArrayIteratorMethod = __webpack_require__(/*! ../internals/is-array-iterator-method */ "../../node_modules/core-js/internals/is-array-iterator-method.js");

var toLength = __webpack_require__(/*! ../internals/to-length */ "../../node_modules/core-js/internals/to-length.js");

var bind = __webpack_require__(/*! ../internals/bind-context */ "../../node_modules/core-js/internals/bind-context.js");

var getIteratorMethod = __webpack_require__(/*! ../internals/get-iterator-method */ "../../node_modules/core-js/internals/get-iterator-method.js");

var callWithSafeIterationClosing = __webpack_require__(/*! ../internals/call-with-safe-iteration-closing */ "../../node_modules/core-js/internals/call-with-safe-iteration-closing.js");

var Result = function Result(stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

var iterate = module.exports = function (iterable, fn, that, AS_ENTRIES, IS_ITERATOR) {
  var boundFunction = bind(fn, that, AS_ENTRIES ? 2 : 1);
  var iterator, iterFn, index, length, result, next, step;

  if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod(iterable);
    if (typeof iterFn != 'function') throw TypeError('Target is not iterable'); // optimisation for array iterators

    if (isArrayIteratorMethod(iterFn)) {
      for (index = 0, length = toLength(iterable.length); length > index; index++) {
        result = AS_ENTRIES ? boundFunction(anObject(step = iterable[index])[0], step[1]) : boundFunction(iterable[index]);
        if (result && result instanceof Result) return result;
      }

      return new Result(false);
    }

    iterator = iterFn.call(iterable);
  }

  next = iterator.next;

  while (!(step = next.call(iterator)).done) {
    result = callWithSafeIterationClosing(iterator, boundFunction, step.value, AS_ENTRIES);
    if (typeof result == 'object' && result && result instanceof Result) return result;
  }

  return new Result(false);
};

iterate.stop = function (result) {
  return new Result(true, result);
};

/***/ }),

/***/ "../../node_modules/core-js/internals/iterators-core.js":
/*!************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/iterators-core.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getPrototypeOf = __webpack_require__(/*! ../internals/object-get-prototype-of */ "../../node_modules/core-js/internals/object-get-prototype-of.js");

var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "../../node_modules/core-js/internals/create-non-enumerable-property.js");

var has = __webpack_require__(/*! ../internals/has */ "../../node_modules/core-js/internals/has.js");

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../node_modules/core-js/internals/well-known-symbol.js");

var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "../../node_modules/core-js/internals/is-pure.js");

var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;

var returnThis = function returnThis() {
  return this;
}; // `%IteratorPrototype%` object
// https://tc39.github.io/ecma262/#sec-%iteratorprototype%-object


var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

if ([].keys) {
  arrayIterator = [].keys(); // Safari 8 has buggy iterators w/o `next`

  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

if (IteratorPrototype == undefined) IteratorPrototype = {}; // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()

if (!IS_PURE && !has(IteratorPrototype, ITERATOR)) {
  createNonEnumerableProperty(IteratorPrototype, ITERATOR, returnThis);
}

module.exports = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};

/***/ }),

/***/ "../../node_modules/core-js/internals/iterators.js":
/*!*******************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/iterators.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {};

/***/ }),

/***/ "../../node_modules/core-js/internals/math-expm1.js":
/*!********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/math-expm1.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var nativeExpm1 = Math.expm1;
var exp = Math.exp; // `Math.expm1` method implementation
// https://tc39.github.io/ecma262/#sec-math.expm1

module.exports = !nativeExpm1 // Old FF bug
|| nativeExpm1(10) > 22025.465794806719 || nativeExpm1(10) < 22025.4657948067165168 // Tor Browser bug
|| nativeExpm1(-2e-17) != -2e-17 ? function () {
  function expm1(x) {
    return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : exp(x) - 1;
  }

  return expm1;
}() : nativeExpm1;

/***/ }),

/***/ "../../node_modules/core-js/internals/math-fround.js":
/*!*********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/math-fround.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var sign = __webpack_require__(/*! ../internals/math-sign */ "../../node_modules/core-js/internals/math-sign.js");

var abs = Math.abs;
var pow = Math.pow;
var EPSILON = pow(2, -52);
var EPSILON32 = pow(2, -23);
var MAX32 = pow(2, 127) * (2 - EPSILON32);
var MIN32 = pow(2, -126);

var roundTiesToEven = function roundTiesToEven(n) {
  return n + 1 / EPSILON - 1 / EPSILON;
}; // `Math.fround` method implementation
// https://tc39.github.io/ecma262/#sec-math.fround


module.exports = Math.fround || function () {
  function fround(x) {
    var $abs = abs(x);
    var $sign = sign(x);
    var a, result;
    if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
    a = (1 + EPSILON32 / EPSILON) * $abs;
    result = a - (a - $abs); // eslint-disable-next-line no-self-compare

    if (result > MAX32 || result != result) return $sign * Infinity;
    return $sign * result;
  }

  return fround;
}();

/***/ }),

/***/ "../../node_modules/core-js/internals/math-log1p.js":
/*!********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/math-log1p.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var log = Math.log; // `Math.log1p` method implementation
// https://tc39.github.io/ecma262/#sec-math.log1p

module.exports = Math.log1p || function () {
  function log1p(x) {
    return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : log(1 + x);
  }

  return log1p;
}();

/***/ }),

/***/ "../../node_modules/core-js/internals/math-sign.js":
/*!*******************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/math-sign.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// `Math.sign` method implementation
// https://tc39.github.io/ecma262/#sec-math.sign
module.exports = Math.sign || function () {
  function sign(x) {
    // eslint-disable-next-line no-self-compare
    return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
  }

  return sign;
}();

/***/ }),

/***/ "../../node_modules/core-js/internals/microtask.js":
/*!*******************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/microtask.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");

var getOwnPropertyDescriptor = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "../../node_modules/core-js/internals/object-get-own-property-descriptor.js").f;

var classof = __webpack_require__(/*! ../internals/classof-raw */ "../../node_modules/core-js/internals/classof-raw.js");

var macrotask = __webpack_require__(/*! ../internals/task */ "../../node_modules/core-js/internals/task.js").set;

var userAgent = __webpack_require__(/*! ../internals/user-agent */ "../../node_modules/core-js/internals/user-agent.js");

var MutationObserver = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var IS_NODE = classof(process) == 'process'; // Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`

var queueMicrotaskDescriptor = getOwnPropertyDescriptor(global, 'queueMicrotask');
var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;
var flush, head, last, notify, toggle, node, promise, then; // modern engines have queueMicrotask method

if (!queueMicrotask) {
  flush = function flush() {
    var parent, fn;
    if (IS_NODE && (parent = process.domain)) parent.exit();

    while (head) {
      fn = head.fn;
      head = head.next;

      try {
        fn();
      } catch (error) {
        if (head) notify();else last = undefined;
        throw error;
      }
    }

    last = undefined;
    if (parent) parent.enter();
  }; // Node.js


  if (IS_NODE) {
    notify = function notify() {
      process.nextTick(flush);
    }; // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339

  } else if (MutationObserver && !/(iphone|ipod|ipad).*applewebkit/i.test(userAgent)) {
    toggle = true;
    node = document.createTextNode('');
    new MutationObserver(flush).observe(node, {
      characterData: true
    });

    notify = function notify() {
      node.data = toggle = !toggle;
    }; // environments with maybe non-completely correct, but existent Promise

  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    promise = Promise.resolve(undefined);
    then = promise.then;

    notify = function notify() {
      then.call(promise, flush);
    }; // for other environments - macrotask based on:
    // - setImmediate
    // - MessageChannel
    // - window.postMessag
    // - onreadystatechange
    // - setTimeout

  } else {
    notify = function notify() {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }
}

module.exports = queueMicrotask || function (fn) {
  var task = {
    fn: fn,
    next: undefined
  };
  if (last) last.next = task;

  if (!head) {
    head = task;
    notify();
  }

  last = task;
};

/***/ }),

/***/ "../../node_modules/core-js/internals/native-promise-constructor.js":
/*!************************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/native-promise-constructor.js ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");

module.exports = global.Promise;

/***/ }),

/***/ "../../node_modules/core-js/internals/native-symbol.js":
/*!***********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/native-symbol.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");

module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  // Chrome 38 Symbol has incorrect toString conversion
  // eslint-disable-next-line no-undef
  return !String(Symbol());
});

/***/ }),

/***/ "../../node_modules/core-js/internals/native-url.js":
/*!********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/native-url.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../node_modules/core-js/internals/well-known-symbol.js");

var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "../../node_modules/core-js/internals/is-pure.js");

var ITERATOR = wellKnownSymbol('iterator');
module.exports = !fails(function () {
  var url = new URL('b?a=1&b=2&c=3', 'http://a');
  var searchParams = url.searchParams;
  var result = '';
  url.pathname = 'c%20d';
  searchParams.forEach(function (value, key) {
    searchParams['delete']('b');
    result += key + value;
  });
  return IS_PURE && !url.toJSON || !searchParams.sort || url.href !== 'http://a/c%20d?a=1&c=3' || searchParams.get('c') !== '3' || String(new URLSearchParams('?a=1')) !== 'a=1' || !searchParams[ITERATOR] // throws in Edge
  || new URL('https://a@b').username !== 'a' || new URLSearchParams(new URLSearchParams('a=b')).get('a') !== 'b' // not punycoded in Edge
  || new URL('http://тест').host !== 'xn--e1aybc' // not escaped in Chrome 62-
  || new URL('http://a#б').hash !== '#%D0%B1' // fails in Chrome 66-
  || result !== 'a1c3' // throws in Safari
  || new URL('http://x', undefined).host !== 'x';
});

/***/ }),

/***/ "../../node_modules/core-js/internals/native-weak-map.js":
/*!*************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/native-weak-map.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");

var nativeFunctionToString = __webpack_require__(/*! ../internals/function-to-string */ "../../node_modules/core-js/internals/function-to-string.js");

var WeakMap = global.WeakMap;
module.exports = typeof WeakMap === 'function' && /native code/.test(nativeFunctionToString.call(WeakMap));

/***/ }),

/***/ "../../node_modules/core-js/internals/new-promise-capability.js":
/*!********************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/new-promise-capability.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var aFunction = __webpack_require__(/*! ../internals/a-function */ "../../node_modules/core-js/internals/a-function.js");

var PromiseCapability = function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}; // 25.4.1.5 NewPromiseCapability(C)


module.exports.f = function (C) {
  return new PromiseCapability(C);
};

/***/ }),

/***/ "../../node_modules/core-js/internals/not-a-regexp.js":
/*!**********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/not-a-regexp.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isRegExp = __webpack_require__(/*! ../internals/is-regexp */ "../../node_modules/core-js/internals/is-regexp.js");

module.exports = function (it) {
  if (isRegExp(it)) {
    throw TypeError("The method doesn't accept regular expressions");
  }

  return it;
};

/***/ }),

/***/ "../../node_modules/core-js/internals/number-is-finite.js":
/*!**************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/number-is-finite.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");

var globalIsFinite = global.isFinite; // `Number.isFinite` method
// https://tc39.github.io/ecma262/#sec-number.isfinite

module.exports = Number.isFinite || function () {
  function isFinite(it) {
    return typeof it == 'number' && globalIsFinite(it);
  }

  return isFinite;
}();

/***/ }),

/***/ "../../node_modules/core-js/internals/object-assign.js":
/*!***********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/object-assign.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../node_modules/core-js/internals/descriptors.js");

var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");

var objectKeys = __webpack_require__(/*! ../internals/object-keys */ "../../node_modules/core-js/internals/object-keys.js");

var getOwnPropertySymbolsModule = __webpack_require__(/*! ../internals/object-get-own-property-symbols */ "../../node_modules/core-js/internals/object-get-own-property-symbols.js");

var propertyIsEnumerableModule = __webpack_require__(/*! ../internals/object-property-is-enumerable */ "../../node_modules/core-js/internals/object-property-is-enumerable.js");

var toObject = __webpack_require__(/*! ../internals/to-object */ "../../node_modules/core-js/internals/to-object.js");

var IndexedObject = __webpack_require__(/*! ../internals/indexed-object */ "../../node_modules/core-js/internals/indexed-object.js");

var nativeAssign = Object.assign; // `Object.assign` method
// https://tc39.github.io/ecma262/#sec-object.assign
// should work with symbols and should have deterministic property order (V8 bug)

module.exports = !nativeAssign || fails(function () {
  var A = {};
  var B = {}; // eslint-disable-next-line no-undef

  var symbol = Symbol();
  var alphabet = 'abcdefghijklmnopqrst';
  A[symbol] = 7;
  alphabet.split('').forEach(function (chr) {
    B[chr] = chr;
  });
  return nativeAssign({}, A)[symbol] != 7 || objectKeys(nativeAssign({}, B)).join('') != alphabet;
}) ? function () {
  function assign(target, source) {
    // eslint-disable-line no-unused-vars
    var T = toObject(target);
    var argumentsLength = arguments.length;
    var index = 1;
    var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
    var propertyIsEnumerable = propertyIsEnumerableModule.f;

    while (argumentsLength > index) {
      var S = IndexedObject(arguments[index++]);
      var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
      var length = keys.length;
      var j = 0;
      var key;

      while (length > j) {
        key = keys[j++];
        if (!DESCRIPTORS || propertyIsEnumerable.call(S, key)) T[key] = S[key];
      }
    }

    return T;
  }

  return assign;
}() : nativeAssign;

/***/ }),

/***/ "../../node_modules/core-js/internals/object-create.js":
/*!***********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/object-create.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__(/*! ../internals/an-object */ "../../node_modules/core-js/internals/an-object.js");

var defineProperties = __webpack_require__(/*! ../internals/object-define-properties */ "../../node_modules/core-js/internals/object-define-properties.js");

var enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ "../../node_modules/core-js/internals/enum-bug-keys.js");

var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "../../node_modules/core-js/internals/hidden-keys.js");

var html = __webpack_require__(/*! ../internals/html */ "../../node_modules/core-js/internals/html.js");

var documentCreateElement = __webpack_require__(/*! ../internals/document-create-element */ "../../node_modules/core-js/internals/document-create-element.js");

var sharedKey = __webpack_require__(/*! ../internals/shared-key */ "../../node_modules/core-js/internals/shared-key.js");

var IE_PROTO = sharedKey('IE_PROTO');
var PROTOTYPE = 'prototype';

var Empty = function Empty() {
  /* empty */
}; // Create object with fake `null` prototype: use iframe Object with cleared prototype


var _createDict = function createDict() {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var length = enumBugKeys.length;
  var lt = '<';
  var script = 'script';
  var gt = '>';
  var js = 'java' + script + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  iframe.src = String(js);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + script + gt + 'document.F=Object' + lt + '/' + script + gt);
  iframeDocument.close();
  _createDict = iframeDocument.F;

  while (length--) {
    delete _createDict[PROTOTYPE][enumBugKeys[length]];
  }

  return _createDict();
}; // `Object.create` method
// https://tc39.github.io/ecma262/#sec-object.create


module.exports = Object.create || function () {
  function create(O, Properties) {
    var result;

    if (O !== null) {
      Empty[PROTOTYPE] = anObject(O);
      result = new Empty();
      Empty[PROTOTYPE] = null; // add "__proto__" for Object.getPrototypeOf polyfill

      result[IE_PROTO] = O;
    } else result = _createDict();

    return Properties === undefined ? result : defineProperties(result, Properties);
  }

  return create;
}();

hiddenKeys[IE_PROTO] = true;

/***/ }),

/***/ "../../node_modules/core-js/internals/object-define-properties.js":
/*!**********************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/object-define-properties.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../node_modules/core-js/internals/descriptors.js");

var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "../../node_modules/core-js/internals/object-define-property.js");

var anObject = __webpack_require__(/*! ../internals/an-object */ "../../node_modules/core-js/internals/an-object.js");

var objectKeys = __webpack_require__(/*! ../internals/object-keys */ "../../node_modules/core-js/internals/object-keys.js"); // `Object.defineProperties` method
// https://tc39.github.io/ecma262/#sec-object.defineproperties


module.exports = DESCRIPTORS ? Object.defineProperties : function () {
  function defineProperties(O, Properties) {
    anObject(O);
    var keys = objectKeys(Properties);
    var length = keys.length;
    var index = 0;
    var key;

    while (length > index) {
      definePropertyModule.f(O, key = keys[index++], Properties[key]);
    }

    return O;
  }

  return defineProperties;
}();

/***/ }),

/***/ "../../node_modules/core-js/internals/object-define-property.js":
/*!********************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/object-define-property.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../node_modules/core-js/internals/descriptors.js");

var IE8_DOM_DEFINE = __webpack_require__(/*! ../internals/ie8-dom-define */ "../../node_modules/core-js/internals/ie8-dom-define.js");

var anObject = __webpack_require__(/*! ../internals/an-object */ "../../node_modules/core-js/internals/an-object.js");

var toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ "../../node_modules/core-js/internals/to-primitive.js");

var nativeDefineProperty = Object.defineProperty; // `Object.defineProperty` method
// https://tc39.github.io/ecma262/#sec-object.defineproperty

exports.f = DESCRIPTORS ? nativeDefineProperty : function () {
  function defineProperty(O, P, Attributes) {
    anObject(O);
    P = toPrimitive(P, true);
    anObject(Attributes);
    if (IE8_DOM_DEFINE) try {
      return nativeDefineProperty(O, P, Attributes);
    } catch (error) {
      /* empty */
    }
    if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
  }

  return defineProperty;
}();

/***/ }),

/***/ "../../node_modules/core-js/internals/object-get-own-property-descriptor.js":
/*!********************************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/object-get-own-property-descriptor.js ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../node_modules/core-js/internals/descriptors.js");

var propertyIsEnumerableModule = __webpack_require__(/*! ../internals/object-property-is-enumerable */ "../../node_modules/core-js/internals/object-property-is-enumerable.js");

var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "../../node_modules/core-js/internals/create-property-descriptor.js");

var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "../../node_modules/core-js/internals/to-indexed-object.js");

var toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ "../../node_modules/core-js/internals/to-primitive.js");

var has = __webpack_require__(/*! ../internals/has */ "../../node_modules/core-js/internals/has.js");

var IE8_DOM_DEFINE = __webpack_require__(/*! ../internals/ie8-dom-define */ "../../node_modules/core-js/internals/ie8-dom-define.js");

var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; // `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor

exports.f = DESCRIPTORS ? nativeGetOwnPropertyDescriptor : function () {
  function getOwnPropertyDescriptor(O, P) {
    O = toIndexedObject(O);
    P = toPrimitive(P, true);
    if (IE8_DOM_DEFINE) try {
      return nativeGetOwnPropertyDescriptor(O, P);
    } catch (error) {
      /* empty */
    }
    if (has(O, P)) return createPropertyDescriptor(!propertyIsEnumerableModule.f.call(O, P), O[P]);
  }

  return getOwnPropertyDescriptor;
}();

/***/ }),

/***/ "../../node_modules/core-js/internals/object-get-own-property-names-external.js":
/*!************************************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/object-get-own-property-names-external.js ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "../../node_modules/core-js/internals/to-indexed-object.js");

var nativeGetOwnPropertyNames = __webpack_require__(/*! ../internals/object-get-own-property-names */ "../../node_modules/core-js/internals/object-get-own-property-names.js").f;

var toString = {}.toString;
var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function getWindowNames(it) {
  try {
    return nativeGetOwnPropertyNames(it);
  } catch (error) {
    return windowNames.slice();
  }
}; // fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window


module.exports.f = function () {
  function getOwnPropertyNames(it) {
    return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : nativeGetOwnPropertyNames(toIndexedObject(it));
  }

  return getOwnPropertyNames;
}();

/***/ }),

/***/ "../../node_modules/core-js/internals/object-get-own-property-names.js":
/*!***************************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/object-get-own-property-names.js ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var internalObjectKeys = __webpack_require__(/*! ../internals/object-keys-internal */ "../../node_modules/core-js/internals/object-keys-internal.js");

var enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ "../../node_modules/core-js/internals/enum-bug-keys.js");

var hiddenKeys = enumBugKeys.concat('length', 'prototype'); // `Object.getOwnPropertyNames` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertynames

exports.f = Object.getOwnPropertyNames || function () {
  function getOwnPropertyNames(O) {
    return internalObjectKeys(O, hiddenKeys);
  }

  return getOwnPropertyNames;
}();

/***/ }),

/***/ "../../node_modules/core-js/internals/object-get-own-property-symbols.js":
/*!*****************************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/object-get-own-property-symbols.js ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.f = Object.getOwnPropertySymbols;

/***/ }),

/***/ "../../node_modules/core-js/internals/object-get-prototype-of.js":
/*!*********************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/object-get-prototype-of.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = __webpack_require__(/*! ../internals/has */ "../../node_modules/core-js/internals/has.js");

var toObject = __webpack_require__(/*! ../internals/to-object */ "../../node_modules/core-js/internals/to-object.js");

var sharedKey = __webpack_require__(/*! ../internals/shared-key */ "../../node_modules/core-js/internals/shared-key.js");

var CORRECT_PROTOTYPE_GETTER = __webpack_require__(/*! ../internals/correct-prototype-getter */ "../../node_modules/core-js/internals/correct-prototype-getter.js");

var IE_PROTO = sharedKey('IE_PROTO');
var ObjectPrototype = Object.prototype; // `Object.getPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.getprototypeof

module.exports = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];

  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  }

  return O instanceof Object ? ObjectPrototype : null;
};

/***/ }),

/***/ "../../node_modules/core-js/internals/object-keys-internal.js":
/*!******************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/object-keys-internal.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = __webpack_require__(/*! ../internals/has */ "../../node_modules/core-js/internals/has.js");

var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "../../node_modules/core-js/internals/to-indexed-object.js");

var indexOf = __webpack_require__(/*! ../internals/array-includes */ "../../node_modules/core-js/internals/array-includes.js").indexOf;

var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "../../node_modules/core-js/internals/hidden-keys.js");

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;

  for (key in O) {
    !has(hiddenKeys, key) && has(O, key) && result.push(key);
  } // Don't enum bug & hidden keys


  while (names.length > i) {
    if (has(O, key = names[i++])) {
      ~indexOf(result, key) || result.push(key);
    }
  }

  return result;
};

/***/ }),

/***/ "../../node_modules/core-js/internals/object-keys.js":
/*!*********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/object-keys.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var internalObjectKeys = __webpack_require__(/*! ../internals/object-keys-internal */ "../../node_modules/core-js/internals/object-keys-internal.js");

var enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ "../../node_modules/core-js/internals/enum-bug-keys.js"); // `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys


module.exports = Object.keys || function () {
  function keys(O) {
    return internalObjectKeys(O, enumBugKeys);
  }

  return keys;
}();

/***/ }),

/***/ "../../node_modules/core-js/internals/object-property-is-enumerable.js":
/*!***************************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/object-property-is-enumerable.js ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; // Nashorn ~ JDK8 bug

var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({
  1: 2
}, 1); // `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable

exports.f = NASHORN_BUG ? function () {
  function propertyIsEnumerable(V) {
    var descriptor = getOwnPropertyDescriptor(this, V);
    return !!descriptor && descriptor.enumerable;
  }

  return propertyIsEnumerable;
}() : nativePropertyIsEnumerable;

/***/ }),

/***/ "../../node_modules/core-js/internals/object-set-prototype-of.js":
/*!*********************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/object-set-prototype-of.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__(/*! ../internals/an-object */ "../../node_modules/core-js/internals/an-object.js");

var aPossiblePrototype = __webpack_require__(/*! ../internals/a-possible-prototype */ "../../node_modules/core-js/internals/a-possible-prototype.js"); // `Object.setPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.

/* eslint-disable no-proto */


module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;

  try {
    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
    setter.call(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) {
    /* empty */
  }

  return function () {
    function setPrototypeOf(O, proto) {
      anObject(O);
      aPossiblePrototype(proto);
      if (CORRECT_SETTER) setter.call(O, proto);else O.__proto__ = proto;
      return O;
    }

    return setPrototypeOf;
  }();
}() : undefined);

/***/ }),

/***/ "../../node_modules/core-js/internals/object-to-array.js":
/*!*************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/object-to-array.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../node_modules/core-js/internals/descriptors.js");

var objectKeys = __webpack_require__(/*! ../internals/object-keys */ "../../node_modules/core-js/internals/object-keys.js");

var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "../../node_modules/core-js/internals/to-indexed-object.js");

var propertyIsEnumerable = __webpack_require__(/*! ../internals/object-property-is-enumerable */ "../../node_modules/core-js/internals/object-property-is-enumerable.js").f; // `Object.{ entries, values }` methods implementation


var createMethod = function createMethod(TO_ENTRIES) {
  return function (it) {
    var O = toIndexedObject(it);
    var keys = objectKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;

    while (length > i) {
      key = keys[i++];

      if (!DESCRIPTORS || propertyIsEnumerable.call(O, key)) {
        result.push(TO_ENTRIES ? [key, O[key]] : O[key]);
      }
    }

    return result;
  };
};

module.exports = {
  // `Object.entries` method
  // https://tc39.github.io/ecma262/#sec-object.entries
  entries: createMethod(true),
  // `Object.values` method
  // https://tc39.github.io/ecma262/#sec-object.values
  values: createMethod(false)
};

/***/ }),

/***/ "../../node_modules/core-js/internals/object-to-string.js":
/*!**************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/object-to-string.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var classof = __webpack_require__(/*! ../internals/classof */ "../../node_modules/core-js/internals/classof.js");

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../node_modules/core-js/internals/well-known-symbol.js");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};
test[TO_STRING_TAG] = 'z'; // `Object.prototype.toString` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.tostring

module.exports = String(test) !== '[object z]' ? function () {
  function toString() {
    return '[object ' + classof(this) + ']';
  }

  return toString;
}() : test.toString;

/***/ }),

/***/ "../../node_modules/core-js/internals/own-keys.js":
/*!******************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/own-keys.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "../../node_modules/core-js/internals/get-built-in.js");

var getOwnPropertyNamesModule = __webpack_require__(/*! ../internals/object-get-own-property-names */ "../../node_modules/core-js/internals/object-get-own-property-names.js");

var getOwnPropertySymbolsModule = __webpack_require__(/*! ../internals/object-get-own-property-symbols */ "../../node_modules/core-js/internals/object-get-own-property-symbols.js");

var anObject = __webpack_require__(/*! ../internals/an-object */ "../../node_modules/core-js/internals/an-object.js"); // all object keys, includes non-enumerable and symbols


module.exports = getBuiltIn('Reflect', 'ownKeys') || function () {
  function ownKeys(it) {
    var keys = getOwnPropertyNamesModule.f(anObject(it));
    var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
    return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
  }

  return ownKeys;
}();

/***/ }),

/***/ "../../node_modules/core-js/internals/parse-float.js":
/*!*********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/parse-float.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");

var trim = __webpack_require__(/*! ../internals/string-trim */ "../../node_modules/core-js/internals/string-trim.js").trim;

var whitespaces = __webpack_require__(/*! ../internals/whitespaces */ "../../node_modules/core-js/internals/whitespaces.js");

var nativeParseFloat = global.parseFloat;
var FORCED = 1 / nativeParseFloat(whitespaces + '-0') !== -Infinity; // `parseFloat` method
// https://tc39.github.io/ecma262/#sec-parsefloat-string

module.exports = FORCED ? function () {
  function parseFloat(string) {
    var trimmedString = trim(String(string));
    var result = nativeParseFloat(trimmedString);
    return result === 0 && trimmedString.charAt(0) == '-' ? -0 : result;
  }

  return parseFloat;
}() : nativeParseFloat;

/***/ }),

/***/ "../../node_modules/core-js/internals/parse-int.js":
/*!*******************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/parse-int.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");

var trim = __webpack_require__(/*! ../internals/string-trim */ "../../node_modules/core-js/internals/string-trim.js").trim;

var whitespaces = __webpack_require__(/*! ../internals/whitespaces */ "../../node_modules/core-js/internals/whitespaces.js");

var nativeParseInt = global.parseInt;
var hex = /^[+-]?0[Xx]/;
var FORCED = nativeParseInt(whitespaces + '08') !== 8 || nativeParseInt(whitespaces + '0x16') !== 22; // `parseInt` method
// https://tc39.github.io/ecma262/#sec-parseint-string-radix

module.exports = FORCED ? function () {
  function parseInt(string, radix) {
    var S = trim(String(string));
    return nativeParseInt(S, radix >>> 0 || (hex.test(S) ? 16 : 10));
  }

  return parseInt;
}() : nativeParseInt;

/***/ }),

/***/ "../../node_modules/core-js/internals/path.js":
/*!**************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/path.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");

/***/ }),

/***/ "../../node_modules/core-js/internals/perform.js":
/*!*****************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/perform.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (exec) {
  try {
    return {
      error: false,
      value: exec()
    };
  } catch (error) {
    return {
      error: true,
      value: error
    };
  }
};

/***/ }),

/***/ "../../node_modules/core-js/internals/promise-resolve.js":
/*!*************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/promise-resolve.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__(/*! ../internals/an-object */ "../../node_modules/core-js/internals/an-object.js");

var isObject = __webpack_require__(/*! ../internals/is-object */ "../../node_modules/core-js/internals/is-object.js");

var newPromiseCapability = __webpack_require__(/*! ../internals/new-promise-capability */ "../../node_modules/core-js/internals/new-promise-capability.js");

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};

/***/ }),

/***/ "../../node_modules/core-js/internals/punycode-to-ascii.js":
/*!***************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/punycode-to-ascii.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // based on https://github.com/bestiejs/punycode.js/blob/master/punycode.js

var maxInt = 2147483647; // aka. 0x7FFFFFFF or 2^31-1

var base = 36;
var tMin = 1;
var tMax = 26;
var skew = 38;
var damp = 700;
var initialBias = 72;
var initialN = 128; // 0x80

var delimiter = '-'; // '\x2D'

var regexNonASCII = /[^\0-\u007E]/; // non-ASCII chars

var regexSeparators = /[.\u3002\uFF0E\uFF61]/g; // RFC 3490 separators

var OVERFLOW_ERROR = 'Overflow: input needs wider integers to process';
var baseMinusTMin = base - tMin;
var floor = Math.floor;
var stringFromCharCode = String.fromCharCode;
/**
 * Creates an array containing the numeric code points of each Unicode
 * character in the string. While JavaScript uses UCS-2 internally,
 * this function will convert a pair of surrogate halves (each of which
 * UCS-2 exposes as separate characters) into a single code point,
 * matching UTF-16.
 */

var ucs2decode = function ucs2decode(string) {
  var output = [];
  var counter = 0;
  var length = string.length;

  while (counter < length) {
    var value = string.charCodeAt(counter++);

    if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
      // It's a high surrogate, and there is a next character.
      var extra = string.charCodeAt(counter++);

      if ((extra & 0xFC00) == 0xDC00) {
        // Low surrogate.
        output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
      } else {
        // It's an unmatched surrogate; only append this code unit, in case the
        // next code unit is the high surrogate of a surrogate pair.
        output.push(value);
        counter--;
      }
    } else {
      output.push(value);
    }
  }

  return output;
};
/**
 * Converts a digit/integer into a basic code point.
 */


var digitToBasic = function digitToBasic(digit) {
  //  0..25 map to ASCII a..z or A..Z
  // 26..35 map to ASCII 0..9
  return digit + 22 + 75 * (digit < 26);
};
/**
 * Bias adaptation function as per section 3.4 of RFC 3492.
 * https://tools.ietf.org/html/rfc3492#section-3.4
 */


var adapt = function adapt(delta, numPoints, firstTime) {
  var k = 0;
  delta = firstTime ? floor(delta / damp) : delta >> 1;
  delta += floor(delta / numPoints);

  for (; delta > baseMinusTMin * tMax >> 1; k += base) {
    delta = floor(delta / baseMinusTMin);
  }

  return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
};
/**
 * Converts a string of Unicode symbols (e.g. a domain name label) to a
 * Punycode string of ASCII-only symbols.
 */
// eslint-disable-next-line  max-statements


var encode = function encode(input) {
  var output = []; // Convert the input in UCS-2 to an array of Unicode code points.

  input = ucs2decode(input); // Cache the length.

  var inputLength = input.length; // Initialize the state.

  var n = initialN;
  var delta = 0;
  var bias = initialBias;
  var i, currentValue; // Handle the basic code points.

  for (i = 0; i < input.length; i++) {
    currentValue = input[i];

    if (currentValue < 0x80) {
      output.push(stringFromCharCode(currentValue));
    }
  }

  var basicLength = output.length; // number of basic code points.

  var handledCPCount = basicLength; // number of code points that have been handled;
  // Finish the basic string with a delimiter unless it's empty.

  if (basicLength) {
    output.push(delimiter);
  } // Main encoding loop:


  while (handledCPCount < inputLength) {
    // All non-basic code points < n have been handled already. Find the next larger one:
    var m = maxInt;

    for (i = 0; i < input.length; i++) {
      currentValue = input[i];

      if (currentValue >= n && currentValue < m) {
        m = currentValue;
      }
    } // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>, but guard against overflow.


    var handledCPCountPlusOne = handledCPCount + 1;

    if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
      throw RangeError(OVERFLOW_ERROR);
    }

    delta += (m - n) * handledCPCountPlusOne;
    n = m;

    for (i = 0; i < input.length; i++) {
      currentValue = input[i];

      if (currentValue < n && ++delta > maxInt) {
        throw RangeError(OVERFLOW_ERROR);
      }

      if (currentValue == n) {
        // Represent delta as a generalized variable-length integer.
        var q = delta;

        for (var k = base;;
        /* no condition */
        k += base) {
          var t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
          if (q < t) break;
          var qMinusT = q - t;
          var baseMinusT = base - t;
          output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT)));
          q = floor(qMinusT / baseMinusT);
        }

        output.push(stringFromCharCode(digitToBasic(q)));
        bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
        delta = 0;
        ++handledCPCount;
      }
    }

    ++delta;
    ++n;
  }

  return output.join('');
};

module.exports = function (input) {
  var encoded = [];
  var labels = input.toLowerCase().replace(regexSeparators, ".").split('.');
  var i, label;

  for (i = 0; i < labels.length; i++) {
    label = labels[i];
    encoded.push(regexNonASCII.test(label) ? 'xn--' + encode(label) : label);
  }

  return encoded.join('.');
};

/***/ }),

/***/ "../../node_modules/core-js/internals/redefine-all.js":
/*!**********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/redefine-all.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var redefine = __webpack_require__(/*! ../internals/redefine */ "../../node_modules/core-js/internals/redefine.js");

module.exports = function (target, src, options) {
  for (var key in src) {
    redefine(target, key, src[key], options);
  }

  return target;
};

/***/ }),

/***/ "../../node_modules/core-js/internals/redefine.js":
/*!******************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/redefine.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");

var shared = __webpack_require__(/*! ../internals/shared */ "../../node_modules/core-js/internals/shared.js");

var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "../../node_modules/core-js/internals/create-non-enumerable-property.js");

var has = __webpack_require__(/*! ../internals/has */ "../../node_modules/core-js/internals/has.js");

var setGlobal = __webpack_require__(/*! ../internals/set-global */ "../../node_modules/core-js/internals/set-global.js");

var nativeFunctionToString = __webpack_require__(/*! ../internals/function-to-string */ "../../node_modules/core-js/internals/function-to-string.js");

var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "../../node_modules/core-js/internals/internal-state.js");

var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(nativeFunctionToString).split('toString');
shared('inspectSource', function (it) {
  return nativeFunctionToString.call(it);
});
(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;

  if (typeof value == 'function') {
    if (typeof key == 'string' && !has(value, 'name')) createNonEnumerableProperty(value, 'name', key);
    enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
  }

  if (O === global) {
    if (simple) O[key] = value;else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }

  if (simple) O[key] = value;else createNonEnumerableProperty(O, key, value); // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function () {
  function toString() {
    return typeof this == 'function' && getInternalState(this).source || nativeFunctionToString.call(this);
  }

  return toString;
}());

/***/ }),

/***/ "../../node_modules/core-js/internals/regexp-exec-abstract.js":
/*!******************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/regexp-exec-abstract.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var classof = __webpack_require__(/*! ./classof-raw */ "../../node_modules/core-js/internals/classof-raw.js");

var regexpExec = __webpack_require__(/*! ./regexp-exec */ "../../node_modules/core-js/internals/regexp-exec.js"); // `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec


module.exports = function (R, S) {
  var exec = R.exec;

  if (typeof exec === 'function') {
    var result = exec.call(R, S);

    if (typeof result !== 'object') {
      throw TypeError('RegExp exec method returned something other than an Object or null');
    }

    return result;
  }

  if (classof(R) !== 'RegExp') {
    throw TypeError('RegExp#exec called on incompatible receiver');
  }

  return regexpExec.call(R, S);
};

/***/ }),

/***/ "../../node_modules/core-js/internals/regexp-exec.js":
/*!*********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/regexp-exec.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var regexpFlags = __webpack_require__(/*! ./regexp-flags */ "../../node_modules/core-js/internals/regexp-flags.js");

var nativeExec = RegExp.prototype.exec; // This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.

var nativeReplace = String.prototype.replace;
var patchedExec = nativeExec;

var UPDATES_LAST_INDEX_WRONG = function () {
  var re1 = /a/;
  var re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
}(); // nonparticipating capturing group, copied from es5-shim's String#split patch.


var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;
var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

if (PATCH) {
  patchedExec = function () {
    function exec(str) {
      var re = this;
      var lastIndex, reCopy, match, i;

      if (NPCG_INCLUDED) {
        reCopy = new RegExp('^' + re.source + '$(?!\\s)', regexpFlags.call(re));
      }

      if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;
      match = nativeExec.call(re, str);

      if (UPDATES_LAST_INDEX_WRONG && match) {
        re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
      }

      if (NPCG_INCLUDED && match && match.length > 1) {
        // Fix browsers whose `exec` methods don't consistently return `undefined`
        // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
        nativeReplace.call(match[0], reCopy, function () {
          for (i = 1; i < arguments.length - 2; i++) {
            if (arguments[i] === undefined) match[i] = undefined;
          }
        });
      }

      return match;
    }

    return exec;
  }();
}

module.exports = patchedExec;

/***/ }),

/***/ "../../node_modules/core-js/internals/regexp-flags.js":
/*!**********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/regexp-flags.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__(/*! ../internals/an-object */ "../../node_modules/core-js/internals/an-object.js"); // `RegExp.prototype.flags` getter implementation
// https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags


module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};

/***/ }),

/***/ "../../node_modules/core-js/internals/require-object-coercible.js":
/*!**********************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/require-object-coercible.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// `RequireObjectCoercible` abstract operation
// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};

/***/ }),

/***/ "../../node_modules/core-js/internals/same-value.js":
/*!********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/same-value.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// `SameValue` abstract operation
// https://tc39.github.io/ecma262/#sec-samevalue
module.exports = Object.is || function () {
  function is(x, y) {
    // eslint-disable-next-line no-self-compare
    return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
  }

  return is;
}();

/***/ }),

/***/ "../../node_modules/core-js/internals/set-global.js":
/*!********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/set-global.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");

var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "../../node_modules/core-js/internals/create-non-enumerable-property.js");

module.exports = function (key, value) {
  try {
    createNonEnumerableProperty(global, key, value);
  } catch (error) {
    global[key] = value;
  }

  return value;
};

/***/ }),

/***/ "../../node_modules/core-js/internals/set-species.js":
/*!*********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/set-species.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "../../node_modules/core-js/internals/get-built-in.js");

var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "../../node_modules/core-js/internals/object-define-property.js");

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../node_modules/core-js/internals/well-known-symbol.js");

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../node_modules/core-js/internals/descriptors.js");

var SPECIES = wellKnownSymbol('species');

module.exports = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
  var defineProperty = definePropertyModule.f;

  if (DESCRIPTORS && Constructor && !Constructor[SPECIES]) {
    defineProperty(Constructor, SPECIES, {
      configurable: true,
      get: function () {
        function get() {
          return this;
        }

        return get;
      }()
    });
  }
};

/***/ }),

/***/ "../../node_modules/core-js/internals/set-to-string-tag.js":
/*!***************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/set-to-string-tag.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defineProperty = __webpack_require__(/*! ../internals/object-define-property */ "../../node_modules/core-js/internals/object-define-property.js").f;

var has = __webpack_require__(/*! ../internals/has */ "../../node_modules/core-js/internals/has.js");

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../node_modules/core-js/internals/well-known-symbol.js");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

module.exports = function (it, TAG, STATIC) {
  if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
    defineProperty(it, TO_STRING_TAG, {
      configurable: true,
      value: TAG
    });
  }
};

/***/ }),

/***/ "../../node_modules/core-js/internals/shared-key.js":
/*!********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/shared-key.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var shared = __webpack_require__(/*! ../internals/shared */ "../../node_modules/core-js/internals/shared.js");

var uid = __webpack_require__(/*! ../internals/uid */ "../../node_modules/core-js/internals/uid.js");

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};

/***/ }),

/***/ "../../node_modules/core-js/internals/shared-store.js":
/*!**********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/shared-store.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");

var setGlobal = __webpack_require__(/*! ../internals/set-global */ "../../node_modules/core-js/internals/set-global.js");

var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});
module.exports = store;

/***/ }),

/***/ "../../node_modules/core-js/internals/shared.js":
/*!****************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/shared.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "../../node_modules/core-js/internals/is-pure.js");

var store = __webpack_require__(/*! ../internals/shared-store */ "../../node_modules/core-js/internals/shared-store.js");

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.3.2',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});

/***/ }),

/***/ "../../node_modules/core-js/internals/sloppy-array-method.js":
/*!*****************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/sloppy-array-method.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");

module.exports = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !method || !fails(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal
    method.call(null, argument || function () {
      throw 1;
    }, 1);
  });
};

/***/ }),

/***/ "../../node_modules/core-js/internals/species-constructor.js":
/*!*****************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/species-constructor.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__(/*! ../internals/an-object */ "../../node_modules/core-js/internals/an-object.js");

var aFunction = __webpack_require__(/*! ../internals/a-function */ "../../node_modules/core-js/internals/a-function.js");

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../node_modules/core-js/internals/well-known-symbol.js");

var SPECIES = wellKnownSymbol('species'); // `SpeciesConstructor` abstract operation
// https://tc39.github.io/ecma262/#sec-speciesconstructor

module.exports = function (O, defaultConstructor) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? defaultConstructor : aFunction(S);
};

/***/ }),

/***/ "../../node_modules/core-js/internals/string-multibyte.js":
/*!**************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/string-multibyte.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toInteger = __webpack_require__(/*! ../internals/to-integer */ "../../node_modules/core-js/internals/to-integer.js");

var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "../../node_modules/core-js/internals/require-object-coercible.js"); // `String.prototype.{ codePointAt, at }` methods implementation


var createMethod = function createMethod(CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = String(requireObjectCoercible($this));
    var position = toInteger(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = S.charCodeAt(position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF ? CONVERT_TO_STRING ? S.charAt(position) : first : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

module.exports = {
  // `String.prototype.codePointAt` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod(true)
};

/***/ }),

/***/ "../../node_modules/core-js/internals/string-pad.js":
/*!********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/string-pad.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://github.com/tc39/proposal-string-pad-start-end
var toLength = __webpack_require__(/*! ../internals/to-length */ "../../node_modules/core-js/internals/to-length.js");

var repeat = __webpack_require__(/*! ../internals/string-repeat */ "../../node_modules/core-js/internals/string-repeat.js");

var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "../../node_modules/core-js/internals/require-object-coercible.js");

var ceil = Math.ceil; // `String.prototype.{ padStart, padEnd }` methods implementation

var createMethod = function createMethod(IS_END) {
  return function ($this, maxLength, fillString) {
    var S = String(requireObjectCoercible($this));
    var stringLength = S.length;
    var fillStr = fillString === undefined ? ' ' : String(fillString);
    var intMaxLength = toLength(maxLength);
    var fillLen, stringFiller;
    if (intMaxLength <= stringLength || fillStr == '') return S;
    fillLen = intMaxLength - stringLength;
    stringFiller = repeat.call(fillStr, ceil(fillLen / fillStr.length));
    if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
    return IS_END ? S + stringFiller : stringFiller + S;
  };
};

module.exports = {
  // `String.prototype.padStart` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.padstart
  start: createMethod(false),
  // `String.prototype.padEnd` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.padend
  end: createMethod(true)
};

/***/ }),

/***/ "../../node_modules/core-js/internals/string-repeat.js":
/*!***********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/string-repeat.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toInteger = __webpack_require__(/*! ../internals/to-integer */ "../../node_modules/core-js/internals/to-integer.js");

var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "../../node_modules/core-js/internals/require-object-coercible.js"); // `String.prototype.repeat` method implementation
// https://tc39.github.io/ecma262/#sec-string.prototype.repeat


module.exports = ''.repeat || function () {
  function repeat(count) {
    var str = String(requireObjectCoercible(this));
    var result = '';
    var n = toInteger(count);
    if (n < 0 || n == Infinity) throw RangeError('Wrong number of repetitions');

    for (; n > 0; (n >>>= 1) && (str += str)) {
      if (n & 1) result += str;
    }

    return result;
  }

  return repeat;
}();

/***/ }),

/***/ "../../node_modules/core-js/internals/string-trim.js":
/*!*********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/string-trim.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "../../node_modules/core-js/internals/require-object-coercible.js");

var whitespaces = __webpack_require__(/*! ../internals/whitespaces */ "../../node_modules/core-js/internals/whitespaces.js");

var whitespace = '[' + whitespaces + ']';
var ltrim = RegExp('^' + whitespace + whitespace + '*');
var rtrim = RegExp(whitespace + whitespace + '*$'); // `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation

var createMethod = function createMethod(TYPE) {
  return function ($this) {
    var string = String(requireObjectCoercible($this));
    if (TYPE & 1) string = string.replace(ltrim, '');
    if (TYPE & 2) string = string.replace(rtrim, '');
    return string;
  };
};

module.exports = {
  // `String.prototype.{ trimLeft, trimStart }` methods
  // https://tc39.github.io/ecma262/#sec-string.prototype.trimstart
  start: createMethod(1),
  // `String.prototype.{ trimRight, trimEnd }` methods
  // https://tc39.github.io/ecma262/#sec-string.prototype.trimend
  end: createMethod(2),
  // `String.prototype.trim` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.trim
  trim: createMethod(3)
};

/***/ }),

/***/ "../../node_modules/core-js/internals/task.js":
/*!**************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/task.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");

var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");

var classof = __webpack_require__(/*! ../internals/classof-raw */ "../../node_modules/core-js/internals/classof-raw.js");

var bind = __webpack_require__(/*! ../internals/bind-context */ "../../node_modules/core-js/internals/bind-context.js");

var html = __webpack_require__(/*! ../internals/html */ "../../node_modules/core-js/internals/html.js");

var createElement = __webpack_require__(/*! ../internals/document-create-element */ "../../node_modules/core-js/internals/document-create-element.js");

var userAgent = __webpack_require__(/*! ../internals/user-agent */ "../../node_modules/core-js/internals/user-agent.js");

var location = global.location;
var set = global.setImmediate;
var clear = global.clearImmediate;
var process = global.process;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;

var run = function run(id) {
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};

var runner = function runner(id) {
  return function () {
    run(id);
  };
};

var listener = function listener(event) {
  run(event.data);
};

var post = function post(id) {
  // old engines have not location.origin
  global.postMessage(id + '', location.protocol + '//' + location.host);
}; // Node.js 0.9+ & IE10+ has setImmediate, otherwise:


if (!set || !clear) {
  set = function () {
    function setImmediate(fn) {
      var args = [];
      var i = 1;

      while (arguments.length > i) {
        args.push(arguments[i++]);
      }

      queue[++counter] = function () {
        // eslint-disable-next-line no-new-func
        (typeof fn == 'function' ? fn : Function(fn)).apply(undefined, args);
      };

      defer(counter);
      return counter;
    }

    return setImmediate;
  }();

  clear = function () {
    function clearImmediate(id) {
      delete queue[id];
    }

    return clearImmediate;
  }(); // Node.js 0.8-


  if (classof(process) == 'process') {
    defer = function defer(id) {
      process.nextTick(runner(id));
    }; // Sphere (JS game engine) Dispatch API

  } else if (Dispatch && Dispatch.now) {
    defer = function defer(id) {
      Dispatch.now(runner(id));
    }; // Browsers with MessageChannel, includes WebWorkers
    // except iOS - https://github.com/zloirock/core-js/issues/624

  } else if (MessageChannel && !/(iphone|ipod|ipad).*applewebkit/i.test(userAgent)) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = bind(port.postMessage, port, 1); // Browsers with postMessage, skip WebWorkers
    // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts && !fails(post)) {
    defer = post;
    global.addEventListener('message', listener, false); // IE8-
  } else if (ONREADYSTATECHANGE in createElement('script')) {
    defer = function defer(id) {
      html.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run(id);
      };
    }; // Rest old browsers

  } else {
    defer = function defer(id) {
      setTimeout(runner(id), 0);
    };
  }
}

module.exports = {
  set: set,
  clear: clear
};

/***/ }),

/***/ "../../node_modules/core-js/internals/this-number-value.js":
/*!***************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/this-number-value.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var classof = __webpack_require__(/*! ../internals/classof-raw */ "../../node_modules/core-js/internals/classof-raw.js"); // `thisNumberValue` abstract operation
// https://tc39.github.io/ecma262/#sec-thisnumbervalue


module.exports = function (value) {
  if (typeof value != 'number' && classof(value) != 'Number') {
    throw TypeError('Incorrect invocation');
  }

  return +value;
};

/***/ }),

/***/ "../../node_modules/core-js/internals/to-absolute-index.js":
/*!***************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/to-absolute-index.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toInteger = __webpack_require__(/*! ../internals/to-integer */ "../../node_modules/core-js/internals/to-integer.js");

var max = Math.max;
var min = Math.min; // Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(length, length).

module.exports = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};

/***/ }),

/***/ "../../node_modules/core-js/internals/to-index.js":
/*!******************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/to-index.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toInteger = __webpack_require__(/*! ../internals/to-integer */ "../../node_modules/core-js/internals/to-integer.js");

var toLength = __webpack_require__(/*! ../internals/to-length */ "../../node_modules/core-js/internals/to-length.js"); // `ToIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-toindex


module.exports = function (it) {
  if (it === undefined) return 0;
  var number = toInteger(it);
  var length = toLength(number);
  if (number !== length) throw RangeError('Wrong length or index');
  return length;
};

/***/ }),

/***/ "../../node_modules/core-js/internals/to-indexed-object.js":
/*!***************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/to-indexed-object.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(/*! ../internals/indexed-object */ "../../node_modules/core-js/internals/indexed-object.js");

var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "../../node_modules/core-js/internals/require-object-coercible.js");

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};

/***/ }),

/***/ "../../node_modules/core-js/internals/to-integer.js":
/*!********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/to-integer.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ceil = Math.ceil;
var floor = Math.floor; // `ToInteger` abstract operation
// https://tc39.github.io/ecma262/#sec-tointeger

module.exports = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};

/***/ }),

/***/ "../../node_modules/core-js/internals/to-length.js":
/*!*******************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/to-length.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toInteger = __webpack_require__(/*! ../internals/to-integer */ "../../node_modules/core-js/internals/to-integer.js");

var min = Math.min; // `ToLength` abstract operation
// https://tc39.github.io/ecma262/#sec-tolength

module.exports = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

/***/ }),

/***/ "../../node_modules/core-js/internals/to-object.js":
/*!*******************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/to-object.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "../../node_modules/core-js/internals/require-object-coercible.js"); // `ToObject` abstract operation
// https://tc39.github.io/ecma262/#sec-toobject


module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};

/***/ }),

/***/ "../../node_modules/core-js/internals/to-offset.js":
/*!*******************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/to-offset.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toPositiveInteger = __webpack_require__(/*! ../internals/to-positive-integer */ "../../node_modules/core-js/internals/to-positive-integer.js");

module.exports = function (it, BYTES) {
  var offset = toPositiveInteger(it);
  if (offset % BYTES) throw RangeError('Wrong offset');
  return offset;
};

/***/ }),

/***/ "../../node_modules/core-js/internals/to-positive-integer.js":
/*!*****************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/to-positive-integer.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toInteger = __webpack_require__(/*! ../internals/to-integer */ "../../node_modules/core-js/internals/to-integer.js");

module.exports = function (it) {
  var result = toInteger(it);
  if (result < 0) throw RangeError("The argument can't be less than 0");
  return result;
};

/***/ }),

/***/ "../../node_modules/core-js/internals/to-primitive.js":
/*!**********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/to-primitive.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isObject = __webpack_require__(/*! ../internals/is-object */ "../../node_modules/core-js/internals/is-object.js"); // `ToPrimitive` abstract operation
// https://tc39.github.io/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string


module.exports = function (input, PREFERRED_STRING) {
  if (!isObject(input)) return input;
  var fn, val;
  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ }),

/***/ "../../node_modules/core-js/internals/typed-array-constructor.js":
/*!*********************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/typed-array-constructor.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../node_modules/core-js/internals/descriptors.js");

var TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS = __webpack_require__(/*! ../internals/typed-arrays-constructors-requires-wrappers */ "../../node_modules/core-js/internals/typed-arrays-constructors-requires-wrappers.js");

var ArrayBufferViewCore = __webpack_require__(/*! ../internals/array-buffer-view-core */ "../../node_modules/core-js/internals/array-buffer-view-core.js");

var ArrayBufferModule = __webpack_require__(/*! ../internals/array-buffer */ "../../node_modules/core-js/internals/array-buffer.js");

var anInstance = __webpack_require__(/*! ../internals/an-instance */ "../../node_modules/core-js/internals/an-instance.js");

var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "../../node_modules/core-js/internals/create-property-descriptor.js");

var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "../../node_modules/core-js/internals/create-non-enumerable-property.js");

var toLength = __webpack_require__(/*! ../internals/to-length */ "../../node_modules/core-js/internals/to-length.js");

var toIndex = __webpack_require__(/*! ../internals/to-index */ "../../node_modules/core-js/internals/to-index.js");

var toOffset = __webpack_require__(/*! ../internals/to-offset */ "../../node_modules/core-js/internals/to-offset.js");

var toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ "../../node_modules/core-js/internals/to-primitive.js");

var has = __webpack_require__(/*! ../internals/has */ "../../node_modules/core-js/internals/has.js");

var classof = __webpack_require__(/*! ../internals/classof */ "../../node_modules/core-js/internals/classof.js");

var isObject = __webpack_require__(/*! ../internals/is-object */ "../../node_modules/core-js/internals/is-object.js");

var create = __webpack_require__(/*! ../internals/object-create */ "../../node_modules/core-js/internals/object-create.js");

var setPrototypeOf = __webpack_require__(/*! ../internals/object-set-prototype-of */ "../../node_modules/core-js/internals/object-set-prototype-of.js");

var getOwnPropertyNames = __webpack_require__(/*! ../internals/object-get-own-property-names */ "../../node_modules/core-js/internals/object-get-own-property-names.js").f;

var typedArrayFrom = __webpack_require__(/*! ../internals/typed-array-from */ "../../node_modules/core-js/internals/typed-array-from.js");

var forEach = __webpack_require__(/*! ../internals/array-iteration */ "../../node_modules/core-js/internals/array-iteration.js").forEach;

var setSpecies = __webpack_require__(/*! ../internals/set-species */ "../../node_modules/core-js/internals/set-species.js");

var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "../../node_modules/core-js/internals/object-define-property.js");

var getOwnPropertyDescriptorModule = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "../../node_modules/core-js/internals/object-get-own-property-descriptor.js");

var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "../../node_modules/core-js/internals/internal-state.js");

var getInternalState = InternalStateModule.get;
var setInternalState = InternalStateModule.set;
var nativeDefineProperty = definePropertyModule.f;
var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
var round = Math.round;
var RangeError = global.RangeError;
var ArrayBuffer = ArrayBufferModule.ArrayBuffer;
var DataView = ArrayBufferModule.DataView;
var NATIVE_ARRAY_BUFFER_VIEWS = ArrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS;
var TYPED_ARRAY_TAG = ArrayBufferViewCore.TYPED_ARRAY_TAG;
var TypedArray = ArrayBufferViewCore.TypedArray;
var TypedArrayPrototype = ArrayBufferViewCore.TypedArrayPrototype;
var aTypedArrayConstructor = ArrayBufferViewCore.aTypedArrayConstructor;
var isTypedArray = ArrayBufferViewCore.isTypedArray;
var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
var WRONG_LENGTH = 'Wrong length';

var fromList = function fromList(C, list) {
  var index = 0;
  var length = list.length;
  var result = new (aTypedArrayConstructor(C))(length);

  while (length > index) {
    result[index] = list[index++];
  }

  return result;
};

var addGetter = function addGetter(it, key) {
  nativeDefineProperty(it, key, {
    get: function () {
      function get() {
        return getInternalState(this)[key];
      }

      return get;
    }()
  });
};

var isArrayBuffer = function isArrayBuffer(it) {
  var klass;
  return it instanceof ArrayBuffer || (klass = classof(it)) == 'ArrayBuffer' || klass == 'SharedArrayBuffer';
};

var isTypedArrayIndex = function isTypedArrayIndex(target, key) {
  return isTypedArray(target) && typeof key != 'symbol' && key in target && String(+key) == String(key);
};

var wrappedGetOwnPropertyDescriptor = function () {
  function getOwnPropertyDescriptor(target, key) {
    return isTypedArrayIndex(target, key = toPrimitive(key, true)) ? createPropertyDescriptor(2, target[key]) : nativeGetOwnPropertyDescriptor(target, key);
  }

  return getOwnPropertyDescriptor;
}();

var wrappedDefineProperty = function () {
  function defineProperty(target, key, descriptor) {
    if (isTypedArrayIndex(target, key = toPrimitive(key, true)) && isObject(descriptor) && has(descriptor, 'value') && !has(descriptor, 'get') && !has(descriptor, 'set') // TODO: add validation descriptor w/o calling accessors
    && !descriptor.configurable && (!has(descriptor, 'writable') || descriptor.writable) && (!has(descriptor, 'enumerable') || descriptor.enumerable)) {
      target[key] = descriptor.value;
      return target;
    }

    return nativeDefineProperty(target, key, descriptor);
  }

  return defineProperty;
}();

if (DESCRIPTORS) {
  if (!NATIVE_ARRAY_BUFFER_VIEWS) {
    getOwnPropertyDescriptorModule.f = wrappedGetOwnPropertyDescriptor;
    definePropertyModule.f = wrappedDefineProperty;
    addGetter(TypedArrayPrototype, 'buffer');
    addGetter(TypedArrayPrototype, 'byteOffset');
    addGetter(TypedArrayPrototype, 'byteLength');
    addGetter(TypedArrayPrototype, 'length');
  }

  $({
    target: 'Object',
    stat: true,
    forced: !NATIVE_ARRAY_BUFFER_VIEWS
  }, {
    getOwnPropertyDescriptor: wrappedGetOwnPropertyDescriptor,
    defineProperty: wrappedDefineProperty
  });

  module.exports = function (TYPE, BYTES, wrapper, CLAMPED) {
    var CONSTRUCTOR_NAME = TYPE + (CLAMPED ? 'Clamped' : '') + 'Array';
    var GETTER = 'get' + TYPE;
    var SETTER = 'set' + TYPE;
    var NativeTypedArrayConstructor = global[CONSTRUCTOR_NAME];
    var TypedArrayConstructor = NativeTypedArrayConstructor;
    var TypedArrayConstructorPrototype = TypedArrayConstructor && TypedArrayConstructor.prototype;
    var exported = {};

    var getter = function getter(that, index) {
      var data = getInternalState(that);
      return data.view[GETTER](index * BYTES + data.byteOffset, true);
    };

    var setter = function setter(that, index, value) {
      var data = getInternalState(that);
      if (CLAMPED) value = (value = round(value)) < 0 ? 0 : value > 0xFF ? 0xFF : value & 0xFF;
      data.view[SETTER](index * BYTES + data.byteOffset, value, true);
    };

    var addElement = function addElement(that, index) {
      nativeDefineProperty(that, index, {
        get: function () {
          function get() {
            return getter(this, index);
          }

          return get;
        }(),
        set: function () {
          function set(value) {
            return setter(this, index, value);
          }

          return set;
        }(),
        enumerable: true
      });
    };

    if (!NATIVE_ARRAY_BUFFER_VIEWS) {
      TypedArrayConstructor = wrapper(function (that, data, offset, $length) {
        anInstance(that, TypedArrayConstructor, CONSTRUCTOR_NAME);
        var index = 0;
        var byteOffset = 0;
        var buffer, byteLength, length;

        if (!isObject(data)) {
          length = toIndex(data);
          byteLength = length * BYTES;
          buffer = new ArrayBuffer(byteLength);
        } else if (isArrayBuffer(data)) {
          buffer = data;
          byteOffset = toOffset(offset, BYTES);
          var $len = data.byteLength;

          if ($length === undefined) {
            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
            byteLength = $len - byteOffset;
            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if (byteLength + byteOffset > $len) throw RangeError(WRONG_LENGTH);
          }

          length = byteLength / BYTES;
        } else if (isTypedArray(data)) {
          return fromList(TypedArrayConstructor, data);
        } else {
          return typedArrayFrom.call(TypedArrayConstructor, data);
        }

        setInternalState(that, {
          buffer: buffer,
          byteOffset: byteOffset,
          byteLength: byteLength,
          length: length,
          view: new DataView(buffer)
        });

        while (index < length) {
          addElement(that, index++);
        }
      });
      if (setPrototypeOf) setPrototypeOf(TypedArrayConstructor, TypedArray);
      TypedArrayConstructorPrototype = TypedArrayConstructor.prototype = create(TypedArrayPrototype);
    } else if (TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS) {
      TypedArrayConstructor = wrapper(function (dummy, data, typedArrayOffset, $length) {
        anInstance(dummy, TypedArrayConstructor, CONSTRUCTOR_NAME);
        if (!isObject(data)) return new NativeTypedArrayConstructor(toIndex(data));
        if (isArrayBuffer(data)) return $length !== undefined ? new NativeTypedArrayConstructor(data, toOffset(typedArrayOffset, BYTES), $length) : typedArrayOffset !== undefined ? new NativeTypedArrayConstructor(data, toOffset(typedArrayOffset, BYTES)) : new NativeTypedArrayConstructor(data);
        if (isTypedArray(data)) return fromList(TypedArrayConstructor, data);
        return typedArrayFrom.call(TypedArrayConstructor, data);
      });
      if (setPrototypeOf) setPrototypeOf(TypedArrayConstructor, TypedArray);
      forEach(getOwnPropertyNames(NativeTypedArrayConstructor), function (key) {
        if (!(key in TypedArrayConstructor)) {
          createNonEnumerableProperty(TypedArrayConstructor, key, NativeTypedArrayConstructor[key]);
        }
      });
      TypedArrayConstructor.prototype = TypedArrayConstructorPrototype;
    }

    if (TypedArrayConstructorPrototype.constructor !== TypedArrayConstructor) {
      createNonEnumerableProperty(TypedArrayConstructorPrototype, 'constructor', TypedArrayConstructor);
    }

    if (TYPED_ARRAY_TAG) {
      createNonEnumerableProperty(TypedArrayConstructorPrototype, TYPED_ARRAY_TAG, CONSTRUCTOR_NAME);
    }

    exported[CONSTRUCTOR_NAME] = TypedArrayConstructor;
    $({
      global: true,
      forced: TypedArrayConstructor != NativeTypedArrayConstructor,
      sham: !NATIVE_ARRAY_BUFFER_VIEWS
    }, exported);

    if (!(BYTES_PER_ELEMENT in TypedArrayConstructor)) {
      createNonEnumerableProperty(TypedArrayConstructor, BYTES_PER_ELEMENT, BYTES);
    }

    if (!(BYTES_PER_ELEMENT in TypedArrayConstructorPrototype)) {
      createNonEnumerableProperty(TypedArrayConstructorPrototype, BYTES_PER_ELEMENT, BYTES);
    }

    setSpecies(CONSTRUCTOR_NAME);
  };
} else module.exports = function () {
  /* empty */
};

/***/ }),

/***/ "../../node_modules/core-js/internals/typed-array-from.js":
/*!**************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/typed-array-from.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toObject = __webpack_require__(/*! ../internals/to-object */ "../../node_modules/core-js/internals/to-object.js");

var toLength = __webpack_require__(/*! ../internals/to-length */ "../../node_modules/core-js/internals/to-length.js");

var getIteratorMethod = __webpack_require__(/*! ../internals/get-iterator-method */ "../../node_modules/core-js/internals/get-iterator-method.js");

var isArrayIteratorMethod = __webpack_require__(/*! ../internals/is-array-iterator-method */ "../../node_modules/core-js/internals/is-array-iterator-method.js");

var bind = __webpack_require__(/*! ../internals/bind-context */ "../../node_modules/core-js/internals/bind-context.js");

var aTypedArrayConstructor = __webpack_require__(/*! ../internals/array-buffer-view-core */ "../../node_modules/core-js/internals/array-buffer-view-core.js").aTypedArrayConstructor;

module.exports = function () {
  function from(source
  /* , mapfn, thisArg */
  ) {
    var O = toObject(source);
    var argumentsLength = arguments.length;
    var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var iteratorMethod = getIteratorMethod(O);
    var i, length, result, step, iterator, next;

    if (iteratorMethod != undefined && !isArrayIteratorMethod(iteratorMethod)) {
      iterator = iteratorMethod.call(O);
      next = iterator.next;
      O = [];

      while (!(step = next.call(iterator)).done) {
        O.push(step.value);
      }
    }

    if (mapping && argumentsLength > 2) {
      mapfn = bind(mapfn, arguments[2], 2);
    }

    length = toLength(O.length);
    result = new (aTypedArrayConstructor(this))(length);

    for (i = 0; length > i; i++) {
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }

    return result;
  }

  return from;
}();

/***/ }),

/***/ "../../node_modules/core-js/internals/typed-arrays-constructors-requires-wrappers.js":
/*!*****************************************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/typed-arrays-constructors-requires-wrappers.js ***!
  \*****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* eslint-disable no-new */
var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");

var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");

var checkCorrectnessOfIteration = __webpack_require__(/*! ../internals/check-correctness-of-iteration */ "../../node_modules/core-js/internals/check-correctness-of-iteration.js");

var NATIVE_ARRAY_BUFFER_VIEWS = __webpack_require__(/*! ../internals/array-buffer-view-core */ "../../node_modules/core-js/internals/array-buffer-view-core.js").NATIVE_ARRAY_BUFFER_VIEWS;

var ArrayBuffer = global.ArrayBuffer;
var Int8Array = global.Int8Array;
module.exports = !NATIVE_ARRAY_BUFFER_VIEWS || !fails(function () {
  Int8Array(1);
}) || !fails(function () {
  new Int8Array(-1);
}) || !checkCorrectnessOfIteration(function (iterable) {
  new Int8Array();
  new Int8Array(null);
  new Int8Array(1.5);
  new Int8Array(iterable);
}, true) || fails(function () {
  // Safari 11 bug
  return new Int8Array(new ArrayBuffer(2), 1, undefined).length !== 1;
});

/***/ }),

/***/ "../../node_modules/core-js/internals/uid.js":
/*!*************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/uid.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var id = 0;
var postfix = Math.random();

module.exports = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};

/***/ }),

/***/ "../../node_modules/core-js/internals/user-agent.js":
/*!********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/user-agent.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "../../node_modules/core-js/internals/get-built-in.js");

module.exports = getBuiltIn('navigator', 'userAgent') || '';

/***/ }),

/***/ "../../node_modules/core-js/internals/webkit-string-pad-bug.js":
/*!*******************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/webkit-string-pad-bug.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://github.com/zloirock/core-js/issues/280
var userAgent = __webpack_require__(/*! ../internals/user-agent */ "../../node_modules/core-js/internals/user-agent.js"); // eslint-disable-next-line unicorn/no-unsafe-regex


module.exports = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(userAgent);

/***/ }),

/***/ "../../node_modules/core-js/internals/well-known-symbol.js":
/*!***************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/well-known-symbol.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");

var shared = __webpack_require__(/*! ../internals/shared */ "../../node_modules/core-js/internals/shared.js");

var uid = __webpack_require__(/*! ../internals/uid */ "../../node_modules/core-js/internals/uid.js");

var NATIVE_SYMBOL = __webpack_require__(/*! ../internals/native-symbol */ "../../node_modules/core-js/internals/native-symbol.js");

var Symbol = global.Symbol;
var store = shared('wks');

module.exports = function (name) {
  return store[name] || (store[name] = NATIVE_SYMBOL && Symbol[name] || (NATIVE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

/***/ }),

/***/ "../../node_modules/core-js/internals/whitespaces.js":
/*!*********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/whitespaces.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// a string of all valid unicode whitespaces
// eslint-disable-next-line max-len
module.exports = "\t\n\x0B\f\r \xA0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF";

/***/ }),

/***/ "../../node_modules/core-js/internals/wrapped-well-known-symbol.js":
/*!***********************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/internals/wrapped-well-known-symbol.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.f = __webpack_require__(/*! ../internals/well-known-symbol */ "../../node_modules/core-js/internals/well-known-symbol.js");

/***/ }),

/***/ "../../node_modules/core-js/modules/es.array-buffer.constructor.js":
/*!***********************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.array-buffer.constructor.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");

var arrayBufferModule = __webpack_require__(/*! ../internals/array-buffer */ "../../node_modules/core-js/internals/array-buffer.js");

var setSpecies = __webpack_require__(/*! ../internals/set-species */ "../../node_modules/core-js/internals/set-species.js");

var ARRAY_BUFFER = 'ArrayBuffer';
var ArrayBuffer = arrayBufferModule[ARRAY_BUFFER];
var NativeArrayBuffer = global[ARRAY_BUFFER]; // `ArrayBuffer` constructor
// https://tc39.github.io/ecma262/#sec-arraybuffer-constructor

$({
  global: true,
  forced: NativeArrayBuffer !== ArrayBuffer
}, {
  ArrayBuffer: ArrayBuffer
});
setSpecies(ARRAY_BUFFER);

/***/ }),

/***/ "../../node_modules/core-js/modules/es.array-buffer.is-view.js":
/*!*******************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.array-buffer.is-view.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var ArrayBufferViewCore = __webpack_require__(/*! ../internals/array-buffer-view-core */ "../../node_modules/core-js/internals/array-buffer-view-core.js");

var NATIVE_ARRAY_BUFFER_VIEWS = ArrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS; // `ArrayBuffer.isView` method
// https://tc39.github.io/ecma262/#sec-arraybuffer.isview

$({
  target: 'ArrayBuffer',
  stat: true,
  forced: !NATIVE_ARRAY_BUFFER_VIEWS
}, {
  isView: ArrayBufferViewCore.isView
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.array-buffer.slice.js":
/*!*****************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.array-buffer.slice.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");

var ArrayBufferModule = __webpack_require__(/*! ../internals/array-buffer */ "../../node_modules/core-js/internals/array-buffer.js");

var anObject = __webpack_require__(/*! ../internals/an-object */ "../../node_modules/core-js/internals/an-object.js");

var toAbsoluteIndex = __webpack_require__(/*! ../internals/to-absolute-index */ "../../node_modules/core-js/internals/to-absolute-index.js");

var toLength = __webpack_require__(/*! ../internals/to-length */ "../../node_modules/core-js/internals/to-length.js");

var speciesConstructor = __webpack_require__(/*! ../internals/species-constructor */ "../../node_modules/core-js/internals/species-constructor.js");

var ArrayBuffer = ArrayBufferModule.ArrayBuffer;
var DataView = ArrayBufferModule.DataView;
var nativeArrayBufferSlice = ArrayBuffer.prototype.slice;
var INCORRECT_SLICE = fails(function () {
  return !new ArrayBuffer(2).slice(1, undefined).byteLength;
}); // `ArrayBuffer.prototype.slice` method
// https://tc39.github.io/ecma262/#sec-arraybuffer.prototype.slice

$({
  target: 'ArrayBuffer',
  proto: true,
  unsafe: true,
  forced: INCORRECT_SLICE
}, {
  slice: function () {
    function slice(start, end) {
      if (nativeArrayBufferSlice !== undefined && end === undefined) {
        return nativeArrayBufferSlice.call(anObject(this), start); // FF fix
      }

      var length = anObject(this).byteLength;
      var first = toAbsoluteIndex(start, length);
      var fin = toAbsoluteIndex(end === undefined ? length : end, length);
      var result = new (speciesConstructor(this, ArrayBuffer))(toLength(fin - first));
      var viewSource = new DataView(this);
      var viewTarget = new DataView(result);
      var index = 0;

      while (first < fin) {
        viewTarget.setUint8(index++, viewSource.getUint8(first++));
      }

      return result;
    }

    return slice;
  }()
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.array.concat.js":
/*!***********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.array.concat.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");

var isArray = __webpack_require__(/*! ../internals/is-array */ "../../node_modules/core-js/internals/is-array.js");

var isObject = __webpack_require__(/*! ../internals/is-object */ "../../node_modules/core-js/internals/is-object.js");

var toObject = __webpack_require__(/*! ../internals/to-object */ "../../node_modules/core-js/internals/to-object.js");

var toLength = __webpack_require__(/*! ../internals/to-length */ "../../node_modules/core-js/internals/to-length.js");

var createProperty = __webpack_require__(/*! ../internals/create-property */ "../../node_modules/core-js/internals/create-property.js");

var arraySpeciesCreate = __webpack_require__(/*! ../internals/array-species-create */ "../../node_modules/core-js/internals/array-species-create.js");

var arrayMethodHasSpeciesSupport = __webpack_require__(/*! ../internals/array-method-has-species-support */ "../../node_modules/core-js/internals/array-method-has-species-support.js");

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../node_modules/core-js/internals/well-known-symbol.js");

var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';
var IS_CONCAT_SPREADABLE_SUPPORT = !fails(function () {
  var array = [];
  array[IS_CONCAT_SPREADABLE] = false;
  return array.concat()[0] !== array;
});
var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

var isConcatSpreadable = function isConcatSpreadable(O) {
  if (!isObject(O)) return false;
  var spreadable = O[IS_CONCAT_SPREADABLE];
  return spreadable !== undefined ? !!spreadable : isArray(O);
};

var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT; // `Array.prototype.concat` method
// https://tc39.github.io/ecma262/#sec-array.prototype.concat
// with adding support of @@isConcatSpreadable and @@species

$({
  target: 'Array',
  proto: true,
  forced: FORCED
}, {
  concat: function () {
    function concat(arg) {
      // eslint-disable-line no-unused-vars
      var O = toObject(this);
      var A = arraySpeciesCreate(O, 0);
      var n = 0;
      var i, k, length, len, E;

      for (i = -1, length = arguments.length; i < length; i++) {
        E = i === -1 ? O : arguments[i];

        if (isConcatSpreadable(E)) {
          len = toLength(E.length);
          if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);

          for (k = 0; k < len; k++, n++) {
            if (k in E) createProperty(A, n, E[k]);
          }
        } else {
          if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
          createProperty(A, n++, E);
        }
      }

      A.length = n;
      return A;
    }

    return concat;
  }()
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.array.copy-within.js":
/*!****************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.array.copy-within.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var copyWithin = __webpack_require__(/*! ../internals/array-copy-within */ "../../node_modules/core-js/internals/array-copy-within.js");

var addToUnscopables = __webpack_require__(/*! ../internals/add-to-unscopables */ "../../node_modules/core-js/internals/add-to-unscopables.js"); // `Array.prototype.copyWithin` method
// https://tc39.github.io/ecma262/#sec-array.prototype.copywithin


$({
  target: 'Array',
  proto: true
}, {
  copyWithin: copyWithin
}); // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables

addToUnscopables('copyWithin');

/***/ }),

/***/ "../../node_modules/core-js/modules/es.array.every.js":
/*!**********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.array.every.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var $every = __webpack_require__(/*! ../internals/array-iteration */ "../../node_modules/core-js/internals/array-iteration.js").every;

var sloppyArrayMethod = __webpack_require__(/*! ../internals/sloppy-array-method */ "../../node_modules/core-js/internals/sloppy-array-method.js"); // `Array.prototype.every` method
// https://tc39.github.io/ecma262/#sec-array.prototype.every


$({
  target: 'Array',
  proto: true,
  forced: sloppyArrayMethod('every')
}, {
  every: function () {
    function every(callbackfn
    /* , thisArg */
    ) {
      return $every(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }

    return every;
  }()
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.array.fill.js":
/*!*********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.array.fill.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var fill = __webpack_require__(/*! ../internals/array-fill */ "../../node_modules/core-js/internals/array-fill.js");

var addToUnscopables = __webpack_require__(/*! ../internals/add-to-unscopables */ "../../node_modules/core-js/internals/add-to-unscopables.js"); // `Array.prototype.fill` method
// https://tc39.github.io/ecma262/#sec-array.prototype.fill


$({
  target: 'Array',
  proto: true
}, {
  fill: fill
}); // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables

addToUnscopables('fill');

/***/ }),

/***/ "../../node_modules/core-js/modules/es.array.filter.js":
/*!***********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.array.filter.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var $filter = __webpack_require__(/*! ../internals/array-iteration */ "../../node_modules/core-js/internals/array-iteration.js").filter;

var arrayMethodHasSpeciesSupport = __webpack_require__(/*! ../internals/array-method-has-species-support */ "../../node_modules/core-js/internals/array-method-has-species-support.js"); // `Array.prototype.filter` method
// https://tc39.github.io/ecma262/#sec-array.prototype.filter
// with adding support of @@species


$({
  target: 'Array',
  proto: true,
  forced: !arrayMethodHasSpeciesSupport('filter')
}, {
  filter: function () {
    function filter(callbackfn
    /* , thisArg */
    ) {
      return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }

    return filter;
  }()
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.array.find-index.js":
/*!***************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.array.find-index.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var $findIndex = __webpack_require__(/*! ../internals/array-iteration */ "../../node_modules/core-js/internals/array-iteration.js").findIndex;

var addToUnscopables = __webpack_require__(/*! ../internals/add-to-unscopables */ "../../node_modules/core-js/internals/add-to-unscopables.js");

var FIND_INDEX = 'findIndex';
var SKIPS_HOLES = true; // Shouldn't skip holes

if (FIND_INDEX in []) Array(1)[FIND_INDEX](function () {
  SKIPS_HOLES = false;
}); // `Array.prototype.findIndex` method
// https://tc39.github.io/ecma262/#sec-array.prototype.findindex

$({
  target: 'Array',
  proto: true,
  forced: SKIPS_HOLES
}, {
  findIndex: function () {
    function findIndex(callbackfn
    /* , that = undefined */
    ) {
      return $findIndex(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }

    return findIndex;
  }()
}); // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables

addToUnscopables(FIND_INDEX);

/***/ }),

/***/ "../../node_modules/core-js/modules/es.array.find.js":
/*!*********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.array.find.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var $find = __webpack_require__(/*! ../internals/array-iteration */ "../../node_modules/core-js/internals/array-iteration.js").find;

var addToUnscopables = __webpack_require__(/*! ../internals/add-to-unscopables */ "../../node_modules/core-js/internals/add-to-unscopables.js");

var FIND = 'find';
var SKIPS_HOLES = true; // Shouldn't skip holes

if (FIND in []) Array(1)[FIND](function () {
  SKIPS_HOLES = false;
}); // `Array.prototype.find` method
// https://tc39.github.io/ecma262/#sec-array.prototype.find

$({
  target: 'Array',
  proto: true,
  forced: SKIPS_HOLES
}, {
  find: function () {
    function find(callbackfn
    /* , that = undefined */
    ) {
      return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }

    return find;
  }()
}); // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables

addToUnscopables(FIND);

/***/ }),

/***/ "../../node_modules/core-js/modules/es.array.flat-map.js":
/*!*************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.array.flat-map.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var flattenIntoArray = __webpack_require__(/*! ../internals/flatten-into-array */ "../../node_modules/core-js/internals/flatten-into-array.js");

var toObject = __webpack_require__(/*! ../internals/to-object */ "../../node_modules/core-js/internals/to-object.js");

var toLength = __webpack_require__(/*! ../internals/to-length */ "../../node_modules/core-js/internals/to-length.js");

var aFunction = __webpack_require__(/*! ../internals/a-function */ "../../node_modules/core-js/internals/a-function.js");

var arraySpeciesCreate = __webpack_require__(/*! ../internals/array-species-create */ "../../node_modules/core-js/internals/array-species-create.js"); // `Array.prototype.flatMap` method
// https://github.com/tc39/proposal-flatMap


$({
  target: 'Array',
  proto: true
}, {
  flatMap: function () {
    function flatMap(callbackfn
    /* , thisArg */
    ) {
      var O = toObject(this);
      var sourceLen = toLength(O.length);
      var A;
      aFunction(callbackfn);
      A = arraySpeciesCreate(O, 0);
      A.length = flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
      return A;
    }

    return flatMap;
  }()
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.array.flat.js":
/*!*********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.array.flat.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var flattenIntoArray = __webpack_require__(/*! ../internals/flatten-into-array */ "../../node_modules/core-js/internals/flatten-into-array.js");

var toObject = __webpack_require__(/*! ../internals/to-object */ "../../node_modules/core-js/internals/to-object.js");

var toLength = __webpack_require__(/*! ../internals/to-length */ "../../node_modules/core-js/internals/to-length.js");

var toInteger = __webpack_require__(/*! ../internals/to-integer */ "../../node_modules/core-js/internals/to-integer.js");

var arraySpeciesCreate = __webpack_require__(/*! ../internals/array-species-create */ "../../node_modules/core-js/internals/array-species-create.js"); // `Array.prototype.flat` method
// https://github.com/tc39/proposal-flatMap


$({
  target: 'Array',
  proto: true
}, {
  flat: function () {
    function flat()
    /* depthArg = 1 */
    {
      var depthArg = arguments.length ? arguments[0] : undefined;
      var O = toObject(this);
      var sourceLen = toLength(O.length);
      var A = arraySpeciesCreate(O, 0);
      A.length = flattenIntoArray(A, O, O, sourceLen, 0, depthArg === undefined ? 1 : toInteger(depthArg));
      return A;
    }

    return flat;
  }()
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.array.for-each.js":
/*!*************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.array.for-each.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var forEach = __webpack_require__(/*! ../internals/array-for-each */ "../../node_modules/core-js/internals/array-for-each.js"); // `Array.prototype.forEach` method
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach


$({
  target: 'Array',
  proto: true,
  forced: [].forEach != forEach
}, {
  forEach: forEach
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.array.from.js":
/*!*********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.array.from.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var from = __webpack_require__(/*! ../internals/array-from */ "../../node_modules/core-js/internals/array-from.js");

var checkCorrectnessOfIteration = __webpack_require__(/*! ../internals/check-correctness-of-iteration */ "../../node_modules/core-js/internals/check-correctness-of-iteration.js");

var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
  Array.from(iterable);
}); // `Array.from` method
// https://tc39.github.io/ecma262/#sec-array.from

$({
  target: 'Array',
  stat: true,
  forced: INCORRECT_ITERATION
}, {
  from: from
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.array.includes.js":
/*!*************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.array.includes.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var $includes = __webpack_require__(/*! ../internals/array-includes */ "../../node_modules/core-js/internals/array-includes.js").includes;

var addToUnscopables = __webpack_require__(/*! ../internals/add-to-unscopables */ "../../node_modules/core-js/internals/add-to-unscopables.js"); // `Array.prototype.includes` method
// https://tc39.github.io/ecma262/#sec-array.prototype.includes


$({
  target: 'Array',
  proto: true
}, {
  includes: function () {
    function includes(el
    /* , fromIndex = 0 */
    ) {
      return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
    }

    return includes;
  }()
}); // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables

addToUnscopables('includes');

/***/ }),

/***/ "../../node_modules/core-js/modules/es.array.index-of.js":
/*!*************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.array.index-of.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var $indexOf = __webpack_require__(/*! ../internals/array-includes */ "../../node_modules/core-js/internals/array-includes.js").indexOf;

var sloppyArrayMethod = __webpack_require__(/*! ../internals/sloppy-array-method */ "../../node_modules/core-js/internals/sloppy-array-method.js");

var nativeIndexOf = [].indexOf;
var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
var SLOPPY_METHOD = sloppyArrayMethod('indexOf'); // `Array.prototype.indexOf` method
// https://tc39.github.io/ecma262/#sec-array.prototype.indexof

$({
  target: 'Array',
  proto: true,
  forced: NEGATIVE_ZERO || SLOPPY_METHOD
}, {
  indexOf: function () {
    function indexOf(searchElement
    /* , fromIndex = 0 */
    ) {
      return NEGATIVE_ZERO // convert -0 to +0
      ? nativeIndexOf.apply(this, arguments) || 0 : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : undefined);
    }

    return indexOf;
  }()
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.array.is-array.js":
/*!*************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.array.is-array.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var isArray = __webpack_require__(/*! ../internals/is-array */ "../../node_modules/core-js/internals/is-array.js"); // `Array.isArray` method
// https://tc39.github.io/ecma262/#sec-array.isarray


$({
  target: 'Array',
  stat: true
}, {
  isArray: isArray
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.array.iterator.js":
/*!*************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.array.iterator.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "../../node_modules/core-js/internals/to-indexed-object.js");

var addToUnscopables = __webpack_require__(/*! ../internals/add-to-unscopables */ "../../node_modules/core-js/internals/add-to-unscopables.js");

var Iterators = __webpack_require__(/*! ../internals/iterators */ "../../node_modules/core-js/internals/iterators.js");

var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "../../node_modules/core-js/internals/internal-state.js");

var defineIterator = __webpack_require__(/*! ../internals/define-iterator */ "../../node_modules/core-js/internals/define-iterator.js");

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR); // `Array.prototype.entries` method
// https://tc39.github.io/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.github.io/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.github.io/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.github.io/ecma262/#sec-createarrayiterator

module.exports = defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated),
    // target
    index: 0,
    // next index
    kind: kind // kind

  }); // `%ArrayIteratorPrototype%.next` method
  // https://tc39.github.io/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;

  if (!target || index >= target.length) {
    state.target = undefined;
    return {
      value: undefined,
      done: true
    };
  }

  if (kind == 'keys') return {
    value: index,
    done: false
  };
  if (kind == 'values') return {
    value: target[index],
    done: false
  };
  return {
    value: [index, target[index]],
    done: false
  };
}, 'values'); // argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.github.io/ecma262/#sec-createunmappedargumentsobject
// https://tc39.github.io/ecma262/#sec-createmappedargumentsobject

Iterators.Arguments = Iterators.Array; // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

/***/ }),

/***/ "../../node_modules/core-js/modules/es.array.join.js":
/*!*********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.array.join.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var IndexedObject = __webpack_require__(/*! ../internals/indexed-object */ "../../node_modules/core-js/internals/indexed-object.js");

var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "../../node_modules/core-js/internals/to-indexed-object.js");

var sloppyArrayMethod = __webpack_require__(/*! ../internals/sloppy-array-method */ "../../node_modules/core-js/internals/sloppy-array-method.js");

var nativeJoin = [].join;
var ES3_STRINGS = IndexedObject != Object;
var SLOPPY_METHOD = sloppyArrayMethod('join', ','); // `Array.prototype.join` method
// https://tc39.github.io/ecma262/#sec-array.prototype.join

$({
  target: 'Array',
  proto: true,
  forced: ES3_STRINGS || SLOPPY_METHOD
}, {
  join: function () {
    function join(separator) {
      return nativeJoin.call(toIndexedObject(this), separator === undefined ? ',' : separator);
    }

    return join;
  }()
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.array.last-index-of.js":
/*!******************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.array.last-index-of.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var lastIndexOf = __webpack_require__(/*! ../internals/array-last-index-of */ "../../node_modules/core-js/internals/array-last-index-of.js"); // `Array.prototype.lastIndexOf` method
// https://tc39.github.io/ecma262/#sec-array.prototype.lastindexof


$({
  target: 'Array',
  proto: true,
  forced: lastIndexOf !== [].lastIndexOf
}, {
  lastIndexOf: lastIndexOf
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.array.map.js":
/*!********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.array.map.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var $map = __webpack_require__(/*! ../internals/array-iteration */ "../../node_modules/core-js/internals/array-iteration.js").map;

var arrayMethodHasSpeciesSupport = __webpack_require__(/*! ../internals/array-method-has-species-support */ "../../node_modules/core-js/internals/array-method-has-species-support.js"); // `Array.prototype.map` method
// https://tc39.github.io/ecma262/#sec-array.prototype.map
// with adding support of @@species


$({
  target: 'Array',
  proto: true,
  forced: !arrayMethodHasSpeciesSupport('map')
}, {
  map: function () {
    function map(callbackfn
    /* , thisArg */
    ) {
      return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }

    return map;
  }()
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.array.of.js":
/*!*******************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.array.of.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");

var createProperty = __webpack_require__(/*! ../internals/create-property */ "../../node_modules/core-js/internals/create-property.js");

var ISNT_GENERIC = fails(function () {
  function F() {
    /* empty */
  }

  return !(Array.of.call(F) instanceof F);
}); // `Array.of` method
// https://tc39.github.io/ecma262/#sec-array.of
// WebKit Array.of isn't generic

$({
  target: 'Array',
  stat: true,
  forced: ISNT_GENERIC
}, {
  of: function () {
    function of()
    /* ...args */
    {
      var index = 0;
      var argumentsLength = arguments.length;
      var result = new (typeof this == 'function' ? this : Array)(argumentsLength);

      while (argumentsLength > index) {
        createProperty(result, index, arguments[index++]);
      }

      result.length = argumentsLength;
      return result;
    }

    return of;
  }()
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.array.reduce-right.js":
/*!*****************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.array.reduce-right.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var $reduceRight = __webpack_require__(/*! ../internals/array-reduce */ "../../node_modules/core-js/internals/array-reduce.js").right;

var sloppyArrayMethod = __webpack_require__(/*! ../internals/sloppy-array-method */ "../../node_modules/core-js/internals/sloppy-array-method.js"); // `Array.prototype.reduceRight` method
// https://tc39.github.io/ecma262/#sec-array.prototype.reduceright


$({
  target: 'Array',
  proto: true,
  forced: sloppyArrayMethod('reduceRight')
}, {
  reduceRight: function () {
    function reduceRight(callbackfn
    /* , initialValue */
    ) {
      return $reduceRight(this, callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
    }

    return reduceRight;
  }()
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.array.reduce.js":
/*!***********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.array.reduce.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var $reduce = __webpack_require__(/*! ../internals/array-reduce */ "../../node_modules/core-js/internals/array-reduce.js").left;

var sloppyArrayMethod = __webpack_require__(/*! ../internals/sloppy-array-method */ "../../node_modules/core-js/internals/sloppy-array-method.js"); // `Array.prototype.reduce` method
// https://tc39.github.io/ecma262/#sec-array.prototype.reduce


$({
  target: 'Array',
  proto: true,
  forced: sloppyArrayMethod('reduce')
}, {
  reduce: function () {
    function reduce(callbackfn
    /* , initialValue */
    ) {
      return $reduce(this, callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
    }

    return reduce;
  }()
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.array.slice.js":
/*!**********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.array.slice.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var isObject = __webpack_require__(/*! ../internals/is-object */ "../../node_modules/core-js/internals/is-object.js");

var isArray = __webpack_require__(/*! ../internals/is-array */ "../../node_modules/core-js/internals/is-array.js");

var toAbsoluteIndex = __webpack_require__(/*! ../internals/to-absolute-index */ "../../node_modules/core-js/internals/to-absolute-index.js");

var toLength = __webpack_require__(/*! ../internals/to-length */ "../../node_modules/core-js/internals/to-length.js");

var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "../../node_modules/core-js/internals/to-indexed-object.js");

var createProperty = __webpack_require__(/*! ../internals/create-property */ "../../node_modules/core-js/internals/create-property.js");

var arrayMethodHasSpeciesSupport = __webpack_require__(/*! ../internals/array-method-has-species-support */ "../../node_modules/core-js/internals/array-method-has-species-support.js");

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../node_modules/core-js/internals/well-known-symbol.js");

var SPECIES = wellKnownSymbol('species');
var nativeSlice = [].slice;
var max = Math.max; // `Array.prototype.slice` method
// https://tc39.github.io/ecma262/#sec-array.prototype.slice
// fallback for not array-like ES3 strings and DOM objects

$({
  target: 'Array',
  proto: true,
  forced: !arrayMethodHasSpeciesSupport('slice')
}, {
  slice: function () {
    function slice(start, end) {
      var O = toIndexedObject(this);
      var length = toLength(O.length);
      var k = toAbsoluteIndex(start, length);
      var fin = toAbsoluteIndex(end === undefined ? length : end, length); // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible

      var Constructor, result, n;

      if (isArray(O)) {
        Constructor = O.constructor; // cross-realm fallback

        if (typeof Constructor == 'function' && (Constructor === Array || isArray(Constructor.prototype))) {
          Constructor = undefined;
        } else if (isObject(Constructor)) {
          Constructor = Constructor[SPECIES];
          if (Constructor === null) Constructor = undefined;
        }

        if (Constructor === Array || Constructor === undefined) {
          return nativeSlice.call(O, k, fin);
        }
      }

      result = new (Constructor === undefined ? Array : Constructor)(max(fin - k, 0));

      for (n = 0; k < fin; k++, n++) {
        if (k in O) createProperty(result, n, O[k]);
      }

      result.length = n;
      return result;
    }

    return slice;
  }()
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.array.some.js":
/*!*********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.array.some.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var $some = __webpack_require__(/*! ../internals/array-iteration */ "../../node_modules/core-js/internals/array-iteration.js").some;

var sloppyArrayMethod = __webpack_require__(/*! ../internals/sloppy-array-method */ "../../node_modules/core-js/internals/sloppy-array-method.js"); // `Array.prototype.some` method
// https://tc39.github.io/ecma262/#sec-array.prototype.some


$({
  target: 'Array',
  proto: true,
  forced: sloppyArrayMethod('some')
}, {
  some: function () {
    function some(callbackfn
    /* , thisArg */
    ) {
      return $some(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }

    return some;
  }()
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.array.sort.js":
/*!*********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.array.sort.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var aFunction = __webpack_require__(/*! ../internals/a-function */ "../../node_modules/core-js/internals/a-function.js");

var toObject = __webpack_require__(/*! ../internals/to-object */ "../../node_modules/core-js/internals/to-object.js");

var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");

var sloppyArrayMethod = __webpack_require__(/*! ../internals/sloppy-array-method */ "../../node_modules/core-js/internals/sloppy-array-method.js");

var nativeSort = [].sort;
var test = [1, 2, 3]; // IE8-

var FAILS_ON_UNDEFINED = fails(function () {
  test.sort(undefined);
}); // V8 bug

var FAILS_ON_NULL = fails(function () {
  test.sort(null);
}); // Old WebKit

var SLOPPY_METHOD = sloppyArrayMethod('sort');
var FORCED = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || SLOPPY_METHOD; // `Array.prototype.sort` method
// https://tc39.github.io/ecma262/#sec-array.prototype.sort

$({
  target: 'Array',
  proto: true,
  forced: FORCED
}, {
  sort: function () {
    function sort(comparefn) {
      return comparefn === undefined ? nativeSort.call(toObject(this)) : nativeSort.call(toObject(this), aFunction(comparefn));
    }

    return sort;
  }()
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.array.species.js":
/*!************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.array.species.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var setSpecies = __webpack_require__(/*! ../internals/set-species */ "../../node_modules/core-js/internals/set-species.js"); // `Array[@@species]` getter
// https://tc39.github.io/ecma262/#sec-get-array-@@species


setSpecies('Array');

/***/ }),

/***/ "../../node_modules/core-js/modules/es.array.splice.js":
/*!***********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.array.splice.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var toAbsoluteIndex = __webpack_require__(/*! ../internals/to-absolute-index */ "../../node_modules/core-js/internals/to-absolute-index.js");

var toInteger = __webpack_require__(/*! ../internals/to-integer */ "../../node_modules/core-js/internals/to-integer.js");

var toLength = __webpack_require__(/*! ../internals/to-length */ "../../node_modules/core-js/internals/to-length.js");

var toObject = __webpack_require__(/*! ../internals/to-object */ "../../node_modules/core-js/internals/to-object.js");

var arraySpeciesCreate = __webpack_require__(/*! ../internals/array-species-create */ "../../node_modules/core-js/internals/array-species-create.js");

var createProperty = __webpack_require__(/*! ../internals/create-property */ "../../node_modules/core-js/internals/create-property.js");

var arrayMethodHasSpeciesSupport = __webpack_require__(/*! ../internals/array-method-has-species-support */ "../../node_modules/core-js/internals/array-method-has-species-support.js");

var max = Math.max;
var min = Math.min;
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded'; // `Array.prototype.splice` method
// https://tc39.github.io/ecma262/#sec-array.prototype.splice
// with adding support of @@species

$({
  target: 'Array',
  proto: true,
  forced: !arrayMethodHasSpeciesSupport('splice')
}, {
  splice: function () {
    function splice(start, deleteCount
    /* , ...items */
    ) {
      var O = toObject(this);
      var len = toLength(O.length);
      var actualStart = toAbsoluteIndex(start, len);
      var argumentsLength = arguments.length;
      var insertCount, actualDeleteCount, A, k, from, to;

      if (argumentsLength === 0) {
        insertCount = actualDeleteCount = 0;
      } else if (argumentsLength === 1) {
        insertCount = 0;
        actualDeleteCount = len - actualStart;
      } else {
        insertCount = argumentsLength - 2;
        actualDeleteCount = min(max(toInteger(deleteCount), 0), len - actualStart);
      }

      if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER) {
        throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
      }

      A = arraySpeciesCreate(O, actualDeleteCount);

      for (k = 0; k < actualDeleteCount; k++) {
        from = actualStart + k;
        if (from in O) createProperty(A, k, O[from]);
      }

      A.length = actualDeleteCount;

      if (insertCount < actualDeleteCount) {
        for (k = actualStart; k < len - actualDeleteCount; k++) {
          from = k + actualDeleteCount;
          to = k + insertCount;
          if (from in O) O[to] = O[from];else delete O[to];
        }

        for (k = len; k > len - actualDeleteCount + insertCount; k--) {
          delete O[k - 1];
        }
      } else if (insertCount > actualDeleteCount) {
        for (k = len - actualDeleteCount; k > actualStart; k--) {
          from = k + actualDeleteCount - 1;
          to = k + insertCount - 1;
          if (from in O) O[to] = O[from];else delete O[to];
        }
      }

      for (k = 0; k < insertCount; k++) {
        O[k + actualStart] = arguments[k + 2];
      }

      O.length = len - actualDeleteCount + insertCount;
      return A;
    }

    return splice;
  }()
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.array.unscopables.flat-map.js":
/*!*************************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.array.unscopables.flat-map.js ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// this method was added to unscopables after implementation
// in popular engines, so it's moved to a separate module
var addToUnscopables = __webpack_require__(/*! ../internals/add-to-unscopables */ "../../node_modules/core-js/internals/add-to-unscopables.js");

addToUnscopables('flatMap');

/***/ }),

/***/ "../../node_modules/core-js/modules/es.array.unscopables.flat.js":
/*!*********************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.array.unscopables.flat.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// this method was added to unscopables after implementation
// in popular engines, so it's moved to a separate module
var addToUnscopables = __webpack_require__(/*! ../internals/add-to-unscopables */ "../../node_modules/core-js/internals/add-to-unscopables.js");

addToUnscopables('flat');

/***/ }),

/***/ "../../node_modules/core-js/modules/es.data-view.js":
/*!********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.data-view.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var ArrayBufferModule = __webpack_require__(/*! ../internals/array-buffer */ "../../node_modules/core-js/internals/array-buffer.js");

var NATIVE_ARRAY_BUFFER = __webpack_require__(/*! ../internals/array-buffer-view-core */ "../../node_modules/core-js/internals/array-buffer-view-core.js").NATIVE_ARRAY_BUFFER; // `DataView` constructor
// https://tc39.github.io/ecma262/#sec-dataview-constructor


$({
  global: true,
  forced: !NATIVE_ARRAY_BUFFER
}, {
  DataView: ArrayBufferModule.DataView
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.date.now.js":
/*!*******************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.date.now.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js"); // `Date.now` method
// https://tc39.github.io/ecma262/#sec-date.now


$({
  target: 'Date',
  stat: true
}, {
  now: function () {
    function now() {
      return new Date().getTime();
    }

    return now;
  }()
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.date.to-iso-string.js":
/*!*****************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.date.to-iso-string.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var toISOString = __webpack_require__(/*! ../internals/date-to-iso-string */ "../../node_modules/core-js/internals/date-to-iso-string.js"); // `Date.prototype.toISOString` method
// https://tc39.github.io/ecma262/#sec-date.prototype.toisostring
// PhantomJS / old WebKit has a broken implementations


$({
  target: 'Date',
  proto: true,
  forced: Date.prototype.toISOString !== toISOString
}, {
  toISOString: toISOString
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.date.to-json.js":
/*!***********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.date.to-json.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");

var toObject = __webpack_require__(/*! ../internals/to-object */ "../../node_modules/core-js/internals/to-object.js");

var toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ "../../node_modules/core-js/internals/to-primitive.js");

var FORCED = fails(function () {
  return new Date(NaN).toJSON() !== null || Date.prototype.toJSON.call({
    toISOString: function () {
      function toISOString() {
        return 1;
      }

      return toISOString;
    }()
  }) !== 1;
}); // `Date.prototype.toJSON` method
// https://tc39.github.io/ecma262/#sec-date.prototype.tojson

$({
  target: 'Date',
  proto: true,
  forced: FORCED
}, {
  // eslint-disable-next-line no-unused-vars
  toJSON: function () {
    function toJSON(key) {
      var O = toObject(this);
      var pv = toPrimitive(O);
      return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
    }

    return toJSON;
  }()
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.date.to-primitive.js":
/*!****************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.date.to-primitive.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "../../node_modules/core-js/internals/create-non-enumerable-property.js");

var dateToPrimitive = __webpack_require__(/*! ../internals/date-to-primitive */ "../../node_modules/core-js/internals/date-to-primitive.js");

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../node_modules/core-js/internals/well-known-symbol.js");

var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
var DatePrototype = Date.prototype; // `Date.prototype[@@toPrimitive]` method
// https://tc39.github.io/ecma262/#sec-date.prototype-@@toprimitive

if (!(TO_PRIMITIVE in DatePrototype)) {
  createNonEnumerableProperty(DatePrototype, TO_PRIMITIVE, dateToPrimitive);
}

/***/ }),

/***/ "../../node_modules/core-js/modules/es.date.to-string.js":
/*!*************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.date.to-string.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var redefine = __webpack_require__(/*! ../internals/redefine */ "../../node_modules/core-js/internals/redefine.js");

var DatePrototype = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING = 'toString';
var nativeDateToString = DatePrototype[TO_STRING];
var getTime = DatePrototype.getTime; // `Date.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-date.prototype.tostring

if (new Date(NaN) + '' != INVALID_DATE) {
  redefine(DatePrototype, TO_STRING, function () {
    function toString() {
      var value = getTime.call(this); // eslint-disable-next-line no-self-compare

      return value === value ? nativeDateToString.call(this) : INVALID_DATE;
    }

    return toString;
  }());
}

/***/ }),

/***/ "../../node_modules/core-js/modules/es.function.bind.js":
/*!************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.function.bind.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var bind = __webpack_require__(/*! ../internals/function-bind */ "../../node_modules/core-js/internals/function-bind.js"); // `Function.prototype.bind` method
// https://tc39.github.io/ecma262/#sec-function.prototype.bind


$({
  target: 'Function',
  proto: true
}, {
  bind: bind
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.function.has-instance.js":
/*!********************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.function.has-instance.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isObject = __webpack_require__(/*! ../internals/is-object */ "../../node_modules/core-js/internals/is-object.js");

var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "../../node_modules/core-js/internals/object-define-property.js");

var getPrototypeOf = __webpack_require__(/*! ../internals/object-get-prototype-of */ "../../node_modules/core-js/internals/object-get-prototype-of.js");

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../node_modules/core-js/internals/well-known-symbol.js");

var HAS_INSTANCE = wellKnownSymbol('hasInstance');
var FunctionPrototype = Function.prototype; // `Function.prototype[@@hasInstance]` method
// https://tc39.github.io/ecma262/#sec-function.prototype-@@hasinstance

if (!(HAS_INSTANCE in FunctionPrototype)) {
  definePropertyModule.f(FunctionPrototype, HAS_INSTANCE, {
    value: function () {
      function value(O) {
        if (typeof this != 'function' || !isObject(O)) return false;
        if (!isObject(this.prototype)) return O instanceof this; // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:

        while (O = getPrototypeOf(O)) {
          if (this.prototype === O) return true;
        }

        return false;
      }

      return value;
    }()
  });
}

/***/ }),

/***/ "../../node_modules/core-js/modules/es.function.name.js":
/*!************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.function.name.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../node_modules/core-js/internals/descriptors.js");

var defineProperty = __webpack_require__(/*! ../internals/object-define-property */ "../../node_modules/core-js/internals/object-define-property.js").f;

var FunctionPrototype = Function.prototype;
var FunctionPrototypeToString = FunctionPrototype.toString;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name'; // Function instances `.name` property
// https://tc39.github.io/ecma262/#sec-function-instances-name

if (DESCRIPTORS && !(NAME in FunctionPrototype)) {
  defineProperty(FunctionPrototype, NAME, {
    configurable: true,
    get: function () {
      function get() {
        try {
          return FunctionPrototypeToString.call(this).match(nameRE)[1];
        } catch (error) {
          return '';
        }
      }

      return get;
    }()
  });
}

/***/ }),

/***/ "../../node_modules/core-js/modules/es.json.to-string-tag.js":
/*!*****************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.json.to-string-tag.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");

var setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ "../../node_modules/core-js/internals/set-to-string-tag.js"); // JSON[@@toStringTag] property
// https://tc39.github.io/ecma262/#sec-json-@@tostringtag


setToStringTag(global.JSON, 'JSON', true);

/***/ }),

/***/ "../../node_modules/core-js/modules/es.map.js":
/*!**************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.map.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var collection = __webpack_require__(/*! ../internals/collection */ "../../node_modules/core-js/internals/collection.js");

var collectionStrong = __webpack_require__(/*! ../internals/collection-strong */ "../../node_modules/core-js/internals/collection-strong.js"); // `Map` constructor
// https://tc39.github.io/ecma262/#sec-map-objects


module.exports = collection('Map', function (get) {
  return function () {
    function Map() {
      return get(this, arguments.length ? arguments[0] : undefined);
    }

    return Map;
  }();
}, collectionStrong, true);

/***/ }),

/***/ "../../node_modules/core-js/modules/es.math.acosh.js":
/*!*********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.math.acosh.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var log1p = __webpack_require__(/*! ../internals/math-log1p */ "../../node_modules/core-js/internals/math-log1p.js");

var nativeAcosh = Math.acosh;
var log = Math.log;
var sqrt = Math.sqrt;
var LN2 = Math.LN2;
var FORCED = !nativeAcosh // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
|| Math.floor(nativeAcosh(Number.MAX_VALUE)) != 710 // Tor Browser bug: Math.acosh(Infinity) -> NaN
|| nativeAcosh(Infinity) != Infinity; // `Math.acosh` method
// https://tc39.github.io/ecma262/#sec-math.acosh

$({
  target: 'Math',
  stat: true,
  forced: FORCED
}, {
  acosh: function () {
    function acosh(x) {
      return (x = +x) < 1 ? NaN : x > 94906265.62425156 ? log(x) + LN2 : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
    }

    return acosh;
  }()
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.math.asinh.js":
/*!*********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.math.asinh.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var nativeAsinh = Math.asinh;
var log = Math.log;
var sqrt = Math.sqrt;

function asinh(x) {
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : log(x + sqrt(x * x + 1));
} // `Math.asinh` method
// https://tc39.github.io/ecma262/#sec-math.asinh
// Tor Browser bug: Math.asinh(0) -> -0


$({
  target: 'Math',
  stat: true,
  forced: !(nativeAsinh && 1 / nativeAsinh(0) > 0)
}, {
  asinh: asinh
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.math.atanh.js":
/*!*********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.math.atanh.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var nativeAtanh = Math.atanh;
var log = Math.log; // `Math.atanh` method
// https://tc39.github.io/ecma262/#sec-math.atanh
// Tor Browser bug: Math.atanh(-0) -> 0

$({
  target: 'Math',
  stat: true,
  forced: !(nativeAtanh && 1 / nativeAtanh(-0) < 0)
}, {
  atanh: function () {
    function atanh(x) {
      return (x = +x) == 0 ? x : log((1 + x) / (1 - x)) / 2;
    }

    return atanh;
  }()
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.math.cbrt.js":
/*!********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.math.cbrt.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var sign = __webpack_require__(/*! ../internals/math-sign */ "../../node_modules/core-js/internals/math-sign.js");

var abs = Math.abs;
var pow = Math.pow; // `Math.cbrt` method
// https://tc39.github.io/ecma262/#sec-math.cbrt

$({
  target: 'Math',
  stat: true
}, {
  cbrt: function () {
    function cbrt(x) {
      return sign(x = +x) * pow(abs(x), 1 / 3);
    }

    return cbrt;
  }()
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.math.clz32.js":
/*!*********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.math.clz32.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var floor = Math.floor;
var log = Math.log;
var LOG2E = Math.LOG2E; // `Math.clz32` method
// https://tc39.github.io/ecma262/#sec-math.clz32

$({
  target: 'Math',
  stat: true
}, {
  clz32: function () {
    function clz32(x) {
      return (x >>>= 0) ? 31 - floor(log(x + 0.5) * LOG2E) : 32;
    }

    return clz32;
  }()
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.math.cosh.js":
/*!********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.math.cosh.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var expm1 = __webpack_require__(/*! ../internals/math-expm1 */ "../../node_modules/core-js/internals/math-expm1.js");

var nativeCosh = Math.cosh;
var abs = Math.abs;
var E = Math.E; // `Math.cosh` method
// https://tc39.github.io/ecma262/#sec-math.cosh

$({
  target: 'Math',
  stat: true,
  forced: !nativeCosh || nativeCosh(710) === Infinity
}, {
  cosh: function () {
    function cosh(x) {
      var t = expm1(abs(x) - 1) + 1;
      return (t + 1 / (t * E * E)) * (E / 2);
    }

    return cosh;
  }()
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.math.expm1.js":
/*!*********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.math.expm1.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var expm1 = __webpack_require__(/*! ../internals/math-expm1 */ "../../node_modules/core-js/internals/math-expm1.js"); // `Math.expm1` method
// https://tc39.github.io/ecma262/#sec-math.expm1


$({
  target: 'Math',
  stat: true,
  forced: expm1 != Math.expm1
}, {
  expm1: expm1
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.math.fround.js":
/*!**********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.math.fround.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var fround = __webpack_require__(/*! ../internals/math-fround */ "../../node_modules/core-js/internals/math-fround.js"); // `Math.fround` method
// https://tc39.github.io/ecma262/#sec-math.fround


$({
  target: 'Math',
  stat: true
}, {
  fround: fround
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.math.hypot.js":
/*!*********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.math.hypot.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var $hypot = Math.hypot;
var abs = Math.abs;
var sqrt = Math.sqrt; // Chrome 77 bug
// https://bugs.chromium.org/p/v8/issues/detail?id=9546

var BUGGY = !!$hypot && $hypot(Infinity, NaN) !== Infinity; // `Math.hypot` method
// https://tc39.github.io/ecma262/#sec-math.hypot

$({
  target: 'Math',
  stat: true,
  forced: BUGGY
}, {
  hypot: function () {
    function hypot(value1, value2) {
      // eslint-disable-line no-unused-vars
      var sum = 0;
      var i = 0;
      var aLen = arguments.length;
      var larg = 0;
      var arg, div;

      while (i < aLen) {
        arg = abs(arguments[i++]);

        if (larg < arg) {
          div = larg / arg;
          sum = sum * div * div + 1;
          larg = arg;
        } else if (arg > 0) {
          div = arg / larg;
          sum += div * div;
        } else sum += arg;
      }

      return larg === Infinity ? Infinity : larg * sqrt(sum);
    }

    return hypot;
  }()
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.math.imul.js":
/*!********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.math.imul.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");

var nativeImul = Math.imul;
var FORCED = fails(function () {
  return nativeImul(0xFFFFFFFF, 5) != -5 || nativeImul.length != 2;
}); // `Math.imul` method
// https://tc39.github.io/ecma262/#sec-math.imul
// some WebKit versions fails with big numbers, some has wrong arity

$({
  target: 'Math',
  stat: true,
  forced: FORCED
}, {
  imul: function () {
    function imul(x, y) {
      var UINT16 = 0xFFFF;
      var xn = +x;
      var yn = +y;
      var xl = UINT16 & xn;
      var yl = UINT16 & yn;
      return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
    }

    return imul;
  }()
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.math.log10.js":
/*!*********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.math.log10.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var log = Math.log;
var LOG10E = Math.LOG10E; // `Math.log10` method
// https://tc39.github.io/ecma262/#sec-math.log10

$({
  target: 'Math',
  stat: true
}, {
  log10: function () {
    function log10(x) {
      return log(x) * LOG10E;
    }

    return log10;
  }()
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.math.log1p.js":
/*!*********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.math.log1p.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var log1p = __webpack_require__(/*! ../internals/math-log1p */ "../../node_modules/core-js/internals/math-log1p.js"); // `Math.log1p` method
// https://tc39.github.io/ecma262/#sec-math.log1p


$({
  target: 'Math',
  stat: true
}, {
  log1p: log1p
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.math.log2.js":
/*!********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.math.log2.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var log = Math.log;
var LN2 = Math.LN2; // `Math.log2` method
// https://tc39.github.io/ecma262/#sec-math.log2

$({
  target: 'Math',
  stat: true
}, {
  log2: function () {
    function log2(x) {
      return log(x) / LN2;
    }

    return log2;
  }()
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.math.sign.js":
/*!********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.math.sign.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var sign = __webpack_require__(/*! ../internals/math-sign */ "../../node_modules/core-js/internals/math-sign.js"); // `Math.sign` method
// https://tc39.github.io/ecma262/#sec-math.sign


$({
  target: 'Math',
  stat: true
}, {
  sign: sign
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.math.sinh.js":
/*!********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.math.sinh.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");

var expm1 = __webpack_require__(/*! ../internals/math-expm1 */ "../../node_modules/core-js/internals/math-expm1.js");

var abs = Math.abs;
var exp = Math.exp;
var E = Math.E;
var FORCED = fails(function () {
  return Math.sinh(-2e-17) != -2e-17;
}); // `Math.sinh` method
// https://tc39.github.io/ecma262/#sec-math.sinh
// V8 near Chromium 38 has a problem with very small numbers

$({
  target: 'Math',
  stat: true,
  forced: FORCED
}, {
  sinh: function () {
    function sinh(x) {
      return abs(x = +x) < 1 ? (expm1(x) - expm1(-x)) / 2 : (exp(x - 1) - exp(-x - 1)) * (E / 2);
    }

    return sinh;
  }()
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.math.tanh.js":
/*!********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.math.tanh.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var expm1 = __webpack_require__(/*! ../internals/math-expm1 */ "../../node_modules/core-js/internals/math-expm1.js");

var exp = Math.exp; // `Math.tanh` method
// https://tc39.github.io/ecma262/#sec-math.tanh

$({
  target: 'Math',
  stat: true
}, {
  tanh: function () {
    function tanh(x) {
      var a = expm1(x = +x);
      var b = expm1(-x);
      return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
    }

    return tanh;
  }()
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.math.to-string-tag.js":
/*!*****************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.math.to-string-tag.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ "../../node_modules/core-js/internals/set-to-string-tag.js"); // Math[@@toStringTag] property
// https://tc39.github.io/ecma262/#sec-math-@@tostringtag


setToStringTag(Math, 'Math', true);

/***/ }),

/***/ "../../node_modules/core-js/modules/es.math.trunc.js":
/*!*********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.math.trunc.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var ceil = Math.ceil;
var floor = Math.floor; // `Math.trunc` method
// https://tc39.github.io/ecma262/#sec-math.trunc

$({
  target: 'Math',
  stat: true
}, {
  trunc: function () {
    function trunc(it) {
      return (it > 0 ? floor : ceil)(it);
    }

    return trunc;
  }()
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.number.constructor.js":
/*!*****************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.number.constructor.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../node_modules/core-js/internals/descriptors.js");

var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");

var isForced = __webpack_require__(/*! ../internals/is-forced */ "../../node_modules/core-js/internals/is-forced.js");

var redefine = __webpack_require__(/*! ../internals/redefine */ "../../node_modules/core-js/internals/redefine.js");

var has = __webpack_require__(/*! ../internals/has */ "../../node_modules/core-js/internals/has.js");

var classof = __webpack_require__(/*! ../internals/classof-raw */ "../../node_modules/core-js/internals/classof-raw.js");

var inheritIfRequired = __webpack_require__(/*! ../internals/inherit-if-required */ "../../node_modules/core-js/internals/inherit-if-required.js");

var toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ "../../node_modules/core-js/internals/to-primitive.js");

var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");

var create = __webpack_require__(/*! ../internals/object-create */ "../../node_modules/core-js/internals/object-create.js");

var getOwnPropertyNames = __webpack_require__(/*! ../internals/object-get-own-property-names */ "../../node_modules/core-js/internals/object-get-own-property-names.js").f;

var getOwnPropertyDescriptor = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "../../node_modules/core-js/internals/object-get-own-property-descriptor.js").f;

var defineProperty = __webpack_require__(/*! ../internals/object-define-property */ "../../node_modules/core-js/internals/object-define-property.js").f;

var trim = __webpack_require__(/*! ../internals/string-trim */ "../../node_modules/core-js/internals/string-trim.js").trim;

var NUMBER = 'Number';
var NativeNumber = global[NUMBER];
var NumberPrototype = NativeNumber.prototype; // Opera ~12 has broken Object#toString

var BROKEN_CLASSOF = classof(create(NumberPrototype)) == NUMBER; // `ToNumber` abstract operation
// https://tc39.github.io/ecma262/#sec-tonumber

var toNumber = function toNumber(argument) {
  var it = toPrimitive(argument, false);
  var first, third, radix, maxCode, digits, length, index, code;

  if (typeof it == 'string' && it.length > 2) {
    it = trim(it);
    first = it.charCodeAt(0);

    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66:
        case 98:
          radix = 2;
          maxCode = 49;
          break;
        // fast equal of /^0b[01]+$/i

        case 79:
        case 111:
          radix = 8;
          maxCode = 55;
          break;
        // fast equal of /^0o[0-7]+$/i

        default:
          return +it;
      }

      digits = it.slice(2);
      length = digits.length;

      for (index = 0; index < length; index++) {
        code = digits.charCodeAt(index); // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols

        if (code < 48 || code > maxCode) return NaN;
      }

      return parseInt(digits, radix);
    }
  }

  return +it;
}; // `Number` constructor
// https://tc39.github.io/ecma262/#sec-number-constructor


if (isForced(NUMBER, !NativeNumber(' 0o1') || !NativeNumber('0b1') || NativeNumber('+0x1'))) {
  var NumberWrapper = function () {
    function Number(value) {
      var it = arguments.length < 1 ? 0 : value;
      var dummy = this;
      return dummy instanceof NumberWrapper // check on 1..constructor(foo) case
      && (BROKEN_CLASSOF ? fails(function () {
        NumberPrototype.valueOf.call(dummy);
      }) : classof(dummy) != NUMBER) ? inheritIfRequired(new NativeNumber(toNumber(it)), dummy, NumberWrapper) : toNumber(it);
    }

    return Number;
  }();

  for (var keys = DESCRIPTORS ? getOwnPropertyNames(NativeNumber) : ( // ES3:
  'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' + // ES2015 (in case, if modules with ES2015 Number statics required before):
  'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' + 'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger').split(','), j = 0, key; keys.length > j; j++) {
    if (has(NativeNumber, key = keys[j]) && !has(NumberWrapper, key)) {
      defineProperty(NumberWrapper, key, getOwnPropertyDescriptor(NativeNumber, key));
    }
  }

  NumberWrapper.prototype = NumberPrototype;
  NumberPrototype.constructor = NumberWrapper;
  redefine(global, NUMBER, NumberWrapper);
}

/***/ }),

/***/ "../../node_modules/core-js/modules/es.number.epsilon.js":
/*!*************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.number.epsilon.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js"); // `Number.EPSILON` constant
// https://tc39.github.io/ecma262/#sec-number.epsilon


$({
  target: 'Number',
  stat: true
}, {
  EPSILON: Math.pow(2, -52)
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.number.is-finite.js":
/*!***************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.number.is-finite.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var numberIsFinite = __webpack_require__(/*! ../internals/number-is-finite */ "../../node_modules/core-js/internals/number-is-finite.js"); // `Number.isFinite` method
// https://tc39.github.io/ecma262/#sec-number.isfinite


$({
  target: 'Number',
  stat: true
}, {
  isFinite: numberIsFinite
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.number.is-integer.js":
/*!****************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.number.is-integer.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var isInteger = __webpack_require__(/*! ../internals/is-integer */ "../../node_modules/core-js/internals/is-integer.js"); // `Number.isInteger` method
// https://tc39.github.io/ecma262/#sec-number.isinteger


$({
  target: 'Number',
  stat: true
}, {
  isInteger: isInteger
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.number.is-nan.js":
/*!************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.number.is-nan.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js"); // `Number.isNaN` method
// https://tc39.github.io/ecma262/#sec-number.isnan


$({
  target: 'Number',
  stat: true
}, {
  isNaN: function () {
    function isNaN(number) {
      // eslint-disable-next-line no-self-compare
      return number != number;
    }

    return isNaN;
  }()
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.number.is-safe-integer.js":
/*!*********************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.number.is-safe-integer.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var isInteger = __webpack_require__(/*! ../internals/is-integer */ "../../node_modules/core-js/internals/is-integer.js");

var abs = Math.abs; // `Number.isSafeInteger` method
// https://tc39.github.io/ecma262/#sec-number.issafeinteger

$({
  target: 'Number',
  stat: true
}, {
  isSafeInteger: function () {
    function isSafeInteger(number) {
      return isInteger(number) && abs(number) <= 0x1FFFFFFFFFFFFF;
    }

    return isSafeInteger;
  }()
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.number.max-safe-integer.js":
/*!**********************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.number.max-safe-integer.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js"); // `Number.MAX_SAFE_INTEGER` constant
// https://tc39.github.io/ecma262/#sec-number.max_safe_integer


$({
  target: 'Number',
  stat: true
}, {
  MAX_SAFE_INTEGER: 0x1FFFFFFFFFFFFF
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.number.min-safe-integer.js":
/*!**********************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.number.min-safe-integer.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js"); // `Number.MIN_SAFE_INTEGER` constant
// https://tc39.github.io/ecma262/#sec-number.min_safe_integer


$({
  target: 'Number',
  stat: true
}, {
  MIN_SAFE_INTEGER: -0x1FFFFFFFFFFFFF
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.number.parse-float.js":
/*!*****************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.number.parse-float.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var parseFloat = __webpack_require__(/*! ../internals/parse-float */ "../../node_modules/core-js/internals/parse-float.js"); // `Number.parseFloat` method
// https://tc39.github.io/ecma262/#sec-number.parseFloat


$({
  target: 'Number',
  stat: true,
  forced: Number.parseFloat != parseFloat
}, {
  parseFloat: parseFloat
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.number.parse-int.js":
/*!***************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.number.parse-int.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var parseInt = __webpack_require__(/*! ../internals/parse-int */ "../../node_modules/core-js/internals/parse-int.js"); // `Number.parseInt` method
// https://tc39.github.io/ecma262/#sec-number.parseint


$({
  target: 'Number',
  stat: true,
  forced: Number.parseInt != parseInt
}, {
  parseInt: parseInt
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.number.to-fixed.js":
/*!**************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.number.to-fixed.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var toInteger = __webpack_require__(/*! ../internals/to-integer */ "../../node_modules/core-js/internals/to-integer.js");

var thisNumberValue = __webpack_require__(/*! ../internals/this-number-value */ "../../node_modules/core-js/internals/this-number-value.js");

var repeat = __webpack_require__(/*! ../internals/string-repeat */ "../../node_modules/core-js/internals/string-repeat.js");

var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");

var nativeToFixed = 1.0.toFixed;
var floor = Math.floor;

var pow = function pow(x, n, acc) {
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};

var log = function log(x) {
  var n = 0;
  var x2 = x;

  while (x2 >= 4096) {
    n += 12;
    x2 /= 4096;
  }

  while (x2 >= 2) {
    n += 1;
    x2 /= 2;
  }

  return n;
};

var FORCED = nativeToFixed && (0.00008.toFixed(3) !== '0.000' || 0.9.toFixed(0) !== '1' || 1.255.toFixed(2) !== '1.25' || 1000000000000000128.0.toFixed(0) !== '1000000000000000128') || !fails(function () {
  // V8 ~ Android 4.3-
  nativeToFixed.call({});
}); // `Number.prototype.toFixed` method
// https://tc39.github.io/ecma262/#sec-number.prototype.tofixed

$({
  target: 'Number',
  proto: true,
  forced: FORCED
}, {
  // eslint-disable-next-line max-statements
  toFixed: function () {
    function toFixed(fractionDigits) {
      var number = thisNumberValue(this);
      var fractDigits = toInteger(fractionDigits);
      var data = [0, 0, 0, 0, 0, 0];
      var sign = '';
      var result = '0';
      var e, z, j, k;

      var multiply = function () {
        function multiply(n, c) {
          var index = -1;
          var c2 = c;

          while (++index < 6) {
            c2 += n * data[index];
            data[index] = c2 % 1e7;
            c2 = floor(c2 / 1e7);
          }
        }

        return multiply;
      }();

      var divide = function () {
        function divide(n) {
          var index = 6;
          var c = 0;

          while (--index >= 0) {
            c += data[index];
            data[index] = floor(c / n);
            c = c % n * 1e7;
          }
        }

        return divide;
      }();

      var dataToString = function () {
        function dataToString() {
          var index = 6;
          var s = '';

          while (--index >= 0) {
            if (s !== '' || index === 0 || data[index] !== 0) {
              var t = String(data[index]);
              s = s === '' ? t : s + repeat.call('0', 7 - t.length) + t;
            }
          }

          return s;
        }

        return dataToString;
      }();

      if (fractDigits < 0 || fractDigits > 20) throw RangeError('Incorrect fraction digits'); // eslint-disable-next-line no-self-compare

      if (number != number) return 'NaN';
      if (number <= -1e21 || number >= 1e21) return String(number);

      if (number < 0) {
        sign = '-';
        number = -number;
      }

      if (number > 1e-21) {
        e = log(number * pow(2, 69, 1)) - 69;
        z = e < 0 ? number * pow(2, -e, 1) : number / pow(2, e, 1);
        z *= 0x10000000000000;
        e = 52 - e;

        if (e > 0) {
          multiply(0, z);
          j = fractDigits;

          while (j >= 7) {
            multiply(1e7, 0);
            j -= 7;
          }

          multiply(pow(10, j, 1), 0);
          j = e - 1;

          while (j >= 23) {
            divide(1 << 23);
            j -= 23;
          }

          divide(1 << j);
          multiply(1, 1);
          divide(2);
          result = dataToString();
        } else {
          multiply(0, z);
          multiply(1 << -e, 0);
          result = dataToString() + repeat.call('0', fractDigits);
        }
      }

      if (fractDigits > 0) {
        k = result.length;
        result = sign + (k <= fractDigits ? '0.' + repeat.call('0', fractDigits - k) + result : result.slice(0, k - fractDigits) + '.' + result.slice(k - fractDigits));
      } else {
        result = sign + result;
      }

      return result;
    }

    return toFixed;
  }()
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.object.assign.js":
/*!************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.object.assign.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var assign = __webpack_require__(/*! ../internals/object-assign */ "../../node_modules/core-js/internals/object-assign.js"); // `Object.assign` method
// https://tc39.github.io/ecma262/#sec-object.assign


$({
  target: 'Object',
  stat: true,
  forced: Object.assign !== assign
}, {
  assign: assign
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.object.create.js":
/*!************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.object.create.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../node_modules/core-js/internals/descriptors.js");

var create = __webpack_require__(/*! ../internals/object-create */ "../../node_modules/core-js/internals/object-create.js"); // `Object.create` method
// https://tc39.github.io/ecma262/#sec-object.create


$({
  target: 'Object',
  stat: true,
  sham: !DESCRIPTORS
}, {
  create: create
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.object.define-getter.js":
/*!*******************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.object.define-getter.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../node_modules/core-js/internals/descriptors.js");

var FORCED = __webpack_require__(/*! ../internals/forced-object-prototype-accessors-methods */ "../../node_modules/core-js/internals/forced-object-prototype-accessors-methods.js");

var toObject = __webpack_require__(/*! ../internals/to-object */ "../../node_modules/core-js/internals/to-object.js");

var aFunction = __webpack_require__(/*! ../internals/a-function */ "../../node_modules/core-js/internals/a-function.js");

var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "../../node_modules/core-js/internals/object-define-property.js"); // `Object.prototype.__defineGetter__` method
// https://tc39.github.io/ecma262/#sec-object.prototype.__defineGetter__


if (DESCRIPTORS) {
  $({
    target: 'Object',
    proto: true,
    forced: FORCED
  }, {
    __defineGetter__: function () {
      function __defineGetter__(P, getter) {
        definePropertyModule.f(toObject(this), P, {
          get: aFunction(getter),
          enumerable: true,
          configurable: true
        });
      }

      return __defineGetter__;
    }()
  });
}

/***/ }),

/***/ "../../node_modules/core-js/modules/es.object.define-properties.js":
/*!***********************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.object.define-properties.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../node_modules/core-js/internals/descriptors.js");

var defineProperties = __webpack_require__(/*! ../internals/object-define-properties */ "../../node_modules/core-js/internals/object-define-properties.js"); // `Object.defineProperties` method
// https://tc39.github.io/ecma262/#sec-object.defineproperties


$({
  target: 'Object',
  stat: true,
  forced: !DESCRIPTORS,
  sham: !DESCRIPTORS
}, {
  defineProperties: defineProperties
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.object.define-property.js":
/*!*********************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.object.define-property.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../node_modules/core-js/internals/descriptors.js");

var objectDefinePropertyModile = __webpack_require__(/*! ../internals/object-define-property */ "../../node_modules/core-js/internals/object-define-property.js"); // `Object.defineProperty` method
// https://tc39.github.io/ecma262/#sec-object.defineproperty


$({
  target: 'Object',
  stat: true,
  forced: !DESCRIPTORS,
  sham: !DESCRIPTORS
}, {
  defineProperty: objectDefinePropertyModile.f
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.object.define-setter.js":
/*!*******************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.object.define-setter.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../node_modules/core-js/internals/descriptors.js");

var FORCED = __webpack_require__(/*! ../internals/forced-object-prototype-accessors-methods */ "../../node_modules/core-js/internals/forced-object-prototype-accessors-methods.js");

var toObject = __webpack_require__(/*! ../internals/to-object */ "../../node_modules/core-js/internals/to-object.js");

var aFunction = __webpack_require__(/*! ../internals/a-function */ "../../node_modules/core-js/internals/a-function.js");

var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "../../node_modules/core-js/internals/object-define-property.js"); // `Object.prototype.__defineSetter__` method
// https://tc39.github.io/ecma262/#sec-object.prototype.__defineSetter__


if (DESCRIPTORS) {
  $({
    target: 'Object',
    proto: true,
    forced: FORCED
  }, {
    __defineSetter__: function () {
      function __defineSetter__(P, setter) {
        definePropertyModule.f(toObject(this), P, {
          set: aFunction(setter),
          enumerable: true,
          configurable: true
        });
      }

      return __defineSetter__;
    }()
  });
}

/***/ }),

/***/ "../../node_modules/core-js/modules/es.object.entries.js":
/*!*************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.object.entries.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var $entries = __webpack_require__(/*! ../internals/object-to-array */ "../../node_modules/core-js/internals/object-to-array.js").entries; // `Object.entries` method
// https://tc39.github.io/ecma262/#sec-object.entries


$({
  target: 'Object',
  stat: true
}, {
  entries: function () {
    function entries(O) {
      return $entries(O);
    }

    return entries;
  }()
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.object.freeze.js":
/*!************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.object.freeze.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var FREEZING = __webpack_require__(/*! ../internals/freezing */ "../../node_modules/core-js/internals/freezing.js");

var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");

var isObject = __webpack_require__(/*! ../internals/is-object */ "../../node_modules/core-js/internals/is-object.js");

var onFreeze = __webpack_require__(/*! ../internals/internal-metadata */ "../../node_modules/core-js/internals/internal-metadata.js").onFreeze;

var nativeFreeze = Object.freeze;
var FAILS_ON_PRIMITIVES = fails(function () {
  nativeFreeze(1);
}); // `Object.freeze` method
// https://tc39.github.io/ecma262/#sec-object.freeze

$({
  target: 'Object',
  stat: true,
  forced: FAILS_ON_PRIMITIVES,
  sham: !FREEZING
}, {
  freeze: function () {
    function freeze(it) {
      return nativeFreeze && isObject(it) ? nativeFreeze(onFreeze(it)) : it;
    }

    return freeze;
  }()
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.object.from-entries.js":
/*!******************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.object.from-entries.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var iterate = __webpack_require__(/*! ../internals/iterate */ "../../node_modules/core-js/internals/iterate.js");

var createProperty = __webpack_require__(/*! ../internals/create-property */ "../../node_modules/core-js/internals/create-property.js"); // `Object.fromEntries` method
// https://github.com/tc39/proposal-object-from-entries


$({
  target: 'Object',
  stat: true
}, {
  fromEntries: function () {
    function fromEntries(iterable) {
      var obj = {};
      iterate(iterable, function (k, v) {
        createProperty(obj, k, v);
      }, undefined, true);
      return obj;
    }

    return fromEntries;
  }()
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.object.get-own-property-descriptor.js":
/*!*********************************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.object.get-own-property-descriptor.js ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");

var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "../../node_modules/core-js/internals/to-indexed-object.js");

var nativeGetOwnPropertyDescriptor = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "../../node_modules/core-js/internals/object-get-own-property-descriptor.js").f;

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../node_modules/core-js/internals/descriptors.js");

var FAILS_ON_PRIMITIVES = fails(function () {
  nativeGetOwnPropertyDescriptor(1);
});
var FORCED = !DESCRIPTORS || FAILS_ON_PRIMITIVES; // `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor

$({
  target: 'Object',
  stat: true,
  forced: FORCED,
  sham: !DESCRIPTORS
}, {
  getOwnPropertyDescriptor: function () {
    function getOwnPropertyDescriptor(it, key) {
      return nativeGetOwnPropertyDescriptor(toIndexedObject(it), key);
    }

    return getOwnPropertyDescriptor;
  }()
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.object.get-own-property-descriptors.js":
/*!**********************************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.object.get-own-property-descriptors.js ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../node_modules/core-js/internals/descriptors.js");

var ownKeys = __webpack_require__(/*! ../internals/own-keys */ "../../node_modules/core-js/internals/own-keys.js");

var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "../../node_modules/core-js/internals/to-indexed-object.js");

var getOwnPropertyDescriptorModule = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "../../node_modules/core-js/internals/object-get-own-property-descriptor.js");

var createProperty = __webpack_require__(/*! ../internals/create-property */ "../../node_modules/core-js/internals/create-property.js"); // `Object.getOwnPropertyDescriptors` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors


$({
  target: 'Object',
  stat: true,
  sham: !DESCRIPTORS
}, {
  getOwnPropertyDescriptors: function () {
    function getOwnPropertyDescriptors(object) {
      var O = toIndexedObject(object);
      var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
      var keys = ownKeys(O);
      var result = {};
      var index = 0;
      var key, descriptor;

      while (keys.length > index) {
        descriptor = getOwnPropertyDescriptor(O, key = keys[index++]);
        if (descriptor !== undefined) createProperty(result, key, descriptor);
      }

      return result;
    }

    return getOwnPropertyDescriptors;
  }()
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.object.get-own-property-names.js":
/*!****************************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.object.get-own-property-names.js ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");

var nativeGetOwnPropertyNames = __webpack_require__(/*! ../internals/object-get-own-property-names-external */ "../../node_modules/core-js/internals/object-get-own-property-names-external.js").f;

var FAILS_ON_PRIMITIVES = fails(function () {
  return !Object.getOwnPropertyNames(1);
}); // `Object.getOwnPropertyNames` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertynames

$({
  target: 'Object',
  stat: true,
  forced: FAILS_ON_PRIMITIVES
}, {
  getOwnPropertyNames: nativeGetOwnPropertyNames
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.object.get-prototype-of.js":
/*!**********************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.object.get-prototype-of.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");

var toObject = __webpack_require__(/*! ../internals/to-object */ "../../node_modules/core-js/internals/to-object.js");

var nativeGetPrototypeOf = __webpack_require__(/*! ../internals/object-get-prototype-of */ "../../node_modules/core-js/internals/object-get-prototype-of.js");

var CORRECT_PROTOTYPE_GETTER = __webpack_require__(/*! ../internals/correct-prototype-getter */ "../../node_modules/core-js/internals/correct-prototype-getter.js");

var FAILS_ON_PRIMITIVES = fails(function () {
  nativeGetPrototypeOf(1);
}); // `Object.getPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.getprototypeof

$({
  target: 'Object',
  stat: true,
  forced: FAILS_ON_PRIMITIVES,
  sham: !CORRECT_PROTOTYPE_GETTER
}, {
  getPrototypeOf: function () {
    function getPrototypeOf(it) {
      return nativeGetPrototypeOf(toObject(it));
    }

    return getPrototypeOf;
  }()
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.object.is-extensible.js":
/*!*******************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.object.is-extensible.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");

var isObject = __webpack_require__(/*! ../internals/is-object */ "../../node_modules/core-js/internals/is-object.js");

var nativeIsExtensible = Object.isExtensible;
var FAILS_ON_PRIMITIVES = fails(function () {
  nativeIsExtensible(1);
}); // `Object.isExtensible` method
// https://tc39.github.io/ecma262/#sec-object.isextensible

$({
  target: 'Object',
  stat: true,
  forced: FAILS_ON_PRIMITIVES
}, {
  isExtensible: function () {
    function isExtensible(it) {
      return isObject(it) ? nativeIsExtensible ? nativeIsExtensible(it) : true : false;
    }

    return isExtensible;
  }()
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.object.is-frozen.js":
/*!***************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.object.is-frozen.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");

var isObject = __webpack_require__(/*! ../internals/is-object */ "../../node_modules/core-js/internals/is-object.js");

var nativeIsFrozen = Object.isFrozen;
var FAILS_ON_PRIMITIVES = fails(function () {
  nativeIsFrozen(1);
}); // `Object.isFrozen` method
// https://tc39.github.io/ecma262/#sec-object.isfrozen

$({
  target: 'Object',
  stat: true,
  forced: FAILS_ON_PRIMITIVES
}, {
  isFrozen: function () {
    function isFrozen(it) {
      return isObject(it) ? nativeIsFrozen ? nativeIsFrozen(it) : false : true;
    }

    return isFrozen;
  }()
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.object.is-sealed.js":
/*!***************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.object.is-sealed.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");

var isObject = __webpack_require__(/*! ../internals/is-object */ "../../node_modules/core-js/internals/is-object.js");

var nativeIsSealed = Object.isSealed;
var FAILS_ON_PRIMITIVES = fails(function () {
  nativeIsSealed(1);
}); // `Object.isSealed` method
// https://tc39.github.io/ecma262/#sec-object.issealed

$({
  target: 'Object',
  stat: true,
  forced: FAILS_ON_PRIMITIVES
}, {
  isSealed: function () {
    function isSealed(it) {
      return isObject(it) ? nativeIsSealed ? nativeIsSealed(it) : false : true;
    }

    return isSealed;
  }()
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.object.is.js":
/*!********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.object.is.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var is = __webpack_require__(/*! ../internals/same-value */ "../../node_modules/core-js/internals/same-value.js"); // `Object.is` method
// https://tc39.github.io/ecma262/#sec-object.is


$({
  target: 'Object',
  stat: true
}, {
  is: is
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.object.keys.js":
/*!**********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.object.keys.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var toObject = __webpack_require__(/*! ../internals/to-object */ "../../node_modules/core-js/internals/to-object.js");

var nativeKeys = __webpack_require__(/*! ../internals/object-keys */ "../../node_modules/core-js/internals/object-keys.js");

var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");

var FAILS_ON_PRIMITIVES = fails(function () {
  nativeKeys(1);
}); // `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys

$({
  target: 'Object',
  stat: true,
  forced: FAILS_ON_PRIMITIVES
}, {
  keys: function () {
    function keys(it) {
      return nativeKeys(toObject(it));
    }

    return keys;
  }()
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.object.lookup-getter.js":
/*!*******************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.object.lookup-getter.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../node_modules/core-js/internals/descriptors.js");

var FORCED = __webpack_require__(/*! ../internals/forced-object-prototype-accessors-methods */ "../../node_modules/core-js/internals/forced-object-prototype-accessors-methods.js");

var toObject = __webpack_require__(/*! ../internals/to-object */ "../../node_modules/core-js/internals/to-object.js");

var toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ "../../node_modules/core-js/internals/to-primitive.js");

var getPrototypeOf = __webpack_require__(/*! ../internals/object-get-prototype-of */ "../../node_modules/core-js/internals/object-get-prototype-of.js");

var getOwnPropertyDescriptor = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "../../node_modules/core-js/internals/object-get-own-property-descriptor.js").f; // `Object.prototype.__lookupGetter__` method
// https://tc39.github.io/ecma262/#sec-object.prototype.__lookupGetter__


if (DESCRIPTORS) {
  $({
    target: 'Object',
    proto: true,
    forced: FORCED
  }, {
    __lookupGetter__: function () {
      function __lookupGetter__(P) {
        var O = toObject(this);
        var key = toPrimitive(P, true);
        var desc;

        do {
          if (desc = getOwnPropertyDescriptor(O, key)) return desc.get;
        } while (O = getPrototypeOf(O));
      }

      return __lookupGetter__;
    }()
  });
}

/***/ }),

/***/ "../../node_modules/core-js/modules/es.object.lookup-setter.js":
/*!*******************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.object.lookup-setter.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../node_modules/core-js/internals/descriptors.js");

var FORCED = __webpack_require__(/*! ../internals/forced-object-prototype-accessors-methods */ "../../node_modules/core-js/internals/forced-object-prototype-accessors-methods.js");

var toObject = __webpack_require__(/*! ../internals/to-object */ "../../node_modules/core-js/internals/to-object.js");

var toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ "../../node_modules/core-js/internals/to-primitive.js");

var getPrototypeOf = __webpack_require__(/*! ../internals/object-get-prototype-of */ "../../node_modules/core-js/internals/object-get-prototype-of.js");

var getOwnPropertyDescriptor = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "../../node_modules/core-js/internals/object-get-own-property-descriptor.js").f; // `Object.prototype.__lookupSetter__` method
// https://tc39.github.io/ecma262/#sec-object.prototype.__lookupSetter__


if (DESCRIPTORS) {
  $({
    target: 'Object',
    proto: true,
    forced: FORCED
  }, {
    __lookupSetter__: function () {
      function __lookupSetter__(P) {
        var O = toObject(this);
        var key = toPrimitive(P, true);
        var desc;

        do {
          if (desc = getOwnPropertyDescriptor(O, key)) return desc.set;
        } while (O = getPrototypeOf(O));
      }

      return __lookupSetter__;
    }()
  });
}

/***/ }),

/***/ "../../node_modules/core-js/modules/es.object.prevent-extensions.js":
/*!************************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.object.prevent-extensions.js ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var isObject = __webpack_require__(/*! ../internals/is-object */ "../../node_modules/core-js/internals/is-object.js");

var onFreeze = __webpack_require__(/*! ../internals/internal-metadata */ "../../node_modules/core-js/internals/internal-metadata.js").onFreeze;

var FREEZING = __webpack_require__(/*! ../internals/freezing */ "../../node_modules/core-js/internals/freezing.js");

var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");

var nativePreventExtensions = Object.preventExtensions;
var FAILS_ON_PRIMITIVES = fails(function () {
  nativePreventExtensions(1);
}); // `Object.preventExtensions` method
// https://tc39.github.io/ecma262/#sec-object.preventextensions

$({
  target: 'Object',
  stat: true,
  forced: FAILS_ON_PRIMITIVES,
  sham: !FREEZING
}, {
  preventExtensions: function () {
    function preventExtensions(it) {
      return nativePreventExtensions && isObject(it) ? nativePreventExtensions(onFreeze(it)) : it;
    }

    return preventExtensions;
  }()
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.object.seal.js":
/*!**********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.object.seal.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var isObject = __webpack_require__(/*! ../internals/is-object */ "../../node_modules/core-js/internals/is-object.js");

var onFreeze = __webpack_require__(/*! ../internals/internal-metadata */ "../../node_modules/core-js/internals/internal-metadata.js").onFreeze;

var FREEZING = __webpack_require__(/*! ../internals/freezing */ "../../node_modules/core-js/internals/freezing.js");

var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");

var nativeSeal = Object.seal;
var FAILS_ON_PRIMITIVES = fails(function () {
  nativeSeal(1);
}); // `Object.seal` method
// https://tc39.github.io/ecma262/#sec-object.seal

$({
  target: 'Object',
  stat: true,
  forced: FAILS_ON_PRIMITIVES,
  sham: !FREEZING
}, {
  seal: function () {
    function seal(it) {
      return nativeSeal && isObject(it) ? nativeSeal(onFreeze(it)) : it;
    }

    return seal;
  }()
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.object.set-prototype-of.js":
/*!**********************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.object.set-prototype-of.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var setPrototypeOf = __webpack_require__(/*! ../internals/object-set-prototype-of */ "../../node_modules/core-js/internals/object-set-prototype-of.js"); // `Object.setPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.setprototypeof


$({
  target: 'Object',
  stat: true
}, {
  setPrototypeOf: setPrototypeOf
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.object.to-string.js":
/*!***************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.object.to-string.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var redefine = __webpack_require__(/*! ../internals/redefine */ "../../node_modules/core-js/internals/redefine.js");

var toString = __webpack_require__(/*! ../internals/object-to-string */ "../../node_modules/core-js/internals/object-to-string.js");

var ObjectPrototype = Object.prototype; // `Object.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-object.prototype.tostring

if (toString !== ObjectPrototype.toString) {
  redefine(ObjectPrototype, 'toString', toString, {
    unsafe: true
  });
}

/***/ }),

/***/ "../../node_modules/core-js/modules/es.object.values.js":
/*!************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.object.values.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var $values = __webpack_require__(/*! ../internals/object-to-array */ "../../node_modules/core-js/internals/object-to-array.js").values; // `Object.values` method
// https://tc39.github.io/ecma262/#sec-object.values


$({
  target: 'Object',
  stat: true
}, {
  values: function () {
    function values(O) {
      return $values(O);
    }

    return values;
  }()
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.parse-int.js":
/*!********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.parse-int.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var parseIntImplementation = __webpack_require__(/*! ../internals/parse-int */ "../../node_modules/core-js/internals/parse-int.js"); // `parseInt` method
// https://tc39.github.io/ecma262/#sec-parseint-string-radix


$({
  global: true,
  forced: parseInt != parseIntImplementation
}, {
  parseInt: parseIntImplementation
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.promise.finally.js":
/*!**************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.promise.finally.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "../../node_modules/core-js/internals/is-pure.js");

var NativePromise = __webpack_require__(/*! ../internals/native-promise-constructor */ "../../node_modules/core-js/internals/native-promise-constructor.js");

var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "../../node_modules/core-js/internals/get-built-in.js");

var speciesConstructor = __webpack_require__(/*! ../internals/species-constructor */ "../../node_modules/core-js/internals/species-constructor.js");

var promiseResolve = __webpack_require__(/*! ../internals/promise-resolve */ "../../node_modules/core-js/internals/promise-resolve.js");

var redefine = __webpack_require__(/*! ../internals/redefine */ "../../node_modules/core-js/internals/redefine.js"); // `Promise.prototype.finally` method
// https://tc39.github.io/ecma262/#sec-promise.prototype.finally


$({
  target: 'Promise',
  proto: true,
  real: true
}, {
  'finally': function () {
    function _finally(onFinally) {
      var C = speciesConstructor(this, getBuiltIn('Promise'));
      var isFunction = typeof onFinally == 'function';
      return this.then(isFunction ? function (x) {
        return promiseResolve(C, onFinally()).then(function () {
          return x;
        });
      } : onFinally, isFunction ? function (e) {
        return promiseResolve(C, onFinally()).then(function () {
          throw e;
        });
      } : onFinally);
    }

    return _finally;
  }()
}); // patch native Promise.prototype for native async functions

if (!IS_PURE && typeof NativePromise == 'function' && !NativePromise.prototype['finally']) {
  redefine(NativePromise.prototype, 'finally', getBuiltIn('Promise').prototype['finally']);
}

/***/ }),

/***/ "../../node_modules/core-js/modules/es.promise.js":
/*!******************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.promise.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "../../node_modules/core-js/internals/is-pure.js");

var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");

var path = __webpack_require__(/*! ../internals/path */ "../../node_modules/core-js/internals/path.js");

var NativePromise = __webpack_require__(/*! ../internals/native-promise-constructor */ "../../node_modules/core-js/internals/native-promise-constructor.js");

var redefine = __webpack_require__(/*! ../internals/redefine */ "../../node_modules/core-js/internals/redefine.js");

var redefineAll = __webpack_require__(/*! ../internals/redefine-all */ "../../node_modules/core-js/internals/redefine-all.js");

var setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ "../../node_modules/core-js/internals/set-to-string-tag.js");

var setSpecies = __webpack_require__(/*! ../internals/set-species */ "../../node_modules/core-js/internals/set-species.js");

var isObject = __webpack_require__(/*! ../internals/is-object */ "../../node_modules/core-js/internals/is-object.js");

var aFunction = __webpack_require__(/*! ../internals/a-function */ "../../node_modules/core-js/internals/a-function.js");

var anInstance = __webpack_require__(/*! ../internals/an-instance */ "../../node_modules/core-js/internals/an-instance.js");

var classof = __webpack_require__(/*! ../internals/classof-raw */ "../../node_modules/core-js/internals/classof-raw.js");

var iterate = __webpack_require__(/*! ../internals/iterate */ "../../node_modules/core-js/internals/iterate.js");

var checkCorrectnessOfIteration = __webpack_require__(/*! ../internals/check-correctness-of-iteration */ "../../node_modules/core-js/internals/check-correctness-of-iteration.js");

var speciesConstructor = __webpack_require__(/*! ../internals/species-constructor */ "../../node_modules/core-js/internals/species-constructor.js");

var task = __webpack_require__(/*! ../internals/task */ "../../node_modules/core-js/internals/task.js").set;

var microtask = __webpack_require__(/*! ../internals/microtask */ "../../node_modules/core-js/internals/microtask.js");

var promiseResolve = __webpack_require__(/*! ../internals/promise-resolve */ "../../node_modules/core-js/internals/promise-resolve.js");

var hostReportErrors = __webpack_require__(/*! ../internals/host-report-errors */ "../../node_modules/core-js/internals/host-report-errors.js");

var newPromiseCapabilityModule = __webpack_require__(/*! ../internals/new-promise-capability */ "../../node_modules/core-js/internals/new-promise-capability.js");

var perform = __webpack_require__(/*! ../internals/perform */ "../../node_modules/core-js/internals/perform.js");

var userAgent = __webpack_require__(/*! ../internals/user-agent */ "../../node_modules/core-js/internals/user-agent.js");

var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "../../node_modules/core-js/internals/internal-state.js");

var isForced = __webpack_require__(/*! ../internals/is-forced */ "../../node_modules/core-js/internals/is-forced.js");

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../node_modules/core-js/internals/well-known-symbol.js");

var SPECIES = wellKnownSymbol('species');
var PROMISE = 'Promise';
var getInternalState = InternalStateModule.get;
var setInternalState = InternalStateModule.set;
var getInternalPromiseState = InternalStateModule.getterFor(PROMISE);
var PromiseConstructor = NativePromise;
var TypeError = global.TypeError;
var document = global.document;
var process = global.process;
var $fetch = global.fetch;
var versions = process && process.versions;
var v8 = versions && versions.v8 || '';
var newPromiseCapability = newPromiseCapabilityModule.f;
var newGenericPromiseCapability = newPromiseCapability;
var IS_NODE = classof(process) == 'process';
var DISPATCH_EVENT = !!(document && document.createEvent && global.dispatchEvent);
var UNHANDLED_REJECTION = 'unhandledrejection';
var REJECTION_HANDLED = 'rejectionhandled';
var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;
var HANDLED = 1;
var UNHANDLED = 2;
var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;
var FORCED = isForced(PROMISE, function () {
  // correct subclassing with @@species support
  var promise = PromiseConstructor.resolve(1);

  var empty = function empty() {
    /* empty */
  };

  var FakePromise = (promise.constructor = {})[SPECIES] = function (exec) {
    exec(empty, empty);
  }; // unhandled rejections tracking support, NodeJS Promise without it fails @@species test


  return !((IS_NODE || typeof PromiseRejectionEvent == 'function') && (!IS_PURE || promise['finally']) && promise.then(empty) instanceof FakePromise // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
  // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
  // we can't detect it synchronously, so just check versions
  && v8.indexOf('6.6') !== 0 && userAgent.indexOf('Chrome/66') === -1);
});
var INCORRECT_ITERATION = FORCED || !checkCorrectnessOfIteration(function (iterable) {
  PromiseConstructor.all(iterable)['catch'](function () {
    /* empty */
  });
}); // helpers

var isThenable = function isThenable(it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};

var notify = function notify(promise, state, isReject) {
  if (state.notified) return;
  state.notified = true;
  var chain = state.reactions;
  microtask(function () {
    var value = state.value;
    var ok = state.state == FULFILLED;
    var index = 0; // variable length - can't use forEach

    while (chain.length > index) {
      var reaction = chain[index++];
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;

      try {
        if (handler) {
          if (!ok) {
            if (state.rejection === UNHANDLED) onHandleUnhandled(promise, state);
            state.rejection = HANDLED;
          }

          if (handler === true) result = value;else {
            if (domain) domain.enter();
            result = handler(value); // can throw

            if (domain) {
              domain.exit();
              exited = true;
            }
          }

          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (error) {
        if (domain && !exited) domain.exit();
        reject(error);
      }
    }

    state.reactions = [];
    state.notified = false;
    if (isReject && !state.rejection) onUnhandled(promise, state);
  });
};

var dispatchEvent = function dispatchEvent(name, promise, reason) {
  var event, handler;

  if (DISPATCH_EVENT) {
    event = document.createEvent('Event');
    event.promise = promise;
    event.reason = reason;
    event.initEvent(name, false, true);
    global.dispatchEvent(event);
  } else event = {
    promise: promise,
    reason: reason
  };

  if (handler = global['on' + name]) handler(event);else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
};

var onUnhandled = function onUnhandled(promise, state) {
  task.call(global, function () {
    var value = state.value;
    var IS_UNHANDLED = isUnhandled(state);
    var result;

    if (IS_UNHANDLED) {
      result = perform(function () {
        if (IS_NODE) {
          process.emit('unhandledRejection', value, promise);
        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
      }); // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should

      state.rejection = IS_NODE || isUnhandled(state) ? UNHANDLED : HANDLED;
      if (result.error) throw result.value;
    }
  });
};

var isUnhandled = function isUnhandled(state) {
  return state.rejection !== HANDLED && !state.parent;
};

var onHandleUnhandled = function onHandleUnhandled(promise, state) {
  task.call(global, function () {
    if (IS_NODE) {
      process.emit('rejectionHandled', promise);
    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
  });
};

var bind = function bind(fn, promise, state, unwrap) {
  return function (value) {
    fn(promise, state, value, unwrap);
  };
};

var internalReject = function internalReject(promise, state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  state.value = value;
  state.state = REJECTED;
  notify(promise, state, true);
};

var internalResolve = function internalResolve(promise, state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;

  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    var then = isThenable(value);

    if (then) {
      microtask(function () {
        var wrapper = {
          done: false
        };

        try {
          then.call(value, bind(internalResolve, promise, wrapper, state), bind(internalReject, promise, wrapper, state));
        } catch (error) {
          internalReject(promise, wrapper, error, state);
        }
      });
    } else {
      state.value = value;
      state.state = FULFILLED;
      notify(promise, state, false);
    }
  } catch (error) {
    internalReject(promise, {
      done: false
    }, error, state);
  }
}; // constructor polyfill


if (FORCED) {
  // 25.4.3.1 Promise(executor)
  PromiseConstructor = function () {
    function Promise(executor) {
      anInstance(this, PromiseConstructor, PROMISE);
      aFunction(executor);
      Internal.call(this);
      var state = getInternalState(this);

      try {
        executor(bind(internalResolve, this, state), bind(internalReject, this, state));
      } catch (error) {
        internalReject(this, state, error);
      }
    }

    return Promise;
  }(); // eslint-disable-next-line no-unused-vars


  Internal = function () {
    function Promise(executor) {
      setInternalState(this, {
        type: PROMISE,
        done: false,
        notified: false,
        parent: false,
        reactions: [],
        rejection: false,
        state: PENDING,
        value: undefined
      });
    }

    return Promise;
  }();

  Internal.prototype = redefineAll(PromiseConstructor.prototype, {
    // `Promise.prototype.then` method
    // https://tc39.github.io/ecma262/#sec-promise.prototype.then
    then: function () {
      function then(onFulfilled, onRejected) {
        var state = getInternalPromiseState(this);
        var reaction = newPromiseCapability(speciesConstructor(this, PromiseConstructor));
        reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
        reaction.fail = typeof onRejected == 'function' && onRejected;
        reaction.domain = IS_NODE ? process.domain : undefined;
        state.parent = true;
        state.reactions.push(reaction);
        if (state.state != PENDING) notify(this, state, false);
        return reaction.promise;
      }

      return then;
    }(),
    // `Promise.prototype.catch` method
    // https://tc39.github.io/ecma262/#sec-promise.prototype.catch
    'catch': function () {
      function _catch(onRejected) {
        return this.then(undefined, onRejected);
      }

      return _catch;
    }()
  });

  OwnPromiseCapability = function OwnPromiseCapability() {
    var promise = new Internal();
    var state = getInternalState(promise);
    this.promise = promise;
    this.resolve = bind(internalResolve, promise, state);
    this.reject = bind(internalReject, promise, state);
  };

  newPromiseCapabilityModule.f = newPromiseCapability = function newPromiseCapability(C) {
    return C === PromiseConstructor || C === PromiseWrapper ? new OwnPromiseCapability(C) : newGenericPromiseCapability(C);
  };

  if (!IS_PURE && typeof NativePromise == 'function') {
    nativeThen = NativePromise.prototype.then; // wrap native Promise#then for native async functions

    redefine(NativePromise.prototype, 'then', function () {
      function then(onFulfilled, onRejected) {
        var that = this;
        return new PromiseConstructor(function (resolve, reject) {
          nativeThen.call(that, resolve, reject);
        }).then(onFulfilled, onRejected); // https://github.com/zloirock/core-js/issues/640
      }

      return then;
    }(), {
      unsafe: true
    }); // wrap fetch result

    if (typeof $fetch == 'function') $({
      global: true,
      enumerable: true,
      forced: true
    }, {
      // eslint-disable-next-line no-unused-vars
      fetch: function () {
        function fetch(input) {
          return promiseResolve(PromiseConstructor, $fetch.apply(global, arguments));
        }

        return fetch;
      }()
    });
  }
}

$({
  global: true,
  wrap: true,
  forced: FORCED
}, {
  Promise: PromiseConstructor
});
setToStringTag(PromiseConstructor, PROMISE, false, true);
setSpecies(PROMISE);
PromiseWrapper = path[PROMISE]; // statics

$({
  target: PROMISE,
  stat: true,
  forced: FORCED
}, {
  // `Promise.reject` method
  // https://tc39.github.io/ecma262/#sec-promise.reject
  reject: function () {
    function reject(r) {
      var capability = newPromiseCapability(this);
      capability.reject.call(undefined, r);
      return capability.promise;
    }

    return reject;
  }()
});
$({
  target: PROMISE,
  stat: true,
  forced: IS_PURE || FORCED
}, {
  // `Promise.resolve` method
  // https://tc39.github.io/ecma262/#sec-promise.resolve
  resolve: function () {
    function resolve(x) {
      return promiseResolve(IS_PURE && this === PromiseWrapper ? PromiseConstructor : this, x);
    }

    return resolve;
  }()
});
$({
  target: PROMISE,
  stat: true,
  forced: INCORRECT_ITERATION
}, {
  // `Promise.all` method
  // https://tc39.github.io/ecma262/#sec-promise.all
  all: function () {
    function all(iterable) {
      var C = this;
      var capability = newPromiseCapability(C);
      var resolve = capability.resolve;
      var reject = capability.reject;
      var result = perform(function () {
        var $promiseResolve = aFunction(C.resolve);
        var values = [];
        var counter = 0;
        var remaining = 1;
        iterate(iterable, function (promise) {
          var index = counter++;
          var alreadyCalled = false;
          values.push(undefined);
          remaining++;
          $promiseResolve.call(C, promise).then(function (value) {
            if (alreadyCalled) return;
            alreadyCalled = true;
            values[index] = value;
            --remaining || resolve(values);
          }, reject);
        });
        --remaining || resolve(values);
      });
      if (result.error) reject(result.value);
      return capability.promise;
    }

    return all;
  }(),
  // `Promise.race` method
  // https://tc39.github.io/ecma262/#sec-promise.race
  race: function () {
    function race(iterable) {
      var C = this;
      var capability = newPromiseCapability(C);
      var reject = capability.reject;
      var result = perform(function () {
        var $promiseResolve = aFunction(C.resolve);
        iterate(iterable, function (promise) {
          $promiseResolve.call(C, promise).then(capability.resolve, reject);
        });
      });
      if (result.error) reject(result.value);
      return capability.promise;
    }

    return race;
  }()
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.reflect.apply.js":
/*!************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.reflect.apply.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "../../node_modules/core-js/internals/get-built-in.js");

var aFunction = __webpack_require__(/*! ../internals/a-function */ "../../node_modules/core-js/internals/a-function.js");

var anObject = __webpack_require__(/*! ../internals/an-object */ "../../node_modules/core-js/internals/an-object.js");

var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");

var nativeApply = getBuiltIn('Reflect', 'apply');
var functionApply = Function.apply; // MS Edge argumentsList argument is optional

var OPTIONAL_ARGUMENTS_LIST = !fails(function () {
  nativeApply(function () {
    /* empty */
  });
}); // `Reflect.apply` method
// https://tc39.github.io/ecma262/#sec-reflect.apply

$({
  target: 'Reflect',
  stat: true,
  forced: OPTIONAL_ARGUMENTS_LIST
}, {
  apply: function () {
    function apply(target, thisArgument, argumentsList) {
      aFunction(target);
      anObject(argumentsList);
      return nativeApply ? nativeApply(target, thisArgument, argumentsList) : functionApply.call(target, thisArgument, argumentsList);
    }

    return apply;
  }()
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.reflect.construct.js":
/*!****************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.reflect.construct.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "../../node_modules/core-js/internals/get-built-in.js");

var aFunction = __webpack_require__(/*! ../internals/a-function */ "../../node_modules/core-js/internals/a-function.js");

var anObject = __webpack_require__(/*! ../internals/an-object */ "../../node_modules/core-js/internals/an-object.js");

var isObject = __webpack_require__(/*! ../internals/is-object */ "../../node_modules/core-js/internals/is-object.js");

var create = __webpack_require__(/*! ../internals/object-create */ "../../node_modules/core-js/internals/object-create.js");

var bind = __webpack_require__(/*! ../internals/function-bind */ "../../node_modules/core-js/internals/function-bind.js");

var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");

var nativeConstruct = getBuiltIn('Reflect', 'construct'); // `Reflect.construct` method
// https://tc39.github.io/ecma262/#sec-reflect.construct
// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it

var NEW_TARGET_BUG = fails(function () {
  function F() {
    /* empty */
  }

  return !(nativeConstruct(function () {
    /* empty */
  }, [], F) instanceof F);
});
var ARGS_BUG = !fails(function () {
  nativeConstruct(function () {
    /* empty */
  });
});
var FORCED = NEW_TARGET_BUG || ARGS_BUG;
$({
  target: 'Reflect',
  stat: true,
  forced: FORCED,
  sham: FORCED
}, {
  construct: function () {
    function construct(Target, args
    /* , newTarget */
    ) {
      aFunction(Target);
      anObject(args);
      var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
      if (ARGS_BUG && !NEW_TARGET_BUG) return nativeConstruct(Target, args, newTarget);

      if (Target == newTarget) {
        // w/o altered newTarget, optimization for 0-4 arguments
        switch (args.length) {
          case 0:
            return new Target();

          case 1:
            return new Target(args[0]);

          case 2:
            return new Target(args[0], args[1]);

          case 3:
            return new Target(args[0], args[1], args[2]);

          case 4:
            return new Target(args[0], args[1], args[2], args[3]);
        } // w/o altered newTarget, lot of arguments case


        var $args = [null];
        $args.push.apply($args, args);
        return new (bind.apply(Target, $args))();
      } // with altered newTarget, not support built-in constructors


      var proto = newTarget.prototype;
      var instance = create(isObject(proto) ? proto : Object.prototype);
      var result = Function.apply.call(Target, instance, args);
      return isObject(result) ? result : instance;
    }

    return construct;
  }()
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.reflect.define-property.js":
/*!**********************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.reflect.define-property.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../node_modules/core-js/internals/descriptors.js");

var anObject = __webpack_require__(/*! ../internals/an-object */ "../../node_modules/core-js/internals/an-object.js");

var toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ "../../node_modules/core-js/internals/to-primitive.js");

var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "../../node_modules/core-js/internals/object-define-property.js");

var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js"); // MS Edge has broken Reflect.defineProperty - throwing instead of returning false


var ERROR_INSTEAD_OF_FALSE = fails(function () {
  // eslint-disable-next-line no-undef
  Reflect.defineProperty(definePropertyModule.f({}, 1, {
    value: 1
  }), 1, {
    value: 2
  });
}); // `Reflect.defineProperty` method
// https://tc39.github.io/ecma262/#sec-reflect.defineproperty

$({
  target: 'Reflect',
  stat: true,
  forced: ERROR_INSTEAD_OF_FALSE,
  sham: !DESCRIPTORS
}, {
  defineProperty: function () {
    function defineProperty(target, propertyKey, attributes) {
      anObject(target);
      var key = toPrimitive(propertyKey, true);
      anObject(attributes);

      try {
        definePropertyModule.f(target, key, attributes);
        return true;
      } catch (error) {
        return false;
      }
    }

    return defineProperty;
  }()
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.reflect.delete-property.js":
/*!**********************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.reflect.delete-property.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var anObject = __webpack_require__(/*! ../internals/an-object */ "../../node_modules/core-js/internals/an-object.js");

var getOwnPropertyDescriptor = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "../../node_modules/core-js/internals/object-get-own-property-descriptor.js").f; // `Reflect.deleteProperty` method
// https://tc39.github.io/ecma262/#sec-reflect.deleteproperty


$({
  target: 'Reflect',
  stat: true
}, {
  deleteProperty: function () {
    function deleteProperty(target, propertyKey) {
      var descriptor = getOwnPropertyDescriptor(anObject(target), propertyKey);
      return descriptor && !descriptor.configurable ? false : delete target[propertyKey];
    }

    return deleteProperty;
  }()
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.reflect.get-own-property-descriptor.js":
/*!**********************************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.reflect.get-own-property-descriptor.js ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../node_modules/core-js/internals/descriptors.js");

var anObject = __webpack_require__(/*! ../internals/an-object */ "../../node_modules/core-js/internals/an-object.js");

var getOwnPropertyDescriptorModule = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "../../node_modules/core-js/internals/object-get-own-property-descriptor.js"); // `Reflect.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-reflect.getownpropertydescriptor


$({
  target: 'Reflect',
  stat: true,
  sham: !DESCRIPTORS
}, {
  getOwnPropertyDescriptor: function () {
    function getOwnPropertyDescriptor(target, propertyKey) {
      return getOwnPropertyDescriptorModule.f(anObject(target), propertyKey);
    }

    return getOwnPropertyDescriptor;
  }()
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.reflect.get-prototype-of.js":
/*!***********************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.reflect.get-prototype-of.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var anObject = __webpack_require__(/*! ../internals/an-object */ "../../node_modules/core-js/internals/an-object.js");

var objectGetPrototypeOf = __webpack_require__(/*! ../internals/object-get-prototype-of */ "../../node_modules/core-js/internals/object-get-prototype-of.js");

var CORRECT_PROTOTYPE_GETTER = __webpack_require__(/*! ../internals/correct-prototype-getter */ "../../node_modules/core-js/internals/correct-prototype-getter.js"); // `Reflect.getPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-reflect.getprototypeof


$({
  target: 'Reflect',
  stat: true,
  sham: !CORRECT_PROTOTYPE_GETTER
}, {
  getPrototypeOf: function () {
    function getPrototypeOf(target) {
      return objectGetPrototypeOf(anObject(target));
    }

    return getPrototypeOf;
  }()
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.reflect.get.js":
/*!**********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.reflect.get.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var isObject = __webpack_require__(/*! ../internals/is-object */ "../../node_modules/core-js/internals/is-object.js");

var anObject = __webpack_require__(/*! ../internals/an-object */ "../../node_modules/core-js/internals/an-object.js");

var has = __webpack_require__(/*! ../internals/has */ "../../node_modules/core-js/internals/has.js");

var getOwnPropertyDescriptorModule = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "../../node_modules/core-js/internals/object-get-own-property-descriptor.js");

var getPrototypeOf = __webpack_require__(/*! ../internals/object-get-prototype-of */ "../../node_modules/core-js/internals/object-get-prototype-of.js"); // `Reflect.get` method
// https://tc39.github.io/ecma262/#sec-reflect.get


function get(target, propertyKey
/* , receiver */
) {
  var receiver = arguments.length < 3 ? target : arguments[2];
  var descriptor, prototype;
  if (anObject(target) === receiver) return target[propertyKey];
  if (descriptor = getOwnPropertyDescriptorModule.f(target, propertyKey)) return has(descriptor, 'value') ? descriptor.value : descriptor.get === undefined ? undefined : descriptor.get.call(receiver);
  if (isObject(prototype = getPrototypeOf(target))) return get(prototype, propertyKey, receiver);
}

$({
  target: 'Reflect',
  stat: true
}, {
  get: get
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.reflect.has.js":
/*!**********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.reflect.has.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js"); // `Reflect.has` method
// https://tc39.github.io/ecma262/#sec-reflect.has


$({
  target: 'Reflect',
  stat: true
}, {
  has: function () {
    function has(target, propertyKey) {
      return propertyKey in target;
    }

    return has;
  }()
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.reflect.is-extensible.js":
/*!********************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.reflect.is-extensible.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var anObject = __webpack_require__(/*! ../internals/an-object */ "../../node_modules/core-js/internals/an-object.js");

var objectIsExtensible = Object.isExtensible; // `Reflect.isExtensible` method
// https://tc39.github.io/ecma262/#sec-reflect.isextensible

$({
  target: 'Reflect',
  stat: true
}, {
  isExtensible: function () {
    function isExtensible(target) {
      anObject(target);
      return objectIsExtensible ? objectIsExtensible(target) : true;
    }

    return isExtensible;
  }()
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.reflect.own-keys.js":
/*!***************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.reflect.own-keys.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var ownKeys = __webpack_require__(/*! ../internals/own-keys */ "../../node_modules/core-js/internals/own-keys.js"); // `Reflect.ownKeys` method
// https://tc39.github.io/ecma262/#sec-reflect.ownkeys


$({
  target: 'Reflect',
  stat: true
}, {
  ownKeys: ownKeys
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.reflect.prevent-extensions.js":
/*!*************************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.reflect.prevent-extensions.js ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "../../node_modules/core-js/internals/get-built-in.js");

var anObject = __webpack_require__(/*! ../internals/an-object */ "../../node_modules/core-js/internals/an-object.js");

var FREEZING = __webpack_require__(/*! ../internals/freezing */ "../../node_modules/core-js/internals/freezing.js"); // `Reflect.preventExtensions` method
// https://tc39.github.io/ecma262/#sec-reflect.preventextensions


$({
  target: 'Reflect',
  stat: true,
  sham: !FREEZING
}, {
  preventExtensions: function () {
    function preventExtensions(target) {
      anObject(target);

      try {
        var objectPreventExtensions = getBuiltIn('Object', 'preventExtensions');
        if (objectPreventExtensions) objectPreventExtensions(target);
        return true;
      } catch (error) {
        return false;
      }
    }

    return preventExtensions;
  }()
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.reflect.set-prototype-of.js":
/*!***********************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.reflect.set-prototype-of.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var anObject = __webpack_require__(/*! ../internals/an-object */ "../../node_modules/core-js/internals/an-object.js");

var aPossiblePrototype = __webpack_require__(/*! ../internals/a-possible-prototype */ "../../node_modules/core-js/internals/a-possible-prototype.js");

var objectSetPrototypeOf = __webpack_require__(/*! ../internals/object-set-prototype-of */ "../../node_modules/core-js/internals/object-set-prototype-of.js"); // `Reflect.setPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-reflect.setprototypeof


if (objectSetPrototypeOf) $({
  target: 'Reflect',
  stat: true
}, {
  setPrototypeOf: function () {
    function setPrototypeOf(target, proto) {
      anObject(target);
      aPossiblePrototype(proto);

      try {
        objectSetPrototypeOf(target, proto);
        return true;
      } catch (error) {
        return false;
      }
    }

    return setPrototypeOf;
  }()
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.reflect.set.js":
/*!**********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.reflect.set.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var anObject = __webpack_require__(/*! ../internals/an-object */ "../../node_modules/core-js/internals/an-object.js");

var isObject = __webpack_require__(/*! ../internals/is-object */ "../../node_modules/core-js/internals/is-object.js");

var has = __webpack_require__(/*! ../internals/has */ "../../node_modules/core-js/internals/has.js");

var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "../../node_modules/core-js/internals/object-define-property.js");

var getOwnPropertyDescriptorModule = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "../../node_modules/core-js/internals/object-get-own-property-descriptor.js");

var getPrototypeOf = __webpack_require__(/*! ../internals/object-get-prototype-of */ "../../node_modules/core-js/internals/object-get-prototype-of.js");

var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "../../node_modules/core-js/internals/create-property-descriptor.js"); // `Reflect.set` method
// https://tc39.github.io/ecma262/#sec-reflect.set


function set(target, propertyKey, V
/* , receiver */
) {
  var receiver = arguments.length < 4 ? target : arguments[3];
  var ownDescriptor = getOwnPropertyDescriptorModule.f(anObject(target), propertyKey);
  var existingDescriptor, prototype;

  if (!ownDescriptor) {
    if (isObject(prototype = getPrototypeOf(target))) {
      return set(prototype, propertyKey, V, receiver);
    }

    ownDescriptor = createPropertyDescriptor(0);
  }

  if (has(ownDescriptor, 'value')) {
    if (ownDescriptor.writable === false || !isObject(receiver)) return false;

    if (existingDescriptor = getOwnPropertyDescriptorModule.f(receiver, propertyKey)) {
      if (existingDescriptor.get || existingDescriptor.set || existingDescriptor.writable === false) return false;
      existingDescriptor.value = V;
      definePropertyModule.f(receiver, propertyKey, existingDescriptor);
    } else definePropertyModule.f(receiver, propertyKey, createPropertyDescriptor(0, V));

    return true;
  }

  return ownDescriptor.set === undefined ? false : (ownDescriptor.set.call(receiver, V), true);
}

$({
  target: 'Reflect',
  stat: true
}, {
  set: set
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.regexp.constructor.js":
/*!*****************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.regexp.constructor.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../node_modules/core-js/internals/descriptors.js");

var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");

var isForced = __webpack_require__(/*! ../internals/is-forced */ "../../node_modules/core-js/internals/is-forced.js");

var inheritIfRequired = __webpack_require__(/*! ../internals/inherit-if-required */ "../../node_modules/core-js/internals/inherit-if-required.js");

var defineProperty = __webpack_require__(/*! ../internals/object-define-property */ "../../node_modules/core-js/internals/object-define-property.js").f;

var getOwnPropertyNames = __webpack_require__(/*! ../internals/object-get-own-property-names */ "../../node_modules/core-js/internals/object-get-own-property-names.js").f;

var isRegExp = __webpack_require__(/*! ../internals/is-regexp */ "../../node_modules/core-js/internals/is-regexp.js");

var getFlags = __webpack_require__(/*! ../internals/regexp-flags */ "../../node_modules/core-js/internals/regexp-flags.js");

var redefine = __webpack_require__(/*! ../internals/redefine */ "../../node_modules/core-js/internals/redefine.js");

var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");

var setSpecies = __webpack_require__(/*! ../internals/set-species */ "../../node_modules/core-js/internals/set-species.js");

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../node_modules/core-js/internals/well-known-symbol.js");

var MATCH = wellKnownSymbol('match');
var NativeRegExp = global.RegExp;
var RegExpPrototype = NativeRegExp.prototype;
var re1 = /a/g;
var re2 = /a/g; // "new" should create a new object, old webkit bug

var CORRECT_NEW = new NativeRegExp(re1) !== re1;
var FORCED = DESCRIPTORS && isForced('RegExp', !CORRECT_NEW || fails(function () {
  re2[MATCH] = false; // RegExp constructor can alter flags and IsRegExp works correct with @@match

  return NativeRegExp(re1) != re1 || NativeRegExp(re2) == re2 || NativeRegExp(re1, 'i') != '/a/i';
})); // `RegExp` constructor
// https://tc39.github.io/ecma262/#sec-regexp-constructor

if (FORCED) {
  var RegExpWrapper = function () {
    function RegExp(pattern, flags) {
      var thisIsRegExp = this instanceof RegExpWrapper;
      var patternIsRegExp = isRegExp(pattern);
      var flagsAreUndefined = flags === undefined;
      return !thisIsRegExp && patternIsRegExp && pattern.constructor === RegExpWrapper && flagsAreUndefined ? pattern : inheritIfRequired(CORRECT_NEW ? new NativeRegExp(patternIsRegExp && !flagsAreUndefined ? pattern.source : pattern, flags) : NativeRegExp((patternIsRegExp = pattern instanceof RegExpWrapper) ? pattern.source : pattern, patternIsRegExp && flagsAreUndefined ? getFlags.call(pattern) : flags), thisIsRegExp ? this : RegExpPrototype, RegExpWrapper);
    }

    return RegExp;
  }();

  var proxy = function proxy(key) {
    key in RegExpWrapper || defineProperty(RegExpWrapper, key, {
      configurable: true,
      get: function () {
        function get() {
          return NativeRegExp[key];
        }

        return get;
      }(),
      set: function () {
        function set(it) {
          NativeRegExp[key] = it;
        }

        return set;
      }()
    });
  };

  var keys = getOwnPropertyNames(NativeRegExp);
  var index = 0;

  while (keys.length > index) {
    proxy(keys[index++]);
  }

  RegExpPrototype.constructor = RegExpWrapper;
  RegExpWrapper.prototype = RegExpPrototype;
  redefine(global, 'RegExp', RegExpWrapper);
} // https://tc39.github.io/ecma262/#sec-get-regexp-@@species


setSpecies('RegExp');

/***/ }),

/***/ "../../node_modules/core-js/modules/es.regexp.exec.js":
/*!**********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.regexp.exec.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var exec = __webpack_require__(/*! ../internals/regexp-exec */ "../../node_modules/core-js/internals/regexp-exec.js");

$({
  target: 'RegExp',
  proto: true,
  forced: /./.exec !== exec
}, {
  exec: exec
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.regexp.flags.js":
/*!***********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.regexp.flags.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../node_modules/core-js/internals/descriptors.js");

var objectDefinePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "../../node_modules/core-js/internals/object-define-property.js");

var regExpFlags = __webpack_require__(/*! ../internals/regexp-flags */ "../../node_modules/core-js/internals/regexp-flags.js"); // `RegExp.prototype.flags` getter
// https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags


if (DESCRIPTORS && /./g.flags != 'g') {
  objectDefinePropertyModule.f(RegExp.prototype, 'flags', {
    configurable: true,
    get: regExpFlags
  });
}

/***/ }),

/***/ "../../node_modules/core-js/modules/es.regexp.to-string.js":
/*!***************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.regexp.to-string.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var redefine = __webpack_require__(/*! ../internals/redefine */ "../../node_modules/core-js/internals/redefine.js");

var anObject = __webpack_require__(/*! ../internals/an-object */ "../../node_modules/core-js/internals/an-object.js");

var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");

var flags = __webpack_require__(/*! ../internals/regexp-flags */ "../../node_modules/core-js/internals/regexp-flags.js");

var TO_STRING = 'toString';
var RegExpPrototype = RegExp.prototype;
var nativeToString = RegExpPrototype[TO_STRING];
var NOT_GENERIC = fails(function () {
  return nativeToString.call({
    source: 'a',
    flags: 'b'
  }) != '/a/b';
}); // FF44- RegExp#toString has a wrong name

var INCORRECT_NAME = nativeToString.name != TO_STRING; // `RegExp.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-regexp.prototype.tostring

if (NOT_GENERIC || INCORRECT_NAME) {
  redefine(RegExp.prototype, TO_STRING, function () {
    function toString() {
      var R = anObject(this);
      var p = String(R.source);
      var rf = R.flags;
      var f = String(rf === undefined && R instanceof RegExp && !('flags' in RegExpPrototype) ? flags.call(R) : rf);
      return '/' + p + '/' + f;
    }

    return toString;
  }(), {
    unsafe: true
  });
}

/***/ }),

/***/ "../../node_modules/core-js/modules/es.set.js":
/*!**************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.set.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var collection = __webpack_require__(/*! ../internals/collection */ "../../node_modules/core-js/internals/collection.js");

var collectionStrong = __webpack_require__(/*! ../internals/collection-strong */ "../../node_modules/core-js/internals/collection-strong.js"); // `Set` constructor
// https://tc39.github.io/ecma262/#sec-set-objects


module.exports = collection('Set', function (get) {
  return function () {
    function Set() {
      return get(this, arguments.length ? arguments[0] : undefined);
    }

    return Set;
  }();
}, collectionStrong);

/***/ }),

/***/ "../../node_modules/core-js/modules/es.string.anchor.js":
/*!************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.string.anchor.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var createHTML = __webpack_require__(/*! ../internals/create-html */ "../../node_modules/core-js/internals/create-html.js");

var forcedStringHTMLMethod = __webpack_require__(/*! ../internals/forced-string-html-method */ "../../node_modules/core-js/internals/forced-string-html-method.js"); // `String.prototype.anchor` method
// https://tc39.github.io/ecma262/#sec-string.prototype.anchor


$({
  target: 'String',
  proto: true,
  forced: forcedStringHTMLMethod('anchor')
}, {
  anchor: function () {
    function anchor(name) {
      return createHTML(this, 'a', 'name', name);
    }

    return anchor;
  }()
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.string.big.js":
/*!*********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.string.big.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var createHTML = __webpack_require__(/*! ../internals/create-html */ "../../node_modules/core-js/internals/create-html.js");

var forcedStringHTMLMethod = __webpack_require__(/*! ../internals/forced-string-html-method */ "../../node_modules/core-js/internals/forced-string-html-method.js"); // `String.prototype.big` method
// https://tc39.github.io/ecma262/#sec-string.prototype.big


$({
  target: 'String',
  proto: true,
  forced: forcedStringHTMLMethod('big')
}, {
  big: function () {
    function big() {
      return createHTML(this, 'big', '', '');
    }

    return big;
  }()
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.string.blink.js":
/*!***********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.string.blink.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var createHTML = __webpack_require__(/*! ../internals/create-html */ "../../node_modules/core-js/internals/create-html.js");

var forcedStringHTMLMethod = __webpack_require__(/*! ../internals/forced-string-html-method */ "../../node_modules/core-js/internals/forced-string-html-method.js"); // `String.prototype.blink` method
// https://tc39.github.io/ecma262/#sec-string.prototype.blink


$({
  target: 'String',
  proto: true,
  forced: forcedStringHTMLMethod('blink')
}, {
  blink: function () {
    function blink() {
      return createHTML(this, 'blink', '', '');
    }

    return blink;
  }()
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.string.bold.js":
/*!**********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.string.bold.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var createHTML = __webpack_require__(/*! ../internals/create-html */ "../../node_modules/core-js/internals/create-html.js");

var forcedStringHTMLMethod = __webpack_require__(/*! ../internals/forced-string-html-method */ "../../node_modules/core-js/internals/forced-string-html-method.js"); // `String.prototype.bold` method
// https://tc39.github.io/ecma262/#sec-string.prototype.bold


$({
  target: 'String',
  proto: true,
  forced: forcedStringHTMLMethod('bold')
}, {
  bold: function () {
    function bold() {
      return createHTML(this, 'b', '', '');
    }

    return bold;
  }()
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.string.code-point-at.js":
/*!*******************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.string.code-point-at.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var codeAt = __webpack_require__(/*! ../internals/string-multibyte */ "../../node_modules/core-js/internals/string-multibyte.js").codeAt; // `String.prototype.codePointAt` method
// https://tc39.github.io/ecma262/#sec-string.prototype.codepointat


$({
  target: 'String',
  proto: true
}, {
  codePointAt: function () {
    function codePointAt(pos) {
      return codeAt(this, pos);
    }

    return codePointAt;
  }()
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.string.ends-with.js":
/*!***************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.string.ends-with.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var toLength = __webpack_require__(/*! ../internals/to-length */ "../../node_modules/core-js/internals/to-length.js");

var notARegExp = __webpack_require__(/*! ../internals/not-a-regexp */ "../../node_modules/core-js/internals/not-a-regexp.js");

var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "../../node_modules/core-js/internals/require-object-coercible.js");

var correctIsRegExpLogic = __webpack_require__(/*! ../internals/correct-is-regexp-logic */ "../../node_modules/core-js/internals/correct-is-regexp-logic.js");

var nativeEndsWith = ''.endsWith;
var min = Math.min; // `String.prototype.endsWith` method
// https://tc39.github.io/ecma262/#sec-string.prototype.endswith

$({
  target: 'String',
  proto: true,
  forced: !correctIsRegExpLogic('endsWith')
}, {
  endsWith: function () {
    function endsWith(searchString
    /* , endPosition = @length */
    ) {
      var that = String(requireObjectCoercible(this));
      notARegExp(searchString);
      var endPosition = arguments.length > 1 ? arguments[1] : undefined;
      var len = toLength(that.length);
      var end = endPosition === undefined ? len : min(toLength(endPosition), len);
      var search = String(searchString);
      return nativeEndsWith ? nativeEndsWith.call(that, search, end) : that.slice(end - search.length, end) === search;
    }

    return endsWith;
  }()
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.string.fixed.js":
/*!***********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.string.fixed.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var createHTML = __webpack_require__(/*! ../internals/create-html */ "../../node_modules/core-js/internals/create-html.js");

var forcedStringHTMLMethod = __webpack_require__(/*! ../internals/forced-string-html-method */ "../../node_modules/core-js/internals/forced-string-html-method.js"); // `String.prototype.fixed` method
// https://tc39.github.io/ecma262/#sec-string.prototype.fixed


$({
  target: 'String',
  proto: true,
  forced: forcedStringHTMLMethod('fixed')
}, {
  fixed: function () {
    function fixed() {
      return createHTML(this, 'tt', '', '');
    }

    return fixed;
  }()
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.string.fontcolor.js":
/*!***************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.string.fontcolor.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var createHTML = __webpack_require__(/*! ../internals/create-html */ "../../node_modules/core-js/internals/create-html.js");

var forcedStringHTMLMethod = __webpack_require__(/*! ../internals/forced-string-html-method */ "../../node_modules/core-js/internals/forced-string-html-method.js"); // `String.prototype.fontcolor` method
// https://tc39.github.io/ecma262/#sec-string.prototype.fontcolor


$({
  target: 'String',
  proto: true,
  forced: forcedStringHTMLMethod('fontcolor')
}, {
  fontcolor: function () {
    function fontcolor(color) {
      return createHTML(this, 'font', 'color', color);
    }

    return fontcolor;
  }()
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.string.fontsize.js":
/*!**************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.string.fontsize.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var createHTML = __webpack_require__(/*! ../internals/create-html */ "../../node_modules/core-js/internals/create-html.js");

var forcedStringHTMLMethod = __webpack_require__(/*! ../internals/forced-string-html-method */ "../../node_modules/core-js/internals/forced-string-html-method.js"); // `String.prototype.fontsize` method
// https://tc39.github.io/ecma262/#sec-string.prototype.fontsize


$({
  target: 'String',
  proto: true,
  forced: forcedStringHTMLMethod('fontsize')
}, {
  fontsize: function () {
    function fontsize(size) {
      return createHTML(this, 'font', 'size', size);
    }

    return fontsize;
  }()
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.string.from-code-point.js":
/*!*********************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.string.from-code-point.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var toAbsoluteIndex = __webpack_require__(/*! ../internals/to-absolute-index */ "../../node_modules/core-js/internals/to-absolute-index.js");

var fromCharCode = String.fromCharCode;
var nativeFromCodePoint = String.fromCodePoint; // length should be 1, old FF problem

var INCORRECT_LENGTH = !!nativeFromCodePoint && nativeFromCodePoint.length != 1; // `String.fromCodePoint` method
// https://tc39.github.io/ecma262/#sec-string.fromcodepoint

$({
  target: 'String',
  stat: true,
  forced: INCORRECT_LENGTH
}, {
  fromCodePoint: function () {
    function fromCodePoint(x) {
      // eslint-disable-line no-unused-vars
      var elements = [];
      var length = arguments.length;
      var i = 0;
      var code;

      while (length > i) {
        code = +arguments[i++];
        if (toAbsoluteIndex(code, 0x10FFFF) !== code) throw RangeError(code + ' is not a valid code point');
        elements.push(code < 0x10000 ? fromCharCode(code) : fromCharCode(((code -= 0x10000) >> 10) + 0xD800, code % 0x400 + 0xDC00));
      }

      return elements.join('');
    }

    return fromCodePoint;
  }()
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.string.includes.js":
/*!**************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.string.includes.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var notARegExp = __webpack_require__(/*! ../internals/not-a-regexp */ "../../node_modules/core-js/internals/not-a-regexp.js");

var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "../../node_modules/core-js/internals/require-object-coercible.js");

var correctIsRegExpLogic = __webpack_require__(/*! ../internals/correct-is-regexp-logic */ "../../node_modules/core-js/internals/correct-is-regexp-logic.js"); // `String.prototype.includes` method
// https://tc39.github.io/ecma262/#sec-string.prototype.includes


$({
  target: 'String',
  proto: true,
  forced: !correctIsRegExpLogic('includes')
}, {
  includes: function () {
    function includes(searchString
    /* , position = 0 */
    ) {
      return !!~String(requireObjectCoercible(this)).indexOf(notARegExp(searchString), arguments.length > 1 ? arguments[1] : undefined);
    }

    return includes;
  }()
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.string.italics.js":
/*!*************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.string.italics.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var createHTML = __webpack_require__(/*! ../internals/create-html */ "../../node_modules/core-js/internals/create-html.js");

var forcedStringHTMLMethod = __webpack_require__(/*! ../internals/forced-string-html-method */ "../../node_modules/core-js/internals/forced-string-html-method.js"); // `String.prototype.italics` method
// https://tc39.github.io/ecma262/#sec-string.prototype.italics


$({
  target: 'String',
  proto: true,
  forced: forcedStringHTMLMethod('italics')
}, {
  italics: function () {
    function italics() {
      return createHTML(this, 'i', '', '');
    }

    return italics;
  }()
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.string.iterator.js":
/*!**************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.string.iterator.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var charAt = __webpack_require__(/*! ../internals/string-multibyte */ "../../node_modules/core-js/internals/string-multibyte.js").charAt;

var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "../../node_modules/core-js/internals/internal-state.js");

var defineIterator = __webpack_require__(/*! ../internals/define-iterator */ "../../node_modules/core-js/internals/define-iterator.js");

var STRING_ITERATOR = 'String Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR); // `String.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-string.prototype-@@iterator

defineIterator(String, 'String', function (iterated) {
  setInternalState(this, {
    type: STRING_ITERATOR,
    string: String(iterated),
    index: 0
  }); // `%StringIteratorPrototype%.next` method
  // https://tc39.github.io/ecma262/#sec-%stringiteratorprototype%.next
}, function () {
  function next() {
    var state = getInternalState(this);
    var string = state.string;
    var index = state.index;
    var point;
    if (index >= string.length) return {
      value: undefined,
      done: true
    };
    point = charAt(string, index);
    state.index += point.length;
    return {
      value: point,
      done: false
    };
  }

  return next;
}());

/***/ }),

/***/ "../../node_modules/core-js/modules/es.string.link.js":
/*!**********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.string.link.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var createHTML = __webpack_require__(/*! ../internals/create-html */ "../../node_modules/core-js/internals/create-html.js");

var forcedStringHTMLMethod = __webpack_require__(/*! ../internals/forced-string-html-method */ "../../node_modules/core-js/internals/forced-string-html-method.js"); // `String.prototype.link` method
// https://tc39.github.io/ecma262/#sec-string.prototype.link


$({
  target: 'String',
  proto: true,
  forced: forcedStringHTMLMethod('link')
}, {
  link: function () {
    function link(url) {
      return createHTML(this, 'a', 'href', url);
    }

    return link;
  }()
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.string.match.js":
/*!***********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.string.match.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fixRegExpWellKnownSymbolLogic = __webpack_require__(/*! ../internals/fix-regexp-well-known-symbol-logic */ "../../node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js");

var anObject = __webpack_require__(/*! ../internals/an-object */ "../../node_modules/core-js/internals/an-object.js");

var toLength = __webpack_require__(/*! ../internals/to-length */ "../../node_modules/core-js/internals/to-length.js");

var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "../../node_modules/core-js/internals/require-object-coercible.js");

var advanceStringIndex = __webpack_require__(/*! ../internals/advance-string-index */ "../../node_modules/core-js/internals/advance-string-index.js");

var regExpExec = __webpack_require__(/*! ../internals/regexp-exec-abstract */ "../../node_modules/core-js/internals/regexp-exec-abstract.js"); // @@match logic


fixRegExpWellKnownSymbolLogic('match', 1, function (MATCH, nativeMatch, maybeCallNative) {
  return [// `String.prototype.match` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.match
  function () {
    function match(regexp) {
      var O = requireObjectCoercible(this);
      var matcher = regexp == undefined ? undefined : regexp[MATCH];
      return matcher !== undefined ? matcher.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
    }

    return match;
  }(), // `RegExp.prototype[@@match]` method
  // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
  function (regexp) {
    var res = maybeCallNative(nativeMatch, regexp, this);
    if (res.done) return res.value;
    var rx = anObject(regexp);
    var S = String(this);
    if (!rx.global) return regExpExec(rx, S);
    var fullUnicode = rx.unicode;
    rx.lastIndex = 0;
    var A = [];
    var n = 0;
    var result;

    while ((result = regExpExec(rx, S)) !== null) {
      var matchStr = String(result[0]);
      A[n] = matchStr;
      if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      n++;
    }

    return n === 0 ? null : A;
  }];
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.string.pad-end.js":
/*!*************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.string.pad-end.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var $padEnd = __webpack_require__(/*! ../internals/string-pad */ "../../node_modules/core-js/internals/string-pad.js").end;

var WEBKIT_BUG = __webpack_require__(/*! ../internals/webkit-string-pad-bug */ "../../node_modules/core-js/internals/webkit-string-pad-bug.js"); // `String.prototype.padEnd` method
// https://tc39.github.io/ecma262/#sec-string.prototype.padend


$({
  target: 'String',
  proto: true,
  forced: WEBKIT_BUG
}, {
  padEnd: function () {
    function padEnd(maxLength
    /* , fillString = ' ' */
    ) {
      return $padEnd(this, maxLength, arguments.length > 1 ? arguments[1] : undefined);
    }

    return padEnd;
  }()
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.string.pad-start.js":
/*!***************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.string.pad-start.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var $padStart = __webpack_require__(/*! ../internals/string-pad */ "../../node_modules/core-js/internals/string-pad.js").start;

var WEBKIT_BUG = __webpack_require__(/*! ../internals/webkit-string-pad-bug */ "../../node_modules/core-js/internals/webkit-string-pad-bug.js"); // `String.prototype.padStart` method
// https://tc39.github.io/ecma262/#sec-string.prototype.padstart


$({
  target: 'String',
  proto: true,
  forced: WEBKIT_BUG
}, {
  padStart: function () {
    function padStart(maxLength
    /* , fillString = ' ' */
    ) {
      return $padStart(this, maxLength, arguments.length > 1 ? arguments[1] : undefined);
    }

    return padStart;
  }()
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.string.raw.js":
/*!*********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.string.raw.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "../../node_modules/core-js/internals/to-indexed-object.js");

var toLength = __webpack_require__(/*! ../internals/to-length */ "../../node_modules/core-js/internals/to-length.js"); // `String.raw` method
// https://tc39.github.io/ecma262/#sec-string.raw


$({
  target: 'String',
  stat: true
}, {
  raw: function () {
    function raw(template) {
      var rawTemplate = toIndexedObject(template.raw);
      var literalSegments = toLength(rawTemplate.length);
      var argumentsLength = arguments.length;
      var elements = [];
      var i = 0;

      while (literalSegments > i) {
        elements.push(String(rawTemplate[i++]));
        if (i < argumentsLength) elements.push(String(arguments[i]));
      }

      return elements.join('');
    }

    return raw;
  }()
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.string.repeat.js":
/*!************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.string.repeat.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var repeat = __webpack_require__(/*! ../internals/string-repeat */ "../../node_modules/core-js/internals/string-repeat.js"); // `String.prototype.repeat` method
// https://tc39.github.io/ecma262/#sec-string.prototype.repeat


$({
  target: 'String',
  proto: true
}, {
  repeat: repeat
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.string.replace.js":
/*!*************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.string.replace.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fixRegExpWellKnownSymbolLogic = __webpack_require__(/*! ../internals/fix-regexp-well-known-symbol-logic */ "../../node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js");

var anObject = __webpack_require__(/*! ../internals/an-object */ "../../node_modules/core-js/internals/an-object.js");

var toObject = __webpack_require__(/*! ../internals/to-object */ "../../node_modules/core-js/internals/to-object.js");

var toLength = __webpack_require__(/*! ../internals/to-length */ "../../node_modules/core-js/internals/to-length.js");

var toInteger = __webpack_require__(/*! ../internals/to-integer */ "../../node_modules/core-js/internals/to-integer.js");

var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "../../node_modules/core-js/internals/require-object-coercible.js");

var advanceStringIndex = __webpack_require__(/*! ../internals/advance-string-index */ "../../node_modules/core-js/internals/advance-string-index.js");

var regExpExec = __webpack_require__(/*! ../internals/regexp-exec-abstract */ "../../node_modules/core-js/internals/regexp-exec-abstract.js");

var max = Math.max;
var min = Math.min;
var floor = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d\d?)/g;

var maybeToString = function maybeToString(it) {
  return it === undefined ? it : String(it);
}; // @@replace logic


fixRegExpWellKnownSymbolLogic('replace', 2, function (REPLACE, nativeReplace, maybeCallNative) {
  return [// `String.prototype.replace` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.replace
  function () {
    function replace(searchValue, replaceValue) {
      var O = requireObjectCoercible(this);
      var replacer = searchValue == undefined ? undefined : searchValue[REPLACE];
      return replacer !== undefined ? replacer.call(searchValue, O, replaceValue) : nativeReplace.call(String(O), searchValue, replaceValue);
    }

    return replace;
  }(), // `RegExp.prototype[@@replace]` method
  // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
  function (regexp, replaceValue) {
    var res = maybeCallNative(nativeReplace, regexp, this, replaceValue);
    if (res.done) return res.value;
    var rx = anObject(regexp);
    var S = String(this);
    var functionalReplace = typeof replaceValue === 'function';
    if (!functionalReplace) replaceValue = String(replaceValue);
    var global = rx.global;

    if (global) {
      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
    }

    var results = [];

    while (true) {
      var result = regExpExec(rx, S);
      if (result === null) break;
      results.push(result);
      if (!global) break;
      var matchStr = String(result[0]);
      if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
    }

    var accumulatedResult = '';
    var nextSourcePosition = 0;

    for (var i = 0; i < results.length; i++) {
      result = results[i];
      var matched = String(result[0]);
      var position = max(min(toInteger(result.index), S.length), 0);
      var captures = []; // NOTE: This is equivalent to
      //   captures = result.slice(1).map(maybeToString)
      // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
      // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
      // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.

      for (var j = 1; j < result.length; j++) {
        captures.push(maybeToString(result[j]));
      }

      var namedCaptures = result.groups;

      if (functionalReplace) {
        var replacerArgs = [matched].concat(captures, position, S);
        if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
        var replacement = String(replaceValue.apply(undefined, replacerArgs));
      } else {
        replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
      }

      if (position >= nextSourcePosition) {
        accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
        nextSourcePosition = position + matched.length;
      }
    }

    return accumulatedResult + S.slice(nextSourcePosition);
  }]; // https://tc39.github.io/ecma262/#sec-getsubstitution

  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;

    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }

    return nativeReplace.call(replacement, symbols, function (match, ch) {
      var capture;

      switch (ch.charAt(0)) {
        case '$':
          return '$';

        case '&':
          return matched;

        case '`':
          return str.slice(0, position);

        case "'":
          return str.slice(tailPos);

        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;

        default:
          // \d\d?
          var n = +ch;
          if (n === 0) return match;

          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }

          capture = captures[n - 1];
      }

      return capture === undefined ? '' : capture;
    });
  }
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.string.search.js":
/*!************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.string.search.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fixRegExpWellKnownSymbolLogic = __webpack_require__(/*! ../internals/fix-regexp-well-known-symbol-logic */ "../../node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js");

var anObject = __webpack_require__(/*! ../internals/an-object */ "../../node_modules/core-js/internals/an-object.js");

var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "../../node_modules/core-js/internals/require-object-coercible.js");

var sameValue = __webpack_require__(/*! ../internals/same-value */ "../../node_modules/core-js/internals/same-value.js");

var regExpExec = __webpack_require__(/*! ../internals/regexp-exec-abstract */ "../../node_modules/core-js/internals/regexp-exec-abstract.js"); // @@search logic


fixRegExpWellKnownSymbolLogic('search', 1, function (SEARCH, nativeSearch, maybeCallNative) {
  return [// `String.prototype.search` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.search
  function () {
    function search(regexp) {
      var O = requireObjectCoercible(this);
      var searcher = regexp == undefined ? undefined : regexp[SEARCH];
      return searcher !== undefined ? searcher.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
    }

    return search;
  }(), // `RegExp.prototype[@@search]` method
  // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@search
  function (regexp) {
    var res = maybeCallNative(nativeSearch, regexp, this);
    if (res.done) return res.value;
    var rx = anObject(regexp);
    var S = String(this);
    var previousLastIndex = rx.lastIndex;
    if (!sameValue(previousLastIndex, 0)) rx.lastIndex = 0;
    var result = regExpExec(rx, S);
    if (!sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex;
    return result === null ? -1 : result.index;
  }];
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.string.small.js":
/*!***********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.string.small.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var createHTML = __webpack_require__(/*! ../internals/create-html */ "../../node_modules/core-js/internals/create-html.js");

var forcedStringHTMLMethod = __webpack_require__(/*! ../internals/forced-string-html-method */ "../../node_modules/core-js/internals/forced-string-html-method.js"); // `String.prototype.small` method
// https://tc39.github.io/ecma262/#sec-string.prototype.small


$({
  target: 'String',
  proto: true,
  forced: forcedStringHTMLMethod('small')
}, {
  small: function () {
    function small() {
      return createHTML(this, 'small', '', '');
    }

    return small;
  }()
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.string.split.js":
/*!***********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.string.split.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fixRegExpWellKnownSymbolLogic = __webpack_require__(/*! ../internals/fix-regexp-well-known-symbol-logic */ "../../node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js");

var isRegExp = __webpack_require__(/*! ../internals/is-regexp */ "../../node_modules/core-js/internals/is-regexp.js");

var anObject = __webpack_require__(/*! ../internals/an-object */ "../../node_modules/core-js/internals/an-object.js");

var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "../../node_modules/core-js/internals/require-object-coercible.js");

var speciesConstructor = __webpack_require__(/*! ../internals/species-constructor */ "../../node_modules/core-js/internals/species-constructor.js");

var advanceStringIndex = __webpack_require__(/*! ../internals/advance-string-index */ "../../node_modules/core-js/internals/advance-string-index.js");

var toLength = __webpack_require__(/*! ../internals/to-length */ "../../node_modules/core-js/internals/to-length.js");

var callRegExpExec = __webpack_require__(/*! ../internals/regexp-exec-abstract */ "../../node_modules/core-js/internals/regexp-exec-abstract.js");

var regexpExec = __webpack_require__(/*! ../internals/regexp-exec */ "../../node_modules/core-js/internals/regexp-exec.js");

var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");

var arrayPush = [].push;
var min = Math.min;
var MAX_UINT32 = 0xFFFFFFFF; // babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError

var SUPPORTS_Y = !fails(function () {
  return !RegExp(MAX_UINT32, 'y');
}); // @@split logic

fixRegExpWellKnownSymbolLogic('split', 2, function (SPLIT, nativeSplit, maybeCallNative) {
  var internalSplit;

  if ('abbc'.split(/(b)*/)[1] == 'c' || 'test'.split(/(?:)/, -1).length != 4 || 'ab'.split(/(?:ab)*/).length != 2 || '.'.split(/(.?)(.?)/).length != 4 || '.'.split(/()()/).length > 1 || ''.split(/.?/).length) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function internalSplit(separator, limit) {
      var string = String(requireObjectCoercible(this));
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (separator === undefined) return [string]; // If `separator` is not a regex, use native split

      if (!isRegExp(separator)) {
        return nativeSplit.call(string, separator, lim);
      }

      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') + (separator.multiline ? 'm' : '') + (separator.unicode ? 'u' : '') + (separator.sticky ? 'y' : '');
      var lastLastIndex = 0; // Make `global` and avoid `lastIndex` issues by working with a copy

      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;

      while (match = regexpExec.call(separatorCopy, string)) {
        lastIndex = separatorCopy.lastIndex;

        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          if (match.length > 1 && match.index < string.length) arrayPush.apply(output, match.slice(1));
          lastLength = match[0].length;
          lastLastIndex = lastIndex;
          if (output.length >= lim) break;
        }

        if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
      }

      if (lastLastIndex === string.length) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));

      return output.length > lim ? output.slice(0, lim) : output;
    }; // Chakra, V8

  } else if ('0'.split(undefined, 0).length) {
    internalSplit = function internalSplit(separator, limit) {
      return separator === undefined && limit === 0 ? [] : nativeSplit.call(this, separator, limit);
    };
  } else internalSplit = nativeSplit;

  return [// `String.prototype.split` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.split
  function () {
    function split(separator, limit) {
      var O = requireObjectCoercible(this);
      var splitter = separator == undefined ? undefined : separator[SPLIT];
      return splitter !== undefined ? splitter.call(separator, O, limit) : internalSplit.call(String(O), separator, limit);
    }

    return split;
  }(), // `RegExp.prototype[@@split]` method
  // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
  //
  // NOTE: This cannot be properly polyfilled in engines that don't support
  // the 'y' flag.
  function (regexp, limit) {
    var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== nativeSplit);
    if (res.done) return res.value;
    var rx = anObject(regexp);
    var S = String(this);
    var C = speciesConstructor(rx, RegExp);
    var unicodeMatching = rx.unicode;
    var flags = (rx.ignoreCase ? 'i' : '') + (rx.multiline ? 'm' : '') + (rx.unicode ? 'u' : '') + (SUPPORTS_Y ? 'y' : 'g'); // ^(? + rx + ) is needed, in combination with some S slicing, to
    // simulate the 'y' flag.

    var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
    var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
    if (lim === 0) return [];
    if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
    var p = 0;
    var q = 0;
    var A = [];

    while (q < S.length) {
      splitter.lastIndex = SUPPORTS_Y ? q : 0;
      var z = callRegExpExec(splitter, SUPPORTS_Y ? S : S.slice(q));
      var e;

      if (z === null || (e = min(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p) {
        q = advanceStringIndex(S, q, unicodeMatching);
      } else {
        A.push(S.slice(p, q));
        if (A.length === lim) return A;

        for (var i = 1; i <= z.length - 1; i++) {
          A.push(z[i]);
          if (A.length === lim) return A;
        }

        q = p = e;
      }
    }

    A.push(S.slice(p));
    return A;
  }];
}, !SUPPORTS_Y);

/***/ }),

/***/ "../../node_modules/core-js/modules/es.string.starts-with.js":
/*!*****************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.string.starts-with.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var toLength = __webpack_require__(/*! ../internals/to-length */ "../../node_modules/core-js/internals/to-length.js");

var notARegExp = __webpack_require__(/*! ../internals/not-a-regexp */ "../../node_modules/core-js/internals/not-a-regexp.js");

var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "../../node_modules/core-js/internals/require-object-coercible.js");

var correctIsRegExpLogic = __webpack_require__(/*! ../internals/correct-is-regexp-logic */ "../../node_modules/core-js/internals/correct-is-regexp-logic.js");

var nativeStartsWith = ''.startsWith;
var min = Math.min; // `String.prototype.startsWith` method
// https://tc39.github.io/ecma262/#sec-string.prototype.startswith

$({
  target: 'String',
  proto: true,
  forced: !correctIsRegExpLogic('startsWith')
}, {
  startsWith: function () {
    function startsWith(searchString
    /* , position = 0 */
    ) {
      var that = String(requireObjectCoercible(this));
      notARegExp(searchString);
      var index = toLength(min(arguments.length > 1 ? arguments[1] : undefined, that.length));
      var search = String(searchString);
      return nativeStartsWith ? nativeStartsWith.call(that, search, index) : that.slice(index, index + search.length) === search;
    }

    return startsWith;
  }()
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.string.strike.js":
/*!************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.string.strike.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var createHTML = __webpack_require__(/*! ../internals/create-html */ "../../node_modules/core-js/internals/create-html.js");

var forcedStringHTMLMethod = __webpack_require__(/*! ../internals/forced-string-html-method */ "../../node_modules/core-js/internals/forced-string-html-method.js"); // `String.prototype.strike` method
// https://tc39.github.io/ecma262/#sec-string.prototype.strike


$({
  target: 'String',
  proto: true,
  forced: forcedStringHTMLMethod('strike')
}, {
  strike: function () {
    function strike() {
      return createHTML(this, 'strike', '', '');
    }

    return strike;
  }()
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.string.sub.js":
/*!*********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.string.sub.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var createHTML = __webpack_require__(/*! ../internals/create-html */ "../../node_modules/core-js/internals/create-html.js");

var forcedStringHTMLMethod = __webpack_require__(/*! ../internals/forced-string-html-method */ "../../node_modules/core-js/internals/forced-string-html-method.js"); // `String.prototype.sub` method
// https://tc39.github.io/ecma262/#sec-string.prototype.sub


$({
  target: 'String',
  proto: true,
  forced: forcedStringHTMLMethod('sub')
}, {
  sub: function () {
    function sub() {
      return createHTML(this, 'sub', '', '');
    }

    return sub;
  }()
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.string.sup.js":
/*!*********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.string.sup.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var createHTML = __webpack_require__(/*! ../internals/create-html */ "../../node_modules/core-js/internals/create-html.js");

var forcedStringHTMLMethod = __webpack_require__(/*! ../internals/forced-string-html-method */ "../../node_modules/core-js/internals/forced-string-html-method.js"); // `String.prototype.sup` method
// https://tc39.github.io/ecma262/#sec-string.prototype.sup


$({
  target: 'String',
  proto: true,
  forced: forcedStringHTMLMethod('sup')
}, {
  sup: function () {
    function sup() {
      return createHTML(this, 'sup', '', '');
    }

    return sup;
  }()
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.string.trim-end.js":
/*!**************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.string.trim-end.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var $trimEnd = __webpack_require__(/*! ../internals/string-trim */ "../../node_modules/core-js/internals/string-trim.js").end;

var forcedStringTrimMethod = __webpack_require__(/*! ../internals/forced-string-trim-method */ "../../node_modules/core-js/internals/forced-string-trim-method.js");

var FORCED = forcedStringTrimMethod('trimEnd');
var trimEnd = FORCED ? function () {
  function trimEnd() {
    return $trimEnd(this);
  }

  return trimEnd;
}() : ''.trimEnd; // `String.prototype.{ trimEnd, trimRight }` methods
// https://github.com/tc39/ecmascript-string-left-right-trim

$({
  target: 'String',
  proto: true,
  forced: FORCED
}, {
  trimEnd: trimEnd,
  trimRight: trimEnd
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.string.trim-start.js":
/*!****************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.string.trim-start.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var $trimStart = __webpack_require__(/*! ../internals/string-trim */ "../../node_modules/core-js/internals/string-trim.js").start;

var forcedStringTrimMethod = __webpack_require__(/*! ../internals/forced-string-trim-method */ "../../node_modules/core-js/internals/forced-string-trim-method.js");

var FORCED = forcedStringTrimMethod('trimStart');
var trimStart = FORCED ? function () {
  function trimStart() {
    return $trimStart(this);
  }

  return trimStart;
}() : ''.trimStart; // `String.prototype.{ trimStart, trimLeft }` methods
// https://github.com/tc39/ecmascript-string-left-right-trim

$({
  target: 'String',
  proto: true,
  forced: FORCED
}, {
  trimStart: trimStart,
  trimLeft: trimStart
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.string.trim.js":
/*!**********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.string.trim.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var $trim = __webpack_require__(/*! ../internals/string-trim */ "../../node_modules/core-js/internals/string-trim.js").trim;

var forcedStringTrimMethod = __webpack_require__(/*! ../internals/forced-string-trim-method */ "../../node_modules/core-js/internals/forced-string-trim-method.js"); // `String.prototype.trim` method
// https://tc39.github.io/ecma262/#sec-string.prototype.trim


$({
  target: 'String',
  proto: true,
  forced: forcedStringTrimMethod('trim')
}, {
  trim: function () {
    function trim() {
      return $trim(this);
    }

    return trim;
  }()
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.symbol.async-iterator.js":
/*!********************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.symbol.async-iterator.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defineWellKnownSymbol = __webpack_require__(/*! ../internals/define-well-known-symbol */ "../../node_modules/core-js/internals/define-well-known-symbol.js"); // `Symbol.asyncIterator` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.asynciterator


defineWellKnownSymbol('asyncIterator');

/***/ }),

/***/ "../../node_modules/core-js/modules/es.symbol.description.js":
/*!*****************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.symbol.description.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// `Symbol.prototype.description` getter
// https://tc39.github.io/ecma262/#sec-symbol.prototype.description


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../node_modules/core-js/internals/descriptors.js");

var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");

var has = __webpack_require__(/*! ../internals/has */ "../../node_modules/core-js/internals/has.js");

var isObject = __webpack_require__(/*! ../internals/is-object */ "../../node_modules/core-js/internals/is-object.js");

var defineProperty = __webpack_require__(/*! ../internals/object-define-property */ "../../node_modules/core-js/internals/object-define-property.js").f;

var copyConstructorProperties = __webpack_require__(/*! ../internals/copy-constructor-properties */ "../../node_modules/core-js/internals/copy-constructor-properties.js");

var NativeSymbol = global.Symbol;

if (DESCRIPTORS && typeof NativeSymbol == 'function' && (!('description' in NativeSymbol.prototype) || // Safari 12 bug
NativeSymbol().description !== undefined)) {
  var EmptyStringDescriptionStore = {}; // wrap Symbol constructor for correct work with undefined description

  var SymbolWrapper = function () {
    function Symbol() {
      var description = arguments.length < 1 || arguments[0] === undefined ? undefined : String(arguments[0]);
      var result = this instanceof SymbolWrapper ? new NativeSymbol(description) // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
      : description === undefined ? NativeSymbol() : NativeSymbol(description);
      if (description === '') EmptyStringDescriptionStore[result] = true;
      return result;
    }

    return Symbol;
  }();

  copyConstructorProperties(SymbolWrapper, NativeSymbol);
  var symbolPrototype = SymbolWrapper.prototype = NativeSymbol.prototype;
  symbolPrototype.constructor = SymbolWrapper;
  var symbolToString = symbolPrototype.toString;

  var _native = String(NativeSymbol('test')) == 'Symbol(test)';

  var regexp = /^Symbol\((.*)\)[^)]+$/;
  defineProperty(symbolPrototype, 'description', {
    configurable: true,
    get: function () {
      function description() {
        var symbol = isObject(this) ? this.valueOf() : this;
        var string = symbolToString.call(symbol);
        if (has(EmptyStringDescriptionStore, symbol)) return '';
        var desc = _native ? string.slice(7, -1) : string.replace(regexp, '$1');
        return desc === '' ? undefined : desc;
      }

      return description;
    }()
  });
  $({
    global: true,
    forced: true
  }, {
    Symbol: SymbolWrapper
  });
}

/***/ }),

/***/ "../../node_modules/core-js/modules/es.symbol.has-instance.js":
/*!******************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.symbol.has-instance.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defineWellKnownSymbol = __webpack_require__(/*! ../internals/define-well-known-symbol */ "../../node_modules/core-js/internals/define-well-known-symbol.js"); // `Symbol.hasInstance` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.hasinstance


defineWellKnownSymbol('hasInstance');

/***/ }),

/***/ "../../node_modules/core-js/modules/es.symbol.is-concat-spreadable.js":
/*!**************************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.symbol.is-concat-spreadable.js ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defineWellKnownSymbol = __webpack_require__(/*! ../internals/define-well-known-symbol */ "../../node_modules/core-js/internals/define-well-known-symbol.js"); // `Symbol.isConcatSpreadable` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.isconcatspreadable


defineWellKnownSymbol('isConcatSpreadable');

/***/ }),

/***/ "../../node_modules/core-js/modules/es.symbol.iterator.js":
/*!**************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.symbol.iterator.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defineWellKnownSymbol = __webpack_require__(/*! ../internals/define-well-known-symbol */ "../../node_modules/core-js/internals/define-well-known-symbol.js"); // `Symbol.iterator` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.iterator


defineWellKnownSymbol('iterator');

/***/ }),

/***/ "../../node_modules/core-js/modules/es.symbol.js":
/*!*****************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.symbol.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");

var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "../../node_modules/core-js/internals/is-pure.js");

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../node_modules/core-js/internals/descriptors.js");

var NATIVE_SYMBOL = __webpack_require__(/*! ../internals/native-symbol */ "../../node_modules/core-js/internals/native-symbol.js");

var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");

var has = __webpack_require__(/*! ../internals/has */ "../../node_modules/core-js/internals/has.js");

var isArray = __webpack_require__(/*! ../internals/is-array */ "../../node_modules/core-js/internals/is-array.js");

var isObject = __webpack_require__(/*! ../internals/is-object */ "../../node_modules/core-js/internals/is-object.js");

var anObject = __webpack_require__(/*! ../internals/an-object */ "../../node_modules/core-js/internals/an-object.js");

var toObject = __webpack_require__(/*! ../internals/to-object */ "../../node_modules/core-js/internals/to-object.js");

var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "../../node_modules/core-js/internals/to-indexed-object.js");

var toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ "../../node_modules/core-js/internals/to-primitive.js");

var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "../../node_modules/core-js/internals/create-property-descriptor.js");

var nativeObjectCreate = __webpack_require__(/*! ../internals/object-create */ "../../node_modules/core-js/internals/object-create.js");

var objectKeys = __webpack_require__(/*! ../internals/object-keys */ "../../node_modules/core-js/internals/object-keys.js");

var getOwnPropertyNamesModule = __webpack_require__(/*! ../internals/object-get-own-property-names */ "../../node_modules/core-js/internals/object-get-own-property-names.js");

var getOwnPropertyNamesExternal = __webpack_require__(/*! ../internals/object-get-own-property-names-external */ "../../node_modules/core-js/internals/object-get-own-property-names-external.js");

var getOwnPropertySymbolsModule = __webpack_require__(/*! ../internals/object-get-own-property-symbols */ "../../node_modules/core-js/internals/object-get-own-property-symbols.js");

var getOwnPropertyDescriptorModule = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "../../node_modules/core-js/internals/object-get-own-property-descriptor.js");

var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "../../node_modules/core-js/internals/object-define-property.js");

var propertyIsEnumerableModule = __webpack_require__(/*! ../internals/object-property-is-enumerable */ "../../node_modules/core-js/internals/object-property-is-enumerable.js");

var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "../../node_modules/core-js/internals/create-non-enumerable-property.js");

var redefine = __webpack_require__(/*! ../internals/redefine */ "../../node_modules/core-js/internals/redefine.js");

var shared = __webpack_require__(/*! ../internals/shared */ "../../node_modules/core-js/internals/shared.js");

var sharedKey = __webpack_require__(/*! ../internals/shared-key */ "../../node_modules/core-js/internals/shared-key.js");

var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "../../node_modules/core-js/internals/hidden-keys.js");

var uid = __webpack_require__(/*! ../internals/uid */ "../../node_modules/core-js/internals/uid.js");

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../node_modules/core-js/internals/well-known-symbol.js");

var wrappedWellKnownSymbolModule = __webpack_require__(/*! ../internals/wrapped-well-known-symbol */ "../../node_modules/core-js/internals/wrapped-well-known-symbol.js");

var defineWellKnownSymbol = __webpack_require__(/*! ../internals/define-well-known-symbol */ "../../node_modules/core-js/internals/define-well-known-symbol.js");

var setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ "../../node_modules/core-js/internals/set-to-string-tag.js");

var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "../../node_modules/core-js/internals/internal-state.js");

var $forEach = __webpack_require__(/*! ../internals/array-iteration */ "../../node_modules/core-js/internals/array-iteration.js").forEach;

var HIDDEN = sharedKey('hidden');
var SYMBOL = 'Symbol';
var PROTOTYPE = 'prototype';
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(SYMBOL);
var ObjectPrototype = Object[PROTOTYPE];
var $Symbol = global.Symbol;
var JSON = global.JSON;
var nativeJSONStringify = JSON && JSON.stringify;
var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
var nativeDefineProperty = definePropertyModule.f;
var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
var nativePropertyIsEnumerable = propertyIsEnumerableModule.f;
var AllSymbols = shared('symbols');
var ObjectPrototypeSymbols = shared('op-symbols');
var StringToSymbolRegistry = shared('string-to-symbol-registry');
var SymbolToStringRegistry = shared('symbol-to-string-registry');
var WellKnownSymbolsStore = shared('wks');
var QObject = global.QObject; // Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173

var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild; // fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687

var setSymbolDescriptor = DESCRIPTORS && fails(function () {
  return nativeObjectCreate(nativeDefineProperty({}, 'a', {
    get: function () {
      function get() {
        return nativeDefineProperty(this, 'a', {
          value: 7
        }).a;
      }

      return get;
    }()
  })).a != 7;
}) ? function (O, P, Attributes) {
  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor(ObjectPrototype, P);
  if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
  nativeDefineProperty(O, P, Attributes);

  if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
    nativeDefineProperty(ObjectPrototype, P, ObjectPrototypeDescriptor);
  }
} : nativeDefineProperty;

var wrap = function wrap(tag, description) {
  var symbol = AllSymbols[tag] = nativeObjectCreate($Symbol[PROTOTYPE]);
  setInternalState(symbol, {
    type: SYMBOL,
    tag: tag,
    description: description
  });
  if (!DESCRIPTORS) symbol.description = description;
  return symbol;
};

var isSymbol = NATIVE_SYMBOL && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return Object(it) instanceof $Symbol;
};

var $defineProperty = function () {
  function defineProperty(O, P, Attributes) {
    if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
    anObject(O);
    var key = toPrimitive(P, true);
    anObject(Attributes);

    if (has(AllSymbols, key)) {
      if (!Attributes.enumerable) {
        if (!has(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor(1, {}));
        O[HIDDEN][key] = true;
      } else {
        if (has(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
        Attributes = nativeObjectCreate(Attributes, {
          enumerable: createPropertyDescriptor(0, false)
        });
      }

      return setSymbolDescriptor(O, key, Attributes);
    }

    return nativeDefineProperty(O, key, Attributes);
  }

  return defineProperty;
}();

var $defineProperties = function () {
  function defineProperties(O, Properties) {
    anObject(O);
    var properties = toIndexedObject(Properties);
    var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
    $forEach(keys, function (key) {
      if (!DESCRIPTORS || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
    });
    return O;
  }

  return defineProperties;
}();

var $create = function () {
  function create(O, Properties) {
    return Properties === undefined ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
  }

  return create;
}();

var $propertyIsEnumerable = function () {
  function propertyIsEnumerable(V) {
    var P = toPrimitive(V, true);
    var enumerable = nativePropertyIsEnumerable.call(this, P);
    if (this === ObjectPrototype && has(AllSymbols, P) && !has(ObjectPrototypeSymbols, P)) return false;
    return enumerable || !has(this, P) || !has(AllSymbols, P) || has(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
  }

  return propertyIsEnumerable;
}();

var $getOwnPropertyDescriptor = function () {
  function getOwnPropertyDescriptor(O, P) {
    var it = toIndexedObject(O);
    var key = toPrimitive(P, true);
    if (it === ObjectPrototype && has(AllSymbols, key) && !has(ObjectPrototypeSymbols, key)) return;
    var descriptor = nativeGetOwnPropertyDescriptor(it, key);

    if (descriptor && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) {
      descriptor.enumerable = true;
    }

    return descriptor;
  }

  return getOwnPropertyDescriptor;
}();

var $getOwnPropertyNames = function () {
  function getOwnPropertyNames(O) {
    var names = nativeGetOwnPropertyNames(toIndexedObject(O));
    var result = [];
    $forEach(names, function (key) {
      if (!has(AllSymbols, key) && !has(hiddenKeys, key)) result.push(key);
    });
    return result;
  }

  return getOwnPropertyNames;
}();

var $getOwnPropertySymbols = function () {
  function getOwnPropertySymbols(O) {
    var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
    var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
    var result = [];
    $forEach(names, function (key) {
      if (has(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has(ObjectPrototype, key))) {
        result.push(AllSymbols[key]);
      }
    });
    return result;
  }

  return getOwnPropertySymbols;
}(); // `Symbol` constructor
// https://tc39.github.io/ecma262/#sec-symbol-constructor


if (!NATIVE_SYMBOL) {
  $Symbol = function () {
    function Symbol() {
      if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
      var description = !arguments.length || arguments[0] === undefined ? undefined : String(arguments[0]);
      var tag = uid(description);

      var setter = function () {
        function setter(value) {
          if (this === ObjectPrototype) setter.call(ObjectPrototypeSymbols, value);
          if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
          setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
        }

        return setter;
      }();

      if (DESCRIPTORS && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, {
        configurable: true,
        set: setter
      });
      return wrap(tag, description);
    }

    return Symbol;
  }();

  redefine($Symbol[PROTOTYPE], 'toString', function () {
    function toString() {
      return getInternalState(this).tag;
    }

    return toString;
  }());
  propertyIsEnumerableModule.f = $propertyIsEnumerable;
  definePropertyModule.f = $defineProperty;
  getOwnPropertyDescriptorModule.f = $getOwnPropertyDescriptor;
  getOwnPropertyNamesModule.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
  getOwnPropertySymbolsModule.f = $getOwnPropertySymbols;

  if (DESCRIPTORS) {
    // https://github.com/tc39/proposal-Symbol-description
    nativeDefineProperty($Symbol[PROTOTYPE], 'description', {
      configurable: true,
      get: function () {
        function description() {
          return getInternalState(this).description;
        }

        return description;
      }()
    });

    if (!IS_PURE) {
      redefine(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable, {
        unsafe: true
      });
    }
  }

  wrappedWellKnownSymbolModule.f = function (name) {
    return wrap(wellKnownSymbol(name), name);
  };
}

$({
  global: true,
  wrap: true,
  forced: !NATIVE_SYMBOL,
  sham: !NATIVE_SYMBOL
}, {
  Symbol: $Symbol
});
$forEach(objectKeys(WellKnownSymbolsStore), function (name) {
  defineWellKnownSymbol(name);
});
$({
  target: SYMBOL,
  stat: true,
  forced: !NATIVE_SYMBOL
}, {
  // `Symbol.for` method
  // https://tc39.github.io/ecma262/#sec-symbol.for
  'for': function () {
    function _for(key) {
      var string = String(key);
      if (has(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
      var symbol = $Symbol(string);
      StringToSymbolRegistry[string] = symbol;
      SymbolToStringRegistry[symbol] = string;
      return symbol;
    }

    return _for;
  }(),
  // `Symbol.keyFor` method
  // https://tc39.github.io/ecma262/#sec-symbol.keyfor
  keyFor: function () {
    function keyFor(sym) {
      if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
      if (has(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
    }

    return keyFor;
  }(),
  useSetter: function () {
    function useSetter() {
      USE_SETTER = true;
    }

    return useSetter;
  }(),
  useSimple: function () {
    function useSimple() {
      USE_SETTER = false;
    }

    return useSimple;
  }()
});
$({
  target: 'Object',
  stat: true,
  forced: !NATIVE_SYMBOL,
  sham: !DESCRIPTORS
}, {
  // `Object.create` method
  // https://tc39.github.io/ecma262/#sec-object.create
  create: $create,
  // `Object.defineProperty` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperty
  defineProperty: $defineProperty,
  // `Object.defineProperties` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperties
  defineProperties: $defineProperties,
  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
});
$({
  target: 'Object',
  stat: true,
  forced: !NATIVE_SYMBOL
}, {
  // `Object.getOwnPropertyNames` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertynames
  getOwnPropertyNames: $getOwnPropertyNames,
  // `Object.getOwnPropertySymbols` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertysymbols
  getOwnPropertySymbols: $getOwnPropertySymbols
}); // Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443

$({
  target: 'Object',
  stat: true,
  forced: fails(function () {
    getOwnPropertySymbolsModule.f(1);
  })
}, {
  getOwnPropertySymbols: function () {
    function getOwnPropertySymbols(it) {
      return getOwnPropertySymbolsModule.f(toObject(it));
    }

    return getOwnPropertySymbols;
  }()
}); // `JSON.stringify` method behavior with symbols
// https://tc39.github.io/ecma262/#sec-json.stringify

JSON && $({
  target: 'JSON',
  stat: true,
  forced: !NATIVE_SYMBOL || fails(function () {
    var symbol = $Symbol(); // MS Edge converts symbol values to JSON as {}

    return nativeJSONStringify([symbol]) != '[null]' // WebKit converts symbol values to JSON as null
    || nativeJSONStringify({
      a: symbol
    }) != '{}' // V8 throws on boxed symbols
    || nativeJSONStringify(Object(symbol)) != '{}';
  })
}, {
  stringify: function () {
    function stringify(it) {
      var args = [it];
      var index = 1;
      var replacer, $replacer;

      while (arguments.length > index) {
        args.push(arguments[index++]);
      }

      $replacer = replacer = args[1];
      if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined

      if (!isArray(replacer)) replacer = function () {
        function replacer(key, value) {
          if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
          if (!isSymbol(value)) return value;
        }

        return replacer;
      }();
      args[1] = replacer;
      return nativeJSONStringify.apply(JSON, args);
    }

    return stringify;
  }()
}); // `Symbol.prototype[@@toPrimitive]` method
// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@toprimitive

if (!$Symbol[PROTOTYPE][TO_PRIMITIVE]) {
  createNonEnumerableProperty($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
} // `Symbol.prototype[@@toStringTag]` property
// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@tostringtag


setToStringTag($Symbol, SYMBOL);
hiddenKeys[HIDDEN] = true;

/***/ }),

/***/ "../../node_modules/core-js/modules/es.symbol.match.js":
/*!***********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.symbol.match.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defineWellKnownSymbol = __webpack_require__(/*! ../internals/define-well-known-symbol */ "../../node_modules/core-js/internals/define-well-known-symbol.js"); // `Symbol.match` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.match


defineWellKnownSymbol('match');

/***/ }),

/***/ "../../node_modules/core-js/modules/es.symbol.replace.js":
/*!*************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.symbol.replace.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defineWellKnownSymbol = __webpack_require__(/*! ../internals/define-well-known-symbol */ "../../node_modules/core-js/internals/define-well-known-symbol.js"); // `Symbol.replace` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.replace


defineWellKnownSymbol('replace');

/***/ }),

/***/ "../../node_modules/core-js/modules/es.symbol.search.js":
/*!************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.symbol.search.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defineWellKnownSymbol = __webpack_require__(/*! ../internals/define-well-known-symbol */ "../../node_modules/core-js/internals/define-well-known-symbol.js"); // `Symbol.search` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.search


defineWellKnownSymbol('search');

/***/ }),

/***/ "../../node_modules/core-js/modules/es.symbol.species.js":
/*!*************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.symbol.species.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defineWellKnownSymbol = __webpack_require__(/*! ../internals/define-well-known-symbol */ "../../node_modules/core-js/internals/define-well-known-symbol.js"); // `Symbol.species` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.species


defineWellKnownSymbol('species');

/***/ }),

/***/ "../../node_modules/core-js/modules/es.symbol.split.js":
/*!***********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.symbol.split.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defineWellKnownSymbol = __webpack_require__(/*! ../internals/define-well-known-symbol */ "../../node_modules/core-js/internals/define-well-known-symbol.js"); // `Symbol.split` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.split


defineWellKnownSymbol('split');

/***/ }),

/***/ "../../node_modules/core-js/modules/es.symbol.to-primitive.js":
/*!******************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.symbol.to-primitive.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defineWellKnownSymbol = __webpack_require__(/*! ../internals/define-well-known-symbol */ "../../node_modules/core-js/internals/define-well-known-symbol.js"); // `Symbol.toPrimitive` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.toprimitive


defineWellKnownSymbol('toPrimitive');

/***/ }),

/***/ "../../node_modules/core-js/modules/es.symbol.to-string-tag.js":
/*!*******************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.symbol.to-string-tag.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defineWellKnownSymbol = __webpack_require__(/*! ../internals/define-well-known-symbol */ "../../node_modules/core-js/internals/define-well-known-symbol.js"); // `Symbol.toStringTag` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.tostringtag


defineWellKnownSymbol('toStringTag');

/***/ }),

/***/ "../../node_modules/core-js/modules/es.symbol.unscopables.js":
/*!*****************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.symbol.unscopables.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defineWellKnownSymbol = __webpack_require__(/*! ../internals/define-well-known-symbol */ "../../node_modules/core-js/internals/define-well-known-symbol.js"); // `Symbol.unscopables` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.unscopables


defineWellKnownSymbol('unscopables');

/***/ }),

/***/ "../../node_modules/core-js/modules/es.typed-array.copy-within.js":
/*!**********************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.typed-array.copy-within.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ArrayBufferViewCore = __webpack_require__(/*! ../internals/array-buffer-view-core */ "../../node_modules/core-js/internals/array-buffer-view-core.js");

var $copyWithin = __webpack_require__(/*! ../internals/array-copy-within */ "../../node_modules/core-js/internals/array-copy-within.js");

var aTypedArray = ArrayBufferViewCore.aTypedArray; // `%TypedArray%.prototype.copyWithin` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.copywithin

ArrayBufferViewCore.exportProto('copyWithin', function () {
  function copyWithin(target, start
  /* , end */
  ) {
    return $copyWithin.call(aTypedArray(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
  }

  return copyWithin;
}());

/***/ }),

/***/ "../../node_modules/core-js/modules/es.typed-array.every.js":
/*!****************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.typed-array.every.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ArrayBufferViewCore = __webpack_require__(/*! ../internals/array-buffer-view-core */ "../../node_modules/core-js/internals/array-buffer-view-core.js");

var $every = __webpack_require__(/*! ../internals/array-iteration */ "../../node_modules/core-js/internals/array-iteration.js").every;

var aTypedArray = ArrayBufferViewCore.aTypedArray; // `%TypedArray%.prototype.every` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.every

ArrayBufferViewCore.exportProto('every', function () {
  function every(callbackfn
  /* , thisArg */
  ) {
    return $every(aTypedArray(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }

  return every;
}());

/***/ }),

/***/ "../../node_modules/core-js/modules/es.typed-array.fill.js":
/*!***************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.typed-array.fill.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ArrayBufferViewCore = __webpack_require__(/*! ../internals/array-buffer-view-core */ "../../node_modules/core-js/internals/array-buffer-view-core.js");

var $fill = __webpack_require__(/*! ../internals/array-fill */ "../../node_modules/core-js/internals/array-fill.js");

var aTypedArray = ArrayBufferViewCore.aTypedArray; // `%TypedArray%.prototype.fill` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.fill
// eslint-disable-next-line no-unused-vars

ArrayBufferViewCore.exportProto('fill', function () {
  function fill(value
  /* , start, end */
  ) {
    return $fill.apply(aTypedArray(this), arguments);
  }

  return fill;
}());

/***/ }),

/***/ "../../node_modules/core-js/modules/es.typed-array.filter.js":
/*!*****************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.typed-array.filter.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ArrayBufferViewCore = __webpack_require__(/*! ../internals/array-buffer-view-core */ "../../node_modules/core-js/internals/array-buffer-view-core.js");

var $filter = __webpack_require__(/*! ../internals/array-iteration */ "../../node_modules/core-js/internals/array-iteration.js").filter;

var speciesConstructor = __webpack_require__(/*! ../internals/species-constructor */ "../../node_modules/core-js/internals/species-constructor.js");

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var aTypedArrayConstructor = ArrayBufferViewCore.aTypedArrayConstructor; // `%TypedArray%.prototype.filter` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.filter

ArrayBufferViewCore.exportProto('filter', function () {
  function filter(callbackfn
  /* , thisArg */
  ) {
    var list = $filter(aTypedArray(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    var C = speciesConstructor(this, this.constructor);
    var index = 0;
    var length = list.length;
    var result = new (aTypedArrayConstructor(C))(length);

    while (length > index) {
      result[index] = list[index++];
    }

    return result;
  }

  return filter;
}());

/***/ }),

/***/ "../../node_modules/core-js/modules/es.typed-array.find-index.js":
/*!*********************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.typed-array.find-index.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ArrayBufferViewCore = __webpack_require__(/*! ../internals/array-buffer-view-core */ "../../node_modules/core-js/internals/array-buffer-view-core.js");

var $findIndex = __webpack_require__(/*! ../internals/array-iteration */ "../../node_modules/core-js/internals/array-iteration.js").findIndex;

var aTypedArray = ArrayBufferViewCore.aTypedArray; // `%TypedArray%.prototype.findIndex` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.findindex

ArrayBufferViewCore.exportProto('findIndex', function () {
  function findIndex(predicate
  /* , thisArg */
  ) {
    return $findIndex(aTypedArray(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
  }

  return findIndex;
}());

/***/ }),

/***/ "../../node_modules/core-js/modules/es.typed-array.find.js":
/*!***************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.typed-array.find.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ArrayBufferViewCore = __webpack_require__(/*! ../internals/array-buffer-view-core */ "../../node_modules/core-js/internals/array-buffer-view-core.js");

var $find = __webpack_require__(/*! ../internals/array-iteration */ "../../node_modules/core-js/internals/array-iteration.js").find;

var aTypedArray = ArrayBufferViewCore.aTypedArray; // `%TypedArray%.prototype.find` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.find

ArrayBufferViewCore.exportProto('find', function () {
  function find(predicate
  /* , thisArg */
  ) {
    return $find(aTypedArray(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
  }

  return find;
}());

/***/ }),

/***/ "../../node_modules/core-js/modules/es.typed-array.float32-array.js":
/*!************************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.typed-array.float32-array.js ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var typedArrayConstructor = __webpack_require__(/*! ../internals/typed-array-constructor */ "../../node_modules/core-js/internals/typed-array-constructor.js"); // `Float32Array` constructor
// https://tc39.github.io/ecma262/#sec-typedarray-objects


typedArrayConstructor('Float32', 4, function (init) {
  return function () {
    function Float32Array(data, byteOffset, length) {
      return init(this, data, byteOffset, length);
    }

    return Float32Array;
  }();
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.typed-array.float64-array.js":
/*!************************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.typed-array.float64-array.js ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var typedArrayConstructor = __webpack_require__(/*! ../internals/typed-array-constructor */ "../../node_modules/core-js/internals/typed-array-constructor.js"); // `Float64Array` constructor
// https://tc39.github.io/ecma262/#sec-typedarray-objects


typedArrayConstructor('Float64', 8, function (init) {
  return function () {
    function Float64Array(data, byteOffset, length) {
      return init(this, data, byteOffset, length);
    }

    return Float64Array;
  }();
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.typed-array.for-each.js":
/*!*******************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.typed-array.for-each.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ArrayBufferViewCore = __webpack_require__(/*! ../internals/array-buffer-view-core */ "../../node_modules/core-js/internals/array-buffer-view-core.js");

var $forEach = __webpack_require__(/*! ../internals/array-iteration */ "../../node_modules/core-js/internals/array-iteration.js").forEach;

var aTypedArray = ArrayBufferViewCore.aTypedArray; // `%TypedArray%.prototype.forEach` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.foreach

ArrayBufferViewCore.exportProto('forEach', function () {
  function forEach(callbackfn
  /* , thisArg */
  ) {
    $forEach(aTypedArray(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }

  return forEach;
}());

/***/ }),

/***/ "../../node_modules/core-js/modules/es.typed-array.from.js":
/*!***************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.typed-array.from.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS = __webpack_require__(/*! ../internals/typed-arrays-constructors-requires-wrappers */ "../../node_modules/core-js/internals/typed-arrays-constructors-requires-wrappers.js");

var ArrayBufferViewCore = __webpack_require__(/*! ../internals/array-buffer-view-core */ "../../node_modules/core-js/internals/array-buffer-view-core.js");

var typedArrayFrom = __webpack_require__(/*! ../internals/typed-array-from */ "../../node_modules/core-js/internals/typed-array-from.js"); // `%TypedArray%.from` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.from


ArrayBufferViewCore.exportStatic('from', typedArrayFrom, TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS);

/***/ }),

/***/ "../../node_modules/core-js/modules/es.typed-array.includes.js":
/*!*******************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.typed-array.includes.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ArrayBufferViewCore = __webpack_require__(/*! ../internals/array-buffer-view-core */ "../../node_modules/core-js/internals/array-buffer-view-core.js");

var $includes = __webpack_require__(/*! ../internals/array-includes */ "../../node_modules/core-js/internals/array-includes.js").includes;

var aTypedArray = ArrayBufferViewCore.aTypedArray; // `%TypedArray%.prototype.includes` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.includes

ArrayBufferViewCore.exportProto('includes', function () {
  function includes(searchElement
  /* , fromIndex */
  ) {
    return $includes(aTypedArray(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
  }

  return includes;
}());

/***/ }),

/***/ "../../node_modules/core-js/modules/es.typed-array.index-of.js":
/*!*******************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.typed-array.index-of.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ArrayBufferViewCore = __webpack_require__(/*! ../internals/array-buffer-view-core */ "../../node_modules/core-js/internals/array-buffer-view-core.js");

var $indexOf = __webpack_require__(/*! ../internals/array-includes */ "../../node_modules/core-js/internals/array-includes.js").indexOf;

var aTypedArray = ArrayBufferViewCore.aTypedArray; // `%TypedArray%.prototype.indexOf` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.indexof

ArrayBufferViewCore.exportProto('indexOf', function () {
  function indexOf(searchElement
  /* , fromIndex */
  ) {
    return $indexOf(aTypedArray(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
  }

  return indexOf;
}());

/***/ }),

/***/ "../../node_modules/core-js/modules/es.typed-array.int16-array.js":
/*!**********************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.typed-array.int16-array.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var typedArrayConstructor = __webpack_require__(/*! ../internals/typed-array-constructor */ "../../node_modules/core-js/internals/typed-array-constructor.js"); // `Int16Array` constructor
// https://tc39.github.io/ecma262/#sec-typedarray-objects


typedArrayConstructor('Int16', 2, function (init) {
  return function () {
    function Int16Array(data, byteOffset, length) {
      return init(this, data, byteOffset, length);
    }

    return Int16Array;
  }();
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.typed-array.int32-array.js":
/*!**********************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.typed-array.int32-array.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var typedArrayConstructor = __webpack_require__(/*! ../internals/typed-array-constructor */ "../../node_modules/core-js/internals/typed-array-constructor.js"); // `Int32Array` constructor
// https://tc39.github.io/ecma262/#sec-typedarray-objects


typedArrayConstructor('Int32', 4, function (init) {
  return function () {
    function Int32Array(data, byteOffset, length) {
      return init(this, data, byteOffset, length);
    }

    return Int32Array;
  }();
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.typed-array.int8-array.js":
/*!*********************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.typed-array.int8-array.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var typedArrayConstructor = __webpack_require__(/*! ../internals/typed-array-constructor */ "../../node_modules/core-js/internals/typed-array-constructor.js"); // `Int8Array` constructor
// https://tc39.github.io/ecma262/#sec-typedarray-objects


typedArrayConstructor('Int8', 1, function (init) {
  return function () {
    function Int8Array(data, byteOffset, length) {
      return init(this, data, byteOffset, length);
    }

    return Int8Array;
  }();
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.typed-array.iterator.js":
/*!*******************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.typed-array.iterator.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");

var ArrayBufferViewCore = __webpack_require__(/*! ../internals/array-buffer-view-core */ "../../node_modules/core-js/internals/array-buffer-view-core.js");

var ArrayIterators = __webpack_require__(/*! ../modules/es.array.iterator */ "../../node_modules/core-js/modules/es.array.iterator.js");

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../node_modules/core-js/internals/well-known-symbol.js");

var ITERATOR = wellKnownSymbol('iterator');
var Uint8Array = global.Uint8Array;
var arrayValues = ArrayIterators.values;
var arrayKeys = ArrayIterators.keys;
var arrayEntries = ArrayIterators.entries;
var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportProto = ArrayBufferViewCore.exportProto;
var nativeTypedArrayIterator = Uint8Array && Uint8Array.prototype[ITERATOR];
var CORRECT_ITER_NAME = !!nativeTypedArrayIterator && (nativeTypedArrayIterator.name == 'values' || nativeTypedArrayIterator.name == undefined);

var typedArrayValues = function () {
  function values() {
    return arrayValues.call(aTypedArray(this));
  }

  return values;
}(); // `%TypedArray%.prototype.entries` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.entries


exportProto('entries', function () {
  function entries() {
    return arrayEntries.call(aTypedArray(this));
  }

  return entries;
}()); // `%TypedArray%.prototype.keys` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.keys

exportProto('keys', function () {
  function keys() {
    return arrayKeys.call(aTypedArray(this));
  }

  return keys;
}()); // `%TypedArray%.prototype.values` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.values

exportProto('values', typedArrayValues, !CORRECT_ITER_NAME); // `%TypedArray%.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype-@@iterator

exportProto(ITERATOR, typedArrayValues, !CORRECT_ITER_NAME);

/***/ }),

/***/ "../../node_modules/core-js/modules/es.typed-array.join.js":
/*!***************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.typed-array.join.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ArrayBufferViewCore = __webpack_require__(/*! ../internals/array-buffer-view-core */ "../../node_modules/core-js/internals/array-buffer-view-core.js");

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var $join = [].join; // `%TypedArray%.prototype.join` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.join
// eslint-disable-next-line no-unused-vars

ArrayBufferViewCore.exportProto('join', function () {
  function join(separator) {
    return $join.apply(aTypedArray(this), arguments);
  }

  return join;
}());

/***/ }),

/***/ "../../node_modules/core-js/modules/es.typed-array.last-index-of.js":
/*!************************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.typed-array.last-index-of.js ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ArrayBufferViewCore = __webpack_require__(/*! ../internals/array-buffer-view-core */ "../../node_modules/core-js/internals/array-buffer-view-core.js");

var $lastIndexOf = __webpack_require__(/*! ../internals/array-last-index-of */ "../../node_modules/core-js/internals/array-last-index-of.js");

var aTypedArray = ArrayBufferViewCore.aTypedArray; // `%TypedArray%.prototype.lastIndexOf` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.lastindexof
// eslint-disable-next-line no-unused-vars

ArrayBufferViewCore.exportProto('lastIndexOf', function () {
  function lastIndexOf(searchElement
  /* , fromIndex */
  ) {
    return $lastIndexOf.apply(aTypedArray(this), arguments);
  }

  return lastIndexOf;
}());

/***/ }),

/***/ "../../node_modules/core-js/modules/es.typed-array.map.js":
/*!**************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.typed-array.map.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ArrayBufferViewCore = __webpack_require__(/*! ../internals/array-buffer-view-core */ "../../node_modules/core-js/internals/array-buffer-view-core.js");

var $map = __webpack_require__(/*! ../internals/array-iteration */ "../../node_modules/core-js/internals/array-iteration.js").map;

var speciesConstructor = __webpack_require__(/*! ../internals/species-constructor */ "../../node_modules/core-js/internals/species-constructor.js");

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var aTypedArrayConstructor = ArrayBufferViewCore.aTypedArrayConstructor; // `%TypedArray%.prototype.map` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.map

ArrayBufferViewCore.exportProto('map', function () {
  function map(mapfn
  /* , thisArg */
  ) {
    return $map(aTypedArray(this), mapfn, arguments.length > 1 ? arguments[1] : undefined, function (O, length) {
      return new (aTypedArrayConstructor(speciesConstructor(O, O.constructor)))(length);
    });
  }

  return map;
}());

/***/ }),

/***/ "../../node_modules/core-js/modules/es.typed-array.of.js":
/*!*************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.typed-array.of.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ArrayBufferViewCore = __webpack_require__(/*! ../internals/array-buffer-view-core */ "../../node_modules/core-js/internals/array-buffer-view-core.js");

var TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS = __webpack_require__(/*! ../internals/typed-arrays-constructors-requires-wrappers */ "../../node_modules/core-js/internals/typed-arrays-constructors-requires-wrappers.js");

var aTypedArrayConstructor = ArrayBufferViewCore.aTypedArrayConstructor; // `%TypedArray%.of` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.of

ArrayBufferViewCore.exportStatic('of', function () {
  function of()
  /* ...items */
  {
    var index = 0;
    var length = arguments.length;
    var result = new (aTypedArrayConstructor(this))(length);

    while (length > index) {
      result[index] = arguments[index++];
    }

    return result;
  }

  return of;
}(), TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS);

/***/ }),

/***/ "../../node_modules/core-js/modules/es.typed-array.reduce-right.js":
/*!***********************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.typed-array.reduce-right.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ArrayBufferViewCore = __webpack_require__(/*! ../internals/array-buffer-view-core */ "../../node_modules/core-js/internals/array-buffer-view-core.js");

var $reduceRight = __webpack_require__(/*! ../internals/array-reduce */ "../../node_modules/core-js/internals/array-reduce.js").right;

var aTypedArray = ArrayBufferViewCore.aTypedArray; // `%TypedArray%.prototype.reduceRicht` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.reduceright

ArrayBufferViewCore.exportProto('reduceRight', function () {
  function reduceRight(callbackfn
  /* , initialValue */
  ) {
    return $reduceRight(aTypedArray(this), callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
  }

  return reduceRight;
}());

/***/ }),

/***/ "../../node_modules/core-js/modules/es.typed-array.reduce.js":
/*!*****************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.typed-array.reduce.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ArrayBufferViewCore = __webpack_require__(/*! ../internals/array-buffer-view-core */ "../../node_modules/core-js/internals/array-buffer-view-core.js");

var $reduce = __webpack_require__(/*! ../internals/array-reduce */ "../../node_modules/core-js/internals/array-reduce.js").left;

var aTypedArray = ArrayBufferViewCore.aTypedArray; // `%TypedArray%.prototype.reduce` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.reduce

ArrayBufferViewCore.exportProto('reduce', function () {
  function reduce(callbackfn
  /* , initialValue */
  ) {
    return $reduce(aTypedArray(this), callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
  }

  return reduce;
}());

/***/ }),

/***/ "../../node_modules/core-js/modules/es.typed-array.reverse.js":
/*!******************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.typed-array.reverse.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ArrayBufferViewCore = __webpack_require__(/*! ../internals/array-buffer-view-core */ "../../node_modules/core-js/internals/array-buffer-view-core.js");

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var floor = Math.floor; // `%TypedArray%.prototype.reverse` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.reverse

ArrayBufferViewCore.exportProto('reverse', function () {
  function reverse() {
    var that = this;
    var length = aTypedArray(that).length;
    var middle = floor(length / 2);
    var index = 0;
    var value;

    while (index < middle) {
      value = that[index];
      that[index++] = that[--length];
      that[length] = value;
    }

    return that;
  }

  return reverse;
}());

/***/ }),

/***/ "../../node_modules/core-js/modules/es.typed-array.set.js":
/*!**************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.typed-array.set.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ArrayBufferViewCore = __webpack_require__(/*! ../internals/array-buffer-view-core */ "../../node_modules/core-js/internals/array-buffer-view-core.js");

var toLength = __webpack_require__(/*! ../internals/to-length */ "../../node_modules/core-js/internals/to-length.js");

var toOffset = __webpack_require__(/*! ../internals/to-offset */ "../../node_modules/core-js/internals/to-offset.js");

var toObject = __webpack_require__(/*! ../internals/to-object */ "../../node_modules/core-js/internals/to-object.js");

var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var FORCED = fails(function () {
  // eslint-disable-next-line no-undef
  new Int8Array(1).set({});
}); // `%TypedArray%.prototype.set` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.set

ArrayBufferViewCore.exportProto('set', function () {
  function set(arrayLike
  /* , offset */
  ) {
    aTypedArray(this);
    var offset = toOffset(arguments.length > 1 ? arguments[1] : undefined, 1);
    var length = this.length;
    var src = toObject(arrayLike);
    var len = toLength(src.length);
    var index = 0;
    if (len + offset > length) throw RangeError('Wrong length');

    while (index < len) {
      this[offset + index] = src[index++];
    }
  }

  return set;
}(), FORCED);

/***/ }),

/***/ "../../node_modules/core-js/modules/es.typed-array.slice.js":
/*!****************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.typed-array.slice.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ArrayBufferViewCore = __webpack_require__(/*! ../internals/array-buffer-view-core */ "../../node_modules/core-js/internals/array-buffer-view-core.js");

var speciesConstructor = __webpack_require__(/*! ../internals/species-constructor */ "../../node_modules/core-js/internals/species-constructor.js");

var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var aTypedArrayConstructor = ArrayBufferViewCore.aTypedArrayConstructor;
var $slice = [].slice;
var FORCED = fails(function () {
  // eslint-disable-next-line no-undef
  new Int8Array(1).slice();
}); // `%TypedArray%.prototype.slice` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.slice

ArrayBufferViewCore.exportProto('slice', function () {
  function slice(start, end) {
    var list = $slice.call(aTypedArray(this), start, end);
    var C = speciesConstructor(this, this.constructor);
    var index = 0;
    var length = list.length;
    var result = new (aTypedArrayConstructor(C))(length);

    while (length > index) {
      result[index] = list[index++];
    }

    return result;
  }

  return slice;
}(), FORCED);

/***/ }),

/***/ "../../node_modules/core-js/modules/es.typed-array.some.js":
/*!***************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.typed-array.some.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ArrayBufferViewCore = __webpack_require__(/*! ../internals/array-buffer-view-core */ "../../node_modules/core-js/internals/array-buffer-view-core.js");

var $some = __webpack_require__(/*! ../internals/array-iteration */ "../../node_modules/core-js/internals/array-iteration.js").some;

var aTypedArray = ArrayBufferViewCore.aTypedArray; // `%TypedArray%.prototype.some` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.some

ArrayBufferViewCore.exportProto('some', function () {
  function some(callbackfn
  /* , thisArg */
  ) {
    return $some(aTypedArray(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }

  return some;
}());

/***/ }),

/***/ "../../node_modules/core-js/modules/es.typed-array.sort.js":
/*!***************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.typed-array.sort.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ArrayBufferViewCore = __webpack_require__(/*! ../internals/array-buffer-view-core */ "../../node_modules/core-js/internals/array-buffer-view-core.js");

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var $sort = [].sort; // `%TypedArray%.prototype.sort` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.sort

ArrayBufferViewCore.exportProto('sort', function () {
  function sort(comparefn) {
    return $sort.call(aTypedArray(this), comparefn);
  }

  return sort;
}());

/***/ }),

/***/ "../../node_modules/core-js/modules/es.typed-array.subarray.js":
/*!*******************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.typed-array.subarray.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ArrayBufferViewCore = __webpack_require__(/*! ../internals/array-buffer-view-core */ "../../node_modules/core-js/internals/array-buffer-view-core.js");

var toLength = __webpack_require__(/*! ../internals/to-length */ "../../node_modules/core-js/internals/to-length.js");

var toAbsoluteIndex = __webpack_require__(/*! ../internals/to-absolute-index */ "../../node_modules/core-js/internals/to-absolute-index.js");

var speciesConstructor = __webpack_require__(/*! ../internals/species-constructor */ "../../node_modules/core-js/internals/species-constructor.js");

var aTypedArray = ArrayBufferViewCore.aTypedArray; // `%TypedArray%.prototype.subarray` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.subarray

ArrayBufferViewCore.exportProto('subarray', function () {
  function subarray(begin, end) {
    var O = aTypedArray(this);
    var length = O.length;
    var beginIndex = toAbsoluteIndex(begin, length);
    return new (speciesConstructor(O, O.constructor))(O.buffer, O.byteOffset + beginIndex * O.BYTES_PER_ELEMENT, toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - beginIndex));
  }

  return subarray;
}());

/***/ }),

/***/ "../../node_modules/core-js/modules/es.typed-array.to-locale-string.js":
/*!***************************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.typed-array.to-locale-string.js ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");

var ArrayBufferViewCore = __webpack_require__(/*! ../internals/array-buffer-view-core */ "../../node_modules/core-js/internals/array-buffer-view-core.js");

var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");

var Int8Array = global.Int8Array;
var aTypedArray = ArrayBufferViewCore.aTypedArray;
var $toLocaleString = [].toLocaleString;
var $slice = [].slice; // iOS Safari 6.x fails here

var TO_LOCALE_STRING_BUG = !!Int8Array && fails(function () {
  $toLocaleString.call(new Int8Array(1));
});
var FORCED = fails(function () {
  return [1, 2].toLocaleString() != new Int8Array([1, 2]).toLocaleString();
}) || !fails(function () {
  Int8Array.prototype.toLocaleString.call([1, 2]);
}); // `%TypedArray%.prototype.toLocaleString` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.tolocalestring

ArrayBufferViewCore.exportProto('toLocaleString', function () {
  function toLocaleString() {
    return $toLocaleString.apply(TO_LOCALE_STRING_BUG ? $slice.call(aTypedArray(this)) : aTypedArray(this), arguments);
  }

  return toLocaleString;
}(), FORCED);

/***/ }),

/***/ "../../node_modules/core-js/modules/es.typed-array.to-string.js":
/*!********************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.typed-array.to-string.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");

var ArrayBufferViewCore = __webpack_require__(/*! ../internals/array-buffer-view-core */ "../../node_modules/core-js/internals/array-buffer-view-core.js");

var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");

var Uint8Array = global.Uint8Array;
var Uint8ArrayPrototype = Uint8Array && Uint8Array.prototype;
var arrayToString = [].toString;
var arrayJoin = [].join;

if (fails(function () {
  arrayToString.call({});
})) {
  arrayToString = function () {
    function toString() {
      return arrayJoin.call(this);
    }

    return toString;
  }();
} // `%TypedArray%.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.tostring


ArrayBufferViewCore.exportProto('toString', arrayToString, (Uint8ArrayPrototype || {}).toString != arrayToString);

/***/ }),

/***/ "../../node_modules/core-js/modules/es.typed-array.uint16-array.js":
/*!***********************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.typed-array.uint16-array.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var typedArrayConstructor = __webpack_require__(/*! ../internals/typed-array-constructor */ "../../node_modules/core-js/internals/typed-array-constructor.js"); // `Uint16Array` constructor
// https://tc39.github.io/ecma262/#sec-typedarray-objects


typedArrayConstructor('Uint16', 2, function (init) {
  return function () {
    function Uint16Array(data, byteOffset, length) {
      return init(this, data, byteOffset, length);
    }

    return Uint16Array;
  }();
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.typed-array.uint32-array.js":
/*!***********************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.typed-array.uint32-array.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var typedArrayConstructor = __webpack_require__(/*! ../internals/typed-array-constructor */ "../../node_modules/core-js/internals/typed-array-constructor.js"); // `Uint32Array` constructor
// https://tc39.github.io/ecma262/#sec-typedarray-objects


typedArrayConstructor('Uint32', 4, function (init) {
  return function () {
    function Uint32Array(data, byteOffset, length) {
      return init(this, data, byteOffset, length);
    }

    return Uint32Array;
  }();
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.typed-array.uint8-array.js":
/*!**********************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.typed-array.uint8-array.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var typedArrayConstructor = __webpack_require__(/*! ../internals/typed-array-constructor */ "../../node_modules/core-js/internals/typed-array-constructor.js"); // `Uint8Array` constructor
// https://tc39.github.io/ecma262/#sec-typedarray-objects


typedArrayConstructor('Uint8', 1, function (init) {
  return function () {
    function Uint8Array(data, byteOffset, length) {
      return init(this, data, byteOffset, length);
    }

    return Uint8Array;
  }();
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es.typed-array.uint8-clamped-array.js":
/*!******************************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.typed-array.uint8-clamped-array.js ***!
  \******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var typedArrayConstructor = __webpack_require__(/*! ../internals/typed-array-constructor */ "../../node_modules/core-js/internals/typed-array-constructor.js"); // `Uint8ClampedArray` constructor
// https://tc39.github.io/ecma262/#sec-typedarray-objects


typedArrayConstructor('Uint8', 1, function (init) {
  return function () {
    function Uint8ClampedArray(data, byteOffset, length) {
      return init(this, data, byteOffset, length);
    }

    return Uint8ClampedArray;
  }();
}, true);

/***/ }),

/***/ "../../node_modules/core-js/modules/es.weak-map.js":
/*!*******************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.weak-map.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");

var redefineAll = __webpack_require__(/*! ../internals/redefine-all */ "../../node_modules/core-js/internals/redefine-all.js");

var InternalMetadataModule = __webpack_require__(/*! ../internals/internal-metadata */ "../../node_modules/core-js/internals/internal-metadata.js");

var collection = __webpack_require__(/*! ../internals/collection */ "../../node_modules/core-js/internals/collection.js");

var collectionWeak = __webpack_require__(/*! ../internals/collection-weak */ "../../node_modules/core-js/internals/collection-weak.js");

var isObject = __webpack_require__(/*! ../internals/is-object */ "../../node_modules/core-js/internals/is-object.js");

var enforceIternalState = __webpack_require__(/*! ../internals/internal-state */ "../../node_modules/core-js/internals/internal-state.js").enforce;

var NATIVE_WEAK_MAP = __webpack_require__(/*! ../internals/native-weak-map */ "../../node_modules/core-js/internals/native-weak-map.js");

var IS_IE11 = !global.ActiveXObject && 'ActiveXObject' in global;
var isExtensible = Object.isExtensible;
var InternalWeakMap;

var wrapper = function wrapper(get) {
  return function () {
    function WeakMap() {
      return get(this, arguments.length ? arguments[0] : undefined);
    }

    return WeakMap;
  }();
}; // `WeakMap` constructor
// https://tc39.github.io/ecma262/#sec-weakmap-constructor


var $WeakMap = module.exports = collection('WeakMap', wrapper, collectionWeak, true, true); // IE11 WeakMap frozen keys fix
// We can't use feature detection because it crash some old IE builds
// https://github.com/zloirock/core-js/issues/485

if (NATIVE_WEAK_MAP && IS_IE11) {
  InternalWeakMap = collectionWeak.getConstructor(wrapper, 'WeakMap', true);
  InternalMetadataModule.REQUIRED = true;
  var WeakMapPrototype = $WeakMap.prototype;
  var nativeDelete = WeakMapPrototype['delete'];
  var nativeHas = WeakMapPrototype.has;
  var nativeGet = WeakMapPrototype.get;
  var nativeSet = WeakMapPrototype.set;
  redefineAll(WeakMapPrototype, {
    'delete': function () {
      function _delete(key) {
        if (isObject(key) && !isExtensible(key)) {
          var state = enforceIternalState(this);
          if (!state.frozen) state.frozen = new InternalWeakMap();
          return nativeDelete.call(this, key) || state.frozen['delete'](key);
        }

        return nativeDelete.call(this, key);
      }

      return _delete;
    }(),
    has: function () {
      function has(key) {
        if (isObject(key) && !isExtensible(key)) {
          var state = enforceIternalState(this);
          if (!state.frozen) state.frozen = new InternalWeakMap();
          return nativeHas.call(this, key) || state.frozen.has(key);
        }

        return nativeHas.call(this, key);
      }

      return has;
    }(),
    get: function () {
      function get(key) {
        if (isObject(key) && !isExtensible(key)) {
          var state = enforceIternalState(this);
          if (!state.frozen) state.frozen = new InternalWeakMap();
          return nativeHas.call(this, key) ? nativeGet.call(this, key) : state.frozen.get(key);
        }

        return nativeGet.call(this, key);
      }

      return get;
    }(),
    set: function () {
      function set(key, value) {
        if (isObject(key) && !isExtensible(key)) {
          var state = enforceIternalState(this);
          if (!state.frozen) state.frozen = new InternalWeakMap();
          nativeHas.call(this, key) ? nativeSet.call(this, key, value) : state.frozen.set(key, value);
        } else nativeSet.call(this, key, value);

        return this;
      }

      return set;
    }()
  });
}

/***/ }),

/***/ "../../node_modules/core-js/modules/es.weak-set.js":
/*!*******************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/es.weak-set.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var collection = __webpack_require__(/*! ../internals/collection */ "../../node_modules/core-js/internals/collection.js");

var collectionWeak = __webpack_require__(/*! ../internals/collection-weak */ "../../node_modules/core-js/internals/collection-weak.js"); // `WeakSet` constructor
// https://tc39.github.io/ecma262/#sec-weakset-constructor


collection('WeakSet', function (get) {
  return function () {
    function WeakSet() {
      return get(this, arguments.length ? arguments[0] : undefined);
    }

    return WeakSet;
  }();
}, collectionWeak, false, true);

/***/ }),

/***/ "../../node_modules/core-js/modules/web.dom-collections.for-each.js":
/*!************************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/web.dom-collections.for-each.js ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");

var DOMIterables = __webpack_require__(/*! ../internals/dom-iterables */ "../../node_modules/core-js/internals/dom-iterables.js");

var forEach = __webpack_require__(/*! ../internals/array-for-each */ "../../node_modules/core-js/internals/array-for-each.js");

var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "../../node_modules/core-js/internals/create-non-enumerable-property.js");

for (var COLLECTION_NAME in DOMIterables) {
  var Collection = global[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype; // some Chrome versions have non-configurable methods on DOMTokenList

  if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
    createNonEnumerableProperty(CollectionPrototype, 'forEach', forEach);
  } catch (error) {
    CollectionPrototype.forEach = forEach;
  }
}

/***/ }),

/***/ "../../node_modules/core-js/modules/web.dom-collections.iterator.js":
/*!************************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/web.dom-collections.iterator.js ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");

var DOMIterables = __webpack_require__(/*! ../internals/dom-iterables */ "../../node_modules/core-js/internals/dom-iterables.js");

var ArrayIteratorMethods = __webpack_require__(/*! ../modules/es.array.iterator */ "../../node_modules/core-js/modules/es.array.iterator.js");

var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "../../node_modules/core-js/internals/create-non-enumerable-property.js");

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../node_modules/core-js/internals/well-known-symbol.js");

var ITERATOR = wellKnownSymbol('iterator');
var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var ArrayValues = ArrayIteratorMethods.values;

for (var COLLECTION_NAME in DOMIterables) {
  var Collection = global[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;

  if (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype[ITERATOR] !== ArrayValues) try {
      createNonEnumerableProperty(CollectionPrototype, ITERATOR, ArrayValues);
    } catch (error) {
      CollectionPrototype[ITERATOR] = ArrayValues;
    }

    if (!CollectionPrototype[TO_STRING_TAG]) {
      createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
    }

    if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
        createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
      } catch (error) {
        CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
      }
    }
  }
}

/***/ }),

/***/ "../../node_modules/core-js/modules/web.immediate.js":
/*!*********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/web.immediate.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");

var task = __webpack_require__(/*! ../internals/task */ "../../node_modules/core-js/internals/task.js");

var FORCED = !global.setImmediate || !global.clearImmediate; // http://w3c.github.io/setImmediate/

__webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js")({
  global: true,
  bind: true,
  enumerable: true,
  forced: FORCED
}, {
  // `setImmediate` method
  // http://w3c.github.io/setImmediate/#si-setImmediate
  setImmediate: task.set,
  // `clearImmediate` method
  // http://w3c.github.io/setImmediate/#si-clearImmediate
  clearImmediate: task.clear
});

/***/ }),

/***/ "../../node_modules/core-js/modules/web.queue-microtask.js":
/*!***************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/web.queue-microtask.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");

var microtask = __webpack_require__(/*! ../internals/microtask */ "../../node_modules/core-js/internals/microtask.js");

var classof = __webpack_require__(/*! ../internals/classof-raw */ "../../node_modules/core-js/internals/classof-raw.js");

var process = global.process;
var isNode = classof(process) == 'process'; // `queueMicrotask` method
// https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-queuemicrotask

$({
  global: true,
  enumerable: true,
  noTargetGet: true
}, {
  queueMicrotask: function () {
    function queueMicrotask(fn) {
      var domain = isNode && process.domain;
      microtask(domain ? domain.bind(fn) : fn);
    }

    return queueMicrotask;
  }()
});

/***/ }),

/***/ "../../node_modules/core-js/modules/web.timers.js":
/*!******************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/web.timers.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");

var userAgent = __webpack_require__(/*! ../internals/user-agent */ "../../node_modules/core-js/internals/user-agent.js");

var slice = [].slice;
var MSIE = /MSIE .\./.test(userAgent); // <- dirty ie9- check

var wrap = function wrap(scheduler) {
  return function (handler, timeout
  /* , ...arguments */
  ) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? slice.call(arguments, 2) : undefined;
    return scheduler(boundArgs ? function () {
      // eslint-disable-next-line no-new-func
      (typeof handler == 'function' ? handler : Function(handler)).apply(this, args);
    } : handler, timeout);
  };
}; // ie9- setTimeout & setInterval additional parameters fix
// https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers


$({
  global: true,
  bind: true,
  forced: MSIE
}, {
  // `setTimeout` method
  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-settimeout
  setTimeout: wrap(global.setTimeout),
  // `setInterval` method
  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-setinterval
  setInterval: wrap(global.setInterval)
});

/***/ }),

/***/ "../../node_modules/core-js/modules/web.url-search-params.js":
/*!*****************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/web.url-search-params.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`

__webpack_require__(/*! ../modules/es.array.iterator */ "../../node_modules/core-js/modules/es.array.iterator.js");

var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var USE_NATIVE_URL = __webpack_require__(/*! ../internals/native-url */ "../../node_modules/core-js/internals/native-url.js");

var redefine = __webpack_require__(/*! ../internals/redefine */ "../../node_modules/core-js/internals/redefine.js");

var redefineAll = __webpack_require__(/*! ../internals/redefine-all */ "../../node_modules/core-js/internals/redefine-all.js");

var setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ "../../node_modules/core-js/internals/set-to-string-tag.js");

var createIteratorConstructor = __webpack_require__(/*! ../internals/create-iterator-constructor */ "../../node_modules/core-js/internals/create-iterator-constructor.js");

var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "../../node_modules/core-js/internals/internal-state.js");

var anInstance = __webpack_require__(/*! ../internals/an-instance */ "../../node_modules/core-js/internals/an-instance.js");

var hasOwn = __webpack_require__(/*! ../internals/has */ "../../node_modules/core-js/internals/has.js");

var bind = __webpack_require__(/*! ../internals/bind-context */ "../../node_modules/core-js/internals/bind-context.js");

var anObject = __webpack_require__(/*! ../internals/an-object */ "../../node_modules/core-js/internals/an-object.js");

var isObject = __webpack_require__(/*! ../internals/is-object */ "../../node_modules/core-js/internals/is-object.js");

var getIterator = __webpack_require__(/*! ../internals/get-iterator */ "../../node_modules/core-js/internals/get-iterator.js");

var getIteratorMethod = __webpack_require__(/*! ../internals/get-iterator-method */ "../../node_modules/core-js/internals/get-iterator-method.js");

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../node_modules/core-js/internals/well-known-symbol.js");

var ITERATOR = wellKnownSymbol('iterator');
var URL_SEARCH_PARAMS = 'URLSearchParams';
var URL_SEARCH_PARAMS_ITERATOR = URL_SEARCH_PARAMS + 'Iterator';
var setInternalState = InternalStateModule.set;
var getInternalParamsState = InternalStateModule.getterFor(URL_SEARCH_PARAMS);
var getInternalIteratorState = InternalStateModule.getterFor(URL_SEARCH_PARAMS_ITERATOR);
var plus = /\+/g;
var sequences = Array(4);

var percentSequence = function percentSequence(bytes) {
  return sequences[bytes - 1] || (sequences[bytes - 1] = RegExp('((?:%[\\da-f]{2}){' + bytes + '})', 'gi'));
};

var percentDecode = function percentDecode(sequence) {
  try {
    return decodeURIComponent(sequence);
  } catch (error) {
    return sequence;
  }
};

var deserialize = function deserialize(it) {
  var result = it.replace(plus, ' ');
  var bytes = 4;

  try {
    return decodeURIComponent(result);
  } catch (error) {
    while (bytes) {
      result = result.replace(percentSequence(bytes--), percentDecode);
    }

    return result;
  }
};

var find = /[!'()~]|%20/g;
var replace = {
  '!': '%21',
  "'": '%27',
  '(': '%28',
  ')': '%29',
  '~': '%7E',
  '%20': '+'
};

var replacer = function replacer(match) {
  return replace[match];
};

var serialize = function serialize(it) {
  return encodeURIComponent(it).replace(find, replacer);
};

var parseSearchParams = function parseSearchParams(result, query) {
  if (query) {
    var attributes = query.split('&');
    var index = 0;
    var attribute, entry;

    while (index < attributes.length) {
      attribute = attributes[index++];

      if (attribute.length) {
        entry = attribute.split('=');
        result.push({
          key: deserialize(entry.shift()),
          value: deserialize(entry.join('='))
        });
      }
    }
  }
};

var updateSearchParams = function updateSearchParams(query) {
  this.entries.length = 0;
  parseSearchParams(this.entries, query);
};

var validateArgumentsLength = function validateArgumentsLength(passed, required) {
  if (passed < required) throw TypeError('Not enough arguments');
};

var URLSearchParamsIterator = createIteratorConstructor(function () {
  function Iterator(params, kind) {
    setInternalState(this, {
      type: URL_SEARCH_PARAMS_ITERATOR,
      iterator: getIterator(getInternalParamsState(params).entries),
      kind: kind
    });
  }

  return Iterator;
}(), 'Iterator', function () {
  function next() {
    var state = getInternalIteratorState(this);
    var kind = state.kind;
    var step = state.iterator.next();
    var entry = step.value;

    if (!step.done) {
      step.value = kind === 'keys' ? entry.key : kind === 'values' ? entry.value : [entry.key, entry.value];
    }

    return step;
  }

  return next;
}()); // `URLSearchParams` constructor
// https://url.spec.whatwg.org/#interface-urlsearchparams

var URLSearchParamsConstructor = function () {
  function URLSearchParams()
  /* init */
  {
    anInstance(this, URLSearchParamsConstructor, URL_SEARCH_PARAMS);
    var init = arguments.length > 0 ? arguments[0] : undefined;
    var that = this;
    var entries = [];
    var iteratorMethod, iterator, next, step, entryIterator, entryNext, first, second, key;
    setInternalState(that, {
      type: URL_SEARCH_PARAMS,
      entries: entries,
      updateURL: function () {
        function updateURL() {
          /* empty */
        }

        return updateURL;
      }(),
      updateSearchParams: updateSearchParams
    });

    if (init !== undefined) {
      if (isObject(init)) {
        iteratorMethod = getIteratorMethod(init);

        if (typeof iteratorMethod === 'function') {
          iterator = iteratorMethod.call(init);
          next = iterator.next;

          while (!(step = next.call(iterator)).done) {
            entryIterator = getIterator(anObject(step.value));
            entryNext = entryIterator.next;
            if ((first = entryNext.call(entryIterator)).done || (second = entryNext.call(entryIterator)).done || !entryNext.call(entryIterator).done) throw TypeError('Expected sequence with length 2');
            entries.push({
              key: first.value + '',
              value: second.value + ''
            });
          }
        } else for (key in init) {
          if (hasOwn(init, key)) entries.push({
            key: key,
            value: init[key] + ''
          });
        }
      } else {
        parseSearchParams(entries, typeof init === 'string' ? init.charAt(0) === '?' ? init.slice(1) : init : init + '');
      }
    }
  }

  return URLSearchParams;
}();

var URLSearchParamsPrototype = URLSearchParamsConstructor.prototype;
redefineAll(URLSearchParamsPrototype, {
  // `URLSearchParams.prototype.appent` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-append
  append: function () {
    function append(name, value) {
      validateArgumentsLength(arguments.length, 2);
      var state = getInternalParamsState(this);
      state.entries.push({
        key: name + '',
        value: value + ''
      });
      state.updateURL();
    }

    return append;
  }(),
  // `URLSearchParams.prototype.delete` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-delete
  'delete': function () {
    function _delete(name) {
      validateArgumentsLength(arguments.length, 1);
      var state = getInternalParamsState(this);
      var entries = state.entries;
      var key = name + '';
      var index = 0;

      while (index < entries.length) {
        if (entries[index].key === key) entries.splice(index, 1);else index++;
      }

      state.updateURL();
    }

    return _delete;
  }(),
  // `URLSearchParams.prototype.get` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-get
  get: function () {
    function get(name) {
      validateArgumentsLength(arguments.length, 1);
      var entries = getInternalParamsState(this).entries;
      var key = name + '';
      var index = 0;

      for (; index < entries.length; index++) {
        if (entries[index].key === key) return entries[index].value;
      }

      return null;
    }

    return get;
  }(),
  // `URLSearchParams.prototype.getAll` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-getall
  getAll: function () {
    function getAll(name) {
      validateArgumentsLength(arguments.length, 1);
      var entries = getInternalParamsState(this).entries;
      var key = name + '';
      var result = [];
      var index = 0;

      for (; index < entries.length; index++) {
        if (entries[index].key === key) result.push(entries[index].value);
      }

      return result;
    }

    return getAll;
  }(),
  // `URLSearchParams.prototype.has` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-has
  has: function () {
    function has(name) {
      validateArgumentsLength(arguments.length, 1);
      var entries = getInternalParamsState(this).entries;
      var key = name + '';
      var index = 0;

      while (index < entries.length) {
        if (entries[index++].key === key) return true;
      }

      return false;
    }

    return has;
  }(),
  // `URLSearchParams.prototype.set` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-set
  set: function () {
    function set(name, value) {
      validateArgumentsLength(arguments.length, 1);
      var state = getInternalParamsState(this);
      var entries = state.entries;
      var found = false;
      var key = name + '';
      var val = value + '';
      var index = 0;
      var entry;

      for (; index < entries.length; index++) {
        entry = entries[index];

        if (entry.key === key) {
          if (found) entries.splice(index--, 1);else {
            found = true;
            entry.value = val;
          }
        }
      }

      if (!found) entries.push({
        key: key,
        value: val
      });
      state.updateURL();
    }

    return set;
  }(),
  // `URLSearchParams.prototype.sort` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-sort
  sort: function () {
    function sort() {
      var state = getInternalParamsState(this);
      var entries = state.entries; // Array#sort is not stable in some engines

      var slice = entries.slice();
      var entry, entriesIndex, sliceIndex;
      entries.length = 0;

      for (sliceIndex = 0; sliceIndex < slice.length; sliceIndex++) {
        entry = slice[sliceIndex];

        for (entriesIndex = 0; entriesIndex < sliceIndex; entriesIndex++) {
          if (entries[entriesIndex].key > entry.key) {
            entries.splice(entriesIndex, 0, entry);
            break;
          }
        }

        if (entriesIndex === sliceIndex) entries.push(entry);
      }

      state.updateURL();
    }

    return sort;
  }(),
  // `URLSearchParams.prototype.forEach` method
  forEach: function () {
    function forEach(callback
    /* , thisArg */
    ) {
      var entries = getInternalParamsState(this).entries;
      var boundFunction = bind(callback, arguments.length > 1 ? arguments[1] : undefined, 3);
      var index = 0;
      var entry;

      while (index < entries.length) {
        entry = entries[index++];
        boundFunction(entry.value, entry.key, this);
      }
    }

    return forEach;
  }(),
  // `URLSearchParams.prototype.keys` method
  keys: function () {
    function keys() {
      return new URLSearchParamsIterator(this, 'keys');
    }

    return keys;
  }(),
  // `URLSearchParams.prototype.values` method
  values: function () {
    function values() {
      return new URLSearchParamsIterator(this, 'values');
    }

    return values;
  }(),
  // `URLSearchParams.prototype.entries` method
  entries: function () {
    function entries() {
      return new URLSearchParamsIterator(this, 'entries');
    }

    return entries;
  }()
}, {
  enumerable: true
}); // `URLSearchParams.prototype[@@iterator]` method

redefine(URLSearchParamsPrototype, ITERATOR, URLSearchParamsPrototype.entries); // `URLSearchParams.prototype.toString` method
// https://url.spec.whatwg.org/#urlsearchparams-stringification-behavior

redefine(URLSearchParamsPrototype, 'toString', function () {
  function toString() {
    var entries = getInternalParamsState(this).entries;
    var result = [];
    var index = 0;
    var entry;

    while (index < entries.length) {
      entry = entries[index++];
      result.push(serialize(entry.key) + '=' + serialize(entry.value));
    }

    return result.join('&');
  }

  return toString;
}(), {
  enumerable: true
});
setToStringTag(URLSearchParamsConstructor, URL_SEARCH_PARAMS);
$({
  global: true,
  forced: !USE_NATIVE_URL
}, {
  URLSearchParams: URLSearchParamsConstructor
});
module.exports = {
  URLSearchParams: URLSearchParamsConstructor,
  getState: getInternalParamsState
};

/***/ }),

/***/ "../../node_modules/core-js/modules/web.url.js":
/*!***************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/web.url.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`

__webpack_require__(/*! ../modules/es.string.iterator */ "../../node_modules/core-js/modules/es.string.iterator.js");

var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../node_modules/core-js/internals/descriptors.js");

var USE_NATIVE_URL = __webpack_require__(/*! ../internals/native-url */ "../../node_modules/core-js/internals/native-url.js");

var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");

var defineProperties = __webpack_require__(/*! ../internals/object-define-properties */ "../../node_modules/core-js/internals/object-define-properties.js");

var redefine = __webpack_require__(/*! ../internals/redefine */ "../../node_modules/core-js/internals/redefine.js");

var anInstance = __webpack_require__(/*! ../internals/an-instance */ "../../node_modules/core-js/internals/an-instance.js");

var has = __webpack_require__(/*! ../internals/has */ "../../node_modules/core-js/internals/has.js");

var assign = __webpack_require__(/*! ../internals/object-assign */ "../../node_modules/core-js/internals/object-assign.js");

var arrayFrom = __webpack_require__(/*! ../internals/array-from */ "../../node_modules/core-js/internals/array-from.js");

var codeAt = __webpack_require__(/*! ../internals/string-multibyte */ "../../node_modules/core-js/internals/string-multibyte.js").codeAt;

var toASCII = __webpack_require__(/*! ../internals/punycode-to-ascii */ "../../node_modules/core-js/internals/punycode-to-ascii.js");

var setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ "../../node_modules/core-js/internals/set-to-string-tag.js");

var URLSearchParamsModule = __webpack_require__(/*! ../modules/web.url-search-params */ "../../node_modules/core-js/modules/web.url-search-params.js");

var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "../../node_modules/core-js/internals/internal-state.js");

var NativeURL = global.URL;
var URLSearchParams = URLSearchParamsModule.URLSearchParams;
var getInternalSearchParamsState = URLSearchParamsModule.getState;
var setInternalState = InternalStateModule.set;
var getInternalURLState = InternalStateModule.getterFor('URL');
var floor = Math.floor;
var pow = Math.pow;
var INVALID_AUTHORITY = 'Invalid authority';
var INVALID_SCHEME = 'Invalid scheme';
var INVALID_HOST = 'Invalid host';
var INVALID_PORT = 'Invalid port';
var ALPHA = /[A-Za-z]/;
var ALPHANUMERIC = /[\d+\-.A-Za-z]/;
var DIGIT = /\d/;
var HEX_START = /^(0x|0X)/;
var OCT = /^[0-7]+$/;
var DEC = /^\d+$/;
var HEX = /^[\dA-Fa-f]+$/; // eslint-disable-next-line no-control-regex

var FORBIDDEN_HOST_CODE_POINT = /[\u0000\u0009\u000A\u000D #%/:?@[\\]]/; // eslint-disable-next-line no-control-regex

var FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT = /[\u0000\u0009\u000A\u000D #/:?@[\\]]/; // eslint-disable-next-line no-control-regex

var LEADING_AND_TRAILING_C0_CONTROL_OR_SPACE = /^[\u0000-\u001F ]+|[\u0000-\u001F ]+$/g; // eslint-disable-next-line no-control-regex

var TAB_AND_NEW_LINE = /[\u0009\u000A\u000D]/g;
var EOF;

var parseHost = function parseHost(url, input) {
  var result, codePoints, index;

  if (input.charAt(0) == '[') {
    if (input.charAt(input.length - 1) != ']') return INVALID_HOST;
    result = parseIPv6(input.slice(1, -1));
    if (!result) return INVALID_HOST;
    url.host = result; // opaque host
  } else if (!isSpecial(url)) {
    if (FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT.test(input)) return INVALID_HOST;
    result = '';
    codePoints = arrayFrom(input);

    for (index = 0; index < codePoints.length; index++) {
      result += percentEncode(codePoints[index], C0ControlPercentEncodeSet);
    }

    url.host = result;
  } else {
    input = toASCII(input);
    if (FORBIDDEN_HOST_CODE_POINT.test(input)) return INVALID_HOST;
    result = parseIPv4(input);
    if (result === null) return INVALID_HOST;
    url.host = result;
  }
};

var parseIPv4 = function parseIPv4(input) {
  var parts = input.split('.');
  var partsLength, numbers, index, part, radix, number, ipv4;

  if (parts.length && parts[parts.length - 1] == '') {
    parts.pop();
  }

  partsLength = parts.length;
  if (partsLength > 4) return input;
  numbers = [];

  for (index = 0; index < partsLength; index++) {
    part = parts[index];
    if (part == '') return input;
    radix = 10;

    if (part.length > 1 && part.charAt(0) == '0') {
      radix = HEX_START.test(part) ? 16 : 8;
      part = part.slice(radix == 8 ? 1 : 2);
    }

    if (part === '') {
      number = 0;
    } else {
      if (!(radix == 10 ? DEC : radix == 8 ? OCT : HEX).test(part)) return input;
      number = parseInt(part, radix);
    }

    numbers.push(number);
  }

  for (index = 0; index < partsLength; index++) {
    number = numbers[index];

    if (index == partsLength - 1) {
      if (number >= pow(256, 5 - partsLength)) return null;
    } else if (number > 255) return null;
  }

  ipv4 = numbers.pop();

  for (index = 0; index < numbers.length; index++) {
    ipv4 += numbers[index] * pow(256, 3 - index);
  }

  return ipv4;
}; // eslint-disable-next-line max-statements


var parseIPv6 = function parseIPv6(input) {
  var address = [0, 0, 0, 0, 0, 0, 0, 0];
  var pieceIndex = 0;
  var compress = null;
  var pointer = 0;
  var value, length, numbersSeen, ipv4Piece, number, swaps, swap;

  var _char = function _char() {
    return input.charAt(pointer);
  };

  if (_char() == ':') {
    if (input.charAt(1) != ':') return;
    pointer += 2;
    pieceIndex++;
    compress = pieceIndex;
  }

  while (_char()) {
    if (pieceIndex == 8) return;

    if (_char() == ':') {
      if (compress !== null) return;
      pointer++;
      pieceIndex++;
      compress = pieceIndex;
      continue;
    }

    value = length = 0;

    while (length < 4 && HEX.test(_char())) {
      value = value * 16 + parseInt(_char(), 16);
      pointer++;
      length++;
    }

    if (_char() == '.') {
      if (length == 0) return;
      pointer -= length;
      if (pieceIndex > 6) return;
      numbersSeen = 0;

      while (_char()) {
        ipv4Piece = null;

        if (numbersSeen > 0) {
          if (_char() == '.' && numbersSeen < 4) pointer++;else return;
        }

        if (!DIGIT.test(_char())) return;

        while (DIGIT.test(_char())) {
          number = parseInt(_char(), 10);
          if (ipv4Piece === null) ipv4Piece = number;else if (ipv4Piece == 0) return;else ipv4Piece = ipv4Piece * 10 + number;
          if (ipv4Piece > 255) return;
          pointer++;
        }

        address[pieceIndex] = address[pieceIndex] * 256 + ipv4Piece;
        numbersSeen++;
        if (numbersSeen == 2 || numbersSeen == 4) pieceIndex++;
      }

      if (numbersSeen != 4) return;
      break;
    } else if (_char() == ':') {
      pointer++;
      if (!_char()) return;
    } else if (_char()) return;

    address[pieceIndex++] = value;
  }

  if (compress !== null) {
    swaps = pieceIndex - compress;
    pieceIndex = 7;

    while (pieceIndex != 0 && swaps > 0) {
      swap = address[pieceIndex];
      address[pieceIndex--] = address[compress + swaps - 1];
      address[compress + --swaps] = swap;
    }
  } else if (pieceIndex != 8) return;

  return address;
};

var findLongestZeroSequence = function findLongestZeroSequence(ipv6) {
  var maxIndex = null;
  var maxLength = 1;
  var currStart = null;
  var currLength = 0;
  var index = 0;

  for (; index < 8; index++) {
    if (ipv6[index] !== 0) {
      if (currLength > maxLength) {
        maxIndex = currStart;
        maxLength = currLength;
      }

      currStart = null;
      currLength = 0;
    } else {
      if (currStart === null) currStart = index;
      ++currLength;
    }
  }

  if (currLength > maxLength) {
    maxIndex = currStart;
    maxLength = currLength;
  }

  return maxIndex;
};

var serializeHost = function serializeHost(host) {
  var result, index, compress, ignore0; // ipv4

  if (typeof host == 'number') {
    result = [];

    for (index = 0; index < 4; index++) {
      result.unshift(host % 256);
      host = floor(host / 256);
    }

    return result.join('.'); // ipv6
  } else if (typeof host == 'object') {
    result = '';
    compress = findLongestZeroSequence(host);

    for (index = 0; index < 8; index++) {
      if (ignore0 && host[index] === 0) continue;
      if (ignore0) ignore0 = false;

      if (compress === index) {
        result += index ? ':' : '::';
        ignore0 = true;
      } else {
        result += host[index].toString(16);
        if (index < 7) result += ':';
      }
    }

    return '[' + result + ']';
  }

  return host;
};

var C0ControlPercentEncodeSet = {};
var fragmentPercentEncodeSet = assign({}, C0ControlPercentEncodeSet, {
  ' ': 1,
  '"': 1,
  '<': 1,
  '>': 1,
  '`': 1
});
var pathPercentEncodeSet = assign({}, fragmentPercentEncodeSet, {
  '#': 1,
  '?': 1,
  '{': 1,
  '}': 1
});
var userinfoPercentEncodeSet = assign({}, pathPercentEncodeSet, {
  '/': 1,
  ':': 1,
  ';': 1,
  '=': 1,
  '@': 1,
  '[': 1,
  '\\': 1,
  ']': 1,
  '^': 1,
  '|': 1
});

var percentEncode = function percentEncode(_char2, set) {
  var code = codeAt(_char2, 0);
  return code > 0x20 && code < 0x7F && !has(set, _char2) ? _char2 : encodeURIComponent(_char2);
};

var specialSchemes = {
  ftp: 21,
  file: null,
  gopher: 70,
  http: 80,
  https: 443,
  ws: 80,
  wss: 443
};

var isSpecial = function isSpecial(url) {
  return has(specialSchemes, url.scheme);
};

var includesCredentials = function includesCredentials(url) {
  return url.username != '' || url.password != '';
};

var cannotHaveUsernamePasswordPort = function cannotHaveUsernamePasswordPort(url) {
  return !url.host || url.cannotBeABaseURL || url.scheme == 'file';
};

var isWindowsDriveLetter = function isWindowsDriveLetter(string, normalized) {
  var second;
  return string.length == 2 && ALPHA.test(string.charAt(0)) && ((second = string.charAt(1)) == ':' || !normalized && second == '|');
};

var startsWithWindowsDriveLetter = function startsWithWindowsDriveLetter(string) {
  var third;
  return string.length > 1 && isWindowsDriveLetter(string.slice(0, 2)) && (string.length == 2 || (third = string.charAt(2)) === '/' || third === '\\' || third === '?' || third === '#');
};

var shortenURLsPath = function shortenURLsPath(url) {
  var path = url.path;
  var pathSize = path.length;

  if (pathSize && (url.scheme != 'file' || pathSize != 1 || !isWindowsDriveLetter(path[0], true))) {
    path.pop();
  }
};

var isSingleDot = function isSingleDot(segment) {
  return segment === '.' || segment.toLowerCase() === '%2e';
};

var isDoubleDot = function isDoubleDot(segment) {
  segment = segment.toLowerCase();
  return segment === '..' || segment === '%2e.' || segment === '.%2e' || segment === '%2e%2e';
}; // States:


var SCHEME_START = {};
var SCHEME = {};
var NO_SCHEME = {};
var SPECIAL_RELATIVE_OR_AUTHORITY = {};
var PATH_OR_AUTHORITY = {};
var RELATIVE = {};
var RELATIVE_SLASH = {};
var SPECIAL_AUTHORITY_SLASHES = {};
var SPECIAL_AUTHORITY_IGNORE_SLASHES = {};
var AUTHORITY = {};
var HOST = {};
var HOSTNAME = {};
var PORT = {};
var FILE = {};
var FILE_SLASH = {};
var FILE_HOST = {};
var PATH_START = {};
var PATH = {};
var CANNOT_BE_A_BASE_URL_PATH = {};
var QUERY = {};
var FRAGMENT = {}; // eslint-disable-next-line max-statements

var parseURL = function parseURL(url, input, stateOverride, base) {
  var state = stateOverride || SCHEME_START;
  var pointer = 0;
  var buffer = '';
  var seenAt = false;
  var seenBracket = false;
  var seenPasswordToken = false;

  var codePoints, _char3, bufferCodePoints, failure;

  if (!stateOverride) {
    url.scheme = '';
    url.username = '';
    url.password = '';
    url.host = null;
    url.port = null;
    url.path = [];
    url.query = null;
    url.fragment = null;
    url.cannotBeABaseURL = false;
    input = input.replace(LEADING_AND_TRAILING_C0_CONTROL_OR_SPACE, '');
  }

  input = input.replace(TAB_AND_NEW_LINE, '');
  codePoints = arrayFrom(input);

  while (pointer <= codePoints.length) {
    _char3 = codePoints[pointer];

    switch (state) {
      case SCHEME_START:
        if (_char3 && ALPHA.test(_char3)) {
          buffer += _char3.toLowerCase();
          state = SCHEME;
        } else if (!stateOverride) {
          state = NO_SCHEME;
          continue;
        } else return INVALID_SCHEME;

        break;

      case SCHEME:
        if (_char3 && (ALPHANUMERIC.test(_char3) || _char3 == '+' || _char3 == '-' || _char3 == '.')) {
          buffer += _char3.toLowerCase();
        } else if (_char3 == ':') {
          if (stateOverride && (isSpecial(url) != has(specialSchemes, buffer) || buffer == 'file' && (includesCredentials(url) || url.port !== null) || url.scheme == 'file' && !url.host)) return;
          url.scheme = buffer;

          if (stateOverride) {
            if (isSpecial(url) && specialSchemes[url.scheme] == url.port) url.port = null;
            return;
          }

          buffer = '';

          if (url.scheme == 'file') {
            state = FILE;
          } else if (isSpecial(url) && base && base.scheme == url.scheme) {
            state = SPECIAL_RELATIVE_OR_AUTHORITY;
          } else if (isSpecial(url)) {
            state = SPECIAL_AUTHORITY_SLASHES;
          } else if (codePoints[pointer + 1] == '/') {
            state = PATH_OR_AUTHORITY;
            pointer++;
          } else {
            url.cannotBeABaseURL = true;
            url.path.push('');
            state = CANNOT_BE_A_BASE_URL_PATH;
          }
        } else if (!stateOverride) {
          buffer = '';
          state = NO_SCHEME;
          pointer = 0;
          continue;
        } else return INVALID_SCHEME;

        break;

      case NO_SCHEME:
        if (!base || base.cannotBeABaseURL && _char3 != '#') return INVALID_SCHEME;

        if (base.cannotBeABaseURL && _char3 == '#') {
          url.scheme = base.scheme;
          url.path = base.path.slice();
          url.query = base.query;
          url.fragment = '';
          url.cannotBeABaseURL = true;
          state = FRAGMENT;
          break;
        }

        state = base.scheme == 'file' ? FILE : RELATIVE;
        continue;

      case SPECIAL_RELATIVE_OR_AUTHORITY:
        if (_char3 == '/' && codePoints[pointer + 1] == '/') {
          state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
          pointer++;
        } else {
          state = RELATIVE;
          continue;
        }

        break;

      case PATH_OR_AUTHORITY:
        if (_char3 == '/') {
          state = AUTHORITY;
          break;
        } else {
          state = PATH;
          continue;
        }

      case RELATIVE:
        url.scheme = base.scheme;

        if (_char3 == EOF) {
          url.username = base.username;
          url.password = base.password;
          url.host = base.host;
          url.port = base.port;
          url.path = base.path.slice();
          url.query = base.query;
        } else if (_char3 == '/' || _char3 == '\\' && isSpecial(url)) {
          state = RELATIVE_SLASH;
        } else if (_char3 == '?') {
          url.username = base.username;
          url.password = base.password;
          url.host = base.host;
          url.port = base.port;
          url.path = base.path.slice();
          url.query = '';
          state = QUERY;
        } else if (_char3 == '#') {
          url.username = base.username;
          url.password = base.password;
          url.host = base.host;
          url.port = base.port;
          url.path = base.path.slice();
          url.query = base.query;
          url.fragment = '';
          state = FRAGMENT;
        } else {
          url.username = base.username;
          url.password = base.password;
          url.host = base.host;
          url.port = base.port;
          url.path = base.path.slice();
          url.path.pop();
          state = PATH;
          continue;
        }

        break;

      case RELATIVE_SLASH:
        if (isSpecial(url) && (_char3 == '/' || _char3 == '\\')) {
          state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
        } else if (_char3 == '/') {
          state = AUTHORITY;
        } else {
          url.username = base.username;
          url.password = base.password;
          url.host = base.host;
          url.port = base.port;
          state = PATH;
          continue;
        }

        break;

      case SPECIAL_AUTHORITY_SLASHES:
        state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
        if (_char3 != '/' || buffer.charAt(pointer + 1) != '/') continue;
        pointer++;
        break;

      case SPECIAL_AUTHORITY_IGNORE_SLASHES:
        if (_char3 != '/' && _char3 != '\\') {
          state = AUTHORITY;
          continue;
        }

        break;

      case AUTHORITY:
        if (_char3 == '@') {
          if (seenAt) buffer = '%40' + buffer;
          seenAt = true;
          bufferCodePoints = arrayFrom(buffer);

          for (var i = 0; i < bufferCodePoints.length; i++) {
            var codePoint = bufferCodePoints[i];

            if (codePoint == ':' && !seenPasswordToken) {
              seenPasswordToken = true;
              continue;
            }

            var encodedCodePoints = percentEncode(codePoint, userinfoPercentEncodeSet);
            if (seenPasswordToken) url.password += encodedCodePoints;else url.username += encodedCodePoints;
          }

          buffer = '';
        } else if (_char3 == EOF || _char3 == '/' || _char3 == '?' || _char3 == '#' || _char3 == '\\' && isSpecial(url)) {
          if (seenAt && buffer == '') return INVALID_AUTHORITY;
          pointer -= arrayFrom(buffer).length + 1;
          buffer = '';
          state = HOST;
        } else buffer += _char3;

        break;

      case HOST:
      case HOSTNAME:
        if (stateOverride && url.scheme == 'file') {
          state = FILE_HOST;
          continue;
        } else if (_char3 == ':' && !seenBracket) {
          if (buffer == '') return INVALID_HOST;
          failure = parseHost(url, buffer);
          if (failure) return failure;
          buffer = '';
          state = PORT;
          if (stateOverride == HOSTNAME) return;
        } else if (_char3 == EOF || _char3 == '/' || _char3 == '?' || _char3 == '#' || _char3 == '\\' && isSpecial(url)) {
          if (isSpecial(url) && buffer == '') return INVALID_HOST;
          if (stateOverride && buffer == '' && (includesCredentials(url) || url.port !== null)) return;
          failure = parseHost(url, buffer);
          if (failure) return failure;
          buffer = '';
          state = PATH_START;
          if (stateOverride) return;
          continue;
        } else {
          if (_char3 == '[') seenBracket = true;else if (_char3 == ']') seenBracket = false;
          buffer += _char3;
        }

        break;

      case PORT:
        if (DIGIT.test(_char3)) {
          buffer += _char3;
        } else if (_char3 == EOF || _char3 == '/' || _char3 == '?' || _char3 == '#' || _char3 == '\\' && isSpecial(url) || stateOverride) {
          if (buffer != '') {
            var port = parseInt(buffer, 10);
            if (port > 0xFFFF) return INVALID_PORT;
            url.port = isSpecial(url) && port === specialSchemes[url.scheme] ? null : port;
            buffer = '';
          }

          if (stateOverride) return;
          state = PATH_START;
          continue;
        } else return INVALID_PORT;

        break;

      case FILE:
        url.scheme = 'file';
        if (_char3 == '/' || _char3 == '\\') state = FILE_SLASH;else if (base && base.scheme == 'file') {
          if (_char3 == EOF) {
            url.host = base.host;
            url.path = base.path.slice();
            url.query = base.query;
          } else if (_char3 == '?') {
            url.host = base.host;
            url.path = base.path.slice();
            url.query = '';
            state = QUERY;
          } else if (_char3 == '#') {
            url.host = base.host;
            url.path = base.path.slice();
            url.query = base.query;
            url.fragment = '';
            state = FRAGMENT;
          } else {
            if (!startsWithWindowsDriveLetter(codePoints.slice(pointer).join(''))) {
              url.host = base.host;
              url.path = base.path.slice();
              shortenURLsPath(url);
            }

            state = PATH;
            continue;
          }
        } else {
          state = PATH;
          continue;
        }
        break;

      case FILE_SLASH:
        if (_char3 == '/' || _char3 == '\\') {
          state = FILE_HOST;
          break;
        }

        if (base && base.scheme == 'file' && !startsWithWindowsDriveLetter(codePoints.slice(pointer).join(''))) {
          if (isWindowsDriveLetter(base.path[0], true)) url.path.push(base.path[0]);else url.host = base.host;
        }

        state = PATH;
        continue;

      case FILE_HOST:
        if (_char3 == EOF || _char3 == '/' || _char3 == '\\' || _char3 == '?' || _char3 == '#') {
          if (!stateOverride && isWindowsDriveLetter(buffer)) {
            state = PATH;
          } else if (buffer == '') {
            url.host = '';
            if (stateOverride) return;
            state = PATH_START;
          } else {
            failure = parseHost(url, buffer);
            if (failure) return failure;
            if (url.host == 'localhost') url.host = '';
            if (stateOverride) return;
            buffer = '';
            state = PATH_START;
          }

          continue;
        } else buffer += _char3;

        break;

      case PATH_START:
        if (isSpecial(url)) {
          state = PATH;
          if (_char3 != '/' && _char3 != '\\') continue;
        } else if (!stateOverride && _char3 == '?') {
          url.query = '';
          state = QUERY;
        } else if (!stateOverride && _char3 == '#') {
          url.fragment = '';
          state = FRAGMENT;
        } else if (_char3 != EOF) {
          state = PATH;
          if (_char3 != '/') continue;
        }

        break;

      case PATH:
        if (_char3 == EOF || _char3 == '/' || _char3 == '\\' && isSpecial(url) || !stateOverride && (_char3 == '?' || _char3 == '#')) {
          if (isDoubleDot(buffer)) {
            shortenURLsPath(url);

            if (_char3 != '/' && !(_char3 == '\\' && isSpecial(url))) {
              url.path.push('');
            }
          } else if (isSingleDot(buffer)) {
            if (_char3 != '/' && !(_char3 == '\\' && isSpecial(url))) {
              url.path.push('');
            }
          } else {
            if (url.scheme == 'file' && !url.path.length && isWindowsDriveLetter(buffer)) {
              if (url.host) url.host = '';
              buffer = buffer.charAt(0) + ':'; // normalize windows drive letter
            }

            url.path.push(buffer);
          }

          buffer = '';

          if (url.scheme == 'file' && (_char3 == EOF || _char3 == '?' || _char3 == '#')) {
            while (url.path.length > 1 && url.path[0] === '') {
              url.path.shift();
            }
          }

          if (_char3 == '?') {
            url.query = '';
            state = QUERY;
          } else if (_char3 == '#') {
            url.fragment = '';
            state = FRAGMENT;
          }
        } else {
          buffer += percentEncode(_char3, pathPercentEncodeSet);
        }

        break;

      case CANNOT_BE_A_BASE_URL_PATH:
        if (_char3 == '?') {
          url.query = '';
          state = QUERY;
        } else if (_char3 == '#') {
          url.fragment = '';
          state = FRAGMENT;
        } else if (_char3 != EOF) {
          url.path[0] += percentEncode(_char3, C0ControlPercentEncodeSet);
        }

        break;

      case QUERY:
        if (!stateOverride && _char3 == '#') {
          url.fragment = '';
          state = FRAGMENT;
        } else if (_char3 != EOF) {
          if (_char3 == "'" && isSpecial(url)) url.query += '%27';else if (_char3 == '#') url.query += '%23';else url.query += percentEncode(_char3, C0ControlPercentEncodeSet);
        }

        break;

      case FRAGMENT:
        if (_char3 != EOF) url.fragment += percentEncode(_char3, fragmentPercentEncodeSet);
        break;
    }

    pointer++;
  }
}; // `URL` constructor
// https://url.spec.whatwg.org/#url-class


var URLConstructor = function () {
  function URL(url
  /* , base */
  ) {
    var that = anInstance(this, URLConstructor, 'URL');
    var base = arguments.length > 1 ? arguments[1] : undefined;
    var urlString = String(url);
    var state = setInternalState(that, {
      type: 'URL'
    });
    var baseState, failure;

    if (base !== undefined) {
      if (base instanceof URLConstructor) baseState = getInternalURLState(base);else {
        failure = parseURL(baseState = {}, String(base));
        if (failure) throw TypeError(failure);
      }
    }

    failure = parseURL(state, urlString, null, baseState);
    if (failure) throw TypeError(failure);
    var searchParams = state.searchParams = new URLSearchParams();
    var searchParamsState = getInternalSearchParamsState(searchParams);
    searchParamsState.updateSearchParams(state.query);

    searchParamsState.updateURL = function () {
      state.query = String(searchParams) || null;
    };

    if (!DESCRIPTORS) {
      that.href = serializeURL.call(that);
      that.origin = getOrigin.call(that);
      that.protocol = getProtocol.call(that);
      that.username = getUsername.call(that);
      that.password = getPassword.call(that);
      that.host = getHost.call(that);
      that.hostname = getHostname.call(that);
      that.port = getPort.call(that);
      that.pathname = getPathname.call(that);
      that.search = getSearch.call(that);
      that.searchParams = getSearchParams.call(that);
      that.hash = getHash.call(that);
    }
  }

  return URL;
}();

var URLPrototype = URLConstructor.prototype;

var serializeURL = function serializeURL() {
  var url = getInternalURLState(this);
  var scheme = url.scheme;
  var username = url.username;
  var password = url.password;
  var host = url.host;
  var port = url.port;
  var path = url.path;
  var query = url.query;
  var fragment = url.fragment;
  var output = scheme + ':';

  if (host !== null) {
    output += '//';

    if (includesCredentials(url)) {
      output += username + (password ? ':' + password : '') + '@';
    }

    output += serializeHost(host);
    if (port !== null) output += ':' + port;
  } else if (scheme == 'file') output += '//';

  output += url.cannotBeABaseURL ? path[0] : path.length ? '/' + path.join('/') : '';
  if (query !== null) output += '?' + query;
  if (fragment !== null) output += '#' + fragment;
  return output;
};

var getOrigin = function getOrigin() {
  var url = getInternalURLState(this);
  var scheme = url.scheme;
  var port = url.port;
  if (scheme == 'blob') try {
    return new URL(scheme.path[0]).origin;
  } catch (error) {
    return 'null';
  }
  if (scheme == 'file' || !isSpecial(url)) return 'null';
  return scheme + '://' + serializeHost(url.host) + (port !== null ? ':' + port : '');
};

var getProtocol = function getProtocol() {
  return getInternalURLState(this).scheme + ':';
};

var getUsername = function getUsername() {
  return getInternalURLState(this).username;
};

var getPassword = function getPassword() {
  return getInternalURLState(this).password;
};

var getHost = function getHost() {
  var url = getInternalURLState(this);
  var host = url.host;
  var port = url.port;
  return host === null ? '' : port === null ? serializeHost(host) : serializeHost(host) + ':' + port;
};

var getHostname = function getHostname() {
  var host = getInternalURLState(this).host;
  return host === null ? '' : serializeHost(host);
};

var getPort = function getPort() {
  var port = getInternalURLState(this).port;
  return port === null ? '' : String(port);
};

var getPathname = function getPathname() {
  var url = getInternalURLState(this);
  var path = url.path;
  return url.cannotBeABaseURL ? path[0] : path.length ? '/' + path.join('/') : '';
};

var getSearch = function getSearch() {
  var query = getInternalURLState(this).query;
  return query ? '?' + query : '';
};

var getSearchParams = function getSearchParams() {
  return getInternalURLState(this).searchParams;
};

var getHash = function getHash() {
  var fragment = getInternalURLState(this).fragment;
  return fragment ? '#' + fragment : '';
};

var accessorDescriptor = function accessorDescriptor(getter, setter) {
  return {
    get: getter,
    set: setter,
    configurable: true,
    enumerable: true
  };
};

if (DESCRIPTORS) {
  defineProperties(URLPrototype, {
    // `URL.prototype.href` accessors pair
    // https://url.spec.whatwg.org/#dom-url-href
    href: accessorDescriptor(serializeURL, function (href) {
      var url = getInternalURLState(this);
      var urlString = String(href);
      var failure = parseURL(url, urlString);
      if (failure) throw TypeError(failure);
      getInternalSearchParamsState(url.searchParams).updateSearchParams(url.query);
    }),
    // `URL.prototype.origin` getter
    // https://url.spec.whatwg.org/#dom-url-origin
    origin: accessorDescriptor(getOrigin),
    // `URL.prototype.protocol` accessors pair
    // https://url.spec.whatwg.org/#dom-url-protocol
    protocol: accessorDescriptor(getProtocol, function (protocol) {
      var url = getInternalURLState(this);
      parseURL(url, String(protocol) + ':', SCHEME_START);
    }),
    // `URL.prototype.username` accessors pair
    // https://url.spec.whatwg.org/#dom-url-username
    username: accessorDescriptor(getUsername, function (username) {
      var url = getInternalURLState(this);
      var codePoints = arrayFrom(String(username));
      if (cannotHaveUsernamePasswordPort(url)) return;
      url.username = '';

      for (var i = 0; i < codePoints.length; i++) {
        url.username += percentEncode(codePoints[i], userinfoPercentEncodeSet);
      }
    }),
    // `URL.prototype.password` accessors pair
    // https://url.spec.whatwg.org/#dom-url-password
    password: accessorDescriptor(getPassword, function (password) {
      var url = getInternalURLState(this);
      var codePoints = arrayFrom(String(password));
      if (cannotHaveUsernamePasswordPort(url)) return;
      url.password = '';

      for (var i = 0; i < codePoints.length; i++) {
        url.password += percentEncode(codePoints[i], userinfoPercentEncodeSet);
      }
    }),
    // `URL.prototype.host` accessors pair
    // https://url.spec.whatwg.org/#dom-url-host
    host: accessorDescriptor(getHost, function (host) {
      var url = getInternalURLState(this);
      if (url.cannotBeABaseURL) return;
      parseURL(url, String(host), HOST);
    }),
    // `URL.prototype.hostname` accessors pair
    // https://url.spec.whatwg.org/#dom-url-hostname
    hostname: accessorDescriptor(getHostname, function (hostname) {
      var url = getInternalURLState(this);
      if (url.cannotBeABaseURL) return;
      parseURL(url, String(hostname), HOSTNAME);
    }),
    // `URL.prototype.port` accessors pair
    // https://url.spec.whatwg.org/#dom-url-port
    port: accessorDescriptor(getPort, function (port) {
      var url = getInternalURLState(this);
      if (cannotHaveUsernamePasswordPort(url)) return;
      port = String(port);
      if (port == '') url.port = null;else parseURL(url, port, PORT);
    }),
    // `URL.prototype.pathname` accessors pair
    // https://url.spec.whatwg.org/#dom-url-pathname
    pathname: accessorDescriptor(getPathname, function (pathname) {
      var url = getInternalURLState(this);
      if (url.cannotBeABaseURL) return;
      url.path = [];
      parseURL(url, pathname + '', PATH_START);
    }),
    // `URL.prototype.search` accessors pair
    // https://url.spec.whatwg.org/#dom-url-search
    search: accessorDescriptor(getSearch, function (search) {
      var url = getInternalURLState(this);
      search = String(search);

      if (search == '') {
        url.query = null;
      } else {
        if ('?' == search.charAt(0)) search = search.slice(1);
        url.query = '';
        parseURL(url, search, QUERY);
      }

      getInternalSearchParamsState(url.searchParams).updateSearchParams(url.query);
    }),
    // `URL.prototype.searchParams` getter
    // https://url.spec.whatwg.org/#dom-url-searchparams
    searchParams: accessorDescriptor(getSearchParams),
    // `URL.prototype.hash` accessors pair
    // https://url.spec.whatwg.org/#dom-url-hash
    hash: accessorDescriptor(getHash, function (hash) {
      var url = getInternalURLState(this);
      hash = String(hash);

      if (hash == '') {
        url.fragment = null;
        return;
      }

      if ('#' == hash.charAt(0)) hash = hash.slice(1);
      url.fragment = '';
      parseURL(url, hash, FRAGMENT);
    })
  });
} // `URL.prototype.toJSON` method
// https://url.spec.whatwg.org/#dom-url-tojson


redefine(URLPrototype, 'toJSON', function () {
  function toJSON() {
    return serializeURL.call(this);
  }

  return toJSON;
}(), {
  enumerable: true
}); // `URL.prototype.toString` method
// https://url.spec.whatwg.org/#URL-stringification-behavior

redefine(URLPrototype, 'toString', function () {
  function toString() {
    return serializeURL.call(this);
  }

  return toString;
}(), {
  enumerable: true
});

if (NativeURL) {
  var nativeCreateObjectURL = NativeURL.createObjectURL;
  var nativeRevokeObjectURL = NativeURL.revokeObjectURL; // `URL.createObjectURL` method
  // https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
  // eslint-disable-next-line no-unused-vars

  if (nativeCreateObjectURL) redefine(URLConstructor, 'createObjectURL', function () {
    function createObjectURL(blob) {
      return nativeCreateObjectURL.apply(NativeURL, arguments);
    }

    return createObjectURL;
  }()); // `URL.revokeObjectURL` method
  // https://developer.mozilla.org/en-US/docs/Web/API/URL/revokeObjectURL
  // eslint-disable-next-line no-unused-vars

  if (nativeRevokeObjectURL) redefine(URLConstructor, 'revokeObjectURL', function () {
    function revokeObjectURL(url) {
      return nativeRevokeObjectURL.apply(NativeURL, arguments);
    }

    return revokeObjectURL;
  }());
}

setToStringTag(URLConstructor, 'URL');
$({
  global: true,
  forced: !USE_NATIVE_URL,
  sham: !DESCRIPTORS
}, {
  URL: URLConstructor
});

/***/ }),

/***/ "../../node_modules/core-js/modules/web.url.to-json.js":
/*!***********************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/core-js/modules/web.url.to-json.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js"); // `URL.prototype.toJSON` method
// https://url.spec.whatwg.org/#dom-url-tojson


$({
  target: 'URL',
  proto: true,
  enumerable: true
}, {
  toJSON: function () {
    function toJSON() {
      return URL.prototype.toString.call(this);
    }

    return toJSON;
  }()
});

/***/ }),

/***/ "../../node_modules/extract-css-chunks-webpack-plugin/dist/hmr/hotModuleReplacement.js":
/*!*******************************************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/extract-css-chunks-webpack-plugin/dist/hmr/hotModuleReplacement.js ***!
  \*******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* eslint-env browser */

/*
  eslint-disable
  no-console,
  func-names
*/

var normalizeUrl = __webpack_require__(/*! normalize-url */ "../../node_modules/extract-css-chunks-webpack-plugin/node_modules/normalize-url/index.js");

var srcByModuleId = Object.create(null);
var noDocument = typeof document === 'undefined';
var forEach = Array.prototype.forEach;

function debounce(fn, time) {
  var timeout = 0;
  return function () {
    var self = this; // eslint-disable-next-line prefer-rest-params

    var args = arguments;

    var functionCall = function () {
      function functionCall() {
        return fn.apply(self, args);
      }

      return functionCall;
    }();

    clearTimeout(timeout);
    timeout = setTimeout(functionCall, time);
  };
}

function noop() {}

function getCurrentScriptUrl(moduleId) {
  var src = srcByModuleId[moduleId];

  if (!src) {
    if (document.currentScript) {
      src = document.currentScript.src;
    } else {
      var scripts = document.getElementsByTagName('script');
      var lastScriptTag = scripts[scripts.length - 1];

      if (lastScriptTag) {
        src = lastScriptTag.src;
      }
    }

    srcByModuleId[moduleId] = src;
  }

  return function (fileMap) {
    if (!src) {
      return null;
    }

    var splitResult = src.split(/([^\\/]+)\.js$/);
    var filename = splitResult && splitResult[1];

    if (!filename) {
      return [src.replace('.js', '.css')];
    }

    if (!fileMap) {
      return [src.replace('.js', '.css')];
    }

    return fileMap.split(',').map(function (mapRule) {
      var reg = new RegExp("".concat(filename, "\\.js$"), 'g');
      return normalizeUrl(src.replace(reg, "".concat(mapRule.replace(/{fileName}/g, filename), ".css")), {
        stripWWW: false
      });
    });
  };
}

function updateCss(el, url) {
  if (!url) {
    if (!el.href) {
      return;
    } // eslint-disable-next-line


    url = el.href.split('?')[0];
  }

  if (!isUrlRequest(url)) {
    return;
  }

  if (el.isLoaded === false) {
    // We seem to be about to replace a css link that hasn't loaded yet.
    // We're probably changing the same file more than once.
    return;
  }

  if (!url || !(url.indexOf('.css') > -1)) {
    return;
  } // eslint-disable-next-line no-param-reassign


  el.visited = true;
  var newEl = el.cloneNode();
  newEl.isLoaded = false;
  newEl.addEventListener('load', function () {
    newEl.isLoaded = true;
    el.parentNode.removeChild(el);
  });
  newEl.addEventListener('error', function () {
    newEl.isLoaded = true;
    el.parentNode.removeChild(el);
  });
  newEl.href = "".concat(url, "?").concat(Date.now());

  if (el.nextSibling) {
    el.parentNode.insertBefore(newEl, el.nextSibling);
  } else {
    el.parentNode.appendChild(newEl);
  }
}

function getReloadUrl(href, src) {
  var ret; // eslint-disable-next-line no-param-reassign

  href = normalizeUrl(href, {
    stripWWW: false
  }); // eslint-disable-next-line array-callback-return

  src.some(function (url) {
    if (href.indexOf(src) > -1) {
      ret = url;
    }
  });
  return ret;
}

function reloadStyle(src) {
  var elements = document.querySelectorAll('link');
  var loaded = false;
  forEach.call(elements, function (el) {
    if (!el.href) {
      return;
    }

    var url = getReloadUrl(el.href, src);

    if (!isUrlRequest(url)) {
      return;
    }

    if (el.visited === true) {
      return;
    }

    if (url) {
      updateCss(el, url);
      loaded = true;
    }
  });
  return loaded;
}

function reloadAll() {
  var elements = document.querySelectorAll('link');
  forEach.call(elements, function (el) {
    if (el.visited === true) {
      return;
    }

    updateCss(el);
  });
}

function isUrlRequest(url) {
  // An URL is not an request if
  // It is not http or https
  if (!/^https?:/i.test(url)) {
    return false;
  }

  return true;
}

module.exports = function (moduleId, options) {
  if (noDocument) {
    console.log('no window.document found, will not HMR CSS');
    return noop;
  }

  var getScriptSrc = getCurrentScriptUrl(moduleId);

  function update() {
    var src = getScriptSrc(options.filename);
    var reloaded = reloadStyle(src);

    if (options.locals) {
      console.log('[HMR] Detected local css modules. Reload all css');
      reloadAll();
      return;
    }

    if (reloaded && !options.reloadAll) {
      console.log('[HMR] css reload %s', src.join(' '));
    } else {
      console.log('[HMR] Reload all css');
      reloadAll();
    }
  }

  return debounce(update, 50);
};

/***/ }),

/***/ "../../node_modules/extract-css-chunks-webpack-plugin/node_modules/normalize-url/index.js":
/*!**********************************************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/extract-css-chunks-webpack-plugin/node_modules/normalize-url/index.js ***!
  \**********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var url = __webpack_require__(/*! url */ "../../node_modules/url/url.js");

var punycode = __webpack_require__(/*! punycode */ "../../node_modules/node-libs-browser/node_modules/punycode/punycode.js");

var queryString = __webpack_require__(/*! query-string */ "../../node_modules/query-string/index.js");

var prependHttp = __webpack_require__(/*! prepend-http */ "../../node_modules/prepend-http/index.js");

var sortKeys = __webpack_require__(/*! sort-keys */ "../../node_modules/extract-css-chunks-webpack-plugin/node_modules/sort-keys/index.js");

var objectAssign = __webpack_require__(/*! object-assign */ "../../node_modules/object-assign/index.js");

var DEFAULT_PORTS = {
  'http:': 80,
  'https:': 443,
  'ftp:': 21
}; // protocols that always contain a `//`` bit

var slashedProtocol = {
  'http': true,
  'https': true,
  'ftp': true,
  'gopher': true,
  'file': true,
  'http:': true,
  'https:': true,
  'ftp:': true,
  'gopher:': true,
  'file:': true
};

function testParameter(name, filters) {
  return filters.some(function (filter) {
    return filter instanceof RegExp ? filter.test(name) : filter === name;
  });
}

module.exports = function (str, opts) {
  opts = objectAssign({
    normalizeProtocol: true,
    normalizeHttps: false,
    stripFragment: true,
    stripWWW: true,
    removeQueryParameters: [/^utm_\w+/i],
    removeTrailingSlash: true,
    removeDirectoryIndex: false
  }, opts);

  if (typeof str !== 'string') {
    throw new TypeError('Expected a string');
  }

  var hasRelativeProtocol = str.indexOf('//') === 0; // prepend protocol

  str = prependHttp(str.trim()).replace(/^\/\//, 'http://');
  var urlObj = url.parse(str);

  if (opts.normalizeHttps && urlObj.protocol === 'https:') {
    urlObj.protocol = 'http:';
  }

  if (!urlObj.hostname && !urlObj.pathname) {
    throw new Error('Invalid URL');
  } // prevent these from being used by `url.format`


  delete urlObj.host;
  delete urlObj.query; // remove fragment

  if (opts.stripFragment) {
    delete urlObj.hash;
  } // remove default port


  var port = DEFAULT_PORTS[urlObj.protocol];

  if (Number(urlObj.port) === port) {
    delete urlObj.port;
  } // remove duplicate slashes


  if (urlObj.pathname) {
    urlObj.pathname = urlObj.pathname.replace(/\/{2,}/g, '/');
  } // decode URI octets


  if (urlObj.pathname) {
    urlObj.pathname = decodeURI(urlObj.pathname);
  } // remove directory index


  if (opts.removeDirectoryIndex === true) {
    opts.removeDirectoryIndex = [/^index\.[a-z]+$/];
  }

  if (Array.isArray(opts.removeDirectoryIndex) && opts.removeDirectoryIndex.length) {
    var pathComponents = urlObj.pathname.split('/');
    var lastComponent = pathComponents[pathComponents.length - 1];

    if (testParameter(lastComponent, opts.removeDirectoryIndex)) {
      pathComponents = pathComponents.slice(0, pathComponents.length - 1);
      urlObj.pathname = pathComponents.slice(1).join('/') + '/';
    }
  } // resolve relative paths, but only for slashed protocols


  if (slashedProtocol[urlObj.protocol]) {
    var domain = urlObj.protocol + '//' + urlObj.hostname;
    var relative = url.resolve(domain, urlObj.pathname);
    urlObj.pathname = relative.replace(domain, '');
  }

  if (urlObj.hostname) {
    // IDN to Unicode
    urlObj.hostname = punycode.toUnicode(urlObj.hostname).toLowerCase(); // remove trailing dot

    urlObj.hostname = urlObj.hostname.replace(/\.$/, ''); // remove `www.`

    if (opts.stripWWW) {
      urlObj.hostname = urlObj.hostname.replace(/^www\./, '');
    }
  } // remove URL with empty query string


  if (urlObj.search === '?') {
    delete urlObj.search;
  }

  var queryParameters = queryString.parse(urlObj.search); // remove query unwanted parameters

  if (Array.isArray(opts.removeQueryParameters)) {
    for (var key in queryParameters) {
      if (testParameter(key, opts.removeQueryParameters)) {
        delete queryParameters[key];
      }
    }
  } // sort query parameters


  urlObj.search = queryString.stringify(sortKeys(queryParameters)); // decode query parameters

  urlObj.search = decodeURIComponent(urlObj.search); // take advantage of many of the Node `url` normalizations

  str = url.format(urlObj); // remove ending `/`

  if (opts.removeTrailingSlash || urlObj.pathname === '/') {
    str = str.replace(/\/$/, '');
  } // restore relative protocol, if applicable


  if (hasRelativeProtocol && !opts.normalizeProtocol) {
    str = str.replace(/^http:\/\//, '//');
  }

  return str;
};

/***/ }),

/***/ "../../node_modules/extract-css-chunks-webpack-plugin/node_modules/sort-keys/index.js":
/*!******************************************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/extract-css-chunks-webpack-plugin/node_modules/sort-keys/index.js ***!
  \******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isPlainObj = __webpack_require__(/*! is-plain-obj */ "../../node_modules/is-plain-obj/index.js");

module.exports = function (obj, opts) {
  if (!isPlainObj(obj)) {
    throw new TypeError('Expected a plain object');
  }

  opts = opts || {}; // DEPRECATED

  if (typeof opts === 'function') {
    opts = {
      compare: opts
    };
  }

  var deep = opts.deep;
  var seenInput = [];
  var seenOutput = [];

  var sortKeys = function sortKeys(x) {
    var seenIndex = seenInput.indexOf(x);

    if (seenIndex !== -1) {
      return seenOutput[seenIndex];
    }

    var ret = {};
    var keys = Object.keys(x).sort(opts.compare);
    seenInput.push(x);
    seenOutput.push(ret);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var val = x[key];
      ret[key] = deep && isPlainObj(val) ? sortKeys(val) : val;
    }

    return ret;
  };

  return sortKeys(obj);
};

/***/ }),

/***/ "../../node_modules/fg-loadcss/src/loadCSS.js":
/*!**************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/fg-loadcss/src/loadCSS.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

/*! loadCSS. [c]2017 Filament Group, Inc. MIT License */
(function (w) {
  "use strict";
  /* exported loadCSS */

  var loadCSS = function loadCSS(href, before, media, attributes) {
    // Arguments explained:
    // `href` [REQUIRED] is the URL for your CSS file.
    // `before` [OPTIONAL] is the element the script should use as a reference for injecting our stylesheet <link> before
    // By default, loadCSS attempts to inject the link after the last stylesheet or script in the DOM. However, you might desire a more specific location in your document.
    // `media` [OPTIONAL] is the media type or query of the stylesheet. By default it will be 'all'
    // `attributes` [OPTIONAL] is the Object of attribute name/attribute value pairs to set on the stylesheet's DOM Element.
    var doc = w.document;
    var ss = doc.createElement("link");
    var ref;

    if (before) {
      ref = before;
    } else {
      var refs = (doc.body || doc.getElementsByTagName("head")[0]).childNodes;
      ref = refs[refs.length - 1];
    }

    var sheets = doc.styleSheets; // Set any of the provided attributes to the stylesheet DOM Element.

    if (attributes) {
      for (var attributeName in attributes) {
        if (attributes.hasOwnProperty(attributeName)) {
          ss.setAttribute(attributeName, attributes[attributeName]);
        }
      }
    }

    ss.rel = "stylesheet";
    ss.href = href; // temporarily set media to something inapplicable to ensure it'll fetch without blocking render

    ss.media = "only x"; // wait until body is defined before injecting link. This ensures a non-blocking load in IE11.

    function ready(cb) {
      if (doc.body) {
        return cb();
      }

      setTimeout(function () {
        ready(cb);
      });
    } // Inject link
    // Note: the ternary preserves the existing behavior of "before" argument, but we could choose to change the argument to "after" in a later release and standardize on ref.nextSibling for all refs
    // Note: `insertBefore` is used instead of `appendChild`, for safety re: http://www.paulirish.com/2011/surefire-dom-element-insertion/


    ready(function () {
      ref.parentNode.insertBefore(ss, before ? ref : ref.nextSibling);
    }); // A method (exposed on return object for external use) that mimics onload by polling document.styleSheets until it includes the new sheet.

    var onloadcssdefined = function onloadcssdefined(cb) {
      var resolvedHref = ss.href;
      var i = sheets.length;

      while (i--) {
        if (sheets[i].href === resolvedHref) {
          return cb();
        }
      }

      setTimeout(function () {
        onloadcssdefined(cb);
      });
    };

    function loadCB() {
      if (ss.addEventListener) {
        ss.removeEventListener("load", loadCB);
      }

      ss.media = media || "all";
    } // once loaded, set link's media back to `all` so that the stylesheet applies once it loads


    if (ss.addEventListener) {
      ss.addEventListener("load", loadCB);
    }

    ss.onloadcssdefined = onloadcssdefined;
    onloadcssdefined(loadCB);
    return ss;
  }; // commonjs


  if (true) {
    exports.loadCSS = loadCSS;
  } else {}
})(typeof global !== "undefined" ? global : void 0);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "../../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../../node_modules/inferno-vnode-flags/dist/index.esm.js":
/*!**************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/inferno-vnode-flags/dist/index.esm.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.VNodeFlags = exports.ChildFlags = void 0;

/* If editing these values check babel-plugin-also */
var VNodeFlags;
exports.VNodeFlags = VNodeFlags;

(function (VNodeFlags) {
  /* First set of bits define shape of vNode */
  VNodeFlags[VNodeFlags["HtmlElement"] = 1] = "HtmlElement";
  VNodeFlags[VNodeFlags["ComponentUnknown"] = 2] = "ComponentUnknown";
  VNodeFlags[VNodeFlags["ComponentClass"] = 4] = "ComponentClass";
  VNodeFlags[VNodeFlags["ComponentFunction"] = 8] = "ComponentFunction";
  VNodeFlags[VNodeFlags["Text"] = 16] = "Text";
  /* Special flags */

  VNodeFlags[VNodeFlags["SvgElement"] = 32] = "SvgElement";
  VNodeFlags[VNodeFlags["InputElement"] = 64] = "InputElement";
  VNodeFlags[VNodeFlags["TextareaElement"] = 128] = "TextareaElement";
  VNodeFlags[VNodeFlags["SelectElement"] = 256] = "SelectElement";
  VNodeFlags[VNodeFlags["Void"] = 512] = "Void";
  VNodeFlags[VNodeFlags["Portal"] = 1024] = "Portal";
  VNodeFlags[VNodeFlags["ReCreate"] = 2048] = "ReCreate";
  VNodeFlags[VNodeFlags["ContentEditable"] = 4096] = "ContentEditable";
  VNodeFlags[VNodeFlags["Fragment"] = 8192] = "Fragment";
  VNodeFlags[VNodeFlags["InUse"] = 16384] = "InUse";
  VNodeFlags[VNodeFlags["ForwardRef"] = 32768] = "ForwardRef";
  VNodeFlags[VNodeFlags["Normalized"] = 65536] = "Normalized";
  /* Masks */

  VNodeFlags[VNodeFlags["ForwardRefComponent"] = 32776] = "ForwardRefComponent";
  VNodeFlags[VNodeFlags["FormElement"] = 448] = "FormElement";
  VNodeFlags[VNodeFlags["Element"] = 481] = "Element";
  VNodeFlags[VNodeFlags["Component"] = 14] = "Component";
  VNodeFlags[VNodeFlags["DOMRef"] = 2033] = "DOMRef";
  VNodeFlags[VNodeFlags["InUseOrNormalized"] = 81920] = "InUseOrNormalized";
  VNodeFlags[VNodeFlags["ClearInUse"] = -16385] = "ClearInUse";
  VNodeFlags[VNodeFlags["ComponentKnown"] = 12] = "ComponentKnown";
})(VNodeFlags || (exports.VNodeFlags = VNodeFlags = {})); // Combinations are not possible, its bitwise only to reduce vNode size


var ChildFlags;
exports.ChildFlags = ChildFlags;

(function (ChildFlags) {
  ChildFlags[ChildFlags["UnknownChildren"] = 0] = "UnknownChildren";
  /* Second set of bits define shape of children */

  ChildFlags[ChildFlags["HasInvalidChildren"] = 1] = "HasInvalidChildren";
  ChildFlags[ChildFlags["HasVNodeChildren"] = 2] = "HasVNodeChildren";
  ChildFlags[ChildFlags["HasNonKeyedChildren"] = 4] = "HasNonKeyedChildren";
  ChildFlags[ChildFlags["HasKeyedChildren"] = 8] = "HasKeyedChildren";
  ChildFlags[ChildFlags["HasTextChildren"] = 16] = "HasTextChildren";
  ChildFlags[ChildFlags["MultipleChildren"] = 12] = "MultipleChildren";
})(ChildFlags || (exports.ChildFlags = ChildFlags = {}));

/***/ }),

/***/ "../../node_modules/inferno/dist/index.esm.js":
/*!**************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/inferno/dist/index.esm.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports._CI = createClassComponentInstance;
exports._HI = normalizeRoot;
exports._M = mount;
exports._MCCC = mountClassComponentCallbacks;
exports._ME = mountElement;
exports._MFCC = mountFunctionalComponentCallbacks;
exports._MP = mountProps;
exports._MR = mountRef;
exports.__render = __render;
exports.createComponentVNode = createComponentVNode;
exports.createFragment = createFragment;
exports.createPortal = createPortal;
exports.createRef = createRef;
exports.createRenderer = createRenderer;
exports.createTextVNode = createTextVNode;
exports.createVNode = createVNode;
exports.directClone = directClone;
exports.findDOMfromVNode = findDOMfromVNode;
exports.forwardRef = forwardRef;
exports.getFlagsForElementVnode = getFlagsForElementVnode;
exports.linkEvent = linkEvent;
exports.normalizeProps = normalizeProps;
exports.render = render;
exports.rerender = rerender;
exports.version = exports.options = exports.Fragment = exports.EMPTY_OBJ = exports.Component = void 0;
var isArray = Array.isArray;

function isStringOrNumber(o) {
  var type = typeof o;
  return type === 'string' || type === 'number';
}

function isNullOrUndef(o) {
  return o === void 0 || o === null;
}

function isInvalid(o) {
  return o === null || o === false || o === true || o === void 0;
}

function isFunction(o) {
  return typeof o === 'function';
}

function isString(o) {
  return typeof o === 'string';
}

function isNumber(o) {
  return typeof o === 'number';
}

function isNull(o) {
  return o === null;
}

function isUndefined(o) {
  return o === void 0;
}

function combineFrom(first, second) {
  var out = {};

  if (first) {
    for (var key in first) {
      out[key] = first[key];
    }
  }

  if (second) {
    for (var key$1 in second) {
      out[key$1] = second[key$1];
    }
  }

  return out;
}
/**
 * Links given data to event as first parameter
 * @param {*} data data to be linked, it will be available in function as first parameter
 * @param {Function} event Function to be called when event occurs
 * @returns {{data: *, event: Function}}
 */


function linkEvent(data, event) {
  if (isFunction(event)) {
    return {
      data: data,
      event: event
    };
  }

  return null; // Return null when event is invalid, to avoid creating unnecessary event handlers
} // object.event should always be function, otherwise its badly created object.


function isLinkEventObject(o) {
  return !isNull(o) && typeof o === 'object';
} // We need EMPTY_OBJ defined in one place.
// Its used for comparison so we cant inline it into shared


var EMPTY_OBJ = {};
exports.EMPTY_OBJ = EMPTY_OBJ;
var Fragment = '$F';
exports.Fragment = Fragment;

function normalizeEventName(name) {
  return name.substr(2).toLowerCase();
}

function appendChild(parentDOM, dom) {
  parentDOM.appendChild(dom);
}

function insertOrAppend(parentDOM, newNode, nextNode) {
  if (isNull(nextNode)) {
    appendChild(parentDOM, newNode);
  } else {
    parentDOM.insertBefore(newNode, nextNode);
  }
}

function documentCreateElement(tag, isSVG) {
  if (isSVG) {
    return document.createElementNS('http://www.w3.org/2000/svg', tag);
  }

  return document.createElement(tag);
}

function replaceChild(parentDOM, newDom, lastDom) {
  parentDOM.replaceChild(newDom, lastDom);
}

function removeChild(parentDOM, childNode) {
  parentDOM.removeChild(childNode);
}

function callAll(arrayFn) {
  var listener;

  while ((listener = arrayFn.shift()) !== undefined) {
    listener();
  }
}

function findChildVNode(vNode, startEdge, flags) {
  var children = vNode.children;

  if (flags & 4
  /* ComponentClass */
  ) {
      return children.$LI;
    }

  if (flags & 8192
  /* Fragment */
  ) {
      return vNode.childFlags === 2
      /* HasVNodeChildren */
      ? children : children[startEdge ? 0 : children.length - 1];
    }

  return children;
}

function findDOMfromVNode(vNode, startEdge) {
  var flags;

  while (vNode) {
    flags = vNode.flags;

    if (flags & 2033
    /* DOMRef */
    ) {
        return vNode.dom;
      }

    vNode = findChildVNode(vNode, startEdge, flags);
  }

  return null;
}

function removeVNodeDOM(vNode, parentDOM) {
  do {
    var flags = vNode.flags;

    if (flags & 2033
    /* DOMRef */
    ) {
        removeChild(parentDOM, vNode.dom);
        return;
      }

    var children = vNode.children;

    if (flags & 4
    /* ComponentClass */
    ) {
        vNode = children.$LI;
      }

    if (flags & 8
    /* ComponentFunction */
    ) {
        vNode = children;
      }

    if (flags & 8192
    /* Fragment */
    ) {
        if (vNode.childFlags === 2
        /* HasVNodeChildren */
        ) {
            vNode = children;
          } else {
          for (var i = 0, len = children.length; i < len; ++i) {
            removeVNodeDOM(children[i], parentDOM);
          }

          return;
        }
      }
  } while (vNode);
}

function moveVNodeDOM(vNode, parentDOM, nextNode) {
  do {
    var flags = vNode.flags;

    if (flags & 2033
    /* DOMRef */
    ) {
        insertOrAppend(parentDOM, vNode.dom, nextNode);
        return;
      }

    var children = vNode.children;

    if (flags & 4
    /* ComponentClass */
    ) {
        vNode = children.$LI;
      }

    if (flags & 8
    /* ComponentFunction */
    ) {
        vNode = children;
      }

    if (flags & 8192
    /* Fragment */
    ) {
        if (vNode.childFlags === 2
        /* HasVNodeChildren */
        ) {
            vNode = children;
          } else {
          for (var i = 0, len = children.length; i < len; ++i) {
            moveVNodeDOM(children[i], parentDOM, nextNode);
          }

          return;
        }
      }
  } while (vNode);
}

function createDerivedState(instance, nextProps, state) {
  if (instance.constructor.getDerivedStateFromProps) {
    return combineFrom(state, instance.constructor.getDerivedStateFromProps(nextProps, state));
  }

  return state;
}

var renderCheck = {
  v: false
};
var options = {
  componentComparator: null,
  createVNode: null,
  renderComplete: null
};
exports.options = options;

function setTextContent(dom, children) {
  dom.textContent = children;
} // Calling this function assumes, nextValue is linkEvent


function isLastValueSameLinkEvent(lastValue, nextValue) {
  return isLinkEventObject(lastValue) && lastValue.event === nextValue.event && lastValue.data === nextValue.data;
}

function mergeUnsetProperties(to, from) {
  for (var propName in from) {
    if (isUndefined(to[propName])) {
      to[propName] = from[propName];
    }
  }

  return to;
}

function safeCall1(method, arg1) {
  return !!isFunction(method) && (method(arg1), true);
}

var keyPrefix = '$';

function V(childFlags, children, className, flags, key, props, ref, type) {
  this.childFlags = childFlags;
  this.children = children;
  this.className = className;
  this.dom = null;
  this.flags = flags;
  this.key = key === void 0 ? null : key;
  this.props = props === void 0 ? null : props;
  this.ref = ref === void 0 ? null : ref;
  this.type = type;
}

function createVNode(flags, type, className, children, childFlags, props, key, ref) {
  var childFlag = childFlags === void 0 ? 1
  /* HasInvalidChildren */
  : childFlags;
  var vNode = new V(childFlag, children, className, flags, key, props, ref, type);

  if (options.createVNode) {
    options.createVNode(vNode);
  }

  if (childFlag === 0
  /* UnknownChildren */
  ) {
      normalizeChildren(vNode, vNode.children);
    }

  return vNode;
}

function mergeDefaultHooks(flags, type, ref) {
  if (flags & 4
  /* ComponentClass */
  ) {
      return ref;
    }

  var defaultHooks = (flags & 32768
  /* ForwardRef */
  ? type.render : type).defaultHooks;

  if (isNullOrUndef(defaultHooks)) {
    return ref;
  }

  if (isNullOrUndef(ref)) {
    return defaultHooks;
  }

  return mergeUnsetProperties(ref, defaultHooks);
}

function mergeDefaultProps(flags, type, props) {
  // set default props
  var defaultProps = (flags & 32768
  /* ForwardRef */
  ? type.render : type).defaultProps;

  if (isNullOrUndef(defaultProps)) {
    return props;
  }

  if (isNullOrUndef(props)) {
    return combineFrom(defaultProps, null);
  }

  return mergeUnsetProperties(props, defaultProps);
}

function resolveComponentFlags(flags, type) {
  if (flags & 12
  /* ComponentKnown */
  ) {
      return flags;
    }

  if (type.prototype && type.prototype.render) {
    return 4
    /* ComponentClass */
    ;
  }

  if (type.render) {
    return 32776
    /* ForwardRefComponent */
    ;
  }

  return 8
  /* ComponentFunction */
  ;
}

function createComponentVNode(flags, type, props, key, ref) {
  flags = resolveComponentFlags(flags, type);
  var vNode = new V(1
  /* HasInvalidChildren */
  , null, null, flags, key, mergeDefaultProps(flags, type, props), mergeDefaultHooks(flags, type, ref), type);

  if (options.createVNode) {
    options.createVNode(vNode);
  }

  return vNode;
}

function createTextVNode(text, key) {
  return new V(1
  /* HasInvalidChildren */
  , isNullOrUndef(text) || text === true || text === false ? '' : text, null, 16
  /* Text */
  , key, null, null, null);
}

function createFragment(children, childFlags, key) {
  var fragment = createVNode(8192
  /* Fragment */
  , 8192
  /* Fragment */
  , null, children, childFlags, null, key, null);

  switch (fragment.childFlags) {
    case 1
    /* HasInvalidChildren */
    :
      fragment.children = createVoidVNode();
      fragment.childFlags = 2
      /* HasVNodeChildren */
      ;
      break;

    case 16
    /* HasTextChildren */
    :
      fragment.children = [createTextVNode(children)];
      fragment.childFlags = 4
      /* HasNonKeyedChildren */
      ;
      break;

    default:
      break;
  }

  return fragment;
}

function normalizeProps(vNode) {
  var props = vNode.props;

  if (props) {
    var flags = vNode.flags;

    if (flags & 481
    /* Element */
    ) {
        if (props.children !== void 0 && isNullOrUndef(vNode.children)) {
          normalizeChildren(vNode, props.children);
        }

        if (props.className !== void 0) {
          vNode.className = props.className || null;
          props.className = undefined;
        }
      }

    if (props.key !== void 0) {
      vNode.key = props.key;
      props.key = undefined;
    }

    if (props.ref !== void 0) {
      if (flags & 8
      /* ComponentFunction */
      ) {
          vNode.ref = combineFrom(vNode.ref, props.ref);
        } else {
        vNode.ref = props.ref;
      }

      props.ref = undefined;
    }
  }

  return vNode;
}
/*
 * Fragment is different than normal vNode,
 * because when it needs to be cloned we need to clone its children too
 * But not normalize, because otherwise those possibly get KEY and re-mount
 */


function cloneFragment(vNodeToClone) {
  var clonedChildren;
  var oldChildren = vNodeToClone.children;
  var childFlags = vNodeToClone.childFlags;

  if (childFlags === 2
  /* HasVNodeChildren */
  ) {
      clonedChildren = directClone(oldChildren);
    } else if (childFlags & 12
  /* MultipleChildren */
  ) {
      clonedChildren = [];

      for (var i = 0, len = oldChildren.length; i < len; ++i) {
        clonedChildren.push(directClone(oldChildren[i]));
      }
    }

  return createFragment(clonedChildren, childFlags, vNodeToClone.key);
}

function directClone(vNodeToClone) {
  var flags = vNodeToClone.flags & -16385
  /* ClearInUse */
  ;
  var props = vNodeToClone.props;

  if (flags & 14
  /* Component */
  ) {
      if (!isNull(props)) {
        var propsToClone = props;
        props = {};

        for (var key in propsToClone) {
          props[key] = propsToClone[key];
        }
      }
    }

  if ((flags & 8192
  /* Fragment */
  ) === 0) {
    return new V(vNodeToClone.childFlags, vNodeToClone.children, vNodeToClone.className, flags, vNodeToClone.key, props, vNodeToClone.ref, vNodeToClone.type);
  }

  return cloneFragment(vNodeToClone);
}

function createVoidVNode() {
  return createTextVNode('', null);
}

function createPortal(children, container) {
  var normalizedRoot = normalizeRoot(children);
  return createVNode(1024
  /* Portal */
  , 1024
  /* Portal */
  , null, normalizedRoot, 0
  /* UnknownChildren */
  , null, normalizedRoot.key, container);
}

function _normalizeVNodes(nodes, result, index, currentKey) {
  for (var len = nodes.length; index < len; index++) {
    var n = nodes[index];

    if (!isInvalid(n)) {
      var newKey = currentKey + keyPrefix + index;

      if (isArray(n)) {
        _normalizeVNodes(n, result, 0, newKey);
      } else {
        if (isStringOrNumber(n)) {
          n = createTextVNode(n, newKey);
        } else {
          var oldKey = n.key;
          var isPrefixedKey = isString(oldKey) && oldKey[0] === keyPrefix;

          if (n.flags & 81920
          /* InUseOrNormalized */
          || isPrefixedKey) {
            n = directClone(n);
          }

          n.flags |= 65536
          /* Normalized */
          ;

          if (!isPrefixedKey) {
            if (isNull(oldKey)) {
              n.key = newKey;
            } else {
              n.key = currentKey + oldKey;
            }
          } else if (oldKey.substring(0, currentKey.length) !== currentKey) {
            n.key = currentKey + oldKey;
          }
        }

        result.push(n);
      }
    }
  }
}

function getFlagsForElementVnode(type) {
  switch (type) {
    case 'svg':
      return 32
      /* SvgElement */
      ;

    case 'input':
      return 64
      /* InputElement */
      ;

    case 'select':
      return 256
      /* SelectElement */
      ;

    case 'textarea':
      return 128
      /* TextareaElement */
      ;

    case Fragment:
      return 8192
      /* Fragment */
      ;

    default:
      return 1
      /* HtmlElement */
      ;
  }
}

function normalizeChildren(vNode, children) {
  var newChildren;
  var newChildFlags = 1
  /* HasInvalidChildren */
  ; // Don't change children to match strict equal (===) true in patching

  if (isInvalid(children)) {
    newChildren = children;
  } else if (isStringOrNumber(children)) {
    newChildFlags = 16
    /* HasTextChildren */
    ;
    newChildren = children;
  } else if (isArray(children)) {
    var len = children.length;

    for (var i = 0; i < len; ++i) {
      var n = children[i];

      if (isInvalid(n) || isArray(n)) {
        newChildren = newChildren || children.slice(0, i);

        _normalizeVNodes(children, newChildren, i, '');

        break;
      } else if (isStringOrNumber(n)) {
        newChildren = newChildren || children.slice(0, i);
        newChildren.push(createTextVNode(n, keyPrefix + i));
      } else {
        var key = n.key;
        var needsCloning = (n.flags & 81920
        /* InUseOrNormalized */
        ) > 0;
        var isNullKey = isNull(key);
        var isPrefixed = isString(key) && key[0] === keyPrefix;

        if (needsCloning || isNullKey || isPrefixed) {
          newChildren = newChildren || children.slice(0, i);

          if (needsCloning || isPrefixed) {
            n = directClone(n);
          }

          if (isNullKey || isPrefixed) {
            n.key = keyPrefix + i;
          }

          newChildren.push(n);
        } else if (newChildren) {
          newChildren.push(n);
        }

        n.flags |= 65536
        /* Normalized */
        ;
      }
    }

    newChildren = newChildren || children;

    if (newChildren.length === 0) {
      newChildFlags = 1
      /* HasInvalidChildren */
      ;
    } else {
      newChildFlags = 8
      /* HasKeyedChildren */
      ;
    }
  } else {
    newChildren = children;
    newChildren.flags |= 65536
    /* Normalized */
    ;

    if (children.flags & 81920
    /* InUseOrNormalized */
    ) {
        newChildren = directClone(children);
      }

    newChildFlags = 2
    /* HasVNodeChildren */
    ;
  }

  vNode.children = newChildren;
  vNode.childFlags = newChildFlags;
  return vNode;
}

function normalizeRoot(input) {
  if (isInvalid(input) || isStringOrNumber(input)) {
    return createTextVNode(input, null);
  }

  if (isArray(input)) {
    return createFragment(input, 0
    /* UnknownChildren */
    , null);
  }

  return input.flags & 16384
  /* InUse */
  ? directClone(input) : input;
}

var xlinkNS = 'http://www.w3.org/1999/xlink';
var xmlNS = 'http://www.w3.org/XML/1998/namespace';
var namespaces = {
  'xlink:actuate': xlinkNS,
  'xlink:arcrole': xlinkNS,
  'xlink:href': xlinkNS,
  'xlink:role': xlinkNS,
  'xlink:show': xlinkNS,
  'xlink:title': xlinkNS,
  'xlink:type': xlinkNS,
  'xml:base': xmlNS,
  'xml:lang': xmlNS,
  'xml:space': xmlNS
};

function getDelegatedEventObject(v) {
  return {
    onClick: v,
    onDblClick: v,
    onFocusIn: v,
    onFocusOut: v,
    onKeyDown: v,
    onKeyPress: v,
    onKeyUp: v,
    onMouseDown: v,
    onMouseMove: v,
    onMouseUp: v,
    onTouchEnd: v,
    onTouchMove: v,
    onTouchStart: v
  };
}

var attachedEventCounts = getDelegatedEventObject(0);
var attachedEvents = getDelegatedEventObject(null);
var syntheticEvents = getDelegatedEventObject(true);

function updateOrAddSyntheticEvent(name, dom) {
  var eventsObject = dom.$EV;

  if (!eventsObject) {
    eventsObject = dom.$EV = getDelegatedEventObject(null);
  }

  if (!eventsObject[name]) {
    if (++attachedEventCounts[name] === 1) {
      attachedEvents[name] = attachEventToDocument(name);
    }
  }

  return eventsObject;
}

function unmountSyntheticEvent(name, dom) {
  var eventsObject = dom.$EV;

  if (eventsObject && eventsObject[name]) {
    if (--attachedEventCounts[name] === 0) {
      document.removeEventListener(normalizeEventName(name), attachedEvents[name]);
      attachedEvents[name] = null;
    }

    eventsObject[name] = null;
  }
}

function handleSyntheticEvent(name, lastEvent, nextEvent, dom) {
  if (isFunction(nextEvent)) {
    updateOrAddSyntheticEvent(name, dom)[name] = nextEvent;
  } else if (isLinkEventObject(nextEvent)) {
    if (isLastValueSameLinkEvent(lastEvent, nextEvent)) {
      return;
    }

    updateOrAddSyntheticEvent(name, dom)[name] = nextEvent;
  } else {
    unmountSyntheticEvent(name, dom);
  }
} // When browsers fully support event.composedPath we could loop it through instead of using parentNode property


function getTargetNode(event) {
  return isFunction(event.composedPath) ? event.composedPath()[0] : event.target;
}

function dispatchEvents(event, isClick, name, eventData) {
  var dom = getTargetNode(event);

  do {
    // Html Nodes can be nested fe: span inside button in that scenario browser does not handle disabled attribute on parent,
    // because the event listener is on document.body
    // Don't process clicks on disabled elements
    if (isClick && dom.disabled) {
      return;
    }

    var eventsObject = dom.$EV;

    if (eventsObject) {
      var currentEvent = eventsObject[name];

      if (currentEvent) {
        // linkEvent object
        eventData.dom = dom;
        currentEvent.event ? currentEvent.event(currentEvent.data, event) : currentEvent(event);

        if (event.cancelBubble) {
          return;
        }
      }
    }

    dom = dom.parentNode;
  } while (!isNull(dom));
}

function stopPropagation() {
  this.cancelBubble = true;

  if (!this.immediatePropagationStopped) {
    this.stopImmediatePropagation();
  }
}

function isDefaultPrevented() {
  return this.defaultPrevented;
}

function isPropagationStopped() {
  return this.cancelBubble;
}

function extendEventProperties(event) {
  // Event data needs to be object to save reference to currentTarget getter
  var eventData = {
    dom: document
  };
  event.isDefaultPrevented = isDefaultPrevented;
  event.isPropagationStopped = isPropagationStopped;
  event.stopPropagation = stopPropagation;
  Object.defineProperty(event, 'currentTarget', {
    configurable: true,
    get: function () {
      function get() {
        return eventData.dom;
      }

      return get;
    }()
  });
  return eventData;
}

function rootClickEvent(name) {
  return function (event) {
    if (event.button !== 0) {
      // Firefox incorrectly triggers click event for mid/right mouse buttons.
      // This bug has been active for 17 years.
      // https://bugzilla.mozilla.org/show_bug.cgi?id=184051
      event.stopPropagation();
      return;
    }

    dispatchEvents(event, true, name, extendEventProperties(event));
  };
}

function rootEvent(name) {
  return function (event) {
    dispatchEvents(event, false, name, extendEventProperties(event));
  };
}

function attachEventToDocument(name) {
  var attachedEvent = name === 'onClick' || name === 'onDblClick' ? rootClickEvent(name) : rootEvent(name);
  document.addEventListener(normalizeEventName(name), attachedEvent);
  return attachedEvent;
}

function isSameInnerHTML(dom, innerHTML) {
  var tempdom = document.createElement('i');
  tempdom.innerHTML = innerHTML;
  return tempdom.innerHTML === dom.innerHTML;
}

function triggerEventListener(props, methodName, e) {
  if (props[methodName]) {
    var listener = props[methodName];

    if (listener.event) {
      listener.event(listener.data, e);
    } else {
      listener(e);
    }
  } else {
    var nativeListenerName = methodName.toLowerCase();

    if (props[nativeListenerName]) {
      props[nativeListenerName](e);
    }
  }
}

function createWrappedFunction(methodName, applyValue) {
  var fnMethod = function fnMethod(e) {
    var vNode = this.$V; // If vNode is gone by the time event fires, no-op

    if (!vNode) {
      return;
    }

    var props = vNode.props || EMPTY_OBJ;
    var dom = vNode.dom;

    if (isString(methodName)) {
      triggerEventListener(props, methodName, e);
    } else {
      for (var i = 0; i < methodName.length; ++i) {
        triggerEventListener(props, methodName[i], e);
      }
    }

    if (isFunction(applyValue)) {
      var newVNode = this.$V;
      var newProps = newVNode.props || EMPTY_OBJ;
      applyValue(newProps, dom, false, newVNode);
    }
  };

  Object.defineProperty(fnMethod, 'wrapped', {
    configurable: false,
    enumerable: false,
    value: true,
    writable: false
  });
  return fnMethod;
}

function attachEvent(dom, eventName, handler) {
  var previousKey = "$" + eventName;
  var previousArgs = dom[previousKey];

  if (previousArgs) {
    if (previousArgs[1].wrapped) {
      return;
    }

    dom.removeEventListener(previousArgs[0], previousArgs[1]);
    dom[previousKey] = null;
  }

  if (isFunction(handler)) {
    dom.addEventListener(eventName, handler);
    dom[previousKey] = [eventName, handler];
  }
}

function isCheckedType(type) {
  return type === 'checkbox' || type === 'radio';
}

var onTextInputChange = createWrappedFunction('onInput', applyValueInput);
var wrappedOnChange = createWrappedFunction(['onClick', 'onChange'], applyValueInput);
/* tslint:disable-next-line:no-empty */

function emptywrapper(event) {
  event.stopPropagation();
}

emptywrapper.wrapped = true;

function inputEvents(dom, nextPropsOrEmpty) {
  if (isCheckedType(nextPropsOrEmpty.type)) {
    attachEvent(dom, 'change', wrappedOnChange);
    attachEvent(dom, 'click', emptywrapper);
  } else {
    attachEvent(dom, 'input', onTextInputChange);
  }
}

function applyValueInput(nextPropsOrEmpty, dom) {
  var type = nextPropsOrEmpty.type;
  var value = nextPropsOrEmpty.value;
  var checked = nextPropsOrEmpty.checked;
  var multiple = nextPropsOrEmpty.multiple;
  var defaultValue = nextPropsOrEmpty.defaultValue;
  var hasValue = !isNullOrUndef(value);

  if (type && type !== dom.type) {
    dom.setAttribute('type', type);
  }

  if (!isNullOrUndef(multiple) && multiple !== dom.multiple) {
    dom.multiple = multiple;
  }

  if (!isNullOrUndef(defaultValue) && !hasValue) {
    dom.defaultValue = defaultValue + '';
  }

  if (isCheckedType(type)) {
    if (hasValue) {
      dom.value = value;
    }

    if (!isNullOrUndef(checked)) {
      dom.checked = checked;
    }
  } else {
    if (hasValue && dom.value !== value) {
      dom.defaultValue = value;
      dom.value = value;
    } else if (!isNullOrUndef(checked)) {
      dom.checked = checked;
    }
  }
}

function updateChildOptions(vNode, value) {
  if (vNode.type === 'option') {
    updateChildOption(vNode, value);
  } else {
    var children = vNode.children;
    var flags = vNode.flags;

    if (flags & 4
    /* ComponentClass */
    ) {
        updateChildOptions(children.$LI, value);
      } else if (flags & 8
    /* ComponentFunction */
    ) {
        updateChildOptions(children, value);
      } else if (vNode.childFlags === 2
    /* HasVNodeChildren */
    ) {
        updateChildOptions(children, value);
      } else if (vNode.childFlags & 12
    /* MultipleChildren */
    ) {
        for (var i = 0, len = children.length; i < len; ++i) {
          updateChildOptions(children[i], value);
        }
      }
  }
}

function updateChildOption(vNode, value) {
  var props = vNode.props || EMPTY_OBJ;
  var dom = vNode.dom; // we do this as multiple may have changed

  dom.value = props.value;

  if (props.value === value || isArray(value) && value.indexOf(props.value) !== -1) {
    dom.selected = true;
  } else if (!isNullOrUndef(value) || !isNullOrUndef(props.selected)) {
    dom.selected = props.selected || false;
  }
}

var onSelectChange = createWrappedFunction('onChange', applyValueSelect);

function selectEvents(dom) {
  attachEvent(dom, 'change', onSelectChange);
}

function applyValueSelect(nextPropsOrEmpty, dom, mounting, vNode) {
  var multiplePropInBoolean = Boolean(nextPropsOrEmpty.multiple);

  if (!isNullOrUndef(nextPropsOrEmpty.multiple) && multiplePropInBoolean !== dom.multiple) {
    dom.multiple = multiplePropInBoolean;
  }

  var index = nextPropsOrEmpty.selectedIndex;

  if (index === -1) {
    dom.selectedIndex = -1;
  }

  var childFlags = vNode.childFlags;

  if (childFlags !== 1
  /* HasInvalidChildren */
  ) {
      var value = nextPropsOrEmpty.value;

      if (isNumber(index) && index > -1 && dom.options[index]) {
        value = dom.options[index].value;
      }

      if (mounting && isNullOrUndef(value)) {
        value = nextPropsOrEmpty.defaultValue;
      }

      updateChildOptions(vNode, value);
    }
}

var onTextareaInputChange = createWrappedFunction('onInput', applyValueTextArea);
var wrappedOnChange$1 = createWrappedFunction('onChange');

function textAreaEvents(dom, nextPropsOrEmpty) {
  attachEvent(dom, 'input', onTextareaInputChange);

  if (nextPropsOrEmpty.onChange) {
    attachEvent(dom, 'change', wrappedOnChange$1);
  }
}

function applyValueTextArea(nextPropsOrEmpty, dom, mounting) {
  var value = nextPropsOrEmpty.value;
  var domValue = dom.value;

  if (isNullOrUndef(value)) {
    if (mounting) {
      var defaultValue = nextPropsOrEmpty.defaultValue;

      if (!isNullOrUndef(defaultValue) && defaultValue !== domValue) {
        dom.defaultValue = defaultValue;
        dom.value = defaultValue;
      }
    }
  } else if (domValue !== value) {
    /* There is value so keep it controlled */
    dom.defaultValue = value;
    dom.value = value;
  }
}
/**
 * There is currently no support for switching same input between controlled and nonControlled
 * If that ever becomes a real issue, then re design controlled elements
 * Currently user must choose either controlled or non-controlled and stick with that
 */


function processElement(flags, vNode, dom, nextPropsOrEmpty, mounting, isControlled) {
  if (flags & 64
  /* InputElement */
  ) {
      applyValueInput(nextPropsOrEmpty, dom);
    } else if (flags & 256
  /* SelectElement */
  ) {
      applyValueSelect(nextPropsOrEmpty, dom, mounting, vNode);
    } else if (flags & 128
  /* TextareaElement */
  ) {
      applyValueTextArea(nextPropsOrEmpty, dom, mounting);
    }

  if (isControlled) {
    dom.$V = vNode;
  }
}

function addFormElementEventHandlers(flags, dom, nextPropsOrEmpty) {
  if (flags & 64
  /* InputElement */
  ) {
      inputEvents(dom, nextPropsOrEmpty);
    } else if (flags & 256
  /* SelectElement */
  ) {
      selectEvents(dom);
    } else if (flags & 128
  /* TextareaElement */
  ) {
      textAreaEvents(dom, nextPropsOrEmpty);
    }
}

function isControlledFormElement(nextPropsOrEmpty) {
  return nextPropsOrEmpty.type && isCheckedType(nextPropsOrEmpty.type) ? !isNullOrUndef(nextPropsOrEmpty.checked) : !isNullOrUndef(nextPropsOrEmpty.value);
}

function createRef() {
  return {
    current: null
  };
}

function forwardRef(render) {
  return {
    render: render
  };
}

function unmountRef(ref) {
  if (ref) {
    if (!safeCall1(ref, null) && ref.current) {
      ref.current = null;
    }
  }
}

function mountRef(ref, value, lifecycle) {
  if (ref && (isFunction(ref) || ref.current !== void 0)) {
    lifecycle.push(function () {
      if (!safeCall1(ref, value) && ref.current !== void 0) {
        ref.current = value;
      }
    });
  }
}

function remove(vNode, parentDOM) {
  unmount(vNode);
  removeVNodeDOM(vNode, parentDOM);
}

function unmount(vNode) {
  var flags = vNode.flags;
  var children = vNode.children;
  var ref;

  if (flags & 481
  /* Element */
  ) {
      ref = vNode.ref;
      var props = vNode.props;
      unmountRef(ref);
      var childFlags = vNode.childFlags;

      if (!isNull(props)) {
        var keys = Object.keys(props);

        for (var i = 0, len = keys.length; i < len; i++) {
          var key = keys[i];

          if (syntheticEvents[key]) {
            unmountSyntheticEvent(key, vNode.dom);
          }
        }
      }

      if (childFlags & 12
      /* MultipleChildren */
      ) {
          unmountAllChildren(children);
        } else if (childFlags === 2
      /* HasVNodeChildren */
      ) {
          unmount(children);
        }
    } else if (children) {
    if (flags & 4
    /* ComponentClass */
    ) {
        if (isFunction(children.componentWillUnmount)) {
          children.componentWillUnmount();
        }

        unmountRef(vNode.ref);
        children.$UN = true;
        unmount(children.$LI);
      } else if (flags & 8
    /* ComponentFunction */
    ) {
        ref = vNode.ref;

        if (!isNullOrUndef(ref) && isFunction(ref.onComponentWillUnmount)) {
          ref.onComponentWillUnmount(findDOMfromVNode(vNode, true), vNode.props || EMPTY_OBJ);
        }

        unmount(children);
      } else if (flags & 1024
    /* Portal */
    ) {
        remove(children, vNode.ref);
      } else if (flags & 8192
    /* Fragment */
    ) {
        if (vNode.childFlags & 12
        /* MultipleChildren */
        ) {
            unmountAllChildren(children);
          }
      }
  }
}

function unmountAllChildren(children) {
  for (var i = 0, len = children.length; i < len; ++i) {
    unmount(children[i]);
  }
}

function clearDOM(dom) {
  // Optimization for clearing dom
  dom.textContent = '';
}

function removeAllChildren(dom, vNode, children) {
  unmountAllChildren(children);

  if (vNode.flags & 8192
  /* Fragment */
  ) {
      removeVNodeDOM(vNode, dom);
    } else {
    clearDOM(dom);
  }
}

function wrapLinkEvent(nextValue) {
  // This variable makes sure there is no "this" context in callback
  var ev = nextValue.event;
  return function (e) {
    ev(nextValue.data, e);
  };
}

function patchEvent(name, lastValue, nextValue, dom) {
  if (isLinkEventObject(nextValue)) {
    if (isLastValueSameLinkEvent(lastValue, nextValue)) {
      return;
    }

    nextValue = wrapLinkEvent(nextValue);
  }

  attachEvent(dom, normalizeEventName(name), nextValue);
} // We are assuming here that we come from patchProp routine
// -nextAttrValue cannot be null or undefined


function patchStyle(lastAttrValue, nextAttrValue, dom) {
  if (isNullOrUndef(nextAttrValue)) {
    dom.removeAttribute('style');
    return;
  }

  var domStyle = dom.style;
  var style;
  var value;

  if (isString(nextAttrValue)) {
    domStyle.cssText = nextAttrValue;
    return;
  }

  if (!isNullOrUndef(lastAttrValue) && !isString(lastAttrValue)) {
    for (style in nextAttrValue) {
      // do not add a hasOwnProperty check here, it affects performance
      value = nextAttrValue[style];

      if (value !== lastAttrValue[style]) {
        domStyle.setProperty(style, value);
      }
    }

    for (style in lastAttrValue) {
      if (isNullOrUndef(nextAttrValue[style])) {
        domStyle.removeProperty(style);
      }
    }
  } else {
    for (style in nextAttrValue) {
      value = nextAttrValue[style];
      domStyle.setProperty(style, value);
    }
  }
}

function patchDangerInnerHTML(lastValue, nextValue, lastVNode, dom) {
  var lastHtml = lastValue && lastValue.__html || '';
  var nextHtml = nextValue && nextValue.__html || '';

  if (lastHtml !== nextHtml) {
    if (!isNullOrUndef(nextHtml) && !isSameInnerHTML(dom, nextHtml)) {
      if (!isNull(lastVNode)) {
        if (lastVNode.childFlags & 12
        /* MultipleChildren */
        ) {
            unmountAllChildren(lastVNode.children);
          } else if (lastVNode.childFlags === 2
        /* HasVNodeChildren */
        ) {
            unmount(lastVNode.children);
          }

        lastVNode.children = null;
        lastVNode.childFlags = 1
        /* HasInvalidChildren */
        ;
      }

      dom.innerHTML = nextHtml;
    }
  }
}

function patchProp(prop, lastValue, nextValue, dom, isSVG, hasControlledValue, lastVNode) {
  switch (prop) {
    case 'children':
    case 'childrenType':
    case 'className':
    case 'defaultValue':
    case 'key':
    case 'multiple':
    case 'ref':
    case 'selectedIndex':
      break;

    case 'autoFocus':
      dom.autofocus = !!nextValue;
      break;

    case 'allowfullscreen':
    case 'autoplay':
    case 'capture':
    case 'checked':
    case 'controls':
    case 'default':
    case 'disabled':
    case 'hidden':
    case 'indeterminate':
    case 'loop':
    case 'muted':
    case 'novalidate':
    case 'open':
    case 'readOnly':
    case 'required':
    case 'reversed':
    case 'scoped':
    case 'seamless':
    case 'selected':
      dom[prop] = !!nextValue;
      break;

    case 'defaultChecked':
    case 'value':
    case 'volume':
      if (hasControlledValue && prop === 'value') {
        break;
      }

      var value = isNullOrUndef(nextValue) ? '' : nextValue;

      if (dom[prop] !== value) {
        dom[prop] = value;
      }

      break;

    case 'style':
      patchStyle(lastValue, nextValue, dom);
      break;

    case 'dangerouslySetInnerHTML':
      patchDangerInnerHTML(lastValue, nextValue, lastVNode, dom);
      break;

    default:
      if (syntheticEvents[prop]) {
        handleSyntheticEvent(prop, lastValue, nextValue, dom);
      } else if (prop.charCodeAt(0) === 111 && prop.charCodeAt(1) === 110) {
        patchEvent(prop, lastValue, nextValue, dom);
      } else if (isNullOrUndef(nextValue)) {
        dom.removeAttribute(prop);
      } else if (isSVG && namespaces[prop]) {
        // We optimize for isSVG being false
        // If we end up in this path we can read property again
        dom.setAttributeNS(namespaces[prop], prop, nextValue);
      } else {
        dom.setAttribute(prop, nextValue);
      }

      break;
  }
}

function mountProps(vNode, flags, props, dom, isSVG) {
  var hasControlledValue = false;
  var isFormElement = (flags & 448
  /* FormElement */
  ) > 0;

  if (isFormElement) {
    hasControlledValue = isControlledFormElement(props);

    if (hasControlledValue) {
      addFormElementEventHandlers(flags, dom, props);
    }
  }

  for (var prop in props) {
    // do not add a hasOwnProperty check here, it affects performance
    patchProp(prop, null, props[prop], dom, isSVG, hasControlledValue, null);
  }

  if (isFormElement) {
    processElement(flags, vNode, dom, props, true, hasControlledValue);
  }
}

function renderNewInput(instance, props, context) {
  var nextInput = normalizeRoot(instance.render(props, instance.state, context));
  var childContext = context;

  if (isFunction(instance.getChildContext)) {
    childContext = combineFrom(context, instance.getChildContext());
  }

  instance.$CX = childContext;
  return nextInput;
}

function createClassComponentInstance(vNode, Component, props, context, isSVG, lifecycle) {
  var instance = new Component(props, context);
  var usesNewAPI = instance.$N = Boolean(Component.getDerivedStateFromProps || instance.getSnapshotBeforeUpdate);
  instance.$SVG = isSVG;
  instance.$L = lifecycle;
  vNode.children = instance;
  instance.$BS = false;
  instance.context = context;

  if (instance.props === EMPTY_OBJ) {
    instance.props = props;
  }

  if (!usesNewAPI) {
    if (isFunction(instance.componentWillMount)) {
      instance.$BR = true;
      instance.componentWillMount();
      var pending = instance.$PS;

      if (!isNull(pending)) {
        var state = instance.state;

        if (isNull(state)) {
          instance.state = pending;
        } else {
          for (var key in pending) {
            state[key] = pending[key];
          }
        }

        instance.$PS = null;
      }

      instance.$BR = false;
    }
  } else {
    instance.state = createDerivedState(instance, props, instance.state);
  }

  instance.$LI = renderNewInput(instance, props, context);
  return instance;
}

function mount(vNode, parentDOM, context, isSVG, nextNode, lifecycle) {
  var flags = vNode.flags |= 16384
  /* InUse */
  ;

  if (flags & 481
  /* Element */
  ) {
      mountElement(vNode, parentDOM, context, isSVG, nextNode, lifecycle);
    } else if (flags & 4
  /* ComponentClass */
  ) {
      mountClassComponent(vNode, parentDOM, context, isSVG, nextNode, lifecycle);
    } else if (flags & 8
  /* ComponentFunction */
  ) {
      mountFunctionalComponent(vNode, parentDOM, context, isSVG, nextNode, lifecycle);
      mountFunctionalComponentCallbacks(vNode, lifecycle);
    } else if (flags & 512
  /* Void */
  || flags & 16
  /* Text */
  ) {
      mountText(vNode, parentDOM, nextNode);
    } else if (flags & 8192
  /* Fragment */
  ) {
      mountFragment(vNode, context, parentDOM, isSVG, nextNode, lifecycle);
    } else if (flags & 1024
  /* Portal */
  ) {
      mountPortal(vNode, context, parentDOM, nextNode, lifecycle);
    }
}

function mountPortal(vNode, context, parentDOM, nextNode, lifecycle) {
  mount(vNode.children, vNode.ref, context, false, null, lifecycle);
  var placeHolderVNode = createVoidVNode();
  mountText(placeHolderVNode, parentDOM, nextNode);
  vNode.dom = placeHolderVNode.dom;
}

function mountFragment(vNode, context, parentDOM, isSVG, nextNode, lifecycle) {
  var children = vNode.children;
  var childFlags = vNode.childFlags; // When fragment is optimized for multiple children, check if there is no children and change flag to invalid
  // This is the only normalization always done, to keep optimization flags API same for fragments and regular elements

  if (childFlags & 12
  /* MultipleChildren */
  && children.length === 0) {
    childFlags = vNode.childFlags = 2
    /* HasVNodeChildren */
    ;
    children = vNode.children = createVoidVNode();
  }

  if (childFlags === 2
  /* HasVNodeChildren */
  ) {
      mount(children, parentDOM, nextNode, isSVG, nextNode, lifecycle);
    } else {
    mountArrayChildren(children, parentDOM, context, isSVG, nextNode, lifecycle);
  }
}

function mountText(vNode, parentDOM, nextNode) {
  var dom = vNode.dom = document.createTextNode(vNode.children);

  if (!isNull(parentDOM)) {
    insertOrAppend(parentDOM, dom, nextNode);
  }
}

function mountElement(vNode, parentDOM, context, isSVG, nextNode, lifecycle) {
  var flags = vNode.flags;
  var props = vNode.props;
  var className = vNode.className;
  var children = vNode.children;
  var childFlags = vNode.childFlags;
  var dom = vNode.dom = documentCreateElement(vNode.type, isSVG = isSVG || (flags & 32
  /* SvgElement */
  ) > 0);

  if (!isNullOrUndef(className) && className !== '') {
    if (isSVG) {
      dom.setAttribute('class', className);
    } else {
      dom.className = className;
    }
  }

  if (childFlags === 16
  /* HasTextChildren */
  ) {
      setTextContent(dom, children);
    } else if (childFlags !== 1
  /* HasInvalidChildren */
  ) {
      var childrenIsSVG = isSVG && vNode.type !== 'foreignObject';

      if (childFlags === 2
      /* HasVNodeChildren */
      ) {
          if (children.flags & 16384
          /* InUse */
          ) {
              vNode.children = children = directClone(children);
            }

          mount(children, dom, context, childrenIsSVG, null, lifecycle);
        } else if (childFlags === 8
      /* HasKeyedChildren */
      || childFlags === 4
      /* HasNonKeyedChildren */
      ) {
          mountArrayChildren(children, dom, context, childrenIsSVG, null, lifecycle);
        }
    }

  if (!isNull(parentDOM)) {
    insertOrAppend(parentDOM, dom, nextNode);
  }

  if (!isNull(props)) {
    mountProps(vNode, flags, props, dom, isSVG);
  }

  mountRef(vNode.ref, dom, lifecycle);
}

function mountArrayChildren(children, dom, context, isSVG, nextNode, lifecycle) {
  for (var i = 0; i < children.length; ++i) {
    var child = children[i];

    if (child.flags & 16384
    /* InUse */
    ) {
        children[i] = child = directClone(child);
      }

    mount(child, dom, context, isSVG, nextNode, lifecycle);
  }
}

function mountClassComponent(vNode, parentDOM, context, isSVG, nextNode, lifecycle) {
  var instance = createClassComponentInstance(vNode, vNode.type, vNode.props || EMPTY_OBJ, context, isSVG, lifecycle);
  mount(instance.$LI, parentDOM, instance.$CX, isSVG, nextNode, lifecycle);
  mountClassComponentCallbacks(vNode.ref, instance, lifecycle);
}

function renderFunctionalComponent(vNode, context) {
  return vNode.flags & 32768
  /* ForwardRef */
  ? vNode.type.render(vNode.props || EMPTY_OBJ, vNode.ref, context) : vNode.type(vNode.props || EMPTY_OBJ, context);
}

function mountFunctionalComponent(vNode, parentDOM, context, isSVG, nextNode, lifecycle) {
  mount(vNode.children = normalizeRoot(renderFunctionalComponent(vNode, context)), parentDOM, context, isSVG, nextNode, lifecycle);
}

function createClassMountCallback(instance) {
  return function () {
    instance.componentDidMount();
  };
}

function mountClassComponentCallbacks(ref, instance, lifecycle) {
  mountRef(ref, instance, lifecycle);

  if (isFunction(instance.componentDidMount)) {
    lifecycle.push(createClassMountCallback(instance));
  }
}

function createOnMountCallback(ref, vNode) {
  return function () {
    ref.onComponentDidMount(findDOMfromVNode(vNode, true), vNode.props || EMPTY_OBJ);
  };
}

function mountFunctionalComponentCallbacks(vNode, lifecycle) {
  var ref = vNode.ref;

  if (!isNullOrUndef(ref)) {
    safeCall1(ref.onComponentWillMount, vNode.props || EMPTY_OBJ);

    if (isFunction(ref.onComponentDidMount)) {
      lifecycle.push(createOnMountCallback(ref, vNode));
    }
  }
}

function replaceWithNewNode(lastVNode, nextVNode, parentDOM, context, isSVG, lifecycle) {
  unmount(lastVNode);

  if ((nextVNode.flags & lastVNode.flags & 2033
  /* DOMRef */
  ) !== 0) {
    mount(nextVNode, null, context, isSVG, null, lifecycle); // Single DOM operation, when we have dom references available

    replaceChild(parentDOM, nextVNode.dom, lastVNode.dom);
  } else {
    mount(nextVNode, parentDOM, context, isSVG, findDOMfromVNode(lastVNode, true), lifecycle);
    removeVNodeDOM(lastVNode, parentDOM);
  }
}

function patch(lastVNode, nextVNode, parentDOM, context, isSVG, nextNode, lifecycle) {
  var nextFlags = nextVNode.flags |= 16384
  /* InUse */
  ;

  if (lastVNode.flags !== nextFlags || lastVNode.type !== nextVNode.type || lastVNode.key !== nextVNode.key || nextFlags & 2048
  /* ReCreate */
  ) {
      if (lastVNode.flags & 16384
      /* InUse */
      ) {
          replaceWithNewNode(lastVNode, nextVNode, parentDOM, context, isSVG, lifecycle);
        } else {
        // Last vNode is not in use, it has crashed at application level. Just mount nextVNode and ignore last one
        mount(nextVNode, parentDOM, context, isSVG, nextNode, lifecycle);
      }
    } else if (nextFlags & 481
  /* Element */
  ) {
      patchElement(lastVNode, nextVNode, context, isSVG, nextFlags, lifecycle);
    } else if (nextFlags & 4
  /* ComponentClass */
  ) {
      patchClassComponent(lastVNode, nextVNode, parentDOM, context, isSVG, nextNode, lifecycle);
    } else if (nextFlags & 8
  /* ComponentFunction */
  ) {
      patchFunctionalComponent(lastVNode, nextVNode, parentDOM, context, isSVG, nextNode, lifecycle);
    } else if (nextFlags & 16
  /* Text */
  ) {
      patchText(lastVNode, nextVNode);
    } else if (nextFlags & 512
  /* Void */
  ) {
      nextVNode.dom = lastVNode.dom;
    } else if (nextFlags & 8192
  /* Fragment */
  ) {
      patchFragment(lastVNode, nextVNode, parentDOM, context, isSVG, lifecycle);
    } else {
    patchPortal(lastVNode, nextVNode, context, lifecycle);
  }
}

function patchSingleTextChild(lastChildren, nextChildren, parentDOM) {
  if (lastChildren !== nextChildren) {
    if (lastChildren !== '') {
      parentDOM.firstChild.nodeValue = nextChildren;
    } else {
      setTextContent(parentDOM, nextChildren);
    }
  }
}

function patchContentEditableChildren(dom, nextChildren) {
  if (dom.textContent !== nextChildren) {
    dom.textContent = nextChildren;
  }
}

function patchFragment(lastVNode, nextVNode, parentDOM, context, isSVG, lifecycle) {
  var lastChildren = lastVNode.children;
  var nextChildren = nextVNode.children;
  var lastChildFlags = lastVNode.childFlags;
  var nextChildFlags = nextVNode.childFlags;
  var nextNode = null; // When fragment is optimized for multiple children, check if there is no children and change flag to invalid
  // This is the only normalization always done, to keep optimization flags API same for fragments and regular elements

  if (nextChildFlags & 12
  /* MultipleChildren */
  && nextChildren.length === 0) {
    nextChildFlags = nextVNode.childFlags = 2
    /* HasVNodeChildren */
    ;
    nextChildren = nextVNode.children = createVoidVNode();
  }

  var nextIsSingle = (nextChildFlags & 2
  /* HasVNodeChildren */
  ) !== 0;

  if (lastChildFlags & 12
  /* MultipleChildren */
  ) {
      var lastLen = lastChildren.length; // We need to know Fragment's edge node when

      if ( // It uses keyed algorithm
      lastChildFlags & 8
      /* HasKeyedChildren */
      && nextChildFlags & 8
      /* HasKeyedChildren */
      || // It transforms from many to single
      nextIsSingle || // It will append more nodes
      !nextIsSingle && nextChildren.length > lastLen) {
        // When fragment has multiple children there is always at least one vNode
        nextNode = findDOMfromVNode(lastChildren[lastLen - 1], false).nextSibling;
      }
    }

  patchChildren(lastChildFlags, nextChildFlags, lastChildren, nextChildren, parentDOM, context, isSVG, nextNode, lastVNode, lifecycle);
}

function patchPortal(lastVNode, nextVNode, context, lifecycle) {
  var lastContainer = lastVNode.ref;
  var nextContainer = nextVNode.ref;
  var nextChildren = nextVNode.children;
  patchChildren(lastVNode.childFlags, nextVNode.childFlags, lastVNode.children, nextChildren, lastContainer, context, false, null, lastVNode, lifecycle);
  nextVNode.dom = lastVNode.dom;

  if (lastContainer !== nextContainer && !isInvalid(nextChildren)) {
    var node = nextChildren.dom;
    removeChild(lastContainer, node);
    appendChild(nextContainer, node);
  }
}

function patchElement(lastVNode, nextVNode, context, isSVG, nextFlags, lifecycle) {
  var dom = nextVNode.dom = lastVNode.dom;
  var lastProps = lastVNode.props;
  var nextProps = nextVNode.props;
  var isFormElement = false;
  var hasControlledValue = false;
  var nextPropsOrEmpty;
  isSVG = isSVG || (nextFlags & 32
  /* SvgElement */
  ) > 0; // inlined patchProps  -- starts --

  if (lastProps !== nextProps) {
    var lastPropsOrEmpty = lastProps || EMPTY_OBJ;
    nextPropsOrEmpty = nextProps || EMPTY_OBJ;

    if (nextPropsOrEmpty !== EMPTY_OBJ) {
      isFormElement = (nextFlags & 448
      /* FormElement */
      ) > 0;

      if (isFormElement) {
        hasControlledValue = isControlledFormElement(nextPropsOrEmpty);
      }

      for (var prop in nextPropsOrEmpty) {
        var lastValue = lastPropsOrEmpty[prop];
        var nextValue = nextPropsOrEmpty[prop];

        if (lastValue !== nextValue) {
          patchProp(prop, lastValue, nextValue, dom, isSVG, hasControlledValue, lastVNode);
        }
      }
    }

    if (lastPropsOrEmpty !== EMPTY_OBJ) {
      for (var prop$1 in lastPropsOrEmpty) {
        if (isNullOrUndef(nextPropsOrEmpty[prop$1]) && !isNullOrUndef(lastPropsOrEmpty[prop$1])) {
          patchProp(prop$1, lastPropsOrEmpty[prop$1], null, dom, isSVG, hasControlledValue, lastVNode);
        }
      }
    }
  }

  var nextChildren = nextVNode.children;
  var nextClassName = nextVNode.className; // inlined patchProps  -- ends --

  if (lastVNode.className !== nextClassName) {
    if (isNullOrUndef(nextClassName)) {
      dom.removeAttribute('class');
    } else if (isSVG) {
      dom.setAttribute('class', nextClassName);
    } else {
      dom.className = nextClassName;
    }
  }

  if (nextFlags & 4096
  /* ContentEditable */
  ) {
      patchContentEditableChildren(dom, nextChildren);
    } else {
    patchChildren(lastVNode.childFlags, nextVNode.childFlags, lastVNode.children, nextChildren, dom, context, isSVG && nextVNode.type !== 'foreignObject', null, lastVNode, lifecycle);
  }

  if (isFormElement) {
    processElement(nextFlags, nextVNode, dom, nextPropsOrEmpty, false, hasControlledValue);
  }

  var nextRef = nextVNode.ref;
  var lastRef = lastVNode.ref;

  if (lastRef !== nextRef) {
    unmountRef(lastRef);
    mountRef(nextRef, dom, lifecycle);
  }
}

function replaceOneVNodeWithMultipleVNodes(lastChildren, nextChildren, parentDOM, context, isSVG, lifecycle) {
  unmount(lastChildren);
  mountArrayChildren(nextChildren, parentDOM, context, isSVG, findDOMfromVNode(lastChildren, true), lifecycle);
  removeVNodeDOM(lastChildren, parentDOM);
}

function patchChildren(lastChildFlags, nextChildFlags, lastChildren, nextChildren, parentDOM, context, isSVG, nextNode, parentVNode, lifecycle) {
  switch (lastChildFlags) {
    case 2
    /* HasVNodeChildren */
    :
      switch (nextChildFlags) {
        case 2
        /* HasVNodeChildren */
        :
          patch(lastChildren, nextChildren, parentDOM, context, isSVG, nextNode, lifecycle);
          break;

        case 1
        /* HasInvalidChildren */
        :
          remove(lastChildren, parentDOM);
          break;

        case 16
        /* HasTextChildren */
        :
          unmount(lastChildren);
          setTextContent(parentDOM, nextChildren);
          break;

        default:
          replaceOneVNodeWithMultipleVNodes(lastChildren, nextChildren, parentDOM, context, isSVG, lifecycle);
          break;
      }

      break;

    case 1
    /* HasInvalidChildren */
    :
      switch (nextChildFlags) {
        case 2
        /* HasVNodeChildren */
        :
          mount(nextChildren, parentDOM, context, isSVG, nextNode, lifecycle);
          break;

        case 1
        /* HasInvalidChildren */
        :
          break;

        case 16
        /* HasTextChildren */
        :
          setTextContent(parentDOM, nextChildren);
          break;

        default:
          mountArrayChildren(nextChildren, parentDOM, context, isSVG, nextNode, lifecycle);
          break;
      }

      break;

    case 16
    /* HasTextChildren */
    :
      switch (nextChildFlags) {
        case 16
        /* HasTextChildren */
        :
          patchSingleTextChild(lastChildren, nextChildren, parentDOM);
          break;

        case 2
        /* HasVNodeChildren */
        :
          clearDOM(parentDOM);
          mount(nextChildren, parentDOM, context, isSVG, nextNode, lifecycle);
          break;

        case 1
        /* HasInvalidChildren */
        :
          clearDOM(parentDOM);
          break;

        default:
          clearDOM(parentDOM);
          mountArrayChildren(nextChildren, parentDOM, context, isSVG, nextNode, lifecycle);
          break;
      }

      break;

    default:
      switch (nextChildFlags) {
        case 16
        /* HasTextChildren */
        :
          unmountAllChildren(lastChildren);
          setTextContent(parentDOM, nextChildren);
          break;

        case 2
        /* HasVNodeChildren */
        :
          removeAllChildren(parentDOM, parentVNode, lastChildren);
          mount(nextChildren, parentDOM, context, isSVG, nextNode, lifecycle);
          break;

        case 1
        /* HasInvalidChildren */
        :
          removeAllChildren(parentDOM, parentVNode, lastChildren);
          break;

        default:
          var lastLength = lastChildren.length | 0;
          var nextLength = nextChildren.length | 0; // Fast path's for both algorithms

          if (lastLength === 0) {
            if (nextLength > 0) {
              mountArrayChildren(nextChildren, parentDOM, context, isSVG, nextNode, lifecycle);
            }
          } else if (nextLength === 0) {
            removeAllChildren(parentDOM, parentVNode, lastChildren);
          } else if (nextChildFlags === 8
          /* HasKeyedChildren */
          && lastChildFlags === 8
          /* HasKeyedChildren */
          ) {
              patchKeyedChildren(lastChildren, nextChildren, parentDOM, context, isSVG, lastLength, nextLength, nextNode, parentVNode, lifecycle);
            } else {
            patchNonKeyedChildren(lastChildren, nextChildren, parentDOM, context, isSVG, lastLength, nextLength, nextNode, lifecycle);
          }

          break;
      }

      break;
  }
}

function createDidUpdate(instance, lastProps, lastState, snapshot, lifecycle) {
  lifecycle.push(function () {
    instance.componentDidUpdate(lastProps, lastState, snapshot);
  });
}

function updateClassComponent(instance, nextState, nextProps, parentDOM, context, isSVG, force, nextNode, lifecycle) {
  var lastState = instance.state;
  var lastProps = instance.props;
  var usesNewAPI = Boolean(instance.$N);
  var hasSCU = isFunction(instance.shouldComponentUpdate);

  if (usesNewAPI) {
    nextState = createDerivedState(instance, nextProps, nextState !== lastState ? combineFrom(lastState, nextState) : nextState);
  }

  if (force || !hasSCU || hasSCU && instance.shouldComponentUpdate(nextProps, nextState, context)) {
    if (!usesNewAPI && isFunction(instance.componentWillUpdate)) {
      instance.componentWillUpdate(nextProps, nextState, context);
    }

    instance.props = nextProps;
    instance.state = nextState;
    instance.context = context;
    var snapshot = null;
    var nextInput = renderNewInput(instance, nextProps, context);

    if (usesNewAPI && isFunction(instance.getSnapshotBeforeUpdate)) {
      snapshot = instance.getSnapshotBeforeUpdate(lastProps, lastState);
    }

    patch(instance.$LI, nextInput, parentDOM, instance.$CX, isSVG, nextNode, lifecycle); // Dont update Last input, until patch has been succesfully executed

    instance.$LI = nextInput;

    if (isFunction(instance.componentDidUpdate)) {
      createDidUpdate(instance, lastProps, lastState, snapshot, lifecycle);
    }
  } else {
    instance.props = nextProps;
    instance.state = nextState;
    instance.context = context;
  }
}

function patchClassComponent(lastVNode, nextVNode, parentDOM, context, isSVG, nextNode, lifecycle) {
  var instance = nextVNode.children = lastVNode.children; // If Component has crashed, ignore it to stay functional

  if (isNull(instance)) {
    return;
  }

  instance.$L = lifecycle;
  var nextProps = nextVNode.props || EMPTY_OBJ;
  var nextRef = nextVNode.ref;
  var lastRef = lastVNode.ref;
  var nextState = instance.state;

  if (!instance.$N) {
    if (isFunction(instance.componentWillReceiveProps)) {
      instance.$BR = true;
      instance.componentWillReceiveProps(nextProps, context); // If instance component was removed during its own update do nothing.

      if (instance.$UN) {
        return;
      }

      instance.$BR = false;
    }

    if (!isNull(instance.$PS)) {
      nextState = combineFrom(nextState, instance.$PS);
      instance.$PS = null;
    }
  }

  updateClassComponent(instance, nextState, nextProps, parentDOM, context, isSVG, false, nextNode, lifecycle);

  if (lastRef !== nextRef) {
    unmountRef(lastRef);
    mountRef(nextRef, instance, lifecycle);
  }
}

function patchFunctionalComponent(lastVNode, nextVNode, parentDOM, context, isSVG, nextNode, lifecycle) {
  var shouldUpdate = true;
  var nextProps = nextVNode.props || EMPTY_OBJ;
  var nextRef = nextVNode.ref;
  var lastProps = lastVNode.props;
  var nextHooksDefined = !isNullOrUndef(nextRef);
  var lastInput = lastVNode.children;

  if (nextHooksDefined && isFunction(nextRef.onComponentShouldUpdate)) {
    shouldUpdate = nextRef.onComponentShouldUpdate(lastProps, nextProps);
  }

  if (shouldUpdate !== false) {
    if (nextHooksDefined && isFunction(nextRef.onComponentWillUpdate)) {
      nextRef.onComponentWillUpdate(lastProps, nextProps);
    }

    var type = nextVNode.type;
    var nextInput = normalizeRoot(nextVNode.flags & 32768
    /* ForwardRef */
    ? type.render(nextProps, nextRef, context) : type(nextProps, context));
    patch(lastInput, nextInput, parentDOM, context, isSVG, nextNode, lifecycle);
    nextVNode.children = nextInput;

    if (nextHooksDefined && isFunction(nextRef.onComponentDidUpdate)) {
      nextRef.onComponentDidUpdate(lastProps, nextProps);
    }
  } else {
    nextVNode.children = lastInput;
  }
}

function patchText(lastVNode, nextVNode) {
  var nextText = nextVNode.children;
  var dom = nextVNode.dom = lastVNode.dom;

  if (nextText !== lastVNode.children) {
    dom.nodeValue = nextText;
  }
}

function patchNonKeyedChildren(lastChildren, nextChildren, dom, context, isSVG, lastChildrenLength, nextChildrenLength, nextNode, lifecycle) {
  var commonLength = lastChildrenLength > nextChildrenLength ? nextChildrenLength : lastChildrenLength;
  var i = 0;
  var nextChild;
  var lastChild;

  for (; i < commonLength; ++i) {
    nextChild = nextChildren[i];
    lastChild = lastChildren[i];

    if (nextChild.flags & 16384
    /* InUse */
    ) {
        nextChild = nextChildren[i] = directClone(nextChild);
      }

    patch(lastChild, nextChild, dom, context, isSVG, nextNode, lifecycle);
    lastChildren[i] = nextChild;
  }

  if (lastChildrenLength < nextChildrenLength) {
    for (i = commonLength; i < nextChildrenLength; ++i) {
      nextChild = nextChildren[i];

      if (nextChild.flags & 16384
      /* InUse */
      ) {
          nextChild = nextChildren[i] = directClone(nextChild);
        }

      mount(nextChild, dom, context, isSVG, nextNode, lifecycle);
    }
  } else if (lastChildrenLength > nextChildrenLength) {
    for (i = commonLength; i < lastChildrenLength; ++i) {
      remove(lastChildren[i], dom);
    }
  }
}

function patchKeyedChildren(a, b, dom, context, isSVG, aLength, bLength, outerEdge, parentVNode, lifecycle) {
  var aEnd = aLength - 1;
  var bEnd = bLength - 1;
  var j = 0;
  var aNode = a[j];
  var bNode = b[j];
  var nextPos;
  var nextNode; // Step 1
  // tslint:disable-next-line

  outer: {
    // Sync nodes with the same key at the beginning.
    while (aNode.key === bNode.key) {
      if (bNode.flags & 16384
      /* InUse */
      ) {
          b[j] = bNode = directClone(bNode);
        }

      patch(aNode, bNode, dom, context, isSVG, outerEdge, lifecycle);
      a[j] = bNode;
      ++j;

      if (j > aEnd || j > bEnd) {
        break outer;
      }

      aNode = a[j];
      bNode = b[j];
    }

    aNode = a[aEnd];
    bNode = b[bEnd]; // Sync nodes with the same key at the end.

    while (aNode.key === bNode.key) {
      if (bNode.flags & 16384
      /* InUse */
      ) {
          b[bEnd] = bNode = directClone(bNode);
        }

      patch(aNode, bNode, dom, context, isSVG, outerEdge, lifecycle);
      a[aEnd] = bNode;
      aEnd--;
      bEnd--;

      if (j > aEnd || j > bEnd) {
        break outer;
      }

      aNode = a[aEnd];
      bNode = b[bEnd];
    }
  }

  if (j > aEnd) {
    if (j <= bEnd) {
      nextPos = bEnd + 1;
      nextNode = nextPos < bLength ? findDOMfromVNode(b[nextPos], true) : outerEdge;

      while (j <= bEnd) {
        bNode = b[j];

        if (bNode.flags & 16384
        /* InUse */
        ) {
            b[j] = bNode = directClone(bNode);
          }

        ++j;
        mount(bNode, dom, context, isSVG, nextNode, lifecycle);
      }
    }
  } else if (j > bEnd) {
    while (j <= aEnd) {
      remove(a[j++], dom);
    }
  } else {
    patchKeyedChildrenComplex(a, b, context, aLength, bLength, aEnd, bEnd, j, dom, isSVG, outerEdge, parentVNode, lifecycle);
  }
}

function patchKeyedChildrenComplex(a, b, context, aLength, bLength, aEnd, bEnd, j, dom, isSVG, outerEdge, parentVNode, lifecycle) {
  var aNode;
  var bNode;
  var nextPos;
  var i = 0;
  var aStart = j;
  var bStart = j;
  var aLeft = aEnd - j + 1;
  var bLeft = bEnd - j + 1;
  var sources = new Int32Array(bLeft + 1); // Keep track if its possible to remove whole DOM using textContent = '';

  var canRemoveWholeContent = aLeft === aLength;
  var moved = false;
  var pos = 0;
  var patched = 0; // When sizes are small, just loop them through

  if (bLength < 4 || (aLeft | bLeft) < 32) {
    for (i = aStart; i <= aEnd; ++i) {
      aNode = a[i];

      if (patched < bLeft) {
        for (j = bStart; j <= bEnd; j++) {
          bNode = b[j];

          if (aNode.key === bNode.key) {
            sources[j - bStart] = i + 1;

            if (canRemoveWholeContent) {
              canRemoveWholeContent = false;

              while (aStart < i) {
                remove(a[aStart++], dom);
              }
            }

            if (pos > j) {
              moved = true;
            } else {
              pos = j;
            }

            if (bNode.flags & 16384
            /* InUse */
            ) {
                b[j] = bNode = directClone(bNode);
              }

            patch(aNode, bNode, dom, context, isSVG, outerEdge, lifecycle);
            ++patched;
            break;
          }
        }

        if (!canRemoveWholeContent && j > bEnd) {
          remove(aNode, dom);
        }
      } else if (!canRemoveWholeContent) {
        remove(aNode, dom);
      }
    }
  } else {
    var keyIndex = {}; // Map keys by their index

    for (i = bStart; i <= bEnd; ++i) {
      keyIndex[b[i].key] = i;
    } // Try to patch same keys


    for (i = aStart; i <= aEnd; ++i) {
      aNode = a[i];

      if (patched < bLeft) {
        j = keyIndex[aNode.key];

        if (j !== void 0) {
          if (canRemoveWholeContent) {
            canRemoveWholeContent = false;

            while (i > aStart) {
              remove(a[aStart++], dom);
            }
          }

          sources[j - bStart] = i + 1;

          if (pos > j) {
            moved = true;
          } else {
            pos = j;
          }

          bNode = b[j];

          if (bNode.flags & 16384
          /* InUse */
          ) {
              b[j] = bNode = directClone(bNode);
            }

          patch(aNode, bNode, dom, context, isSVG, outerEdge, lifecycle);
          ++patched;
        } else if (!canRemoveWholeContent) {
          remove(aNode, dom);
        }
      } else if (!canRemoveWholeContent) {
        remove(aNode, dom);
      }
    }
  } // fast-path: if nothing patched remove all old and add all new


  if (canRemoveWholeContent) {
    removeAllChildren(dom, parentVNode, a);
    mountArrayChildren(b, dom, context, isSVG, outerEdge, lifecycle);
  } else if (moved) {
    var seq = lis_algorithm(sources);
    j = seq.length - 1;

    for (i = bLeft - 1; i >= 0; i--) {
      if (sources[i] === 0) {
        pos = i + bStart;
        bNode = b[pos];

        if (bNode.flags & 16384
        /* InUse */
        ) {
            b[pos] = bNode = directClone(bNode);
          }

        nextPos = pos + 1;
        mount(bNode, dom, context, isSVG, nextPos < bLength ? findDOMfromVNode(b[nextPos], true) : outerEdge, lifecycle);
      } else if (j < 0 || i !== seq[j]) {
        pos = i + bStart;
        bNode = b[pos];
        nextPos = pos + 1;
        moveVNodeDOM(bNode, dom, nextPos < bLength ? findDOMfromVNode(b[nextPos], true) : outerEdge);
      } else {
        j--;
      }
    }
  } else if (patched !== bLeft) {
    // when patched count doesn't match b length we need to insert those new ones
    // loop backwards so we can use insertBefore
    for (i = bLeft - 1; i >= 0; i--) {
      if (sources[i] === 0) {
        pos = i + bStart;
        bNode = b[pos];

        if (bNode.flags & 16384
        /* InUse */
        ) {
            b[pos] = bNode = directClone(bNode);
          }

        nextPos = pos + 1;
        mount(bNode, dom, context, isSVG, nextPos < bLength ? findDOMfromVNode(b[nextPos], true) : outerEdge, lifecycle);
      }
    }
  }
}

var result;
var p;
var maxLen = 0; // https://en.wikipedia.org/wiki/Longest_increasing_subsequence

function lis_algorithm(arr) {
  var arrI = 0;
  var i = 0;
  var j = 0;
  var k = 0;
  var u = 0;
  var v = 0;
  var c = 0;
  var len = arr.length;

  if (len > maxLen) {
    maxLen = len;
    result = new Int32Array(len);
    p = new Int32Array(len);
  }

  for (; i < len; ++i) {
    arrI = arr[i];

    if (arrI !== 0) {
      j = result[k];

      if (arr[j] < arrI) {
        p[i] = j;
        result[++k] = i;
        continue;
      }

      u = 0;
      v = k;

      while (u < v) {
        c = u + v >> 1;

        if (arr[result[c]] < arrI) {
          u = c + 1;
        } else {
          v = c;
        }
      }

      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p[i] = result[u - 1];
        }

        result[u] = i;
      }
    }
  }

  u = k + 1;
  var seq = new Int32Array(u);
  v = result[u - 1];

  while (u-- > 0) {
    seq[u] = v;
    v = p[v];
    result[u] = 0;
  }

  return seq;
}

var hasDocumentAvailable = typeof document !== 'undefined';

if (hasDocumentAvailable) {
  /*
   * Defining $EV and $V properties on Node.prototype
   * fixes v8 "wrong map" de-optimization
   */
  if (window.Node) {
    Node.prototype.$EV = null;
    Node.prototype.$V = null;
  }
}

function __render(input, parentDOM, callback, context) {
  var lifecycle = [];
  var rootInput = parentDOM.$V;
  renderCheck.v = true;

  if (isNullOrUndef(rootInput)) {
    if (!isNullOrUndef(input)) {
      if (input.flags & 16384
      /* InUse */
      ) {
          input = directClone(input);
        }

      mount(input, parentDOM, context, false, null, lifecycle);
      parentDOM.$V = input;
      rootInput = input;
    }
  } else {
    if (isNullOrUndef(input)) {
      remove(rootInput, parentDOM);
      parentDOM.$V = null;
    } else {
      if (input.flags & 16384
      /* InUse */
      ) {
          input = directClone(input);
        }

      patch(rootInput, input, parentDOM, context, false, null, lifecycle);
      rootInput = parentDOM.$V = input;
    }
  }

  if (lifecycle.length > 0) {
    callAll(lifecycle);
  }

  renderCheck.v = false;

  if (isFunction(callback)) {
    callback();
  }

  if (isFunction(options.renderComplete)) {
    options.renderComplete(rootInput, parentDOM);
  }
}

function render(input, parentDOM, callback, context) {
  if (callback === void 0) callback = null;
  if (context === void 0) context = EMPTY_OBJ;

  __render(input, parentDOM, callback, context);
}

function createRenderer(parentDOM) {
  return function () {
    function renderer(lastInput, nextInput, callback, context) {
      if (!parentDOM) {
        parentDOM = lastInput;
      }

      render(nextInput, parentDOM, callback, context);
    }

    return renderer;
  }();
}

var QUEUE = [];
var nextTick = typeof Promise !== 'undefined' ? Promise.resolve().then.bind(Promise.resolve()) : function (a) {
  window.setTimeout(a, 0);
};
var microTaskPending = false;

function queueStateChanges(component, newState, callback, force) {
  var pending = component.$PS;

  if (isFunction(newState)) {
    newState = newState(pending ? combineFrom(component.state, pending) : component.state, component.props, component.context);
  }

  if (isNullOrUndef(pending)) {
    component.$PS = newState;
  } else {
    for (var stateKey in newState) {
      pending[stateKey] = newState[stateKey];
    }
  }

  if (!component.$BR) {
    if (!renderCheck.v) {
      if (QUEUE.length === 0) {
        applyState(component, force, callback);
        return;
      }
    }

    if (QUEUE.indexOf(component) === -1) {
      QUEUE.push(component);
    }

    if (!microTaskPending) {
      microTaskPending = true;
      nextTick(rerender);
    }

    if (isFunction(callback)) {
      var QU = component.$QU;

      if (!QU) {
        QU = component.$QU = [];
      }

      QU.push(callback);
    }
  } else if (isFunction(callback)) {
    component.$L.push(callback.bind(component));
  }
}

function callSetStateCallbacks(component) {
  var queue = component.$QU;

  for (var i = 0, len = queue.length; i < len; ++i) {
    queue[i].call(component);
  }

  component.$QU = null;
}

function rerender() {
  var component;
  microTaskPending = false;

  while (component = QUEUE.pop()) {
    var queue = component.$QU;
    applyState(component, false, queue ? callSetStateCallbacks.bind(null, component) : null);
  }
}

function applyState(component, force, callback) {
  if (component.$UN) {
    return;
  }

  if (force || !component.$BR) {
    var pendingState = component.$PS;
    component.$PS = null;
    var lifecycle = [];
    renderCheck.v = true;
    updateClassComponent(component, combineFrom(component.state, pendingState), component.props, findDOMfromVNode(component.$LI, true).parentNode, component.context, component.$SVG, force, null, lifecycle);

    if (lifecycle.length > 0) {
      callAll(lifecycle);
    }

    renderCheck.v = false;
  } else {
    component.state = component.$PS;
    component.$PS = null;
  }

  if (isFunction(callback)) {
    callback.call(component);
  }
}

var Component = function () {
  function Component(props, context) {
    // Public
    this.state = null; // Internal properties

    this.$BR = false; // BLOCK RENDER

    this.$BS = true; // BLOCK STATE

    this.$PS = null; // PENDING STATE (PARTIAL or FULL)

    this.$LI = null; // LAST INPUT

    this.$UN = false; // UNMOUNTED

    this.$CX = null; // CHILDCONTEXT

    this.$QU = null; // QUEUE

    this.$N = false; // Uses new lifecycle API Flag

    this.$L = null; // Current lifecycle of this component

    this.$SVG = false; // Flag to keep track if component is inside SVG tree

    this.props = props || EMPTY_OBJ;
    this.context = context || EMPTY_OBJ; // context should not be mutable
  }

  return Component;
}();

exports.Component = Component;

Component.prototype.forceUpdate = function () {
  function forceUpdate(callback) {
    if (this.$UN) {
      return;
    } // Do not allow double render during force update


    queueStateChanges(this, {}, callback, true);
  }

  return forceUpdate;
}();

Component.prototype.setState = function () {
  function setState(newState, callback) {
    if (this.$UN) {
      return;
    }

    if (!this.$BS) {
      queueStateChanges(this, newState, callback, false);
    }
  }

  return setState;
}();

Component.prototype.render = function () {
  function render(_nextProps, _nextState, _nextContext) {
    return null;
  }

  return render;
}();

var version = "7.3.2";
exports.version = version;

/***/ }),

/***/ "../../node_modules/inferno/index.esm.js":
/*!*********************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/inferno/index.esm.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _indexEsm = __webpack_require__(/*! ./dist/index.esm.js */ "../../node_modules/inferno/dist/index.esm.js");

Object.keys(_indexEsm).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  exports[key] = _indexEsm[key];
});

if (true) {
  console.warn('You are running production build of Inferno in development mode. Use dev:module entry point.');
}

/***/ }),

/***/ "../../node_modules/is-plain-obj/index.js":
/*!**********************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/is-plain-obj/index.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toString = Object.prototype.toString;

module.exports = function (x) {
  var prototype;
  return toString.call(x) === '[object Object]' && (prototype = Object.getPrototypeOf(x), prototype === null || prototype === Object.getPrototypeOf({}));
};

/***/ }),

/***/ "../../node_modules/node-libs-browser/node_modules/punycode/punycode.js":
/*!****************************************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/node-libs-browser/node_modules/punycode/punycode.js ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module, global) {var __WEBPACK_AMD_DEFINE_RESULT__;

/*! https://mths.be/punycode v1.4.1 by @mathias */
;

(function (root) {
  /** Detect free variables */
  var freeExports =  true && exports && !exports.nodeType && exports;
  var freeModule =  true && module && !module.nodeType && module;
  var freeGlobal = typeof global == 'object' && global;

  if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal) {
    root = freeGlobal;
  }
  /**
   * The `punycode` object.
   * @name punycode
   * @type Object
   */


  var punycode,

  /** Highest positive signed 32-bit float value */
  maxInt = 2147483647,
      // aka. 0x7FFFFFFF or 2^31-1

  /** Bootstring parameters */
  base = 36,
      tMin = 1,
      tMax = 26,
      skew = 38,
      damp = 700,
      initialBias = 72,
      initialN = 128,
      // 0x80
  delimiter = '-',
      // '\x2D'

  /** Regular expressions */
  regexPunycode = /^xn--/,
      regexNonASCII = /[^\x20-\x7E]/,
      // unprintable ASCII chars + non-ASCII chars
  regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g,
      // RFC 3490 separators

  /** Error messages */
  errors = {
    'overflow': 'Overflow: input needs wider integers to process',
    'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
    'invalid-input': 'Invalid input'
  },

  /** Convenience shortcuts */
  baseMinusTMin = base - tMin,
      floor = Math.floor,
      stringFromCharCode = String.fromCharCode,

  /** Temporary variable */
  key;
  /*--------------------------------------------------------------------------*/

  /**
   * A generic error utility function.
   * @private
   * @param {String} type The error type.
   * @returns {Error} Throws a `RangeError` with the applicable error message.
   */

  function error(type) {
    throw new RangeError(errors[type]);
  }
  /**
   * A generic `Array#map` utility function.
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} callback The function that gets called for every array
   * item.
   * @returns {Array} A new array of values returned by the callback function.
   */


  function map(array, fn) {
    var length = array.length;
    var result = [];

    while (length--) {
      result[length] = fn(array[length]);
    }

    return result;
  }
  /**
   * A simple `Array#map`-like wrapper to work with domain name strings or email
   * addresses.
   * @private
   * @param {String} domain The domain name or email address.
   * @param {Function} callback The function that gets called for every
   * character.
   * @returns {Array} A new string of characters returned by the callback
   * function.
   */


  function mapDomain(string, fn) {
    var parts = string.split('@');
    var result = '';

    if (parts.length > 1) {
      // In email addresses, only the domain name should be punycoded. Leave
      // the local part (i.e. everything up to `@`) intact.
      result = parts[0] + '@';
      string = parts[1];
    } // Avoid `split(regex)` for IE8 compatibility. See #17.


    string = string.replace(regexSeparators, '\x2E');
    var labels = string.split('.');
    var encoded = map(labels, fn).join('.');
    return result + encoded;
  }
  /**
   * Creates an array containing the numeric code points of each Unicode
   * character in the string. While JavaScript uses UCS-2 internally,
   * this function will convert a pair of surrogate halves (each of which
   * UCS-2 exposes as separate characters) into a single code point,
   * matching UTF-16.
   * @see `punycode.ucs2.encode`
   * @see <https://mathiasbynens.be/notes/javascript-encoding>
   * @memberOf punycode.ucs2
   * @name decode
   * @param {String} string The Unicode input string (UCS-2).
   * @returns {Array} The new array of code points.
   */


  function ucs2decode(string) {
    var output = [],
        counter = 0,
        length = string.length,
        value,
        extra;

    while (counter < length) {
      value = string.charCodeAt(counter++);

      if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
        // high surrogate, and there is a next character
        extra = string.charCodeAt(counter++);

        if ((extra & 0xFC00) == 0xDC00) {
          // low surrogate
          output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
        } else {
          // unmatched surrogate; only append this code unit, in case the next
          // code unit is the high surrogate of a surrogate pair
          output.push(value);
          counter--;
        }
      } else {
        output.push(value);
      }
    }

    return output;
  }
  /**
   * Creates a string based on an array of numeric code points.
   * @see `punycode.ucs2.decode`
   * @memberOf punycode.ucs2
   * @name encode
   * @param {Array} codePoints The array of numeric code points.
   * @returns {String} The new Unicode string (UCS-2).
   */


  function ucs2encode(array) {
    return map(array, function (value) {
      var output = '';

      if (value > 0xFFFF) {
        value -= 0x10000;
        output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
        value = 0xDC00 | value & 0x3FF;
      }

      output += stringFromCharCode(value);
      return output;
    }).join('');
  }
  /**
   * Converts a basic code point into a digit/integer.
   * @see `digitToBasic()`
   * @private
   * @param {Number} codePoint The basic numeric code point value.
   * @returns {Number} The numeric value of a basic code point (for use in
   * representing integers) in the range `0` to `base - 1`, or `base` if
   * the code point does not represent a value.
   */


  function basicToDigit(codePoint) {
    if (codePoint - 48 < 10) {
      return codePoint - 22;
    }

    if (codePoint - 65 < 26) {
      return codePoint - 65;
    }

    if (codePoint - 97 < 26) {
      return codePoint - 97;
    }

    return base;
  }
  /**
   * Converts a digit/integer into a basic code point.
   * @see `basicToDigit()`
   * @private
   * @param {Number} digit The numeric value of a basic code point.
   * @returns {Number} The basic code point whose value (when used for
   * representing integers) is `digit`, which needs to be in the range
   * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
   * used; else, the lowercase form is used. The behavior is undefined
   * if `flag` is non-zero and `digit` has no uppercase form.
   */


  function digitToBasic(digit, flag) {
    //  0..25 map to ASCII a..z or A..Z
    // 26..35 map to ASCII 0..9
    return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
  }
  /**
   * Bias adaptation function as per section 3.4 of RFC 3492.
   * https://tools.ietf.org/html/rfc3492#section-3.4
   * @private
   */


  function adapt(delta, numPoints, firstTime) {
    var k = 0;
    delta = firstTime ? floor(delta / damp) : delta >> 1;
    delta += floor(delta / numPoints);

    for (;
    /* no initialization */
    delta > baseMinusTMin * tMax >> 1; k += base) {
      delta = floor(delta / baseMinusTMin);
    }

    return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
  }
  /**
   * Converts a Punycode string of ASCII-only symbols to a string of Unicode
   * symbols.
   * @memberOf punycode
   * @param {String} input The Punycode string of ASCII-only symbols.
   * @returns {String} The resulting string of Unicode symbols.
   */


  function decode(input) {
    // Don't use UCS-2
    var output = [],
        inputLength = input.length,
        out,
        i = 0,
        n = initialN,
        bias = initialBias,
        basic,
        j,
        index,
        oldi,
        w,
        k,
        digit,
        t,

    /** Cached calculation results */
    baseMinusT; // Handle the basic code points: let `basic` be the number of input code
    // points before the last delimiter, or `0` if there is none, then copy
    // the first basic code points to the output.

    basic = input.lastIndexOf(delimiter);

    if (basic < 0) {
      basic = 0;
    }

    for (j = 0; j < basic; ++j) {
      // if it's not a basic code point
      if (input.charCodeAt(j) >= 0x80) {
        error('not-basic');
      }

      output.push(input.charCodeAt(j));
    } // Main decoding loop: start just after the last delimiter if any basic code
    // points were copied; start at the beginning otherwise.


    for (index = basic > 0 ? basic + 1 : 0; index < inputLength;)
    /* no final expression */
    {
      // `index` is the index of the next character to be consumed.
      // Decode a generalized variable-length integer into `delta`,
      // which gets added to `i`. The overflow checking is easier
      // if we increase `i` as we go, then subtract off its starting
      // value at the end to obtain `delta`.
      for (oldi = i, w = 1, k = base;;
      /* no condition */
      k += base) {
        if (index >= inputLength) {
          error('invalid-input');
        }

        digit = basicToDigit(input.charCodeAt(index++));

        if (digit >= base || digit > floor((maxInt - i) / w)) {
          error('overflow');
        }

        i += digit * w;
        t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;

        if (digit < t) {
          break;
        }

        baseMinusT = base - t;

        if (w > floor(maxInt / baseMinusT)) {
          error('overflow');
        }

        w *= baseMinusT;
      }

      out = output.length + 1;
      bias = adapt(i - oldi, out, oldi == 0); // `i` was supposed to wrap around from `out` to `0`,
      // incrementing `n` each time, so we'll fix that now:

      if (floor(i / out) > maxInt - n) {
        error('overflow');
      }

      n += floor(i / out);
      i %= out; // Insert `n` at position `i` of the output

      output.splice(i++, 0, n);
    }

    return ucs2encode(output);
  }
  /**
   * Converts a string of Unicode symbols (e.g. a domain name label) to a
   * Punycode string of ASCII-only symbols.
   * @memberOf punycode
   * @param {String} input The string of Unicode symbols.
   * @returns {String} The resulting Punycode string of ASCII-only symbols.
   */


  function encode(input) {
    var n,
        delta,
        handledCPCount,
        basicLength,
        bias,
        j,
        m,
        q,
        k,
        t,
        currentValue,
        output = [],

    /** `inputLength` will hold the number of code points in `input`. */
    inputLength,

    /** Cached calculation results */
    handledCPCountPlusOne,
        baseMinusT,
        qMinusT; // Convert the input in UCS-2 to Unicode

    input = ucs2decode(input); // Cache the length

    inputLength = input.length; // Initialize the state

    n = initialN;
    delta = 0;
    bias = initialBias; // Handle the basic code points

    for (j = 0; j < inputLength; ++j) {
      currentValue = input[j];

      if (currentValue < 0x80) {
        output.push(stringFromCharCode(currentValue));
      }
    }

    handledCPCount = basicLength = output.length; // `handledCPCount` is the number of code points that have been handled;
    // `basicLength` is the number of basic code points.
    // Finish the basic string - if it is not empty - with a delimiter

    if (basicLength) {
      output.push(delimiter);
    } // Main encoding loop:


    while (handledCPCount < inputLength) {
      // All non-basic code points < n have been handled already. Find the next
      // larger one:
      for (m = maxInt, j = 0; j < inputLength; ++j) {
        currentValue = input[j];

        if (currentValue >= n && currentValue < m) {
          m = currentValue;
        }
      } // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
      // but guard against overflow


      handledCPCountPlusOne = handledCPCount + 1;

      if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
        error('overflow');
      }

      delta += (m - n) * handledCPCountPlusOne;
      n = m;

      for (j = 0; j < inputLength; ++j) {
        currentValue = input[j];

        if (currentValue < n && ++delta > maxInt) {
          error('overflow');
        }

        if (currentValue == n) {
          // Represent delta as a generalized variable-length integer
          for (q = delta, k = base;;
          /* no condition */
          k += base) {
            t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;

            if (q < t) {
              break;
            }

            qMinusT = q - t;
            baseMinusT = base - t;
            output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0)));
            q = floor(qMinusT / baseMinusT);
          }

          output.push(stringFromCharCode(digitToBasic(q, 0)));
          bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
          delta = 0;
          ++handledCPCount;
        }
      }

      ++delta;
      ++n;
    }

    return output.join('');
  }
  /**
   * Converts a Punycode string representing a domain name or an email address
   * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
   * it doesn't matter if you call it on a string that has already been
   * converted to Unicode.
   * @memberOf punycode
   * @param {String} input The Punycoded domain name or email address to
   * convert to Unicode.
   * @returns {String} The Unicode representation of the given Punycode
   * string.
   */


  function toUnicode(input) {
    return mapDomain(input, function (string) {
      return regexPunycode.test(string) ? decode(string.slice(4).toLowerCase()) : string;
    });
  }
  /**
   * Converts a Unicode string representing a domain name or an email address to
   * Punycode. Only the non-ASCII parts of the domain name will be converted,
   * i.e. it doesn't matter if you call it with a domain that's already in
   * ASCII.
   * @memberOf punycode
   * @param {String} input The domain name or email address to convert, as a
   * Unicode string.
   * @returns {String} The Punycode representation of the given domain name or
   * email address.
   */


  function toASCII(input) {
    return mapDomain(input, function (string) {
      return regexNonASCII.test(string) ? 'xn--' + encode(string) : string;
    });
  }
  /*--------------------------------------------------------------------------*/

  /** Define the public API */


  punycode = {
    /**
     * A string representing the current Punycode.js version number.
     * @memberOf punycode
     * @type String
     */
    'version': '1.4.1',

    /**
     * An object of methods to convert from JavaScript's internal character
     * representation (UCS-2) to Unicode code points, and back.
     * @see <https://mathiasbynens.be/notes/javascript-encoding>
     * @memberOf punycode
     * @type Object
     */
    'ucs2': {
      'decode': ucs2decode,
      'encode': ucs2encode
    },
    'decode': decode,
    'encode': encode,
    'toASCII': toASCII,
    'toUnicode': toUnicode
  };
  /** Expose `punycode` */
  // Some AMD build optimizers, like r.js, check for specific condition patterns
  // like the following:

  if (true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
      return punycode;
    }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(void 0);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/module.js */ "../../node_modules/webpack/buildin/module.js")(module), __webpack_require__(/*! ./../../../webpack/buildin/global.js */ "../../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../../node_modules/object-assign/index.js":
/*!***********************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/object-assign/index.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

/* eslint-disable no-unused-vars */

var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
  if (val === null || val === undefined) {
    throw new TypeError('Object.assign cannot be called with null or undefined');
  }

  return Object(val);
}

function shouldUseNative() {
  try {
    if (!Object.assign) {
      return false;
    } // Detect buggy property enumeration order in older V8 versions.
    // https://bugs.chromium.org/p/v8/issues/detail?id=4118


    var test1 = new String('abc'); // eslint-disable-line no-new-wrappers

    test1[5] = 'de';

    if (Object.getOwnPropertyNames(test1)[0] === '5') {
      return false;
    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


    var test2 = {};

    for (var i = 0; i < 10; i++) {
      test2['_' + String.fromCharCode(i)] = i;
    }

    var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
      return test2[n];
    });

    if (order2.join('') !== '0123456789') {
      return false;
    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


    var test3 = {};
    'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
      test3[letter] = letter;
    });

    if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
      return false;
    }

    return true;
  } catch (err) {
    // We don't expect any of the above to throw, but better to be safe.
    return false;
  }
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
  var from;
  var to = toObject(target);
  var symbols;

  for (var s = 1; s < arguments.length; s++) {
    from = Object(arguments[s]);

    for (var key in from) {
      if (hasOwnProperty.call(from, key)) {
        to[key] = from[key];
      }
    }

    if (getOwnPropertySymbols) {
      symbols = getOwnPropertySymbols(from);

      for (var i = 0; i < symbols.length; i++) {
        if (propIsEnumerable.call(from, symbols[i])) {
          to[symbols[i]] = from[symbols[i]];
        }
      }
    }
  }

  return to;
};

/***/ }),

/***/ "../../node_modules/prepend-http/index.js":
/*!**********************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/prepend-http/index.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (url) {
  if (typeof url !== 'string') {
    throw new TypeError('Expected a string, got ' + typeof url);
  }

  url = url.trim();

  if (/^\.*\/|^(?!localhost)\w+:/.test(url)) {
    return url;
  }

  return url.replace(/^(?!(?:\w+:)?\/\/)/, 'http://');
};

/***/ }),

/***/ "../../node_modules/query-string/index.js":
/*!**********************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/query-string/index.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var strictUriEncode = __webpack_require__(/*! strict-uri-encode */ "../../node_modules/strict-uri-encode/index.js");

var objectAssign = __webpack_require__(/*! object-assign */ "../../node_modules/object-assign/index.js");

function encoderForArrayFormat(opts) {
  switch (opts.arrayFormat) {
    case 'index':
      return function (key, value, index) {
        return value === null ? [encode(key, opts), '[', index, ']'].join('') : [encode(key, opts), '[', encode(index, opts), ']=', encode(value, opts)].join('');
      };

    case 'bracket':
      return function (key, value) {
        return value === null ? encode(key, opts) : [encode(key, opts), '[]=', encode(value, opts)].join('');
      };

    default:
      return function (key, value) {
        return value === null ? encode(key, opts) : [encode(key, opts), '=', encode(value, opts)].join('');
      };
  }
}

function parserForArrayFormat(opts) {
  var result;

  switch (opts.arrayFormat) {
    case 'index':
      return function (key, value, accumulator) {
        result = /\[(\d*)\]$/.exec(key);
        key = key.replace(/\[\d*\]$/, '');

        if (!result) {
          accumulator[key] = value;
          return;
        }

        if (accumulator[key] === undefined) {
          accumulator[key] = {};
        }

        accumulator[key][result[1]] = value;
      };

    case 'bracket':
      return function (key, value, accumulator) {
        result = /(\[\])$/.exec(key);
        key = key.replace(/\[\]$/, '');

        if (!result) {
          accumulator[key] = value;
          return;
        } else if (accumulator[key] === undefined) {
          accumulator[key] = [value];
          return;
        }

        accumulator[key] = [].concat(accumulator[key], value);
      };

    default:
      return function (key, value, accumulator) {
        if (accumulator[key] === undefined) {
          accumulator[key] = value;
          return;
        }

        accumulator[key] = [].concat(accumulator[key], value);
      };
  }
}

function encode(value, opts) {
  if (opts.encode) {
    return opts.strict ? strictUriEncode(value) : encodeURIComponent(value);
  }

  return value;
}

function keysSorter(input) {
  if (Array.isArray(input)) {
    return input.sort();
  } else if (typeof input === 'object') {
    return keysSorter(Object.keys(input)).sort(function (a, b) {
      return Number(a) - Number(b);
    }).map(function (key) {
      return input[key];
    });
  }

  return input;
}

exports.extract = function (str) {
  return str.split('?')[1] || '';
};

exports.parse = function (str, opts) {
  opts = objectAssign({
    arrayFormat: 'none'
  }, opts);
  var formatter = parserForArrayFormat(opts); // Create an object with no prototype
  // https://github.com/sindresorhus/query-string/issues/47

  var ret = Object.create(null);

  if (typeof str !== 'string') {
    return ret;
  }

  str = str.trim().replace(/^(\?|#|&)/, '');

  if (!str) {
    return ret;
  }

  str.split('&').forEach(function (param) {
    var parts = param.replace(/\+/g, ' ').split('='); // Firefox (pre 40) decodes `%3D` to `=`
    // https://github.com/sindresorhus/query-string/pull/37

    var key = parts.shift();
    var val = parts.length > 0 ? parts.join('=') : undefined; // missing `=` should be `null`:
    // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters

    val = val === undefined ? null : decodeURIComponent(val);
    formatter(decodeURIComponent(key), val, ret);
  });
  return Object.keys(ret).sort().reduce(function (result, key) {
    var val = ret[key];

    if (Boolean(val) && typeof val === 'object' && !Array.isArray(val)) {
      // Sort object keys, not values
      result[key] = keysSorter(val);
    } else {
      result[key] = val;
    }

    return result;
  }, Object.create(null));
};

exports.stringify = function (obj, opts) {
  var defaults = {
    encode: true,
    strict: true,
    arrayFormat: 'none'
  };
  opts = objectAssign(defaults, opts);
  var formatter = encoderForArrayFormat(opts);
  return obj ? Object.keys(obj).sort().map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encode(key, opts);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.slice().forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }

        result.push(formatter(key, val2, result.length));
      });
      return result.join('&');
    }

    return encode(key, opts) + '=' + encode(val, opts);
  }).filter(function (x) {
    return x.length > 0;
  }).join('&') : '';
};

/***/ }),

/***/ "../../node_modules/querystring-es3/decode.js":
/*!**************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/querystring-es3/decode.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
 // If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function (qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);
  var maxKeys = 1000;

  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length; // maxKeys <= 0 means that we should not limit keys count

  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr,
        vstr,
        k,
        v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

/***/ }),

/***/ "../../node_modules/querystring-es3/encode.js":
/*!**************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/querystring-es3/encode.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.


var stringifyPrimitive = function stringifyPrimitive(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function (obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';

  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function (k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;

      if (isArray(obj[k])) {
        return map(obj[k], function (v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);
  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq + encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map(xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];

  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }

  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }

  return res;
};

/***/ }),

/***/ "../../node_modules/querystring-es3/index.js":
/*!*************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/querystring-es3/index.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.decode = exports.parse = __webpack_require__(/*! ./decode */ "../../node_modules/querystring-es3/decode.js");
exports.encode = exports.stringify = __webpack_require__(/*! ./encode */ "../../node_modules/querystring-es3/encode.js");

/***/ }),

/***/ "../../node_modules/regenerator-runtime/runtime.js":
/*!*******************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/regenerator-runtime/runtime.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var runtime = function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.

  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []); // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.

    generator._invoke = makeInvokeMethod(innerFn, self, context);
    return generator;
  }

  exports.wrap = wrap; // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.

  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed"; // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.

  var ContinueSentinel = {}; // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.

  function Generator() {}

  function GeneratorFunction() {}

  function GeneratorFunctionPrototype() {} // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.


  var IteratorPrototype = {};

  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

  if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction"; // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.

  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      prototype[method] = function (arg) {
        return this._invoke(method, arg);
      };
    });
  }

  exports.isGeneratorFunction = function (genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
    // do is to check its .name property.
    (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
  };

  exports.mark = function (genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;

      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }

    genFun.prototype = Object.create(Gp);
    return genFun;
  }; // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.


  exports.awrap = function (arg) {
    return {
      __await: arg
    };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);

      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;

        if (value && typeof value === "object" && hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function (value) {
            invoke("next", value, resolve, reject);
          }, function (err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function (unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function (error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise = // If enqueue has been called before, then we want to wait until
      // all previous Promises have been resolved before calling invoke,
      // so that results are always delivered in the correct order. If
      // enqueue has not been called before, then it is important to
      // call invoke immediately, without waiting on a callback to fire,
      // so that the async generator function has the opportunity to do
      // any necessary setup in a predictable way. This predictability
      // is why the Promise constructor synchronously invokes its
      // executor callback, and why async functions synchronously
      // execute code before the first await. Since we implement simple
      // async functions in terms of async generators, it is especially
      // important to get this right, even though it requires care.
      previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
      // invocations of the iterator.
      callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    } // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).


    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);

  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };

  exports.AsyncIterator = AsyncIterator; // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.

  exports.async = function (innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));
    return exports.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
    : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;
    return function () {
      function invoke(method, arg) {
        if (state === GenStateExecuting) {
          throw new Error("Generator is already running");
        }

        if (state === GenStateCompleted) {
          if (method === "throw") {
            throw arg;
          } // Be forgiving, per 25.3.3.3.3 of the spec:
          // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume


          return doneResult();
        }

        context.method = method;
        context.arg = arg;

        while (true) {
          var delegate = context.delegate;

          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);

            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if (context.method === "next") {
            // Setting context._sent for legacy support of Babel's
            // function.sent implementation.
            context.sent = context._sent = context.arg;
          } else if (context.method === "throw") {
            if (state === GenStateSuspendedStart) {
              state = GenStateCompleted;
              throw context.arg;
            }

            context.dispatchException(context.arg);
          } else if (context.method === "return") {
            context.abrupt("return", context.arg);
          }

          state = GenStateExecuting;
          var record = tryCatch(innerFn, self, context);

          if (record.type === "normal") {
            // If an exception is thrown from innerFn, we leave state ===
            // GenStateExecuting and loop back for another invocation.
            state = context.done ? GenStateCompleted : GenStateSuspendedYield;

            if (record.arg === ContinueSentinel) {
              continue;
            }

            return {
              value: record.arg,
              done: context.done
            };
          } else if (record.type === "throw") {
            state = GenStateCompleted; // Dispatch the exception by looping back around to the
            // context.dispatchException(context.arg) call above.

            context.method = "throw";
            context.arg = record.arg;
          }
        }
      }

      return invoke;
    }();
  } // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.


  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];

    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (!info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value; // Resume execution at the desired location (see delegateYield).

      context.next = delegate.nextLoc; // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.

      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }
    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    } // The delegate iterator is finished, so forget it and continue with
    // the outer generator.


    context.delegate = null;
    return ContinueSentinel;
  } // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.


  defineIteratorMethods(Gp);
  Gp[toStringTagSymbol] = "Generator"; // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.

  Gp[iteratorSymbol] = function () {
    return this;
  };

  Gp.toString = function () {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{
      tryLoc: "root"
    }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function (object) {
    var keys = [];

    for (var key in object) {
      keys.push(key);
    }

    keys.reverse(); // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.

    return function () {
      function next() {
        while (keys.length) {
          var key = keys.pop();

          if (key in object) {
            next.value = key;
            next.done = false;
            return next;
          }
        } // To avoid creating an additional object, we just hang the .value
        // and .done properties off the next function object itself. This
        // also ensures that the minifier will not anonymize the function.


        next.done = true;
        return next;
      }

      return next;
    }();
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];

      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1,
            next = function () {
          function next() {
            while (++i < iterable.length) {
              if (hasOwn.call(iterable, i)) {
                next.value = iterable[i];
                next.done = false;
                return next;
              }
            }

            next.value = undefined;
            next.done = true;
            return next;
          }

          return next;
        }();

        return next.next = next;
      }
    } // Return an iterator with no values.


    return {
      next: doneResult
    };
  }

  exports.values = values;

  function doneResult() {
    return {
      value: undefined,
      done: true
    };
  }

  Context.prototype = {
    constructor: Context,
    reset: function () {
      function reset(skipTempReset) {
        this.prev = 0;
        this.next = 0; // Resetting context._sent for legacy support of Babel's
        // function.sent implementation.

        this.sent = this._sent = undefined;
        this.done = false;
        this.delegate = null;
        this.method = "next";
        this.arg = undefined;
        this.tryEntries.forEach(resetTryEntry);

        if (!skipTempReset) {
          for (var name in this) {
            // Not sure about the optimal order of these conditions:
            if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
              this[name] = undefined;
            }
          }
        }
      }

      return reset;
    }(),
    stop: function () {
      function stop() {
        this.done = true;
        var rootEntry = this.tryEntries[0];
        var rootRecord = rootEntry.completion;

        if (rootRecord.type === "throw") {
          throw rootRecord.arg;
        }

        return this.rval;
      }

      return stop;
    }(),
    dispatchException: function () {
      function dispatchException(exception) {
        if (this.done) {
          throw exception;
        }

        var context = this;

        function handle(loc, caught) {
          record.type = "throw";
          record.arg = exception;
          context.next = loc;

          if (caught) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            context.method = "next";
            context.arg = undefined;
          }

          return !!caught;
        }

        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          var record = entry.completion;

          if (entry.tryLoc === "root") {
            // Exception thrown outside of any try block that could handle
            // it, so set the completion value of the entire function to
            // throw the exception.
            return handle("end");
          }

          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc");
            var hasFinally = hasOwn.call(entry, "finallyLoc");

            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              } else if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              }
            } else if (hasFinally) {
              if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else {
              throw new Error("try statement without catch or finally");
            }
          }
        }
      }

      return dispatchException;
    }(),
    abrupt: function () {
      function abrupt(type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }

        if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
          // Ignore the finally entry if control is not jumping to a
          // location outside the try/catch block.
          finallyEntry = null;
        }

        var record = finallyEntry ? finallyEntry.completion : {};
        record.type = type;
        record.arg = arg;

        if (finallyEntry) {
          this.method = "next";
          this.next = finallyEntry.finallyLoc;
          return ContinueSentinel;
        }

        return this.complete(record);
      }

      return abrupt;
    }(),
    complete: function () {
      function complete(record, afterLoc) {
        if (record.type === "throw") {
          throw record.arg;
        }

        if (record.type === "break" || record.type === "continue") {
          this.next = record.arg;
        } else if (record.type === "return") {
          this.rval = this.arg = record.arg;
          this.method = "return";
          this.next = "end";
        } else if (record.type === "normal" && afterLoc) {
          this.next = afterLoc;
        }

        return ContinueSentinel;
      }

      return complete;
    }(),
    finish: function () {
      function finish(finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.finallyLoc === finallyLoc) {
            this.complete(entry.completion, entry.afterLoc);
            resetTryEntry(entry);
            return ContinueSentinel;
          }
        }
      }

      return finish;
    }(),
    "catch": function () {
      function _catch(tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;

            if (record.type === "throw") {
              var thrown = record.arg;
              resetTryEntry(entry);
            }

            return thrown;
          }
        } // The context.catch method must only be called with a location
        // argument that corresponds to a known catch block.


        throw new Error("illegal catch attempt");
      }

      return _catch;
    }(),
    delegateYield: function () {
      function delegateYield(iterable, resultName, nextLoc) {
        this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        };

        if (this.method === "next") {
          // Deliberately forget the last sent value so that we don't
          // accidentally pass it on to the delegate.
          this.arg = undefined;
        }

        return ContinueSentinel;
      }

      return delegateYield;
    }()
  }; // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.

  return exports;
}( // If this script is executing as a CommonJS module, use module.exports
// as the regeneratorRuntime namespace. Otherwise create a new empty
// object. Either way, the resulting object will be used to initialize
// the regeneratorRuntime variable at the top of this file.
 true ? module.exports : undefined);

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}

/***/ }),

/***/ "../../node_modules/strict-uri-encode/index.js":
/*!***************************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/strict-uri-encode/index.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (str) {
  return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase();
  });
};

/***/ }),

/***/ "../../node_modules/url/url.js":
/*!***********************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/url/url.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.


var punycode = __webpack_require__(/*! punycode */ "../../node_modules/node-libs-browser/node_modules/punycode/punycode.js");

var util = __webpack_require__(/*! ./util */ "../../node_modules/url/util.js");

exports.parse = urlParse;
exports.resolve = urlResolve;
exports.resolveObject = urlResolveObject;
exports.format = urlFormat;
exports.Url = Url;

function Url() {
  this.protocol = null;
  this.slashes = null;
  this.auth = null;
  this.host = null;
  this.port = null;
  this.hostname = null;
  this.hash = null;
  this.search = null;
  this.query = null;
  this.pathname = null;
  this.path = null;
  this.href = null;
} // Reference: RFC 3986, RFC 1808, RFC 2396
// define these here so at least they only have to be
// compiled once on the first module load.


var protocolPattern = /^([a-z0-9.+-]+:)/i,
    portPattern = /:[0-9]*$/,
    // Special case for a simple path URL
simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,
    // RFC 2396: characters reserved for delimiting URLs.
// We actually just auto-escape these.
delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],
    // RFC 2396: characters not allowed for various reasons.
unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),
    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
autoEscape = ['\''].concat(unwise),
    // Characters that are never ever allowed in a hostname.
// Note that any invalid chars are also handled, but these
// are the ones that are *expected* to be seen, so we fast-path
// them.
nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
    hostEndingChars = ['/', '?', '#'],
    hostnameMaxLen = 255,
    hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
    hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
    // protocols that can allow "unsafe" and "unwise" chars.
unsafeProtocol = {
  'javascript': true,
  'javascript:': true
},
    // protocols that never have a hostname.
hostlessProtocol = {
  'javascript': true,
  'javascript:': true
},
    // protocols that always contain a // bit.
slashedProtocol = {
  'http': true,
  'https': true,
  'ftp': true,
  'gopher': true,
  'file': true,
  'http:': true,
  'https:': true,
  'ftp:': true,
  'gopher:': true,
  'file:': true
},
    querystring = __webpack_require__(/*! querystring */ "../../node_modules/querystring-es3/index.js");

function urlParse(url, parseQueryString, slashesDenoteHost) {
  if (url && util.isObject(url) && url instanceof Url) return url;
  var u = new Url();
  u.parse(url, parseQueryString, slashesDenoteHost);
  return u;
}

Url.prototype.parse = function (url, parseQueryString, slashesDenoteHost) {
  if (!util.isString(url)) {
    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
  } // Copy chrome, IE, opera backslash-handling behavior.
  // Back slashes before the query string get converted to forward slashes
  // See: https://code.google.com/p/chromium/issues/detail?id=25916


  var queryIndex = url.indexOf('?'),
      splitter = queryIndex !== -1 && queryIndex < url.indexOf('#') ? '?' : '#',
      uSplit = url.split(splitter),
      slashRegex = /\\/g;
  uSplit[0] = uSplit[0].replace(slashRegex, '/');
  url = uSplit.join(splitter);
  var rest = url; // trim before proceeding.
  // This is to support parse stuff like "  http://foo.com  \n"

  rest = rest.trim();

  if (!slashesDenoteHost && url.split('#').length === 1) {
    // Try fast path regexp
    var simplePath = simplePathPattern.exec(rest);

    if (simplePath) {
      this.path = rest;
      this.href = rest;
      this.pathname = simplePath[1];

      if (simplePath[2]) {
        this.search = simplePath[2];

        if (parseQueryString) {
          this.query = querystring.parse(this.search.substr(1));
        } else {
          this.query = this.search.substr(1);
        }
      } else if (parseQueryString) {
        this.search = '';
        this.query = {};
      }

      return this;
    }
  }

  var proto = protocolPattern.exec(rest);

  if (proto) {
    proto = proto[0];
    var lowerProto = proto.toLowerCase();
    this.protocol = lowerProto;
    rest = rest.substr(proto.length);
  } // figure out if it's got a host
  // user@server is *always* interpreted as a hostname, and url
  // resolution will treat //foo/bar as host=foo,path=bar because that's
  // how the browser resolves relative URLs.


  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    var slashes = rest.substr(0, 2) === '//';

    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      this.slashes = true;
    }
  }

  if (!hostlessProtocol[proto] && (slashes || proto && !slashedProtocol[proto])) {
    // there's a hostname.
    // the first instance of /, ?, ;, or # ends the host.
    //
    // If there is an @ in the hostname, then non-host chars *are* allowed
    // to the left of the last @ sign, unless some host-ending character
    // comes *before* the @-sign.
    // URLs are obnoxious.
    //
    // ex:
    // http://a@b@c/ => user:a@b host:c
    // http://a@b?@c => user:a host:c path:/?@c
    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
    // Review our test case against browsers more comprehensively.
    // find the first instance of any hostEndingChars
    var hostEnd = -1;

    for (var i = 0; i < hostEndingChars.length; i++) {
      var hec = rest.indexOf(hostEndingChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) hostEnd = hec;
    } // at this point, either we have an explicit point where the
    // auth portion cannot go past, or the last @ char is the decider.


    var auth, atSign;

    if (hostEnd === -1) {
      // atSign can be anywhere.
      atSign = rest.lastIndexOf('@');
    } else {
      // atSign must be in auth portion.
      // http://a@b/c@d => host:b auth:a path:/c@d
      atSign = rest.lastIndexOf('@', hostEnd);
    } // Now we have a portion which is definitely the auth.
    // Pull that off.


    if (atSign !== -1) {
      auth = rest.slice(0, atSign);
      rest = rest.slice(atSign + 1);
      this.auth = decodeURIComponent(auth);
    } // the host is the remaining to the left of the first non-host char


    hostEnd = -1;

    for (var i = 0; i < nonHostChars.length; i++) {
      var hec = rest.indexOf(nonHostChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) hostEnd = hec;
    } // if we still have not hit it, then the entire thing is a host.


    if (hostEnd === -1) hostEnd = rest.length;
    this.host = rest.slice(0, hostEnd);
    rest = rest.slice(hostEnd); // pull out port.

    this.parseHost(); // we've indicated that there is a hostname,
    // so even if it's empty, it has to be present.

    this.hostname = this.hostname || ''; // if hostname begins with [ and ends with ]
    // assume that it's an IPv6 address.

    var ipv6Hostname = this.hostname[0] === '[' && this.hostname[this.hostname.length - 1] === ']'; // validate a little.

    if (!ipv6Hostname) {
      var hostparts = this.hostname.split(/\./);

      for (var i = 0, l = hostparts.length; i < l; i++) {
        var part = hostparts[i];
        if (!part) continue;

        if (!part.match(hostnamePartPattern)) {
          var newpart = '';

          for (var j = 0, k = part.length; j < k; j++) {
            if (part.charCodeAt(j) > 127) {
              // we replace non-ASCII char with a temporary placeholder
              // we need this to make sure size of hostname is not
              // broken by replacing non-ASCII by nothing
              newpart += 'x';
            } else {
              newpart += part[j];
            }
          } // we test again with ASCII char only


          if (!newpart.match(hostnamePartPattern)) {
            var validParts = hostparts.slice(0, i);
            var notHost = hostparts.slice(i + 1);
            var bit = part.match(hostnamePartStart);

            if (bit) {
              validParts.push(bit[1]);
              notHost.unshift(bit[2]);
            }

            if (notHost.length) {
              rest = '/' + notHost.join('.') + rest;
            }

            this.hostname = validParts.join('.');
            break;
          }
        }
      }
    }

    if (this.hostname.length > hostnameMaxLen) {
      this.hostname = '';
    } else {
      // hostnames are always lower case.
      this.hostname = this.hostname.toLowerCase();
    }

    if (!ipv6Hostname) {
      // IDNA Support: Returns a punycoded representation of "domain".
      // It only converts parts of the domain name that
      // have non-ASCII characters, i.e. it doesn't matter if
      // you call it with a domain that already is ASCII-only.
      this.hostname = punycode.toASCII(this.hostname);
    }

    var p = this.port ? ':' + this.port : '';
    var h = this.hostname || '';
    this.host = h + p;
    this.href += this.host; // strip [ and ] from the hostname
    // the host field still retains them, though

    if (ipv6Hostname) {
      this.hostname = this.hostname.substr(1, this.hostname.length - 2);

      if (rest[0] !== '/') {
        rest = '/' + rest;
      }
    }
  } // now rest is set to the post-host stuff.
  // chop off any delim chars.


  if (!unsafeProtocol[lowerProto]) {
    // First, make 100% sure that any "autoEscape" chars get
    // escaped, even if encodeURIComponent doesn't think they
    // need to be.
    for (var i = 0, l = autoEscape.length; i < l; i++) {
      var ae = autoEscape[i];
      if (rest.indexOf(ae) === -1) continue;
      var esc = encodeURIComponent(ae);

      if (esc === ae) {
        esc = escape(ae);
      }

      rest = rest.split(ae).join(esc);
    }
  } // chop off from the tail first.


  var hash = rest.indexOf('#');

  if (hash !== -1) {
    // got a fragment string.
    this.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }

  var qm = rest.indexOf('?');

  if (qm !== -1) {
    this.search = rest.substr(qm);
    this.query = rest.substr(qm + 1);

    if (parseQueryString) {
      this.query = querystring.parse(this.query);
    }

    rest = rest.slice(0, qm);
  } else if (parseQueryString) {
    // no query string, but parseQueryString still requested
    this.search = '';
    this.query = {};
  }

  if (rest) this.pathname = rest;

  if (slashedProtocol[lowerProto] && this.hostname && !this.pathname) {
    this.pathname = '/';
  } //to support http.request


  if (this.pathname || this.search) {
    var p = this.pathname || '';
    var s = this.search || '';
    this.path = p + s;
  } // finally, reconstruct the href based on what has been validated.


  this.href = this.format();
  return this;
}; // format a parsed object into a url string


function urlFormat(obj) {
  // ensure it's an object, and not a string url.
  // If it's an obj, this is a no-op.
  // this way, you can call url_format() on strings
  // to clean up potentially wonky urls.
  if (util.isString(obj)) obj = urlParse(obj);
  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
  return obj.format();
}

Url.prototype.format = function () {
  var auth = this.auth || '';

  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ':');
    auth += '@';
  }

  var protocol = this.protocol || '',
      pathname = this.pathname || '',
      hash = this.hash || '',
      host = false,
      query = '';

  if (this.host) {
    host = auth + this.host;
  } else if (this.hostname) {
    host = auth + (this.hostname.indexOf(':') === -1 ? this.hostname : '[' + this.hostname + ']');

    if (this.port) {
      host += ':' + this.port;
    }
  }

  if (this.query && util.isObject(this.query) && Object.keys(this.query).length) {
    query = querystring.stringify(this.query);
  }

  var search = this.search || query && '?' + query || '';
  if (protocol && protocol.substr(-1) !== ':') protocol += ':'; // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
  // unless they had them to begin with.

  if (this.slashes || (!protocol || slashedProtocol[protocol]) && host !== false) {
    host = '//' + (host || '');
    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
  } else if (!host) {
    host = '';
  }

  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
  if (search && search.charAt(0) !== '?') search = '?' + search;
  pathname = pathname.replace(/[?#]/g, function (match) {
    return encodeURIComponent(match);
  });
  search = search.replace('#', '%23');
  return protocol + host + pathname + search + hash;
};

function urlResolve(source, relative) {
  return urlParse(source, false, true).resolve(relative);
}

Url.prototype.resolve = function (relative) {
  return this.resolveObject(urlParse(relative, false, true)).format();
};

function urlResolveObject(source, relative) {
  if (!source) return relative;
  return urlParse(source, false, true).resolveObject(relative);
}

Url.prototype.resolveObject = function (relative) {
  if (util.isString(relative)) {
    var rel = new Url();
    rel.parse(relative, false, true);
    relative = rel;
  }

  var result = new Url();
  var tkeys = Object.keys(this);

  for (var tk = 0; tk < tkeys.length; tk++) {
    var tkey = tkeys[tk];
    result[tkey] = this[tkey];
  } // hash is always overridden, no matter what.
  // even href="" will remove it.


  result.hash = relative.hash; // if the relative url is empty, then there's nothing left to do here.

  if (relative.href === '') {
    result.href = result.format();
    return result;
  } // hrefs like //foo/bar always cut to the protocol.


  if (relative.slashes && !relative.protocol) {
    // take everything except the protocol from relative
    var rkeys = Object.keys(relative);

    for (var rk = 0; rk < rkeys.length; rk++) {
      var rkey = rkeys[rk];
      if (rkey !== 'protocol') result[rkey] = relative[rkey];
    } //urlParse appends trailing / to urls like http://www.example.com


    if (slashedProtocol[result.protocol] && result.hostname && !result.pathname) {
      result.path = result.pathname = '/';
    }

    result.href = result.format();
    return result;
  }

  if (relative.protocol && relative.protocol !== result.protocol) {
    // if it's a known url protocol, then changing
    // the protocol does weird things
    // first, if it's not file:, then we MUST have a host,
    // and if there was a path
    // to begin with, then we MUST have a path.
    // if it is file:, then the host is dropped,
    // because that's known to be hostless.
    // anything else is assumed to be absolute.
    if (!slashedProtocol[relative.protocol]) {
      var keys = Object.keys(relative);

      for (var v = 0; v < keys.length; v++) {
        var k = keys[v];
        result[k] = relative[k];
      }

      result.href = result.format();
      return result;
    }

    result.protocol = relative.protocol;

    if (!relative.host && !hostlessProtocol[relative.protocol]) {
      var relPath = (relative.pathname || '').split('/');

      while (relPath.length && !(relative.host = relPath.shift())) {
        ;
      }

      if (!relative.host) relative.host = '';
      if (!relative.hostname) relative.hostname = '';
      if (relPath[0] !== '') relPath.unshift('');
      if (relPath.length < 2) relPath.unshift('');
      result.pathname = relPath.join('/');
    } else {
      result.pathname = relative.pathname;
    }

    result.search = relative.search;
    result.query = relative.query;
    result.host = relative.host || '';
    result.auth = relative.auth;
    result.hostname = relative.hostname || relative.host;
    result.port = relative.port; // to support http.request

    if (result.pathname || result.search) {
      var p = result.pathname || '';
      var s = result.search || '';
      result.path = p + s;
    }

    result.slashes = result.slashes || relative.slashes;
    result.href = result.format();
    return result;
  }

  var isSourceAbs = result.pathname && result.pathname.charAt(0) === '/',
      isRelAbs = relative.host || relative.pathname && relative.pathname.charAt(0) === '/',
      mustEndAbs = isRelAbs || isSourceAbs || result.host && relative.pathname,
      removeAllDots = mustEndAbs,
      srcPath = result.pathname && result.pathname.split('/') || [],
      relPath = relative.pathname && relative.pathname.split('/') || [],
      psychotic = result.protocol && !slashedProtocol[result.protocol]; // if the url is a non-slashed url, then relative
  // links like ../.. should be able
  // to crawl up to the hostname, as well.  This is strange.
  // result.protocol has already been set by now.
  // Later on, put the first path part into the host field.

  if (psychotic) {
    result.hostname = '';
    result.port = null;

    if (result.host) {
      if (srcPath[0] === '') srcPath[0] = result.host;else srcPath.unshift(result.host);
    }

    result.host = '';

    if (relative.protocol) {
      relative.hostname = null;
      relative.port = null;

      if (relative.host) {
        if (relPath[0] === '') relPath[0] = relative.host;else relPath.unshift(relative.host);
      }

      relative.host = null;
    }

    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
  }

  if (isRelAbs) {
    // it's absolute.
    result.host = relative.host || relative.host === '' ? relative.host : result.host;
    result.hostname = relative.hostname || relative.hostname === '' ? relative.hostname : result.hostname;
    result.search = relative.search;
    result.query = relative.query;
    srcPath = relPath; // fall through to the dot-handling below.
  } else if (relPath.length) {
    // it's relative
    // throw away the existing file, and take the new path instead.
    if (!srcPath) srcPath = [];
    srcPath.pop();
    srcPath = srcPath.concat(relPath);
    result.search = relative.search;
    result.query = relative.query;
  } else if (!util.isNullOrUndefined(relative.search)) {
    // just pull out the search.
    // like href='?foo'.
    // Put this after the other two cases because it simplifies the booleans
    if (psychotic) {
      result.hostname = result.host = srcPath.shift(); //occationaly the auth can get stuck only in host
      //this especially happens in cases like
      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')

      var authInHost = result.host && result.host.indexOf('@') > 0 ? result.host.split('@') : false;

      if (authInHost) {
        result.auth = authInHost.shift();
        result.host = result.hostname = authInHost.shift();
      }
    }

    result.search = relative.search;
    result.query = relative.query; //to support http.request

    if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
      result.path = (result.pathname ? result.pathname : '') + (result.search ? result.search : '');
    }

    result.href = result.format();
    return result;
  }

  if (!srcPath.length) {
    // no path at all.  easy.
    // we've already handled the other stuff above.
    result.pathname = null; //to support http.request

    if (result.search) {
      result.path = '/' + result.search;
    } else {
      result.path = null;
    }

    result.href = result.format();
    return result;
  } // if a url ENDs in . or .., then it must get a trailing slash.
  // however, if it ends in anything else non-slashy,
  // then it must NOT get a trailing slash.


  var last = srcPath.slice(-1)[0];
  var hasTrailingSlash = (result.host || relative.host || srcPath.length > 1) && (last === '.' || last === '..') || last === ''; // strip single dots, resolve double dots to parent dir
  // if the path tries to go above the root, `up` ends up > 0

  var up = 0;

  for (var i = srcPath.length; i >= 0; i--) {
    last = srcPath[i];

    if (last === '.') {
      srcPath.splice(i, 1);
    } else if (last === '..') {
      srcPath.splice(i, 1);
      up++;
    } else if (up) {
      srcPath.splice(i, 1);
      up--;
    }
  } // if the path is allowed to go above the root, restore leading ..s


  if (!mustEndAbs && !removeAllDots) {
    for (; up--; up) {
      srcPath.unshift('..');
    }
  }

  if (mustEndAbs && srcPath[0] !== '' && (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
    srcPath.unshift('');
  }

  if (hasTrailingSlash && srcPath.join('/').substr(-1) !== '/') {
    srcPath.push('');
  }

  var isAbsolute = srcPath[0] === '' || srcPath[0] && srcPath[0].charAt(0) === '/'; // put the host back

  if (psychotic) {
    result.hostname = result.host = isAbsolute ? '' : srcPath.length ? srcPath.shift() : ''; //occationaly the auth can get stuck only in host
    //this especially happens in cases like
    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')

    var authInHost = result.host && result.host.indexOf('@') > 0 ? result.host.split('@') : false;

    if (authInHost) {
      result.auth = authInHost.shift();
      result.host = result.hostname = authInHost.shift();
    }
  }

  mustEndAbs = mustEndAbs || result.host && srcPath.length;

  if (mustEndAbs && !isAbsolute) {
    srcPath.unshift('');
  }

  if (!srcPath.length) {
    result.pathname = null;
    result.path = null;
  } else {
    result.pathname = srcPath.join('/');
  } //to support request.http


  if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
    result.path = (result.pathname ? result.pathname : '') + (result.search ? result.search : '');
  }

  result.auth = relative.auth || result.auth;
  result.slashes = result.slashes || relative.slashes;
  result.href = result.format();
  return result;
};

Url.prototype.parseHost = function () {
  var host = this.host;
  var port = portPattern.exec(host);

  if (port) {
    port = port[0];

    if (port !== ':') {
      this.port = port.substr(1);
    }

    host = host.substr(0, host.length - port.length);
  }

  if (host) this.hostname = host;
};

/***/ }),

/***/ "../../node_modules/url/util.js":
/*!************************************************************************!*\
  !*** C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/url/util.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  isString: function () {
    function isString(arg) {
      return typeof arg === 'string';
    }

    return isString;
  }(),
  isObject: function () {
    function isObject(arg) {
      return typeof arg === 'object' && arg !== null;
    }

    return isObject;
  }(),
  isNull: function () {
    function isNull(arg) {
      return arg === null;
    }

    return isNull;
  }(),
  isNullOrUndefined: function () {
    function isNullOrUndefined(arg) {
      return arg == null;
    }

    return isNullOrUndefined;
  }()
};

/***/ }),

/***/ "../../node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var g; // This works in non-strict mode

g = function () {
  return this;
}();

try {
  // This works if eval is allowed (see CSP)
  g = g || new Function("return this")();
} catch (e) {
  // This works if the window reference is available
  if (typeof window === "object") g = window;
} // g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}


module.exports = g;

/***/ }),

/***/ "../../node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (module) {
  if (!module.webpackPolyfill) {
    module.deprecate = function () {};

    module.paths = []; // module.parent = undefined by default

    if (!module.children) module.children = [];
    Object.defineProperty(module, "loaded", {
      enumerable: true,
      get: function () {
        function get() {
          return module.l;
        }

        return get;
      }()
    });
    Object.defineProperty(module, "id", {
      enumerable: true,
      get: function () {
        function get() {
          return module.i;
        }

        return get;
      }()
    });
    module.webpackPolyfill = 1;
  }

  return module;
};

/***/ }),

/***/ "../common/fp.js":
/*!***********************!*\
  !*** ../common/fp.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.map = exports.compose = exports.flow = void 0;

/**
 * Creates a function that returns the result of invoking the given
 * functions, where each successive invocation is supplied the return
 * value of the previous.
 */
var flow = function flow() {
  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  return function (input) {
    var output = input;

    for (var _len2 = arguments.length, rest = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      rest[_key2 - 1] = arguments[_key2];
    }

    for (var _iterator = funcs, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var func = _ref;

      // Recurse into the array of functions
      if (Array.isArray(func)) {
        output = flow.apply(void 0, func).apply(void 0, [output].concat(rest));
      } else if (func) {
        output = func.apply(void 0, [output].concat(rest));
      }
    }

    return output;
  };
};
/**
 * Composes single-argument functions from right to left.
 *
 * All functions might accept a context in form of additional arguments.
 * If the resulting function is called with more than 1 argument, rest of
 * the arguments are passed to all functions unchanged.
 *
 * @param {...Function} funcs The functions to compose
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (input, ...rest) => f(g(h(input, ...rest), ...rest), ...rest)
 */


exports.flow = flow;

var compose = function compose() {
  for (var _len3 = arguments.length, funcs = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    funcs[_key3] = arguments[_key3];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function (value) {
      for (var _len4 = arguments.length, rest = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        rest[_key4 - 1] = arguments[_key4];
      }

      return a.apply(void 0, [b.apply(void 0, [value].concat(rest))].concat(rest));
    };
  });
};
/**
 * Creates an array of values by running each element in collection
 * thru an iteratee function. The iteratee is invoked with three
 * arguments: (value, index|key, collection).
 *
 * If collection is 'null' or 'undefined', it will be returned "as is"
 * without emitting any errors (which can be useful in some cases).
 */


exports.compose = compose;

var map = function map(iteratorFn) {
  return function (collection) {
    if (collection === null && collection === undefined) {
      return collection;
    }

    if (Array.isArray(collection)) {
      return collection.map(iteratorFn);
    }

    if (typeof collection === 'object') {
      var _hasOwnProperty = Object.prototype.hasOwnProperty;
      var result = [];

      for (var i in collection) {
        if (_hasOwnProperty.call(collection, i)) {
          result.push(iteratorFn(collection[i], i, collection));
        }
      }

      return result;
    }

    throw new Error("map() can't iterate on type " + typeof collection);
  };
};

exports.map = map;

/***/ }),

/***/ "../common/math.js":
/*!*************************!*\
  !*** ../common/math.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.toFixed = exports.round = exports.clamp = void 0;

/**
 * Limits a number to the range between 'min' and 'max'.
 */
var clamp = function clamp(value, min, max) {
  if (min === void 0) {
    min = 0;
  }

  if (max === void 0) {
    max = 1;
  }

  return Math.max(min, Math.min(value, max));
};
/**
 * Returns a rounded number.
 * TODO: Replace this native rounding function with a more robust one.
 */


exports.clamp = clamp;

var round = function round(value) {
  return Math.round(value);
};
/**
 * Returns a string representing a number in fixed point notation.
 */


exports.round = round;

var toFixed = function toFixed(value, fractionDigits) {
  if (fractionDigits === void 0) {
    fractionDigits = 0;
  }

  return Number(value).toFixed(fractionDigits);
};

exports.toFixed = toFixed;

/***/ }),

/***/ "../common/react.js":
/*!**************************!*\
  !*** ../common/react.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.pureComponentHooks = exports.shallowDiffers = exports.normalizeChildren = exports.classes = void 0;

/**
 * Helper for conditionally adding/removing classes in React
 *
 * @return {string}
 */
var classes = function classes() {
  var classNames = [];
  var hasOwn = Object.prototype.hasOwnProperty;

  for (var i = 0; i < arguments.length; i++) {
    var arg = i < 0 || arguments.length <= i ? undefined : arguments[i];

    if (!arg) {
      continue;
    }

    if (typeof arg === 'string' || typeof arg === 'number') {
      classNames.push(arg);
    } else if (Array.isArray(arg) && arg.length) {
      var inner = classes.apply(null, arg);

      if (inner) {
        classNames.push(inner);
      }
    } else if (typeof arg === 'object') {
      for (var key in arg) {
        if (hasOwn.call(arg, key) && arg[key]) {
          classNames.push(key);
        }
      }
    }
  }

  return classNames.join(' ');
};
/**
 * Normalizes children prop, so that it is always an array of VDom
 * elements.
 */


exports.classes = classes;

var normalizeChildren = function normalizeChildren(children) {
  if (Array.isArray(children)) {
    return children.filter(function (value) {
      return value;
    });
  }

  if (typeof children === 'object') {
    return [children];
  }

  return [];
};
/**
 * Shallowly checks if two objects are different.
 * Credit: https://github.com/developit/preact-compat
 */


exports.normalizeChildren = normalizeChildren;

var shallowDiffers = function shallowDiffers(a, b) {
  var i;

  for (i in a) {
    if (!(i in b)) {
      return true;
    }
  }

  for (i in b) {
    if (a[i] !== b[i]) {
      return true;
    }
  }

  return false;
};
/**
 * Default inferno hooks for pure components.
 */


exports.shallowDiffers = shallowDiffers;
var pureComponentHooks = {
  onComponentShouldUpdate: function () {
    function onComponentShouldUpdate(lastProps, nextProps) {
      return shallowDiffers(lastProps, nextProps);
    }

    return onComponentShouldUpdate;
  }()
};
exports.pureComponentHooks = pureComponentHooks;

/***/ }),

/***/ "../common/redux.js":
/*!**************************!*\
  !*** ../common/redux.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.applyMiddleware = exports.createStore = void 0;

var _fp = __webpack_require__(/*! ./fp */ "../common/fp.js");

/**
 * Creates a Redux store.
 */
var createStore = function createStore(reducer, enhancer) {
  // Apply a store enhancer (applyMiddleware is one of them).
  if (enhancer) {
    return enhancer(createStore)(reducer);
  }

  var currentState;
  var listeners = [];

  var getState = function getState() {
    return currentState;
  };

  var subscribe = function subscribe(listener) {
    listeners.push(listener);
  };

  var dispatch = function dispatch(action) {
    currentState = reducer(currentState, action);
    listeners.forEach(function (fn) {
      return fn();
    });
  }; // This creates the initial store by causing each reducer to be called
  // with an undefined state


  dispatch({
    type: '@@INIT'
  });
  return {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState
  };
};
/**
 * Creates a store enhancer which applies middleware to all dispatched
 * actions.
 */


exports.createStore = createStore;

var applyMiddleware = function applyMiddleware() {
  for (var _len = arguments.length, middlewares = new Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (createStore) {
    return function (reducer) {
      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      var store = createStore.apply(void 0, [reducer].concat(args));

      var _dispatch = function dispatch() {
        throw new Error('Dispatching while constructing your middleware is not allowed.');
      };

      var storeApi = {
        getState: store.getState,
        dispatch: function () {
          function dispatch(action) {
            for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
              args[_key3 - 1] = arguments[_key3];
            }

            return _dispatch.apply(void 0, [action].concat(args));
          }

          return dispatch;
        }()
      };
      var chain = middlewares.map(function (middleware) {
        return middleware(storeApi);
      });
      _dispatch = _fp.compose.apply(void 0, chain)(store.dispatch);
      return Object.assign({}, store, {
        dispatch: _dispatch
      });
    };
  };
};

exports.applyMiddleware = applyMiddleware;

/***/ }),

/***/ "../common/string.js":
/*!***************************!*\
  !*** ../common/string.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.buildQueryString = exports.decodeHtmlEntities = exports.toTitleCase = exports.capitalize = exports.testGlobPattern = void 0;

/**
 * Matches strings with wildcards.
 * Example: testGlobPattern('*@domain')('user@domain') === true
 */
var testGlobPattern = function testGlobPattern(pattern) {
  var escapeString = function escapeString(str) {
    return str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');
  };

  var regex = new RegExp('^' + pattern.split(/\*+/).map(escapeString).join('.*') + '$');
  return function (str) {
    return regex.test(str);
  };
};

exports.testGlobPattern = testGlobPattern;

var capitalize = function capitalize(str) {
  // Handle array
  if (Array.isArray(str)) {
    return str.map(capitalize);
  } // Handle string


  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

exports.capitalize = capitalize;

var toTitleCase = function toTitleCase(str) {
  // Handle array
  if (Array.isArray(str)) {
    return str.map(toTitleCase);
  } // Pass non-string


  if (typeof str !== 'string') {
    return str;
  } // Handle string


  var WORDS_UPPER = ['Id', 'Tv'];
  var WORDS_LOWER = ['A', 'An', 'And', 'As', 'At', 'But', 'By', 'For', 'For', 'From', 'In', 'Into', 'Near', 'Nor', 'Of', 'On', 'Onto', 'Or', 'The', 'To', 'With'];
  var currentStr = str.replace(/([^\W_]+[^\s-]*) */g, function (str) {
    return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
  });

  for (var _i = 0, _WORDS_LOWER = WORDS_LOWER; _i < _WORDS_LOWER.length; _i++) {
    var word = _WORDS_LOWER[_i];
    var regex = new RegExp('\\s' + word + '\\s', 'g');
    currentStr = currentStr.replace(regex, function (str) {
      return str.toLowerCase();
    });
  }

  for (var _i2 = 0, _WORDS_UPPER = WORDS_UPPER; _i2 < _WORDS_UPPER.length; _i2++) {
    var _word = _WORDS_UPPER[_i2];

    var _regex = new RegExp('\\b' + _word + '\\b', 'g');

    currentStr = currentStr.replace(_regex, function (str) {
      return str.toLowerCase();
    });
  }

  return currentStr;
};
/**
 * Decodes HTML entities, and removes unnecessary HTML tags.
 *
 * @param  {String} str Encoded HTML string
 * @return {String} Decoded HTML string
 */


exports.toTitleCase = toTitleCase;

var decodeHtmlEntities = function decodeHtmlEntities(str) {
  if (!str) {
    return str;
  }

  var translate_re = /&(nbsp|amp|quot|lt|gt|apos);/g;
  var translate = {
    nbsp: ' ',
    amp: '&',
    quot: '"',
    lt: '<',
    gt: '>',
    apos: '\''
  };
  return str // Newline tags
  .replace(/<br>/gi, '\n').replace(/<\/?[a-z0-9-_]+[^>]*>/gi, '') // Basic entities
  .replace(translate_re, function (match, entity) {
    return translate[entity];
  }) // Decimal entities
  .replace(/&#?([0-9]+);/gi, function (match, numStr) {
    var num = parseInt(numStr, 10);
    return String.fromCharCode(num);
  }) // Hex entities
  .replace(/&#x?([0-9a-f]+);/gi, function (match, numStr) {
    var num = parseInt(numStr, 16);
    return String.fromCharCode(num);
  });
};
/**
 * Converts an object into a query string,
 */


exports.decodeHtmlEntities = decodeHtmlEntities;

var buildQueryString = function buildQueryString(obj) {
  return Object.keys(obj).map(function (key) {
    return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]);
  }).join('&');
};

exports.buildQueryString = buildQueryString;

/***/ }),

/***/ "../tgui-dev-server/link/client.js":
/*!***********************************!*\
  !*** .-dev-server/link/client.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.setupHotReloading = exports.sendLogEntry = void 0;
var socket;
var queue = [];
var subscribers = [];

var ensureConnection = function ensureConnection() {
  if (true) {
    if (!window.WebSocket) {
      return;
    }

    if (!socket || socket.readyState === WebSocket.CLOSED) {
      socket = new WebSocket('ws://127.0.0.1:3000');

      socket.onopen = function () {
        // Empty the message queue
        while (queue.length !== 0) {
          var msg = queue.shift();
          socket.send(msg);
        }
      };

      socket.onmessage = function (event) {
        var msg = JSON.parse(event.data);

        for (var _iterator = subscribers, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
          var _ref;

          if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
          } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
          }

          var subscriber = _ref;
          subscriber(msg);
        }
      };
    }
  }
};

if (true) {
  window.onunload = function () {
    return socket && socket.close();
  };
}

var subscribe = function subscribe(fn) {
  return subscribers.push(fn);
};
/**
 * A json serializer which handles circular references and other junk.
 */


var serializeObject = function serializeObject(obj) {
  var cache = [];
  var json = JSON.stringify(obj, function (key, value) {
    if (typeof value === 'object' && value !== null) {
      if (cache.indexOf(value) !== -1) {
        return '[circular ref]';
      }

      cache.push(value);
      return value;
    }

    return value;
  });
  cache = null;
  return json;
};

var sendRawMessage = function sendRawMessage(msg) {
  if (true) {
    var json = serializeObject(msg); // Send message using WebSocket

    if (window.WebSocket) {
      ensureConnection();

      if (socket.readyState === WebSocket.OPEN) {
        socket.send(json);
      } else {
        // Keep only 10 latest messages in the queue
        if (queue.length > 10) {
          queue.shift();
        }

        queue.push(json);
      }
    } // Send message using plain HTTP request.
    else {
        var req = new XMLHttpRequest();
        req.open('POST', 'http://127.0.0.1:3001', true);
        req.send(json);
      }
  }
};

var sendLogEntry = function sendLogEntry(level, ns) {
  if (true) {
    try {
      for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        args[_key - 2] = arguments[_key];
      }

      sendRawMessage({
        type: 'log',
        payload: {
          level: level,
          ns: ns || 'client',
          args: args
        }
      });
    } catch (err) {}
  }
};

exports.sendLogEntry = sendLogEntry;

var setupHotReloading = function setupHotReloading() {
  if ( true && window.WebSocket) {
    if (true) {
      ensureConnection();
      sendLogEntry(0, null, 'setting up hot reloading');
      subscribe(function (msg) {
        var type = msg.type;
        sendLogEntry(0, null, 'received', type);

        if (type === 'hotUpdate') {
          var status = module.hot.status();

          if (status !== 'idle') {
            sendLogEntry(0, null, 'hot reload status:', status);
            return;
          }

          module.hot.check({
            ignoreUnaccepted: true,
            ignoreDeclined: true,
            ignoreErrored: true
          }).then(function (modules) {
            sendLogEntry(0, null, 'outdated modules', modules);
          })["catch"](function (err) {
            sendLogEntry(0, null, 'reload error', err);
          });
        }
      });
    }
  }
};

exports.setupHotReloading = setupHotReloading;

/***/ }),

/***/ "./backend.js":
/*!********************!*\
  !*** ./backend.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.backendReducer = exports.backendUpdate = void 0;

var _constants = __webpack_require__(/*! ./constants */ "./constants.js");

var _byond = __webpack_require__(/*! ./byond */ "./byond.js");

/**
 * This file provides a clear separation layer between backend updates
 * and what state our React app sees.
 *
 * Sometimes backend can response without a "data" field, but our final
 * state will still contain previous "data" because we are merging
 * the response with already existing state.
 */

/**
 * Creates a backend update action.
 */
var backendUpdate = function backendUpdate(state) {
  return {
    type: 'backendUpdate',
    payload: state
  };
};
/**
 * Precisely defines state changes.
 */


exports.backendUpdate = backendUpdate;

var backendReducer = function backendReducer(state, action) {
  var type = action.type,
      payload = action.payload;

  if (type === 'backendUpdate') {
    // Merge config
    var config = Object.assign({}, state.config, {}, payload.config); // Merge data

    var data = Object.assign({}, state.data, {}, payload.static_data, {}, payload.data); // Calculate our own fields

    var visible = config.status !== _constants.UI_DISABLED;
    var interactive = config.status === _constants.UI_INTERACTIVE; // Override fancy setting for IE8

    if (_byond.tridentVersion <= 4) {
      config.fancy = 0;
    } // Return new state


    return Object.assign({}, state, {
      config: config,
      data: data,
      visible: visible,
      interactive: interactive
    });
  }

  return state;
};

exports.backendReducer = backendReducer;

/***/ }),

/***/ "./byond.js":
/*!******************!*\
  !*** ./byond.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.winset = exports.winget = exports.act = exports.runCommand = exports.callByondAsync = exports.callByond = exports.tridentVersion = void 0;

var _string = __webpack_require__(/*! common/string */ "../common/string.js");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * Version of Trident engine used in Internet Explorer.
 *
 * - IE 8 - Trident 4.0
 * - IE 11 - Trident 7.0
 *
 * @return An integer number or 'null' if this is not a trident engine.
 */
var tridentVersion = function () {
  var _navigator = navigator,
      userAgent = _navigator.userAgent;
  var groups = userAgent.match(/Trident\/(\d+).+?;/i);
  var majorVersion = groups[1];

  if (!majorVersion) {
    return null;
  }

  return parseInt(majorVersion, 10);
}();
/**
 * Helper to generate a BYOND href given 'params' as an object
 * (with an optional 'url' for eg winset).
 */


exports.tridentVersion = tridentVersion;

var href = function href(url, params) {
  if (params === void 0) {
    params = {};
  }

  return 'byond://' + url + '?' + (0, _string.buildQueryString)(params);
};

var callByond = function callByond(url, params) {
  if (params === void 0) {
    params = {};
  }

  window.location.href = href(url, params);
};
/**
 * A high-level abstraction of BYJAX. Makes a call to BYOND and returns
 * a promise, which (if endpoint has a callback parameter) resolves
 * with the return value of that call.
 */


exports.callByond = callByond;

var callByondAsync = function callByondAsync(url, params) {
  if (params === void 0) {
    params = {};
  }

  // Create a callback array if it doesn't exist yet
  window.__callbacks__ = window.__callbacks__ || []; // Create a Promise and push its resolve function into callback array

  var callbackIndex = window.__callbacks__.length;
  var promise = new Promise(function (resolve) {
    // TODO: Fix a potential memory leak
    window.__callbacks__.push(resolve);
  }); // Call BYOND client

  window.location.href = href(url, Object.assign({}, params, {
    callback: "__callbacks__[" + callbackIndex + "]"
  }));
  return promise;
};
/**
 * Literally types a command on the client.
 */


exports.callByondAsync = callByondAsync;

var runCommand = function runCommand(command) {
  return callByond('winset', {
    command: command
  });
};
/**
 * Helper to make a BYOND ui_act() call on the UI 'src' given an 'action'
 * and optional 'params'.
 */


exports.runCommand = runCommand;

var act = function act(src, action, params) {
  if (params === void 0) {
    params = {};
  }

  return callByond('', Object.assign({
    src: src,
    action: action
  }, params));
};
/**
 * Calls 'winget' on window, retrieving value by the 'key'.
 */


exports.act = act;

var winget =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function () {
    function _callee(win, key) {
      var obj;
      return regeneratorRuntime.wrap(function () {
        function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return callByondAsync('winget', {
                  id: win,
                  property: key
                });

              case 2:
                obj = _context.sent;
                return _context.abrupt("return", obj[key]);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }

        return _callee$;
      }(), _callee);
    }

    return _callee;
  }()));

  return function () {
    function winget(_x, _x2) {
      return _ref.apply(this, arguments);
    }

    return winget;
  }();
}();
/**
 * Calls 'winset' on window, setting 'key' to 'value'.
 */


exports.winget = winget;

var winset = function winset(win, key, value) {
  var _callByond;

  return callByond('winset', (_callByond = {}, _callByond[win + "." + key] = value, _callByond));
};

exports.winset = winset;

/***/ }),

/***/ "./components/AnimatedNumber.js":
/*!**************************************!*\
  !*** ./components/AnimatedNumber.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.AnimatedNumber = void 0;

var _math = __webpack_require__(/*! common/math */ "../common/math.js");

var _inferno = __webpack_require__(/*! inferno */ "../../node_modules/inferno/index.esm.js");

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var FPS = 20;
var Q = 0.5;

var isSafeNumber = function isSafeNumber(value) {
  return typeof value === 'number' && Number.isFinite(value) && !Number.isNaN(value);
};

var AnimatedNumber =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(AnimatedNumber, _Component);

  function AnimatedNumber(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    _this.timer = null;
    _this.state = {
      value: 0
    }; // Use provided initial state

    if (isSafeNumber(props.initial)) {
      _this.state.value = props.initial;
    } // Set initial state with value provided in props
    else if (isSafeNumber(props.value)) {
        _this.state.value = Number(props.value);
      }

    return _this;
  }

  var _proto = AnimatedNumber.prototype;

  _proto.tick = function () {
    function tick() {
      var props = this.props,
          state = this.state;
      var currentValue = Number(state.value);
      var targetValue = Number(props.value); // Avoid poisoning our state with infinities and NaN

      if (!isSafeNumber(targetValue)) {
        return;
      } // Smooth the value using an exponential moving average


      var value = currentValue * Q + targetValue * (1 - Q);
      this.setState({
        value: value
      });
    }

    return tick;
  }();

  _proto.componentDidMount = function () {
    function componentDidMount() {
      var _this2 = this;

      this.timer = setInterval(function () {
        return _this2.tick();
      }, 1000 / FPS);
    }

    return componentDidMount;
  }();

  _proto.componentWillUnmount = function () {
    function componentWillUnmount() {
      clearTimeout(this.timer);
    }

    return componentWillUnmount;
  }();

  _proto.render = function () {
    function render() {
      var props = this.props,
          state = this.state;
      var format = props.format;
      var currentValue = state.value;
      var targetValue = props.value; // Directly display values which can't be animated

      if (!isSafeNumber(targetValue)) {
        return targetValue || null;
      } // Use custom formatter


      if (format) {
        return format(currentValue);
      } // Fix our animated precision at target value's precision.


      var fraction = String(targetValue).split('.')[1];
      var precision = fraction ? fraction.length : 0;
      return (0, _math.toFixed)(currentValue, (0, _math.clamp)(precision, 0, 8));
    }

    return render;
  }();

  return AnimatedNumber;
}(_inferno.Component);

exports.AnimatedNumber = AnimatedNumber;

/***/ }),

/***/ "./components/Box.js":
/*!***************************!*\
  !*** ./components/Box.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.Box = exports.computeBoxProps = exports.unit = void 0;

var _react = __webpack_require__(/*! common/react */ "../common/react.js");

var _inferno = __webpack_require__(/*! inferno */ "../../node_modules/inferno/index.esm.js");

var _infernoVnodeFlags = __webpack_require__(/*! inferno-vnode-flags */ "../../node_modules/inferno-vnode-flags/dist/index.esm.js");

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var REM_PX = 12;
var REM_PER_INTEGER = 0.5;
/**
 * Coverts our rem-like spacing unit into a CSS unit.
 */

var unit = function unit(value) {
  if (typeof value === 'string') {
    return value;
  }

  if (typeof value === 'number') {
    return value * REM_PX * REM_PER_INTEGER + 'px';
  }
};
/**
 * Nullish coalesce function
 */


exports.unit = unit;

var firstDefined = function firstDefined() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return args.find(function (arg) {
    return arg !== undefined && arg !== null;
  });
};

var computeBoxProps = function computeBoxProps(props) {
  var className = props.className,
      color = props.color,
      width = props.width,
      minWidth = props.minWidth,
      maxWidth = props.maxWidth,
      height = props.height,
      minHeight = props.minHeight,
      maxHeight = props.maxHeight,
      lineHeight = props.lineHeight,
      inline = props.inline,
      m = props.m,
      mx = props.mx,
      my = props.my,
      mt = props.mt,
      mb = props.mb,
      ml = props.ml,
      mr = props.mr,
      opacity = props.opacity,
      bold = props.bold,
      italic = props.italic,
      textAlign = props.textAlign,
      position = props.position,
      top = props.top,
      left = props.left,
      right = props.right,
      bottom = props.bottom,
      rest = _objectWithoutPropertiesLoose(props, ["className", "color", "width", "minWidth", "maxWidth", "height", "minHeight", "maxHeight", "lineHeight", "inline", "m", "mx", "my", "mt", "mb", "ml", "mr", "opacity", "bold", "italic", "textAlign", "position", "top", "left", "right", "bottom"]);

  return Object.assign({}, rest, {
    className: (0, _react.classes)([className, color && 'color-' + color]),
    style: Object.assign({
      'display': inline ? 'inline-block' : undefined,
      'margin-top': unit(firstDefined(mt, my, m)),
      'margin-bottom': unit(firstDefined(mb, my, m)),
      'margin-left': unit(firstDefined(ml, mx, m)),
      'margin-right': unit(firstDefined(mr, mx, m)),
      'opacity': opacity,
      'width': unit(width),
      'min-width': unit(minWidth),
      'max-width': unit(maxWidth),
      'height': unit(height),
      'min-height': unit(minHeight),
      'max-height': unit(maxHeight),
      'line-height': unit(lineHeight),
      'font-weight': bold ? 'bold' : undefined,
      'font-style': italic ? 'italic' : undefined,
      'text-align': textAlign,
      'position': position,
      'top': unit(top),
      'left': unit(left),
      'right': unit(right),
      'bottom': unit(bottom)
    }, rest.style)
  });
};

exports.computeBoxProps = computeBoxProps;

var Box = function Box(props) {
  var _props$as = props.as,
      as = _props$as === void 0 ? 'div' : _props$as,
      content = props.content,
      children = props.children,
      rest = _objectWithoutPropertiesLoose(props, ["as", "content", "children"]); // Render props


  if (typeof children === 'function') {
    return children(computeBoxProps(props));
  }

  var _computeBoxProps = computeBoxProps(rest),
      className = _computeBoxProps.className,
      computedProps = _objectWithoutPropertiesLoose(_computeBoxProps, ["className"]); // Render a wrapper element


  return (0, _inferno.createVNode)(_infernoVnodeFlags.VNodeFlags.HtmlElement, as, className, content || children, _infernoVnodeFlags.ChildFlags.UnknownChildren, computedProps);
};

exports.Box = Box;
Box.defaultHooks = _react.pureComponentHooks;

/***/ }),

/***/ "./components/Button.js":
/*!******************************!*\
  !*** ./components/Button.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.Button = exports.BUTTON_ACTIVATION_KEYCODES = void 0;

var _inferno = __webpack_require__(/*! inferno */ "../../node_modules/inferno/index.esm.js");

var _react = __webpack_require__(/*! common/react */ "../common/react.js");

var _byond = __webpack_require__(/*! ../byond */ "./byond.js");

var _logging = __webpack_require__(/*! ../logging */ "./logging.js");

var _Box = __webpack_require__(/*! ./Box */ "./components/Box.js");

var _Icon = __webpack_require__(/*! ./Icon */ "./components/Icon.js");

var _Tooltip = __webpack_require__(/*! ./Tooltip */ "./components/Tooltip.js");

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var logger = (0, _logging.createLogger)('Button');
var BUTTON_ACTIVATION_KEYCODES = [13, // Enter
32 // Space
];
exports.BUTTON_ACTIVATION_KEYCODES = BUTTON_ACTIVATION_KEYCODES;

var Button = function Button(props) {
  var className = props.className,
      fluid = props.fluid,
      icon = props.icon,
      color = props.color,
      disabled = props.disabled,
      selected = props.selected,
      tooltip = props.tooltip,
      tooltipPosition = props.tooltipPosition,
      content = props.content,
      children = props.children,
      onclick = props.onclick,
      onClick = props.onClick,
      rest = _objectWithoutPropertiesLoose(props, ["className", "fluid", "icon", "color", "disabled", "selected", "tooltip", "tooltipPosition", "content", "children", "onclick", "onClick"]);

  var hasContent = !!(content || children); // A warning about the lowercase onclick

  if (onclick) {
    logger.warn("Lowercase 'onclick' is not supported on Button and " + "lowercase prop names are discouraged in general. " + "Please use a camelCase 'onClick' instead and read: " + "https://infernojs.org/docs/guides/event-handling");
  } // NOTE: Lowercase "onclick" and unselectable are used internally for
  // compatibility with IE8. Do not change it!


  return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _Box.Box, Object.assign({
    "as": "span",
    "className": (0, _react.classes)(['Button', fluid && 'Button--fluid', disabled && 'Button--disabled', selected && 'Button--selected', hasContent && 'Button--hasContent', color && typeof color === 'string' ? 'Button--color--' + color : 'Button--color--normal', className]),
    "tabIndex": !disabled && '0',
    "unselectable": _byond.tridentVersion <= 4,
    "onclick": function () {
      function onclick(e) {
        if (disabled || !onClick) {
          return;
        }

        onClick(e);
      }

      return onclick;
    }(),
    "onKeyPress": function () {
      function onKeyPress(e) {
        var keyCode = window.event ? e.which : e.keyCode;

        if (BUTTON_ACTIVATION_KEYCODES.includes(keyCode)) {
          e.preventDefault();
          onClick(e);
        }
      }

      return onKeyPress;
    }()
  }, rest, {
    children: [icon && (0, _inferno.createComponentVNode)(2, _Icon.Icon, {
      "name": icon
    }), content, children, tooltip && (0, _inferno.createComponentVNode)(2, _Tooltip.Tooltip, {
      "content": tooltip,
      "position": tooltipPosition
    })]
  })));
};

exports.Button = Button;
Button.defaultHooks = _react.pureComponentHooks;

/***/ }),

/***/ "./components/Flex.js":
/*!****************************!*\
  !*** ./components/Flex.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.FlexItem = exports.computeFlexItemProps = exports.Flex = exports.computeFlexProps = void 0;

var _inferno = __webpack_require__(/*! inferno */ "../../node_modules/inferno/index.esm.js");

var _react = __webpack_require__(/*! common/react */ "../common/react.js");

var _Box = __webpack_require__(/*! ./Box */ "./components/Box.js");

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var computeFlexProps = function computeFlexProps(props) {
  var className = props.className,
      direction = props.direction,
      wrap = props.wrap,
      align = props.align,
      justify = props.justify,
      rest = _objectWithoutPropertiesLoose(props, ["className", "direction", "wrap", "align", "justify"]);

  return Object.assign({
    className: (0, _react.classes)('Flex', className),
    style: Object.assign({}, rest.style, {
      'flex-direction': direction,
      'flex-wrap': wrap,
      'align-items': align,
      'justify-content': justify
    })
  }, rest);
};

exports.computeFlexProps = computeFlexProps;

var Flex = function Flex(props) {
  return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _Box.Box, Object.assign({}, computeFlexProps(props))));
};

exports.Flex = Flex;
Flex.defaultHooks = _react.pureComponentHooks;

var computeFlexItemProps = function computeFlexItemProps(props) {
  var className = props.className,
      grow = props.grow,
      order = props.order,
      align = props.align,
      rest = _objectWithoutPropertiesLoose(props, ["className", "grow", "order", "align"]);

  return Object.assign({
    className: (0, _react.classes)('Flex__item', className),
    style: Object.assign({}, rest.style, {
      'flex-grow': grow,
      'order': order,
      'align-self': align
    })
  }, rest);
};

exports.computeFlexItemProps = computeFlexItemProps;

var FlexItem = function FlexItem(props) {
  return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _Box.Box, Object.assign({}, computeFlexItemProps(props))));
};

exports.FlexItem = FlexItem;
FlexItem.defaultHooks = _react.pureComponentHooks;
Flex.Item = FlexItem;

/***/ }),

/***/ "./components/Icon.js":
/*!****************************!*\
  !*** ./components/Icon.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.Icon = void 0;

var _inferno = __webpack_require__(/*! inferno */ "../../node_modules/inferno/index.esm.js");

var _react = __webpack_require__(/*! common/react */ "../common/react.js");

var _Box = __webpack_require__(/*! ./Box */ "./components/Box.js");

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var FA_OUTLINE_REGEX = /-o$/;

var Icon = function Icon(props) {
  var name = props.name,
      size = props.size,
      className = props.className,
      _props$style = props.style,
      style = _props$style === void 0 ? {} : _props$style,
      rest = _objectWithoutPropertiesLoose(props, ["name", "size", "className", "style"]);

  if (size) {
    style['font-size'] = size * 100 + '%';
  }

  var faRegular = FA_OUTLINE_REGEX.test(name);
  var faName = name.replace(FA_OUTLINE_REGEX, '');
  return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _Box.Box, Object.assign({
    "as": "i",
    "className": (0, _react.classes)([className, faRegular ? 'far' : 'fas', 'fa-' + faName]),
    "style": style
  }, rest)));
};

exports.Icon = Icon;
Icon.defaultHooks = _react.pureComponentHooks;

/***/ }),

/***/ "./components/LabeledList.js":
/*!***********************************!*\
  !*** ./components/LabeledList.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.LabeledListDivider = exports.LabeledListItem = exports.LabeledList = void 0;

var _inferno = __webpack_require__(/*! inferno */ "../../node_modules/inferno/index.esm.js");

var _react = __webpack_require__(/*! common/react */ "../common/react.js");

var _Box = __webpack_require__(/*! ./Box */ "./components/Box.js");

var LabeledList = function LabeledList(props) {
  var children = props.children;
  return (0, _inferno.createVNode)(1, "table", "LabeledList", children, 0);
};

exports.LabeledList = LabeledList;
LabeledList.defaultHooks = _react.pureComponentHooks;

var LabeledListItem = function LabeledListItem(props) {
  var className = props.className,
      label = props.label,
      labelColor = props.labelColor,
      color = props.color,
      buttons = props.buttons,
      content = props.content,
      children = props.children;
  return (0, _inferno.createVNode)(1, "tr", (0, _react.classes)(['LabeledList__row', className]), [(0, _inferno.createVNode)(1, "td", (0, _react.classes)(['LabeledList__cell', 'LabeledList__label', 'color-' + (labelColor ? labelColor : 'label')]), [label, (0, _inferno.createTextVNode)(":")], 0), (0, _inferno.createVNode)(1, "td", (0, _react.classes)(['LabeledList__cell', 'LabeledList__content', color && 'color-' + color]), [content, children], 0, {
    "colSpan": buttons ? undefined : 2
  }), buttons && (0, _inferno.createVNode)(1, "td", "LabeledList__cell LabeledList__buttons", buttons, 0)], 0);
};

exports.LabeledListItem = LabeledListItem;
LabeledListItem.defaultHooks = _react.pureComponentHooks;

var LabeledListDivider = function LabeledListDivider(props) {
  var _props$size = props.size,
      size = _props$size === void 0 ? 1 : _props$size;
  return (0, _inferno.createVNode)(1, "tr", "LabeledList__row", (0, _inferno.createVNode)(1, "td", null, null, 1, {
    "style": {
      'padding-bottom': (0, _Box.unit)(size)
    }
  }), 2);
};

exports.LabeledListDivider = LabeledListDivider;
LabeledListDivider.defaultHooks = _react.pureComponentHooks;
LabeledList.Item = LabeledListItem;
LabeledList.Divider = LabeledListDivider;

/***/ }),

/***/ "./components/NoticeBox.js":
/*!*********************************!*\
  !*** ./components/NoticeBox.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.NoticeBox = void 0;

var _inferno = __webpack_require__(/*! inferno */ "../../node_modules/inferno/index.esm.js");

var _react = __webpack_require__(/*! common/react */ "../common/react.js");

var _Box = __webpack_require__(/*! ./Box */ "./components/Box.js");

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var NoticeBox = function NoticeBox(props) {
  var className = props.className,
      rest = _objectWithoutPropertiesLoose(props, ["className"]);

  return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _Box.Box, Object.assign({
    "className": (0, _react.classes)('NoticeBox', className)
  }, rest)));
};

exports.NoticeBox = NoticeBox;
NoticeBox.defaultHooks = _react.pureComponentHooks;

/***/ }),

/***/ "./components/ProgressBar.js":
/*!***********************************!*\
  !*** ./components/ProgressBar.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.ProgressBar = void 0;

var _inferno = __webpack_require__(/*! inferno */ "../../node_modules/inferno/index.esm.js");

var _react = __webpack_require__(/*! common/react */ "../common/react.js");

var _math = __webpack_require__(/*! common/math */ "../common/math.js");

var ProgressBar = function ProgressBar(props) {
  var value = props.value,
      content = props.content,
      color = props.color,
      children = props.children;
  var hasContent = !!(content || children);
  return (0, _inferno.createVNode)(1, "div", (0, _react.classes)(['ProgressBar', color && 'ProgressBar--color--' + color]), [(0, _inferno.createVNode)(1, "div", "ProgressBar__fill", null, 1, {
    "style": {
      'width': (0, _math.clamp)(value, 0, 1) * 100 + '%'
    }
  }), (0, _inferno.createVNode)(1, "div", "ProgressBar__content", hasContent ? content || children : (0, _math.toFixed)(value * 100) + '%', 0)], 4);
};

exports.ProgressBar = ProgressBar;
ProgressBar.defaultHooks = _react.pureComponentHooks;

/***/ }),

/***/ "./components/Section.js":
/*!*******************************!*\
  !*** ./components/Section.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.Section = void 0;

var _inferno = __webpack_require__(/*! inferno */ "../../node_modules/inferno/index.esm.js");

var _react = __webpack_require__(/*! common/react */ "../common/react.js");

var _Box = __webpack_require__(/*! ./Box */ "./components/Box.js");

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Section = function Section(props) {
  var className = props.className,
      title = props.title,
      _props$level = props.level,
      level = _props$level === void 0 ? 1 : _props$level,
      buttons = props.buttons,
      content = props.content,
      children = props.children,
      rest = _objectWithoutPropertiesLoose(props, ["className", "title", "level", "buttons", "content", "children"]);

  var hasTitle = !!(title || buttons);
  return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _Box.Box, Object.assign({
    "className": (0, _react.classes)(['Section', 'Section--level--' + level, className])
  }, rest, {
    children: [hasTitle && (0, _inferno.createVNode)(1, "div", "Section__title", [(0, _inferno.createVNode)(1, "span", "Section__titleText", title, 0), (0, _inferno.createVNode)(1, "div", "Section__buttons", buttons, 0)], 4), (0, _inferno.createVNode)(1, "div", "Section__content", [content, children], 0)]
  })));
};

exports.Section = Section;
Section.defaultHooks = _react.pureComponentHooks;

/***/ }),

/***/ "./components/Tabs.js":
/*!****************************!*\
  !*** ./components/Tabs.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.Tab = exports.Tabs = void 0;

var _inferno = __webpack_require__(/*! inferno */ "../../node_modules/inferno/index.esm.js");

var _react = __webpack_require__(/*! common/react */ "../common/react.js");

var _Button = __webpack_require__(/*! ./Button */ "./components/Button.js");

var _Box = __webpack_require__(/*! ./Box */ "./components/Box.js");

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Tabs =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Tabs, _Component);

  function Tabs(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    var tabs = (0, _react.normalizeChildren)(props.children);
    var firstTab = tabs[0];
    var firstTabKey = firstTab && (firstTab.key || firstTab.props.label);
    _this.state = {
      activeTabKey: props.activeTab || firstTabKey || null
    };
    return _this;
  }

  var _proto = Tabs.prototype;

  _proto.render = function () {
    function render() {
      var _this2 = this;

      var state = this.state,
          props = this.props;

      var className = props.className,
          vertical = props.vertical,
          children = props.children,
          rest = _objectWithoutPropertiesLoose(props, ["className", "vertical", "children"]);

      var tabs = (0, _react.normalizeChildren)(children); // Find the active tab

      var activeTabKey = props.activeTab || state.activeTabKey;
      var activeTab = tabs.find(function (tab) {
        var key = tab.key || tab.props.label;
        return key === activeTabKey;
      }); // Retrieve tab content

      var content = null;

      if (activeTab) {
        content = activeTab.props.content || activeTab.props.children;
      } // Get children by calling a wrapper function


      if (typeof content === 'function') {
        content = content(activeTabKey);
      }

      return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _Box.Box, Object.assign({
        "className": (0, _react.classes)(['Tabs', vertical && 'Tabs--vertical', className])
      }, rest, {
        children: [(0, _inferno.createVNode)(1, "div", "Tabs__tabBox", tabs.map(function (tab) {
          var _tab$props = tab.props,
              className = _tab$props.className,
              label = _tab$props.label,
              content = _tab$props.content,
              children = _tab$props.children,
              _onClick = _tab$props.onClick,
              highlight = _tab$props.highlight,
              rest = _objectWithoutPropertiesLoose(_tab$props, ["className", "label", "content", "children", "onClick", "highlight"]);

          var key = tab.key || tab.props.label;
          var active = tab.active || key === activeTabKey;
          return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _Button.Button, Object.assign({
            "className": (0, _react.classes)(['Tabs__tab', active && 'Tabs__tab--active', highlight && !active && 'color-bright-yellow', className]),
            "selected": active,
            "color": "transparent",
            "onClick": function () {
              function onClick(e) {
                _this2.setState({
                  activeTabKey: key
                });

                if (_onClick) {
                  _onClick(e, tab);
                }
              }

              return onClick;
            }()
          }, rest, {
            children: label
          }), key));
        }), 0), (0, _inferno.createVNode)(1, "div", "Tabs__content", content || null, 0)]
      })));
    }

    return render;
  }();

  return Tabs;
}(_inferno.Component);
/**
 * A dummy component, which is used for carrying props for the
 * tab container.
 */


exports.Tabs = Tabs;

var Tab = function Tab(props) {
  return null;
};

exports.Tab = Tab;
Tabs.Tab = Tab;

/***/ }),

/***/ "./components/TitleBar.js":
/*!********************************!*\
  !*** ./components/TitleBar.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.TitleBar = void 0;

var _inferno = __webpack_require__(/*! inferno */ "../../node_modules/inferno/index.esm.js");

var _react = __webpack_require__(/*! common/react */ "../common/react.js");

var _constants = __webpack_require__(/*! ../constants */ "./constants.js");

var _Icon = __webpack_require__(/*! ./Icon */ "./components/Icon.js");

var statusToColor = function statusToColor(status) {
  switch (status) {
    case _constants.UI_INTERACTIVE:
      return 'good';

    case _constants.UI_UPDATE:
      return 'average';

    case _constants.UI_DISABLED:
    default:
      return 'bad';
  }
};

var TitleBar = function TitleBar(props) {
  var className = props.className,
      title = props.title,
      status = props.status,
      fancy = props.fancy,
      onDragStart = props.onDragStart,
      onClose = props.onClose;
  return (0, _inferno.createVNode)(1, "div", (0, _react.classes)('TitleBar', className), [(0, _inferno.createComponentVNode)(2, _Icon.Icon, {
    "className": "TitleBar__statusIcon",
    "color": statusToColor(status),
    "name": "eye"
  }), (0, _inferno.createVNode)(1, "div", "TitleBar__title", title, 0), (0, _inferno.createVNode)(1, "div", "TitleBar__dragZone", null, 1, {
    "onMousedown": function () {
      function onMousedown(e) {
        return fancy && onDragStart(e);
      }

      return onMousedown;
    }()
  }), !!fancy && (0, _inferno.createVNode)(1, "div", "TitleBar__close TitleBar__clickable", null, 1, {
    "onClick": onClose
  })], 0);
};

exports.TitleBar = TitleBar;
TitleBar.defaultHooks = _react.pureComponentHooks;

/***/ }),

/***/ "./components/Toast.js":
/*!*****************************!*\
  !*** ./components/Toast.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.toastReducer = exports.showToast = exports.Toast = void 0;

var _inferno = __webpack_require__(/*! inferno */ "../../node_modules/inferno/index.esm.js");

var _react = __webpack_require__(/*! common/react */ "../common/react.js");

var Toast = function Toast(props) {
  var content = props.content,
      children = props.children;
  return (0, _inferno.createVNode)(1, "div", "Layout__toast", [content, children], 0);
};

exports.Toast = Toast;
Toast.defaultHooks = _react.pureComponentHooks;
var toastTimeout;
/**
 * Shows a toast at the bottom of the screen.
 *
 * Takes the store's dispatch function, and text as a second argument.
 */

var showToast = function showToast(dispatch, text) {
  if (toastTimeout) {
    clearTimeout(toastTimeout);
  }

  toastTimeout = setTimeout(function () {
    toastTimeout = undefined;
    dispatch({
      type: 'hideToast'
    });
  }, 5000);
  dispatch({
    type: 'showToast',
    payload: {
      text: text
    }
  });
};

exports.showToast = showToast;

var toastReducer = function toastReducer(state, action) {
  var type = action.type,
      payload = action.payload;

  if (type === 'showToast') {
    var text = payload.text;
    return Object.assign({}, state, {
      toastText: text
    });
  }

  if (type === 'hideToast') {
    return Object.assign({}, state, {
      toastText: null
    });
  }

  return state;
};

exports.toastReducer = toastReducer;

/***/ }),

/***/ "./components/Tooltip.js":
/*!*******************************!*\
  !*** ./components/Tooltip.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.Tooltip = void 0;

var _inferno = __webpack_require__(/*! inferno */ "../../node_modules/inferno/index.esm.js");

var _react = __webpack_require__(/*! common/react */ "../common/react.js");

var Tooltip = function Tooltip(props) {
  var content = props.content,
      _props$position = props.position,
      position = _props$position === void 0 ? 'bottom' : _props$position;
  return (0, _inferno.createVNode)(1, "div", (0, _react.classes)(['Tooltip', position && 'Tooltip--' + position]), null, 1, {
    "data-tooltip": content
  });
};

exports.Tooltip = Tooltip;

/***/ }),

/***/ "./components/index.js":
/*!*****************************!*\
  !*** ./components/index.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.Tooltip = exports.Toast = exports.TitleBar = exports.Tabs = exports.Section = exports.ProgressBar = exports.NoticeBox = exports.LabeledList = exports.Icon = exports.Flex = exports.Button = exports.Box = exports.AnimatedNumber = void 0;

var _AnimatedNumber = __webpack_require__(/*! ./AnimatedNumber */ "./components/AnimatedNumber.js");

exports.AnimatedNumber = _AnimatedNumber.AnimatedNumber;

var _Box = __webpack_require__(/*! ./Box */ "./components/Box.js");

exports.Box = _Box.Box;

var _Button = __webpack_require__(/*! ./Button */ "./components/Button.js");

exports.Button = _Button.Button;

var _Flex = __webpack_require__(/*! ./Flex */ "./components/Flex.js");

exports.Flex = _Flex.Flex;

var _Icon = __webpack_require__(/*! ./Icon */ "./components/Icon.js");

exports.Icon = _Icon.Icon;

var _LabeledList = __webpack_require__(/*! ./LabeledList */ "./components/LabeledList.js");

exports.LabeledList = _LabeledList.LabeledList;

var _NoticeBox = __webpack_require__(/*! ./NoticeBox */ "./components/NoticeBox.js");

exports.NoticeBox = _NoticeBox.NoticeBox;

var _ProgressBar = __webpack_require__(/*! ./ProgressBar */ "./components/ProgressBar.js");

exports.ProgressBar = _ProgressBar.ProgressBar;

var _Section = __webpack_require__(/*! ./Section */ "./components/Section.js");

exports.Section = _Section.Section;

var _Tabs = __webpack_require__(/*! ./Tabs */ "./components/Tabs.js");

exports.Tabs = _Tabs.Tabs;

var _TitleBar = __webpack_require__(/*! ./TitleBar */ "./components/TitleBar.js");

exports.TitleBar = _TitleBar.TitleBar;

var _Toast = __webpack_require__(/*! ./Toast */ "./components/Toast.js");

exports.Toast = _Toast.Toast;

var _Tooltip = __webpack_require__(/*! ./Tooltip */ "./components/Tooltip.js");

exports.Tooltip = _Tooltip.Tooltip;

/***/ }),

/***/ "./constants.js":
/*!**********************!*\
  !*** ./constants.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.getGasLabel = exports.GAS_LABEL_MAPPING = exports.UI_CLOSE = exports.UI_DISABLED = exports.UI_UPDATE = exports.UI_INTERACTIVE = void 0;
// Constants used in tgui.
// These are mirrored from the BYOND code.
var UI_INTERACTIVE = 2;
exports.UI_INTERACTIVE = UI_INTERACTIVE;
var UI_UPDATE = 1;
exports.UI_UPDATE = UI_UPDATE;
var UI_DISABLED = 0;
exports.UI_DISABLED = UI_DISABLED;
var UI_CLOSE = -1;
exports.UI_CLOSE = UI_CLOSE;
var GAS_LABEL_MAPPING = {
  o2: 'O₂',
  n2: 'N₂',
  co2: 'CO₂',
  water_vapor: 'H₂O',
  n2o: 'N₂O',
  no2: 'NO₂',
  bz: 'BZ'
};
exports.GAS_LABEL_MAPPING = GAS_LABEL_MAPPING;

var getGasLabel = function getGasLabel(name) {
  return GAS_LABEL_MAPPING[name] || name;
};

exports.getGasLabel = getGasLabel;

/***/ }),

/***/ "./drag.js":
/*!*****************!*\
  !*** ./drag.js ***!
  \*****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.resizeEndHandler = exports.resizeMoveHandler = exports.resizeStartHandler = exports.dragEndHandler = exports.dragMoveHandler = exports.dragStartHandler = exports.setupDrag = void 0;

var _byond = __webpack_require__(/*! ./byond */ "./byond.js");

var _logging = __webpack_require__(/*! ./logging */ "./logging.js");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var logger = (0, _logging.createLogger)('drag');
var dragState = {
  dragging: false,
  resizing: false,
  windowRef: undefined,
  screenOffset: {
    x: 0,
    y: 0
  },
  dragPointOffset: {},
  resizeMatrix: {},
  initialWindowSize: {}
};

var setupDrag =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function () {
    function _callee(state) {
      var realPosition;
      return regeneratorRuntime.wrap(function () {
        function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                logger.log('setting up');
                dragState.windowRef = state.config.window; // Remove window borders
                // NOTE: We are currently doing it in the open() tgui module proc, and
                // this bit of code is left here just in case everything goes to shit.
                // if (state.config.fancy) {
                //   winset(state.config.window, 'titlebar', false);
                //   winset(state.config.window, 'can-resize', false);
                // }
                // Calculate offset caused by windows taskbar

                _context.next = 4;
                return (0, _byond.winget)(dragState.windowRef, 'pos');

              case 4:
                realPosition = _context.sent;
                dragState.screenOffset = {
                  x: realPosition.x - window.screenX,
                  y: realPosition.y - window.screenY
                };
                logger.debug('current dragState', dragState);

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }

        return _callee$;
      }(), _callee);
    }

    return _callee;
  }()));

  return function () {
    function setupDrag(_x) {
      return _ref.apply(this, arguments);
    }

    return setupDrag;
  }();
}();

exports.setupDrag = setupDrag;

var dragStartHandler = function dragStartHandler(event) {
  logger.log('drag start');
  dragState.dragging = true;
  dragState.dragPointOffset = {
    x: window.screenX - event.screenX,
    y: window.screenY - event.screenY
  };
  document.addEventListener('mousemove', dragMoveHandler);
  document.addEventListener('mouseup', dragEndHandler);
  dragHandler(event);
};

exports.dragStartHandler = dragStartHandler;

var dragMoveHandler = function dragMoveHandler(event) {
  dragHandler(event);
};

exports.dragMoveHandler = dragMoveHandler;

var dragEndHandler = function dragEndHandler(event) {
  logger.log('drag end');
  dragHandler(event);
  document.removeEventListener('mousemove', dragMoveHandler);
  document.removeEventListener('mouseup', dragEndHandler);
  dragState.dragging = false;
};

exports.dragEndHandler = dragEndHandler;

var dragHandler = function dragHandler(event) {
  if (!dragState.dragging) {
    return;
  }

  event.preventDefault();
  var x = event.screenX + dragState.screenOffset.x + dragState.dragPointOffset.x;
  var y = event.screenY + dragState.screenOffset.y + dragState.dragPointOffset.y;
  (0, _byond.winset)(dragState.windowRef, 'pos', [x, y].join(','));
};

var resizeStartHandler = function resizeStartHandler(x, y) {
  return function (event) {
    logger.log('resize start', [x, y]);
    dragState.resizing = true;
    dragState.resizeMatrix = {
      x: x,
      y: y
    };
    dragState.dragPointOffset = {
      x: window.screenX - event.screenX,
      y: window.screenY - event.screenY
    };
    dragState.initialWindowSize = {
      x: window.innerWidth,
      y: window.innerHeight
    };
    document.addEventListener('mousemove', resizeMoveHandler);
    document.addEventListener('mouseup', resizeEndHandler);
    resizeHandler(event);
  };
};

exports.resizeStartHandler = resizeStartHandler;

var resizeMoveHandler = function resizeMoveHandler(event) {
  resizeHandler(event);
};

exports.resizeMoveHandler = resizeMoveHandler;

var resizeEndHandler = function resizeEndHandler(event) {
  logger.log('resize end');
  resizeHandler(event);
  document.removeEventListener('mousemove', resizeMoveHandler);
  document.removeEventListener('mouseup', resizeEndHandler);
  dragState.resizing = false;
};

exports.resizeEndHandler = resizeEndHandler;

var resizeHandler = function resizeHandler(event) {
  if (!dragState.resizing) {
    return;
  }

  event.preventDefault();
  var x = dragState.initialWindowSize.x + (event.screenX - window.screenX + dragState.dragPointOffset.x + 1) * dragState.resizeMatrix.x;
  var y = dragState.initialWindowSize.y + (event.screenY - window.screenY + dragState.dragPointOffset.y + 1) * dragState.resizeMatrix.y;
  (0, _byond.winset)(dragState.windowRef, 'size', [// Sane window size values
  Math.max(x, 250), Math.max(y, 120)].join(','));
};

/***/ }),

/***/ "./hotkeys.js":
/*!********************!*\
  !*** ./hotkeys.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.hotKeyReducer = exports.hotKeyMiddleware = exports.KEY_EQUAL = exports.KEY_MINUS = exports.KEY_Z = exports.KEY_Y = exports.KEY_X = exports.KEY_W = exports.KEY_V = exports.KEY_U = exports.KEY_T = exports.KEY_S = exports.KEY_R = exports.KEY_Q = exports.KEY_P = exports.KEY_O = exports.KEY_N = exports.KEY_M = exports.KEY_L = exports.KEY_K = exports.KEY_J = exports.KEY_I = exports.KEY_H = exports.KEY_G = exports.KEY_F = exports.KEY_E = exports.KEY_D = exports.KEY_C = exports.KEY_B = exports.KEY_A = exports.KEY_9 = exports.KEY_8 = exports.KEY_7 = exports.KEY_6 = exports.KEY_5 = exports.KEY_4 = exports.KEY_3 = exports.KEY_2 = exports.KEY_1 = exports.KEY_0 = void 0;

var _logging = __webpack_require__(/*! ./logging */ "./logging.js");

var logger = (0, _logging.createLogger)('hotkeys'); // Key codes

var KEY_0 = 48;
exports.KEY_0 = KEY_0;
var KEY_1 = 49;
exports.KEY_1 = KEY_1;
var KEY_2 = 50;
exports.KEY_2 = KEY_2;
var KEY_3 = 51;
exports.KEY_3 = KEY_3;
var KEY_4 = 52;
exports.KEY_4 = KEY_4;
var KEY_5 = 53;
exports.KEY_5 = KEY_5;
var KEY_6 = 54;
exports.KEY_6 = KEY_6;
var KEY_7 = 55;
exports.KEY_7 = KEY_7;
var KEY_8 = 56;
exports.KEY_8 = KEY_8;
var KEY_9 = 57;
exports.KEY_9 = KEY_9;
var KEY_A = 65;
exports.KEY_A = KEY_A;
var KEY_B = 66;
exports.KEY_B = KEY_B;
var KEY_C = 67;
exports.KEY_C = KEY_C;
var KEY_D = 68;
exports.KEY_D = KEY_D;
var KEY_E = 69;
exports.KEY_E = KEY_E;
var KEY_F = 70;
exports.KEY_F = KEY_F;
var KEY_G = 71;
exports.KEY_G = KEY_G;
var KEY_H = 72;
exports.KEY_H = KEY_H;
var KEY_I = 73;
exports.KEY_I = KEY_I;
var KEY_J = 74;
exports.KEY_J = KEY_J;
var KEY_K = 75;
exports.KEY_K = KEY_K;
var KEY_L = 76;
exports.KEY_L = KEY_L;
var KEY_M = 77;
exports.KEY_M = KEY_M;
var KEY_N = 78;
exports.KEY_N = KEY_N;
var KEY_O = 79;
exports.KEY_O = KEY_O;
var KEY_P = 80;
exports.KEY_P = KEY_P;
var KEY_Q = 81;
exports.KEY_Q = KEY_Q;
var KEY_R = 82;
exports.KEY_R = KEY_R;
var KEY_S = 83;
exports.KEY_S = KEY_S;
var KEY_T = 84;
exports.KEY_T = KEY_T;
var KEY_U = 85;
exports.KEY_U = KEY_U;
var KEY_V = 86;
exports.KEY_V = KEY_V;
var KEY_W = 87;
exports.KEY_W = KEY_W;
var KEY_X = 88;
exports.KEY_X = KEY_X;
var KEY_Y = 89;
exports.KEY_Y = KEY_Y;
var KEY_Z = 90;
exports.KEY_Z = KEY_Z;
var KEY_MINUS = 189;
exports.KEY_MINUS = KEY_MINUS;
var KEY_EQUAL = 187;
exports.KEY_EQUAL = KEY_EQUAL;

var makeComboString = function makeComboString(ctrlKey, altKey, keyCode) {
  var parts = [ctrlKey && 'Ctrl', altKey && 'Alt', '[' + keyCode + ']'];
  return parts.filter(function (value) {
    return value;
  }).join('+');
}; // Middleware


var hotKeyMiddleware = function hotKeyMiddleware(store) {
  var dispatch = store.dispatch; // Subscribe for hotkey events

  document.addEventListener('keyup', function (e) {
    var ctrlKey = e.ctrlKey,
        altKey = e.altKey;
    var keyCode = window.event ? e.which : e.keyCode; // Dispatch them as store actions

    if (ctrlKey || altKey) {
      var comboString = makeComboString(ctrlKey, altKey, keyCode);
      logger.log(comboString);
      dispatch({
        type: 'hotKey',
        payload: {
          ctrlKey: ctrlKey,
          altKey: altKey,
          keyCode: keyCode
        }
      });
    }
  }); // Pass through actions (do nothing)

  return function (next) {
    return function (action) {
      return next(action);
    };
  };
}; // Reducer


exports.hotKeyMiddleware = hotKeyMiddleware;

var hotKeyReducer = function hotKeyReducer(state, action) {
  var type = action.type,
      payload = action.payload;

  if (type === 'hotKey') {
    var ctrlKey = payload.ctrlKey,
        altKey = payload.altKey,
        keyCode = payload.keyCode;

    if (ctrlKey && altKey && keyCode === KEY_EQUAL) {
      // Toggle kitchen sink mode
      return Object.assign({}, state, {
        showKitchenSink: !state.showKitchenSink
      });
    }

    return state;
  }

  return state;
};

exports.hotKeyReducer = hotKeyReducer;

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(/*! core-js/modules/es.symbol */ "../../node_modules/core-js/modules/es.symbol.js");

__webpack_require__(/*! core-js/modules/es.symbol.description */ "../../node_modules/core-js/modules/es.symbol.description.js");

__webpack_require__(/*! core-js/modules/es.symbol.async-iterator */ "../../node_modules/core-js/modules/es.symbol.async-iterator.js");

__webpack_require__(/*! core-js/modules/es.symbol.has-instance */ "../../node_modules/core-js/modules/es.symbol.has-instance.js");

__webpack_require__(/*! core-js/modules/es.symbol.is-concat-spreadable */ "../../node_modules/core-js/modules/es.symbol.is-concat-spreadable.js");

__webpack_require__(/*! core-js/modules/es.symbol.iterator */ "../../node_modules/core-js/modules/es.symbol.iterator.js");

__webpack_require__(/*! core-js/modules/es.symbol.match */ "../../node_modules/core-js/modules/es.symbol.match.js");

__webpack_require__(/*! core-js/modules/es.symbol.replace */ "../../node_modules/core-js/modules/es.symbol.replace.js");

__webpack_require__(/*! core-js/modules/es.symbol.search */ "../../node_modules/core-js/modules/es.symbol.search.js");

__webpack_require__(/*! core-js/modules/es.symbol.species */ "../../node_modules/core-js/modules/es.symbol.species.js");

__webpack_require__(/*! core-js/modules/es.symbol.split */ "../../node_modules/core-js/modules/es.symbol.split.js");

__webpack_require__(/*! core-js/modules/es.symbol.to-primitive */ "../../node_modules/core-js/modules/es.symbol.to-primitive.js");

__webpack_require__(/*! core-js/modules/es.symbol.to-string-tag */ "../../node_modules/core-js/modules/es.symbol.to-string-tag.js");

__webpack_require__(/*! core-js/modules/es.symbol.unscopables */ "../../node_modules/core-js/modules/es.symbol.unscopables.js");

__webpack_require__(/*! core-js/modules/es.array.concat */ "../../node_modules/core-js/modules/es.array.concat.js");

__webpack_require__(/*! core-js/modules/es.array.copy-within */ "../../node_modules/core-js/modules/es.array.copy-within.js");

__webpack_require__(/*! core-js/modules/es.array.every */ "../../node_modules/core-js/modules/es.array.every.js");

__webpack_require__(/*! core-js/modules/es.array.fill */ "../../node_modules/core-js/modules/es.array.fill.js");

__webpack_require__(/*! core-js/modules/es.array.filter */ "../../node_modules/core-js/modules/es.array.filter.js");

__webpack_require__(/*! core-js/modules/es.array.find */ "../../node_modules/core-js/modules/es.array.find.js");

__webpack_require__(/*! core-js/modules/es.array.find-index */ "../../node_modules/core-js/modules/es.array.find-index.js");

__webpack_require__(/*! core-js/modules/es.array.flat */ "../../node_modules/core-js/modules/es.array.flat.js");

__webpack_require__(/*! core-js/modules/es.array.flat-map */ "../../node_modules/core-js/modules/es.array.flat-map.js");

__webpack_require__(/*! core-js/modules/es.array.for-each */ "../../node_modules/core-js/modules/es.array.for-each.js");

__webpack_require__(/*! core-js/modules/es.array.from */ "../../node_modules/core-js/modules/es.array.from.js");

__webpack_require__(/*! core-js/modules/es.array.includes */ "../../node_modules/core-js/modules/es.array.includes.js");

__webpack_require__(/*! core-js/modules/es.array.index-of */ "../../node_modules/core-js/modules/es.array.index-of.js");

__webpack_require__(/*! core-js/modules/es.array.is-array */ "../../node_modules/core-js/modules/es.array.is-array.js");

__webpack_require__(/*! core-js/modules/es.array.iterator */ "../../node_modules/core-js/modules/es.array.iterator.js");

__webpack_require__(/*! core-js/modules/es.array.join */ "../../node_modules/core-js/modules/es.array.join.js");

__webpack_require__(/*! core-js/modules/es.array.last-index-of */ "../../node_modules/core-js/modules/es.array.last-index-of.js");

__webpack_require__(/*! core-js/modules/es.array.map */ "../../node_modules/core-js/modules/es.array.map.js");

__webpack_require__(/*! core-js/modules/es.array.of */ "../../node_modules/core-js/modules/es.array.of.js");

__webpack_require__(/*! core-js/modules/es.array.reduce */ "../../node_modules/core-js/modules/es.array.reduce.js");

__webpack_require__(/*! core-js/modules/es.array.reduce-right */ "../../node_modules/core-js/modules/es.array.reduce-right.js");

__webpack_require__(/*! core-js/modules/es.array.slice */ "../../node_modules/core-js/modules/es.array.slice.js");

__webpack_require__(/*! core-js/modules/es.array.some */ "../../node_modules/core-js/modules/es.array.some.js");

__webpack_require__(/*! core-js/modules/es.array.sort */ "../../node_modules/core-js/modules/es.array.sort.js");

__webpack_require__(/*! core-js/modules/es.array.species */ "../../node_modules/core-js/modules/es.array.species.js");

__webpack_require__(/*! core-js/modules/es.array.splice */ "../../node_modules/core-js/modules/es.array.splice.js");

__webpack_require__(/*! core-js/modules/es.array.unscopables.flat */ "../../node_modules/core-js/modules/es.array.unscopables.flat.js");

__webpack_require__(/*! core-js/modules/es.array.unscopables.flat-map */ "../../node_modules/core-js/modules/es.array.unscopables.flat-map.js");

__webpack_require__(/*! core-js/modules/es.array-buffer.constructor */ "../../node_modules/core-js/modules/es.array-buffer.constructor.js");

__webpack_require__(/*! core-js/modules/es.array-buffer.is-view */ "../../node_modules/core-js/modules/es.array-buffer.is-view.js");

__webpack_require__(/*! core-js/modules/es.array-buffer.slice */ "../../node_modules/core-js/modules/es.array-buffer.slice.js");

__webpack_require__(/*! core-js/modules/es.data-view */ "../../node_modules/core-js/modules/es.data-view.js");

__webpack_require__(/*! core-js/modules/es.date.now */ "../../node_modules/core-js/modules/es.date.now.js");

__webpack_require__(/*! core-js/modules/es.date.to-iso-string */ "../../node_modules/core-js/modules/es.date.to-iso-string.js");

__webpack_require__(/*! core-js/modules/es.date.to-json */ "../../node_modules/core-js/modules/es.date.to-json.js");

__webpack_require__(/*! core-js/modules/es.date.to-primitive */ "../../node_modules/core-js/modules/es.date.to-primitive.js");

__webpack_require__(/*! core-js/modules/es.date.to-string */ "../../node_modules/core-js/modules/es.date.to-string.js");

__webpack_require__(/*! core-js/modules/es.function.bind */ "../../node_modules/core-js/modules/es.function.bind.js");

__webpack_require__(/*! core-js/modules/es.function.has-instance */ "../../node_modules/core-js/modules/es.function.has-instance.js");

__webpack_require__(/*! core-js/modules/es.function.name */ "../../node_modules/core-js/modules/es.function.name.js");

__webpack_require__(/*! core-js/modules/es.json.to-string-tag */ "../../node_modules/core-js/modules/es.json.to-string-tag.js");

__webpack_require__(/*! core-js/modules/es.map */ "../../node_modules/core-js/modules/es.map.js");

__webpack_require__(/*! core-js/modules/es.math.acosh */ "../../node_modules/core-js/modules/es.math.acosh.js");

__webpack_require__(/*! core-js/modules/es.math.asinh */ "../../node_modules/core-js/modules/es.math.asinh.js");

__webpack_require__(/*! core-js/modules/es.math.atanh */ "../../node_modules/core-js/modules/es.math.atanh.js");

__webpack_require__(/*! core-js/modules/es.math.cbrt */ "../../node_modules/core-js/modules/es.math.cbrt.js");

__webpack_require__(/*! core-js/modules/es.math.clz32 */ "../../node_modules/core-js/modules/es.math.clz32.js");

__webpack_require__(/*! core-js/modules/es.math.cosh */ "../../node_modules/core-js/modules/es.math.cosh.js");

__webpack_require__(/*! core-js/modules/es.math.expm1 */ "../../node_modules/core-js/modules/es.math.expm1.js");

__webpack_require__(/*! core-js/modules/es.math.fround */ "../../node_modules/core-js/modules/es.math.fround.js");

__webpack_require__(/*! core-js/modules/es.math.hypot */ "../../node_modules/core-js/modules/es.math.hypot.js");

__webpack_require__(/*! core-js/modules/es.math.imul */ "../../node_modules/core-js/modules/es.math.imul.js");

__webpack_require__(/*! core-js/modules/es.math.log10 */ "../../node_modules/core-js/modules/es.math.log10.js");

__webpack_require__(/*! core-js/modules/es.math.log1p */ "../../node_modules/core-js/modules/es.math.log1p.js");

__webpack_require__(/*! core-js/modules/es.math.log2 */ "../../node_modules/core-js/modules/es.math.log2.js");

__webpack_require__(/*! core-js/modules/es.math.sign */ "../../node_modules/core-js/modules/es.math.sign.js");

__webpack_require__(/*! core-js/modules/es.math.sinh */ "../../node_modules/core-js/modules/es.math.sinh.js");

__webpack_require__(/*! core-js/modules/es.math.tanh */ "../../node_modules/core-js/modules/es.math.tanh.js");

__webpack_require__(/*! core-js/modules/es.math.to-string-tag */ "../../node_modules/core-js/modules/es.math.to-string-tag.js");

__webpack_require__(/*! core-js/modules/es.math.trunc */ "../../node_modules/core-js/modules/es.math.trunc.js");

__webpack_require__(/*! core-js/modules/es.number.constructor */ "../../node_modules/core-js/modules/es.number.constructor.js");

__webpack_require__(/*! core-js/modules/es.number.epsilon */ "../../node_modules/core-js/modules/es.number.epsilon.js");

__webpack_require__(/*! core-js/modules/es.number.is-finite */ "../../node_modules/core-js/modules/es.number.is-finite.js");

__webpack_require__(/*! core-js/modules/es.number.is-integer */ "../../node_modules/core-js/modules/es.number.is-integer.js");

__webpack_require__(/*! core-js/modules/es.number.is-nan */ "../../node_modules/core-js/modules/es.number.is-nan.js");

__webpack_require__(/*! core-js/modules/es.number.is-safe-integer */ "../../node_modules/core-js/modules/es.number.is-safe-integer.js");

__webpack_require__(/*! core-js/modules/es.number.max-safe-integer */ "../../node_modules/core-js/modules/es.number.max-safe-integer.js");

__webpack_require__(/*! core-js/modules/es.number.min-safe-integer */ "../../node_modules/core-js/modules/es.number.min-safe-integer.js");

__webpack_require__(/*! core-js/modules/es.number.parse-float */ "../../node_modules/core-js/modules/es.number.parse-float.js");

__webpack_require__(/*! core-js/modules/es.number.parse-int */ "../../node_modules/core-js/modules/es.number.parse-int.js");

__webpack_require__(/*! core-js/modules/es.number.to-fixed */ "../../node_modules/core-js/modules/es.number.to-fixed.js");

__webpack_require__(/*! core-js/modules/es.object.assign */ "../../node_modules/core-js/modules/es.object.assign.js");

__webpack_require__(/*! core-js/modules/es.object.create */ "../../node_modules/core-js/modules/es.object.create.js");

__webpack_require__(/*! core-js/modules/es.object.define-getter */ "../../node_modules/core-js/modules/es.object.define-getter.js");

__webpack_require__(/*! core-js/modules/es.object.define-properties */ "../../node_modules/core-js/modules/es.object.define-properties.js");

__webpack_require__(/*! core-js/modules/es.object.define-property */ "../../node_modules/core-js/modules/es.object.define-property.js");

__webpack_require__(/*! core-js/modules/es.object.define-setter */ "../../node_modules/core-js/modules/es.object.define-setter.js");

__webpack_require__(/*! core-js/modules/es.object.entries */ "../../node_modules/core-js/modules/es.object.entries.js");

__webpack_require__(/*! core-js/modules/es.object.freeze */ "../../node_modules/core-js/modules/es.object.freeze.js");

__webpack_require__(/*! core-js/modules/es.object.from-entries */ "../../node_modules/core-js/modules/es.object.from-entries.js");

__webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptor */ "../../node_modules/core-js/modules/es.object.get-own-property-descriptor.js");

__webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptors */ "../../node_modules/core-js/modules/es.object.get-own-property-descriptors.js");

__webpack_require__(/*! core-js/modules/es.object.get-own-property-names */ "../../node_modules/core-js/modules/es.object.get-own-property-names.js");

__webpack_require__(/*! core-js/modules/es.object.get-prototype-of */ "../../node_modules/core-js/modules/es.object.get-prototype-of.js");

__webpack_require__(/*! core-js/modules/es.object.is */ "../../node_modules/core-js/modules/es.object.is.js");

__webpack_require__(/*! core-js/modules/es.object.is-extensible */ "../../node_modules/core-js/modules/es.object.is-extensible.js");

__webpack_require__(/*! core-js/modules/es.object.is-frozen */ "../../node_modules/core-js/modules/es.object.is-frozen.js");

__webpack_require__(/*! core-js/modules/es.object.is-sealed */ "../../node_modules/core-js/modules/es.object.is-sealed.js");

__webpack_require__(/*! core-js/modules/es.object.keys */ "../../node_modules/core-js/modules/es.object.keys.js");

__webpack_require__(/*! core-js/modules/es.object.lookup-getter */ "../../node_modules/core-js/modules/es.object.lookup-getter.js");

__webpack_require__(/*! core-js/modules/es.object.lookup-setter */ "../../node_modules/core-js/modules/es.object.lookup-setter.js");

__webpack_require__(/*! core-js/modules/es.object.prevent-extensions */ "../../node_modules/core-js/modules/es.object.prevent-extensions.js");

__webpack_require__(/*! core-js/modules/es.object.seal */ "../../node_modules/core-js/modules/es.object.seal.js");

__webpack_require__(/*! core-js/modules/es.object.set-prototype-of */ "../../node_modules/core-js/modules/es.object.set-prototype-of.js");

__webpack_require__(/*! core-js/modules/es.object.to-string */ "../../node_modules/core-js/modules/es.object.to-string.js");

__webpack_require__(/*! core-js/modules/es.object.values */ "../../node_modules/core-js/modules/es.object.values.js");

__webpack_require__(/*! core-js/modules/es.parse-int */ "../../node_modules/core-js/modules/es.parse-int.js");

__webpack_require__(/*! core-js/modules/es.promise */ "../../node_modules/core-js/modules/es.promise.js");

__webpack_require__(/*! core-js/modules/es.promise.finally */ "../../node_modules/core-js/modules/es.promise.finally.js");

__webpack_require__(/*! core-js/modules/es.reflect.apply */ "../../node_modules/core-js/modules/es.reflect.apply.js");

__webpack_require__(/*! core-js/modules/es.reflect.construct */ "../../node_modules/core-js/modules/es.reflect.construct.js");

__webpack_require__(/*! core-js/modules/es.reflect.define-property */ "../../node_modules/core-js/modules/es.reflect.define-property.js");

__webpack_require__(/*! core-js/modules/es.reflect.delete-property */ "../../node_modules/core-js/modules/es.reflect.delete-property.js");

__webpack_require__(/*! core-js/modules/es.reflect.get */ "../../node_modules/core-js/modules/es.reflect.get.js");

__webpack_require__(/*! core-js/modules/es.reflect.get-own-property-descriptor */ "../../node_modules/core-js/modules/es.reflect.get-own-property-descriptor.js");

__webpack_require__(/*! core-js/modules/es.reflect.get-prototype-of */ "../../node_modules/core-js/modules/es.reflect.get-prototype-of.js");

__webpack_require__(/*! core-js/modules/es.reflect.has */ "../../node_modules/core-js/modules/es.reflect.has.js");

__webpack_require__(/*! core-js/modules/es.reflect.is-extensible */ "../../node_modules/core-js/modules/es.reflect.is-extensible.js");

__webpack_require__(/*! core-js/modules/es.reflect.own-keys */ "../../node_modules/core-js/modules/es.reflect.own-keys.js");

__webpack_require__(/*! core-js/modules/es.reflect.prevent-extensions */ "../../node_modules/core-js/modules/es.reflect.prevent-extensions.js");

__webpack_require__(/*! core-js/modules/es.reflect.set */ "../../node_modules/core-js/modules/es.reflect.set.js");

__webpack_require__(/*! core-js/modules/es.reflect.set-prototype-of */ "../../node_modules/core-js/modules/es.reflect.set-prototype-of.js");

__webpack_require__(/*! core-js/modules/es.regexp.constructor */ "../../node_modules/core-js/modules/es.regexp.constructor.js");

__webpack_require__(/*! core-js/modules/es.regexp.exec */ "../../node_modules/core-js/modules/es.regexp.exec.js");

__webpack_require__(/*! core-js/modules/es.regexp.flags */ "../../node_modules/core-js/modules/es.regexp.flags.js");

__webpack_require__(/*! core-js/modules/es.regexp.to-string */ "../../node_modules/core-js/modules/es.regexp.to-string.js");

__webpack_require__(/*! core-js/modules/es.set */ "../../node_modules/core-js/modules/es.set.js");

__webpack_require__(/*! core-js/modules/es.string.code-point-at */ "../../node_modules/core-js/modules/es.string.code-point-at.js");

__webpack_require__(/*! core-js/modules/es.string.ends-with */ "../../node_modules/core-js/modules/es.string.ends-with.js");

__webpack_require__(/*! core-js/modules/es.string.from-code-point */ "../../node_modules/core-js/modules/es.string.from-code-point.js");

__webpack_require__(/*! core-js/modules/es.string.includes */ "../../node_modules/core-js/modules/es.string.includes.js");

__webpack_require__(/*! core-js/modules/es.string.iterator */ "../../node_modules/core-js/modules/es.string.iterator.js");

__webpack_require__(/*! core-js/modules/es.string.match */ "../../node_modules/core-js/modules/es.string.match.js");

__webpack_require__(/*! core-js/modules/es.string.pad-end */ "../../node_modules/core-js/modules/es.string.pad-end.js");

__webpack_require__(/*! core-js/modules/es.string.pad-start */ "../../node_modules/core-js/modules/es.string.pad-start.js");

__webpack_require__(/*! core-js/modules/es.string.raw */ "../../node_modules/core-js/modules/es.string.raw.js");

__webpack_require__(/*! core-js/modules/es.string.repeat */ "../../node_modules/core-js/modules/es.string.repeat.js");

__webpack_require__(/*! core-js/modules/es.string.replace */ "../../node_modules/core-js/modules/es.string.replace.js");

__webpack_require__(/*! core-js/modules/es.string.search */ "../../node_modules/core-js/modules/es.string.search.js");

__webpack_require__(/*! core-js/modules/es.string.split */ "../../node_modules/core-js/modules/es.string.split.js");

__webpack_require__(/*! core-js/modules/es.string.starts-with */ "../../node_modules/core-js/modules/es.string.starts-with.js");

__webpack_require__(/*! core-js/modules/es.string.trim */ "../../node_modules/core-js/modules/es.string.trim.js");

__webpack_require__(/*! core-js/modules/es.string.trim-end */ "../../node_modules/core-js/modules/es.string.trim-end.js");

__webpack_require__(/*! core-js/modules/es.string.trim-start */ "../../node_modules/core-js/modules/es.string.trim-start.js");

__webpack_require__(/*! core-js/modules/es.string.anchor */ "../../node_modules/core-js/modules/es.string.anchor.js");

__webpack_require__(/*! core-js/modules/es.string.big */ "../../node_modules/core-js/modules/es.string.big.js");

__webpack_require__(/*! core-js/modules/es.string.blink */ "../../node_modules/core-js/modules/es.string.blink.js");

__webpack_require__(/*! core-js/modules/es.string.bold */ "../../node_modules/core-js/modules/es.string.bold.js");

__webpack_require__(/*! core-js/modules/es.string.fixed */ "../../node_modules/core-js/modules/es.string.fixed.js");

__webpack_require__(/*! core-js/modules/es.string.fontcolor */ "../../node_modules/core-js/modules/es.string.fontcolor.js");

__webpack_require__(/*! core-js/modules/es.string.fontsize */ "../../node_modules/core-js/modules/es.string.fontsize.js");

__webpack_require__(/*! core-js/modules/es.string.italics */ "../../node_modules/core-js/modules/es.string.italics.js");

__webpack_require__(/*! core-js/modules/es.string.link */ "../../node_modules/core-js/modules/es.string.link.js");

__webpack_require__(/*! core-js/modules/es.string.small */ "../../node_modules/core-js/modules/es.string.small.js");

__webpack_require__(/*! core-js/modules/es.string.strike */ "../../node_modules/core-js/modules/es.string.strike.js");

__webpack_require__(/*! core-js/modules/es.string.sub */ "../../node_modules/core-js/modules/es.string.sub.js");

__webpack_require__(/*! core-js/modules/es.string.sup */ "../../node_modules/core-js/modules/es.string.sup.js");

__webpack_require__(/*! core-js/modules/es.typed-array.float32-array */ "../../node_modules/core-js/modules/es.typed-array.float32-array.js");

__webpack_require__(/*! core-js/modules/es.typed-array.float64-array */ "../../node_modules/core-js/modules/es.typed-array.float64-array.js");

__webpack_require__(/*! core-js/modules/es.typed-array.int8-array */ "../../node_modules/core-js/modules/es.typed-array.int8-array.js");

__webpack_require__(/*! core-js/modules/es.typed-array.int16-array */ "../../node_modules/core-js/modules/es.typed-array.int16-array.js");

__webpack_require__(/*! core-js/modules/es.typed-array.int32-array */ "../../node_modules/core-js/modules/es.typed-array.int32-array.js");

__webpack_require__(/*! core-js/modules/es.typed-array.uint8-array */ "../../node_modules/core-js/modules/es.typed-array.uint8-array.js");

__webpack_require__(/*! core-js/modules/es.typed-array.uint8-clamped-array */ "../../node_modules/core-js/modules/es.typed-array.uint8-clamped-array.js");

__webpack_require__(/*! core-js/modules/es.typed-array.uint16-array */ "../../node_modules/core-js/modules/es.typed-array.uint16-array.js");

__webpack_require__(/*! core-js/modules/es.typed-array.uint32-array */ "../../node_modules/core-js/modules/es.typed-array.uint32-array.js");

__webpack_require__(/*! core-js/modules/es.typed-array.copy-within */ "../../node_modules/core-js/modules/es.typed-array.copy-within.js");

__webpack_require__(/*! core-js/modules/es.typed-array.every */ "../../node_modules/core-js/modules/es.typed-array.every.js");

__webpack_require__(/*! core-js/modules/es.typed-array.fill */ "../../node_modules/core-js/modules/es.typed-array.fill.js");

__webpack_require__(/*! core-js/modules/es.typed-array.filter */ "../../node_modules/core-js/modules/es.typed-array.filter.js");

__webpack_require__(/*! core-js/modules/es.typed-array.find */ "../../node_modules/core-js/modules/es.typed-array.find.js");

__webpack_require__(/*! core-js/modules/es.typed-array.find-index */ "../../node_modules/core-js/modules/es.typed-array.find-index.js");

__webpack_require__(/*! core-js/modules/es.typed-array.for-each */ "../../node_modules/core-js/modules/es.typed-array.for-each.js");

__webpack_require__(/*! core-js/modules/es.typed-array.from */ "../../node_modules/core-js/modules/es.typed-array.from.js");

__webpack_require__(/*! core-js/modules/es.typed-array.includes */ "../../node_modules/core-js/modules/es.typed-array.includes.js");

__webpack_require__(/*! core-js/modules/es.typed-array.index-of */ "../../node_modules/core-js/modules/es.typed-array.index-of.js");

__webpack_require__(/*! core-js/modules/es.typed-array.iterator */ "../../node_modules/core-js/modules/es.typed-array.iterator.js");

__webpack_require__(/*! core-js/modules/es.typed-array.join */ "../../node_modules/core-js/modules/es.typed-array.join.js");

__webpack_require__(/*! core-js/modules/es.typed-array.last-index-of */ "../../node_modules/core-js/modules/es.typed-array.last-index-of.js");

__webpack_require__(/*! core-js/modules/es.typed-array.map */ "../../node_modules/core-js/modules/es.typed-array.map.js");

__webpack_require__(/*! core-js/modules/es.typed-array.of */ "../../node_modules/core-js/modules/es.typed-array.of.js");

__webpack_require__(/*! core-js/modules/es.typed-array.reduce */ "../../node_modules/core-js/modules/es.typed-array.reduce.js");

__webpack_require__(/*! core-js/modules/es.typed-array.reduce-right */ "../../node_modules/core-js/modules/es.typed-array.reduce-right.js");

__webpack_require__(/*! core-js/modules/es.typed-array.reverse */ "../../node_modules/core-js/modules/es.typed-array.reverse.js");

__webpack_require__(/*! core-js/modules/es.typed-array.set */ "../../node_modules/core-js/modules/es.typed-array.set.js");

__webpack_require__(/*! core-js/modules/es.typed-array.slice */ "../../node_modules/core-js/modules/es.typed-array.slice.js");

__webpack_require__(/*! core-js/modules/es.typed-array.some */ "../../node_modules/core-js/modules/es.typed-array.some.js");

__webpack_require__(/*! core-js/modules/es.typed-array.sort */ "../../node_modules/core-js/modules/es.typed-array.sort.js");

__webpack_require__(/*! core-js/modules/es.typed-array.subarray */ "../../node_modules/core-js/modules/es.typed-array.subarray.js");

__webpack_require__(/*! core-js/modules/es.typed-array.to-locale-string */ "../../node_modules/core-js/modules/es.typed-array.to-locale-string.js");

__webpack_require__(/*! core-js/modules/es.typed-array.to-string */ "../../node_modules/core-js/modules/es.typed-array.to-string.js");

__webpack_require__(/*! core-js/modules/es.weak-map */ "../../node_modules/core-js/modules/es.weak-map.js");

__webpack_require__(/*! core-js/modules/es.weak-set */ "../../node_modules/core-js/modules/es.weak-set.js");

__webpack_require__(/*! core-js/modules/web.dom-collections.for-each */ "../../node_modules/core-js/modules/web.dom-collections.for-each.js");

__webpack_require__(/*! core-js/modules/web.dom-collections.iterator */ "../../node_modules/core-js/modules/web.dom-collections.iterator.js");

__webpack_require__(/*! core-js/modules/web.immediate */ "../../node_modules/core-js/modules/web.immediate.js");

__webpack_require__(/*! core-js/modules/web.queue-microtask */ "../../node_modules/core-js/modules/web.queue-microtask.js");

__webpack_require__(/*! core-js/modules/web.timers */ "../../node_modules/core-js/modules/web.timers.js");

__webpack_require__(/*! core-js/modules/web.url */ "../../node_modules/core-js/modules/web.url.js");

__webpack_require__(/*! core-js/modules/web.url.to-json */ "../../node_modules/core-js/modules/web.url.to-json.js");

__webpack_require__(/*! core-js/modules/web.url-search-params */ "../../node_modules/core-js/modules/web.url-search-params.js");

var _inferno = __webpack_require__(/*! inferno */ "../../node_modules/inferno/index.esm.js");

__webpack_require__(/*! regenerator-runtime/runtime */ "../../node_modules/regenerator-runtime/runtime.js");

__webpack_require__(/*! ./polyfills */ "./polyfills.js");

var _fgLoadcss = __webpack_require__(/*! fg-loadcss */ "../../node_modules/fg-loadcss/src/loadCSS.js");

var _client = __webpack_require__(/*! tgui-dev-server/link/client */ "../tgui-dev-server/link/client.js");

var _backend = __webpack_require__(/*! ./backend */ "./backend.js");

var _byond = __webpack_require__(/*! ./byond */ "./byond.js");

var _drag = __webpack_require__(/*! ./drag */ "./drag.js");

var _logging = __webpack_require__(/*! ./logging */ "./logging.js");

var _routes = __webpack_require__(/*! ./routes */ "./routes.js");

var _store = __webpack_require__(/*! ./store */ "./store.js");

var logger = (0, _logging.createLogger)();
var store = (0, _store.createStore)();
var reactRoot = document.getElementById('react-root');
var initialRender = true;
var handedOverToOldTgui = false;

var renderLayout = function renderLayout() {
  // Short-circuit the renderer
  if (handedOverToOldTgui) {
    return;
  } // Mark the beginning of the render


  var startedAt;

  if (true) {
    startedAt = Date.now();
  }

  try {
    var state = store.getState(); // Initial render setup

    if (initialRender) {
      initialRender = false; // ----- Old TGUI chain-loader: begin -----

      var route = (0, _routes.getRoute)(state); // Route was not found, load old TGUI

      if (!route) {
        logger.info('loading old tgui'); // Short-circuit the renderer

        handedOverToOldTgui = true; // Unsubscribe from updates

        window.update = window.initialize = function () {}; // Load old TGUI using redirection method for IE8


        if (_byond.tridentVersion <= 4) {
          setTimeout(function () {
            location.href = 'tgui-fallback.html?ref=' + ref;
          }, 10);
          return;
        } // Inject current state into the data holder


        var holder = document.getElementById('data');
        holder.textContent = JSON.stringify(state); // Load old TGUI by injecting new scripts

        (0, _fgLoadcss.loadCSS)('v4shim.css');
        (0, _fgLoadcss.loadCSS)('tgui.css');
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'tgui.js';
        head.appendChild(script); // Bail

        return;
      } // ----- Old TGUI chain-loader: end -----


      logger.log('initial render', state); // Setup dragging

      (0, _drag.setupDrag)(state);
    } // Start rendering


    var _require = __webpack_require__(/*! ./layout */ "./layout.js"),
        Layout = _require.Layout;

    var element = (0, _inferno.createComponentVNode)(2, Layout, {
      "state": state,
      "dispatch": store.dispatch
    });
    (0, _inferno.render)(element, reactRoot);
  } catch (err) {
    logger.error('rendering error', err.stack || String(err));
  } // Report rendering time


  if (true) {
    var finishedAt = Date.now();
    var diff = finishedAt - startedAt;
    var diffFrames = (diff / 16.6667).toFixed(2);
    logger.debug("rendered in " + diff + "ms (" + diffFrames + " frames)");

    if (window.__inception__) {
      var _diff = finishedAt - window.__inception__;

      var _diffFrames = (_diff / 16.6667).toFixed(2);

      logger.log("fully loaded in " + _diff + "ms (" + _diffFrames + " frames)");
      window.__inception__ = null;
    }
  }
}; // Parse JSON and report all abnormal JSON strings coming from BYOND


var parseStateJson = function parseStateJson(json) {
  try {
    return JSON.parse(json);
  } catch (err) {
    logger.error('JSON parsing error: ' + err.message + '\n' + json);
    throw err;
  }
};

var setupApp = function setupApp() {
  // Find data in the page, load inlined state.
  var holder = document.getElementById('data');
  var ref = holder.getAttribute('data-ref'); // Initialize logger

  (0, _logging.setLoggerRef)(ref); // Subscribe for state updates

  store.subscribe(function () {
    renderLayout();
  }); // Subscribe for bankend updates

  window.update = window.initialize = function (stateJson) {
    var state = parseStateJson(stateJson); // Backend update dispatches a store action

    store.dispatch((0, _backend.backendUpdate)(state));
  }; // Enable hot module reloading


  if (true) {
    (0, _client.setupHotReloading)();
    module.hot.accept([/*! ./layout */ "./layout.js", /*! ./routes */ "./routes.js"], function () {
      renderLayout();
    });
  } // Initialize


  (0, _byond.act)(ref, 'tgui:initialize'); // Dynamically load font-awesome from browser's cache

  (0, _fgLoadcss.loadCSS)('font-awesome.css');
}; // Wait for DOM to properly load on IE8


if (_byond.tridentVersion <= 4) {
  if (document.readyState !== 'loading') {
    setupApp();
  } else {
    document.addEventListener('DOMContentLoaded', setupApp);
  }
} // Load right away on all other browsers
else {
    setupApp();
  }

/***/ }),

/***/ "./interfaces/AirlockElectronics.js":
/*!******************************************!*\
  !*** ./interfaces/AirlockElectronics.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.AirlockElectronics = void 0;

var _inferno = __webpack_require__(/*! inferno */ "../../node_modules/inferno/index.esm.js");

var _byond = __webpack_require__(/*! ../byond */ "./byond.js");

var _components = __webpack_require__(/*! ../components */ "./components/index.js");

var AirlockElectronics = function AirlockElectronics(props) {
  var state = props.state;
  var config = state.config,
      data = state.data;
  var ref = config.ref;
  var regions = data.regions || [];
  var diffMap = {
    0: {
      icon: 'times-circle'
    },
    1: {
      icon: 'stop-circle'
    },
    2: {
      icon: 'check-circle'
    }
  };

  var checkAccessIcon = function checkAccessIcon(accesses) {
    var oneAccess = false;
    var oneInaccess = false;
    accesses.forEach(function (element) {
      if (element.req) {
        oneAccess = true;
      } else {
        oneInaccess = true;
      }
    });

    if (!oneAccess && oneInaccess) {
      return 0;
    } else if (oneAccess && oneInaccess) {
      return 1;
    } else {
      return 2;
    }
  };

  return (0, _inferno.createFragment)([(0, _inferno.createComponentVNode)(2, _components.Section, {
    "title": "Main",
    children: (0, _inferno.createComponentVNode)(2, _components.LabeledList, {
      children: (0, _inferno.createComponentVNode)(2, _components.LabeledList.Item, {
        "label": "Access Required",
        children: (0, _inferno.createComponentVNode)(2, _components.Button, {
          "icon": data.oneAccess ? 'unlock' : 'lock',
          "content": data.oneAccess ? 'One' : 'All',
          "onClick": function () {
            function onClick() {
              return (0, _byond.act)(ref, 'one_access');
            }

            return onClick;
          }()
        })
      })
    })
  }), (0, _inferno.createComponentVNode)(2, _components.Section, {
    "title": "Access",
    children: (0, _inferno.createComponentVNode)(2, _components.Box, {
      "height": "261px",
      children: (0, _inferno.createComponentVNode)(2, _components.Tabs, {
        "vertical": true,
        children: regions.map(function (region) {
          var name = region.name;
          var accesses = region.accesses || [];
          var icon = diffMap[checkAccessIcon(accesses)].icon;
          return (0, _inferno.createComponentVNode)(2, _components.Tabs.Tab, {
            "icon": icon,
            "label": name,
            children: function () {
              function children() {
                return accesses.map(function (access) {
                  return (0, _inferno.createComponentVNode)(2, _components.Box, {
                    children: (0, _inferno.createComponentVNode)(2, _components.Button, {
                      "icon": access.req ? 'check-square-o' : 'square-o',
                      "content": access.name,
                      "selected": access.req,
                      "onClick": function () {
                        function onClick() {
                          return (0, _byond.act)(ref, 'set', {
                            access: access.id
                          });
                        }

                        return onClick;
                      }()
                    })
                  }, access.id);
                });
              }

              return children;
            }()
          }, name);
        })
      })
    })
  })], 4);
};

exports.AirlockElectronics = AirlockElectronics;

/***/ }),

/***/ "./interfaces/BrigTimer.js":
/*!*********************************!*\
  !*** ./interfaces/BrigTimer.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.BrigTimer = void 0;

var _inferno = __webpack_require__(/*! inferno */ "../../node_modules/inferno/index.esm.js");

var _byond = __webpack_require__(/*! ../byond */ "./byond.js");

var _components = __webpack_require__(/*! ../components */ "./components/index.js");

var _logging = __webpack_require__(/*! ../logging */ "./logging.js");

var logger = (0, _logging.createLogger)('BrigTimer');

var BrigTimer = function BrigTimer(props) {
  var state = props.state;
  var config = state.config,
      data = state.data;
  var ref = config.ref;
  return (0, _inferno.createComponentVNode)(2, _components.Section, {
    "title": "Cell Timer",
    "buttons": (0, _inferno.createFragment)([(0, _inferno.createComponentVNode)(2, _components.Button, {
      "icon": "clock-o",
      "content": data.timing ? 'Stop' : 'Start',
      "selected": data.timing,
      "onClick": function () {
        function onClick() {
          return (0, _byond.act)(ref, data.timing ? 'stop' : 'start');
        }

        return onClick;
      }()
    }), (0, _inferno.createComponentVNode)(2, _components.Button, {
      "icon": "lightbulb-o",
      "content": data.flash_charging ? 'Recharging' : 'Flash',
      "disabled": data.flash_charging,
      "onClick": function () {
        function onClick() {
          return (0, _byond.act)(ref, 'flash');
        }

        return onClick;
      }()
    })], 4),
    children: [(0, _inferno.createComponentVNode)(2, _components.Button, {
      "icon": "fast-backward",
      "onClick": function () {
        function onClick() {
          return (0, _byond.act)(ref, 'time', {
            adjust: -600
          });
        }

        return onClick;
      }()
    }), (0, _inferno.createComponentVNode)(2, _components.Button, {
      "icon": "backward",
      "onClick": function () {
        function onClick() {
          return (0, _byond.act)(ref, 'time', {
            adjust: -100
          });
        }

        return onClick;
      }()
    }), ' ', String(Math.ceil(data.timetoset / 10)).padStart(2, '0'), ' ', (0, _inferno.createComponentVNode)(2, _components.Button, {
      "icon": "forward",
      "onClick": function () {
        function onClick() {
          return (0, _byond.act)(ref, 'time', {
            adjust: 100
          });
        }

        return onClick;
      }()
    }), (0, _inferno.createComponentVNode)(2, _components.Button, {
      "icon": "fast-forward",
      "onClick": function () {
        function onClick() {
          return (0, _byond.act)(ref, 'time', {
            adjust: 600
          });
        }

        return onClick;
      }()
    }), (0, _inferno.createVNode)(1, "br"), (0, _inferno.createComponentVNode)(2, _components.Button, {
      "icon": "hourglass-start",
      "content": "Short",
      "onClick": function () {
        function onClick() {
          return (0, _byond.act)(ref, 'time', {
            preset: 'short'
          });
        }

        return onClick;
      }()
    }), (0, _inferno.createComponentVNode)(2, _components.Button, {
      "icon": "hourglass-start",
      "content": "Medium",
      "onClick": function () {
        function onClick() {
          return (0, _byond.act)(ref, 'time', {
            preset: 'medium'
          });
        }

        return onClick;
      }()
    }), (0, _inferno.createComponentVNode)(2, _components.Button, {
      "icon": "hourglass-start",
      "content": "Long",
      "onClick": function () {
        function onClick() {
          return (0, _byond.act)(ref, 'time', {
            preset: 'long'
          });
        }

        return onClick;
      }()
    })]
  });
};

exports.BrigTimer = BrigTimer;

/***/ }),

/***/ "./interfaces/Jukebox.js":
/*!*******************************!*\
  !*** ./interfaces/Jukebox.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.Jukebox = void 0;

var _inferno = __webpack_require__(/*! inferno */ "../../node_modules/inferno/index.esm.js");

var _byond = __webpack_require__(/*! ../byond */ "./byond.js");

var _components = __webpack_require__(/*! ../components */ "./components/index.js");

var Jukebox = function Jukebox(props) {
  var state = props.state;
  var config = state.config,
      data = state.data;
  var ref = config.ref;
  var songs = data.tracks || [];
  return (0, _inferno.createFragment)([(0, _inferno.createComponentVNode)(2, _components.Section, {
    "title": "Control",
    "buttons": (0, _inferno.createFragment)([(0, _inferno.createComponentVNode)(2, _components.Button, {
      "icon": "minus",
      "onClick": function () {
        function onClick() {
          return (0, _byond.act)(ref, 'volume', {
            level: data.volume - 10
          });
        }

        return onClick;
      }()
    }), (0, _inferno.createComponentVNode)(2, _components.Button, {
      "icon": "plus",
      "onClick": function () {
        function onClick() {
          return (0, _byond.act)(ref, 'volume', {
            level: data.volume + 10
          });
        }

        return onClick;
      }()
    })], 4),
    children: (0, _inferno.createComponentVNode)(2, _components.ProgressBar, {
      "value": String(data.volume / 50),
      "content": 'Volume: ' + data.volume
    })
  }), (0, _inferno.createComponentVNode)(2, _components.Section, {
    "title": "Tracks List",
    children: songs.map(function (song) {
      return (0, _inferno.createFragment)([(0, _inferno.createComponentVNode)(2, _components.Button, {
        "content": song,
        "onClick": function () {
          function onClick() {
            return (0, _byond.act)(ref, 'change_track', {
              title: song
            });
          }

          return onClick;
        }()
      }), (0, _inferno.createVNode)(1, "br")], 4, song);
    })
  })], 4);
};

exports.Jukebox = Jukebox;

/***/ }),

/***/ "./interfaces/Resleever.js":
/*!*********************************!*\
  !*** ./interfaces/Resleever.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.Resleever = void 0;

var _inferno = __webpack_require__(/*! inferno */ "../../node_modules/inferno/index.esm.js");

var _byond = __webpack_require__(/*! ../byond */ "./byond.js");

var _components = __webpack_require__(/*! ../components */ "./components/index.js");

var Resleever = function Resleever(props) {
  var state = props.state;
  var config = state.config,
      data = state.data;
  var ref = config.ref;
  var progress = String(data.remaining / data.timetosleeve);
  return (0, _inferno.createFragment)([(0, _inferno.createComponentVNode)(2, _components.Section, {
    "title": "Content",
    "buttons": (0, _inferno.createFragment)([(0, _inferno.createComponentVNode)(2, _components.Button, {
      "icon": "eject",
      "content": "Eject Occupant",
      "disabled": data.isOccupiedEjectable ? null : '1',
      "onclick": function () {
        function onclick() {
          return (0, _byond.act)(ref, 'eject');
        }

        return onclick;
      }()
    }), ' ', (0, _inferno.createComponentVNode)(2, _components.Button, {
      "icon": "eject",
      "content": "Eject Lace",
      "disabled": data.isLaceEjectable ? null : '1',
      "onclick": function () {
        function onclick() {
          return (0, _byond.act)(ref, 'ejectlace');
        }

        return onclick;
      }()
    })], 0),
    children: (0, _inferno.createComponentVNode)(2, _components.LabeledList, {
      children: [(0, _inferno.createComponentVNode)(2, _components.LabeledList.Item, {
        "label": "Occupant",
        children: data.name ? data.name : 'Empty'
      }), (0, _inferno.createComponentVNode)(2, _components.LabeledList.Item, {
        "label": "Backup",
        children: data.lace ? data.lace : 'Empty'
      })]
    })
  }), (0, _inferno.createComponentVNode)(2, _components.Section, {
    "title": "Procedure",
    "buttons": (0, _inferno.createComponentVNode)(2, _components.Button, {
      "icon": "play",
      "content": "Start Procedure",
      "disabled": data.ready ? null : '0',
      "onclick": function () {
        function onclick() {
          return (0, _byond.act)(ref, 'begin');
        }

        return onclick;
      }()
    }),
    children: (0, _inferno.createComponentVNode)(2, _components.LabeledList, {
      children: [(0, _inferno.createComponentVNode)(2, _components.LabeledList.Item, {
        "label": "Status",
        children: progress > 0 && 'In Progress' || (data.ready ? 'Ready' : 'Not Ready')
      }), (0, _inferno.createComponentVNode)(2, _components.LabeledList.Item, {
        "label": "Progress",
        children: (0, _inferno.createComponentVNode)(2, _components.ProgressBar, {
          "value": progress
        })
      })]
    })
  })], 4);
};

exports.Resleever = Resleever;

/***/ }),

/***/ "./interfaces/SuitJammer.js":
/*!**********************************!*\
  !*** ./interfaces/SuitJammer.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.SuitJammer = void 0;

var _inferno = __webpack_require__(/*! inferno */ "../../node_modules/inferno/index.esm.js");

var _byond = __webpack_require__(/*! ../byond */ "./byond.js");

var _components = __webpack_require__(/*! ../components */ "./components/index.js");

var SuitJammer = function SuitJammer(props) {
  var state = props.state;
  var config = state.config,
      data = state.data;
  var ref = config.ref;
  var charge = data.current_charge / data.max_charge;
  var methods = data.methods || [];
  return (0, _inferno.createFragment)([(0, _inferno.createComponentVNode)(2, _components.Section, {
    "title": "Status",
    "buttons": (0, _inferno.createComponentVNode)(2, _components.Button, {
      "content": "Toggle Jammer",
      "icon": "wifi",
      "onclick": function () {
        function onclick() {
          return (0, _byond.act)(ref, data.active ? 'disable_jammer' : 'enable_jammer');
        }

        return onclick;
      }()
    }),
    children: (0, _inferno.createComponentVNode)(2, _components.LabeledList, {
      children: [(0, _inferno.createComponentVNode)(2, _components.LabeledList.Item, {
        "label": "State",
        children: data.active ? 'Active' : 'Disabled'
      }), (0, _inferno.createComponentVNode)(2, _components.LabeledList.Item, {
        "label": "Charge",
        children: (0, _inferno.createComponentVNode)(2, _components.ProgressBar, {
          "value": String(charge)
        })
      })]
    })
  }), (0, _inferno.createComponentVNode)(2, _components.Section, {
    "title": "Settings",
    children: (0, _inferno.createComponentVNode)(2, _components.LabeledList, {
      children: (0, _inferno.createComponentVNode)(2, _components.LabeledList.Item, {
        "label": "Range",
        children: [data.range, ' ', (0, _inferno.createComponentVNode)(2, _components.Button, {
          "disabled": data.range <= 0 ? '1' : null,
          "icon": "minus",
          "onclick": function () {
            function onclick() {
              return (0, _byond.act)(ref, 'decrease_range');
            }

            return onclick;
          }()
        }), (0, _inferno.createComponentVNode)(2, _components.Button, {
          "disabled": data.range >= data.max_range ? '1' : null,
          "icon": "plus",
          "onclick": function () {
            function onclick() {
              return (0, _byond.act)(ref, 'increase_range');
            }

            return onclick;
          }()
        })]
      })
    })
  }), (0, _inferno.createComponentVNode)(2, _components.Section, {
    "title": "Methods",
    children: methods.map(function (method) {
      return (0, _inferno.createFragment)([(0, _inferno.createComponentVNode)(2, _components.Button, {
        "content": method.name,
        "disabled": data.current_method === method.ref ? '1' : null,
        "onclick": function () {
          function onclick() {
            return (0, _byond.act)(ref, 'select_method', {
              method: method.ref
            });
          }

          return onclick;
        }()
      }), (0, _inferno.createVNode)(1, "br")], 4, method.name);
    })
  }), (0, _inferno.createComponentVNode)(2, _components.Toast, {
    children: ["Energy Consumption: ~", data.total_cost, "W"]
  })], 4);
};

exports.SuitJammer = SuitJammer;

/***/ }),

/***/ "./layout.js":
/*!*******************!*\
  !*** ./layout.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.Layout = void 0;

var _inferno = __webpack_require__(/*! inferno */ "../../node_modules/inferno/index.esm.js");

var _react = __webpack_require__(/*! common/react */ "../common/react.js");

var _string = __webpack_require__(/*! common/string */ "../common/string.js");

var _byond = __webpack_require__(/*! ./byond */ "./byond.js");

var _components = __webpack_require__(/*! ./components */ "./components/index.js");

var _Button = __webpack_require__(/*! ./components/Button */ "./components/Button.js");

var _Toast = __webpack_require__(/*! ./components/Toast */ "./components/Toast.js");

var _constants = __webpack_require__(/*! ./constants */ "./constants.js");

var _drag = __webpack_require__(/*! ./drag */ "./drag.js");

var _logging = __webpack_require__(/*! ./logging */ "./logging.js");

var _routes = __webpack_require__(/*! ./routes */ "./routes.js");

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var logger = (0, _logging.createLogger)('Layout');

var Layout =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Layout, _Component);

  function Layout() {
    var _this;

    _this = _Component.call(this) || this;
    _this.contentRef = (0, _inferno.createRef)();
    return _this;
  }

  var _proto = Layout.prototype;

  _proto.render = function () {
    function render() {
      var _this2 = this;

      var props = this.props;
      var state = props.state,
          dispatch = props.dispatch;
      var config = state.config;
      var route = (0, _routes.getRoute)(state);

      if (!route) {
        return "Component for '" + config["interface"] + "' was not found.";
      }

      var Component = route.component();
      var scrollable = route.scrollable;
      return (0, _inferno.createFragment)([(0, _inferno.createComponentVNode)(2, _components.TitleBar, {
        "className": "Layout__titleBar",
        "title": (0, _string.decodeHtmlEntities)(config.title),
        "status": config.status,
        "fancy": config.fancy,
        "onDragStart": _drag.dragStartHandler,
        "onClose": function () {
          function onClose() {
            logger.log('pressed close');
            (0, _byond.winset)(config.window, 'is-visible', false);
            (0, _byond.runCommand)("uiclose " + config.ref);
          }

          return onClose;
        }()
      }), (0, _inferno.createVNode)(1, "div", (0, _react.classes)(['Layout__content', scrollable && 'Layout__content--scrollable']), (0, _inferno.createComponentVNode)(2, _components.Box, {
        "m": 1,
        children: (0, _inferno.createComponentVNode)(2, Component, {
          "state": state,
          "dispatch": dispatch
        })
      }), 2, {
        "onClick": function () {
          function onClick() {
            // Abort this code path on IE8
            if (_byond.tridentVersion <= 4) {
              return;
            } // Bring focus back to the window on every click


            _this2.contentRef.current.focus();
          }

          return onClick;
        }(),
        "onKeyPress": function () {
          function onKeyPress(e) {
            // Abort this code path on IE8
            if (_byond.tridentVersion <= 4) {
              return;
            } // Bring focus back to the window on every keypress


            var keyCode = window.event ? e.which : e.keyCode;

            if (_Button.BUTTON_ACTIVATION_KEYCODES.includes(keyCode)) {
              _this2.contentRef.current.focus();
            }
          }

          return onKeyPress;
        }()
      }, null, this.contentRef), config.status !== _constants.UI_INTERACTIVE && (0, _inferno.createVNode)(1, "div", "Layout__dimmer"), state.toastText && (0, _inferno.createComponentVNode)(2, _Toast.Toast, {
        "content": state.toastText
      }), config.fancy && scrollable && (0, _inferno.createFragment)([(0, _inferno.createVNode)(1, "div", "Layout__resizeHandle__e", null, 1, {
        "onMousedown": (0, _drag.resizeStartHandler)(1, 0)
      }), (0, _inferno.createVNode)(1, "div", "Layout__resizeHandle__s", null, 1, {
        "onMousedown": (0, _drag.resizeStartHandler)(0, 1)
      }), (0, _inferno.createVNode)(1, "div", "Layout__resizeHandle__se", null, 1, {
        "onMousedown": (0, _drag.resizeStartHandler)(1, 1)
      })], 4)], 0);
    }

    return render;
  }();

  return Layout;
}(_inferno.Component);

exports.Layout = Layout;

/***/ }),

/***/ "./logging.js":
/*!********************!*\
  !*** ./logging.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.createLogger = exports.setLoggerRef = void 0;

var _client = __webpack_require__(/*! tgui-dev-server/link/client */ "../tgui-dev-server/link/client.js");

var _byond = __webpack_require__(/*! ./byond */ "./byond.js");

var _ref = null;

var setLoggerRef = function setLoggerRef(ref) {
  _ref = ref;
};

exports.setLoggerRef = setLoggerRef;
var LEVEL_DEBUG = 0;
var LEVEL_LOG = 1;
var LEVEL_INFO = 2;
var LEVEL_WARN = 3;
var LEVEL_ERROR = 4;

var _log = function log(level, ns) {
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  // Send logs to a remote log collector
  if (true) {
    _client.sendLogEntry.apply(void 0, [level, ns].concat(args));
  } // Send important logs to the backend


  if (level >= LEVEL_INFO) {
    var logEntry = [ns].concat(args).map(function (value) {
      if (typeof value === 'string') {
        return value;
      }

      return JSON.stringify(value);
    }).filter(function (value) {
      return value;
    }).join(' ') + '\nUser Agent: ' + navigator.userAgent;
    (0, _byond.act)(_ref, 'tgui:log', {
      log: logEntry
    });
  }
};

var createLogger = function createLogger(ns) {
  return {
    debug: function () {
      function debug() {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        return _log.apply(void 0, [LEVEL_DEBUG, ns].concat(args));
      }

      return debug;
    }(),
    log: function () {
      function log() {
        for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }

        return _log.apply(void 0, [LEVEL_LOG, ns].concat(args));
      }

      return log;
    }(),
    info: function () {
      function info() {
        for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
          args[_key4] = arguments[_key4];
        }

        return _log.apply(void 0, [LEVEL_INFO, ns].concat(args));
      }

      return info;
    }(),
    warn: function () {
      function warn() {
        for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
          args[_key5] = arguments[_key5];
        }

        return _log.apply(void 0, [LEVEL_WARN, ns].concat(args));
      }

      return warn;
    }(),
    error: function () {
      function error() {
        for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
          args[_key6] = arguments[_key6];
        }

        return _log.apply(void 0, [LEVEL_ERROR, ns].concat(args));
      }

      return error;
    }()
  };
};

exports.createLogger = createLogger;

/***/ }),

/***/ "./polyfills.js":
/*!**********************!*\
  !*** ./polyfills.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// This one is necessary for Inferno to do complex DOM patching on IE8.
// Not the fastest one or most spec compliant, but hey, it works!
if (!window.Int32Array) {
  window.Int32Array = Array;
}

/***/ }),

/***/ "./routes.js":
/*!*******************!*\
  !*** ./routes.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.getRoute = void 0;

var _AirlockElectronics = __webpack_require__(/*! ./interfaces/AirlockElectronics */ "./interfaces/AirlockElectronics.js");

var _BrigTimer = __webpack_require__(/*! ./interfaces/BrigTimer */ "./interfaces/BrigTimer.js");

var _Resleever = __webpack_require__(/*! ./interfaces/Resleever */ "./interfaces/Resleever.js");

var _Jukebox = __webpack_require__(/*! ./interfaces/Jukebox */ "./interfaces/Jukebox.js");

var _SuitJammer = __webpack_require__(/*! ./interfaces/SuitJammer */ "./interfaces/SuitJammer.js");

var ROUTES = {
  airlock_electronics: {
    component: function () {
      function component() {
        return _AirlockElectronics.AirlockElectronics;
      }

      return component;
    }(),
    scrollable: true
  },
  brig_timer: {
    component: function () {
      function component() {
        return _BrigTimer.BrigTimer;
      }

      return component;
    }(),
    scrollable: false
  },
  resleever: {
    component: function () {
      function component() {
        return _Resleever.Resleever;
      }

      return component;
    }(),
    scrollable: false
  },
  jukebox: {
    component: function () {
      function component() {
        return _Jukebox.Jukebox;
      }

      return component;
    }(),
    scrollable: true
  },
  suit_sensor_jammer: {
    component: function () {
      function component() {
        return _SuitJammer.SuitJammer;
      }

      return component;
    }(),
    scrollable: true
  }
};

var getRoute = function getRoute(state) {
  // Refer to the routing table
  return ROUTES[state.config && state.config["interface"]];
};

exports.getRoute = getRoute;

/***/ }),

/***/ "./store.js":
/*!******************!*\
  !*** ./store.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.createStore = void 0;

var _fp = __webpack_require__(/*! common/fp */ "../common/fp.js");

var _redux = __webpack_require__(/*! common/redux */ "../common/redux.js");

var _backend = __webpack_require__(/*! ./backend */ "./backend.js");

var _Toast = __webpack_require__(/*! ./components/Toast */ "./components/Toast.js");

var _hotkeys = __webpack_require__(/*! ./hotkeys */ "./hotkeys.js");

var _logging = __webpack_require__(/*! ./logging */ "./logging.js");

var logger = (0, _logging.createLogger)('store'); // const loggingMiddleware = store => next => action => {
//   const { type, payload } = action;
//   logger.log('dispatching', type);
//   next(action);
// };

var createStore = function createStore() {
  var reducer = (0, _fp.flow)([// State initializer
  function (state, action) {
    if (state === void 0) {
      state = {};
    }

    return state;
  }, // Global state reducers
  _backend.backendReducer, _Toast.toastReducer, _hotkeys.hotKeyReducer]);
  var middleware = [// loggingMiddleware,
  _hotkeys.hotKeyMiddleware];
  return (0, _redux.createStore)(reducer, _redux.applyMiddleware.apply(void 0, middleware));
};

exports.createStore = createStore;

/***/ }),

/***/ "./styles/main.scss":
/*!**************************!*\
  !*** ./styles/main.scss ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by extract-css-chunks-webpack-plugin
    if(true) {
      // 1571672731489
      var cssReload = __webpack_require__(/*! C:/Users/Igor/Desktop/OnyxBay/tgui-next/node_modules/extract-css-chunks-webpack-plugin/dist/hmr/hotModuleReplacement.js */ "../../node_modules/extract-css-chunks-webpack-plugin/dist/hmr/hotModuleReplacement.js")(module.i, {"hot":true,"locals":false});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

/***/ }),

/***/ 0:
/*!*******************************************!*\
  !*** multi ./styles/main.scss ./index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! C:\Users\Igor\Desktop\OnyxBay\tgui-next\packages\tgui\styles\main.scss */"./styles/main.scss");
module.exports = __webpack_require__(/*! C:\Users\Igor\Desktop\OnyxBay\tgui-next\packages\tgui\index.js */"./index.js");


/***/ })

/******/ });