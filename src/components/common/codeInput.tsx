import React from 'react';
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  Text,
} from '@gluestack-ui/themed';
import { StyleSheet } from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { Colors } from '../../constents';

const styles = StyleSheet.create({
  cell: {
    width: 50,
    height: 50,
    lineHeight: 47,
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: Colors.inputBgColor,
    borderColor: Colors.codeInputBorderColor,
    borderWidth: 2,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  focusCell: {
    width: 50,
    height: 50,
    lineHeight: 47,
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: Colors.inputBgColor,
    borderColor: Colors.codeInputBorderColor,
    borderWidth: 2,
  },
});

type CodeInputProps = {
  value: string;
  setValue: (text: string) => void;
  errorText?: string;
  /** default: 4 */
  cellCount?: number;
};

const DEFAULT_CELL_COUNT = 4;

const CodeInput: React.FC<CodeInputProps> = ({
  value,
  setValue,
  errorText,
  cellCount = DEFAULT_CELL_COUNT,
}) => {
  const ref = useBlurOnFulfill({ value, cellCount });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return (
    <FormControl isInvalid={!!errorText}>
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={cellCount}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <Text
            // gluestack Text also accepts RN 'style'
            key={index}
            style={[
              styles.cell,
              errorText
                ? { borderColor: Colors.errorText }
                : isFocused && styles.focusCell,
            ]}
            onLayout={getCellOnLayoutHandler(index)}
          >
            {symbol || (isFocused ? <Cursor /> : '-')}
          </Text>
        )}
      />

      {!!errorText && (
        <FormControlError px="$2">
          <FormControlErrorText>{errorText}</FormControlErrorText>
        </FormControlError>
      )}
    </FormControl>
  );
};

export default CodeInput;
