"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("react-native");
const React = require("react");
const index_ios_1 = require("../index.ios");
// Note: test renderer must be required after react-native.
const renderer = require("react-test-renderer");
it('renders correctly', () => {
    const tree = renderer.create(React.createElement(index_ios_1.default, null));
});
//# sourceMappingURL=index.ios.js.map