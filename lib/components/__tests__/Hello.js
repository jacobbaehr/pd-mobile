"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const enzyme_1 = require("enzyme");
const Hello_1 = require("../Hello");
it('renders correctly with defaults', () => {
    const hello = enzyme_1.shallow(React.createElement(Hello_1.default, { name: "World" }));
    expect(hello.find(react_native_1.Text).render().text()).toEqual("Hello World!");
});
//# sourceMappingURL=Hello.js.map