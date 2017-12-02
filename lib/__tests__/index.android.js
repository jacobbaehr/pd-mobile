"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("react-native");
const React = require("react");
const index_android_1 = require("../index.android");
// Note: test renderer must be required after react-native.
const renderer = require("react-test-renderer");
it('renders correctly', () => {
    const tree = renderer.create(React.createElement(index_android_1.default, null));
});
//# sourceMappingURL=index.android.js.map