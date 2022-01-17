/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 241:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.issue = exports.issueCommand = void 0;
const os = __importStar(__nccwpck_require__(37));
const utils_1 = __nccwpck_require__(278);
/**
 * Commands
 *
 * Command Format:
 *   ::name key=value,key=value::message
 *
 * Examples:
 *   ::warning::This is the message
 *   ::set-env name=MY_VAR::some value
 */
function issueCommand(command, properties, message) {
    const cmd = new Command(command, properties, message);
    process.stdout.write(cmd.toString() + os.EOL);
}
exports.issueCommand = issueCommand;
function issue(name, message = '') {
    issueCommand(name, {}, message);
}
exports.issue = issue;
const CMD_STRING = '::';
class Command {
    constructor(command, properties, message) {
        if (!command) {
            command = 'missing.command';
        }
        this.command = command;
        this.properties = properties;
        this.message = message;
    }
    toString() {
        let cmdStr = CMD_STRING + this.command;
        if (this.properties && Object.keys(this.properties).length > 0) {
            cmdStr += ' ';
            let first = true;
            for (const key in this.properties) {
                if (this.properties.hasOwnProperty(key)) {
                    const val = this.properties[key];
                    if (val) {
                        if (first) {
                            first = false;
                        }
                        else {
                            cmdStr += ',';
                        }
                        cmdStr += `${key}=${escapeProperty(val)}`;
                    }
                }
            }
        }
        cmdStr += `${CMD_STRING}${escapeData(this.message)}`;
        return cmdStr;
    }
}
function escapeData(s) {
    return utils_1.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A');
}
function escapeProperty(s) {
    return utils_1.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A')
        .replace(/:/g, '%3A')
        .replace(/,/g, '%2C');
}
//# sourceMappingURL=command.js.map

/***/ }),

/***/ 186:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getIDToken = exports.getState = exports.saveState = exports.group = exports.endGroup = exports.startGroup = exports.info = exports.notice = exports.warning = exports.error = exports.debug = exports.isDebug = exports.setFailed = exports.setCommandEcho = exports.setOutput = exports.getBooleanInput = exports.getMultilineInput = exports.getInput = exports.addPath = exports.setSecret = exports.exportVariable = exports.ExitCode = void 0;
const command_1 = __nccwpck_require__(241);
const file_command_1 = __nccwpck_require__(717);
const utils_1 = __nccwpck_require__(278);
const os = __importStar(__nccwpck_require__(37));
const path = __importStar(__nccwpck_require__(17));
const oidc_utils_1 = __nccwpck_require__(41);
/**
 * The code to exit an action
 */
var ExitCode;
(function (ExitCode) {
    /**
     * A code indicating that the action was successful
     */
    ExitCode[ExitCode["Success"] = 0] = "Success";
    /**
     * A code indicating that the action was a failure
     */
    ExitCode[ExitCode["Failure"] = 1] = "Failure";
})(ExitCode = exports.ExitCode || (exports.ExitCode = {}));
//-----------------------------------------------------------------------
// Variables
//-----------------------------------------------------------------------
/**
 * Sets env variable for this action and future actions in the job
 * @param name the name of the variable to set
 * @param val the value of the variable. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function exportVariable(name, val) {
    const convertedVal = utils_1.toCommandValue(val);
    process.env[name] = convertedVal;
    const filePath = process.env['GITHUB_ENV'] || '';
    if (filePath) {
        const delimiter = '_GitHubActionsFileCommandDelimeter_';
        const commandValue = `${name}<<${delimiter}${os.EOL}${convertedVal}${os.EOL}${delimiter}`;
        file_command_1.issueCommand('ENV', commandValue);
    }
    else {
        command_1.issueCommand('set-env', { name }, convertedVal);
    }
}
exports.exportVariable = exportVariable;
/**
 * Registers a secret which will get masked from logs
 * @param secret value of the secret
 */
function setSecret(secret) {
    command_1.issueCommand('add-mask', {}, secret);
}
exports.setSecret = setSecret;
/**
 * Prepends inputPath to the PATH (for this action and future actions)
 * @param inputPath
 */
function addPath(inputPath) {
    const filePath = process.env['GITHUB_PATH'] || '';
    if (filePath) {
        file_command_1.issueCommand('PATH', inputPath);
    }
    else {
        command_1.issueCommand('add-path', {}, inputPath);
    }
    process.env['PATH'] = `${inputPath}${path.delimiter}${process.env['PATH']}`;
}
exports.addPath = addPath;
/**
 * Gets the value of an input.
 * Unless trimWhitespace is set to false in InputOptions, the value is also trimmed.
 * Returns an empty string if the value is not defined.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string
 */
function getInput(name, options) {
    const val = process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] || '';
    if (options && options.required && !val) {
        throw new Error(`Input required and not supplied: ${name}`);
    }
    if (options && options.trimWhitespace === false) {
        return val;
    }
    return val.trim();
}
exports.getInput = getInput;
/**
 * Gets the values of an multiline input.  Each value is also trimmed.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string[]
 *
 */
function getMultilineInput(name, options) {
    const inputs = getInput(name, options)
        .split('\n')
        .filter(x => x !== '');
    return inputs;
}
exports.getMultilineInput = getMultilineInput;
/**
 * Gets the input value of the boolean type in the YAML 1.2 "core schema" specification.
 * Support boolean input list: `true | True | TRUE | false | False | FALSE` .
 * The return value is also in boolean type.
 * ref: https://yaml.org/spec/1.2/spec.html#id2804923
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   boolean
 */
function getBooleanInput(name, options) {
    const trueValue = ['true', 'True', 'TRUE'];
    const falseValue = ['false', 'False', 'FALSE'];
    const val = getInput(name, options);
    if (trueValue.includes(val))
        return true;
    if (falseValue.includes(val))
        return false;
    throw new TypeError(`Input does not meet YAML 1.2 "Core Schema" specification: ${name}\n` +
        `Support boolean input list: \`true | True | TRUE | false | False | FALSE\``);
}
exports.getBooleanInput = getBooleanInput;
/**
 * Sets the value of an output.
 *
 * @param     name     name of the output to set
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setOutput(name, value) {
    process.stdout.write(os.EOL);
    command_1.issueCommand('set-output', { name }, value);
}
exports.setOutput = setOutput;
/**
 * Enables or disables the echoing of commands into stdout for the rest of the step.
 * Echoing is disabled by default if ACTIONS_STEP_DEBUG is not set.
 *
 */
function setCommandEcho(enabled) {
    command_1.issue('echo', enabled ? 'on' : 'off');
}
exports.setCommandEcho = setCommandEcho;
//-----------------------------------------------------------------------
// Results
//-----------------------------------------------------------------------
/**
 * Sets the action status to failed.
 * When the action exits it will be with an exit code of 1
 * @param message add error issue message
 */
function setFailed(message) {
    process.exitCode = ExitCode.Failure;
    error(message);
}
exports.setFailed = setFailed;
//-----------------------------------------------------------------------
// Logging Commands
//-----------------------------------------------------------------------
/**
 * Gets whether Actions Step Debug is on or not
 */
function isDebug() {
    return process.env['RUNNER_DEBUG'] === '1';
}
exports.isDebug = isDebug;
/**
 * Writes debug message to user log
 * @param message debug message
 */
function debug(message) {
    command_1.issueCommand('debug', {}, message);
}
exports.debug = debug;
/**
 * Adds an error issue
 * @param message error issue message. Errors will be converted to string via toString()
 * @param properties optional properties to add to the annotation.
 */
function error(message, properties = {}) {
    command_1.issueCommand('error', utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
}
exports.error = error;
/**
 * Adds a warning issue
 * @param message warning issue message. Errors will be converted to string via toString()
 * @param properties optional properties to add to the annotation.
 */
function warning(message, properties = {}) {
    command_1.issueCommand('warning', utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
}
exports.warning = warning;
/**
 * Adds a notice issue
 * @param message notice issue message. Errors will be converted to string via toString()
 * @param properties optional properties to add to the annotation.
 */
function notice(message, properties = {}) {
    command_1.issueCommand('notice', utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
}
exports.notice = notice;
/**
 * Writes info to log with console.log.
 * @param message info message
 */
function info(message) {
    process.stdout.write(message + os.EOL);
}
exports.info = info;
/**
 * Begin an output group.
 *
 * Output until the next `groupEnd` will be foldable in this group
 *
 * @param name The name of the output group
 */
function startGroup(name) {
    command_1.issue('group', name);
}
exports.startGroup = startGroup;
/**
 * End an output group.
 */
function endGroup() {
    command_1.issue('endgroup');
}
exports.endGroup = endGroup;
/**
 * Wrap an asynchronous function call in a group.
 *
 * Returns the same type as the function itself.
 *
 * @param name The name of the group
 * @param fn The function to wrap in the group
 */
function group(name, fn) {
    return __awaiter(this, void 0, void 0, function* () {
        startGroup(name);
        let result;
        try {
            result = yield fn();
        }
        finally {
            endGroup();
        }
        return result;
    });
}
exports.group = group;
//-----------------------------------------------------------------------
// Wrapper action state
//-----------------------------------------------------------------------
/**
 * Saves state for current action, the state can only be retrieved by this action's post job execution.
 *
 * @param     name     name of the state to store
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function saveState(name, value) {
    command_1.issueCommand('save-state', { name }, value);
}
exports.saveState = saveState;
/**
 * Gets the value of an state set by this action's main execution.
 *
 * @param     name     name of the state to get
 * @returns   string
 */
function getState(name) {
    return process.env[`STATE_${name}`] || '';
}
exports.getState = getState;
function getIDToken(aud) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield oidc_utils_1.OidcClient.getIDToken(aud);
    });
}
exports.getIDToken = getIDToken;
//# sourceMappingURL=core.js.map

/***/ }),

/***/ 717:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

// For internal use, subject to change.
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.issueCommand = void 0;
// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
const fs = __importStar(__nccwpck_require__(147));
const os = __importStar(__nccwpck_require__(37));
const utils_1 = __nccwpck_require__(278);
function issueCommand(command, message) {
    const filePath = process.env[`GITHUB_${command}`];
    if (!filePath) {
        throw new Error(`Unable to find environment variable for file command ${command}`);
    }
    if (!fs.existsSync(filePath)) {
        throw new Error(`Missing file at path: ${filePath}`);
    }
    fs.appendFileSync(filePath, `${utils_1.toCommandValue(message)}${os.EOL}`, {
        encoding: 'utf8'
    });
}
exports.issueCommand = issueCommand;
//# sourceMappingURL=file-command.js.map

/***/ }),

/***/ 41:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OidcClient = void 0;
const http_client_1 = __nccwpck_require__(925);
const auth_1 = __nccwpck_require__(702);
const core_1 = __nccwpck_require__(186);
class OidcClient {
    static createHttpClient(allowRetry = true, maxRetry = 10) {
        const requestOptions = {
            allowRetries: allowRetry,
            maxRetries: maxRetry
        };
        return new http_client_1.HttpClient('actions/oidc-client', [new auth_1.BearerCredentialHandler(OidcClient.getRequestToken())], requestOptions);
    }
    static getRequestToken() {
        const token = process.env['ACTIONS_ID_TOKEN_REQUEST_TOKEN'];
        if (!token) {
            throw new Error('Unable to get ACTIONS_ID_TOKEN_REQUEST_TOKEN env variable');
        }
        return token;
    }
    static getIDTokenUrl() {
        const runtimeUrl = process.env['ACTIONS_ID_TOKEN_REQUEST_URL'];
        if (!runtimeUrl) {
            throw new Error('Unable to get ACTIONS_ID_TOKEN_REQUEST_URL env variable');
        }
        return runtimeUrl;
    }
    static getCall(id_token_url) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const httpclient = OidcClient.createHttpClient();
            const res = yield httpclient
                .getJson(id_token_url)
                .catch(error => {
                throw new Error(`Failed to get ID Token. \n 
        Error Code : ${error.statusCode}\n 
        Error Message: ${error.result.message}`);
            });
            const id_token = (_a = res.result) === null || _a === void 0 ? void 0 : _a.value;
            if (!id_token) {
                throw new Error('Response json body do not have ID Token field');
            }
            return id_token;
        });
    }
    static getIDToken(audience) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // New ID Token is requested from action service
                let id_token_url = OidcClient.getIDTokenUrl();
                if (audience) {
                    const encodedAudience = encodeURIComponent(audience);
                    id_token_url = `${id_token_url}&audience=${encodedAudience}`;
                }
                core_1.debug(`ID token url is ${id_token_url}`);
                const id_token = yield OidcClient.getCall(id_token_url);
                core_1.setSecret(id_token);
                return id_token;
            }
            catch (error) {
                throw new Error(`Error message: ${error.message}`);
            }
        });
    }
}
exports.OidcClient = OidcClient;
//# sourceMappingURL=oidc-utils.js.map

/***/ }),

/***/ 278:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.toCommandProperties = exports.toCommandValue = void 0;
/**
 * Sanitizes an input into a string so it can be passed into issueCommand safely
 * @param input input to sanitize into a string
 */
function toCommandValue(input) {
    if (input === null || input === undefined) {
        return '';
    }
    else if (typeof input === 'string' || input instanceof String) {
        return input;
    }
    return JSON.stringify(input);
}
exports.toCommandValue = toCommandValue;
/**
 *
 * @param annotationProperties
 * @returns The command properties to send with the actual annotation command
 * See IssueCommandProperties: https://github.com/actions/runner/blob/main/src/Runner.Worker/ActionCommandManager.cs#L646
 */
function toCommandProperties(annotationProperties) {
    if (!Object.keys(annotationProperties).length) {
        return {};
    }
    return {
        title: annotationProperties.title,
        file: annotationProperties.file,
        line: annotationProperties.startLine,
        endLine: annotationProperties.endLine,
        col: annotationProperties.startColumn,
        endColumn: annotationProperties.endColumn
    };
}
exports.toCommandProperties = toCommandProperties;
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ 702:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
class BasicCredentialHandler {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
    prepareRequest(options) {
        options.headers['Authorization'] =
            'Basic ' +
                Buffer.from(this.username + ':' + this.password).toString('base64');
    }
    // This handler cannot handle 401
    canHandleAuthentication(response) {
        return false;
    }
    handleAuthentication(httpClient, requestInfo, objs) {
        return null;
    }
}
exports.BasicCredentialHandler = BasicCredentialHandler;
class BearerCredentialHandler {
    constructor(token) {
        this.token = token;
    }
    // currently implements pre-authorization
    // TODO: support preAuth = false where it hooks on 401
    prepareRequest(options) {
        options.headers['Authorization'] = 'Bearer ' + this.token;
    }
    // This handler cannot handle 401
    canHandleAuthentication(response) {
        return false;
    }
    handleAuthentication(httpClient, requestInfo, objs) {
        return null;
    }
}
exports.BearerCredentialHandler = BearerCredentialHandler;
class PersonalAccessTokenCredentialHandler {
    constructor(token) {
        this.token = token;
    }
    // currently implements pre-authorization
    // TODO: support preAuth = false where it hooks on 401
    prepareRequest(options) {
        options.headers['Authorization'] =
            'Basic ' + Buffer.from('PAT:' + this.token).toString('base64');
    }
    // This handler cannot handle 401
    canHandleAuthentication(response) {
        return false;
    }
    handleAuthentication(httpClient, requestInfo, objs) {
        return null;
    }
}
exports.PersonalAccessTokenCredentialHandler = PersonalAccessTokenCredentialHandler;


/***/ }),

/***/ 925:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const http = __nccwpck_require__(685);
const https = __nccwpck_require__(687);
const pm = __nccwpck_require__(443);
let tunnel;
var HttpCodes;
(function (HttpCodes) {
    HttpCodes[HttpCodes["OK"] = 200] = "OK";
    HttpCodes[HttpCodes["MultipleChoices"] = 300] = "MultipleChoices";
    HttpCodes[HttpCodes["MovedPermanently"] = 301] = "MovedPermanently";
    HttpCodes[HttpCodes["ResourceMoved"] = 302] = "ResourceMoved";
    HttpCodes[HttpCodes["SeeOther"] = 303] = "SeeOther";
    HttpCodes[HttpCodes["NotModified"] = 304] = "NotModified";
    HttpCodes[HttpCodes["UseProxy"] = 305] = "UseProxy";
    HttpCodes[HttpCodes["SwitchProxy"] = 306] = "SwitchProxy";
    HttpCodes[HttpCodes["TemporaryRedirect"] = 307] = "TemporaryRedirect";
    HttpCodes[HttpCodes["PermanentRedirect"] = 308] = "PermanentRedirect";
    HttpCodes[HttpCodes["BadRequest"] = 400] = "BadRequest";
    HttpCodes[HttpCodes["Unauthorized"] = 401] = "Unauthorized";
    HttpCodes[HttpCodes["PaymentRequired"] = 402] = "PaymentRequired";
    HttpCodes[HttpCodes["Forbidden"] = 403] = "Forbidden";
    HttpCodes[HttpCodes["NotFound"] = 404] = "NotFound";
    HttpCodes[HttpCodes["MethodNotAllowed"] = 405] = "MethodNotAllowed";
    HttpCodes[HttpCodes["NotAcceptable"] = 406] = "NotAcceptable";
    HttpCodes[HttpCodes["ProxyAuthenticationRequired"] = 407] = "ProxyAuthenticationRequired";
    HttpCodes[HttpCodes["RequestTimeout"] = 408] = "RequestTimeout";
    HttpCodes[HttpCodes["Conflict"] = 409] = "Conflict";
    HttpCodes[HttpCodes["Gone"] = 410] = "Gone";
    HttpCodes[HttpCodes["TooManyRequests"] = 429] = "TooManyRequests";
    HttpCodes[HttpCodes["InternalServerError"] = 500] = "InternalServerError";
    HttpCodes[HttpCodes["NotImplemented"] = 501] = "NotImplemented";
    HttpCodes[HttpCodes["BadGateway"] = 502] = "BadGateway";
    HttpCodes[HttpCodes["ServiceUnavailable"] = 503] = "ServiceUnavailable";
    HttpCodes[HttpCodes["GatewayTimeout"] = 504] = "GatewayTimeout";
})(HttpCodes = exports.HttpCodes || (exports.HttpCodes = {}));
var Headers;
(function (Headers) {
    Headers["Accept"] = "accept";
    Headers["ContentType"] = "content-type";
})(Headers = exports.Headers || (exports.Headers = {}));
var MediaTypes;
(function (MediaTypes) {
    MediaTypes["ApplicationJson"] = "application/json";
})(MediaTypes = exports.MediaTypes || (exports.MediaTypes = {}));
/**
 * Returns the proxy URL, depending upon the supplied url and proxy environment variables.
 * @param serverUrl  The server URL where the request will be sent. For example, https://api.github.com
 */
function getProxyUrl(serverUrl) {
    let proxyUrl = pm.getProxyUrl(new URL(serverUrl));
    return proxyUrl ? proxyUrl.href : '';
}
exports.getProxyUrl = getProxyUrl;
const HttpRedirectCodes = [
    HttpCodes.MovedPermanently,
    HttpCodes.ResourceMoved,
    HttpCodes.SeeOther,
    HttpCodes.TemporaryRedirect,
    HttpCodes.PermanentRedirect
];
const HttpResponseRetryCodes = [
    HttpCodes.BadGateway,
    HttpCodes.ServiceUnavailable,
    HttpCodes.GatewayTimeout
];
const RetryableHttpVerbs = ['OPTIONS', 'GET', 'DELETE', 'HEAD'];
const ExponentialBackoffCeiling = 10;
const ExponentialBackoffTimeSlice = 5;
class HttpClientError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = 'HttpClientError';
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, HttpClientError.prototype);
    }
}
exports.HttpClientError = HttpClientError;
class HttpClientResponse {
    constructor(message) {
        this.message = message;
    }
    readBody() {
        return new Promise(async (resolve, reject) => {
            let output = Buffer.alloc(0);
            this.message.on('data', (chunk) => {
                output = Buffer.concat([output, chunk]);
            });
            this.message.on('end', () => {
                resolve(output.toString());
            });
        });
    }
}
exports.HttpClientResponse = HttpClientResponse;
function isHttps(requestUrl) {
    let parsedUrl = new URL(requestUrl);
    return parsedUrl.protocol === 'https:';
}
exports.isHttps = isHttps;
class HttpClient {
    constructor(userAgent, handlers, requestOptions) {
        this._ignoreSslError = false;
        this._allowRedirects = true;
        this._allowRedirectDowngrade = false;
        this._maxRedirects = 50;
        this._allowRetries = false;
        this._maxRetries = 1;
        this._keepAlive = false;
        this._disposed = false;
        this.userAgent = userAgent;
        this.handlers = handlers || [];
        this.requestOptions = requestOptions;
        if (requestOptions) {
            if (requestOptions.ignoreSslError != null) {
                this._ignoreSslError = requestOptions.ignoreSslError;
            }
            this._socketTimeout = requestOptions.socketTimeout;
            if (requestOptions.allowRedirects != null) {
                this._allowRedirects = requestOptions.allowRedirects;
            }
            if (requestOptions.allowRedirectDowngrade != null) {
                this._allowRedirectDowngrade = requestOptions.allowRedirectDowngrade;
            }
            if (requestOptions.maxRedirects != null) {
                this._maxRedirects = Math.max(requestOptions.maxRedirects, 0);
            }
            if (requestOptions.keepAlive != null) {
                this._keepAlive = requestOptions.keepAlive;
            }
            if (requestOptions.allowRetries != null) {
                this._allowRetries = requestOptions.allowRetries;
            }
            if (requestOptions.maxRetries != null) {
                this._maxRetries = requestOptions.maxRetries;
            }
        }
    }
    options(requestUrl, additionalHeaders) {
        return this.request('OPTIONS', requestUrl, null, additionalHeaders || {});
    }
    get(requestUrl, additionalHeaders) {
        return this.request('GET', requestUrl, null, additionalHeaders || {});
    }
    del(requestUrl, additionalHeaders) {
        return this.request('DELETE', requestUrl, null, additionalHeaders || {});
    }
    post(requestUrl, data, additionalHeaders) {
        return this.request('POST', requestUrl, data, additionalHeaders || {});
    }
    patch(requestUrl, data, additionalHeaders) {
        return this.request('PATCH', requestUrl, data, additionalHeaders || {});
    }
    put(requestUrl, data, additionalHeaders) {
        return this.request('PUT', requestUrl, data, additionalHeaders || {});
    }
    head(requestUrl, additionalHeaders) {
        return this.request('HEAD', requestUrl, null, additionalHeaders || {});
    }
    sendStream(verb, requestUrl, stream, additionalHeaders) {
        return this.request(verb, requestUrl, stream, additionalHeaders);
    }
    /**
     * Gets a typed object from an endpoint
     * Be aware that not found returns a null.  Other errors (4xx, 5xx) reject the promise
     */
    async getJson(requestUrl, additionalHeaders = {}) {
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        let res = await this.get(requestUrl, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
    }
    async postJson(requestUrl, obj, additionalHeaders = {}) {
        let data = JSON.stringify(obj, null, 2);
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
        let res = await this.post(requestUrl, data, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
    }
    async putJson(requestUrl, obj, additionalHeaders = {}) {
        let data = JSON.stringify(obj, null, 2);
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
        let res = await this.put(requestUrl, data, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
    }
    async patchJson(requestUrl, obj, additionalHeaders = {}) {
        let data = JSON.stringify(obj, null, 2);
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
        let res = await this.patch(requestUrl, data, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
    }
    /**
     * Makes a raw http request.
     * All other methods such as get, post, patch, and request ultimately call this.
     * Prefer get, del, post and patch
     */
    async request(verb, requestUrl, data, headers) {
        if (this._disposed) {
            throw new Error('Client has already been disposed.');
        }
        let parsedUrl = new URL(requestUrl);
        let info = this._prepareRequest(verb, parsedUrl, headers);
        // Only perform retries on reads since writes may not be idempotent.
        let maxTries = this._allowRetries && RetryableHttpVerbs.indexOf(verb) != -1
            ? this._maxRetries + 1
            : 1;
        let numTries = 0;
        let response;
        while (numTries < maxTries) {
            response = await this.requestRaw(info, data);
            // Check if it's an authentication challenge
            if (response &&
                response.message &&
                response.message.statusCode === HttpCodes.Unauthorized) {
                let authenticationHandler;
                for (let i = 0; i < this.handlers.length; i++) {
                    if (this.handlers[i].canHandleAuthentication(response)) {
                        authenticationHandler = this.handlers[i];
                        break;
                    }
                }
                if (authenticationHandler) {
                    return authenticationHandler.handleAuthentication(this, info, data);
                }
                else {
                    // We have received an unauthorized response but have no handlers to handle it.
                    // Let the response return to the caller.
                    return response;
                }
            }
            let redirectsRemaining = this._maxRedirects;
            while (HttpRedirectCodes.indexOf(response.message.statusCode) != -1 &&
                this._allowRedirects &&
                redirectsRemaining > 0) {
                const redirectUrl = response.message.headers['location'];
                if (!redirectUrl) {
                    // if there's no location to redirect to, we won't
                    break;
                }
                let parsedRedirectUrl = new URL(redirectUrl);
                if (parsedUrl.protocol == 'https:' &&
                    parsedUrl.protocol != parsedRedirectUrl.protocol &&
                    !this._allowRedirectDowngrade) {
                    throw new Error('Redirect from HTTPS to HTTP protocol. This downgrade is not allowed for security reasons. If you want to allow this behavior, set the allowRedirectDowngrade option to true.');
                }
                // we need to finish reading the response before reassigning response
                // which will leak the open socket.
                await response.readBody();
                // strip authorization header if redirected to a different hostname
                if (parsedRedirectUrl.hostname !== parsedUrl.hostname) {
                    for (let header in headers) {
                        // header names are case insensitive
                        if (header.toLowerCase() === 'authorization') {
                            delete headers[header];
                        }
                    }
                }
                // let's make the request with the new redirectUrl
                info = this._prepareRequest(verb, parsedRedirectUrl, headers);
                response = await this.requestRaw(info, data);
                redirectsRemaining--;
            }
            if (HttpResponseRetryCodes.indexOf(response.message.statusCode) == -1) {
                // If not a retry code, return immediately instead of retrying
                return response;
            }
            numTries += 1;
            if (numTries < maxTries) {
                await response.readBody();
                await this._performExponentialBackoff(numTries);
            }
        }
        return response;
    }
    /**
     * Needs to be called if keepAlive is set to true in request options.
     */
    dispose() {
        if (this._agent) {
            this._agent.destroy();
        }
        this._disposed = true;
    }
    /**
     * Raw request.
     * @param info
     * @param data
     */
    requestRaw(info, data) {
        return new Promise((resolve, reject) => {
            let callbackForResult = function (err, res) {
                if (err) {
                    reject(err);
                }
                resolve(res);
            };
            this.requestRawWithCallback(info, data, callbackForResult);
        });
    }
    /**
     * Raw request with callback.
     * @param info
     * @param data
     * @param onResult
     */
    requestRawWithCallback(info, data, onResult) {
        let socket;
        if (typeof data === 'string') {
            info.options.headers['Content-Length'] = Buffer.byteLength(data, 'utf8');
        }
        let callbackCalled = false;
        let handleResult = (err, res) => {
            if (!callbackCalled) {
                callbackCalled = true;
                onResult(err, res);
            }
        };
        let req = info.httpModule.request(info.options, (msg) => {
            let res = new HttpClientResponse(msg);
            handleResult(null, res);
        });
        req.on('socket', sock => {
            socket = sock;
        });
        // If we ever get disconnected, we want the socket to timeout eventually
        req.setTimeout(this._socketTimeout || 3 * 60000, () => {
            if (socket) {
                socket.end();
            }
            handleResult(new Error('Request timeout: ' + info.options.path), null);
        });
        req.on('error', function (err) {
            // err has statusCode property
            // res should have headers
            handleResult(err, null);
        });
        if (data && typeof data === 'string') {
            req.write(data, 'utf8');
        }
        if (data && typeof data !== 'string') {
            data.on('close', function () {
                req.end();
            });
            data.pipe(req);
        }
        else {
            req.end();
        }
    }
    /**
     * Gets an http agent. This function is useful when you need an http agent that handles
     * routing through a proxy server - depending upon the url and proxy environment variables.
     * @param serverUrl  The server URL where the request will be sent. For example, https://api.github.com
     */
    getAgent(serverUrl) {
        let parsedUrl = new URL(serverUrl);
        return this._getAgent(parsedUrl);
    }
    _prepareRequest(method, requestUrl, headers) {
        const info = {};
        info.parsedUrl = requestUrl;
        const usingSsl = info.parsedUrl.protocol === 'https:';
        info.httpModule = usingSsl ? https : http;
        const defaultPort = usingSsl ? 443 : 80;
        info.options = {};
        info.options.host = info.parsedUrl.hostname;
        info.options.port = info.parsedUrl.port
            ? parseInt(info.parsedUrl.port)
            : defaultPort;
        info.options.path =
            (info.parsedUrl.pathname || '') + (info.parsedUrl.search || '');
        info.options.method = method;
        info.options.headers = this._mergeHeaders(headers);
        if (this.userAgent != null) {
            info.options.headers['user-agent'] = this.userAgent;
        }
        info.options.agent = this._getAgent(info.parsedUrl);
        // gives handlers an opportunity to participate
        if (this.handlers) {
            this.handlers.forEach(handler => {
                handler.prepareRequest(info.options);
            });
        }
        return info;
    }
    _mergeHeaders(headers) {
        const lowercaseKeys = obj => Object.keys(obj).reduce((c, k) => ((c[k.toLowerCase()] = obj[k]), c), {});
        if (this.requestOptions && this.requestOptions.headers) {
            return Object.assign({}, lowercaseKeys(this.requestOptions.headers), lowercaseKeys(headers));
        }
        return lowercaseKeys(headers || {});
    }
    _getExistingOrDefaultHeader(additionalHeaders, header, _default) {
        const lowercaseKeys = obj => Object.keys(obj).reduce((c, k) => ((c[k.toLowerCase()] = obj[k]), c), {});
        let clientHeader;
        if (this.requestOptions && this.requestOptions.headers) {
            clientHeader = lowercaseKeys(this.requestOptions.headers)[header];
        }
        return additionalHeaders[header] || clientHeader || _default;
    }
    _getAgent(parsedUrl) {
        let agent;
        let proxyUrl = pm.getProxyUrl(parsedUrl);
        let useProxy = proxyUrl && proxyUrl.hostname;
        if (this._keepAlive && useProxy) {
            agent = this._proxyAgent;
        }
        if (this._keepAlive && !useProxy) {
            agent = this._agent;
        }
        // if agent is already assigned use that agent.
        if (!!agent) {
            return agent;
        }
        const usingSsl = parsedUrl.protocol === 'https:';
        let maxSockets = 100;
        if (!!this.requestOptions) {
            maxSockets = this.requestOptions.maxSockets || http.globalAgent.maxSockets;
        }
        if (useProxy) {
            // If using proxy, need tunnel
            if (!tunnel) {
                tunnel = __nccwpck_require__(294);
            }
            const agentOptions = {
                maxSockets: maxSockets,
                keepAlive: this._keepAlive,
                proxy: {
                    ...((proxyUrl.username || proxyUrl.password) && {
                        proxyAuth: `${proxyUrl.username}:${proxyUrl.password}`
                    }),
                    host: proxyUrl.hostname,
                    port: proxyUrl.port
                }
            };
            let tunnelAgent;
            const overHttps = proxyUrl.protocol === 'https:';
            if (usingSsl) {
                tunnelAgent = overHttps ? tunnel.httpsOverHttps : tunnel.httpsOverHttp;
            }
            else {
                tunnelAgent = overHttps ? tunnel.httpOverHttps : tunnel.httpOverHttp;
            }
            agent = tunnelAgent(agentOptions);
            this._proxyAgent = agent;
        }
        // if reusing agent across request and tunneling agent isn't assigned create a new agent
        if (this._keepAlive && !agent) {
            const options = { keepAlive: this._keepAlive, maxSockets: maxSockets };
            agent = usingSsl ? new https.Agent(options) : new http.Agent(options);
            this._agent = agent;
        }
        // if not using private agent and tunnel agent isn't setup then use global agent
        if (!agent) {
            agent = usingSsl ? https.globalAgent : http.globalAgent;
        }
        if (usingSsl && this._ignoreSslError) {
            // we don't want to set NODE_TLS_REJECT_UNAUTHORIZED=0 since that will affect request for entire process
            // http.RequestOptions doesn't expose a way to modify RequestOptions.agent.options
            // we have to cast it to any and change it directly
            agent.options = Object.assign(agent.options || {}, {
                rejectUnauthorized: false
            });
        }
        return agent;
    }
    _performExponentialBackoff(retryNumber) {
        retryNumber = Math.min(ExponentialBackoffCeiling, retryNumber);
        const ms = ExponentialBackoffTimeSlice * Math.pow(2, retryNumber);
        return new Promise(resolve => setTimeout(() => resolve(), ms));
    }
    static dateTimeDeserializer(key, value) {
        if (typeof value === 'string') {
            let a = new Date(value);
            if (!isNaN(a.valueOf())) {
                return a;
            }
        }
        return value;
    }
    async _processResponse(res, options) {
        return new Promise(async (resolve, reject) => {
            const statusCode = res.message.statusCode;
            const response = {
                statusCode: statusCode,
                result: null,
                headers: {}
            };
            // not found leads to null obj returned
            if (statusCode == HttpCodes.NotFound) {
                resolve(response);
            }
            let obj;
            let contents;
            // get the result from the body
            try {
                contents = await res.readBody();
                if (contents && contents.length > 0) {
                    if (options && options.deserializeDates) {
                        obj = JSON.parse(contents, HttpClient.dateTimeDeserializer);
                    }
                    else {
                        obj = JSON.parse(contents);
                    }
                    response.result = obj;
                }
                response.headers = res.message.headers;
            }
            catch (err) {
                // Invalid resource (contents not json);  leaving result obj null
            }
            // note that 3xx redirects are handled by the http layer.
            if (statusCode > 299) {
                let msg;
                // if exception/error in body, attempt to get better error
                if (obj && obj.message) {
                    msg = obj.message;
                }
                else if (contents && contents.length > 0) {
                    // it may be the case that the exception is in the body message as string
                    msg = contents;
                }
                else {
                    msg = 'Failed request: (' + statusCode + ')';
                }
                let err = new HttpClientError(msg, statusCode);
                err.result = response.result;
                reject(err);
            }
            else {
                resolve(response);
            }
        });
    }
}
exports.HttpClient = HttpClient;


/***/ }),

/***/ 443:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
function getProxyUrl(reqUrl) {
    let usingSsl = reqUrl.protocol === 'https:';
    let proxyUrl;
    if (checkBypass(reqUrl)) {
        return proxyUrl;
    }
    let proxyVar;
    if (usingSsl) {
        proxyVar = process.env['https_proxy'] || process.env['HTTPS_PROXY'];
    }
    else {
        proxyVar = process.env['http_proxy'] || process.env['HTTP_PROXY'];
    }
    if (proxyVar) {
        proxyUrl = new URL(proxyVar);
    }
    return proxyUrl;
}
exports.getProxyUrl = getProxyUrl;
function checkBypass(reqUrl) {
    if (!reqUrl.hostname) {
        return false;
    }
    let noProxy = process.env['no_proxy'] || process.env['NO_PROXY'] || '';
    if (!noProxy) {
        return false;
    }
    // Determine the request port
    let reqPort;
    if (reqUrl.port) {
        reqPort = Number(reqUrl.port);
    }
    else if (reqUrl.protocol === 'http:') {
        reqPort = 80;
    }
    else if (reqUrl.protocol === 'https:') {
        reqPort = 443;
    }
    // Format the request hostname and hostname with port
    let upperReqHosts = [reqUrl.hostname.toUpperCase()];
    if (typeof reqPort === 'number') {
        upperReqHosts.push(`${upperReqHosts[0]}:${reqPort}`);
    }
    // Compare request host against noproxy
    for (let upperNoProxyItem of noProxy
        .split(',')
        .map(x => x.trim().toUpperCase())
        .filter(x => x)) {
        if (upperReqHosts.some(x => x === upperNoProxyItem)) {
            return true;
        }
    }
    return false;
}
exports.checkBypass = checkBypass;


/***/ }),

/***/ 437:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const fs = __nccwpck_require__(147)
const path = __nccwpck_require__(17)
const os = __nccwpck_require__(37)

function log (message) {
  console.log(`[dotenv][DEBUG] ${message}`)
}

const NEWLINE = '\n'
const RE_INI_KEY_VAL = /^\s*([\w.-]+)\s*=\s*(.*)?\s*$/
const RE_NEWLINES = /\\n/g
const NEWLINES_MATCH = /\r\n|\n|\r/

// Parses src into an Object
function parse (src, options) {
  const debug = Boolean(options && options.debug)
  const obj = {}

  // convert Buffers before splitting into lines and processing
  src.toString().split(NEWLINES_MATCH).forEach(function (line, idx) {
    // matching "KEY' and 'VAL' in 'KEY=VAL'
    const keyValueArr = line.match(RE_INI_KEY_VAL)
    // matched?
    if (keyValueArr != null) {
      const key = keyValueArr[1]
      // default undefined or missing values to empty string
      let val = (keyValueArr[2] || '')
      const end = val.length - 1
      const isDoubleQuoted = val[0] === '"' && val[end] === '"'
      const isSingleQuoted = val[0] === "'" && val[end] === "'"

      // if single or double quoted, remove quotes
      if (isSingleQuoted || isDoubleQuoted) {
        val = val.substring(1, end)

        // if double quoted, expand newlines
        if (isDoubleQuoted) {
          val = val.replace(RE_NEWLINES, NEWLINE)
        }
      } else {
        // remove surrounding whitespace
        val = val.trim()
      }

      obj[key] = val
    } else if (debug) {
      log(`did not match key and value when parsing line ${idx + 1}: ${line}`)
    }
  })

  return obj
}

function resolveHome (envPath) {
  return envPath[0] === '~' ? path.join(os.homedir(), envPath.slice(1)) : envPath
}

// Populates process.env from .env file
function config (options) {
  let dotenvPath = path.resolve(process.cwd(), '.env')
  let encoding = 'utf8'
  const debug = Boolean(options && options.debug)

  if (options) {
    if (options.path != null) {
      dotenvPath = resolveHome(options.path)
    }
    if (options.encoding != null) {
      encoding = options.encoding
    }
  }

  try {
    // specifying an encoding returns a string instead of a buffer
    const parsed = parse(fs.readFileSync(dotenvPath, { encoding }), { debug })

    Object.keys(parsed).forEach(function (key) {
      if (!Object.prototype.hasOwnProperty.call(process.env, key)) {
        process.env[key] = parsed[key]
      } else if (debug) {
        log(`"${key}" is already defined in \`process.env\` and will not be overwritten`)
      }
    })

    return { parsed }
  } catch (e) {
    return { error: e }
  }
}

module.exports.config = config
module.exports.parse = parse


/***/ }),

/***/ 882:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";
/**
 * Build client
 */



/**
 * Module dependencies.
 */

var LogStream = (__nccwpck_require__(209)/* .LogStream */ .j);
var middleware = __nccwpck_require__(886);
var utils = __nccwpck_require__(440);

/**
 * Initialize a new `Build` client.
 */

function Build(jenkins) {
  this.jenkins = jenkins;
}

/**
 * Object meta
 */

Build.meta = {};

/**
 * Build details
 */

Build.prototype.get = function(opts, callback) {
  var arg0 = typeof arguments[0];
  var arg1 = typeof arguments[1];
  var arg2 = typeof arguments[2];
  var arg3 = typeof arguments[3];

  if (arg0 === 'string' && (arg1 === 'string' || arg1 === 'number')) {
    if (arg2 === 'object') {
      opts = arguments[2];
      callback = arg3 === 'function' ? arguments[3] : undefined;
    } else {
      opts = {};
      callback = arg2 === 'function' ? arguments[2] : undefined;
    }

    opts.name = arguments[0];
    opts.number = arguments[1];
  } else {
    opts = opts || {};
  }

  this.jenkins._log(['debug', 'build', 'get'], opts);

  var req = { name: 'build.get' };

  utils.options(req, opts);

  try {
    var folder = utils.FolderPath(opts.name);

    if (folder.isEmpty()) throw new Error('name required');
    if (!opts.number) throw new Error('number required');

    req.path = '{folder}/{number}/api/json';
    req.params = {
      folder: folder.path(),
      number: opts.number,
    };
  } catch (err) {
    return callback(this.jenkins._err(err, req));
  }

  return this.jenkins._get(
    req,
    middleware.notFound(opts.name + ' ' + opts.number),
    middleware.body,
    callback
  );
};

/**
 * Stop build
 */

Build.prototype.stop = function(opts, callback) {
  var arg0 = typeof arguments[0];
  var arg1 = typeof arguments[1];

  if (arg0 === 'string' && (arg1 === 'string' || arg1 === 'number')) {
    opts = {
      name: arguments[0],
      number: arguments[1],
    };
    callback = arguments[2];
  } else {
    opts = opts || {};
  }

  this.jenkins._log(['debug', 'build', 'stop'], opts);

  var req = { name: 'build.stop' };

  utils.options(req, opts);

  try {
    var folder = utils.FolderPath(opts.name);

    if (folder.isEmpty()) throw new Error('name required');
    if (!opts.number) throw new Error('number required');

    req.path = '{folder}/{number}/stop';
    req.params = {
      folder: folder.path(),
      number: opts.number,
    };
  } catch (err) {
    return callback(this.jenkins._err(err, req));
  }

  return this.jenkins._post(
    req,
    middleware.notFound(opts.name + ' ' + opts.number),
    middleware.require302('failed to stop: ' + opts.name),
    middleware.empty,
    callback
  );
};

/**
 * Terminate build
 */

Build.prototype.term = function(opts, callback) {
  var arg0 = typeof arguments[0];
  var arg1 = typeof arguments[1];

  if (arg0 === 'string' && (arg1 === 'string' || arg1 === 'number')) {
    opts = {
      name: arguments[0],
      number: arguments[1],
    };
    callback = arguments[2];
  } else {
    opts = opts || {};
  }

  this.jenkins._log(['debug', 'build', 'term'], opts);

  var req = { name: 'build.term' };

  utils.options(req, opts);

  try {
    var folder = utils.FolderPath(opts.name);

    if (folder.isEmpty()) throw new Error('name required');
    if (!opts.number) throw new Error('number required');

    req.path = '{folder}/{number}/term';
    req.params = {
      folder: folder.path(),
      number: opts.number,
    };
  } catch (err) {
    return callback(this.jenkins._err(err, req));
  }

  return this.jenkins._post(
    req,
    middleware.notFound(opts.name + ' ' + opts.number),
    middleware.empty,
    callback
  );
};

/**
* Get build log
*/

Build.prototype.log = function(opts, callback) {
  var arg0 = typeof arguments[0];
  var arg1 = typeof arguments[1];
  var arg2 = typeof arguments[2];
  var arg3 = typeof arguments[3];

  if (arg0 === 'string' && (arg1 === 'string' || arg1 === 'number')) {
    if (arg2 === 'object') {
      opts = arguments[2];
      callback = arg3 === 'function' ? arguments[3] : undefined;
    } else {
      opts = {};
      callback = arg2 === 'function' ? arguments[2] : undefined;
    }

    opts.name = arguments[0];
    opts.number = arguments[1];
  } else {
    opts = opts || {};
  }

  this.jenkins._log(['debug', 'build', 'log'], opts);

  var req = { name: 'build.log' };

  utils.options(req, opts);

  try {
    var folder = utils.FolderPath(opts.name);

    if (folder.isEmpty()) throw new Error('name required');
    if (!opts.number) throw new Error('number required');

    req.path = '{folder}/{number}/logText/progressive{type}';
    req.params = {
      folder: folder.path(),
      number: opts.number,
      type: opts.type === 'html' ? 'Html' : 'Text',
    };
    req.type = 'form';
    req.body = {};
    if (opts.hasOwnProperty('start')) req.body.start = opts.start;
  } catch (err) {
    return callback(this.jenkins._err(err, req));
  }

  return this.jenkins._post(
    req,
    middleware.notFound(opts.name + ' ' + opts.number),
    function(ctx, next) {
      if (ctx.err) return next(ctx.err);
      if (!opts.meta) return next(false, null, ctx.res.body);

      var data = {
        text: ctx.res.body,
        more: ctx.res.headers['x-more-data'] === 'true',
      };

      if (ctx.res.headers['x-text-size']) {
        data.size = ctx.res.headers['x-text-size'];
      }

      next(false, null, data);
    },
    callback
  );
};

/**
* Get log stream
*/

Build.meta.logStream = { type: 'eventemitter' };

Build.prototype.logStream = function(opts) {
  var arg0 = typeof arguments[0];
  var arg1 = typeof arguments[1];
  var arg2 = typeof arguments[2];

  if (arg0 === 'string' && (arg1 === 'string' || arg1 === 'number')) {
    if (arg2 === 'object') {
      opts = arguments[2];
    } else {
      opts = {};
    }

    opts.name = arguments[0];
    opts.number = arguments[1];
  } else {
    opts = opts || {};
  }

  return new LogStream(this.jenkins, opts);
};

/**
 * Module exports.
 */

exports.Z = Build;


/***/ }),

/***/ 988:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";
/**
 * CrumbIssuer client
 */



/**
 * Module dependencies.
 */

var utils = __nccwpck_require__(440);

/**
 * Initialize a new `CrumbIssuer` client.
 */

function CrumbIssuer(jenkins) {
  this.jenkins = jenkins;
}

/**
 * Object meta
 */

CrumbIssuer.meta = {};

/**
 * Get crumb
 */

CrumbIssuer.prototype.get = function(opts, callback) {
  if (typeof opts === 'function') {
    callback = opts;
    opts = {};
  }

  this.jenkins._log(['debug', 'crumbIssuer', 'get'], opts);

  var req = {
    name: 'crumbIssuer.get',
    path: '/crumbIssuer/api/json',
  };

  utils.options(req, opts);

  return this.jenkins._get(req, function(ctx, next) {
    if (ctx.err) return next(ctx.err);

    var data = ctx.res.body;

    if (data && data._class === 'hudson.security.csrf.DefaultCrumbIssuer') {
      var cookies = ctx.res.headers['set-cookie'];

      if (cookies && cookies.length) {
        data.cookies = [];

        for (var i = 0; i < cookies.length; i++) {
          data.cookies.push(cookies[i].split(';')[0]);
        }
      }
    }

    next(false, null, data);
  }, callback);
};

/**
 * Module exports.
 */

exports.o = CrumbIssuer;


/***/ }),

/***/ 108:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";
/**
 * Module index
 */



/**
 * Module dependencies.
 */

var Jenkins = (__nccwpck_require__(780)/* .Jenkins */ .O);

/**
 * Module exports.
 */

var m = function() {
  return m.Jenkins.apply(this, arguments);
};

m.Jenkins = Jenkins;

module.exports = m;


/***/ }),

/***/ 780:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";
/**
 * Jenkins client (papi)
 */



/**
 * Module dependencies.
 */

var papi = __nccwpck_require__(107);
var util = __nccwpck_require__(837);

var Build = (__nccwpck_require__(882)/* .Build */ .Z);
var CrumbIssuer = (__nccwpck_require__(988)/* .CrumbIssuer */ .o);
var Job = (__nccwpck_require__(424)/* .Job */ .o);
var Label = (__nccwpck_require__(883)/* .Label */ ._);
var Node = (__nccwpck_require__(777)/* .Node */ .N);
var Plugin = (__nccwpck_require__(552)/* .Plugin */ .S);
var Queue = (__nccwpck_require__(803)/* .Queue */ .c);
var View = (__nccwpck_require__(320)/* .View */ .G);
var middleware = __nccwpck_require__(886);
var utils = __nccwpck_require__(440);

/**
 * Initialize a new `Jenkins` client.
 */

function Jenkins(opts) {
  if (!(this instanceof Jenkins)) {
    return new Jenkins(opts);
  }

  if (typeof opts === 'string') {
    opts = { baseUrl: opts };
  } else {
    opts = opts || {};
  }

  opts = Object.assign({}, opts);

  if (!opts.baseUrl) {
    if (opts.url) {
      opts.baseUrl = opts.url;
      delete opts.url;
    } else {
      throw new Error('baseUrl required');
    }
  }

  if (!opts.headers) {
    opts.headers = {};
  }
  if (!opts.headers.referer) {
    opts.headers.referer = opts.baseUrl + '/';
  }

  if (opts.request) {
    throw new Error('request not longer supported');
  }

  opts.name = 'jenkins';

  if (typeof opts.crumbIssuer === 'function') {
    this._crumbIssuer = opts.crumbIssuer;
    delete opts.crumbIssuer;
  } else if (opts.crumbIssuer === true) {
    this._crumbIssuer = utils.crumbIssuer;
  }

  if (opts.formData) {
    if (typeof opts.formData !== 'function' || opts.formData.name !== 'FormData') {
      throw new Error('formData is invalid');
    }
    this._formData = opts.formData;
    delete opts.formData;
  }

  papi.Client.call(this, opts);

  this._ext('onCreate', this._onCreate);
  this._ext('onResponse', this._onResponse);

  this.build = new Jenkins.Build(this);
  this.crumbIssuer = new Jenkins.CrumbIssuer(this);
  this.job = new Jenkins.Job(this);
  this.label = new Jenkins.Label(this);
  this.node = new Jenkins.Node(this);
  this.plugin = new Jenkins.Plugin(this);
  this.queue = new Jenkins.Queue(this);
  this.view = new Jenkins.View(this);

  try {
    if (opts.promisify) {
      if (typeof opts.promisify === 'function') {
        papi.tools.promisify(this, opts.promisify);
      } else {
        papi.tools.promisify(this);
      }
    }
  } catch (err) {
    err.message = 'promisify: ' + err.message;
    throw err;
  }
}

util.inherits(Jenkins, papi.Client);

Jenkins.Build = Build;
Jenkins.CrumbIssuer = CrumbIssuer;
Jenkins.Job = Job;
Jenkins.Label = Label;
Jenkins.Node = Node;
Jenkins.Plugin = Plugin;
Jenkins.Queue = Queue;
Jenkins.View = View;

/**
 * Object meta
 */

Jenkins.meta = {};

/**
 * Inject CSRF Protection crumb into POST requests
 */

Jenkins.prototype._onCreate = function(ctx, next) {
  if (!this._crumbIssuer || ctx.opts.method !== 'POST') return next();

  this._crumbIssuer(this, function(err, data) {
    if (err) return next(err);

    if (data.headerName && data.headerValue) {
      if (!ctx.opts.headers) ctx.opts.headers = {};
      ctx.opts.headers[data.headerName] = data.headerValue;
      if (data.cookies) ctx.opts.headers.cookie = data.cookies;
    }

    next();
  });
};

/**
 * Handle responses.
 */

Jenkins.prototype._onResponse = function(ctx, next) {
  if (ctx.err) {
    if (ctx.res && ctx.res.headers && ctx.res.headers['x-error']) {
      ctx.err.message = ctx.res.headers['x-error'].replace(/\?/g, '"');
    }
    ctx.err.res = ctx.res;
  }

  next();
};

/**
 * Jenkins info
 */

Jenkins.prototype.info = function(opts, callback) {
  if (typeof opts === 'function') {
    callback = opts;
    opts = {};
  }

  this._log(['debug', 'info'], opts);

  var req = {
    name: 'info',
    path: '/api/json',
  };

  utils.options(req, opts);

  return this._get(req, middleware.body, callback);
};

Jenkins.prototype.get = Jenkins.prototype.info;

/**
 * Walk methods
 */

Jenkins.meta.walk = { type: 'sync' };

Jenkins.walk = Jenkins.prototype.walk = function() {
  return papi.tools.walk(Jenkins);
};

/**
 * Module exports.
 */

exports.O = Jenkins;


/***/ }),

/***/ 424:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";
/**
 * Job client
 */



/**
 * Module dependencies.
 */

var middleware = __nccwpck_require__(886);
var utils = __nccwpck_require__(440);

/**
 * Initialize a new `Job` client.
 */

function Job(jenkins) {
  this.jenkins = jenkins;
}

/**
 * Object meta
 */

Job.meta = {};

/**
 * Trigger job build
 */

Job.prototype.build = function(opts, callback) {
  var self = this;

  var arg0 = typeof arguments[0];
  var arg1 = typeof arguments[1];
  var arg2 = typeof arguments[2];

  if (arg0 === 'string') {
    if (arg1 === 'object') {
      opts = arguments[1];
      callback = arg2 === 'function' ? arguments[2] : undefined;
    } else {
      opts = {};
      callback = arg1 === 'function' ? arguments[1] : undefined;
    }
    opts.name = arguments[0];
  }

  opts = opts || {};

  self.jenkins._log(['debug', 'job', 'build'], opts);

  var req = { name: 'job.build' };

  utils.options(req, opts);

  try {
    var folder = utils.FolderPath(opts.name);

    if (folder.isEmpty()) throw new Error('name required');

    req.path = '{folder}/build';
    req.params = { folder: folder.path() };

    if (typeof opts.parameters === 'object') {
      req.path += 'WithParameters';

      var form;
      var data = {};

      Object.keys(opts.parameters).forEach(function(name) {
        var value = opts.parameters[name];

        if (utils.isFileLike(value)) {
          if (!form) {
            if (!self.jenkins._formData) {
              throw new Error('formData must be defined when client initalized to use file upload');
            }
            form = new self.jenkins._formData();
          }
          form.append(name, value, { filename: name });
        } else {
          data[name] = value;
        }
      });

      if (form) {
        Object.keys(data).forEach(function(key) {
          form.append(key, data[key]);
        });
        req.body = form;

        if (!req.headers) req.headers = {};
        var formHeaders = form.getHeaders();
        Object.keys(formHeaders).forEach(function(name) {
          req.headers[name] = formHeaders[name];
        });
      }

      if (!req.body) {
        req.type = 'form';
        req.body = data;
      }
    }

    if (opts.delay) req.query.delay = opts.delay;
    if (opts.token) req.query.token = opts.token;
  } catch (err) {
    return callback(self.jenkins._err(err, req));
  }

  return self.jenkins._post(
    req,
    middleware.notFound(opts.name),
    middleware.ignoreErrorForStatusCodes(302),
    middleware.queueLocation,
    callback
  );
};

/**
 * Get or update config
 */

Job.prototype.config = function(opts, callback) {
  var arg0 = typeof arguments[0];
  var arg1 = typeof arguments[1];
  var arg2 = typeof arguments[2];

  if (arg0 === 'string') {
    opts = { name: arguments[0] };
    if (arg1 === 'string') {
      opts.xml = arguments[1];
      callback = arg2 === 'function' ? arguments[2] : undefined;
    } else {
      callback = arg1 === 'function' ? arguments[1] : undefined;
    }
  }

  opts = opts || {};

  this.jenkins._log(['debug', 'job', 'config'], opts);

  var req = { name: 'job.config' };

  utils.options(req, opts);

  try {
    var folder = utils.FolderPath(opts.name);

    if (folder.isEmpty()) throw new Error('name required');

    req.path = '{folder}/config.xml';
    req.params = { folder: folder.path() };

    if (opts.xml) {
      req.method = 'POST';
      req.headers = { 'content-type': 'text/xml; charset=utf-8' };
      req.body = Buffer.from(opts.xml);
    } else {
      req.method = 'GET';
    }
  } catch (err) {
    return callback(this.jenkins._err(err, req));
  }

  return this.jenkins._request(
    req,
    middleware.notFound('job ' + opts.name),
    function(ctx, next) {
      if (ctx.err || opts.xml) return middleware.empty(ctx, next);

      next(false, null, ctx.res.body.toString('utf8'));
    },
    callback
  );
};

/**
 * Copy job
 */

Job.prototype.copy = function(opts, callback) {
  var arg0 = typeof arguments[0];
  var arg1 = typeof arguments[1];
  var arg2 = typeof arguments[2];

  if (arg0 === 'string' && arg1 === 'string') {
    opts = {
      from: arguments[0],
      name: arguments[1],
    };
    callback = arg2 === 'function' ? arguments[2] : undefined;
  }

  opts = opts || {};

  this.jenkins._log(['debug', 'job', 'copy'], opts);

  var req = { name: 'job.copy' };

  utils.options(req, opts);

  try {
    var folder = utils.FolderPath(opts.name);

    if (folder.isEmpty()) throw new Error('name required');
    if (!opts.from) throw new Error('from required');

    req.path = '{dir}/createItem';
    req.headers = { 'content-type': 'text/xml; charset=utf-8' };
    req.params = { dir: folder.dir() };
    req.query.name = folder.name();
    req.query.from = opts.from;
    req.query.mode = 'copy';
  } catch (err) {
    return callback(this.jenkins._err(err, req));
  }

  return this.jenkins._post(
    req,
    middleware.require302('failed to create: ' + opts.name),
    middleware.empty,
    callback
  );
};

/**
 * Create new job from xml
 */

Job.prototype.create = function(opts, callback) {
  var arg0 = typeof arguments[0];
  var arg1 = typeof arguments[1];
  var arg2 = typeof arguments[2];

  if (arg0 === 'string' && arg1 === 'string') {
    opts = {
      name: arguments[0],
      xml: arguments[1],
    };
    callback = arg2 === 'function' ? arguments[2] : undefined;
  }

  opts = opts || {};

  this.jenkins._log(['debug', 'job', 'create'], opts);

  var req = { name: 'job.create' };

  utils.options(req, opts);

  try {
    var folder = utils.FolderPath(opts.name);

    if (folder.isEmpty()) throw new Error('name required');
    if (!opts.xml) throw new Error('xml required');

    req.path = '{dir}/createItem';
    req.headers = { 'content-type': 'text/xml; charset=utf-8' };
    req.params = { dir: folder.dir() };
    req.query.name = folder.name();
    req.body = Buffer.from(opts.xml);
  } catch (err) {
    return callback(this.jenkins._err(err, req));
  }

  return this.jenkins._post(req, middleware.empty, callback);
};

/**
 * Destroy job
 */

Job.prototype.destroy = function(opts, callback) {
  if (typeof opts === 'string') {
    opts = { name: opts };
  } else {
    opts = opts || {};
  }

  this.jenkins._log(['debug', 'job', 'destroy'], opts);

  var req = { name: 'job.destroy' };

  utils.options(req, opts);

  try {
    var folder = utils.FolderPath(opts.name);

    if (folder.isEmpty()) throw new Error('name required');

    req.path = '{folder}/doDelete';
    req.params = { folder: folder.path() };
  } catch (err) {
    return callback(this.jenkins._err(err, req));
  }

  return this.jenkins._post(
    req,
    middleware.notFound(opts.name),
    middleware.require302('failed to delete: ' + opts.name),
    middleware.empty,
    callback
  );
};

Job.meta.delete = { type: 'alias' };

Job.prototype.delete = Job.prototype.destroy;

/**
 * Disable job
 */

Job.prototype.disable = function(opts, callback) {
  if (typeof opts === 'string') {
    opts = { name: opts };
  } else {
    opts = opts || {};
  }

  this.jenkins._log(['debug', 'job', 'disable'], opts);

  var req = { name: 'job.disable' };

  utils.options(req, opts);

  try {
    var folder = utils.FolderPath(opts.name);

    if (folder.isEmpty()) throw new Error('name required');

    req.path = '{folder}/disable';
    req.params = { folder: folder.path() };
  } catch (err) {
    return callback(this.jenkins._err(err, req));
  }

  return this.jenkins._post(
    req,
    middleware.notFound(opts.name),
    middleware.require302('failed to disable: ' + opts.name),
    middleware.empty,
    callback
  );
};

/**
 * Enable job
 */

Job.prototype.enable = function(opts, callback) {
  if (typeof opts === 'string') {
    opts = { name: opts };
  } else {
    opts = opts || {};
  }

  this.jenkins._log(['debug', 'job', 'enable'], opts);

  var req = { name: 'job.enable' };

  utils.options(req, opts);

  try {
    var folder = utils.FolderPath(opts.name);

    if (folder.isEmpty()) throw new Error('name required');

    req.path = '{folder}/enable';
    req.params = { folder: folder.path() };
  } catch (err) {
    return callback(this.jenkins._err(err, req));
  }

  return this.jenkins._post(
    req,
    middleware.notFound(opts.name),
    middleware.require302('failed to enable: ' + opts.name),
    middleware.empty,
    callback
  );
};

/**
 * Job exists
 */

Job.prototype.exists = function(opts, callback) {
  if (typeof opts === 'string') {
    opts = { name: opts };
  } else {
    opts = opts || {};
  }

  this.jenkins._log(['debug', 'job', 'exists'], opts);

  var req = { name: 'job.exists' };

  utils.options(req, opts);

  try {
    var folder = utils.FolderPath(opts.name);

    if (folder.isEmpty()) throw new Error('name required');

    req.path = '{folder}/api/json';
    req.params = { folder: folder.path() };
  } catch (err) {
    return callback(this.jenkins._err(err, req));
  }

  return this.jenkins._head(req, middleware.exists, callback);
};

/**
 * Job details
 */

Job.prototype.get = function(opts, callback) {
  var arg0 = typeof arguments[0];
  var arg1 = typeof arguments[1];
  var arg2 = typeof arguments[2];

  if (arg0 === 'string') {
    if (arg1 === 'object') {
      opts = arguments[1];
      callback = arg2 === 'function' ? arguments[2] : undefined;
    } else {
      opts = {};
      callback = arg1 === 'function' ? arguments[1] : undefined;
    }
    opts.name = arguments[0];
  } else {
    opts = opts || {};
  }

  this.jenkins._log(['debug', 'job', 'get'], opts);

  var req = { name: 'job.get' };

  utils.options(req, opts);

  try {
    var folder = utils.FolderPath(opts.name);

    if (folder.isEmpty()) throw new Error('name required');

    req.path = '{folder}/api/json';
    req.params = { folder: folder.path() };
  } catch (err) {
    return callback(this.jenkins._err(err, req));
  }

  return this.jenkins._get(
    req,
    middleware.notFound(opts.name),
    middleware.body,
    callback
  );
};

/**
 * List jobs
 */

Job.prototype.list = function(opts, callback) {
  if (typeof opts === 'function') {
    callback = opts;
    opts = {};
  } else if (typeof opts === 'string') {
    opts = { name: opts };
  } else {
    opts = opts || {};
  }

  this.jenkins._log(['debug', 'job', 'list'], opts);

  var req = {
    name: 'job.list',
    path: '/api/json',
  };

  utils.options(req, opts);

  if (opts.name) {
    try {
      var folder = utils.FolderPath(opts.name);

      if (folder.isEmpty()) throw new Error('name required');

      req.path = '{folder}/api/json';
      req.params = { folder: folder.path() };
    } catch (err) {
      return callback(this.jenkins._err(err, req));
    }
  }

  return this.jenkins._get(
    req,
    function(ctx, next) {
      if (ctx.err) return next();

      if (!ctx.res.body || !Array.isArray(ctx.res.body.jobs)) {
        ctx.err = new Error('returned bad data');
      }

      next();
    },
    middleware.bodyItem('jobs'),
    callback
  );
};

/**
 * Module exports.
 */

exports.o = Job;


/***/ }),

/***/ 883:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";
/**
 * Label client
 */



/**
 * Module dependencies.
 */

var middleware = __nccwpck_require__(886);
var utils = __nccwpck_require__(440);

/**
 * Initialize a new `Label` client.
 */

function Label(jenkins) {
  this.jenkins = jenkins;
}

/**
 * Object meta
 */

Label.meta = {};

/**
 * Label details
 */

Label.prototype.get = function(opts, callback) {
  if (typeof opts === 'string') {
    opts = { name: opts };
  } else {
    opts = opts || {};
  }

  this.jenkins._log(['debug', 'label', 'get'], opts);

  var req = { name: 'label.get' };

  utils.options(req, opts);

  try {
    if (!opts.name) throw new Error('name required');

    req.path = '/label/{name}/api/json';
    req.params = {
      name: opts.name,
    };
  } catch (err) {
    return callback(this.jenkins._err(err, req));
  }

  return this.jenkins._get(
    req,
    middleware.body,
    callback
  );
};

/**
 * Module exports.
 */

exports._ = Label;


/***/ }),

/***/ 209:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";
/**
 * Log stream.
 */



/**
 * Module dependencies.
 */

var events = __nccwpck_require__(361);
var util = __nccwpck_require__(837);

/**
 * Initialize a new `LogStream` instance.
 */

function LogStream(jenkins, opts) {
  var self = this;

  events.EventEmitter.call(self);

  self._jenkins = jenkins;

  opts = opts || {};

  self._delay = opts.delay || 1000;
  delete opts.delay;

  self._opts = {};
  for (var key in opts) {
    if (opts.hasOwnProperty(key)) {
      self._opts[key] = opts[key];
    }
  }
  self._opts.meta = true;

  process.nextTick(function() { self._run(); });
}

util.inherits(LogStream, events.EventEmitter);

/**
 * Object meta
 */

LogStream.meta = {};

/**
 * End watch
 */

LogStream.meta.end = { type: 'sync' };

LogStream.prototype.end = function() {
  clearTimeout(this._timeoutId);

  if (this._end) return;
  this._end = true;

  this.emit('end');
};

/**
 * Error helper
 */

LogStream.prototype._err = function(err) {
  if (this._end) return;

  this.emit('error', err);

  this.end();
};

/**
 * Run
 */

LogStream.prototype._run = function() {
  var self = this;

  if (self._end) return;

  try {
    self._jenkins.build.log(self._opts, function(err, data) {
      if (self._end) return;
      if (err) return self._err(err);

      if (typeof data.text === 'string') self.emit('data', data.text);

      if (!data.more) return self.end();
      if (data.size) self._opts.start = data.size;

      self._timeoutId = setTimeout(function() { self._run(); }, self._delay);
    });
  } catch (err) {
    self._err(err);
  }
};

/**
 * Module exports.
 */

exports.j = LogStream;


/***/ }),

/***/ 886:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
/**
 * Format Papi responses
 */



/**
 * Body
 */

function body(ctx, next) {
  if (ctx.err) return next(ctx.err);

  next(false, null, ctx.res.body);
}

/**
 * Body item
 */

function bodyItem(key) {
  return function(ctx, next) {
    if (ctx.err) return next(ctx.err);

    next(false, null, ctx.res.body[key]);
  };
}

/**
 * Empty
 */

function empty(ctx, next) {
  if (ctx.err) return next(ctx.err);

  next(false);
}

/**
 * Exists
 */

function exists(ctx, next) {
  if (ctx.res && ctx.res.statusCode === 404) {
    return next(false, null, false);
  }

  if (ctx.err) return next(ctx.err);

  next(false, null, true);
}

/**
 * Ignore errors for provided status codes
 */

function ignoreErrorForStatusCodes() {
  var statusCodes = Array.prototype.slice.call(arguments);

  return function(ctx, next) {
    if (ctx.err && ctx.res && statusCodes.indexOf(ctx.res.statusCode) !== -1) {
      delete ctx.err;
    }

    next();
  };
}

/**
 * Require 302 or error
 */

function require302(message) {
  return function(ctx, next) {
    if (ctx.res && ctx.res.statusCode === 302) {
      return next(false);
    } else if (ctx.res) {
      if (ctx.err) {
        if (!ctx.res.headers['x-error']) ctx.err.message = message;
      } else {
        ctx.err = new Error(message);
      }

      return next(ctx.err);
    }

    next();
  };
}

/**
 * Not found
 */

function notFound(value) {
  return function(ctx, next) {
    if (ctx.res && ctx.res.statusCode === 404) {
      var err = new Error(value + ' not found');
      err.notFound = true;

      return next(err);
    }

    next();
  };
}

/**
 * Queue location
 */

function queueLocation(ctx, next) {
  if (ctx.err) return next(ctx.err);

  try {
    // Get queue number from location header
    var parts = ctx.res.headers.location.split('/');

    return next(false, null, parseInt(parts[parts.length - 2], 10));
  } catch (err) {
    // ignore errors
  }

  next();
}

/**
 * Module exports
 */

exports.body = body;
exports.bodyItem = bodyItem;
exports.empty = empty;
exports.exists = exists;
exports.ignoreErrorForStatusCodes = ignoreErrorForStatusCodes;
exports.notFound = notFound;
exports.queueLocation = queueLocation;
exports.require302 = require302;


/***/ }),

/***/ 777:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";
/**
 * Node client
 */



/**
 * Module dependencies.
 */

var middleware = __nccwpck_require__(886);
var utils = __nccwpck_require__(440);

/**
 * Initialize a new `Node` client.
 */

function Node(jenkins) {
  this.jenkins = jenkins;
}

/**
 * Object meta
 */

Node.meta = {};

/**
 * Get or update config
 */

Node.prototype.config = function(opts, callback) {
  var arg0 = typeof arguments[0];
  var arg1 = typeof arguments[1];
  var arg2 = typeof arguments[2];

  if (arg0 === 'string') {
    opts = { name: arguments[0] };
    if (arg1 === 'string') {
      opts.xml = arguments[1];
      callback = arg2 === 'function' ? arguments[2] : undefined;
    } else {
      callback = arg1 === 'function' ? arguments[1] : undefined;
    }
  }

  opts = opts || {};

  this.jenkins._log(['debug', 'node', 'config'], opts);

  var req = { name: 'node.config' };

  utils.options(req, opts);

  try {
    if (!opts.name) throw new Error('name required');

    req.path = '/computer/{name}/config.xml';
    req.params = {
      name: opts.name === 'master' ? '(master)' : opts.name,
    };

    if (opts.xml) {
      if (opts.name === 'master') {
        throw new Error('master not supported');
      }

      req.method = 'POST';
      req.headers = { 'content-type': 'text/xml; charset=utf-8' };
      req.body = Buffer.from(opts.xml);
    } else {
      req.method = 'GET';
    }
  } catch (err) {
    return callback(this.jenkins._err(err, req));
  }

  return this.jenkins._request(
    req,
    middleware.notFound('node ' + opts.name),
    function(ctx, next) {
      if (ctx.err || opts.xml) return middleware.empty(ctx, next);

      next(false, null, ctx.res.body.toString('utf8'));
    },
    callback
  );
};

/**
 * Create node
 */

Node.prototype.create = function(opts, callback) {
  var arg0 = typeof arguments[0];
  var arg1 = typeof arguments[1];
  var arg2 = typeof arguments[2];

  if (arg0 === 'string') {
    if (arg1 === 'object') {
      opts = arguments[1];
      callback = arg2 === 'function' ? arguments[2] : undefined;
    } else {
      opts = {};
      callback = arg1 === 'function' ? arguments[1] : undefined;
    }
    opts.name = arguments[0];
  } else {
    opts = opts || {};
  }

  opts.type = opts.type || 'hudson.slaves.DumbSlave$DescriptorImpl';
  opts.retentionStrategy = opts.retentionStrategy ||
    { 'stapler-class': 'hudson.slaves.RetentionStrategy$Always' };
  opts.nodeProperties = opts.nodeProperties || { 'stapler-class-bag': 'true' };
  opts.launcher = opts.launcher ||
    { 'stapler-class': 'hudson.slaves.JNLPLauncher' };
  opts.numExecutors = opts.hasOwnProperty('numExecutors') ?
    opts.numExecutors : 2;
  opts.remoteFS = opts.remoteFS || '/var/lib/jenkins';
  opts.mode = opts.mode || (opts.exclusive ? 'EXCLUSIVE' : 'NORMAL');

  this.jenkins._log(['debug', 'node', 'create'], opts);

  var req = { name: 'node.create' };

  utils.options(req, opts);

  try {
    if (!opts.name) throw new Error('name required');

    req.path = '/computer/doCreateItem';
    req.query.name = opts.name;
    req.query.type = opts.type;
    req.query.json = JSON.stringify({
      name: opts.name,
      nodeDescription: opts.nodeDescription,
      numExecutors: opts.numExecutors,
      remoteFS: opts.remoteFS,
      labelString: opts.labelString,
      mode: opts.mode,
      type: opts.type,
      retentionStrategy: opts.retentionStrategy,
      nodeProperties: opts.nodeProperties,
      launcher: opts.launcher,
    });
  } catch (err) {
    return callback(this.jenkins._err(err, req));
  }

  return this.jenkins._post(
    req,
    middleware.require302('failed to create: ' + opts.name),
    middleware.empty,
    callback
  );
};

/**
 * Destroy node
 */

Node.prototype.destroy = function(opts, callback) {
  if (typeof opts === 'string') {
    opts = { name: opts };
  } else {
    opts = opts || {};
  }

  this.jenkins._log(['debug', 'node', 'destroy'], opts);

  var req = { name: 'node.destroy' };

  utils.options(req, opts);

  try {
    if (!opts.name) throw new Error('name required');

    req.path = '/computer/{name}/doDelete';
    req.params = { name: opts.name };
  } catch (err) {
    return callback(this.jenkins._err(err, req));
  }

  return this.jenkins._post(
    req,
    middleware.notFound(opts.name),
    middleware.require302('failed to delete: ' + opts.name),
    middleware.empty,
    callback
  );
};

Node.meta.delete = { type: 'alias' };

Node.prototype.delete = Node.prototype.destroy;

/**
 * Disconnect node call
 */

Node.prototype.doDisconnect = function(opts, callback) {
  opts = opts || {};

  this.jenkins._log(['debug', 'node', 'doDisconnect'], opts);

  var req = { name: 'node.doDisconnect' };

  utils.options(req, opts);

  try {
    if (!opts.name) throw new Error('name required');

    req.path = '/computer/{name}/doDisconnect';
    req.params = { name: opts.name };
    req.query.offlineMessage = opts.message || '';
  } catch (err) {
    return callback(this.jenkins._err(err, req));
  }

  return this.jenkins._post(
      req,
      middleware.notFound(opts.name),
      middleware.require302('failed to disconnect: ' + opts.name),
      middleware.empty,
      callback
  );
};

/**
 * Toggle offline
 */

Node.prototype.toggleOffline = function(opts, callback) {
  opts = opts || {};

  this.jenkins._log(['debug', 'node', 'toggleOffline'], opts);

  var req = { name: 'node.toggleOffline' };

  utils.options(req, opts);

  try {
    if (!opts.name) throw new Error('name required');

    req.path = '/computer/{name}/toggleOffline';
    req.params = { name: opts.name };
    req.query.offlineMessage = opts.message || '';
  } catch (err) {
    return callback(this.jenkins._err(err, req));
  }

  return this.jenkins._post(
    req,
    middleware.notFound(opts.name),
    middleware.require302('failed to toggle offline: ' + opts.name),
    middleware.empty,
    callback
  );
};

/**
 * Change offline message
 */

Node.prototype.changeOfflineCause = function(opts, callback) {
  opts = opts || {};

  opts.message = opts.message || '';

  this.jenkins._log(['debug', 'node', 'changeOfflineCause'], opts);

  var req = { name: 'node.changeOfflineCause' };

  utils.options(req, opts);

  try {
    if (!opts.name) throw new Error('name required');

    req.path = '/computer/{name}/changeOfflineCause';
    req.params = { name: opts.name };
    req.type = 'form';
    req.body = {
      offlineMessage: opts.message,
      json: JSON.stringify({
        offlineMessage: opts.message,
      }),
      Submit: 'Update reason',
    };
  } catch (err) {
    return callback(this.jenkins._err(err, req));
  }

  return this.jenkins._post(
    req,
    middleware.notFound(opts.name),
    middleware.require302('failed to update offline message: ' + opts.name),
    middleware.empty,
    callback
  );
};

/**
 * Disconnect node
 */

Node.prototype.disconnect = function(opts, callback) {
  var self = this;

  var arg0 = typeof arguments[0];
  var arg1 = typeof arguments[1];

  if (arg0 === 'string' && arg1 === 'string') {
    opts = {
      name: arguments[0],
      message: arguments[1],
    };
    callback = arguments[2];
  } else if (typeof opts === 'string') {
    opts = { name: opts };
  } else {
    opts = opts || {};
  }

  self.jenkins._log(['debug', 'node', 'disconnect'], opts);

  if (!opts.name) {
    return callback(this.jenkins._err('name required', { name: 'node.disconnect' }));
  }

  self.get(opts.name, function(err, node) {
    if (err) return callback(err);

    if (node && node.offline) {
      return self.toggleOffline({ name: opts.name, message: opts.message }, function(err) {
        if (err) return callback(err);

        callback();
      });
    }

    self.doDisconnect({ name: opts.name, message: opts.message }, function(err) {
      if (err) return callback(err);

      callback();
    });
  });
};

/**
 * Disable node
 */

Node.prototype.disable = function(opts, callback) {
  var self = this;

  var arg0 = typeof arguments[0];
  var arg1 = typeof arguments[1];

  if (arg0 === 'string' && arg1 === 'string') {
    opts = {
      name: arguments[0],
      message: arguments[1],
    };
    callback = arguments[2];
  } else if (typeof opts === 'string') {
    opts = { name: opts };
  } else {
    opts = opts || {};
  }

  self.jenkins._log(['debug', 'node', 'disable'], opts);

  if (!opts.name) {
    return callback(this.jenkins._err('name required', { name: 'node.disable' }));
  }

  self.get(opts.name, function(err, node) {
    if (err) return callback(err);

    if (node && node.temporarilyOffline) {
      if (node.offlineCauseReason !== opts.message) {
        return self.changeOfflineCause({
          name: opts.name,
          message: opts.message,
        }, callback);
      }

      return callback();
    }

    self.toggleOffline({ name: opts.name, message: opts.message }, function(err) {
      if (err) return callback(err);

      callback();
    });
  });
};

/**
 * Enable node
 */

Node.prototype.enable = function(opts, callback) {
  var self = this;

  if (typeof opts === 'string') {
    opts = { name: opts };
  } else {
    opts = opts || {};
  }

  self.jenkins._log(['debug', 'node', 'enable'], opts);

  if (!opts.name) {
    return callback(this.jenkins._err('name required', { name: 'node.enable' }));
  }

  self.get(opts.name, function(err, node) {
    if (err) return callback(err);

    if (!node.temporarilyOffline) return callback();

    self.toggleOffline({ name: opts.name, message: '' }, function(err) {
      if (err) callback(err);

      callback();
    });
  });
};

/**
 * Node exists
 */

Node.prototype.exists = function(opts, callback) {
  if (typeof opts === 'string') {
    opts = { name: opts };
  } else {
    opts = opts || {};
  }

  this.jenkins._log(['debug', 'build', 'exists'], opts);

  var req = { name: 'node.exists' };

  utils.options(req, opts);

  try {
    if (!opts.name) throw new Error('name required');

    req.path = '/computer/{name}/api/json';
    req.params = {
      name: opts.name === 'master' ? '(master)' : opts.name,
    };
  } catch (err) {
    return callback(this.jenkins._err(err, req));
  }

  return this.jenkins._head(req, middleware.exists, callback);
};

/**
 * Node details
 */

Node.prototype.get = function(opts, callback) {
  if (typeof opts === 'string') {
    opts = { name: opts };
  } else {
    opts = opts || {};
  }

  this.jenkins._log(['debug', 'node', 'get'], opts);

  var req = { name: 'node.get' };

  utils.options(req, opts);

  try {
    if (!opts.name) throw new Error('name required');

    req.path = '/computer/{name}/api/json';
    req.params = {
      name: opts.name === 'master' ? '(master)' : opts.name,
    };
  } catch (err) {
    return callback(this.jenkins._err(err, req));
  }

  return this.jenkins._get(
    req,
    middleware.notFound(opts.name),
    middleware.body,
    callback
  );
};

/**
 * List nodes
 */

Node.prototype.list = function(opts, callback) {
  if (typeof opts === 'function') {
    callback = opts;
    opts = {};
  } else {
    opts = opts || {};
  }

  this.jenkins._log(['debug', 'node', 'list'], opts);

  var req = {
    name: 'node.list',
    path: '/computer/api/json',
  };

  utils.options(req, opts);

  if (opts.full === true) {
    return this.jenkins._get(
      req,
      middleware.body,
      callback
    );
  } else {
    return this.jenkins._get(
      req,
      middleware.bodyItem('computer'),
      callback
    );
  }
};

/**
 * Module exports.
 */

exports.N = Node;


/***/ }),

/***/ 552:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";
/**
 * Plugin client
 */



/**
 * Module dependencies.
 */

var middleware = __nccwpck_require__(886);
var utils = __nccwpck_require__(440);

/**
 * Initialize a new `Plugin` client.
 */

function Plugin(jenkins) {
  this.jenkins = jenkins;
}

/**
 * List plugins
 */

Plugin.prototype.list = function(opts, callback) {
  var defaultOpts = { depth: 1 };  // depth of 0 is useless for plugins
  if (typeof opts === 'function') {
    callback = opts;
    opts = defaultOpts;
  } else {
    opts = opts || defaultOpts;
  }

  this.jenkins._log(['debug', 'plugin', 'list'], opts);

  var req = {
    name: 'plugin.list',
    path: '/pluginManager/api/json',
  };

  utils.options(req, opts);

  return this.jenkins._get(req, middleware.bodyItem('plugins'), callback);
};

/**
 * Module exports.
 */

exports.S = Plugin;


/***/ }),

/***/ 803:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";
/**
 * Queue client
 */



/**
 * Module dependencies.
 */

var middleware = __nccwpck_require__(886);
var utils = __nccwpck_require__(440);

/**
 * Initialize a new `Queue` client.
 */

function Queue(jenkins) {
  this.jenkins = jenkins;
}

/**
 * List queues
 */

Queue.prototype.list = function(opts, callback) {
  if (typeof opts === 'function') {
    callback = opts;
    opts = {};
  } else {
    opts = opts || {};
  }

  this.jenkins._log(['debug', 'queue', 'list'], opts);

  var req = {
    name: 'queue.list',
    path: '/queue/api/json',
  };

  utils.options(req, opts);

  return this.jenkins._get(req, middleware.bodyItem('items'), callback);
};

/**
 * Get an individual queue item
 */

Queue.prototype.item = function(opts, callback) {
  var arg0 = typeof arguments[0];

  if (arg0 === 'function') {
    callback = opts;
    opts = {};
  } else {
    if (arg0 === 'string' || arg0 === 'number') {
      opts = {
        number: opts
      };
    }
    opts = opts || {};
  }

  this.jenkins._log(['debug', 'queue', 'item'], opts);

  var req = {
    name: 'queue.item',
    path: '/queue/item/{number}/api/json',
    params: {
      number: opts.number
    }
  };

  utils.options(req, opts);

  if (!opts.number) {
    return callback(this.jenkins._err(new Error('number required'), req));
  }

  return this.jenkins._get(req, middleware.body, callback);
};

/**
 * Deprecated
 */

Queue.prototype.get = function(opts, callback) {
  if (typeof opts === 'function') {
    callback = opts;
    opts = {};
  } else {
    opts = opts || {};
  }

  this.list(opts, function(err, data) {
    if (err) return callback(err);

    callback(err, { items: data });
  });
};

/**
 * Cancel queue item
 */

Queue.prototype.cancel = function(opts, callback) {
  if (typeof opts !== 'object') {
    opts = { number: opts };
  } else {
    opts = opts || {};
  }

  this.jenkins._log(['debug', 'queue', 'cancel'], opts);

  var req = { name: 'queue.cancel' };

  utils.options(req, opts);

  try {
    if (!opts.number) throw new Error('number required');

    req.path = '/queue/item/{number}/cancelQueue';
    req.params = { number: opts.number };
  } catch (err) {
    return callback(this.jenkins._err(err, req));
  }

  return this.jenkins._post(
    req,
    middleware.require302('failed to cancel: ' + opts.number),
    middleware.empty,
    callback
  );
};

/**
 * Module exports.
 */

exports.c = Queue;


/***/ }),

/***/ 440:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";
/**
 * Helper functions
 */



/**
 * Module dependencies.
 */

var urlParse = (__nccwpck_require__(310).parse);

/**
 * Common options
 */

function options(req, opts) {
  if (!req.query) req.query = {};

  if (typeof opts.depth === 'number') {
    req.query.depth = opts.depth;
  }

  if (typeof opts.tree === 'string') {
    req.query.tree = opts.tree;
  }

  return opts;
}

/**
 * Raw path param
 */

function RawParam(value) {
  this.encode = false;
  this.value = value || '';
}

RawParam.prototype.toString = function() {
  return this.value;
};

/**
 * Parse job name from URL
 */

function parseName(value) {
  var jobParts = [];

  var pathParts = (urlParse(value).pathname || '').split('/').filter(Boolean);
  var state = 0;
  var part;

  // iterate until we find our first job, then collect the continuous job parts
  //   ['foo', 'job', 'a', 'job', 'b', 'bar', 'job', 'c'] => ['a', 'b']
  loop:
  for (var i = 0; i < pathParts.length; i++) {
    part = pathParts[i];

    switch (state) {
      case 0:
        if (part === 'job') state = 2;
        break;
      case 1:
        if (part !== 'job') break loop;
        state = 2;
        break;
      case 2:
        jobParts.push(part);
        state = 1;
        break;
    }
  }

  return jobParts.map(decodeURIComponent);
}

/**
 * Path for folder plugin
 */

function FolderPath(value) {
  if (!(this instanceof FolderPath)) {
    return new FolderPath(value);
  }
  if (Array.isArray(value)) {
    this.value = value;
  } else if (typeof value === 'string') {
    if (value.match('^https?:\/\/')) {
      this.value = parseName(value);
    } else {
      this.value = value.split('/').filter(Boolean);
    }
  } else {
    this.value = [];
  }
}

FolderPath.SEP = '/job/';

FolderPath.prototype.isEmpty = function() {
  return !this.value.length;
};

FolderPath.prototype.name = function() {
  return this.value[this.value.length - 1] || '';
};

FolderPath.prototype.path = function() {
  if (this.isEmpty()) return new RawParam();
  return new RawParam(FolderPath.SEP + this.value.map(encodeURIComponent).join(FolderPath.SEP));
};

FolderPath.prototype.parent = function() {
  return new FolderPath(this.value.slice(0, Math.max(0, this.value.length - 1)));
};

FolderPath.prototype.dir = function() {
  return this.parent().path();
};

/**
 * Default crumb issuser
 */

function crumbIssuer(jenkins, callback) {
  jenkins.crumbIssuer.get(function(err, data) {
    if (err) return callback(err);
    if (!data || !data.crumbRequestField || !data.crumb) {
      return callback(new Error('Failed to get crumb'));
    }

    callback(null, {
      headerName: data.crumbRequestField,
      headerValue: data.crumb,
      cookies: data.cookies,
    });
  });
}

/**
 * Check if object is file like
 */

function isFileLike(v) {
  return Buffer.isBuffer(v) ||
    v !== null &&
    typeof v === 'object' &&
    typeof v.pipe === 'function' &&
    v.readable !== false;
}

/**
 * Module exports
 */

exports.options = options;
exports.FolderPath = FolderPath;
exports.crumbIssuer = crumbIssuer;
exports.isFileLike = isFileLike;


/***/ }),

/***/ 320:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";
/**
 * View client
 */



/**
 * Module dependencies.
 */

var middleware = __nccwpck_require__(886);
var utils = __nccwpck_require__(440);

/**
 * Initialize a new `View` client.
 */

function View(jenkins) {
  this.jenkins = jenkins;
}

/**
 * Object meta
 */

View.meta = {};

/**
 * Create new view
 */

View.prototype.create = function(opts, callback) {
  var arg0 = typeof arguments[0];
  var arg1 = typeof arguments[1];
  var arg2 = typeof arguments[2];

  if (arg0 === 'string' && arg1 === 'string') {
    opts = {
      name: arguments[0],
      type: arguments[1],
    };
    callback = arg2 === 'function' ? arguments[2] : undefined;
  } else if (arg0 === 'string') {
    opts = {
      name: arguments[0],
      type: 'list',
    };
  }

  opts = opts || {};

  this.jenkins._log(['debug', 'view', 'create'], opts);

  var req = { name: 'view.create' };

  utils.options(req, opts);

  var shortcuts = {
    list: 'hudson.model.ListView',
    my: 'hudson.model.MyView',
  };

  try {
    var folder = utils.FolderPath(opts.name);
    var mode = shortcuts[opts.type] || opts.type;

    if (folder.isEmpty()) throw new Error('name required');
    if (!opts.type) throw new Error('type required');

    req.path = '{dir}/createView';
    req.type = 'form';
    req.params = { dir: folder.dir() };
    req.body = {
      name: folder.name(),
      mode: mode,
      json: JSON.stringify({
        name: folder.name(),
        mode: mode,
      }),
    };
  } catch (err) {
    return callback(this.jenkins._err(err, req));
  }

  return this.jenkins._post(
    req,
    middleware.require302('failed to create: ' + opts.name),
    middleware.empty,
    callback
  );
};

/**
 * Config list view
 */

View.prototype.config = function(opts, callback) {
  var arg0 = typeof arguments[0];
  var arg1 = typeof arguments[1];
  var arg2 = typeof arguments[2];

  if (arg0 === 'string') {
    opts = { name: arguments[0] };
    if (arg1 === 'string') {
      opts.xml = arguments[1];
      callback = arg2 === 'function' ? arguments[2] : undefined;
    } else {
      callback = arg1 === 'function' ? arguments[1] : undefined;
    }
  }

  opts = opts || {};

  this.jenkins._log(['debug', 'view', 'config'], opts);

  var req = {
    path: '{dir}/view/{name}/config.xml',
    name: 'view.config',
  };

  utils.options(req, opts);

  try {
    var folder = utils.FolderPath(opts.name);

    if (folder.isEmpty()) throw new Error('name required');

    req.params = { dir: folder.dir(), name: folder.name() };

    if (opts.xml) {
      req.method = 'POST';
      req.headers = { 'content-type': 'text/xml; charset=utf-8' };
      req.body = Buffer.from(opts.xml);
    } else {
      req.method = 'GET';
    }
  } catch (err) {
    return callback(this.jenkins._err(err, req));
  }

  return this.jenkins._request(
    req,
    middleware.notFound('view ' + opts.name),
    function(ctx, next) {
      if (ctx.err || opts.xml) return middleware.empty(ctx, next);

      next(false, null, ctx.res.body.toString('utf8'));
    },
    callback
  );
};

/**
 * Destroy view
 */

View.prototype.destroy = function(opts, callback) {
  if (typeof opts === 'string') {
    opts = { name: opts };
  } else {
    opts = opts || {};
  }

  this.jenkins._log(['debug', 'view', 'destroy'], opts);

  var req = { name: 'view.destroy' };

  utils.options(req, opts);

  try {
    var folder = utils.FolderPath(opts.name);

    if (folder.isEmpty()) throw new Error('name required');

    req.path = '{dir}/view/{name}/doDelete';
    req.params = { dir: folder.dir(), name: folder.name() };
  } catch (err) {
    return callback(this.jenkins._err(err, req));
  }

  return this.jenkins._post(
    req,
    middleware.notFound(opts.name),
    middleware.require302('failed to delete: ' + opts.name),
    middleware.empty,
    callback
  );
};

View.meta.delete = { type: 'alias' };

View.prototype.delete = View.prototype.destroy;

/**
 * View exists
 */

View.prototype.exists = function(opts, callback) {
  if (typeof opts === 'string') {
    opts = { name: opts };
  } else {
    opts = opts || {};
  }

  this.jenkins._log(['debug', 'view', 'exists'], opts);

  var req = { name: 'view.exists' };

  utils.options(req, opts);

  try {
    var folder = utils.FolderPath(opts.name);

    if (folder.isEmpty()) throw new Error('name required');

    req.path = '{dir}/view/{name}/api/json';
    req.params = { dir: folder.dir(), name: folder.name() };
  } catch (err) {
    return callback(this.jenkins._err(err, req));
  }

  return this.jenkins._head(req, middleware.exists, callback);
};

/**
 * View details
 */

View.prototype.get = function(opts, callback) {
  var arg0 = typeof arguments[0];
  var arg1 = typeof arguments[1];
  var arg2 = typeof arguments[2];

  if (arg0 === 'string') {
    if (arg1 === 'object') {
      opts = arguments[1];
      callback = arg2 === 'function' ? arguments[2] : undefined;
    } else {
      opts = {};
      callback = arg1 === 'function' ? arguments[1] : undefined;
    }
    opts.name = arguments[0];
  } else {
    opts = opts || {};
  }

  this.jenkins._log(['debug', 'view', 'get'], opts);

  var req = { name: 'view.get' };

  utils.options(req, opts);

  try {
    var folder = utils.FolderPath(opts.name);

    if (folder.isEmpty()) throw new Error('name required');

    req.path = '{dir}/view/{name}/api/json';
    req.params = { dir: folder.dir(), name: folder.name() };
  } catch (err) {
    return callback(this.jenkins._err(err, req));
  }

  return this.jenkins._get(
    req,
    middleware.notFound(opts.name),
    middleware.body,
    callback
  );
};

/**
 * List views
 */

View.prototype.list = function(opts, callback) {
  if (typeof opts === 'function') {
    callback = opts;
    opts = {};
  } else if (typeof opts === 'string') {
    opts = { name: opts };
  } else {
    opts = opts || {};
  }

  this.jenkins._log(['debug', 'view', 'list'], opts);

  var req = {
    name: 'view.list',
    path: '{folder}/api/json',
  };

  try {
    var folder = utils.FolderPath(opts.name);

    req.params = { folder: folder.path() };
  } catch (err) {
    return callback(this.jenkins._err(err, req));
  }

  utils.options(req, opts);

  return this.jenkins._get(
    req,
    function(ctx, next) {
      if (ctx.err) return next();

      if (!ctx.res.body || !Array.isArray(ctx.res.body.views)) {
        ctx.err = new Error('returned bad data');
      }

      next();
    },
    middleware.bodyItem('views'),
    callback
  );
};

/**
 * Add job
 */

View.prototype.add = function(opts, callback) {
  var arg0 = typeof arguments[0];
  var arg1 = typeof arguments[1];
  var arg2 = typeof arguments[2];

  if (arg0 === 'string' && arg1 === 'string') {
    opts = {
      name: arguments[0],
      job: arguments[1],
    };
    callback = arg2 === 'function' ? arguments[2] : undefined;
  }

  opts = opts || {};

  this.jenkins._log(['debug', 'view', 'add'], opts);

  var req = {
    path: '{dir}/view/{name}/addJobToView',
    query: { name: opts.job },
    type: 'form',
    name: 'view.add',
    body: {},
  };

  utils.options(req, opts);

  try {
    var folder = utils.FolderPath(opts.name);

    if (folder.isEmpty()) throw new Error('name required');
    if (!opts.job) throw new Error('job required');

    req.params = { dir: folder.dir(), name: folder.name() };
  } catch (err) {
    return callback(this.jenkins._err(err, req));
  }

  return this.jenkins._post(
    req,
    middleware.empty,
    callback
  );
};

/**
 * Remove job
 */

View.prototype.remove = function(opts, callback) {
  var arg0 = typeof arguments[0];
  var arg1 = typeof arguments[1];
  var arg2 = typeof arguments[2];

  if (arg0 === 'string' && arg1 === 'string') {
    opts = {
      name: arguments[0],
      job: arguments[1],
    };
    callback = arg2 === 'function' ? arguments[2] : undefined;
  }

  opts = opts || {};

  this.jenkins._log(['debug', 'view', 'remove'], opts);

  var req = {
    path: '{dir}/view/{name}/removeJobFromView',
    query: { name: opts.job },
    type: 'form',
    name: 'view.remove',
    body: {},
  };

  utils.options(req, opts);

  try {
    var folder = utils.FolderPath(opts.name);

    if (folder.isEmpty()) throw new Error('name required');
    if (!opts.job) throw new Error('job required');

    req.params = { dir: folder.dir(), name: folder.name() };
  } catch (err) {
    return callback(this.jenkins._err(err, req));
  }

  return this.jenkins._post(
    req,
    middleware.empty,
    callback
  );
};

/**
 * Module exports.
 */

exports.G = View;


/***/ }),

/***/ 494:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";
/**
 * HTTP client.
 */



/**
 * Module dependencies.
 */

var events = __nccwpck_require__(361);
var http = __nccwpck_require__(685);
var https = __nccwpck_require__(687);
var url = __nccwpck_require__(310);
var util = __nccwpck_require__(837);

var constants = __nccwpck_require__(761);
var errors = __nccwpck_require__(893);
var meta = __nccwpck_require__(71);
var utils = __nccwpck_require__(603);

/**
 * Client
 */

function Client(opts) {
  if (!(this instanceof Client)) {
    return new Client(opts);
  }

  events.EventEmitter.call(this);

  opts = opts || {};

  if (typeof opts === 'string') {
    opts = { baseUrl: opts };
  } else {
    opts = utils.merge(opts);
  }

  if (!opts.baseUrl) {
    throw errors.Validation('baseUrl required');
  }

  if (!(opts.baseUrl instanceof url.Url)) {
    if (typeof opts.baseUrl !== 'string') {
      throw errors.Validation('baseUrl must be a string: ' + opts.baseUrl);
    }

    opts.baseUrl = url.parse(opts.baseUrl);
  }

  var path = opts.baseUrl.pathname;
  opts.baseUrl = utils.pick(opts.baseUrl,
    'auth', 'hostname', 'port', 'protocol');
  opts.baseUrl.path = path;

  if (opts.baseUrl.path === '/') {
    opts.baseUrl.path = '';
  } else if (opts.baseUrl.path[opts.baseUrl.path.length - 1] === '/') {
    throw errors.Validation('baseUrl must not end with a forward slash');
  }

  opts.headers = utils.mergeHeaders(opts.headers);
  if (opts.tags) {
    if (Array.isArray(opts.tags)) {
      opts.tags = opts.tags.slice(0);
    } else {
      throw errors.Validation('tags must be an array');
    }
  } else {
    opts.tags = [];
  }

  if (opts.name && !~opts.tags.indexOf(opts.name)) {
    opts.tags.push(opts.name);
  }

  opts.encoders = utils.merge(constants.ENCODERS, opts.encoders);
  opts.decoders = utils.merge(constants.DECODERS, opts.decoders);

  this._opts = opts;
  this._exts = {};
}

util.inherits(Client, events.EventEmitter);

/**
 * Add information to error
 */

Client.prototype._err = function(err, opts) {
  if (!err) return err;

  if (!(err instanceof Error)) err = new Error(err);

  if (opts && opts.name) {
    err.message = util.format('%s: %s', opts.name, err.message);
  }

  if (this._opts.name) {
    err.message = util.format('%s: %s', this._opts.name, err.message);
  }

  return err;
};

/**
 * Register an extension
 */

Client.prototype._ext = function(eventName, callback) {
  if (!eventName || typeof eventName !== 'string') {
    throw this._err(errors.Validation('extension eventName required'));
  }

  if (typeof callback !== 'function') {
    throw this._err(errors.Validation('extension callback required'));
  }

  if (!this._exts[eventName]) this._exts[eventName] = [];

  this._exts[eventName].push(callback);
};

/**
 * Register a plugin
 */

Client.prototype._plugin = function(plugin, options) {
  if (!plugin) {
    throw this._err(errors.Validation('plugin required'));
  }

  if (typeof plugin.register !== 'function') {
    throw this._err(errors.Validation('plugin must have register function'));
  }

  var attributes = plugin.register.attributes;

  if (!attributes) {
    throw this._err(errors.Validation('plugin attributes required'));
  }

  if (!attributes.name) {
    throw this._err(errors.Validation('plugin attributes name required'));
  }

  if (!attributes.version) {
    throw this._err(errors.Validation('plugin attributes version required'));
  }

  return plugin.register(this, options || {});
};

/**
 * Log request events
 */

Client.prototype._log = function(tags, data) {
  return this.emit('log', tags, data);
};

/**
 * Encode
 */

Client.prototype._encode = function(mime, value) {
  if (!this._opts.encoders[mime]) {
    throw errors.Codec('unknown encoder: ' + mime);
  }

  try {
    return this._opts.encoders[mime](value);
  } catch (err) {
    err.message = 'encode (' + mime + ') failed: ' + err.message;
    throw errors.Codec(err);
  }
};

/**
 * Decode
 */

Client.prototype._decode = function(mime, value) {
  if (!this._opts.decoders[mime]) {
    throw errors.Codec('unknown decoder: ' + mime);
  }

  try {
    return this._opts.decoders[mime](value);
  } catch (err) {
    err.message = 'decode (' + mime + ') failed: ' + err.message;
    throw errors.Codec(err);
  }
};

/**
 * Push ext list
 */

Client.prototype.__push = function(request, name) {
  if (this._exts[name]) {
    request._stack.push.apply(request._stack, this._exts[name]);
  }

  if (request.opts && request.opts.exts && request.opts.exts[name]) {
    if (Array.isArray(request.opts.exts[name])) {
      request._stack.push.apply(request._stack, request.opts.exts[name]);
    } else {
      request._stack.push(request.opts.exts[name]);
    }
  }
};

/**
 * Run request pipeline
 */

Client.prototype._request = function(opts) {
  var self = this;

  var request;

  if (this.__request) {
    request = this.__request;
    opts = request.opts;
    self = request._client;
  } else {
    request = {
      _args: Array.prototype.slice.call(arguments),
      _client: this,
      opts: opts,
      state: {},
    };

    if (!opts) opts = request.opts = {};

    if (request._args.length > 1) {
      request._callback = request._args[request._args.length - 1];
    } else {
      return self.emit('error', self._err(
        errors.Validation('callback required'), opts));
    }

    // if ctx is an event emitter we use it to abort requests when done is
    // emitted
    if (opts.ctx instanceof events.EventEmitter) {
      request.ctx = opts.ctx;
    }

    // combine global and request tags
    opts.tags = (opts.tags || []).concat(self._opts.tags);

    // inject request name into tags if not already defined
    if (opts.name && !~opts.tags.indexOf(opts.name)) {
      opts.tags.push(opts.name);
    }

    if (!opts.headers) opts.headers = {};
    if (!opts.params) opts.params = {};
    if (!opts.query) opts.query = {};

    // restart request
    request.retry = function() {
      if (request._retryable === false) {
        throw errors.Validation('request is not retryable');
      }

      self._log(['papi', 'request', 'retry'].concat(request.opts.tags));

      delete request.body;
      delete request.err;
      delete request.req;
      delete request.res;
      delete request.transport;

      self._request.call({ __request: request });
    };

    request._stack = [];

    self.__push(request, 'onCreate');

    request._stack.push(self.__create);

    self.__push(request, 'onRequest');

    request._stack.push(self.__execute);

    self.__push(request, 'onResponse');

    request._stack.push.apply(
      request._stack,
      request._args.slice(1, request._args.length - 1)
    );
  }

  var i = 0;
  function next(err) {
    if (err) return request._callback(self._err(err, opts));

    // middlware can call next(false, args...) to stop middleware
    if (err === false) {
      return request._callback.apply(null,
        Array.prototype.slice.call(arguments, 1));
    }

    var fn = request._stack[i++];
    if (fn) {
      fn.call(self, request, next);
    } else {
      request._callback.call(self, self._err(request.err, opts), request.res);
    }
  }

  next();
};

/**
 * Create HTTP request
 */

Client.prototype.__create = function(request, next) {
  var self = this;

  var opts = request.opts;
  var path = opts.path;

  if (typeof path !== 'string') {
    return next(errors.Validation('path required'));
  }

  var headers = utils.mergeHeaders(self._opts.headers, opts.headers);

  // path
  try {
    path = path.replace(/\{(\w+)\}/g, function(src, dst) {
      if (!opts.params.hasOwnProperty(dst)) {
        throw errors.Validation('missing param: ' + dst);
      }

      var part = opts.params[dst] || '';

      // optionally disable param encoding
      return part.encode === false && part.toString ?
        part.toString() : encodeURIComponent(part);
    });
  } catch (err) {
    return next(err);
  }

  // query
  if (!utils.isEmpty(opts.query)) {
    try {
      path += '?' + self._encode('application/x-www-form-urlencoded',
                                 opts.query).toString();
    } catch (err) {
      return next(err);
    }
  }

  // body
  if (opts.body !== undefined) {
    var mime = constants.MIME_ALIAS[opts.type] ||
      headers['content-type'] ||
      constants.MIME_ALIAS[self._opts.type];

    var isFunction = typeof opts.body === 'function';

    if (isFunction) {
      try {
        request.body = opts.body();
      } catch (err) {
        return next(err);
      }
    } else {
      request.body = opts.body;
    }

    var isBuffer = Buffer.isBuffer(request.body);
    var isStream = utils.isReadableStream(request.body);

    if (!isBuffer && !isStream && !mime) {
      return next(errors.Validation('type required'));
    }

    if (!isBuffer && !isStream) {
      if (self._opts.encoders[mime]) {
        try {
          request.body = this._encode(mime, request.body);
        } catch (err) {
          return next(err);
        }
      } else {
        return next(errors.Codec('type is unknown: ' + mime));
      }
    }

    if (!headers['content-type'] && mime) {
      headers['content-type'] = mime + '; charset=' + constants.CHARSET;
    }

    if (isStream) {
      if (!isFunction) request._retryable = false;
    } else {
      headers['content-length'] = request.body.length;
    }
  } else if (!~constants.EXCLUDE_CONTENT_LENGTH.indexOf(opts.method)) {
    headers['content-length'] = 0;
  }

  // response pipe
  if (opts.pipe) {
    var isPipeFunction = typeof opts.pipe === 'function';

    if (isPipeFunction) {
      try {
        request.pipe = opts.pipe();
      } catch (err) {
        return next(err);
      }
    } else {
      request.pipe = opts.pipe;

      request._retryable = false;
    }

    if (!utils.isWritableStream(request.pipe)) {
      return next(errors.Validation('pipe must be a writable stream'));
    }
  }

  // build http.request options
  request.req = utils.merge(
    utils.pick(self._opts, constants.CLIENT_OPTIONS),
    utils.pick(self._opts.baseUrl, 'auth', 'hostname', 'port', 'path'),
    utils.pick(opts, constants.REQUEST_OPTIONS),
    { headers: headers }
  );

  // append request path to baseUrl
  request.req.path += path;

  // pick http transport
  if (self._opts.baseUrl.protocol === 'https:') {
    request.transport = https;
    if (!request.req.port) request.req.port = 443;
  } else {
    request.transport = http;
    if (!request.req.port) request.req.port = 80;
  }

  if (request.req.auth === null) delete request.req.auth;

  next();
};

/**
 * Execute HTTP request
 */

Client.prototype.__execute = function(request, next) {
  var self = this;

  if (request.ctx) {
    if (request.ctx.canceled === true) {
      return next(errors.Validation('ctx already canceled'));
    } else if (request.ctx.finished === true) {
      return next(errors.Validation('ctx already finished'));
    }
  }

  var done = false;

  var opts = request.opts;

  var abort;
  var timeoutId;
  var timeout = opts.hasOwnProperty('timeout') ?
    opts.timeout : self._opts.timeout;

  self._log(['papi', 'request'].concat(opts.tags), request.req);

  var req = request.transport.request(request.req);

  var userAgent = req.getHeader('user-agent');

  if (userAgent === undefined) {
    req.setHeader('user-agent', 'papi/' + meta.version);
  } else if (userAgent === null) {
    req.removeHeader('user-agent');
  }

  req.on('error', function(err) {
    self._log(['papi', 'request', 'error'].concat(opts.tags), err);

    if (done) return;
    done = true;

    if (abort) request.ctx.removeListener('cancel', abort);
    if (timeoutId) clearTimeout(timeoutId);

    request.err = err;
    next();
  });

  if (request.ctx) {
    abort = function() {
      req.abort();
      req.emit('error', errors.Abort('request aborted'));
    };

    request.ctx.once('cancel', abort);
  }

  // set request and absolute timeout
  if (timeout && timeout > 0) {
    timeoutId = setTimeout(function() {
      req.emit('timeout');
      req.abort();
    }, timeout);

    req.setTimeout(timeout);
  }

  req.on('timeout', function(err) {
    self._log(['papi', 'request', 'error', 'timeout'].concat(opts.tags));
    if (err) {
      err = errors.Timeout(err);
    } else {
      err = errors.Timeout('request timed out (' + timeout + 'ms)');
    }
    req.emit('error', err);
  });

  req.on('response', function(res) {
    var chunks = [];
    var bodyLength = 0;

    self._log(['papi', 'response'].concat(opts.tags), {
      method: opts.method,
      path: req.path,
      statusCode: res.statusCode,
      headers: res.headers,
      remoteAddress: res.connection && res.connection.remoteAddress,
      remotePort: res.connection && res.connection.remotePort,
    });

    request.res = res;

    if (request.pipe) {
      res.pipe(request.pipe);
    } else {
      res.on('data', function(chunk) {
        chunks.push(chunk);
        bodyLength += chunk.length;
      });
    }

    res.on('end', function() {
      if (done) return;
      done = true;

      if (abort) request.ctx.removeListener('cancel', abort);
      if (timeoutId) clearTimeout(timeoutId);

      // body content mime
      var mime;

      // decode body
      if (bodyLength) {
        res.body = Buffer.concat(chunks, bodyLength);

        // don't decode if user explicitly asks for buffer
        if (!opts.buffer) {
          mime = (res.headers['content-type'] || '').split(';')[0].trim();

          if (self._opts.decoders[mime]) {
            try {
              res.body = self._decode(mime, res.body);
            } catch (err) {
              request.err = err;
              return next();
            }
          }
        }
      }

      // any non-200 is consider an error
      if (Math.floor(res.statusCode / 100) !== 2) {
        var err = errors.Response();

        if (res.body && mime === 'text/plain' && res.body.length < 80) {
          err.message = res.body;
        }

        if (!err.message) {
          if (http.STATUS_CODES[res.statusCode]) {
            err.message = http.STATUS_CODES[res.statusCode].toLowerCase();
          } else {
            err.message = 'request failed: ' + res.statusCode;
          }
        }

        err.statusCode = res.statusCode;

        request.err = err;
      }

      next();
    });
  });

  if (utils.isReadableStream(request.body)) {
    request.body.pipe(req);
  } else {
    req.end(request.body);
  }
};

/**
 * Shortcuts
 */

constants.METHODS.forEach(function(method) {
  var reqMethod = method.toUpperCase();

  Client.prototype['_' + method] = function(opts) {
    var args;

    if (typeof opts === 'string') {
      opts = { path: opts, method: reqMethod };

      args = Array.prototype.slice.call(arguments);
      args[0] = opts;

      return this._request.apply(this, args);
    } else if (!opts) {
      args = Array.prototype.slice.call(arguments);
      args[0] = {};

      return this._request.apply(this, args);
    }

    opts.method = reqMethod;

    return this._request.apply(this, arguments);
  };
});

/**
 * Module exports.
 */

exports.K = Client;


/***/ }),

/***/ 34:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";
/**
 * Encoders/Decoders
 */



/**
 * Module dependencies.
 */

var querystring = __nccwpck_require__(477);

/**
 * Text
 */

var text = {};

text.encode = function(data) {
  return Buffer.from(data, 'utf8');
};

text.decode = function(data) {
  return Buffer.isBuffer(data) ? data.toString() : data;
};

/**
 * JSON
 */

var json = {};

json.encode = function(data) {
  return text.encode(JSON.stringify(data));
};

json.decode = function(data) {
  return JSON.parse(text.decode(data));
};

/**
 * Form
 */

var form = {};

form.encode = function(data) {
  return text.encode(querystring.stringify(data));
};

form.decode = function(data) {
  return querystring.parse(text.decode(data));
};

/**
 * Module exports.
 */

exports.json = json;
exports.form = form;
exports.text = text;


/***/ }),

/***/ 761:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


/**
 * Module dependencies.
 */

var codecs = __nccwpck_require__(34);

/**
 * Constants
 */

exports.CHARSET = 'utf-8';

exports.ENCODERS = {
  'application/json': codecs.json.encode,
  'application/x-www-form-urlencoded': codecs.form.encode,
  'text/plain': codecs.text.encode,
};

exports.DECODERS = {
  'application/json': codecs.json.decode,
  'application/x-www-form-urlencoded': codecs.form.decode,
  'text/html': codecs.text.decode,
  'text/json': codecs.json.decode,
  'text/plain': codecs.text.decode,
};

exports.METHODS = [
  'options',
  'get',
  'head',
  'post',
  'put',
  'delete',
  'patch',
];

exports.MIME_ALIAS = {
  form: 'application/x-www-form-urlencoded',
  json: 'application/json',
  qs: 'application/x-www-form-urlencoded',
  querystring: 'application/x-www-form-urlencoded',
  text: 'text/plain',
};

exports.EXCLUDE_CONTENT_LENGTH = [
  'GET',
  'HEAD',
  'OPTIONS',
];

exports.CLIENT_OPTIONS = [
  'agent',
  // tls
  'ca',
  'cert',
  'ciphers',
  'clientCertEngine',
  'crl',
  'dhparam',
  'ecdhCurve',
  'honorCipherOrder',
  'key',
  'passphrase',
  'pfx',
  'rejectUnauthorized',
  'secureOptions',
  'secureProtocol',
  'servername',
  'sessionIdContext',
];

exports.REQUEST_OPTIONS = exports.CLIENT_OPTIONS.concat([
  'method',
]);


/***/ }),

/***/ 893:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
/**
 * Errors
 */



/**
 * Create
 */

function create(message) {
  var error = message instanceof Error ?
    message :
    new Error(message ? message : undefined);

  error.isPapi = true;

  return error;
}

/**
 * Codec
 */

function codec(message) {
  var error = create(message);

  error.isCodec = true;

  return error;
}

/**
 * Response
 */

function response(message) {
  var error = create(message);

  error.isResponse = true;

  return error;
}

/**
 * Abort
 */

function abort(message) {
  var error = create(message);

  error.isAbort = true;

  return error;
}

/**
 * Timeout
 */

function timeout(message) {
  var error = create(message);

  error.isTimeout = true;

  return error;
}

/**
 * Validation
 */

function validation(message) {
  var error = create(message);

  error.isValidation = true;

  return error;
}

/**
 * Module exports.
 */

exports.Codec = codec;
exports.Response = response;
exports.Abort = abort;
exports.Timeout = timeout;
exports.Validation = validation;
exports.create = create;


/***/ }),

/***/ 107:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


/**
 * Module dependencies.
 */

var Client = (__nccwpck_require__(494)/* .Client */ .K);
var codecs = __nccwpck_require__(34);
var shortcuts = __nccwpck_require__(171);
var tools = __nccwpck_require__(105);

/**
 * Module exports.
 */

exports.Client = Client;

exports.request = shortcuts.request;
exports.get = shortcuts.method('GET');
exports.head = shortcuts.method('HEAD');
exports.post = shortcuts.method('POST');
exports.put = shortcuts.method('PUT');
exports.del = exports["delete"] = shortcuts.method('DELETE');
exports.patch = shortcuts.method('PATCH');

exports.codecs = codecs;
exports.tools = tools;


/***/ }),

/***/ 171:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


/**
 * Module dependencies.
 */

var url = __nccwpck_require__(310);

var Client = (__nccwpck_require__(494)/* .Client */ .K);
var errors = __nccwpck_require__(893);

/**
 * Request.
 */

function request(opts) {
  if (typeof opts === 'string') {
    arguments[0] = opts = { method: 'get', url: opts };
  } else {
    opts = opts || {};
  }

  try {
    if (!opts.url) {
      throw errors.Validation('url required');
    }

    if (typeof opts.url !== 'string') {
      throw errors.Validation('url must be a string');
    }

    var baseUrl = url.parse(opts.url);

    opts.path = baseUrl.pathname.replace('%7B', '{').replace('%7D', '}');
    baseUrl.pathname = '';

    var client = new Client({ baseUrl: baseUrl });

    delete opts.url;

    client._request.apply(client, arguments);
  } catch (err) {
    var callback = arguments[arguments.length - 1];

    if (typeof callback !== 'function') {
      err.message = 'no callback: ' + err.message;
      throw err;
    }

    callback(err);
  }
}

/**
 * Method.
 */

function method(name) {
  return function(opts) {
    if (typeof opts === 'string') {
      arguments[0] = opts = { url: opts };
    } else {
      opts = opts || {};
    }

    opts.method = name;

    request.apply(null, arguments);
  };
}

/**
 * Module exports.
 */

exports.method = method;
exports.request = request;


/***/ }),

/***/ 105:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
/**
 * Random useful tools.
 */



/**
 * Walk "standard" library
 */

function walk(obj, name, tree) {
  switch (arguments.length) {
    case 1:
      name = obj.name;
      tree = { name: name };
      break;
    case 2:
      tree = { name: name };
      break;
    case 3:
      break;
    default:
      throw new Error('invalid arguments');
  }

  Object.keys(obj.prototype).forEach(function(key) {
    var v = obj.prototype[key];

    if (!key.match(/^[a-z]+/)) return;
    if (!tree.methods) tree.methods = {};

    tree.methods[key] = {
      name: key,
      value: v,
    };

    var meta = obj.meta || {};

    tree.methods[key].type = meta[key] && meta[key].type || 'callback';
  });

  Object.keys(obj).forEach(function(key) {
    var v = obj[key];

    if (!key.match(/^[A-Z]+/)) return;
    if (!tree.objects) tree.objects = {};

    tree.objects[key] = {
      name: key,
      value: v,
    };

    walk(v, key, tree.objects[key]);
  });

  return tree;
}

/**
 * Callback wrapper
 */

function fromCallback(fn) {
  return new Promise(function(resolve, reject) {
    try {
      return fn(function(err, data) {
        if (err) return reject(err);
        return resolve(data);
      });
    } catch (err) {
      return reject(err);
    }
  });
}

/**
 * Wrap callbacks with promises
 */

function promisify(client, wrapper) {
  if (!client) throw new Error('client required');
  if (!wrapper) {
    if (global.Promise) {
      wrapper = fromCallback;
    } else {
      throw new Error('wrapper required');
    }
  } else if (typeof wrapper !== 'function') {
    throw new Error('wrapper must be a function');
  }

  var patch = function(client, tree) {
    Object.keys(tree.methods).forEach(function(key) {
      var method = tree.methods[key];
      var fn = client[method.name];

      if (method.type === 'callback' && !client[method.name]._wrapCallback) {
        client[method.name] = function() {
          // use callback if provided
          if (typeof arguments[arguments.length - 1] === 'function') {
            return fn.apply(client, arguments);
          }

          // otherwise return promise
          var args = Array.prototype.slice.call(arguments);
          return wrapper(function(callback) {
            args.push(callback);
            return fn.apply(client, args);
          });
        };
        client[method.name]._wrapped = true;
      }
    });

    if (tree.objects) {
      Object.keys(tree.objects).forEach(function(key) {
        var clientKey = key[0].toLowerCase() + key.slice(1);
        patch(client[clientKey], tree.objects[key]);
      });
    }
  };

  patch(client, walk(client.constructor));
}

/**
 * Module exports.
 */

exports.promisify = promisify;
exports.walk = walk;


/***/ }),

/***/ 603:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
/**
 * Helper functions
 */



/**
 * Check if object is empty
 */

function isEmpty(obj) {
  if (!obj) return true;

  for (var p in obj) {
    if (obj.hasOwnProperty(p)) return false;
  }

  return true;
}

/**
 * Check stream
 */

function isStream(s) {
  return s !== null &&
    typeof s === 'object' &&
    typeof s.pipe === 'function';
}

/**
 * Check readable stream
 */

function isReadableStream(s) {
  return isStream(s) && s.readable !== false;
}

/**
 * Check writiable stream
 */

function isWritableStream(s) {
  return isStream(s) && s.writable !== false;
}

/**
 * Merge in objects
 */

function merge() {
  var data = {};

  if (!arguments.length) return data;

  var args = Array.prototype.slice.call(arguments, 0);

  args.forEach(function(obj) {
    if (!obj) return;

    Object.keys(obj).forEach(function(key) {
      data[key] = obj[key];
    });
  });

  return data;
}

/**
 * Merge headers
 */

function mergeHeaders() {
  var data = {};

  if (!arguments.length) return data;

  var args = Array.prototype.slice.call(arguments, 0);

  args.forEach(function(obj) {
    if (!obj) return;

    Object.keys(obj).forEach(function(key) {
      data[key.toLowerCase()] = obj[key];
    });
  });

  return data;
}

/**
 * Create a shallow copy of obj composed of the specified properties.
 */

function pick(obj) {
  var args = Array.prototype.slice.call(arguments);
  args.shift();

  if (args.length === 1 && Array.isArray(args[0])) {
    args = args[0];
  }

  var result = {};

  args.forEach(function(name) {
    if (obj.hasOwnProperty(name)) {
      result[name] = obj[name];
    }
  });

  return result;
}

/**
 * Module exports.
 */

exports.isEmpty = isEmpty;
exports.isReadableStream = isReadableStream;
exports.isWritableStream = isWritableStream;
exports.merge = merge;
exports.mergeHeaders = mergeHeaders;
exports.pick = pick;


/***/ }),

/***/ 294:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

module.exports = __nccwpck_require__(219);


/***/ }),

/***/ 219:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


var net = __nccwpck_require__(808);
var tls = __nccwpck_require__(404);
var http = __nccwpck_require__(685);
var https = __nccwpck_require__(687);
var events = __nccwpck_require__(361);
var assert = __nccwpck_require__(491);
var util = __nccwpck_require__(837);


exports.httpOverHttp = httpOverHttp;
exports.httpsOverHttp = httpsOverHttp;
exports.httpOverHttps = httpOverHttps;
exports.httpsOverHttps = httpsOverHttps;


function httpOverHttp(options) {
  var agent = new TunnelingAgent(options);
  agent.request = http.request;
  return agent;
}

function httpsOverHttp(options) {
  var agent = new TunnelingAgent(options);
  agent.request = http.request;
  agent.createSocket = createSecureSocket;
  agent.defaultPort = 443;
  return agent;
}

function httpOverHttps(options) {
  var agent = new TunnelingAgent(options);
  agent.request = https.request;
  return agent;
}

function httpsOverHttps(options) {
  var agent = new TunnelingAgent(options);
  agent.request = https.request;
  agent.createSocket = createSecureSocket;
  agent.defaultPort = 443;
  return agent;
}


function TunnelingAgent(options) {
  var self = this;
  self.options = options || {};
  self.proxyOptions = self.options.proxy || {};
  self.maxSockets = self.options.maxSockets || http.Agent.defaultMaxSockets;
  self.requests = [];
  self.sockets = [];

  self.on('free', function onFree(socket, host, port, localAddress) {
    var options = toOptions(host, port, localAddress);
    for (var i = 0, len = self.requests.length; i < len; ++i) {
      var pending = self.requests[i];
      if (pending.host === options.host && pending.port === options.port) {
        // Detect the request to connect same origin server,
        // reuse the connection.
        self.requests.splice(i, 1);
        pending.request.onSocket(socket);
        return;
      }
    }
    socket.destroy();
    self.removeSocket(socket);
  });
}
util.inherits(TunnelingAgent, events.EventEmitter);

TunnelingAgent.prototype.addRequest = function addRequest(req, host, port, localAddress) {
  var self = this;
  var options = mergeOptions({request: req}, self.options, toOptions(host, port, localAddress));

  if (self.sockets.length >= this.maxSockets) {
    // We are over limit so we'll add it to the queue.
    self.requests.push(options);
    return;
  }

  // If we are under maxSockets create a new one.
  self.createSocket(options, function(socket) {
    socket.on('free', onFree);
    socket.on('close', onCloseOrRemove);
    socket.on('agentRemove', onCloseOrRemove);
    req.onSocket(socket);

    function onFree() {
      self.emit('free', socket, options);
    }

    function onCloseOrRemove(err) {
      self.removeSocket(socket);
      socket.removeListener('free', onFree);
      socket.removeListener('close', onCloseOrRemove);
      socket.removeListener('agentRemove', onCloseOrRemove);
    }
  });
};

TunnelingAgent.prototype.createSocket = function createSocket(options, cb) {
  var self = this;
  var placeholder = {};
  self.sockets.push(placeholder);

  var connectOptions = mergeOptions({}, self.proxyOptions, {
    method: 'CONNECT',
    path: options.host + ':' + options.port,
    agent: false,
    headers: {
      host: options.host + ':' + options.port
    }
  });
  if (options.localAddress) {
    connectOptions.localAddress = options.localAddress;
  }
  if (connectOptions.proxyAuth) {
    connectOptions.headers = connectOptions.headers || {};
    connectOptions.headers['Proxy-Authorization'] = 'Basic ' +
        new Buffer(connectOptions.proxyAuth).toString('base64');
  }

  debug('making CONNECT request');
  var connectReq = self.request(connectOptions);
  connectReq.useChunkedEncodingByDefault = false; // for v0.6
  connectReq.once('response', onResponse); // for v0.6
  connectReq.once('upgrade', onUpgrade);   // for v0.6
  connectReq.once('connect', onConnect);   // for v0.7 or later
  connectReq.once('error', onError);
  connectReq.end();

  function onResponse(res) {
    // Very hacky. This is necessary to avoid http-parser leaks.
    res.upgrade = true;
  }

  function onUpgrade(res, socket, head) {
    // Hacky.
    process.nextTick(function() {
      onConnect(res, socket, head);
    });
  }

  function onConnect(res, socket, head) {
    connectReq.removeAllListeners();
    socket.removeAllListeners();

    if (res.statusCode !== 200) {
      debug('tunneling socket could not be established, statusCode=%d',
        res.statusCode);
      socket.destroy();
      var error = new Error('tunneling socket could not be established, ' +
        'statusCode=' + res.statusCode);
      error.code = 'ECONNRESET';
      options.request.emit('error', error);
      self.removeSocket(placeholder);
      return;
    }
    if (head.length > 0) {
      debug('got illegal response body from proxy');
      socket.destroy();
      var error = new Error('got illegal response body from proxy');
      error.code = 'ECONNRESET';
      options.request.emit('error', error);
      self.removeSocket(placeholder);
      return;
    }
    debug('tunneling connection has established');
    self.sockets[self.sockets.indexOf(placeholder)] = socket;
    return cb(socket);
  }

  function onError(cause) {
    connectReq.removeAllListeners();

    debug('tunneling socket could not be established, cause=%s\n',
          cause.message, cause.stack);
    var error = new Error('tunneling socket could not be established, ' +
                          'cause=' + cause.message);
    error.code = 'ECONNRESET';
    options.request.emit('error', error);
    self.removeSocket(placeholder);
  }
};

TunnelingAgent.prototype.removeSocket = function removeSocket(socket) {
  var pos = this.sockets.indexOf(socket)
  if (pos === -1) {
    return;
  }
  this.sockets.splice(pos, 1);

  var pending = this.requests.shift();
  if (pending) {
    // If we have pending requests and a socket gets closed a new one
    // needs to be created to take over in the pool for the one that closed.
    this.createSocket(pending, function(socket) {
      pending.request.onSocket(socket);
    });
  }
};

function createSecureSocket(options, cb) {
  var self = this;
  TunnelingAgent.prototype.createSocket.call(self, options, function(socket) {
    var hostHeader = options.request.getHeader('host');
    var tlsOptions = mergeOptions({}, self.options, {
      socket: socket,
      servername: hostHeader ? hostHeader.replace(/:.*$/, '') : options.host
    });

    // 0 is dummy port for v0.6
    var secureSocket = tls.connect(0, tlsOptions);
    self.sockets[self.sockets.indexOf(socket)] = secureSocket;
    cb(secureSocket);
  });
}


function toOptions(host, port, localAddress) {
  if (typeof host === 'string') { // since v0.10
    return {
      host: host,
      port: port,
      localAddress: localAddress
    };
  }
  return host; // for v0.11 or later
}

function mergeOptions(target) {
  for (var i = 1, len = arguments.length; i < len; ++i) {
    var overrides = arguments[i];
    if (typeof overrides === 'object') {
      var keys = Object.keys(overrides);
      for (var j = 0, keyLen = keys.length; j < keyLen; ++j) {
        var k = keys[j];
        if (overrides[k] !== undefined) {
          target[k] = overrides[k];
        }
      }
    }
  }
  return target;
}


var debug;
if (process.env.NODE_DEBUG && /\btunnel\b/.test(process.env.NODE_DEBUG)) {
  debug = function() {
    var args = Array.prototype.slice.call(arguments);
    if (typeof args[0] === 'string') {
      args[0] = 'TUNNEL: ' + args[0];
    } else {
      args.unshift('TUNNEL:');
    }
    console.error.apply(console, args);
  }
} else {
  debug = function() {};
}
exports.debug = debug; // for test


/***/ }),

/***/ 491:
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),

/***/ 361:
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ 147:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ 685:
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ 687:
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ 808:
/***/ ((module) => {

"use strict";
module.exports = require("net");

/***/ }),

/***/ 37:
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ 17:
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ 282:
/***/ ((module) => {

"use strict";
module.exports = require("process");

/***/ }),

/***/ 477:
/***/ ((module) => {

"use strict";
module.exports = require("querystring");

/***/ }),

/***/ 404:
/***/ ((module) => {

"use strict";
module.exports = require("tls");

/***/ }),

/***/ 310:
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ 837:
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ 71:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"papi","version":"0.29.1","description":"Build HTTP API clients","main":"lib","devDependencies":{"async":"^2.6.1","bluebird":"^3.5.1","debug":"^3.1.0","istanbul":"^0.4.5","jscs":"^3.0.7","jshint":"^2.9.5","lodash":"^4.17.10","mocha":"^5.2.0","nock":"^9.3.2","request":"^2.87.0","should":"^13.2.1","sinon":"^1.10.3"},"scripts":{"cover":"istanbul cover _mocha -- --recursive && open coverage/lcov-report/index.html","bench":"BENCHMARK=true mocha test/benchmark.js","test":"jshint lib test && jscs lib test && istanbul cover _mocha -- --recursive --check-leaks --globals Promise && istanbul check-coverage --statements 100 --functions 100 --branches 100 --lines 100"},"repository":{"type":"git","url":"https://github.com/silas/node-papi.git"},"keywords":["api","client","http","rest"],"author":"Silas Sewell <silas@sewell.org>","license":"MIT","bugs":{"url":"https://github.com/silas/node-papi/issues"},"homepage":"https://github.com/silas/node-papi"}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId].call(module.exports, module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
const core = __nccwpck_require__(186);
const dotenv = __nccwpck_require__(437);
const { exit } = __nccwpck_require__(282);
let jenkins;
dotenv.config();


async function wait_queue(id) {
    return new Promise((resolve, reject) => {
        jenkins.queue.item(id, (err, item) => {
            if (err) {
                core.setFailed(err);
                exit();
            }

            if (item.executable) {
                core.info(`Build number: ${item.executable.number}`);
                resolve(item.executable.number);
            } else if (item.cancelled) {
                reject('Cancelled');
            } else {
                setTimeout(async() => {
                    resolve(await wait_queue(id));
                }, 1000);
            }

        });
    });
}

async function trigger_build(job_name, job_parameters) {
    core.info(`Triggering build: "${job_name}" with parameters: ${job_parameters}`);
    let queue_id = await jenkins.job.build({ name: job_name, parameters: JSON.parse(job_parameters) });
    let build_id = await wait_queue(queue_id);
    return build_id;
}

async function main(job_name, job_parameters) {
    core.info(`Fetching information from Jenkins server..`);
    let information = await jenkins.info();
    core.info(`Jenkins server returned: ${JSON.stringify(information)}`);

    let build_id = await trigger_build(job_name, job_parameters);
    let log = jenkins.build.logStream(job_name, build_id);

    log.on('data', (data) => {
        process.stdout.write(data);
    });

    log.on('error', (err) => {
        process.stderr.write(err);
    });

    log.on('end', () => {
        jenkins.build.get(job_name, build_id, (err, data) => {
            if (err) {
                core.setFailed(err);
                exit();
            }
            core.info(`Build status: ${data.result}`)
            if (data.result === "FAILURE") {
                core.setFailed(JSON.stringify(data));
                exit();
            }
        });
    });

}

(async() => {
    const url = core.getInput('JENKINS_URL') || process.env.JENKINS_URL;
    const username = core.getInput('JENKINS_USERNAME') || process.env.JENKINS_USERNAME;
    const token = core.getInput('JENKINS_API_TOKEN') || process.env.JENKINS_API_TOKEN;
    const job_name = core.getInput('JENKINS_JOB') || process.env.JENKINS_JOB;
    const job_parameters = core.getInput('JENKINS_JOB_PARAMETERS') || process.env.JENKINS_JOB_PARAMETERS;

    if (!url || !username || !token || !job_name) {
        core.setFailed(`Required parameter(s) (JENKINS_URL, JENKINS_USERNAME, JENKINS_API_TOKEN and/or JENKINS_JOB) not provided!`);
        exit();
    }

    const hostname = url.split('http://').slice(-1)[0] || url.split('https://').slice(-1)[0];
    const base_url = `http://${username}:${token}@${hostname}`;

    jenkins = __nccwpck_require__(108)({ baseUrl: base_url, crumbIssuer: true, promisify: true });

    await main(job_name, job_parameters);
})();
})();

module.exports = __webpack_exports__;
/******/ })()
;