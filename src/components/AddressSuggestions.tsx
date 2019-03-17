import * as React from 'react';
import {
  FlatList,
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle
} from 'react-native';

const suggestions: Array<any> = [
  {
    title: '1'
  },
  {
    title: '2'
  },
  {
    title: '3'
  }
];

export type DadataAddress = {
  area: string;
  area_fias_id: string;
  area_kladr_id: string;
  area_type: string;
  area_type_full: string;
  area_with_type: string;
  beltway_distance: null;
  beltway_hit: null;
  block: string;
  block_type: string;
  block_type_full: string;
  capital_marker: '0' | '1' | '2' | '3' | '4';
  city: string;
  city_area: string;
  city_district: string;
  city_district_fias_id: string;
  city_district_kladr_id: string;
  city_district_type: string;
  city_district_type_full: string;
  city_district_with_type: string;
  city_fias_id: string;
  city_kladr_id: string;
  city_type: string;
  city_type_full: string;
  city_with_type: string;
  country: string;
  fias_id: string;
  fias_level: string;
  flat: string;
  flat_area: null;
  flat_price: null;
  flat_type: string;
  flat_type_full: string;
  geo_lat: string;
  geo_lon: string;
  history_values: string;
  house: string;
  house_fias_id: string;
  house_kladr_id: string;
  house_type: string;
  house_type_full: string;
  kladr_id: string;
  okato: string;
  oktmo: string;
  postal_box: string;
  postal_code: string;
  qc: null;
  qc_complete: null;
  qc_geo: '0' | '1' | '2' | '3' | '4' | '5';
  qc_house: null;
  region: string;
  region_fias_id: string;
  region_kladr_id: string;
  region_type: string;
  region_type_full: string;
  region_with_type: string;
  settlement: string;
  settlement_fias_id: string;
  settlement_kladr_id: string;
  settlement_type: string;
  settlement_type_full: string;
  settlement_with_type: string;
  source: string;
  square_meter_price: null;
  street: string;
  street_fias_id: string;
  street_kladr_id: string;
  street_type: string;
  street_type_full: string;
  street_with_type: string;
  tax_office: string;
  tax_office_legal: string;
  timezone: null;
  unparsed_parts: null;
};

export type DadataSuggestion = {
  value: string;
  unrestricted_value: string;
  data: DadataAddress;
};

export interface AddressSuggestionsProps {
  ItemSeparatorComponent?: any;
  autoCorrect?: boolean;
  autoload?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  count?: number;
  disabled?: boolean;
  inputContainerStyle: StyleProp<ViewStyle>;
  inputStyle: StyleProp<ViewStyle>;
  keyExtractor?: (item: any, index: number) => string;
  listContainerStyle: StyleProp<ViewStyle>;
  listStyle: StyleProp<ViewStyle>;
  onSelect?: (suggestion: DadataSuggestion) => void;
  placeholder?: string;
  query?: string;
  renderItem?: any;
  token: string;
}

interface AddressSuggestionsState {
  inputQuery: string;
  inputFocused: boolean;
  isValid: boolean;
  query: string;
  suggestions: Array<DadataSuggestion>;
  suggestionsVisible: boolean;
}

export class AddressSuggestions extends React.PureComponent<
  AddressSuggestionsProps,
  AddressSuggestionsState
> {
  static defaultProps = {
    ItemSeparatorComponent: null,
    keyExtractor: (item: any, index: number): string => index.toString(),
    renderItem: ({ item }: any) => <Text>{item}</Text>,
    token: ''
  };

  private resultListRef: any;
  private textInputRef: any;

  state = {
    query: this.props.query ? this.props.query : '',
    inputQuery: this.props.query ? this.props.query : '',
    inputFocused: false,
    suggestions: [],
    suggestionsVisible: true,
    isValid: false
  };

  constructor(props: AddressSuggestionsProps) {
    super(props);

    this.resultListRef = React.createRef();
    this.textInputRef = React.createRef();
  }

  componentDidMount() {
    if (this.props.autoload && this.state.query) {
      this.fetchSuggestions();
    }
  }

  onInputFocus = () => {
    this.setState({ inputFocused: true });
    if (this.state.suggestions.length == 0) {
      this.fetchSuggestions();
    }
  };

  onInputBlur = () => {
    this.setState({ inputFocused: false });
    if (this.state.suggestions.length == 0) {
      this.fetchSuggestions();
    }
  };

  onInputChange = (event: any) => {
    const value = event.target.value;
    this.setState({ query: value, inputQuery: value, suggestionsVisible: true }, () => {
      this.fetchSuggestions();
    });
  };

  fetchSuggestions = () => {
    this.setState({ suggestions });
  };

  onSuggestionClick = (index: number, event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    this.selectSuggestion(index);
  };

  selectSuggestion = (index: number) => {
    if (this.state.suggestions.length >= index - 1) {
      const currentSuggestion: DadataSuggestion = this.state.suggestions[index];

      this.setState(
        {
          query: currentSuggestion.value,
          suggestionsVisible: false,
          inputQuery: currentSuggestion.value
        },
        () => this.fetchSuggestions()
      );

      if (this.props.onSelect) {
        this.props.onSelect(this.state.suggestions[index]);
      }
    }
  };

  // getHighlightWords = (): Array<string> => {
  //   const wordsToPass = [
  //     'г',
  //     'респ',
  //     'ул',
  //     'р-н',
  //     'село',
  //     'деревня',
  //     'поселок',
  //     'пр-д',
  //     'пл',
  //     'к',
  //     'кв',
  //     'обл',
  //     'д'
  //   ];
  //   let words = this.state.inputQuery.replace(',', '').split(' ');
  //   words = words.filter(word => {
  //     return wordsToPass.indexOf(word) < 0;
  //   });
  //   return words;
  // };

  renderTextInput() {
    const { inputStyle } = this.props;

    return (
      <TextInput
        autoCapitalize="none"
        autoCorrect={this.props.autoCorrect ? this.props.autoCorrect : false}
        editable={!this.props.disabled}
        onChange={this.onInputChange}
        onFocus={this.onInputFocus}
        onBlur={this.onInputBlur}
        placeholder={this.props.placeholder ? this.props.placeholder : ''}
        ref={this.textInputRef}
        style={[styles.input, inputStyle]}
        value={this.state.query}
      />
    );
  }

  renderSuggestions() {
    const { ItemSeparatorComponent, keyExtractor, listStyle, renderItem } = this.props;
    const { suggestions } = this.state;

    return (
      <FlatList
        ref={this.resultListRef}
        data={suggestions}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={ItemSeparatorComponent}
        style={[styles.list, listStyle]}
      />
    );
  }

  render() {
    const { containerStyle, inputContainerStyle, listContainerStyle } = this.props;

    return (
      <View style={[styles.container, containerStyle]}>
        <View style={[styles.inputContainer, inputContainerStyle]}>{this.renderTextInput()}</View>
        {this.state.inputFocused &&
          this.state.suggestionsVisible &&
          this.state.suggestions &&
          this.state.suggestions.length > 0 && (
            <View style={listContainerStyle}>{this.renderSuggestions()}</View>
          )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    zIndex: 1
  },
  inputContainer: {
    marginBottom: 0
  },
  input: {
    backgroundColor: 'white',
    height: 40,
    paddingLeft: 3
  },
  list: {
    backgroundColor: 'white',
    borderTopWidth: 0,
    left: 0,
    position: 'absolute',
    right: 0
  }
});
