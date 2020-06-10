"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.styles = void 0;
const react_native_1 = require("react-native");
const androidStyles = {
    inputContainer: {
        marginBottom: 0
    },
    list: {
        backgroundColor: 'white',
        borderTopWidth: 0,
        margin: 10,
        marginTop: 0
    }
};
const iosStyles = {
    inputContainer: {},
    list: {
        backgroundColor: 'white',
        borderTopWidth: 0,
        left: 0,
        position: 'absolute',
        right: 0
    }
};
exports.styles = react_native_1.StyleSheet.create(Object.assign({ container: {
        flex: 1,
        width: '100%',
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 1
    }, input: {
        backgroundColor: 'white',
        height: 40,
        paddingLeft: 3
    } }, react_native_1.Platform.select({
    android: Object.assign({}, androidStyles),
    ios: Object.assign({}, iosStyles)
})));
//# sourceMappingURL=styles.js.map