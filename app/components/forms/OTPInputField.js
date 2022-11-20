/**
 * OTPInputField Component
 * @param setPinReady
 * @param code
 * @param setCode
 * @param maxLength
 * @param otherProps
 * @returns an OTP input field with dynamic code length
 */

import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import { AppText } from '../AppText';

const OTPInputField = ({
  setPinReady,
  code,
  setCode,
  maxLength,
  textContentType,
  ...otherProps
}) => {
  const codeDigitsArray = new Array(maxLength).fill(0);

  // ref for text input
  const textInputRef = useRef(null);

  // monitoring input focus
  const [inputContainerIsFocused, setInputContainerIsFocused] = useState(false);

  const handleonPress = () => {
    setInputContainerIsFocused(true);
    textInputRef?.current?.focus();
  };

  const handleOnBlur = () => {
    setInputContainerIsFocused(false);
  };

  useEffect(() => {
    // update pin ready value
    setPinReady(code.length === maxLength);
    return () => setPinReady(false);
  }, [code]);

  const toCodeDigitInput = (_value, index) => {
    const emptyInputChar = ' ';
    const digit = code[index] || emptyInputChar;

    const isCurrentDigit = index === code.length;
    const isLastDigit = index === maxLength - 1;
    const isCodeFull = code.length === maxLength;

    const isDigitFocused = isCurrentDigit || (isLastDigit && isCodeFull);

    const OTPInput = ({ children, otherProps }) => {
      return (
        <View style={[styles.inputView, { opacity: 0.5 }]} {...otherProps}>
          {children}
        </View>
      );
    };
    const OTPInputFocused = ({ children, otherProps }) => {
      return (
        <View style={styles.inputView} {...otherProps}>
          {children}
        </View>
      );
    };

    const StyledOTPInput =
      inputContainerIsFocused && isDigitFocused ? OTPInputFocused : OTPInput;

    return (
      <StyledOTPInput style={styles.inputView} key={index}>
        <AppText>{digit}</AppText>
      </StyledOTPInput>
    );
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.inputContainer} onPress={handleonPress}>
        {codeDigitsArray.map(toCodeDigitInput)}
      </Pressable>
      <TextInput
        style={styles.textInput}
        value={code}
        maxLength={maxLength}
        onChangeText={setCode}
        keyboardType='number-pad'
        returnKeyType='done'
        textContentType={textContentType}
        ref={textInputRef}
        onBlur={handleOnBlur}
        {...otherProps}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  textInput: {
    position: 'absolute',
    height: 1,
    width: 1,
    padding: 0,
    opacity: 0
  },
  inputContainer: {
    paddingVertical: 30,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  inputView: {
    backgroundColor: '#E3E3E3',
    minWidth: '13%',
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default OTPInputField;
