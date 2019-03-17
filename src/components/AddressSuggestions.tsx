import * as React from 'react';
import { Text, View } from 'react-native';

export interface AddressSuggestionsProps {
  token: string;
}

class AddressSuggestions extends React.Component<AddressSuggestionsProps> {
  static defaultProps = {
    token: ''
  };

  render() {
    return (
      <View>
        <Text>{this.props.token}</Text>
      </View>
    );
  }
}

export { AddressSuggestions };
