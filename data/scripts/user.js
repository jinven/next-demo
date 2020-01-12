/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.userpackage = (function() {

    /**
     * Namespace userpackage.
     * @exports userpackage
     * @namespace
     */
    var userpackage = {};

    userpackage.User = (function() {

        /**
         * Properties of a User.
         * @memberof userpackage
         * @interface IUser
         * @property {string|null} [name] User name
         * @property {number|null} [id] User id
         * @property {string|null} [email] User email
         */

        /**
         * Constructs a new User.
         * @memberof userpackage
         * @classdesc Represents a User.
         * @implements IUser
         * @constructor
         * @param {userpackage.IUser=} [properties] Properties to set
         */
        function User(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * User name.
         * @member {string} name
         * @memberof userpackage.User
         * @instance
         */
        User.prototype.name = "";

        /**
         * User id.
         * @member {number} id
         * @memberof userpackage.User
         * @instance
         */
        User.prototype.id = 0;

        /**
         * User email.
         * @member {string} email
         * @memberof userpackage.User
         * @instance
         */
        User.prototype.email = "";

        /**
         * Creates a new User instance using the specified properties.
         * @function create
         * @memberof userpackage.User
         * @static
         * @param {userpackage.IUser=} [properties] Properties to set
         * @returns {userpackage.User} User instance
         */
        User.create = function create(properties) {
            return new User(properties);
        };

        /**
         * Encodes the specified User message. Does not implicitly {@link userpackage.User.verify|verify} messages.
         * @function encode
         * @memberof userpackage.User
         * @static
         * @param {userpackage.IUser} message User message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        User.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.name != null && message.hasOwnProperty("name"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
            if (message.id != null && message.hasOwnProperty("id"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.id);
            if (message.email != null && message.hasOwnProperty("email"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.email);
            return writer;
        };

        /**
         * Encodes the specified User message, length delimited. Does not implicitly {@link userpackage.User.verify|verify} messages.
         * @function encodeDelimited
         * @memberof userpackage.User
         * @static
         * @param {userpackage.IUser} message User message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        User.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a User message from the specified reader or buffer.
         * @function decode
         * @memberof userpackage.User
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {userpackage.User} User
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        User.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.userpackage.User();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.name = reader.string();
                    break;
                case 2:
                    message.id = reader.int32();
                    break;
                case 3:
                    message.email = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a User message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof userpackage.User
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {userpackage.User} User
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        User.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a User message.
         * @function verify
         * @memberof userpackage.User
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        User.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isInteger(message.id))
                    return "id: integer expected";
            if (message.email != null && message.hasOwnProperty("email"))
                if (!$util.isString(message.email))
                    return "email: string expected";
            return null;
        };

        /**
         * Creates a User message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof userpackage.User
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {userpackage.User} User
         */
        User.fromObject = function fromObject(object) {
            if (object instanceof $root.userpackage.User)
                return object;
            var message = new $root.userpackage.User();
            if (object.name != null)
                message.name = String(object.name);
            if (object.id != null)
                message.id = object.id | 0;
            if (object.email != null)
                message.email = String(object.email);
            return message;
        };

        /**
         * Creates a plain object from a User message. Also converts values to other types if specified.
         * @function toObject
         * @memberof userpackage.User
         * @static
         * @param {userpackage.User} message User
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        User.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.name = "";
                object.id = 0;
                object.email = "";
            }
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.email != null && message.hasOwnProperty("email"))
                object.email = message.email;
            return object;
        };

        /**
         * Converts this User to JSON.
         * @function toJSON
         * @memberof userpackage.User
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        User.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return User;
    })();

    return userpackage;
})();

module.exports = $root;
