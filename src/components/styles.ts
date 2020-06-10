import { Platform, StyleSheet, ViewProps } from 'react-native';

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
    position: 'absolute' as any,
    right: 0
  }
};

interface Style {
  inputContainer?: ViewProps;
  input: ViewProps;
  container: ViewProps;
  list?: ViewProps;
}

export const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
    width: '100%',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1
  },
  input: {
    backgroundColor: 'white',
    height: 40,
    paddingLeft: 3
  },
  ...Platform.select({
    android: { ...androidStyles },
    ios: { ...iosStyles }
  })
});
