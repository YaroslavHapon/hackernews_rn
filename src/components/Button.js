import React from 'react'
import { View, Text, TouchableOpacity  } from 'react-native'
import PropTypes from 'prop-types'

const Button = ({ text, onPress, style, buttonTextStyle}) => {
  return(
    <TouchableOpacity onPress={onPress}>
      <View style={style}>
        <Text style={buttonTextStyle}>{text}</Text>
      </View>
    </TouchableOpacity>
  )
};
Button.propTypes = {
  text: PropTypes.string,
  onPress: PropTypes.func,
  style: PropTypes.number,
  buttonTextStyle: PropTypes.number
}
export default Button